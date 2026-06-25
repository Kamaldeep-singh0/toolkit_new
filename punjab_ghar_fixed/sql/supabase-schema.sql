-- Run this in Supabase SQL Editor.
-- This table stores verified Razorpay purchases and private download tokens.

create extension if not exists pgcrypto;

create table if not exists public.purchases (
  id uuid primary key default gen_random_uuid(),
  razorpay_payment_id text not null unique,
  razorpay_order_id text,
  email text not null,
  phone text,
  amount_paise integer,
  currency text default 'INR',
  status text not null default 'paid',
  token text not null unique,
  token_expires_at timestamptz not null,
  download_count integer not null default 0,
  last_download_at timestamptz,
  email_sent_at timestamptz,
  raw_payload jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_purchases_token on public.purchases(token);
create index if not exists idx_purchases_email on public.purchases(email);

-- Keep RLS enabled for safety. The app uses the service-role key only on the server.
alter table public.purchases enable row level security;

-- No public policies are created intentionally.

-- FIX: Atomic increment function to avoid race conditions when two download
-- requests arrive at the same time for the same token.
create or replace function increment_download_count(purchase_id uuid)
returns integer
language sql
as $$
  update public.purchases
  set download_count = download_count + 1,
      last_download_at = now()
  where id = purchase_id
  returning download_count;
$$;
