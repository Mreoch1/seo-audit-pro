# Stripe Live Mode Setup

## 🔴 Current Status: TEST MODE

You're currently using **Stripe Test Mode**:
- Test Publishable Key: `pk_test_...`
- Test Secret Key: `sk_test_...`
- Test Webhook Secret: `whsec_...`

## ✅ When to Switch to Live Mode

**Stay in TEST MODE if:**
- ✅ You're still testing the site
- ✅ You haven't launched yet
- ✅ You want to test payments without real charges

**Switch to LIVE MODE when:**
- 🚀 You're ready to accept real payments
- 🚀 The site is live and customers are ready to buy
- 🚀 You've tested everything thoroughly

## 🔄 How to Switch to Live Mode

### Step 1: Get Live Keys from Stripe

1. Go to: **https://dashboard.stripe.com/**
2. Click: **"Developers"** → **"API keys"**
3. Toggle: **"Test mode"** OFF (switch to Live mode)
4. Copy your **Live keys**:
   - **Publishable key** (starts with `pk_live_...`)
   - **Secret key** (starts with `sk_live_...`) - Click "Reveal" to see it

### Step 2: Get Live Webhook Secret

1. In Stripe Dashboard: **"Developers"** → **"Webhooks"**
2. Find your webhook endpoint: `https://seoauditpro.net/api/webhook`
3. If it doesn't exist, click **"Add endpoint"**:
   - URL: `https://seoauditpro.net/api/webhook`
   - Events to send: Select `checkout.session.completed`
   - Click **"Add endpoint"**
4. Click on the webhook endpoint
5. Click **"Reveal"** next to "Signing secret"
6. Copy the **Signing secret** (starts with `whsec_...`)

### Step 3: Update Environment Variables in Netlify

1. Go to: **https://app.netlify.com/sites/seoauditpro**
2. Click: **"Site settings"** → **"Environment variables"**
3. Update these variables:

**Replace:**
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

**With:**
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_... (new live webhook secret)
```

4. Click **"Save"**

### Step 4: Trigger New Deploy

After updating environment variables:
1. Netlify will automatically trigger a new deploy
2. Or manually: **"Deploys"** → **"Trigger deploy"** → **"Deploy site"**
3. Wait for deploy to complete (2-3 minutes)

### Step 5: Test with Real Payment

1. Visit: **https://seoauditpro.net**
2. Fill out the order form
3. Use a **real credit card** (will be charged!)
4. Complete checkout
5. Verify:
   - Payment appears in Stripe Dashboard (Live mode)
   - Email notification sent to you
   - Customer receives confirmation email

## ⚠️ Important Notes

### Test Mode vs Live Mode

**Test Mode:**
- ✅ Use test cards (4242 4242 4242 4242)
- ✅ No real charges
- ✅ Safe for testing
- ❌ Can't accept real payments

**Live Mode:**
- ✅ Accepts real credit cards
- ✅ Real charges to customers
- ✅ Real money in your Stripe account
- ⚠️ Make sure everything works first!

### Test Cards (Test Mode Only)

These only work in test mode:
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- 3D Secure: `4000 0025 0000 3155`

### Security

- ✅ Never commit live keys to Git
- ✅ Always use environment variables
- ✅ Keep secret keys secret
- ✅ Rotate keys if compromised

## 🔍 How to Check Current Mode

**In Stripe Dashboard:**
- Look at top right corner
- If it says **"Test mode"** → You're in test mode
- If it says **"Live mode"** → You're in live mode

**In Your Code:**
- Test keys start with: `pk_test_` or `sk_test_`
- Live keys start with: `pk_live_` or `sk_live_`

## 📊 Recommendation

**For Now:**
- ✅ **Keep TEST MODE** until you're ready to launch
- ✅ Test everything thoroughly first
- ✅ Make sure SSL certificate is active
- ✅ Verify all features work

**When Ready to Launch:**
- 🚀 Switch to LIVE MODE
- 🚀 Update environment variables
- 🚀 Test with a small real payment first
- 🚀 Monitor Stripe dashboard

## 🎯 Current Status

**You're in TEST MODE** - Perfect for now!

- ✅ Site is functional
- ✅ Payments work (test mode)
- ✅ Safe to test everything
- ⏳ Switch to live when ready to accept real payments

---

**Bottom Line:** You're good with test mode for now! Switch to live mode only when you're ready to accept real customer payments.

