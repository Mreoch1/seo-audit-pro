# Check Webhook Status

## The Problem

Payment succeeds, but no email is received. This means the webhook isn't firing or isn't reaching your server.

## Critical Check: Is Stripe CLI Running?

**You MUST have this running in a SEPARATE terminal:**

```bash
stripe listen --forward-to localhost:3002/api/webhook
```

**What to look for:**
- Should show: `> Ready! Your webhook signing secret is whsec_...`
- When payment completes, should show: `checkout.session.completed` event
- Should show webhook being forwarded to your server

**If this is NOT running:**
- ❌ Webhooks won't reach your server
- ❌ No email will be sent
- ✅ Payment will still work (Stripe handles that)
- ✅ Customer gets Stripe receipt (Stripe sends that)

## Check Your Next.js Server Terminal

After making a payment, you should see in your `npm run dev` terminal:

```
📥 Webhook endpoint called
✅ Webhook signature verified. Event type: checkout.session.completed
✅ Webhook received: checkout.session.completed
Session metadata: { ... }
✅ Order confirmation email sent successfully to: Mreoch82@hotmail.com
```

**If you DON'T see these messages:**
- The webhook isn't reaching your server
- Check if Stripe CLI is running
- Check if the webhook secret matches

## Quick Test

1. **Start Stripe CLI** (if not running):
   ```bash
   stripe listen --forward-to localhost:3002/api/webhook
   ```

2. **Make a test payment**

3. **Check Stripe CLI terminal** - Should show:
   ```
   checkout.session.completed [200] localhost:3002/api/webhook
   ```

4. **Check Next.js terminal** - Should show:
   ```
   📥 Webhook endpoint called
   ✅ Webhook signature verified
   ✅ Order confirmation email sent
   ```

5. **Check Resend Dashboard**:
   - Go to https://resend.com/emails
   - Look for emails sent to Mreoch82@hotmail.com

## Common Issues

### Issue 1: Stripe CLI Not Running
**Symptom**: No webhook events, no email
**Fix**: Start `stripe listen --forward-to localhost:3002/api/webhook`

### Issue 2: Wrong Port
**Symptom**: Webhook events but connection refused
**Fix**: Make sure port matches (3002, not 3000)

### Issue 3: Webhook Secret Mismatch
**Symptom**: "Webhook signature verification failed"
**Fix**: Get new secret from Stripe CLI and update `.env.local`

### Issue 4: Resend API Key Issue
**Symptom**: Webhook fires but email fails
**Fix**: Check Resend dashboard for errors, verify API key

## What Gets Sent Where

1. **Customer Receipt** (from Stripe)
   - Sent to: Customer's email (from checkout form)
   - Sent by: Stripe automatically
   - When: Immediately after payment

2. **Order Notification** (from your webhook)
   - Sent to: Mreoch82@hotmail.com
   - Sent by: Your webhook → Resend API
   - When: After webhook receives `checkout.session.completed`
   - **Requires**: Stripe CLI running to forward webhooks

