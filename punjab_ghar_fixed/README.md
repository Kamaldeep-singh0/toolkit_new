# Punjab Ghar Toolkit — Vercel Secure Website

Complete ₹99 digital product website with automatic payment verification and email delivery.

---

## Fixes applied in this version

1. **Payment security fix** — Webhook now requires BOTH event AND status to be valid (was using OR before which was unsafe)
2. **Download count fix** — Atomic SQL function used to avoid race conditions
3. **Manual email resend** — New `/api/resend-email` route added for when customers miss the email
4. **Success page improved** — Clear instructions to check email after payment
5. **Landing page** — Updated with Punjabi/Hinglish copy

---

## Step-by-step deploy guide (non-tech friendly)

### What you need (all free to start)

- GitHub account (github.com)
- Vercel account (vercel.com) — login with GitHub
- Supabase account (supabase.com) — free tier
- Resend account (resend.com) — free tier sends 100 emails/day
- Razorpay account (razorpay.com) — already have this

---

### Step 1 — Set up Supabase database

1. Go to **supabase.com** → New Project → give it any name
2. Wait for project to create (takes ~1 minute)
3. In the left menu click **SQL Editor**
4. Click **New Query**
5. Open the file `sql/supabase-schema.sql` from this project (open in Notepad/VS Code)
6. Copy ALL the text from that file
7. Paste it into the SQL Editor on Supabase
8. Click **Run**
9. You should see "Success" — this creates the purchases table and the atomic counter function

**Now create private file storage:**
1. In Supabase left menu click **Storage**
2. Click **New bucket**
3. Name it exactly: `toolkit-files`
4. Toggle **Public bucket** to OFF (must be private)
5. Click Save
6. Click into the `toolkit-files` bucket
7. Upload your 3 files with EXACTLY these names:
   - `mistakes-pdf.pdf`
   - `site-checklist.pdf`
   - `grey-structure-calculator.xlsx`

**Get your Supabase credentials:**
1. In Supabase go to **Project Settings** → **API**
2. Copy **Project URL** — this is your `NEXT_PUBLIC_SUPABASE_URL`
3. Under "Project API Keys" copy the **service_role** key (secret, not anon) — this is `SUPABASE_SERVICE_ROLE_KEY`

---

### Step 2 — Set up Resend for emails

1. Go to **resend.com** → Create account
2. Go to **API Keys** → Create API Key
3. Name it "Punjab Ghar Toolkit" → Create
4. Copy the key starting with `re_` — this is your `RESEND_API_KEY`

**For testing:** Use `onboarding@resend.dev` as the from address — works immediately

**For live launch:** 
1. In Resend go to **Domains** → Add Domain
2. Add your domain (e.g. punjabghartoolkit.com) and verify DNS records
3. Then use `Punjab Ghar Toolkit <support@yourdomain.com>` as the from address

---

### Step 3 — Set up Razorpay Payment Page

1. Log into **razorpay.com** dashboard
2. Go to **Payment Pages** → Create Payment Page
3. Set title: "Punjab Ghar Toolkit"
4. Set amount: ₹99
5. In customer details, make **Email** mandatory
6. Save/Publish the page
7. Copy the Payment Page URL — it looks like `https://pages.razorpay.com/your-slug`
8. This is your `NEXT_PUBLIC_RAZORPAY_PAYMENT_PAGE_URL`

---

### Step 4 — Push project to GitHub

1. Go to **github.com** → click the **+** button → New Repository
2. Name it `punjab-ghar-toolkit` → Private → Create
3. Copy the repository URL shown on screen

Now open a terminal (or VS Code terminal) in the project folder and run:

```bash
npm install
git init
git add .
git commit -m "Punjab Ghar Toolkit initial"
git branch -M main
git remote add origin YOUR_GITHUB_URL_HERE
git push -u origin main
```

---

### Step 5 — Deploy on Vercel

1. Go to **vercel.com** → click **Add New Project**
2. Click **Import Git Repository** → select your `punjab-ghar-toolkit` repo
3. Framework will auto-detect **Next.js**
4. Click **Environment Variables** section
5. Add these one by one (Name → Value):

```
NEXT_PUBLIC_SITE_URL          → https://YOUR-PROJECT.vercel.app  (fill after deploy)
NEXT_PUBLIC_RAZORPAY_PAYMENT_PAGE_URL → https://pages.razorpay.com/your-slug
NEXT_PUBLIC_SUPPORT_WHATSAPP  → 919XXXXXXXXX  (your WhatsApp with country code)
NEXT_PUBLIC_SUPPORT_EMAIL     → your-email@gmail.com
NEXT_PUBLIC_BRAND_NAME        → Punjab Ghar Toolkit
RAZORPAY_WEBHOOK_SECRET       → (fill this after Step 6 below)
NEXT_PUBLIC_SUPABASE_URL      → https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY     → your_supabase_service_role_key
SUPABASE_STORAGE_BUCKET       → toolkit-files
MISTAKES_FILE_PATH            → mistakes-pdf.pdf
CHECKLIST_FILE_PATH           → site-checklist.pdf
CALCULATOR_FILE_PATH          → grey-structure-calculator.xlsx
RESEND_API_KEY                → re_xxxxxxxxxxxxxxxxxxxxx
DELIVERY_FROM_EMAIL           → Punjab Ghar Toolkit <onboarding@resend.dev>
DELIVERY_REPLY_TO             → your-email@gmail.com
ADMIN_SECRET                  → (any long random string, e.g. go to generate-secret.vercel.app/32)
```

6. Click **Deploy**
7. Wait for deploy to finish — copy your Vercel URL e.g. `https://punjab-ghar-toolkit.vercel.app`
8. Go back to Vercel → Project Settings → Environment Variables
9. Update `NEXT_PUBLIC_SITE_URL` to your actual Vercel URL
10. Click **Redeploy**

---

### Step 6 — Add Razorpay Webhook

After your site is live on Vercel:

1. Log into Razorpay dashboard
2. Go to **Account & Settings** → **Webhooks**
3. Click **Add New Webhook**
4. Set Webhook URL to:
   ```
   https://YOUR-PROJECT.vercel.app/api/razorpay/webhook
   ```
5. Select these events:
   - `payment_link.paid`
   - `payment.captured`
   - `order.paid`
6. Set a Webhook Secret (any strong password)
7. Save

Now go to Vercel → Project Settings → Environment Variables:
- Update `RAZORPAY_WEBHOOK_SECRET` to the exact secret you just set in Razorpay
- Click **Redeploy** one more time

Also update your Razorpay Payment Page success redirect URL to:
```
https://YOUR-PROJECT.vercel.app/success
```

---

### Step 7 — Test end to end

1. Open your live Vercel site
2. Click "Kharido ₹99"
3. Complete a real payment (or ask Razorpay support to enable test mode for Payment Pages)
4. Check: Vercel → Project → Logs (should show webhook received)
5. Check: Supabase → Table Editor → purchases (should show new row)
6. Check: Resend → Emails (should show sent email)
7. Open the email and click download link — all 3 files should download

**If email does not arrive within 5 minutes, check:**
- Vercel logs for errors
- Razorpay Webhooks → Delivery Logs for webhook failures
- Resend logs for bounced emails
- Supabase purchases table — check if email_sent_at is filled

---

### How to manually resend email to a customer

If a customer paid but did not get the email, use this:

```bash
curl -X POST https://YOUR-PROJECT.vercel.app/api/resend-email \
  -H "Content-Type: application/json" \
  -H "x-admin-secret: YOUR_ADMIN_SECRET" \
  -d '{"email": "customer@email.com"}'
```

Replace `YOUR_ADMIN_SECRET` with the value you set in env variables.

Or use a tool like **Insomnia** or **Hoppscotch** (free REST API tools) to call this.

---

### Files that contain your secrets (NEVER share or push to GitHub)

```
.env.local          ← all secret keys for local testing
```

The `.gitignore` already blocks this file from being pushed.

---

### Project structure

```
app/
  page.tsx                    ← Main sales landing page
  success/page.tsx            ← Page shown after payment
  download/[token]/page.tsx   ← Secure download page
  api/razorpay/webhook/       ← Receives payment from Razorpay
  api/resend-email/           ← Manual email resend (admin only)
  privacy-policy/             ← Policy pages
  refund-policy/
  terms/
  contact/

lib/
  razorpay.ts                 ← Webhook verification + payment parsing
  email.ts                    ← Email sending via Resend
  supabaseAdmin.ts            ← Supabase server client
  env.ts                      ← Environment variable helpers

sql/
  supabase-schema.sql         ← Run this once in Supabase SQL Editor
```

