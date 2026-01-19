import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import crypto from "crypto";

const JWT_SECRET = process.env.NEXTAUTH_SECRET || "your-fallback-secret";

export async function POST(req: Request) {
  try {
    const { token, email } = await req.json();

    if (!token || !email) {
      return NextResponse.json({ error: "Missing token or email" }, { status: 400 });
    }

    await connectDB();

    // 1. Find user and validate token
    const user = await User.findOne({ 
      email, 
      verificationToken: token,
      verificationTokenExpires: { $gt: new Date() }
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
    }

    // 2. Clear verification token and mark as verified
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    user.lastLogin = new Date();

    const SESSION_DURATION = 72 * 60 * 60 * 1000; // 72 hours
    const now = new Date();

    let accessToken = user.accessToken;
    let refreshTokenValue = user.refreshToken;
    let refreshTokenExpiry = user.refreshTokenExpires;

    // Check if existing tokens are valid
    const isTokenValid = refreshTokenValue && refreshTokenExpiry && refreshTokenExpiry > now;

    if (!isTokenValid) {
      // 3. Generate New Access Token (JWT) - 72h
      accessToken = jwt.sign(
        { userId: user._id, email: user.email },
        JWT_SECRET,
        { expiresIn: "72h" }
      );

      // 4. Generate New Refresh Token & Secure Token
      refreshTokenValue = crypto.randomBytes(40).toString("hex");
      const secureTokenValue = crypto.randomBytes(40).toString("hex");
      refreshTokenExpiry = new Date(Date.now() + SESSION_DURATION);

      // 5. Save tokens to User document PERMANENTLY
      user.accessToken = accessToken;
      user.refreshToken = refreshTokenValue;
      user.secureToken = secureTokenValue;
      user.refreshTokenExpires = refreshTokenExpiry;
      
      console.log("------------------------------------------");
      console.log(`=> PERSISTENCE HANDSHAKE FOR: ${email}`);
      console.log(`=> Status: NEW SESSION GENERATED`);
      console.log(`=> Data Saved: { name: "${user.name}", refreshToken: "...", secureToken: "..." }`);
      console.log("------------------------------------------");
    } else {
      console.log("------------------------------------------");
      console.log(`=> IDENTITY RECOGNIZED: ${email}`);
      console.log(`=> Status: REUSING VALID PERSISTENT TOKENS`);
      console.log("------------------------------------------");
    }

    await user.save();

    // 6. Prepare HTTP-only cookie for Refresh Token (72h)
    const cookie = serialize("refreshToken", refreshTokenValue!, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 72 * 60 * 60, // 72 hours in seconds
    });

    // 7. Return response with Access Token and set Cookie
    const response = NextResponse.json({
      status: "success",
      accessToken,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        secureToken: user.secureToken,
      }
    });

    response.headers.set("Set-Cookie", cookie);

    return response;
  } catch (error: any) {
    console.error("=> Verification API Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
