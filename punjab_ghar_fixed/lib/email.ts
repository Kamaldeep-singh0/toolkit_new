import { optionalEnv, requiredEnv } from "./env";
import * as https from "https";

type SendToolkitEmailInput = {
  to: string;
  token: string;
  paymentId: string;
};

function sendSmtpEmail(options: {
  from: string;
  to: string;
  subject: string;
  html: string;
  gmailUser: string;
  gmailPassword: string;
}): Promise<{ error: string | null }> {
  return new Promise((resolve) => {
    // Use Gmail SMTP via nodemailer-style raw SMTP over TLS
    // We call Gmail's SMTP API via a simple HTTPS POST to avoid needing nodemailer package
    // Instead we use Gmail API via fetch with OAuth... 
    // Actually simplest: use a direct SMTP call via the 'nodemailer' approach
    // But we don't have nodemailer installed. Let's use smtp directly.
    resolve({ error: null });
  });
}

export async function sendToolkitEmail({ to, token, paymentId }: SendToolkitEmailInput): Promise<{ error: string | null }> {
  const siteUrl = requiredEnv("NEXT_PUBLIC_SITE_URL").replace(/\/$/, "");
  const brand = optionalEnv("NEXT_PUBLIC_BRAND_NAME", "Punjab Ghar Toolkit");
  const gmailUser = requiredEnv("GMAIL_USER");
  const gmailPassword = requiredEnv("GMAIL_APP_PASSWORD");
  const fromName = optionalEnv("GMAIL_FROM_NAME", brand);
  const downloadUrl = `${siteUrl}/download/${token}`;

  const subject = `Your ${brand} download link`;
  const html = `
    <div style="font-family:Arial,sans-serif;max-width:620px;margin:0 auto;background:#ffffff;color:#142033;line-height:1.6">
      <h2 style="color:#0c2344;margin-bottom:8px">Payment successful ✅</h2>
      <p>Thank you for buying <strong>${brand}</strong>.</p>
      <p>Your toolkit includes:</p>
      <ol>
        <li>House Building Mistakes PDF</li>
        <li>Printable Site Checklist</li>
        <li>Grey Structure Cost Calculator</li>
      </ol>
      <p style="margin:28px 0">
        <a href="${downloadUrl}" style="background:#f5c542;color:#0c2344;text-decoration:none;padding:14px 22px;border-radius:999px;font-weight:800;display:inline-block">Download your toolkit</a>
      </p>
      <p>This secure link is valid for 7 days. Please download and save the files.</p>
      <p style="font-size:13px;color:#667085">Payment ID: ${paymentId}</p>
      <hr style="border:none;border-top:1px solid #e3e8f0;margin:24px 0" />
      <p style="font-size:13px;color:#667085">If the button does not work, copy and paste this link:<br>${downloadUrl}</p>
    </div>
  `;

  try {
    // Use nodemailer via dynamic require
    const nodemailer = await import("nodemailer");
    
    const transporter = nodemailer.default.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: gmailUser,
        pass: gmailPassword.replace(/\s/g, ""), // remove any spaces
      },
    });

    await transporter.sendMail({
      from: `"${fromName}" <${gmailUser}>`,
      to,
      subject,
      html,
    });

    return { error: null };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return { error: message };
  }
}
