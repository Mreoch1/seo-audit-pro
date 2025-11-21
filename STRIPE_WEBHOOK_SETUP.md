# Stripe Webhook Setup - Quick Guide

## Current Status

✅ Stripe CLI installed and upgraded to v1.32.0
🔄 Stripe login in progress

## Next Steps

### 1. Complete Stripe Login

In your terminal, you should see:
```
Your pairing code is: mighty-neatly-affirm-amuse
Press Enter to open the browser or visit https://dashboard.stripe.com/stripecli/confirm_auth?t=...
```

**Do one of these:**
- Press **Enter** to open browser automatically, OR
- Visit the URL shown in your terminal
- Authorize the Stripe CLI in your browser

### 2. Get Webhook Secret

Once logged in, run this command in the same terminal:

```bash
stripe listen --forward-to localhost:3000/api/webhook
```

**This will output something like:**
```
> Ready! Your webhook signing secret is whsec_xxxxxxxxxxxxx (^C to quit)
```

### 3. Copy the Webhook Secret

Copy the `whsec_...` secret that appears.

### 4. Update .env.local

Update your `.env.local` file:

```bash
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx
```

(Replace `whsec_xxxxxxxxxxxxx` with the actual secret from step 2)

### 5. Keep Stripe CLI Running

**Important**: Keep the `stripe listen` command running in that terminal while testing!

It will forward webhook events from Stripe to your local server.

## Testing

Once everything is set up:

1. **Terminal 1**: Keep `stripe listen --forward-to localhost:3000/api/webhook` running
2. **Terminal 2**: Run `npm run dev` (your Next.js server)
3. **Browser**: Test the checkout flow
4. **Check Terminal 1**: You should see webhook events when payment completes
5. **Check Email**: You should receive order notification at Mreoch82@hotmail.com

## Troubleshooting

### "Command not found: #"
- This is just a comment line being interpreted - ignore it
- The actual commands ran successfully

### Webhook secret not showing?
- Make sure you completed the `stripe login` step first
- The `stripe listen` command must be running to see the secret

### Webhooks not forwarding?
- Make sure Next.js server is running on port 3000
- Check that the URL in `stripe listen` matches your server URL

