import nodemailer from "nodemailer";

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

function getTransporter() {
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT || 587);
  const secure = port === 465;
  const user = process.env.SMTP_USER || "steamwriterai@gmail.com";
  const pass = process.env.SMTP_PASS || "widm hnec pbqk trbf";

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
    tls: {
      rejectUnauthorized: false,
    },
    connectionTimeout: 10000,
    greetingTimeout: 5000,
    socketTimeout: 10000,
  });
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    const transporter = getTransporter();
    const from = process.env.SMTP_FROM || `"SteamWriterAi" <${process.env.SMTP_USER || "steamwriterai@gmail.com"}>`;
    await transporter.sendMail({
      from,
      to: options.to,
      subject: options.subject,
      html: options.html,
      replyTo: options.replyTo,
    });
    return true;
  } catch (error) {
    console.error("[Email] Failed to send:", error);
    return false;
  }
}

export function welcomeEmail(firstName: string): EmailOptions & { subject: string } {
  return {
    to: "",
    subject: "Welcome to SteamWriterAi",
    html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 560px; margin: 0 auto; color: #1a1a1a;">
        <h2 style="color: #1B8B2C;">Welcome to SteamWriterAi, ${firstName}!</h2>
        <p>Your account is ready. Here's what you can do:</p>
        <ul style="line-height: 1.8;">
          <li><strong>Generate chapters 1–5</strong> with real citations</li>
          <li><strong>Discover journals</strong> relevant to your topic</li>
          <li><strong>Analyse data</strong> with professional tables & charts</li>
          <li><strong>Check AI detection & plagiarism</strong> before submission</li>
        </ul>
        <a href="${process.env.NEXT_PUBLIC_APP_URL || "https://steamwriterai.com"}/user/projects/new"
           style="display:inline-block; background:#1B8B2C; color:#fff; padding:12px 28px; border-radius:8px; text-decoration:none; font-weight:600; margin-top:12px;">
           Start Your First Project
        </a>
        <p style="margin-top:24px; color:#666; font-size:13px;">
          If you have questions, reply to this email or visit our FAQ.
        </p>
        <hr style="border:none; border-top:1px solid #eee; margin:20px 0;" />
        <p style="color:#999; font-size:12px;">SteamWriterAi — From Topic to Submission.</p>
      </div>
    `,
  };
}

export function passwordResetEmail(firstName: string, resetUrl: string): EmailOptions & { subject: string } {
  return {
    to: "",
    subject: "Reset your SteamWriterAi password",
    html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 560px; margin: 0 auto; color: #1a1a1a;">
        <h2 style="color: #1B8B2C;">Password Reset</h2>
        <p>Hi ${firstName},</p>
        <p>Click the link below to set a new password. This link expires in 1 hour.</p>
        <a href="${resetUrl}"
           style="display:inline-block; background:#1B8B2C; color:#fff; padding:12px 28px; border-radius:8px; text-decoration:none; font-weight:600; margin-top:12px;">
           Reset Password
        </a>
        <p style="margin-top:24px; color:#666; font-size:13px;">
          If you didn't request this, you can safely ignore this email.
        </p>
        <hr style="border:none; border-top:1px solid #eee; margin:20px 0;" />
        <p style="color:#999; font-size:12px;">SteamWriterAi — From Topic to Submission.</p>
      </div>
    `,
  };
}

export function paymentConfirmationEmail(
  firstName: string,
  plan: string,
  amount: number,
  reference: string
): EmailOptions & { subject: string } {
  return {
    to: "",
    subject: "Payment Confirmed — SteamWriterAi",
    html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 560px; margin: 0 auto; color: #1a1a1a;">
        <h2 style="color: #1B8B2C;">Payment Confirmed</h2>
        <p>Hi ${firstName},</p>
        <p>Your payment has been verified. Here are the details:</p>
        <table style="width:100%; border-collapse:collapse; margin:16px 0;">
          <tr><td style="padding:8px; border-bottom:1px solid #eee; font-weight:600;">Plan</td><td style="padding:8px; border-bottom:1px solid #eee;">${plan}</td></tr>
          <tr><td style="padding:8px; border-bottom:1px solid #eee; font-weight:600;">Amount</td><td style="padding:8px; border-bottom:1px solid #eee;">₦${amount.toLocaleString()}</td></tr>
          <tr><td style="padding:8px; border-bottom:1px solid #eee; font-weight:600;">Reference</td><td style="padding:8px; border-bottom:1px solid #eee;">${reference}</td></tr>
        </table>
        <a href="${process.env.NEXT_PUBLIC_APP_URL || "https://steamwriterai.com"}/user/dashboard"
           style="display:inline-block; background:#1B8B2C; color:#fff; padding:12px 28px; border-radius:8px; text-decoration:none; font-weight:600; margin-top:12px;">
           Go to Dashboard
        </a>
        <hr style="border:none; border-top:1px solid #eee; margin:20px 0;" />
        <p style="color:#999; font-size:12px;">SteamWriterAi — From Topic to Submission.</p>
      </div>
    `,
  };
}
