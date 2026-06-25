import { Resend } from "resend";
import { optionalEnv, requiredEnv } from "./env";

const resend = new Resend(requiredEnv("RESEND_API_KEY"));

type SendToolkitEmailInput = {
  to: string;
  token: string;
  paymentId: string;
};

export async function sendToolkitEmail({ to, token, paymentId }: SendToolkitEmailInput) {
  const siteUrl = requiredEnv("NEXT_PUBLIC_SITE_URL").replace(/\/$/, "");
  const brand = optionalEnv("NEXT_PUBLIC_BRAND_NAME", "Punjab Ghar Toolkit");
  const replyTo = optionalEnv("DELIVERY_REPLY_TO", optionalEnv("NEXT_PUBLIC_SUPPORT_EMAIL", ""));
  const downloadUrl = `${siteUrl}/download/${token}`;

  return resend.emails.send({
    from: requiredEnv("DELIVERY_FROM_EMAIL"),
    to,
    replyTo: replyTo || undefined,
    subject: `Your ${brand} download link`,
    html: `
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
        <p>This secure link is made for your purchase. Please save the files after opening the link.</p>
        <p style="font-size:13px;color:#667085">Payment ID: ${paymentId}</p>
        <hr style="border:none;border-top:1px solid #e3e8f0;margin:24px 0" />
        <p style="font-size:13px;color:#667085">If the button does not work, copy and paste this link into your browser:<br>${downloadUrl}</p>
      </div>
    `
  });
}
