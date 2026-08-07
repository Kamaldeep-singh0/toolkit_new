import { optionalEnv } from "@/lib/env";

export default function ContactPage() {
  const whatsapp = optionalEnv("NEXT_PUBLIC_SUPPORT_WHATSAPP", "6283918770");
  const email = optionalEnv("NEXT_PUBLIC_SUPPORT_EMAIL", "partnerships.ravisaini@gmail.com");

  return (
    <main className="section" style={{ maxWidth: 760 }}>
      <div className="card">
        <p className="pill">Contact</p>
        <h1>Support</h1>
        <p>For payment, delivery or download issues, contact us with your payment email and Razorpay payment screenshot.</p>
        <p>
          Email: <a href={`mailto:${email}`}>{email}</a>
          <br />
          Phone/WhatsApp: <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer">{whatsapp}</a>
        </p>
        <div className="cta-stack">
          <a className="btn btn-primary" href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer">WhatsApp Support</a>
          <a className="btn btn-soft" href={`mailto:${email}`}>{email}</a>
        </div>
      </div>
    </main>
  );
}
