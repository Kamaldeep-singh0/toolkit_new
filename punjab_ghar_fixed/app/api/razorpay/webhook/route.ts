import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import {
  extractPaymentData,
  isSuccessfulPaymentEvent,
  RazorpayWebhookPayload,
  verifyRazorpayWebhook
} from "@/lib/razorpay";
import { sendToolkitEmail } from "@/lib/email";

export const runtime = "nodejs";

type PurchaseRow = {
  id: string;
  email: string | null;
  token: string;
  email_sent_at: string | null;
};

function createToken() {
  return crypto.randomBytes(24).toString("hex");
}

function expiresAt() {
  const date = new Date();
  date.setDate(date.getDate() + 7);
  return date.toISOString();
}

export async function POST(request: NextRequest) {
  const rawBody = await request.text();
  const signature = request.headers.get("x-razorpay-signature");

  if (!verifyRazorpayWebhook(rawBody, signature)) {
    return NextResponse.json({ ok: false, error: "Invalid webhook signature" }, { status: 400 });
  }

  let payload: RazorpayWebhookPayload;
  try {
    payload = JSON.parse(rawBody) as RazorpayWebhookPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const data = extractPaymentData(payload);

  if (!isSuccessfulPaymentEvent(data.event, data.status)) {
    return NextResponse.json({ ok: true, ignored: true, reason: "Not a successful payment event" });
  }

  if (!data.paymentId) {
    return NextResponse.json({ ok: false, error: "Missing payment id in webhook payload" }, { status: 400 });
  }

  if (!data.email) {
    return NextResponse.json(
      { ok: false, error: "Customer email missing. Make email mandatory on Razorpay Payment Page." },
      { status: 400 }
    );
  }

  const { data: existing, error: existingError } = await supabaseAdmin
    .from("purchases")
    .select("id,email,token,email_sent_at")
    .eq("razorpay_payment_id", data.paymentId)
    .maybeSingle<PurchaseRow>();

  if (existingError) {
    return NextResponse.json({ ok: false, error: existingError.message }, { status: 500 });
  }

  let purchase = existing;

  if (!purchase) {
    const token = createToken();
    const { data: inserted, error: insertError } = await supabaseAdmin
      .from("purchases")
      .insert({
        razorpay_payment_id: data.paymentId,
        razorpay_order_id: data.orderId,
        email: data.email,
        phone: data.contact,
        amount_paise: data.amount,
        currency: data.currency,
        status: "paid",
        token,
        token_expires_at: expiresAt(),
        raw_payload: payload
      })
      .select("id,email,token,email_sent_at")
      .single<PurchaseRow>();

    if (insertError) {
      return NextResponse.json({ ok: false, error: insertError.message }, { status: 500 });
    }

    purchase = inserted;
  }

  if (purchase.email && !purchase.email_sent_at) {
    const emailResult = await sendToolkitEmail({
      to: purchase.email,
      token: purchase.token,
      paymentId: data.paymentId
    });

    if (emailResult.error) {
      return NextResponse.json({ ok: false, error: "Payment saved, email failed", details: emailResult.error }, { status: 500 });
    }

    await supabaseAdmin
      .from("purchases")
      .update({ email_sent_at: new Date().toISOString() })
      .eq("id", purchase.id);
  }

  return NextResponse.json({ ok: true });
}
