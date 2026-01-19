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

export const sendVerificationEmail = async (email: string, link: string, name: string) => {
  const mailOptions = {
    from: `"MockAPI Service" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Verify your Email - MockAPI",
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px; border: 1px solid #f1f5f9; border-radius: 24px; background-color: #ffffff;">
        <div style="text-align: center; margin-bottom: 32px;">
           <h1 style="color: #4f46e5; font-size: 28px; font-weight: 800; margin: 0;">MockAPI</h1>
        </div>
        
        <h2 style="color: #0f172a; font-size: 22px; font-weight: 700; margin-bottom: 16px;">Hello ${name},</h2>
        
        <p style="color: #475569; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
          Thank you for signing up for MockAPI. To complete your login and secure your workspace, please verify your email address by clicking the button below:
        </p>
        
        <div style="text-align: center; margin: 40px 0;">
          <a href="${link}" style="background-color: #4f46e5; color: #ffffff; padding: 16px 32px; text-decoration: none; border-radius: 12px; font-weight: 700; font-size: 16px; display: inline-block; box-shadow: 0 10px 15px -3px rgba(79, 70, 229, 0.3);">
            Verify Email Address
          </a>
        </div>
        
        <p style="color: #64748b; font-size: 14px; line-height: 1.6; margin-bottom: 32px;">
          This secure link will expire in 24 hours. If you did not request this verification, you can safely ignore this email.
        </p>
        
        <div style="border-top: 1px solid #f1f5f9; padding-top: 32px; text-align: center;">
          <p style="color: #94a3b8; font-size: 12px; margin: 0;">
            &copy; ${new Date().getFullYear()} MockAPI Service. All rights reserved.<br>
            Industry-standard JSON mocking for modern developers.
          </p>
        </div>
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
