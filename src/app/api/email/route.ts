import { NextRequest, NextResponse } from "next/server";
import {
  sendEmail,
  welcomeEmail,
  passwordResetEmail,
  paymentConfirmationEmail,
} from "@/lib/email/mailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, to, firstName, resetUrl, plan, amount, reference } = body;

    if (!to || !type) {
      return NextResponse.json({ error: "Missing required fields: to, type" }, { status: 400 });
    }

    let emailPayload;
    switch (type) {
      case "welcome":
        emailPayload = welcomeEmail(firstName || "User");
        emailPayload.to = to;
        break;
      case "password-reset":
        if (!resetUrl) {
          return NextResponse.json({ error: "Missing resetUrl" }, { status: 400 });
        }
        emailPayload = passwordResetEmail(firstName || "User", resetUrl);
        emailPayload.to = to;
        break;
      case "payment-confirmation":
        if (!plan || !amount || !reference) {
          return NextResponse.json({ error: "Missing plan, amount, or reference" }, { status: 400 });
        }
        emailPayload = paymentConfirmationEmail(firstName || "User", plan, amount, reference);
        emailPayload.to = to;
        break;
      default:
        return NextResponse.json({ error: `Unknown email type: ${type}` }, { status: 400 });
    }

    const success = await sendEmail(emailPayload);
    if (success) {
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  } catch (error) {
    console.error("[API /api/email] Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    service: "SteamWriterAi Email Service",
    supportedTypes: ["welcome", "password-reset", "payment-confirmation"],
    smtp: {
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT || 465),
      user: process.env.SMTP_USER || "steamwriterai@gmail.com",
    },
  });
}
