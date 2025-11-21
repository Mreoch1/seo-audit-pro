# Stripe Payment Setup

## Overview

The website now uses Stripe Checkout for secure payment processing. Customers pay upfront, and you receive an email notification after payment is confirmed.

## Setup Steps

### 1. Create Stripe Account

1. Sign up at https://stripe.com (free to start)
2. Complete account verification
3. Get your API keys from the Dashboard

### 2. Get Your API Keys

1. Go to https://dashboard.stripe.com/test/apikeys (for testing)
2. Copy your **Publishable key** (starts with `pk_test_`)
3. Copy your **Secret key** (starts with `sk_test_`)
4. For production, use the "Live mode" keys (starts with `pk_live_` and `sk_live_`)

### 3. Set Up Webhook

1. Go to https://dashboard.stripe.com/test/webhooks
2. Click "Add endpoint"
3. Enter your webhook URL:
   - **Development**: `http://localhost:3000/api/webhook` (use Stripe CLI - see below)
   - **Production**: `https://yourdomain.com/api/webhook`
4. Select event: `checkout.session.completed`
5. Copy the **Webhook signing secret** (starts with `whsec_`)

### 4. Environment Variables

Create `.env.local` file in the project root:

```bash
# Stripe Keys
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Base URL (for production)
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Email (Resend)
RESEND_API_KEY=re_your_resend_key_here
TO_EMAIL=Mreoch82@hotmail.com
```

### 5. Testing with Stripe CLI (Development)

For local development, use Stripe CLI to forward webhooks:

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login
stripe login

# Forward webhooks to local server
stripe listen --forward-to localhost:3000/api/webhook
```

This will give you a webhook signing secret starting with `whsec_` - use this in your `.env.local` for local testing.

### 6. Test Cards

Use these test card numbers in Stripe Checkout:

- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- Use any future expiry date, any CVC, any ZIP

## How It Works

1. **Customer fills out form** → Clicks "Proceed to Checkout"
2. **Redirected to Stripe Checkout** → Sees itemized receipt (tier + each add-on)
3. **Customer pays** → Stripe processes payment
4. **Webhook triggered** → `checkout.session.completed` event
5. **Email sent to you** → With order details and payment confirmation
6. **Customer sees success page** → Confirmation message

## Itemized Receipt

The Stripe receipt shows:
- SEO Audit Tier (Starter/Standard/Advanced) - $X
- Fast Delivery (if selected) - $10
- Extra Pages (X pages) - $5 × quantity
- Extra Keywords (X keywords) - $1 × quantity
- Schema Markup Deep-Dive (if selected) - $15
- Competitor Keyword Gap Report (if selected) - $20

## Production Deployment

1. Switch to **Live mode** in Stripe Dashboard
2. Update environment variables with live keys
3. Add production webhook endpoint
4. Update `NEXT_PUBLIC_BASE_URL` to your domain
5. Deploy to Vercel/Netlify with environment variables set

## Troubleshooting

- **Webhook not working?** Check webhook secret matches
- **Payment succeeds but no email?** Check Resend API key
- **Checkout not loading?** Verify Stripe keys are correct
- **Test mode vs Live mode** - Make sure you're using matching keys

## Support

- Stripe Docs: https://stripe.com/docs
- Stripe Support: https://support.stripe.com

