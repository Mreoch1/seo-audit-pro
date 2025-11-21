# Create Live Webhook Endpoint - Step by Step

## 🔴 Important: Switch to LIVE Mode First!

You're currently in **Workbench** (test mode). You need to switch to **LIVE mode** to create the production webhook.

### Step 1: Switch to Live Mode

1. Look at the **top right corner** of the Stripe dashboard
2. You should see a toggle that says **"Workbench"** or **"Test mode"**
3. **Click the toggle** to switch to **"Live mode"**
4. The interface will refresh and show your live account

### Step 2: Navigate to Webhooks

1. In Live mode, go to: **"Developers"** → **"Webhooks"** (in the left sidebar)
2. Or go directly to: https://dashboard.stripe.com/webhooks
3. Make sure you're still in **LIVE mode** (check top right)

### Step 3: Add Webhook Endpoint

1. Click the **"+ Add endpoint"** button (purple button)
2. **Endpoint URL:** Enter: `https://seoauditpro.net/api/webhook`
3. **Description (optional):** "SEO Audit Pro - Order notifications"
4. **Events to send:** 
   - Click **"Select events"**
   - Check: **"checkout.session.completed"**
   - Click **"Add events"**
5. Click **"Add endpoint"**

### Step 4: Get Signing Secret

1. After creating the endpoint, click on it in the list
2. Find the **"Signing secret"** section
3. Click **"Reveal"** button
4. Copy the secret (starts with `whsec_...`)
5. **Keep this secret safe!**

### Step 5: Update Netlify

Run this command (replace with your actual secret):

```bash
netlify env:set STRIPE_WEBHOOK_SECRET "whsec_YOUR_SECRET_HERE"
```

### Step 6: Verify

1. Netlify will auto-deploy
2. Test with a small real payment
3. Check that email notifications are sent

---

## ⚠️ Common Mistakes

- ❌ Creating webhook in Workbench/Test mode (won't work for live payments)
- ❌ Using wrong URL (must be `https://seoauditpro.net/api/webhook`)
- ❌ Forgetting to select `checkout.session.completed` event
- ❌ Not updating Netlify environment variable

## ✅ Checklist

- [ ] Switched to LIVE mode in Stripe
- [ ] Created webhook endpoint
- [ ] URL: `https://seoauditpro.net/api/webhook`
- [ ] Event: `checkout.session.completed` selected
- [ ] Copied signing secret
- [ ] Updated Netlify environment variable
- [ ] Tested with real payment

---

**Current Status:** You're in Workbench (test mode) - switch to Live mode first!

