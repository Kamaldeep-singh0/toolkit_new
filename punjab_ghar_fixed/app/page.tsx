import { optionalEnv } from "@/lib/env";

const reviews = [
  {
    buyer: "Verified buyer • vs***@gmail.com",
    text: "3 in 1 Bundle bhot vdia hai bhaji",
    rating: 5,
    location: "Ludhiana, Punjab",
    date: "2 days ago"
  },
  {
    buyer: "Verified buyer • ar***@gmail.com",
    text: "calculator boht hi useful ae",
    rating: 5,
    location: "Amritsar, Punjab",
    date: "4 days ago"
  },
  {
    buyer: "Verified buyer • gu***@gmail.com",
    text: "Calculator gave me a rough idea of grey structure cost in simple way.",
    rating: 5,
    location: "Jalandhar, Punjab",
    date: "1 week ago"
  },
  {
    buyer: "Verified buyer • si***@gmail.com",
    text: "PDF language is simple and practical for normal homeowners.",
    rating: 5,
    location: "Bathinda, Punjab",
    date: "1 week ago"
  }
];

export default function HomePage() {
  const paymentUrl = optionalEnv("NEXT_PUBLIC_RAZORPAY_PAYMENT_PAGE_URL", "#buy");
  const counsellingPaymentUrl = optionalEnv("NEXT_PUBLIC_RAZORPAY_COUNSELLING_PAYMENT_PAGE_URL", "#counselling");
  const supportWhatsapp = optionalEnv("NEXT_PUBLIC_SUPPORT_WHATSAPP", "6283918770");
  const brand = optionalEnv("NEXT_PUBLIC_BRAND_NAME", "Punjab Ghar Toolkit");
  const whatsappUrl = `https://wa.me/91${supportWhatsapp}?text=Hi%20Ravi%2C%20I%20have%20a%20question%20about%20the%20Punjab%20Ghar%20Toolkit`;

  return (
    <div className="pg-landing-root">
      <style>{`
        :root {
          --color-bg-dark: #080b12;
          --color-bg-surface: #0e1320;
          --color-bg-card: rgba(16, 22, 36, 0.78);
          --color-bg-card-hover: rgba(22, 30, 48, 0.95);
          --color-accent-gold: #c89d54;
          --color-accent-gold-light: #dfba78;
          --color-gold-glow: rgba(200, 157, 84, 0.16);
          --color-border: rgba(255, 255, 255, 0.08);
          --color-border-gold: rgba(200, 157, 84, 0.32);
          --color-text-main: #f1f4f9;
          --color-text-muted: #8e9bb0;
          --color-text-soft: #bac6d8;
        }

        .pg-landing-root {
          background-color: var(--color-bg-dark);
          color: var(--color-text-main);
          font-family: inherit;
          min-height: 100vh;
          overflow-x: hidden;
          position: relative;
          padding-bottom: 84px;
        }

        /* Subtle Luxury Ambient Background */
        .ambient-glow-top {
          position: absolute;
          top: -120px;
          left: 50%;
          transform: translateX(-50%);
          width: 680px;
          height: 480px;
          background: radial-gradient(circle, rgba(200, 157, 84, 0.09) 0%, rgba(14, 19, 32, 0) 70%);
          filter: blur(80px);
          pointer-events: none;
          z-index: 0;
        }

        /* Header */
        .pg-header {
          position: sticky;
          top: 0;
          z-index: 50;
          background: rgba(8, 11, 18, 0.92);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--color-border);
        }
        .pg-header-container {
          max-width: 1040px;
          margin: 0 auto;
          padding: 10px 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }
        .pg-brand-link {
          display: flex;
          align-items: center;
          gap: 9px;
          text-decoration: none;
          color: #fff;
          min-width: 0;
        }
        .pg-brand-name {
          font-weight: 750;
          font-size: 14.5px;
          letter-spacing: -0.01em;
          color: #f8fafc;
          white-space: nowrap;
        }
        .pg-brand-sub {
          display: block;
          font-size: 11px;
          color: var(--color-accent-gold);
          font-weight: 500;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .pg-header-actions {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }
        .pg-ig-pill {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--color-border);
          padding: 6px 10px;
          border-radius: 9999px;
          font-size: 11.5px;
          font-weight: 600;
          color: #f1f4f9;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .pg-ig-pill:hover {
          border-color: var(--color-accent-gold);
          background: rgba(200, 157, 84, 0.08);
        }
        .pg-header-nav-link {
          display: none;
          font-size: 13px;
          font-weight: 600;
          color: var(--color-text-muted);
          text-decoration: none;
          padding: 6px 10px;
          border-radius: 8px;
          transition: color 0.2s ease;
        }
        .pg-header-nav-link:hover {
          color: #ffffff;
        }
        @media (min-width: 640px) {
          .pg-header-nav-link {
            display: inline-block;
          }
          .pg-ig-pill {
            padding: 6px 12px;
            font-size: 12px;
          }
        }
        .pg-header-buy-cta {
          display: inline-flex;
          align-items: center;
          background: linear-gradient(135deg, #dfba78 0%, #c89d54 100%);
          color: #080b12;
          font-weight: 800;
          font-size: 12.5px;
          padding: 7px 14px;
          border-radius: 9999px;
          text-decoration: none;
          box-shadow: 0 2px 10px rgba(200, 157, 84, 0.25);
          transition: all 0.2s ease;
          white-space: nowrap;
        }
        .pg-header-buy-cta:hover {
          background: var(--color-accent-gold-light);
          transform: translateY(-1px);
        }

        /* Hero Section - Royal & Balanced */
        .pg-hero {
          position: relative;
          z-index: 10;
          padding: 44px 18px 46px;
          max-width: 820px;
          margin: 0 auto;
          text-align: center;
        }
        .pg-hero-content {
          max-width: 740px;
          margin: 0 auto;
        }
        .pg-ig-hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: rgba(200, 157, 84, 0.08);
          border: 1px solid var(--color-border-gold);
          padding: 6px 14px;
          border-radius: 9999px;
          font-size: 13px;
          font-weight: 600;
          color: var(--color-accent-gold-light);
          margin-bottom: 16px;
        }
        .pg-hero-title {
          font-size: clamp(28px, 5.5vw, 44px);
          font-weight: 800;
          line-height: 1.18;
          letter-spacing: -0.025em;
          margin: 0 0 14px;
          color: #ffffff;
        }
        .pg-hero-title-accent {
          color: var(--color-accent-gold);
          display: inline;
        }
        .pg-hero-sub {
          font-size: clamp(15px, 3.2vw, 17px);
          line-height: 1.6;
          color: var(--color-text-soft);
          margin: 0 0 24px;
        }
        .pg-hero-sub strong {
          color: #ffffff;
        }

        /* Dual Action Buttons (Toolkit + Counselling) */
        .pg-hero-actions {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin: 0 auto 24px;
          max-width: 540px;
        }
        @media (min-width: 520px) {
          .pg-hero-actions {
            flex-direction: row;
            align-items: stretch;
          }
        }
        .pg-btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          min-height: 52px;
          padding: 14px 22px;
          background: linear-gradient(135deg, #dfba78 0%, #c89d54 100%);
          color: #080b12;
          font-size: 16px;
          font-weight: 800;
          border-radius: 12px;
          text-decoration: none;
          box-shadow: 0 4px 18px rgba(200, 157, 84, 0.32);
          transition: all 0.2s ease;
          flex: 1;
        }
        .pg-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 22px rgba(200, 157, 84, 0.45);
        }
        .pg-btn-counselling {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          min-height: 52px;
          padding: 14px 22px;
          background: rgba(16, 22, 36, 0.9);
          border: 1px solid var(--color-border-gold);
          color: var(--color-accent-gold-light);
          font-size: 15px;
          font-weight: 750;
          border-radius: 12px;
          text-decoration: none;
          transition: all 0.2s ease;
          flex: 1;
        }
        .pg-btn-counselling:hover {
          background: rgba(200, 157, 84, 0.15);
          border-color: var(--color-accent-gold);
          transform: translateY(-2px);
        }

        .pg-hero-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          justify-content: center;
        }
        .pg-badge-item {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: var(--color-text-muted);
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--color-border);
          padding: 5px 12px;
          border-radius: 9999px;
        }

        /* Community Stats Bar */
        .pg-stats-container {
          max-width: 980px;
          margin: 0 auto 50px;
          padding: 0 18px;
        }
        .pg-stats-bar {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          background: var(--color-bg-card);
          border: 1px solid var(--color-border);
          border-radius: 18px;
          padding: 18px 16px;
        }
        @media (min-width: 768px) {
          .pg-stats-bar {
            grid-template-columns: repeat(4, 1fr);
            padding: 22px 28px;
          }
        }
        .pg-stat-col {
          text-align: center;
          padding: 4px;
        }
        .pg-stat-num {
          font-size: clamp(22px, 4vw, 28px);
          font-weight: 850;
          color: var(--color-accent-gold-light);
          margin-bottom: 2px;
          letter-spacing: -0.02em;
        }
        .pg-stat-name {
          font-size: 12px;
          color: var(--color-text-muted);
          font-weight: 500;
        }

        /* HIGHLIGHTED COUNSELLING HERO SPOTLIGHT (Made Prominent) */
        .pg-counselling-spotlight {
          max-width: 980px;
          margin: 0 auto 65px;
          padding: 0 18px;
        }
        .pg-counselling-royal-card {
          position: relative;
          background: linear-gradient(135deg, rgba(22, 29, 46, 0.95) 0%, rgba(14, 18, 30, 0.98) 100%);
          border: 1.5px solid var(--color-border-gold);
          border-radius: 22px;
          padding: 28px 20px;
          box-shadow: 0 14px 40px rgba(0, 0, 0, 0.5), 0 0 25px var(--color-gold-glow);
          display: flex;
          flex-direction: column;
          gap: 22px;
        }
        @media (min-width: 820px) {
          .pg-counselling-royal-card {
            flex-direction: row;
            align-items: center;
            padding: 34px 36px;
            gap: 36px;
          }
        }
        .pg-counselling-spotlight-left {
          flex: 1;
        }
        .pg-royal-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(200, 157, 84, 0.14);
          border: 1px solid var(--color-border-gold);
          color: var(--color-accent-gold-light);
          padding: 4px 12px;
          border-radius: 9999px;
          font-size: 11px;
          font-weight: 750;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 12px;
        }
        .pg-counselling-spotlight-title {
          font-size: clamp(22px, 3.8vw, 30px);
          font-weight: 800;
          color: #ffffff;
          line-height: 1.25;
          margin: 0 0 10px;
        }
        .pg-counselling-spotlight-desc {
          font-size: 14px;
          color: var(--color-text-soft);
          line-height: 1.6;
          margin: 0 0 16px;
        }
        .pg-counselling-keypoints {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          grid-template-columns: 1fr;
          gap: 8px;
        }
        @media (min-width: 540px) {
          .pg-counselling-keypoints {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        .pg-counselling-keypoints li {
          font-size: 13px;
          color: #e2e8f0;
          display: flex;
          align-items: center;
          gap: 7px;
        }
        .pg-counselling-keypoints span {
          color: var(--color-accent-gold);
          font-weight: 800;
        }

        .pg-counselling-spotlight-right {
          background: rgba(8, 11, 18, 0.7);
          border: 1px solid var(--color-border);
          border-radius: 16px;
          padding: 22px 20px;
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 12px;
          min-width: 270px;
          flex-shrink: 0;
        }
        .pg-counselling-fee-label {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--color-text-muted);
          margin: 0;
        }
        .pg-counselling-fee-price {
          font-size: 38px;
          font-weight: 900;
          color: var(--color-accent-gold-light);
          line-height: 1;
          margin: 0;
        }
        .pg-counselling-fee-sub {
          font-size: 12px;
          color: var(--color-text-muted);
          margin: 0;
        }

        /* Section Layout Common */
        .pg-section {
          max-width: 980px;
          margin: 0 auto 65px;
          padding: 0 18px;
        }
        .pg-section-header {
          text-align: center;
          margin-bottom: 32px;
        }
        .pg-section-badge {
          display: inline-block;
          font-size: 11px;
          font-weight: 750;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--color-accent-gold);
          background: rgba(200, 157, 84, 0.08);
          border: 1px solid var(--color-border-gold);
          padding: 4px 12px;
          border-radius: 9999px;
          margin-bottom: 10px;
        }
        .pg-section-title {
          font-size: clamp(24px, 4vw, 34px);
          font-weight: 800;
          color: #ffffff;
          line-height: 1.25;
          margin: 0 0 10px;
        }
        .pg-section-desc {
          font-size: 14px;
          color: var(--color-text-muted);
          max-width: 560px;
          margin: 0 auto;
          line-height: 1.55;
        }

        /* What's Inside */
        .pg-cards-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 18px;
        }
        @media (min-width: 768px) {
          .pg-cards-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        .pg-card {
          background: var(--color-bg-card);
          border: 1px solid var(--color-border);
          border-radius: 18px;
          padding: 24px 20px;
          transition: all 0.25s ease;
          display: flex;
          flex-direction: column;
        }
        .pg-card:hover {
          border-color: var(--color-border-gold);
          background: var(--color-bg-card-hover);
          transform: translateY(-3px);
        }
        .pg-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }
        .pg-card-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: rgba(200, 157, 84, 0.12);
          border: 1px solid var(--color-border-gold);
          color: var(--color-accent-gold-light);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .pg-card-pill {
          font-size: 11px;
          font-weight: 700;
          color: var(--color-accent-gold);
          background: rgba(200, 157, 84, 0.08);
          border: 1px solid var(--color-border-gold);
          padding: 3px 8px;
          border-radius: 6px;
        }
        .pg-card-title {
          font-size: 18px;
          font-weight: 750;
          color: #ffffff;
          margin: 0 0 10px;
          line-height: 1.3;
        }
        .pg-card-desc {
          font-size: 13.5px;
          color: var(--color-text-muted);
          line-height: 1.55;
          margin: 0 0 18px;
          flex-grow: 1;
        }
        .pg-card-list {
          list-style: none;
          padding: 14px 0 0;
          margin: 0;
          border-top: 1px solid var(--color-border);
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .pg-card-list li {
          font-size: 12.5px;
          color: var(--color-text-soft);
          display: flex;
          align-items: flex-start;
          gap: 8px;
        }
        .pg-card-list span {
          color: var(--color-accent-gold);
        }

        /* Visual Previews */
        .pg-previews-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }
        @media (min-width: 768px) {
          .pg-previews-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        .pg-preview-box {
          background: var(--color-bg-card);
          border: 1px solid var(--color-border);
          border-radius: 16px;
          overflow: hidden;
          transition: all 0.25s ease;
        }
        .pg-preview-box:hover {
          border-color: var(--color-border-gold);
          transform: translateY(-3px);
        }
        .pg-preview-img-container {
          background: #090d16;
          aspect-ratio: 16/10;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .pg-preview-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .pg-preview-meta {
          padding: 16px;
        }
        .pg-preview-meta h4 {
          font-size: 15px;
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 4px;
        }
        .pg-preview-meta p {
          font-size: 12.5px;
          color: var(--color-text-muted);
          margin: 0;
          line-height: 1.45;
        }

        /* Toolkit Offer Box */
        .pg-offer-card {
          max-width: 600px;
          margin: 0 auto;
          background: linear-gradient(180deg, #121827 0%, #0c101a 100%);
          border: 1.5px solid var(--color-border-gold);
          border-radius: 22px;
          padding: 32px 22px;
          text-align: center;
          box-shadow: 0 16px 45px rgba(0, 0, 0, 0.5);
        }
        .pg-offer-tag {
          display: inline-block;
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #080b12;
          background: var(--color-accent-gold);
          padding: 5px 14px;
          border-radius: 9999px;
          margin-bottom: 12px;
        }
        .pg-offer-title {
          font-size: 24px;
          font-weight: 800;
          color: #ffffff;
          margin: 0 0 8px;
        }
        .pg-offer-sub {
          font-size: 13.5px;
          color: var(--color-text-muted);
          margin: 0 0 20px;
        }
        .pg-offer-price-row {
          display: flex;
          align-items: baseline;
          justify-content: center;
          gap: 12px;
          margin-bottom: 22px;
        }
        .pg-price-bold {
          font-size: 52px;
          font-weight: 900;
          color: var(--color-accent-gold-light);
          line-height: 1;
        }
        .pg-price-cut {
          font-size: 20px;
          color: #64748b;
          text-decoration: line-through;
        }
        .pg-offer-checklist {
          list-style: none;
          padding: 16px;
          margin: 0 0 24px;
          text-align: left;
          background: rgba(0, 0, 0, 0.28);
          border: 1px solid var(--color-border);
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .pg-offer-checklist li {
          font-size: 13.5px;
          color: #e2e8f0;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .pg-offer-checklist span {
          color: var(--color-accent-gold);
          font-weight: 750;
        }

        /* Reviews */
        .pg-reviews-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 14px;
        }
        @media (min-width: 768px) {
          .pg-reviews-layout {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        .pg-review-card {
          background: var(--color-bg-card);
          border: 1px solid var(--color-border);
          border-radius: 16px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .pg-review-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .pg-stars {
          color: var(--color-accent-gold);
          letter-spacing: 2px;
          font-size: 14px;
        }
        .pg-review-time {
          font-size: 11.5px;
          color: var(--color-text-muted);
        }
        .pg-review-quote {
          font-size: 14px;
          color: #e2e8f0;
          line-height: 1.5;
          margin: 0;
          font-style: italic;
        }
        .pg-review-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid var(--color-border);
          padding-top: 10px;
          margin-top: 2px;
        }
        .pg-reviewer {
          font-size: 12px;
          color: var(--color-text-muted);
        }
        .pg-reviewer-loc {
          font-size: 11.5px;
          color: var(--color-accent-gold);
          font-weight: 500;
        }

        /* FAQ */
        .pg-faq-container {
          max-width: 680px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .pg-faq-item {
          background: var(--color-bg-card);
          border: 1px solid var(--color-border);
          border-radius: 14px;
          overflow: hidden;
        }
        .pg-faq-item[open] {
          border-color: var(--color-border-gold);
        }
        .pg-faq-summary {
          padding: 16px 18px;
          font-size: 15px;
          font-weight: 700;
          color: #ffffff;
          cursor: pointer;
          list-style: none;
          display: flex;
          align-items: center;
          justify-content: space-between;
          user-select: none;
        }
        .pg-faq-summary::-webkit-details-marker {
          display: none;
        }
        .pg-faq-chevron {
          color: var(--color-accent-gold);
          font-size: 12px;
        }
        .pg-faq-content {
          padding: 0 18px 16px;
          font-size: 13.5px;
          line-height: 1.6;
          color: var(--color-text-soft);
          border-top: 1px solid var(--color-border);
          padding-top: 12px;
        }
        .pg-faq-content a {
          color: var(--color-accent-gold);
          text-decoration: underline;
        }

        /* Mobile Bottom Sticky Bar */
        .pg-sticky-mobile {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 99;
          background: rgba(8, 11, 18, 0.94);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border-top: 1px solid var(--color-border-gold);
          padding: 9px 14px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
        }
        @media (min-width: 768px) {
          .pg-sticky-mobile {
            display: none;
          }
          .pg-landing-root {
            padding-bottom: 24px;
          }
        }
        .pg-sticky-btn-buy {
          flex: 1;
          min-height: 44px;
          background: linear-gradient(135deg, #dfba78 0%, #c89d54 100%);
          color: #080b12;
          font-size: 14px;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          border-radius: 10px;
          text-decoration: none;
        }
        .pg-sticky-btn-counselling {
          flex: 1;
          min-height: 44px;
          background: rgba(22, 29, 46, 0.95);
          border: 1px solid var(--color-border-gold);
          color: var(--color-accent-gold-light);
          font-size: 13px;
          font-weight: 750;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          border-radius: 10px;
          text-decoration: none;
        }
      `}</style>

      {/* Subtle luxury ambient glow */}
      <div className="ambient-glow-top" aria-hidden="true" />

      {/* 1. STICKY HEADER */}
      <header className="pg-header">
        <div className="pg-header-container">
          <a href="#top" className="pg-brand-link">
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, rgba(200, 157, 84, 0.2), rgba(223, 186, 120, 0.08))",
                border: "1px solid var(--color-border-gold)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "17px",
                color: "var(--color-accent-gold-light)"
              }}
            >
              🏠
            </div>
            <div>
              <span className="pg-brand-name">Ravi Saini</span>
              <span className="pg-brand-sub">{brand}</span>
            </div>
          </a>

          <div className="pg-header-actions">
            {/* Clean link to Counselling section */}
            <a href="#counselling" className="pg-header-nav-link">
              Counselling
            </a>

            {/* Instagram Profile */}
            <a
              href="https://instagram.com/the.ravi.saini"
              target="_blank"
              rel="noopener noreferrer"
              className="pg-ig-pill"
              title="Instagram @the.ravi.saini"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              <span>@the.ravi.saini</span>
            </a>

            {/* Focused Buy CTA Button */}
            <a href={paymentUrl} className="pg-header-buy-cta">
              Buy ₹99
            </a>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="pg-hero" id="top">
        <div className="pg-hero-content">
          <div className="pg-ig-hero-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            <span>From Instagram <strong>@the.ravi.saini</strong> (8K+ Community)</span>
          </div>

          <h1 className="pg-hero-title">
            Build Your Home in Punjab with <span className="pg-hero-title-accent">Clarity & Confidence</span>
          </h1>

          <p className="pg-hero-sub">
            Avoid common construction pitfalls. Get practical stage-by-stage guidance, verified checklists, and grey structure calculations tailored for Punjab plots.
          </p>

          <div className="pg-hero-actions">
            <a href={paymentUrl} className="pg-btn-primary">
              <span>Get 3-in-1 Toolkit — ₹99</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </a>

            <a href="#counselling" className="pg-btn-counselling">
              <span>1-on-1 Counselling — ₹999</span>
            </a>
          </div>

          <div className="pg-hero-badges">
            <div className="pg-badge-item">
              <span>✓</span>
              <span>Secure Razorpay Checkout</span>
            </div>
            <div className="pg-badge-item">
              <span>⚡</span>
              <span>Instant PDF & Sheet Access</span>
            </div>
            <div className="pg-badge-item">
              <span>🏠</span>
              <span>Punjab Local Rates Calibrated</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. COMMUNITY STATS (Honest, No Financial Claims) */}
      <section className="pg-stats-container">
        <div className="pg-stats-bar">
          <div className="pg-stat-col">
            <div className="pg-stat-num">8,000+</div>
            <div className="pg-stat-name">Instagram Community</div>
          </div>
          <div className="pg-stat-col">
            <div className="pg-stat-num">3-in-1</div>
            <div className="pg-stat-name">Comprehensive Toolkit</div>
          </div>
          <div className="pg-stat-col">
            <div className="pg-stat-num">1-on-1</div>
            <div className="pg-stat-name">Personal Video Counselling</div>
          </div>
          <div className="pg-stat-col">
            <div className="pg-stat-num">4.9 ★</div>
            <div className="pg-stat-name">Homeowner Satisfaction</div>
          </div>
        </div>
      </section>

      {/* 4. PROMINENT COUNSELLING SPOTLIGHT (Made Irresistible to Opt) */}
      <section className="pg-counselling-spotlight" id="counselling">
        <div className="pg-counselling-royal-card">
          <div className="pg-counselling-spotlight-left">
            <div className="pg-royal-pill">
              <span>★ Premium Personal Session</span>
            </div>

            <h2 className="pg-counselling-spotlight-title">
              1-on-1 House Construction Counselling with Ravi Saini
            </h2>

            <p className="pg-counselling-spotlight-desc">
              Have specific questions about your plot layout, contractor quotation, DPC waterproofing, or material quality? Book a dedicated 30-minute private consultation to discuss your exact house situation.
            </p>

            <ul className="pg-counselling-keypoints">
              <li><span>✓</span> Review your house map & floor plan</li>
              <li><span>✓</span> Verify contractor quote & grey structure estimates</li>
              <li><span>✓</span> Foundation, DPC & seepage prevention discussion</li>
              <li><span>✓</span> Saria, cement & brick quality assessment</li>
              <li><span>✓</span> Clear roadmap for your current construction stage</li>
              <li><span>✓</span> Direct WhatsApp coordination after payment</li>
            </ul>
          </div>

          <div className="pg-counselling-spotlight-right">
            <p className="pg-counselling-fee-label">30-Minute Consultation</p>
            <p className="pg-counselling-fee-price">₹999</p>
            <p className="pg-counselling-fee-sub">Personal 1-on-1 Video/Voice Session</p>

            <a href={counsellingPaymentUrl} className="pg-btn-primary" style={{ width: "100%", minHeight: "46px" }}>
              <span>Book Session — ₹999</span>
            </a>

            <a
              href={`https://wa.me/91${supportWhatsapp}?text=Hi%20Ravi%2C%20I%20want%20to%20know%20more%20about%20the%201-on-1%20House%20Construction%20Counselling`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: "13px",
                color: "var(--color-accent-gold)",
                textDecoration: "underline",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "4px",
                marginTop: "4px"
              }}
            >
              Have questions? Ask on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* 5. WHAT'S INSIDE THE TOOLKIT */}
      <section className="pg-section" id="toolkit">
        <div className="pg-section-header">
          <div className="pg-section-badge">The Digital Toolkit</div>
          <h2 className="pg-section-title">What You Get in the 3-in-1 Bundle</h2>
          <p className="pg-section-desc">
            Practical materials created specifically for Punjab house construction conditions.
          </p>
        </div>

        <div className="pg-cards-grid">
          {/* Card 1 */}
          <div className="pg-card">
            <div className="pg-card-header">
              <div className="pg-card-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </div>
              <span className="pg-card-pill">PDF Guide</span>
            </div>
            <h3 className="pg-card-title">Construction Mistakes Guide</h3>
            <p className="pg-card-desc">
              Common mistakes in Punjab homes explained in simple, practical language so you know what to check before each construction stage.
            </p>
            <ul className="pg-card-list">
              <li><span>✓</span> DPC level & waterproofing guidelines</li>
              <li><span>✓</span> RCC slab shuttering & curing rules</li>
              <li><span>✓</span> Contractor agreement traps to avoid</li>
            </ul>
          </div>

          {/* Card 2 */}
          <div className="pg-card">
            <div className="pg-card-header">
              <div className="pg-card-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 11l3 3L22 4"></path>
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                </svg>
              </div>
              <span className="pg-card-pill">Printable Sheet</span>
            </div>
            <h3 className="pg-card-title">Site Inspection Checklist</h3>
            <p className="pg-card-desc">
              Print it and take it directly to your site. Verify foundation, RCC, plumbing, electrical, and plaster stage by stage before releasing payments.
            </p>
            <ul className="pg-card-list">
              <li><span>✓</span> Pre-pour Lanter inspection list</li>
              <li><span>✓</span> Plumbing line pressure testing points</li>
              <li><span>✓</span> Plaster mix ratio & brick bond check</li>
            </ul>
          </div>

          {/* Card 3 */}
          <div className="pg-card">
            <div className="pg-card-header">
              <div className="pg-card-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="2" width="16" height="20" rx="2"></rect>
                  <line x1="8" y1="6" x2="16" y2="6"></line>
                  <line x1="16" y1="14" x2="16" y2="18"></line>
                  <path d="M8 10h.01"></path>
                  <path d="M12 10h.01"></path>
                  <path d="M16 10h.01"></path>
                  <path d="M8 14h.01"></path>
                  <path d="M12 14h.01"></path>
                  <path d="M8 18h.01"></path>
                  <path d="M12 18h.01"></path>
                </svg>
              </div>
              <span className="pg-card-pill">Excel / Sheets</span>
            </div>
            <h3 className="pg-card-title">Cost & Material Estimator</h3>
            <p className="pg-card-desc">
              Enter your plot size and get a rough grey structure estimate using realistic Punjab material consumption and rate benchmarks.
            </p>
            <ul className="pg-card-list">
              <li><span>✓</span> Bricks, cement bags & steel (saria)</li>
              <li><span>✓</span> Sand, bajri & rough labor estimate</li>
              <li><span>✓</span> Works seamlessly on mobile & laptop</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 6. VISUAL PREVIEWS */}
      <section className="pg-section">
        <div className="pg-section-header">
          <div className="pg-section-badge">Direct Previews</div>
          <h2 className="pg-section-title">Preview The Toolkit</h2>
          <p className="pg-section-desc">
            Clear, clean, and immediately usable resources designed for Punjab homeowners.
          </p>
        </div>

        <div className="pg-previews-grid">
          <div className="pg-preview-box">
            <div className="pg-preview-img-container">
              <img
                src="/mistakes-preview.png"
                alt="Mistakes PDF Preview"
                className="pg-preview-img"
                loading="lazy"
              />
            </div>
            <div className="pg-preview-meta">
              <h4>Mistakes PDF</h4>
              <p>Common on-site construction blunders clearly explained.</p>
            </div>
          </div>

          <div className="pg-preview-box">
            <div className="pg-preview-img-container">
              <img
                src="/checklist-preview.png"
                alt="Site Checklist Preview"
                className="pg-preview-img"
                loading="lazy"
              />
            </div>
            <div className="pg-preview-meta">
              <h4>Site Checklist</h4>
              <p>Printable stage-by-stage quality verification sheet.</p>
            </div>
          </div>

          <div className="pg-preview-box">
            <div className="pg-preview-img-container">
              <img
                src="/calculator-preview.png"
                alt="Cost Calculator Preview"
                className="pg-preview-img"
                loading="lazy"
              />
            </div>
            <div className="pg-preview-meta">
              <h4>Cost Calculator</h4>
              <p>Rough grey structure planning tool for your plot size.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. TOOLKIT OFFER & CHECKOUT */}
      <section className="pg-section" id="buy">
        <div className="pg-offer-card">
          <span className="pg-offer-tag">Complete Digital Bundle</span>

          <h3 className="pg-offer-title">Download Punjab Ghar Toolkit</h3>
          <p className="pg-offer-sub">
            All 3 resources sent to your email and accessible instantly after payment.
          </p>

          <div className="pg-offer-price-row">
            <span className="pg-price-bold">₹99</span>
            <span className="pg-price-cut">₹499</span>
          </div>

          <ul className="pg-offer-checklist">
            <li><span>✓</span> <strong>Mistakes PDF Guide</strong> — avoid structural & finishing errors</li>
            <li><span>✓</span> <strong>Printable Site Checklist</strong> — verify quality before payments</li>
            <li><span>✓</span> <strong>Grey Structure Calculator</strong> — rough material estimate</li>
            <li><span>✓</span> <strong>Instant Access</strong> — email delivery + on-screen download link</li>
          </ul>

          <a href={paymentUrl} className="pg-btn-primary" style={{ width: "100%", minHeight: "54px" }}>
            <span>Get The Toolkit — ₹99</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </a>

          <p style={{ margin: "14px 0 0", fontSize: "12.5px", color: "var(--color-text-muted)" }}>
            Secure checkout powered by Razorpay • UPI, Cards & Net Banking accepted
          </p>
        </div>
      </section>

      {/* 8. REVIEWS */}
      <section className="pg-section">
        <div className="pg-section-header">
          <div className="pg-section-badge">Feedback</div>
          <h2 className="pg-section-title">What Home Builders Say</h2>
          <p className="pg-section-desc">
            Direct reviews from verified buyers across Punjab.
          </p>
        </div>

        <div className="pg-reviews-layout">
          {reviews.map((rev, idx) => (
            <div key={idx} className="pg-review-card">
              <div className="pg-review-top">
                <div className="pg-stars">{"★".repeat(rev.rating || 5)}</div>
                <span className="pg-review-time">{rev.date}</span>
              </div>
              <p className="pg-review-quote">&ldquo;{rev.text}&rdquo;</p>
              <div className="pg-review-bottom">
                <span className="pg-reviewer">{rev.buyer}</span>
                <span className="pg-reviewer-loc">{rev.location}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. FAQ ACCORDION */}
      <section className="pg-section">
        <div className="pg-section-header">
          <div className="pg-section-badge">Support</div>
          <h2 className="pg-section-title">Frequently Asked Questions</h2>
        </div>

        <div className="pg-faq-container">
          <details className="pg-faq-item" open>
            <summary className="pg-faq-summary">
              <span>How do I get the toolkit files after payment?</span>
              <span className="pg-faq-chevron">▼</span>
            </summary>
            <div className="pg-faq-content">
              After payment, you will see the download link on your screen immediately, and a copy will be automatically sent to your email address within 2 minutes.
            </div>
          </details>

          <details className="pg-faq-item">
            <summary className="pg-faq-summary">
              <span>Didn't get the email or need assistance?</span>
              <span className="pg-faq-chevron">▼</span>
            </summary>
            <div className="pg-faq-content">
              Please check your Spam and Promotions folders first. If you still don't find it, message us on WhatsApp at{" "}
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                +91 {supportWhatsapp}
              </a>{" "}
              with your payment ID, and we will send the files to you directly.
            </div>
          </details>
        </div>
      </section>

      {/* 10. STICKY MOBILE DUAL ACTION BAR */}
      <div className="pg-sticky-mobile">
        <a href={paymentUrl} className="pg-sticky-btn-buy">
          <span>Buy Toolkit • ₹99</span>
        </a>
        <a href={counsellingPaymentUrl} className="pg-sticky-btn-counselling">
          <span>Counselling • ₹999</span>
        </a>
      </div>
    </div>
  );
}
