# Punjab Ghar Toolkit — Website Operations Guide

This is the long-term reference for this website. Read this before changing payment, email, database, or Razorpay settings.

The site sells two deliberately separate offerings:

1. **Punjab Ghar Toolkit — ₹99**: a digital product delivered by email and secure download links.
2. **1-on-1 House Construction Counselling — ₹999**: a paid, manually scheduled guidance service. It has no download and no automated calendar.

> Important: The ₹99 toolkit fulfilment flow is production logic. Do not merge counselling into it and do not make a counselling payment create a download token.

## Contents

- [Architecture at a glance](#architecture-at-a-glance)
- [Customer journeys](#customer-journeys)
- [Pages and important files](#pages-and-important-files)
- [Environment variables](#environment-variables)
- [First-time setup](#first-time-setup)
- [Razorpay setup](#razorpay-setup)
- [How payment processing works](#how-payment-processing-works)
- [Email and download delivery](#email-and-download-delivery)
- [Database and storage](#database-and-storage)
- [Daily operations](#daily-operations)
- [Deployment and updating](#deployment-and-updating)
- [Troubleshooting](#troubleshooting)
- [Safety rules for future changes](#safety-rules-for-future-changes)

## Architecture at a glance

```text
Landing page
├─ ₹99 Toolkit CTA ────────> Razorpay Toolkit Payment Page
│                              │
│                              ├─ browser redirect: /success
│                              └─ signed webhook: /api/razorpay/webhook
│                                                   │
│                                                   ├─ Supabase purchases row
│                                                   ├─ random token valid 7 days
│                                                   └─ Gmail delivery email
│                                                        └─ /download/[token]
│                                                             └─ 15-min Supabase file links
│
└─ ₹999 Counselling CTA ──> Razorpay Counselling Payment Page
                               │
                               ├─ browser redirect: /counselling/success
                               └─ signed webhook: /api/razorpay/webhook
                                                    │
                                                    └─ Supabase counselling_bookings row
                                                         (no token, no email, no download)

/counselling/success ─────> WhatsApp with a pre-filled scheduling message
                              └─ You manually agree the date and time
```

## Customer journeys

### ₹99 Toolkit

1. Customer clicks a toolkit button on `/`.
2. The browser opens `NEXT_PUBLIC_RAZORPAY_PAYMENT_PAGE_URL`.
3. Razorpay redirects the browser to `/success`. This page only tells the customer to check their email; it does **not** prove payment.
4. Razorpay sends a signed webhook to `/api/razorpay/webhook`.
5. The server verifies the Razorpay signature and accepts only successful payment events/statuses.
6. The server creates or reuses a row in `purchases`, generates a random download token, and sends the toolkit email once.
7. The customer opens `/download/[token]`. The token is valid for seven days.
8. Each file button creates a private Supabase signed URL that lasts 15 minutes.

### ₹999 Counselling

1. Customer clicks `Book 30-Minute Counselling — ₹999` on `/`.
2. The browser opens `NEXT_PUBLIC_RAZORPAY_COUNSELLING_PAYMENT_PAGE_URL`.
3. Razorpay redirects the browser to `/counselling/success`.
4. The success page asks the customer to schedule on WhatsApp. If Razorpay adds `payment_id` or `paymentId` to the redirect URL, it is included in the WhatsApp message; otherwise it is omitted.
5. Razorpay sends the payment webhook to the same webhook endpoint.
6. The server recognises counselling only when both are true:
   - the payment-link ID equals `RAZORPAY_COUNSELLING_PAYMENT_LINK_ID`; and
   - the received amount is ₹999 (`99900` paise).
7. The payment is stored in `counselling_bookings`. No download token, toolkit email, calendar entry, or automatic session booking is created.
8. You confirm the appointment manually in WhatsApp.

## Pages and important files

| Location | Purpose |
| --- | --- |
| `app/page.tsx` | Main sales landing page, including both payment CTAs. |
| `app/success/page.tsx` | Toolkit-only browser success page. |
| `app/counselling/success/page.tsx` | Counselling-only success and WhatsApp scheduling page. |
| `app/download/[token]/page.tsx` | Validates toolkit tokens and produces signed file links. |
| `app/api/razorpay/webhook/route.ts` | Signed Razorpay webhook. Routes paid events to toolkit or counselling fulfilment. |
| `app/api/resend-email/route.ts` | Admin-only way to resend a toolkit email. Despite its name, it uses the same Gmail email function. |
| `lib/razorpay.ts` | Signature verification, payload extraction, successful-event checks, and counselling identification. |
| `lib/email.ts` | Gmail SMTP toolkit-delivery email. |
| `lib/supabaseAdmin.ts` | Server-only Supabase service-role client. |
| `sql/supabase-schema.sql` | Database tables, indexes, RLS, and download-counter function. |
| `.env.example` | Copyable configuration template. Never put secrets in Git. |
| `app/globals.css` | Shared website styling, including counselling success-page styles. |

## Environment variables

Create `.env.local` for local development. In Vercel, add the same values under **Project Settings → Environment Variables**, then redeploy. Variables beginning with `NEXT_PUBLIC_` are visible to the browser; never put secrets in them.

| Variable | Required | Used for |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Yes | Canonical public URL used in toolkit email links when no request URL is available. |
| `NEXT_PUBLIC_RAZORPAY_PAYMENT_PAGE_URL` | Yes | The existing ₹99 Razorpay Payment Page. |
| `NEXT_PUBLIC_RAZORPAY_COUNSELLING_PAYMENT_PAGE_URL` | Yes for counselling | The separate ₹999 Razorpay Payment Page. |
| `NEXT_PUBLIC_SUPPORT_WHATSAPP` | Yes | Support and counselling scheduling links. Use digits with country code, e.g. `919876543210`. A local 10-digit Indian number is also normalised to `91…` on the counselling success page. |
| `NEXT_PUBLIC_SUPPORT_EMAIL` | Recommended | Support links and counselling fallback contact. |
| `NEXT_PUBLIC_BRAND_NAME` | Recommended | Brand text in the site and email. |
| `RAZORPAY_WEBHOOK_SECRET` | Yes | Secret used to validate Razorpay webhook signatures. Must exactly match the Razorpay dashboard value. |
| `RAZORPAY_COUNSELLING_PAYMENT_LINK_ID` | Yes for counselling | Exact `plink_...` ID for the ₹999 counselling payment page/link. This prevents counselling from entering toolkit fulfilment. |
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL. Public, but still configure correctly. |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Server-only Supabase key. Never expose it or prefix it with `NEXT_PUBLIC_`. |
| `SUPABASE_STORAGE_BUCKET` | Yes | Private bucket holding toolkit files; normally `toolkit-files`. |
| `MISTAKES_FILE_PATH` | Yes | PDF path inside the storage bucket. |
| `CHECKLIST_FILE_PATH` | Yes | Checklist path inside the storage bucket. |
| `CALCULATOR_FILE_PATH` | Yes | Calculator path inside the storage bucket. |
| `GMAIL_USER` | Yes for toolkit delivery | Gmail account used to send toolkit emails. |
| `GMAIL_APP_PASSWORD` | Yes for toolkit delivery | Gmail App Password; normal Gmail password will not work. |
| `GMAIL_FROM_NAME` | Recommended | Display name for toolkit emails. Defaults to the brand name. |
| `ADMIN_SECRET` | Yes for manual resend | Secret expected in the `x-admin-secret` header. |

### Important email note

The current code in `lib/email.ts` uses **Gmail SMTP** and requires `GMAIL_USER` plus `GMAIL_APP_PASSWORD`. The previous Resend settings are not used by the current code. Do not add or rely on Resend values for delivery unless the email implementation is deliberately changed later.

## First-time setup

### 1. Install and run locally

```bash
npm install
npm run dev
```

Open the local URL shown by Next.js. Create `.env.local` from `.env.example` and add real values before testing payment, emails, downloads, or database calls.

### 2. Create the Supabase database

1. Create a Supabase project.
2. Open **SQL Editor**.
3. Run the complete contents of `sql/supabase-schema.sql`.
4. Confirm the `purchases` and `counselling_bookings` tables exist.
5. Confirm the `increment_download_count` function exists.

The schema enables Row Level Security and intentionally creates no public policies. The website accesses these tables from server code using the service-role key.

### 3. Create private file storage

1. In Supabase, create a bucket called `toolkit-files` (or use the bucket name configured in `SUPABASE_STORAGE_BUCKET`).
2. Keep the bucket **private**.
3. Upload the toolkit files. The default paths configured in `.env.example` are:
   - `mistakes-pdf.pdf`
   - `site-checklist.pdf`
   - `grey-structure-calculator.xlsx`
4. Keep the environment variable paths aligned with the uploaded paths exactly.

### 4. Configure Gmail delivery

1. Use a Gmail account you control.
2. Turn on two-step verification for that Google account.
3. Create a Google **App Password** for mail.
4. Set `GMAIL_USER` to the Gmail address and `GMAIL_APP_PASSWORD` to that app password.
5. Make a real small-value toolkit purchase and verify the email reaches Inbox/Promotions/Spam.

## Razorpay setup

There must be **two separate Razorpay Payment Pages**. Do not reuse the ₹99 page for counselling.

### Toolkit Payment Page — ₹99

- Title: Punjab Ghar Toolkit
- Amount: ₹99
- Customer email: mandatory
- Success redirect URL: `https://YOUR-DOMAIN/success`
- Website environment variable: `NEXT_PUBLIC_RAZORPAY_PAYMENT_PAGE_URL`

### Counselling Payment Page — ₹999

- Title: 1-on-1 House Construction Counselling
- Amount: ₹999
- Customer email and phone: mandatory
- Success redirect URL: `https://YOUR-DOMAIN/counselling/success`
- Website environment variable: `NEXT_PUBLIC_RAZORPAY_COUNSELLING_PAYMENT_PAGE_URL`
- Record the associated Razorpay `plink_...` identifier as `RAZORPAY_COUNSELLING_PAYMENT_LINK_ID`.

The success redirect controls only the browser page. The signed webhook is the authoritative payment-processing path.

### Webhook

Create one Razorpay webhook:

- URL: `https://YOUR-DOMAIN/api/razorpay/webhook`
- Events: `payment_link.paid`, `payment.captured`, and `order.paid`
- Secret: set a strong secret and copy the exact same value to `RAZORPAY_WEBHOOK_SECRET`.

After creating or changing the webhook, redeploy Vercel after updating the environment variable. Use Razorpay’s webhook delivery logs to inspect failures.

## How payment processing works

The webhook receives the raw Razorpay body, checks the `x-razorpay-signature` HMAC, parses the payload, and accepts only recognised success event/status combinations. This means a browser redirect alone cannot create a purchase or download.

### Toolkit protection and idempotency

- `razorpay_payment_id` is unique in `purchases`.
- Duplicate webhook delivery does not create a second purchase.
- `email_sent_at` is atomically claimed before an email is sent, preventing duplicate delivery emails in normal retry scenarios.
- If email sending fails, `email_sent_at` is reset so a retry can send it later.
- Tokens are random 48-character hexadecimal values and expire after 7 days.

### Counselling protection

- `razorpay_payment_id` is unique in `counselling_bookings`.
- The matching payment-link ID and exact ₹999 amount are required.
- A ₹999 event that does not contain the configured counselling link ID is ignored rather than being treated as a toolkit purchase.

### Important limitation

The webhook treats other successful payments that are not identified as counselling as toolkit purchases. Therefore, do **not** add another Razorpay product to this webhook without adding a separate, safe identification rule first.

## Email and download delivery

### Toolkit email

`sendToolkitEmail` builds a secure URL using the website origin or `NEXT_PUBLIC_SITE_URL`, then sends it with Gmail SMTP. The link points to `/download/[token]`; it is not a direct public storage URL.

### Download page

The download page:

- checks the token exists, belongs to a paid purchase, and has not expired;
- increments `download_count` using the database function;
- creates a fresh Supabase signed URL for each file; and
- makes each signed URL valid for 15 minutes.

If a customer needs a new email, use the protected admin route below rather than manually sharing private storage files.

### Manual toolkit email resend

```bash
curl -X POST https://YOUR-DOMAIN/api/resend-email \
  -H "Content-Type: application/json" \
  -H "x-admin-secret: YOUR_ADMIN_SECRET" \
  -d '{"email":"customer@example.com"}'
```

This route only works for the most recent paid toolkit purchase matching that email. It does not apply to counselling.

## Database and storage

### `purchases`

Stores verified ₹99 toolkit purchases. It includes payment details, email/phone, secure token, token expiry, download counts, email-send status, and the raw Razorpay payload.

### `counselling_bookings`

Stores verified ₹999 counselling payments. It includes payment details, contact information, status, and raw payload. It intentionally has no token, file access, email-send state, or calendar data.

### Storage bucket

Keep `toolkit-files` private. The public should never receive permanent bucket URLs. Signed URLs are generated server-side only after a valid token is checked.

## Daily operations

### When a toolkit customer says they did not receive their files

1. Ask for their purchase email and payment ID/screenshot.
2. Check Razorpay payment and webhook delivery logs.
3. Check Supabase `purchases` for the payment ID and `email_sent_at`.
4. Check Gmail delivery/spam status.
5. Use `/api/resend-email` if the purchase is verified and the address is correct.

### When a counselling customer pays

1. Check the `counselling_bookings` table or Razorpay payment record.
2. The customer should use `/counselling/success` to open WhatsApp.
3. Confirm date/time manually in WhatsApp.
4. Keep any optional appointment notes outside this application; there is no scheduling database or calendar integration by design.

### When a webhook fails

1. Check Razorpay **Webhook Delivery Logs**.
2. Check Vercel function logs for `/api/razorpay/webhook`.
3. Confirm `RAZORPAY_WEBHOOK_SECRET` exactly matches Razorpay.
4. Confirm Vercel has the required Supabase and Gmail variables.
5. For counselling, verify the `plink_...` ID and ₹999 amount configuration.

## Deployment and updating

### Vercel deployment checklist

1. Push the repository to GitHub.
2. Import it into Vercel as a Next.js project.
3. Add all required environment variables for Production (and Preview if you test there).
4. Deploy.
5. Set `NEXT_PUBLIC_SITE_URL` to the final production domain and redeploy.
6. Configure the Razorpay redirects and webhook to use that same production domain.
7. Test each flow separately with a real/test payment:
   - ₹99: payment → webhook → Gmail email → token download;
   - ₹999: payment → webhook → `counselling_bookings` → WhatsApp scheduling.

### Checks before every release

```bash
npm run build
```

If the environment blocks PowerShell scripts, use:

```powershell
npm.cmd run build
```

For a quick TypeScript-only check:

```powershell
.\node_modules\.bin\tsc.cmd --noEmit
```

Do not commit `.env.local`, service-role keys, Gmail app passwords, webhook secrets, or `ADMIN_SECRET`.

## Troubleshooting

| Symptom | Most likely cause | What to check |
| --- | --- | --- |
| Toolkit payment succeeds but no email arrives | Webhook, Gmail, or missing email | Razorpay logs, Vercel logs, `purchases`, Gmail spam, `GMAIL_*` variables. |
| Download page is 404 | Bad, expired, or unpaid token | `purchases.token`, `status`, and `token_expires_at`. |
| Download button says file is not configured | Missing storage path/file or Supabase error | Bucket name, file path variables, private bucket contents. |
| Counselling WhatsApp button is unavailable | Missing WhatsApp variable at build/deploy time | Set `NEXT_PUBLIC_SUPPORT_WHATSAPP` in Vercel and redeploy. |
| WhatsApp opens to the wrong number | Number lacks/has wrong country code | Use digits only, normally `91` + 10-digit Indian number. |
| Counselling payment is not in the table | Link ID does not match or webhook failure | `RAZORPAY_COUNSELLING_PAYMENT_LINK_ID`, Razorpay webhook logs, Vercel logs. |
| ₹999 payment receives toolkit email | This should not happen | Stop and inspect webhook configuration/code immediately; do not process further payments until resolved. |
| Webhook says invalid signature | Secrets differ or body was altered | Recopy the exact Razorpay webhook secret into Vercel, then redeploy. |

## Safety rules for future changes

1. Treat the ₹99 toolkit flow as production code. Test it end-to-end after any related change.
2. Keep counselling and toolkit fulfilment separate. Counselling must never receive a token, signed file URL, or toolkit email.
3. Never use the payment success redirect as payment verification. Only the signed Razorpay webhook is trusted.
4. Never expose `SUPABASE_SERVICE_ROLE_KEY`, `GMAIL_APP_PASSWORD`, `RAZORPAY_WEBHOOK_SECRET`, or `ADMIN_SECRET` to the browser or Git.
5. Keep the storage bucket private.
6. Before adding another paid product, first add an explicit product identifier and a separate fulfilment path in the webhook. Do not rely only on price.
7. When changing database schema, update `sql/supabase-schema.sql` and run the migration in production Supabase before deploying code that needs it.
8. Preserve the two redirects: `/success` for ₹99 toolkit and `/counselling/success` for ₹999 counselling.
