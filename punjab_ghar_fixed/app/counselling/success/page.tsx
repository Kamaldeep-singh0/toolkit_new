import type { Metadata } from "next";
import { optionalEnv } from "@/lib/env";

export const metadata: Metadata = {
  title: "Counselling Payment Successful | The.Ravi.Saini",
  description: "Schedule your 30-minute House Construction Counselling session on WhatsApp."
};

type CounsellingSuccessPageProps = {
  searchParams: Promise<{ payment_id?: string | string[]; paymentId?: string | string[] }>;
};

function firstValue(value: string | string[] | undefined): string {
  return (Array.isArray(value) ? value[0] : value || "").trim();
}

export default async function CounsellingSuccessPage({ searchParams }: CounsellingSuccessPageProps) {
  const params = await searchParams;
  const paymentId = firstValue(params.payment_id) || firstValue(params.paymentId);
  const whatsappDigits = optionalEnv("NEXT_PUBLIC_SUPPORT_WHATSAPP").replace(/\D/g, "");
  // Existing Punjab Ghar settings may contain a local 10-digit Indian number.
  // wa.me requires country code, while a configured international number is kept unchanged.
  const whatsappNumber = whatsappDigits.length === 10 ? `91${whatsappDigits}` : whatsappDigits;
  const supportEmail = optionalEnv("NEXT_PUBLIC_SUPPORT_EMAIL").trim();
  const message = [
    "Hi Ravi, I have paid ₹999 for the 30-minute House Construction Counselling session and would like to schedule my session.",
    paymentId ? `Payment ID: ${paymentId}` : "",
    "Please let me know the available time slots. Thank you."
  ].filter(Boolean).join("\n\n");
  const whatsappUrl = whatsappNumber ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}` : null;

  return (
    <main className="counselling-success-page">
      <section className="counselling-success-hero">
        <p className="pill">1-on-1 House Construction Counselling</p>
        <h1>🎉 Payment Successful!</h1>
        <p className="subtext">Your 30-minute House Construction Counselling payment has been received.</p>

        <div className="counselling-scheduling-notice">
          <strong>Your session is NOT scheduled yet.</strong>
          <p>Please message me on WhatsApp using the button below. We’ll choose a suitable date and time for your 30-minute counselling session.</p>
        </div>

        <dl className="counselling-summary">
          <div><dt>Session</dt><dd>30-Minute House Construction Counselling</dd></div>
          <div><dt>Amount Paid</dt><dd>₹999</dd></div>
          <div><dt>Scheduling</dt><dd>WhatsApp</dd></div>
          <div><dt>Status</dt><dd><span className="status-pending">Payment Received • Scheduling Pending</span></dd></div>
        </dl>

        {whatsappUrl ? (
          <a className="btn btn-primary counselling-schedule-button" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            💬 Schedule My Session on WhatsApp
          </a>
        ) : (
          <p className="counselling-link-unavailable">WhatsApp scheduling is temporarily unavailable. Please contact support for help.</p>
        )}
        {whatsappUrl && <p className="counselling-payment-note">Please mention your payment ID in WhatsApp so I can quickly confirm your payment.</p>}
        <p className="counselling-support-line">
          Having trouble scheduling? {supportEmail ? <a href={`mailto:${supportEmail}`}>Contact support</a> : "Contact support and we’ll help you."}
        </p>
      </section>

      <section className="counselling-success-details" aria-label="Counselling session details">
        <article className="card">
          <h2>What We Can Discuss</h2>
          <ul>
            <li>Your current house construction stage</li>
            <li>Construction cost and budgeting</li>
            <li>Material quantities and planning</li>
            <li>Grey structure decisions</li>
            <li>DPC, seepage and waterproofing</li>
            <li>Finishing and material decisions</li>
            <li>Common house construction mistakes</li>
            <li>Questions specific to your house</li>
          </ul>
        </article>
        <article className="card">
          <h2>Before the Session</h2>
          <p>You don’t need all of these, but keep them ready if relevant:</p>
          <ul>
            <li>Approximate house size</li>
            <li>Current construction stage</li>
            <li>Current budget / estimated cost</li>
            <li>Any drawings, photos or videos of the house</li>
            <li>Specific questions or problems you want to discuss</li>
          </ul>
        </article>
      </section>

      <p className="counselling-success-disclaimer">This counselling provides general educational and practical guidance based on the information you share. It is not a substitute for advice from a licensed architect, structural engineer, contractor, legal professional, or other qualified professional where specialised advice is required.</p>
      <a className="counselling-back-home" href="/">← Back to Home</a>
    </main>
  );
}
