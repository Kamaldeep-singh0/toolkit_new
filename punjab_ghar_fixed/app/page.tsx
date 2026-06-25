import { optionalEnv } from "@/lib/env";

export default function HomePage() {
  const paymentUrl = optionalEnv("NEXT_PUBLIC_RAZORPAY_PAYMENT_PAGE_URL", "#buy");
  const supportWhatsapp = optionalEnv("NEXT_PUBLIC_SUPPORT_WHATSAPP", "91XXXXXXXXXX");
  const brand = optionalEnv("NEXT_PUBLIC_BRAND_NAME", "Punjab Ghar Toolkit");

  return (
    <>
      <header className="topbar">
        <a className="brand" href="#top" id="top">
          <span className="brand-icon">🏠</span>
          <span>
            <strong>{brand}</strong>
            <small>For Punjab home builders</small>
          </span>
        </a>
        <a className="top-buy" href={paymentUrl}>Buy ₹99</a>
      </header>

      <main>

        {/* HERO */}
        <section className="hero">
          <div className="hero-content">
            <p className="pill">Take control of your home</p>
            <h1>3-in-1 Construction Bundle</h1>
            <p className="subtext">
              Most Punjab homeowners lose <strong>₹2–5 lakh</strong> to overcharging and avoidable mistakes.
              This ₹99 toolkit tells you exactly what to check — before it costs you.
            </p>
            <div className="cta-stack">
              <a className="btn btn-primary" href={paymentUrl}>Get the Toolkit — ₹99</a>
              <a className="btn btn-soft" href={`https://wa.me/${supportWhatsapp}`} target="_blank" rel="noopener noreferrer">Ask on WhatsApp</a>
            </div>
          </div>

         <div className="hero-preview">
  <div className="preview-card">
    <b>Calculator</b>
    <img src="/calculator-preview.png" alt="Cost Calculator preview" style={{ width: "100%", borderRadius: 16, marginTop: 10, display: "block" }} />
  </div>
  <div className="preview-card">
    <b>Checklist</b>
    <img src="/checklist-preview.png" alt="Site Checklist preview" style={{ width: "100%", borderRadius: 16, marginTop: 10, display: "block" }} />
  </div>
  <div className="preview-card">
    <b>Mistakes PDF</b>
    <img src="/mistakes-preview.png" alt="Mistakes PDF preview" style={{ width: "100%", borderRadius: 16, marginTop: 10, display: "block" }} />
  </div>
</div>
        </section>

        {/* WHAT YOU GET */}
        <section className="section">
          <p className="pill">What's inside</p>
          <div className="grid-3">
            <article className="card">
              <h3>Mistakes PDF</h3>
              <p>The 9 most costly construction mistakes in Punjab homes — with photos, explanations, and how to avoid each one.</p>
            </article>
            <article className="card">
              <h3>Site Checklist</h3>
              <p>Print it. Take it to site. Check foundation, RCC, plumbing, electrical, plaster — stage by stage. Nothing slips.</p>
            </article>
            <article className="card">
              <h3>Cost Calculator</h3>
              <p>Enter your plot size. Get a real grey structure estimate using Punjab material rates. Catch overcharging instantly.</p>
            </article>
          </div>
        </section>

        {/* OFFER */}
        <section className="section offer" id="buy">
          <p className="pill">Launch price</p>
          <h2>All three for ₹99</h2>
          <div className="price">
            <span className="cut">₹499</span>
            <strong>₹99</strong>
            <small>one-time · instant delivery</small>
          </div>
          <ul className="clean-list">
            <li>Mistakes PDF — avoid costly errors</li>
            <li>Printable Site Checklist — for every stage</li>
            <li>Grey Structure Calculator — catch overcharging</li>
            <li>Download link sent to your email instantly</li>
          </ul>
          <a className="btn btn-primary align:center" href={paymentUrl}>Buy Now — ₹99</a>
          <p style={{ marginTop: 14, fontSize: 13, color: "#94a3b8" }}>
            Secure payment via Razorpay · UPI, cards, Net Banking accepted
          </p>
        </section>

        {/* FAQ — minimal */}
        <section className="section grid-2">
          <div className="card">
            <h3>How do I get the files?</h3>
            <p>After payment, a download link is sent to your email automatically. Usually within 2 minutes.</p>
          </div>
          <div className="card">
            <h3>Didn't get the email?</h3>
            <p>Check spam first. Still missing? WhatsApp us with your payment ID — we'll sort it immediately.</p>
            <p style={{ marginTop: 12 }}>
              <a className="btn btn-soft" style={{ minHeight: 44, fontSize: 14 }} href={`https://wa.me/${supportWhatsapp}`} target="_blank" rel="noopener noreferrer">WhatsApp Support</a>
            </p>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-links">
        <a href="/privacy-policy">Privacy Policy</a>
        <a href="/refund-policy">Refund Policy</a>
        <a href="/terms">Terms</a>
        <a href="/contact">Contact</a>
      </div>
      <p>© {new Date().getFullYear()} Punjab Ghar Toolkit. Educational digital product.</p>
    </footer>
  );
}
