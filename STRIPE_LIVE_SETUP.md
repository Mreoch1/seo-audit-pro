# Stripe Live Mode Setup - COMPLETE

## ✅ Keys Updated in Netlify

**Publishable Key:** ✅ Set in Netlify environment variables (live key)

**Secret Key:** ✅ Set in Netlify environment variables (live key)

**Note:** Keys are stored securely in Netlify, not in this repository.

## ⚠️ CRITICAL: Create Live Webhook Endpoint

### Step 1: Create Webhook in Stripe Dashboard

1. Go to: **https://dashboard.stripe.com/webhooks**
2. **IMPORTANT:** Make sure you're in **LIVE mode** (toggle in top right corner)
3. Click: **"Add endpoint"**
4. **Endpoint URL:** `https://seoauditpro.net/api/webhook`
5. **Events to send:** Select **"checkout.session.completed"**
6. Click: **"Add endpoint"**

### Step 2: Get Webhook Signing Secret

1. Click on the newly created webhook endpoint
2. Find: **"Signing secret"** section
3. Click: **"Reveal"** button
4. Copy the secret (starts with `whsec_...`)

### Step 3: Update Netlify Environment Variable

Run this command (replace `whsec_...` with your actual secret):

```bash
netlify env:set STRIPE_WEBHOOK_SECRET "whsec_YOUR_SECRET_HERE"
```

### Step 4: Trigger New Deploy

After updating the webhook secret:
1. Netlify will auto-deploy, OR
2. Manually trigger: **Deploys** → **Trigger deploy** → **Deploy site**

## ✅ Verification Checklist

- [x] Live publishable key set in Netlify
- [x] Live secret key set in Netlify
- [ ] Live webhook endpoint created in Stripe
- [ ] Live webhook secret set in Netlify
- [ ] New deploy triggered
- [ ] Test with real payment (small amount first!)

## 🧪 Testing Live Mode

**Before going fully live:**
1. Test with a small real payment ($1-2)
2. Verify payment appears in Stripe Dashboard (Live mode)
3. Verify email notification sent to you
4. Verify customer receives confirmation email
5. Check webhook is receiving events

## ⚠️ Security Notes

- ✅ Never commit live keys to Git
- ✅ Keys are stored in Netlify environment variables
- ✅ Webhook secret verifies requests are from Stripe
- ✅ All keys are encrypted in Netlify

## 📊 Current Status

**Environment Variables Updated:**
- ✅ `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` → Live key (in Netlify)
- ✅ `STRIPE_SECRET_KEY` → Live key (in Netlify)
- ⏳ `STRIPE_WEBHOOK_SECRET` → **NEEDS TO BE UPDATED**

**Next Step:** Create live webhook endpoint and update webhook secret!

---

**Important:** Without the live webhook secret, payments will work but email notifications won't be sent after payment completion.

