import { optionalEnv } from "@/lib/env";

const reviews = [
  {
    buyer: "Verified buyer • vs***@gmail.com",
    text: "3 in 1 Bundle bhot vdia hai bhaji"
  },
  {
    buyer: "Verified buyer • ar***@gmail.com",
    text: "calculator boht hi useful ae"
  },
  {
    buyer: "Verified buyer • gu***@gmail.com",
    text: "Calculator gave me a rough idea of grey structure cost in simple way."
  },
  {
    buyer: "Verified buyer • si***@gmail.com",
    text: "PDF language is simple and practical for normal homeowners."
  }
];

export default function HomePage() {
  const paymentUrl = optionalEnv("NEXT_PUBLIC_RAZORPAY_PAYMENT_PAGE_URL", "#buy");
  const supportWhatsapp = optionalEnv("NEXT_PUBLIC_SUPPORT_WHATSAPP", "6283918770");
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
        <section className="hero">
          <div className="hero-content">
            <p className="pill">Take control of your home</p>
            <h1>{brand}</h1>
            <p className="subtext">
              PDF + Grey Structure Cost Calculator + Printable Checklist for Punjab home planning.
              Get the complete digital toolkit for <strong>₹99 only</strong>.
            </p>
            <div className="trust-strip">
              <span>Secure payment via Razorpay</span>
              <span>Download link sent to your email after payment</span>
            </div>
            <div className="cta-stack">
              <a className="btn btn-primary" href={paymentUrl}>Get the Toolkit — ₹99</a>
              <a className="btn btn-soft" href={`https://wa.me/${supportWhatsapp}`} target="_blank" rel="noopener noreferrer">Ask on WhatsApp</a>
            </div>
          </div>

          <div className="hero-preview">
            <div className="preview-card">
              <b>Calculator</b>
              <img src="/calculator-preview.png" alt="Cost Calculator preview" />
            </div>
            <div className="preview-card">
              <b>Checklist</b>
              <img src="/checklist-preview.png" alt="Site Checklist preview" />
            </div>
            <div className="preview-card">
              <b>Mistakes PDF</b>
              <img src="/mistakes-preview.png" alt="Mistakes PDF preview" />
            </div>
          </div>
        </section>

        <section className="section">
          <p className="pill">What's inside</p>
          <div className="grid-3">
            <article className="card">
              <h3>Mistakes PDF</h3>
              <p>Common construction mistakes in Punjab homes, explained in simple language so you know what to check before each stage.</p>
            </article>
            <article className="card">
              <h3>Site Checklist</h3>
              <p>Print it. Take it to site. Check foundation, RCC, plumbing, electrical, and plaster stage by stage.</p>
            </article>
            <article className="card">
              <h3>Cost Calculator</h3>
              <p>Enter your plot size and get a rough grey structure estimate using Punjab material-rate assumptions.</p>
            </article>
          </div>
        </section>

        <section className="section reviews-section">
          <div className="section-heading">
            <p className="pill">Reviews</p>
            <h2>Loved by 100+ Home Builders & Planners</h2>
            <p className="subtext">
              Punjab Ghar Toolkit has been purchased by 100+ people who are planning or building their home.
            </p>
          </div>
          <div className="review-grid">
            {reviews.map((review) => (
              <article className="review-card" key={review.buyer}>
                <div className="stars" aria-label="5 star review">★★★★★</div>
                <p>{review.text}</p>
                <span>{review.buyer}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="section offer" id="buy">
          <p className="pill">Launch price</p>
          <h2>All three for ₹99</h2>
          <div className="price">
            <span className="cut">₹499</span>
            <strong>₹99</strong>
            <small>one-time · instant delivery</small>
          </div>
          <ul className="clean-list">
            <li>Mistakes PDF — avoid common errors</li>
            <li>Printable Site Checklist — for every stage</li>
            <li>Grey Structure Calculator — get a rough planning estimate</li>
            <li>Download link sent to your email after successful payment</li>
          </ul>
          <a className="btn btn-primary align:center" href={paymentUrl}>Buy Now — ₹99</a>
          <p style={{ marginTop: 14, fontSize: 13, color: "#94a3b8" }}>
            Secure payment via Razorpay · UPI, cards, Net Banking accepted
          </p>
        </section>

        <section className="section grid-2">
          <div className="card">
            <h3>How do I get the files?</h3>
            <p>After payment, a download link is sent to your email automatically. Usually within 2 minutes.</p>
          </div>
          <div className="card">
            <h3>Didn't get the email?</h3>
            <p>Check Inbox, Promotions, and Spam first. Still missing? WhatsApp us with your payment ID.</p>
            <p style={{ marginTop: 12 }}>
              <a className="btn btn-soft" style={{ minHeight: 44, fontSize: 14 }} href={`https://wa.me/${supportWhatsapp}`} target="_blank" rel="noopener noreferrer">WhatsApp Support</a>
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
