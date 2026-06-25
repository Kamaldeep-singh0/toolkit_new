// FIX: Manual email resend route — missing from original project.
// Use this when a customer's payment is verified but they did not receive the email.
// POST /api/resend-email
// Body: { "email": "customer@example.com" }
// This is a private admin route — protect it with ADMIN_SECRET env variable.

import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { sendToolkitEmail } from "@/lib/email";
import { requiredEnv } from "@/lib/env";

export const runtime = "nodejs";

type Purchase = {
  id: string;
  email: string;
  token: string;
  razorpay_payment_id: string;
  email_sent_at: string | null;
};

export async function POST(request: NextRequest) {
  // Protect this route with a secret header so only you can call it
  const adminSecret = request.headers.get("x-admin-secret");
  const expectedSecret = requiredEnv("ADMIN_SECRET");

  if (!adminSecret || adminSecret !== expectedSecret) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  let body: { email?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body.email || typeof body.email !== "string") {
    return NextResponse.json({ ok: false, error: "email field is required in request body" }, { status: 400 });
  }

  const { data: purchase, error } = await supabaseAdmin
    .from("purchases")
    .select("id,email,token,razorpay_payment_id,email_sent_at")
    .eq("email", body.email.toLowerCase().trim())
    .eq("status", "paid")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle<Purchase>();

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  if (!purchase) {
    return NextResponse.json({ ok: false, error: "No verified paid purchase found for this email" }, { status: 404 });
  }

  const emailResult = await sendToolkitEmail({
    to: purchase.email,
    token: purchase.token,
    paymentId: purchase.razorpay_payment_id
  });

  if (emailResult.error) {
    return NextResponse.json({ ok: false, error: "Email send failed", details: emailResult.error }, { status: 500 });
  }

  await supabaseAdmin
    .from("purchases")
    .update({ email_sent_at: new Date().toISOString() })
    .eq("id", purchase.id);

  return NextResponse.json({ ok: true, message: `Email resent to ${purchase.email}` });
}
