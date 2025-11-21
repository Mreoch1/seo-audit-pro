# Debug: No Email Received After Payment

## What Happened
✅ Payment successful (browser shows success page)
❌ No email received at Mreoch82@hotmail.com

## Possible Causes

### 1. Webhook Not Triggered
- Stripe CLI may not have forwarded the webhook
- Next.js webhook endpoint may not have received the event

### 2. Webhook Received But Email Failed
- Resend API error
- Email sent but caught in spam/junk
- Email configuration issue

### 3. Webhook Signature Mismatch
- Webhook secret doesn't match
- Webhook endpoint returned error

## Debugging Steps

### Check Stripe CLI Logs
Look for these lines in the terminal running `stripe listen`:
```
--> checkout.session.completed [evt_...]
<-- [200] POST http://localhost:3000/api/webhook
```

If you see `[200]`, the webhook was received successfully.
If you see `[400]` or `[500]`, there was an error.

### Check Next.js Server Logs
Look for these lines in the terminal running `npm run dev`:
```
📥 Webhook endpoint called
✅ Webhook signature verified
📧 Preparing to send email...
Recipient: Mreoch82@hotmail.com
✅ Order confirmation email sent successfully
Email ID: [some-id]
```

Or error messages like:
```
❌ No Stripe signature in request
❌ Webhook signature verification failed
❌ Failed to send email
```

### Manual Test: Trigger Webhook Manually

You can test the webhook endpoint directly:

```bash
# Get the session ID from your browser URL
# It looks like: cs_test_a1acGQBHRtbCDD3Onrfg9YDZvx9s28vgOmSu3lJDc0Cd4R...

# Then check the session in Stripe Dashboard
# Or use Stripe CLI to resend the webhook:
stripe events resend evt_YOUR_EVENT_ID
```

### Check Email Folders
- ✅ Inbox: Checked (not there)
- ⚠️ Junk/Spam: Check this folder
- ⚠️ Trash: Check this folder
- ⚠️ Promotions/Social tabs (Gmail): Check these

### Verify Resend API Key
The email is sent via Resend API. Check:
1. API key is correct in `.env.local`
2. API key is active in Resend dashboard
3. Sending domain is verified (if using custom domain)

## Quick Fix: Check Logs Now

### Terminal 1 (Stripe CLI)
Look for the most recent webhook event. Should show:
```
2025-11-21 XX:XX:XX   --> checkout.session.completed [evt_...]
2025-11-21 XX:XX:XX  <--  [200] POST http://localhost:3000/api/webhook
```

### Terminal 2 (Next.js Server)
Look for webhook logs. Should show:
```
POST /api/create-checkout 200 in XXXms
📥 Webhook endpoint called
✅ Webhook signature verified
📧 Preparing to send email...
✅ Order confirmation email sent successfully
```

## If Webhook Wasn't Called

This means Stripe CLI didn't forward the event. Possible reasons:
1. Stripe CLI was stopped/crashed
2. Stripe CLI is forwarding to wrong port
3. Network issue

**Solution**: Restart Stripe CLI:
```bash
stripe listen --forward-to localhost:3000/api/webhook
```

## If Webhook Was Called But No Email Logs

This means the webhook endpoint didn't process the event correctly. Possible reasons:
1. Webhook signature verification failed
2. Code error in webhook handler
3. Resend API error

**Solution**: Check Next.js terminal for error messages.

## If Email Logs Show Success But No Email

This means Resend API accepted the request but didn't deliver. Possible reasons:
1. Email caught in spam
2. Resend API issue
3. Email address typo

**Solution**: 
1. Check spam/junk folder
2. Check Resend dashboard for delivery status
3. Verify email address in `.env.local`

## Next Steps

1. **Check both terminal windows** for logs
2. **Share the logs** so I can see what happened
3. **Check spam folder** in email
4. **Make another test payment** and watch the logs in real-time

## Expected Log Flow

When payment succeeds:
1. Browser redirects to `/success`
2. Stripe sends webhook to CLI
3. CLI forwards to Next.js
4. Next.js logs: "📥 Webhook endpoint called"
5. Next.js logs: "✅ Webhook signature verified"
6. Next.js logs: "📧 Preparing to send email..."
7. Next.js logs: "✅ Order confirmation email sent"
8. Email arrives in inbox

If any step fails, the logs will show where it stopped.

