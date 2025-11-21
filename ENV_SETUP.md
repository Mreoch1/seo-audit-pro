# Environment Variables Setup

## ✅ What's Already Configured

Your Stripe **Publishable Key** has been added to `.env.local`:
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51SVmTx5FBRJxqP74nsVBvERDnGYQWaFU1TtkutNYIY2wvN8dt4kAVgYF0V2CC34yo4Ep7LWztPbPTD0C9qbGqBQq00h4xHJsNn
```

## ⚠️ What You Still Need

### 1. Stripe Secret Key

1. Go to https://dashboard.stripe.com/test/apikeys
2. Copy your **Secret key** (starts with `sk_test_`)
3. Replace `sk_test_your_secret_key_here` in `.env.local` with your actual secret key

### 2. Stripe Webhook Secret

**For Local Development (using Stripe CLI):**

1. Install Stripe CLI:
   ```bash
   brew install stripe/stripe-cli/stripe
   ```

2. Login:
   ```bash
   stripe login
   ```

3. Forward webhooks:
   ```bash
   stripe listen --forward-to localhost:3000/api/webhook
   ```

4. Copy the webhook secret (starts with `whsec_`) that appears
5. Replace `whsec_your_webhook_secret_here` in `.env.local`

**OR for Production:**

1. Go to https://dashboard.stripe.com/test/webhooks
2. Click "Add endpoint"
3. Enter: `https://yourdomain.com/api/webhook`
4. Select event: `checkout.session.completed`
5. Copy the webhook signing secret
6. Add it to `.env.local`

### 3. Resend API Key (for Email Notifications)

1. Sign up at https://resend.com
2. Get your API key from the dashboard
3. Replace `re_your_resend_key_here` in `.env.local`

## 📝 Your `.env.local` File Should Look Like:

```bash
# Stripe Keys
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51SVmTx5FBRJxqP74nsVBvERDnGYQWaFU1TtkutNYIY2wvN8dt4kAVgYF0V2CC34yo4Ep7LWztPbPTD0C9qbGqBQq00h4xHJsNn
STRIPE_SECRET_KEY=sk_test_YOUR_ACTUAL_SECRET_KEY_HERE
STRIPE_WEBHOOK_SECRET=whsec_YOUR_ACTUAL_WEBHOOK_SECRET_HERE

# Base URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Email (Resend)
RESEND_API_KEY=re_YOUR_ACTUAL_RESEND_KEY_HERE
TO_EMAIL=Mreoch82@hotmail.com
```

## 🚀 After Setup

1. **Restart your dev server** (if running):
   ```bash
   # Stop with Ctrl+C, then:
   npm run dev
   ```

2. **Test the checkout flow:**
   - Fill out the order form
   - Use test card: `4242 4242 4242 4242`
   - Complete payment
   - Check your email for the order notification

## 🔒 Security Note

- `.env.local` is already in `.gitignore` - your secrets won't be committed
- Never share your secret keys publicly
- Use test keys for development, live keys for production

