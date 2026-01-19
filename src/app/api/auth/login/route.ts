import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import crypto from "crypto";

import { sendVerificationEmail } from "@/lib/mail";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    await connectDB();

    // 1. Generate verification token
    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // 2. Create or update user
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ email });
    }

    user.verificationToken = token;
    user.verificationTokenExpires = expires;
    await user.save();

    // 3. Construct verification link (Points to client-side page)
    const host = process.env.NEXTAUTH_URL || "http://localhost:3000";
    const verificationLink = `${host}/verify?token=${token}&email=${encodeURIComponent(email)}`;

    // 4. Send real email using Nodemailer
    await sendVerificationEmail(email, verificationLink);

    return NextResponse.json({
      status: "success",
      message: "Verification email sent. Please check your inbox.",
    });
  } catch (error: any) {
    console.error("=> Login API Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
