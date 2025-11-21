# Simple Webhook Setup - Follow These Steps

## 🎯 Goal: Get the webhook secret so I can update Netlify for you

### Step 1: Open Stripe Dashboard
1. Go to: **https://dashboard.stripe.com/**
2. **IMPORTANT:** Look at the **top right corner**
3. If it says **"Workbench"** or **"Test mode"**, click it to switch to **"Live mode"**

### Step 2: Go to Webhooks
1. Click **"Developers"** in the left sidebar
2. Click **"Webhooks"**
3. Make sure you're still in **LIVE mode** (check top right)

### Step 3: Add Endpoint
1. Click the big purple button: **"+ Add endpoint"**
2. In the **"Endpoint URL"** field, type exactly:
   ```
   https://seoauditpro.net/api/webhook
   ```
3. Click **"Select events"**
4. Check the box: **"checkout.session.completed"**
5. Click **"Add events"**
6. Click **"Add endpoint"** button at the bottom

### Step 4: Get the Secret
1. You'll see your new webhook in the list
2. **Click on it** (click the webhook URL or name)
3. Scroll down to **"Signing secret"**
4. Click the **"Reveal"** button
5. Copy the secret (it starts with `whsec_...`)
6. **Paste it here and I'll update Netlify for you!**

---

## ✅ That's It!

Once you paste the secret here, I'll run:
```bash
netlify env:set STRIPE_WEBHOOK_SECRET "whsec_YOUR_SECRET"
```

And you'll be all set!

---

## 🆘 Stuck?

**Can't find "Developers"?**
- Look in the left sidebar
- It might be collapsed - click the menu icon

**Still in Workbench/Test mode?**
- Look at the very top right of the page
- There should be a toggle or dropdown
- Switch it to "Live mode"

**Can't see "+ Add endpoint" button?**
- Make sure you're in Live mode
- Make sure you're on the Webhooks page
- Try refreshing the page

---

**Just paste the `whsec_...` secret here when you have it!**

