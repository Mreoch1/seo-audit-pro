# Fix Port Mismatch Issue

## The Problem

Your Next.js server is running on **port 3000**, but Stripe CLI is forwarding webhooks to **port 3002**.

This causes:
- ❌ Connection refused errors in Stripe CLI
- ❌ Webhooks not reaching your server
- ❌ No emails being sent

## The Fix

### Option 1: Update Stripe CLI (Recommended)

**Stop your current Stripe CLI** (Ctrl+C), then run:

```bash
stripe listen --forward-to localhost:3000/api/webhook
```

This will give you a NEW webhook secret. Update `.env.local`:

```bash
STRIPE_WEBHOOK_SECRET=whsec_NEW_SECRET_HERE
```

### Option 2: Force Next.js to Use Port 3002

Run your dev server with:

```bash
PORT=3002 npm run dev
```

Or update `package.json`:
```json
"scripts": {
  "dev": "next dev -p 3002"
}
```

## Quick Fix Steps

1. **Stop Stripe CLI** (Ctrl+C in that terminal)

2. **Restart with correct port:**
   ```bash
   stripe listen --forward-to localhost:3000/api/webhook
   ```

3. **Copy the NEW webhook secret** (starts with `whsec_`)

4. **Update `.env.local`:**
   ```bash
   STRIPE_WEBHOOK_SECRET=whsec_NEW_SECRET_HERE
   ```

5. **Restart Next.js server** (if needed)

6. **Test payment again**

## Verify It's Working

After fixing, when you make a payment:

**Stripe CLI terminal should show:**
```
<--  [200] POST http://localhost:3000/api/webhook [evt_...]
```

**Next.js terminal should show:**
```
📥 Webhook endpoint called
✅ Webhook signature verified
📧 Preparing to send email...
✅ Order confirmation email sent
```

## Current Status

- ✅ Next.js server: Running on port 3000
- ❌ Stripe CLI: Forwarding to port 3002 (WRONG)
- ❌ Webhooks: Not reaching server (connection refused)

