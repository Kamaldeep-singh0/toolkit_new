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
            <small>Ghar banane da asaan toolkit · ₹99</small>
          </span>
        </a>
        <a className="top-buy" href={paymentUrl}>Kharido ₹99</a>
      </header>

      <main>
        {/* HERO */}
        <section className="hero">
          <div className="hero-content">
            <p className="pill">Punjab de ghar builders vaaste</p>
            <h1>Lakhs lagaun ton pehle, ih 3 gallan zaroor jaano.</h1>
            <p className="subtext">
              <strong>Mistakes PDF + Printable Checklist + Grey Structure Calculator</strong> — tino cheezaan ik ₹99 bundle vich.
              Grey structure di planning galat hove taan baad vich lakhon di barbadi hundi hai.
            </p>
            <div className="cta-stack">
              <a className="btn btn-primary" href={paymentUrl}>Toolkit kharido sirf ₹99 vich</a>
              <a className="btn btn-soft" href={`https://wa.me/${supportWhatsapp}?text=Mujhe%20Punjab%20Ghar%20Toolkit%20ke%20baare%20mein%20jaanna%20hai`} target="_blank" rel="noopener noreferrer">WhatsApp te poochho</a>
            </div>
            <div className="trust-strip">
              <span>🔒 Razorpay secure payment</span>
              <span>📧 Email delivery automatic</span>
              <span>📱 Mobile-friendly guide</span>
            </div>
          </div>

          <div className="hero-preview" aria-hidden="true">
            <div className="preview-card">
              <b>Calculator</b>
              <div className="preview-mock">
                <span className="mock-line short" />
                <span className="mock-line mid" />
                <span className="mock-line" />
                <span className="mock-line mid" />
              </div>
            </div>
            <div className="preview-card">
              <b>Checklist PDF</b>
              <div className="preview-mock">
                <span className="mock-line" />
                <span className="mock-line short" />
                <span className="mock-line mid" />
                <span className="mock-line" />
              </div>
            </div>
          </div>
        </section>

        {/* WHAT YOU GET */}
        <section className="section">
          <p className="pill">Tuhanu ki milega</p>
          <h2>Tino tools ik jagah</h2>
          <div className="grid-3">
            <article className="card">
              <h3>1. Ghar Mistakes PDF</h3>
              <p>Punjab vich ghar banande time jo sabton vaddi galtiyan hundi hain — foundation, RCC, plaster, plumbing — saari detail vich Punjabi/Hindi vich samjhaya.</p>
            </article>
            <article className="card">
              <h3>2. Printable Site Checklist</h3>
              <p>Foundation ton lekar final finishing tak — har stage di checklist. Print karo te site te lejaao. Contractor te nazar rakho.</p>
            </article>
            <article className="card">
              <h3>3. Grey Structure Calculator</h3>
              <p>Apna plot size daalo te rough estimate milega — cement, steel, sand, bricks sabda. Overcharge pakad sakoge contractor da.</p>
            </article>
          </div>
        </section>

        {/* SOCIAL PROOF */}
        <section className="section" style={{ background: "#f8f9fc", borderRadius: 16, padding: "32px 24px" }}>
          <p className="pill">Loki keh rahe hain</p>
          <div className="grid-3">
            <article className="card">
              <p style={{ fontSize: 15 }}>"Calculator ne mera contractor da overcharge 40,000 rupee pakad leya. Best ₹99 spend kita."</p>
              <p style={{ fontSize: 13, color: "#667085", marginTop: 8 }}>— Gurpreet Singh, Ludhiana</p>
            </article>
            <article className="card">
              <p style={{ fontSize: 15 }}>"Checklist PDF leke site te gayi taan contractor ne ek dum sahi kaam kita, koi bahaana nahi."</p>
              <p style={{ fontSize: 13, color: "#667085", marginTop: 8 }}>— Manpreet Kaur, Amritsar</p>
            </article>
            <article className="card">
              <p style={{ fontSize: 15 }}>"Mistakes PDF padhke meri foundation di galti samajh aayi samay te. Bahut useful."</p>
              <p style={{ fontSize: 13, color: "#667085", marginTop: 8 }}>— Harjinder, Patiala</p>
            </article>
          </div>
        </section>

        {/* OFFER / BUY */}
        <section className="section offer" id="buy">
          <p className="pill">Limited time launch price</p>
          <h2>Complete toolkit sirf ₹99 vich</h2>
          <div className="price">
            <span className="cut">₹499</span>
            <strong>₹99</strong>
            <small>one-time · koi subscription nahi</small>
          </div>
          <ul className="clean-list">
            <li>✅ Mistakes PDF (ghar banane di sabton common galtiyan)</li>
            <li>✅ Printable Site Checklist (har stage ke liye)</li>
            <li>✅ Grey Structure Calculator (Excel, Punjab ratios ke saath)</li>
            <li>✅ Razorpay secure checkout (UPI, cards, Net Banking)</li>
            <li>✅ Payment ke baad automatic email delivery</li>
            <li>✅ WhatsApp support available</li>
          </ul>
          <a className="btn btn-primary" href={paymentUrl}>Hune Kharido — ₹99 Only</a>
          <p style={{ marginTop: 14, fontSize: 13, color: "#667085" }}>
            Payment karne ke baad download link Razorpay pe ditti email te automatic aayega.
          </p>
        </section>

        {/* HOW IT WORKS */}
        <section className="section">
          <p className="pill">Delivery kidan hundi hai</p>
          <div className="grid-3">
            <article className="card">
              <h3>1. Pay Karo</h3>
              <p>₹99 da payment Razorpay Payment Page te karo — UPI, card ya Net Banking naal.</p>
            </article>
            <article className="card">
              <h3>2. Auto Verify</h3>
              <p>Razorpay payment success Vercel server te verify hunda hai automatically.</p>
            </article>
            <article className="card">
              <h3>3. Download Karo</h3>
              <p>Tumhari email te ek private download link aaunda hai. Tino files download karo.</p>
            </article>
          </div>
        </section>

        {/* FAQ */}
        <section className="section">
          <p className="pill">Sawaal jawab</p>
          <h2>FAQ</h2>
          <div className="grid-2">
            <article className="card">
              <h3>Payment karne ke baad email nahi aya?</h3>
              <p>1–2 minute wait karo. Spam folder check karo. Phir bhi nahi aya taan WhatsApp te message karo — payment ID ke saath.</p>
            </article>
            <article className="card">
              <h3>Refund milega kya?</h3>
              <p>Yeh digital product hai, isliye generally refund nahi milta. Par koi technical problem hove taan support naal contact karo.</p>
            </article>
            <article className="card">
              <h3>Calculator sahi quantities deta hai?</h3>
              <p>Yeh planning ke liye rough estimate hai. Final quantities engineer ya contractor ton confirm karwao. Educational tool hai.</p>
            </article>
            <article className="card">
              <h3>Download link kitne dino tak chalega?</h3>
              <p>Download link 7 din valid rehta hai. Is waqt vich saari files download karke save karo.</p>
            </article>
          </div>
        </section>

        {/* SUPPORT */}
        <section className="section grid-2">
          <div className="card">
            <h3>Important note</h3>
            <p>Ih ek educational planning toolkit hai. Final quantities, structure safety te actual cost engineer ya architect ton zaroor verify karwao.</p>
          </div>
          <div className="card">
            <h3>Madad chahidi hai?</h3>
            <p>Payment ho gayi par email nahi aya? Ya koi sawaal hai? WhatsApp te message karo.</p>
            <p><a className="btn btn-soft" href={`https://wa.me/${supportWhatsapp}`} target="_blank" rel="noopener noreferrer">WhatsApp Support</a></p>
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
      <p>© {new Date().getFullYear()} Punjab Ghar Toolkit. Digital educational product.</p>
    </footer>
  );
}
