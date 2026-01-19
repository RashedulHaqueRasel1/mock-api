import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import RefreshToken from "@/models/RefreshToken";
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
    await user.save();

    // 3. Generate Access Token (JWT)
    const accessToken = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "15m" }
    );

    // 4. Generate Refresh Token
    const refreshTokenValue = crypto.randomBytes(40).toString("hex");
    const refreshTokenExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    // Store in DB
    await RefreshToken.create({
      token: refreshTokenValue,
      userId: user._id,
      expiresAt: refreshTokenExpiry,
    });

    // 5. Prepare HTTP-only cookie for Refresh Token
    const cookie = serialize("refreshToken", refreshTokenValue, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
    });

    // 6. Return response with Access Token and set Cookie
    const response = NextResponse.json({
      status: "success",
      accessToken,
      user: {
        id: user._id,
        email: user.email,
      }
    });

    response.headers.set("Set-Cookie", cookie);

    return response;
  } catch (error: any) {
    console.error("=> Verification API Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
