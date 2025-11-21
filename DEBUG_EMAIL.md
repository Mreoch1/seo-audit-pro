# Debugging Email Issues

## Two Types of Emails

### 1. Customer Receipt (from Stripe)
- **Who sends it**: Stripe automatically
- **Who receives it**: The customer (email they entered in checkout)
- **When**: Immediately after payment
- **Where to check**: Customer's email inbox

### 2. Order Notification (from your webhook)
- **Who sends it**: Your webhook → Resend API
- **Who receives it**: You (Mreoch82@hotmail.com)
- **When**: After webhook receives `checkout.session.completed` event
- **Where to check**: Your email inbox

## Troubleshooting Steps

### Step 1: Check if Stripe CLI is Running

**You MUST have this running in a separate terminal:**

```bash
stripe listen --forward-to localhost:3002/api/webhook
```

**Look for:**
- `> Ready! Your webhook signing secret is whsec_...`
- When payment completes, you should see: `checkout.session.completed` event

**If not running:**
- Webhooks won't reach your server
- No email will be sent to you
- Payment will still work, but you won't get notified

### Step 2: Check Server Logs

**In your `npm run dev` terminal, look for:**
- `✅ Order confirmation email sent successfully to: Mreoch82@hotmail.com`
- OR `❌ Failed to send email` errors

### Step 3: Check Resend Dashboard

1. Go to https://resend.com/emails
2. Check the "Emails" section
3. Look for recent emails sent to Mreoch82@hotmail.com
4. Check if any failed or are pending

### Step 4: Verify Environment Variables

Make sure `.env.local` has:
```bash
RESEND_API_KEY=re_MnL5GhTP_GPEp8MDbt8AaXCaJoueyX7BP
TO_EMAIL=Mreoch82@hotmail.com
STRIPE_WEBHOOK_SECRET=whsec_d261f022a78cb5c91f289f8094ad119e2327fbd177432969eb4362556d88df35
```

### Step 5: Test the Webhook Manually

After a payment, check:

1. **Stripe CLI terminal** - Should show webhook event
2. **Next.js server terminal** - Should show email sent or error
3. **Resend dashboard** - Should show email attempt

## Common Issues

### Issue 1: Stripe CLI Not Running
**Symptom**: No webhook events, no email
**Fix**: Start `stripe listen --forward-to localhost:3002/api/webhook`

### Issue 2: Wrong Port
**Symptom**: Webhook events but connection refused
**Fix**: Make sure port matches your dev server (3002)

### Issue 3: Resend API Key Invalid
**Symptom**: Email fails in server logs
**Fix**: Verify API key at https://resend.com/api-keys

### Issue 4: Email in Spam
**Symptom**: Email sent but not received
**Fix**: Check spam folder, verify Resend domain

## Quick Test

1. Make a test payment
2. Check Stripe CLI terminal for webhook event
3. Check Next.js terminal for email log
4. Check Resend dashboard for email status
5. Check your email inbox (and spam)

## Customer Receipt (Stripe)

Stripe automatically sends a receipt to the customer. This is separate from your order notification.

To verify:
- Check Stripe Dashboard → Payments → [Your Payment] → Receipt
- Customer should receive it automatically

