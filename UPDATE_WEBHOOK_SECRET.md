# Update Webhook Secret - Quick Guide

## ✅ What I Just Did

Updated `.env.local` to use **port 3000** instead of 3002.

## ⚠️ What You Need to Do Next

The webhook secret in `.env.local` is still the OLD one (for port 3002). You need to get a NEW one.

### Step-by-Step:

1. **Stop your current Stripe CLI** (if running)
   - Press `Ctrl+C` in the terminal running `stripe listen`

2. **Start Stripe CLI with the correct port:**
   ```bash
   stripe listen --forward-to localhost:3000/api/webhook
   ```

3. **Copy the NEW webhook secret:**
   - You'll see output like:
   ```
   > Ready! Your webhook signing secret is whsec_XXXXXXXXX...
   ```
   - Copy the entire `whsec_...` value

4. **Update `.env.local`:**
   - Open `.env.local`
   - Find the line: `STRIPE_WEBHOOK_SECRET=...`
   - Replace it with: `STRIPE_WEBHOOK_SECRET=whsec_YOUR_NEW_SECRET_HERE`

5. **Restart your Next.js server:**
   ```bash
   # Stop current server (Ctrl+C)
   npm run dev
   ```

6. **Test a payment** and check:
   - Stripe CLI should show: `[200] POST http://localhost:3000/api/webhook`
   - Next.js terminal should show email logs
   - You should receive the order email

## Current Status

- ✅ `.env.local` updated to port 3000
- ⚠️ Webhook secret needs updating (still has old one)
- ⚠️ Stripe CLI needs restarting with port 3000

## Why This Matters

Each Stripe CLI session generates a unique webhook secret. If the secret in `.env.local` doesn't match what Stripe CLI is using, webhook signature verification will fail, and emails won't be sent.

