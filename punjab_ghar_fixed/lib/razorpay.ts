import crypto from "crypto";
import { requiredEnv } from "./env";

export function verifyRazorpayWebhook(rawBody: string, signature: string | null): boolean {
  if (!signature) return false;

  const expectedSignature = crypto
    .createHmac("sha256", requiredEnv("RAZORPAY_WEBHOOK_SECRET"))
    .update(rawBody)
    .digest("hex");

  const expected = Buffer.from(expectedSignature, "hex");
  const actual = Buffer.from(signature, "hex");

  if (expected.length !== actual.length) return false;
  return crypto.timingSafeEqual(expected, actual);
}

export type RazorpayWebhookPayload = {
  event?: string;
  payload?: {
    payment?: { entity?: Record<string, unknown> };
    payment_link?: { entity?: Record<string, unknown> };
    order?: { entity?: Record<string, unknown> };
  };
};

function readString(value: unknown): string | null {
  return typeof value === "string" && value.trim() !== "" ? value : null;
}

function readNumber(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

export function extractPaymentData(payload: RazorpayWebhookPayload) {
  const payment = payload.payload?.payment?.entity || {};
  const paymentLink = payload.payload?.payment_link?.entity || {};
  const order = payload.payload?.order?.entity || {};

  const event = payload.event || "unknown";
  const paymentId =
    readString(payment.id) ||
    readString(payment.payment_id) ||
    readString(paymentLink.payment_id) ||
    readString(order.payment_id);

  const orderId = readString(payment.order_id) || readString(order.id) || null;

  const email =
    readString(payment.email) ||
    readString(paymentLink.customer_email) ||
    readString(paymentLink.email) ||
    readString(order.email);

  const contact =
    readString(payment.contact) ||
    readString(paymentLink.customer_contact) ||
    readString(paymentLink.contact) ||
    readString(order.contact);

  const amount =
    readNumber(payment.amount) ||
    readNumber(paymentLink.amount_paid) ||
    readNumber(paymentLink.amount) ||
    readNumber(order.amount_paid) ||
    readNumber(order.amount);

  const currency =
    readString(payment.currency) ||
    readString(paymentLink.currency) ||
    readString(order.currency) ||
    "INR";

  const status =
    readString(payment.status) ||
    readString(paymentLink.status) ||
    readString(order.status) ||
    "unknown";

  return {
    event,
    paymentId,
    orderId,
    email,
    contact,
    amount,
    currency,
    status
  };
}

// FIX: Use AND (&&) not OR (||)
// Both the event AND the status must be valid before we treat a payment as successful.
// Using OR was unsafe — a refunded payment could have status "paid" and still pass.
export function isSuccessfulPaymentEvent(event: string, status: string): boolean {
  const allowedEvents = new Set([
    "payment.captured",
    "payment_link.paid",
    "order.paid"
  ]);

  const allowedStatuses = new Set([
    "captured",
    "paid",
    "completed"
  ]);

  return allowedEvents.has(event) && allowedStatuses.has(status);
}
