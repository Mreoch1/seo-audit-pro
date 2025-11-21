# System Status Check

## Current Status

### ✅ Stripe CLI
- **Status**: Running
- **Forwarding to**: localhost:3000/api/webhook
- **Webhook Secret**: whsec_d261f022a78cb5c91f289f8094ad119e2327fbd177432969eb4362556d88df35

### Next.js Server
- **Expected Port**: 3000
- **Status**: Checking...

### Environment Variables (.env.local)
- **NEXT_PUBLIC_BASE_URL**: http://localhost:3000
- **STRIPE_WEBHOOK_SECRET**: whsec_d261f022a78cb5c91f289f8094ad119e2327fbd177432969eb4362556d88df35
- **RESEND_API_KEY**: re_MnL5GhTP_GPEp8MDbt8AaXCaJoueyX7BP
- **TO_EMAIL**: Mreoch82@hotmail.com

## What Should Be Running

1. **Stripe CLI** (Terminal 1)
   ```bash
   stripe listen --forward-to localhost:3000/api/webhook
   ```
   Should show: `Ready! Your webhook signing secret is whsec_...`

2. **Next.js Server** (Terminal 2)
   ```bash
   npm run dev
   ```
   Should show: `Local: http://localhost:3000`

## Test Payment Flow

When you make a test payment:

1. **Stripe Checkout** opens and processes payment
2. **Stripe** sends webhook to CLI
3. **Stripe CLI** forwards to `localhost:3000/api/webhook`
4. **Next.js webhook handler** receives event
5. **Resend API** sends email to `Mreoch82@hotmail.com`

## Expected Logs

### Stripe CLI Terminal:
```
--> checkout.session.completed [evt_...]
<-- [200] POST http://localhost:3000/api/webhook
```

### Next.js Terminal:
```
📥 Webhook endpoint called
✅ Webhook signature verified
📧 Preparing to send email...
✅ Order confirmation email sent successfully
```

## If Something's Not Working

### Stripe CLI not running:
```bash
stripe listen --forward-to localhost:3000/api/webhook
```

### Next.js server not running:
```bash
npm run dev
```

### Port 3000 already in use:
```bash
# Find what's using port 3000
lsof -ti:3000

# Kill it
kill -9 $(lsof -ti:3000)

# Then restart Next.js
npm run dev
```

### Webhook secret mismatch:
- Copy the secret from Stripe CLI output
- Update `.env.local`: `STRIPE_WEBHOOK_SECRET=whsec_...`
- Restart Next.js server

## Test Payment

Use Stripe test card:
- **Card Number**: 4242 4242 4242 4242
- **Expiry**: Any future date
- **CVC**: Any 3 digits
- **ZIP**: Any 5 digits

After payment, check:
1. Browser redirects to `/success` page
2. Stripe CLI shows 200 response
3. Next.js terminal shows email logs
4. Email arrives at Mreoch82@hotmail.com

