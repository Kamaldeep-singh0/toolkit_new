import { optionalEnv } from "./env";

type SendToolkitEmailInput = {
  to: string;
  token: string;
  paymentId: string;
  siteUrl?: string;
};

export async function sendToolkitEmail({
  to,
  token,
  paymentId,
  siteUrl: inputSiteUrl,
}: SendToolkitEmailInput): Promise<{ error: string | null }> {
  const fallbackSiteUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "";
  const siteUrl = inputSiteUrl || process.env.NEXT_PUBLIC_SITE_URL || fallbackSiteUrl;

  if (!siteUrl || siteUrl.trim() === "") {
    throw new Error("Missing site URL. Set NEXT_PUBLIC_SITE_URL in Vercel.");
  }

  const cleanSiteUrl = siteUrl.replace(/\/$/, "");
  const brand = optionalEnv("NEXT_PUBLIC_BRAND_NAME", "Punjab Ghar Toolkit");
  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail = optionalEnv("EMAIL_FROM", "Punjab Ghar Toolkit <support@ravi-saini.in>");
  const downloadUrl = `${cleanSiteUrl}/download/${token}`;

  const subject = `Your ${brand} download link`;
  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; color: #1e293b; line-height: 1.6; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px;">
      <h2 style="color: #0f172a; margin-top: 0; margin-bottom: 8px;">Payment Successful ✅</h2>
      <p style="font-size: 15px; color: #334155; margin-bottom: 20px;">
        Thank you for choosing <strong>${brand}</strong>. Your toolkit is ready for download.
      </p>
      
      <div style="background: #f8fafc; border-left: 4px solid #c89d54; padding: 14px 18px; margin-bottom: 24px; border-radius: 0 8px 8px 0;">
        <p style="margin: 0 0 8px; font-weight: 700; color: #0f172a; font-size: 14px;">Included in your bundle:</p>
        <ul style="margin: 0; padding-left: 20px; color: #475569; font-size: 14px;">
          <li>Punjab House Building Mistakes Guide (PDF)</li>
          <li>Stage-by-Stage Site Inspection Checklist (Printable)</li>
          <li>Grey Structure Cost & Material Calculator (Sheet)</li>
        </ul>
      </div>

      <div style="text-align: center; margin: 32px 0;">
        <a href="${downloadUrl}" style="background: #c89d54; color: #080b12; text-decoration: none; padding: 14px 28px; border-radius: 9999px; font-weight: 800; font-size: 15px; display: inline-block; box-shadow: 0 4px 14px rgba(200, 157, 84, 0.35);">
          Download Your Toolkit Now
        </a>
      </div>

      <p style="font-size: 13px; color: #64748b; margin-bottom: 6px;">
        ⏳ <strong>Note:</strong> This secure download link is valid for 7 days. Please download and save the files to your device.
      </p>
      <p style="font-size: 12px; color: #94a3b8; margin: 0;">
        Payment ID: <code style="background: #f1f5f9; padding: 2px 6px; border-radius: 4px;">${paymentId}</code>
      </p>
      
      <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
      
      <p style="font-size: 12px; color: #94a3b8; line-height: 1.5; margin: 0;">
        If the button above doesn't work, copy and paste this link into your browser:<br/>
        <a href="${downloadUrl}" style="color: #c89d54; word-break: break-all;">${downloadUrl}</a>
      </p>
    </div>
  `;

  // 1. Primary: If RESEND_API_KEY is configured, use Resend API (Direct REST, no SMTP timeouts, 100% Inbox delivery)
  if (resendApiKey && resendApiKey.trim() !== "") {
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey.trim()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [to],
          subject,
          html,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { error: data?.message || "Failed to send email via Resend API" };
      }

      return { error: null };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      return { error: message };
    }
  }

  // 2. Fallback: If Resend is not set, fallback to Gmail SMTP if GMAIL_USER is provided
  const gmailUser = process.env.GMAIL_USER;
  const gmailPassword = process.env.GMAIL_APP_PASSWORD;

  if (gmailUser && gmailPassword) {
    try {
      const nodemailer = await import("nodemailer");
      const fromName = optionalEnv("GMAIL_FROM_NAME", brand);

      const transporter = nodemailer.default.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: gmailUser,
          pass: gmailPassword.replace(/\s/g, ""),
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

  return {
    error: "No email service configured. Please set RESEND_API_KEY in your environment variables.",
  };
}
