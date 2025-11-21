# Email Troubleshooting Guide

## Issue: Emails Not Being Sent After Purchase

### Quick Checks

1. **Verify Resend Domain**
   - Go to [Resend Dashboard](https://resend.com/domains)
   - Check if `seoauditpro.com` is verified
   - If not verified, you have two options:
     - **Option A:** Verify the domain (recommended)
       - Add DNS records as shown in Resend dashboard
       - Wait for verification (usually a few minutes)
     - **Option B:** Use a different "from" address
       - Add `FROM_EMAIL` environment variable in Netlify
       - Use format: `"Your Name <verified-email@yourdomain.com>"`
       - Or use Resend's default: `"SEO Audit Pro <onboarding@resend.dev>"` (testing only)

2. **Check Stripe Webhook Status**
   - Go to [Stripe Dashboard → Webhooks](https://dashboard.stripe.com/webhooks)
   - Find your webhook endpoint: `https://seoauditpro.net/api/webhook`
   - Check "Recent events" - you should see `checkout.session.completed` events
   - Click on an event to see:
     - Status (should be "Succeeded")
     - Response (should be `{"received":true}`)
     - If failed, check the error message

3. **Check Netlify Function Logs**
   - Go to Netlify Dashboard → Your Site → Functions
   - Look for `/api/webhook` function logs
   - Check for any error messages
   - Look for log entries like:
     - "Webhook endpoint called"
     - "Webhook signature verified"
     - "Preparing to send order notification email"
     - "Email sent successfully" or error messages

4. **Check Resend Dashboard**
   - Go to [Resend Dashboard → Emails](https://resend.com/emails)
   - Check if emails were attempted to be sent
   - Look for delivery status (sent, bounced, failed)
   - Check error messages if any

### Common Issues & Solutions

#### Issue: "Domain not verified" error
**Solution:** Verify your domain in Resend or use a verified email address

#### Issue: Webhook not receiving events
**Solution:** 
- Check webhook URL is correct: `https://seoauditpro.net/api/webhook`
- Verify `STRIPE_WEBHOOK_SECRET` matches the secret in Stripe dashboard
- Make sure webhook is enabled in Stripe dashboard

#### Issue: Emails sent but not received
**Solution:**
- Check spam/junk folder
- Verify recipient email addresses are correct
- Check Resend dashboard for bounce/failure reasons
- Ensure domain reputation is good (not blacklisted)

### Testing the Webhook

1. **Test with Stripe CLI** (for local testing):
   ```bash
   stripe listen --forward-to localhost:3000/api/webhook
   stripe trigger checkout.session.completed
   ```

2. **Test in Production:**
   - Make a test purchase (use Stripe test mode or small real payment)
   - Check Stripe webhook logs immediately
   - Check Netlify function logs
   - Check Resend dashboard

### Environment Variables Checklist

Make sure these are set in Netlify:
- ✅ `RESEND_API_KEY` - Your Resend API key
- ✅ `TO_EMAIL` - Email to receive order notifications (mreoch82@hotmail.com)
- ✅ `STRIPE_WEBHOOK_SECRET` - Webhook signing secret from Stripe
- ✅ `STRIPE_SECRET_KEY` - Your Stripe secret key
- ⚠️ `FROM_EMAIL` (optional) - Custom from address if domain not verified

### Next Steps

1. **Verify Resend Domain:**
   - Go to Resend dashboard → Domains
   - Add `seoauditpro.com` if not already added
   - Add the required DNS records (SPF, DKIM, DMARC)
   - Wait for verification

2. **If Domain Can't Be Verified:**
   - Add `FROM_EMAIL` environment variable in Netlify
   - Use a verified email address you control
   - Format: `"SEO Audit Pro <your-verified-email@domain.com>"`

3. **Monitor Logs:**
   - After next purchase, check all three places:
     - Stripe webhook logs
     - Netlify function logs  
     - Resend email logs

### Debugging Commands

Check if webhook is working:
```bash
# View recent webhook events in Stripe
# Go to: https://dashboard.stripe.com/webhooks → Your webhook → Recent events
```

Check Netlify logs:
```bash
# In Netlify dashboard: Site → Functions → /api/webhook → View logs
```

Check Resend API status:
```bash
# Go to: https://resend.com/emails
# Look for recent email attempts
```

