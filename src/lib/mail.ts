import nodemailer from "nodemailer";

const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;

console.log("=> Mailer debug: USER length:", emailUser?.length, "PASS length:", emailPass?.length);

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use TLS
  auth: {
    user: emailUser,
    pass: emailPass,
  },
});

// Verify connection configuration
transporter.verify(function (error, success) {
  if (error) {
    console.error("=> Mailer Configuration Error:", error);
    console.log("=> Hint: Check if 2-Step Verification is enabled and the App Password is correct.");
  } else {
    console.log("=> Mailer is ready to take messages");
  }
});

export const sendVerificationEmail = async (email: string, link: string) => {
  const mailOptions = {
    from: `"MockAPI Service" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Verify your Email - MockAPI",
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; rounded-lg: 12px;">
        <h2 style="color: #4f46e5; border-bottom: 2px solid #4f46e5; padding-bottom: 10px;">Welcome to MockAPI!</h2>
        <p style="color: #1e293b; font-size: 16px; line-height: 1.5;">
          Thank you for signing up for MockAPI. To complete your login and access your workspace, please verify your email address by clicking the button below:
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${link}" style="background-color: #4f46e5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
            Verify Email Address
          </a>
        </div>
        <p style="color: #64748b; font-size: 14px; line-height: 1.5;">
          This link will expire in 24 hours. If you did not request this email, you can safely ignore it.
        </p>
        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
        <p style="color: #94a3b8; font-size: 12px; text-align: center;">
          &copy; ${new Date().getFullYear()} MockAPI Service. All rights reserved.
        </p>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("=> Verification email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("=> Error sending verification email:", error);
    throw new Error("Failed to send verification email");
  }
};
