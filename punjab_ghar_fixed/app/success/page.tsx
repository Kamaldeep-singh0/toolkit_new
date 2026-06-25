import { optionalEnv } from "@/lib/env";

export default function SuccessPage() {
  const brand = optionalEnv("NEXT_PUBLIC_BRAND_NAME", "Punjab Ghar Toolkit");
  const supportWhatsapp = optionalEnv("NEXT_PUBLIC_SUPPORT_WHATSAPP", "91XXXXXXXXXX");
  const supportEmail = optionalEnv("NEXT_PUBLIC_SUPPORT_EMAIL", "");

  return (
    <main className="section" style={{ maxWidth: 680, textAlign: "center" }}>
      <div className="success-box">
        <p className="pill">Payment successful</p>
        <h1>✅ Thank you for buying {brand}!</h1>
        <p className="subtext" style={{ fontSize: 18, marginTop: 16 }}>
          <strong>Check your email inbox now.</strong>
        </p>
        <p className="subtext">
          A secure download link has been sent to the email address you entered during payment.
          Please check your spam/junk folder too.
        </p>
        <p style={{ marginTop: 24, padding: "16px", background: "#fffbe6", borderRadius: 12, fontSize: 14, color: "#7a5900" }}>
          ⏳ Email usually arrives within 1–2 minutes. If you do not receive it within 5 minutes, contact support below.
        </p>
        <div className="cta-stack" style={{ marginTop: 28 }}>
          <a
            className="btn btn-soft"
            href={`https://wa.me/${supportWhatsapp}?text=I%20paid%20for%20${encodeURIComponent(brand)}%20but%20did%20not%20receive%20the%20download%20email`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Contact WhatsApp Support
          </a>
          {supportEmail && (
            <a className="btn btn-soft" href={`mailto:${supportEmail}`}>
              Email Support
            </a>
          )}
        </div>
      </div>
    </main>
  );
}
