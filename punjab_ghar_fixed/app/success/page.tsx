import { optionalEnv } from "@/lib/env";

export default function SuccessPage() {
  const brand = optionalEnv("NEXT_PUBLIC_BRAND_NAME", "Punjab Ghar Toolkit");
  const supportWhatsapp = optionalEnv("NEXT_PUBLIC_SUPPORT_WHATSAPP", "6283918770");
  const supportEmail = optionalEnv("NEXT_PUBLIC_SUPPORT_EMAIL", "partnerships.ravisaini@gmail.com");

  return (
    <main className="section" style={{ maxWidth: 680, textAlign: "center" }}>
      <div className="success-box">
        <p className="pill">Payment successful</p>
        <h1>Payment successful ✅</h1>
        <p className="subtext" style={{ fontSize: 18, marginTop: 16 }}>
          <strong>Thank you for buying {brand}.</strong>
        </p>
        <div className="success-details">
          <p>Your download link will be sent to your email.</p>
          <p>The download link is valid for 7 days.</p>
          <p>Please check Inbox, Promotions, and Spam folder.</p>
          <p>
            For support: <a href={`mailto:${supportEmail}`}>{supportEmail}</a> /{" "}
            <a href={`https://wa.me/${supportWhatsapp}`} target="_blank" rel="noopener noreferrer">
              WhatsApp {supportWhatsapp}
            </a>
          </p>
        </div>
        <div className="cta-stack" style={{ marginTop: 28 }}>
          <a
            className="btn btn-soft"
            href={`https://wa.me/${supportWhatsapp}?text=I%20paid%20for%20${encodeURIComponent(brand)}%20but%20did%20not%20receive%20the%20download%20email`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Contact WhatsApp Support
          </a>
          <a className="btn btn-soft" href={`mailto:${supportEmail}`}>
            Email Support
          </a>
        </div>
      </div>
    </main>
  );
}
