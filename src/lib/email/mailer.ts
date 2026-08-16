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

function emailWrapper(content: string): string {
  const logoSvg = `
    <table cellpadding="0" cellspacing="0" border="0" width="100%">
      <tr>
        <td align="center" style="padding: 32px 0 8px 0;">
          <table cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td style="background: #1B8B2C; border-radius: 12px; width: 48px; height: 48px; text-align: center; vertical-align: middle;">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: block; margin: 10px auto;">
                  <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
                  <path d="m15 5 4 4"/>
                </svg>
              </td>
              <td style="padding-left: 12px;">
                <span style="font-family: 'Segoe UI', Arial, sans-serif; font-size: 22px; font-weight: 800; color: #111; letter-spacing: -0.5px;">SteamWriterAi</span>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>`;

  const footer = `
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top: 32px;">
      <tr>
        <td style="border-top: 1px solid #e5e7eb; padding: 24px 0 0 0;">
          <table cellpadding="0" cellspacing="0" border="0" width="100%">
            <tr>
              <td style="font-family: 'Segoe UI', Arial, sans-serif; font-size: 12px; color: #9ca3af; text-align: center; line-height: 1.6;">
                <p style="margin: 0 0 4px 0; font-weight: 600; color: #6b7280;">SteamWriterAi</p>
                <p style="margin: 0 0 4px 0;">AI Research Writing Suite — From Topic to Submission</p>
                <p style="margin: 0 0 8px 0;">Lagos, Nigeria &middot; hello@steamwriterai.com</p>
                <p style="margin: 0;">
                  <a href="https://steamwriterai.com" style="color: #1B8B2C; text-decoration: none;">steamwriterai.com</a>
                  &nbsp;&middot;&nbsp;
                  <a href="https://x.com/steamwriterai" style="color: #1B8B2C; text-decoration: none;">X / Twitter</a>
                  &nbsp;&middot;&nbsp;
                  <a href="https://linkedin.com/company/steamwriterai" style="color: #1B8B2C; text-decoration: none;">LinkedIn</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>`;

  return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
    <body style="margin: 0; padding: 0; background: #f9fafb; font-family: 'Segoe UI', Arial, sans-serif;">
      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: #f9fafb;">
        <tr>
          <td align="center" style="padding: 24px 16px;">
            <table cellpadding="0" cellspacing="0" border="0" width="560" style="background: #ffffff; border-radius: 16px; border: 1px solid #e5e7eb; overflow: hidden;">
              <tr>
                <td style="padding: 0;">
                  <!-- Green accent bar -->
                  <table cellpadding="0" cellspacing="0" border="0" width="100%">
                    <tr>
                      <td style="height: 4px; background: linear-gradient(90deg, #1B8B2C, #7c3aed);"></td>
                    </tr>
                  </table>
                  <!-- Logo -->
                  <div style="padding: 32px 40px 0 40px;">
                    ${logoSvg}
                  </div>
                  <!-- Content -->
                  <div style="padding: 24px 40px 32px 40px; font-family: 'Segoe UI', Arial, sans-serif; color: #1f2937; font-size: 15px; line-height: 1.7;">
                    ${content}
                  </div>
                  <!-- Footer -->
                  <div style="padding: 0 40px 32px 40px;">
                    ${footer}
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>`;
}

function button(href: string, label: string, color = "#1B8B2C"): string {
  return `<a href="${href}" style="display: inline-block; background: ${color}; color: #ffffff; padding: 14px 32px; border-radius: 10px; text-decoration: none; font-weight: 700; font-size: 14px; letter-spacing: -0.2px;">${label}</a>`;
}

function featureItem(iconSvg: string, text: string): string {
  return `<div style="display: flex; align-items: center; gap: 10px; padding: 8px 0;">
    <span style="display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 28px; background: #f0fdf4; border-radius: 8px; flex-shrink: 0;">${iconSvg}</span>
    <span style="color: #374151; font-size: 14px;">${text}</span>
  </div>`;
}

const svgPen = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1B8B2C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>`;
const svgBook = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1B8B2C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>`;
const svgChart = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1B8B2C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>`;
const svgCheck = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1B8B2C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>`;

export function welcomeEmail(firstName: string): EmailOptions & { subject: string } {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://steamwriterai.com";
  return {
    to: "",
    subject: "Welcome to SteamWriterAi",
    html: emailWrapper(`
      <h2 style="margin: 0 0 8px 0; font-size: 24px; font-weight: 800; color: #111;">Welcome, ${firstName}!</h2>
      <p style="margin: 0 0 20px 0; color: #6b7280; font-size: 15px;">
        Your account is ready. Start writing your research like never before.
      </p>

      ${featureItem(svgPen, "<strong>Generate chapters 1–5</strong> with real citations and APA 7 formatting")}
      ${featureItem(svgBook, "<strong>Discover journals</strong> relevant to your topic from 50,000+ sources")}
      ${featureItem(svgChart, "<strong>Analyse data</strong> with professional tables, charts and methodology")}
      ${featureItem(svgCheck, "<strong>Check AI detection & plagiarism</strong> before submission")}

      <div style="margin: 28px 0 0 0; text-align: center;">
        ${button(appUrl + "/user/projects/new", "Start Your First Project →")}
      </div>

      <p style="margin: 24px 0 0 0; color: #6b7280; font-size: 13px; text-align: center;">
        Need help? Reply to this email or visit our <a href="${appUrl}/faq" style="color: #1B8B2C;">FAQ</a>.
      </p>
    `),
  };
}

export function verificationEmail(firstName: string, verificationUrl: string): EmailOptions & { subject: string } {
  return {
    to: "",
    subject: "Verify your email — SteamWriterAi",
    html: emailWrapper(`
      <h2 style="margin: 0 0 8px 0; font-size: 24px; font-weight: 800; color: #111;">Verify your email</h2>
      <p style="margin: 0 0 16px 0; color: #6b7280; font-size: 15px;">
        Hi ${firstName}, click the button below to verify your email address and activate your account.
      </p>
      <p style="margin: 0 0 4px 0; color: #374151; font-size: 14px;">This link expires in <strong>24 hours</strong>.</p>

      <div style="margin: 24px 0; text-align: center;">
        ${button(verificationUrl, "Verify Email Address")}
      </div>

      <p style="margin: 16px 0 0 0; color: #9ca3af; font-size: 13px; text-align: center;">
        If you didn't create an account, you can safely ignore this email.
      </p>
    `),
  };
}

export function passwordResetEmail(firstName: string, resetUrl: string): EmailOptions & { subject: string } {
  return {
    to: "",
    subject: "Reset your SteamWriterAi password",
    html: emailWrapper(`
      <h2 style="margin: 0 0 8px 0; font-size: 24px; font-weight: 800; color: #111;">Reset your password</h2>
      <p style="margin: 0 0 16px 0; color: #6b7280; font-size: 15px;">
        Hi ${firstName}, we received a request to reset your password. Click the button below to set a new one.
      </p>
      <p style="margin: 0 0 4px 0; color: #374151; font-size: 14px;">This link expires in <strong>1 hour</strong>.</p>

      <div style="margin: 24px 0; text-align: center;">
        ${button(resetUrl, "Reset Password")}
      </div>

      <p style="margin: 16px 0 0 0; color: #9ca3af; font-size: 13px; text-align: center;">
        If you didn't request this, you can safely ignore this email. Your password won't change.
      </p>
    `),
  };
}

export function paymentConfirmationEmail(
  firstName: string,
  plan: string,
  amount: number,
  reference: string
): EmailOptions & { subject: string } {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://steamwriterai.com";
  return {
    to: "",
    subject: "Payment Confirmed — SteamWriterAi",
    html: emailWrapper(`
      <h2 style="margin: 0 0 8px 0; font-size: 24px; font-weight: 800; color: #111;">Payment Confirmed</h2>
      <p style="margin: 0 0 20px 0; color: #6b7280; font-size: 15px;">
        Hi ${firstName}, your payment has been verified and your plan is now active.
      </p>

      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; margin: 0 0 24px 0;">
        <tr>
          <td style="padding: 16px 20px; background: #f9fafb; border-bottom: 1px solid #e5e7eb;">
            <span style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Plan</span><br/>
            <strong style="color: #111; font-size: 16px;">${plan}</strong>
          </td>
        </tr>
        <tr>
          <td style="padding: 16px 20px; border-bottom: 1px solid #e5e7eb;">
            <span style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Amount</span><br/>
            <strong style="color: #1B8B2C; font-size: 18px;">₦${amount.toLocaleString()}</strong>
          </td>
        </tr>
        <tr>
          <td style="padding: 16px 20px;">
            <span style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Reference</span><br/>
            <code style="color: #374151; font-size: 13px; background: #f3f4f6; padding: 2px 8px; border-radius: 4px;">${reference}</code>
          </td>
        </tr>
      </table>

      <div style="text-align: center;">
        ${button(appUrl + "/user/dashboard", "Go to Dashboard →")}
      </div>
    `),
  };
}
