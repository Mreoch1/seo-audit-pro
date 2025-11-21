# Deployment Guide - SEO Audit Pro

## Prerequisites

✅ Git repository initialized
✅ Code committed
✅ Domain: seoauditpro.net (ready to connect)

## Step 1: Push to GitHub

```bash
# If you haven't created a GitHub repo yet:
# 1. Go to github.com
# 2. Click "New repository"
# 3. Name it: seo-audit-pro
# 4. Don't initialize with README (we already have code)
# 5. Copy the remote URL

# Add remote (replace with your actual repo URL):
git remote add origin https://github.com/YOUR_USERNAME/seo-audit-pro.git

# Push code:
git branch -M main
git push -u origin main
```

## Step 2: Deploy to Netlify

### Option A: Netlify CLI (Recommended)

```bash
# Install Netlify CLI (if not installed):
npm install -g netlify-cli

# Login to Netlify:
netlify login

# Initialize and deploy:
netlify init

# Follow prompts:
# - Create & configure a new site
# - Team: Select your team
# - Site name: seo-audit-pro (or auto-generate)
# - Build command: npm run build
# - Publish directory: .next
# - Deploy site: Yes

# Deploy:
netlify deploy --prod
```

### Option B: Netlify Dashboard

1. Go to: https://app.netlify.com
2. Click "Add new site" → "Import an existing project"
3. Choose "GitHub" and authorize
4. Select your `seo-audit-pro` repository
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
   - **Node version**: 18
6. Click "Deploy site"

## Step 3: Configure Environment Variables in Netlify

Go to: Site settings → Environment variables

Add these variables:

```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_LIVE_KEY
STRIPE_SECRET_KEY=sk_live_YOUR_LIVE_KEY
STRIPE_WEBHOOK_SECRET=whsec_YOUR_PRODUCTION_WEBHOOK_SECRET
NEXT_PUBLIC_BASE_URL=https://seoauditpro.net
RESEND_API_KEY=re_MnL5GhTP_GPEp8MDbt8AaXCaJoueyX7BP
TO_EMAIL=mreoch82@hotmail.com
```

⚠️ **IMPORTANT**: Use **LIVE** Stripe keys for production, not test keys!

## Step 4: Set Up Stripe Production Webhook

1. Go to: https://dashboard.stripe.com/webhooks
2. Click "Add endpoint"
3. Endpoint URL: `https://seoauditpro.net/api/webhook`
4. Events to send: Select `checkout.session.completed`
5. Click "Add endpoint"
6. Copy the **Signing secret** (starts with `whsec_`)
7. Add it to Netlify environment variables as `STRIPE_WEBHOOK_SECRET`

## Step 5: Connect Custom Domain (seoauditpro.net)

### In Netlify:

1. Go to: Site settings → Domain management
2. Click "Add custom domain"
3. Enter: `seoauditpro.net`
4. Click "Verify"
5. Netlify will show DNS records to add

### In Network Solutions (Your Domain Provider):

Based on your screenshot, you're using Network Solutions. Here's what to do:

1. Go to: Domain Overview for seoauditpro.net
2. Click "Connect" under "Domain Connections"
3. Choose "Manage DNS"
4. Add these records (Netlify will provide exact values):

**A Record:**
```
Type: A
Host: @
Points to: 75.2.60.5 (Netlify's IP - check Netlify for current IP)
TTL: 3600
```

**CNAME Record:**
```
Type: CNAME
Host: www
Points to: YOUR-SITE-NAME.netlify.app
TTL: 3600
```

5. Save changes
6. Wait for DNS propagation (can take up to 48 hours, usually faster)

### Back in Netlify:

1. Once DNS propagates, Netlify will automatically provision SSL certificate
2. Enable HTTPS redirect
3. Your site will be live at: https://seoauditpro.net

## Step 6: Test Production Site

1. Visit: https://seoauditpro.net
2. Fill out order form
3. Use **real credit card** or Stripe test card:
   - Card: 4242 4242 4242 4242
   - Expiry: Any future date
   - CVC: Any 3 digits
4. Complete payment
5. Check email at mreoch82@hotmail.com

## Step 7: Monitor and Maintain

### Netlify Dashboard:
- Monitor deployments
- Check build logs
- View analytics

### Stripe Dashboard:
- Monitor payments
- View webhook logs
- Check for failed webhooks

### Resend Dashboard:
- Monitor email delivery
- Check bounce rates
- View email logs

## Continuous Deployment

Once connected to GitHub, Netlify will automatically:
- Deploy on every push to `main` branch
- Run build command
- Update live site

To deploy updates:
```bash
git add .
git commit -m "Your update message"
git push origin main
```

Netlify will automatically rebuild and deploy!

## Troubleshooting

### Build Fails
- Check Netlify build logs
- Verify Node version (18)
- Check environment variables

### Webhook Not Working
- Verify webhook URL in Stripe dashboard
- Check webhook secret in Netlify env vars
- View webhook logs in Stripe dashboard

### Email Not Sending
- Check Resend API key
- Verify TO_EMAIL is lowercase
- Check Resend dashboard for delivery status

### Domain Not Working
- Verify DNS records in Network Solutions
- Wait for DNS propagation (up to 48 hours)
- Check Netlify domain settings

## Production Checklist

- [ ] Code pushed to GitHub
- [ ] Netlify site created and deployed
- [ ] Environment variables configured (LIVE keys!)
- [ ] Stripe production webhook configured
- [ ] Custom domain connected (seoauditpro.net)
- [ ] DNS records added in Network Solutions
- [ ] SSL certificate provisioned
- [ ] Test payment completed
- [ ] Email notification received
- [ ] Sample PDF uploaded to production

## Support

- Netlify Docs: https://docs.netlify.com
- Stripe Docs: https://stripe.com/docs
- Resend Docs: https://resend.com/docs
- Next.js Docs: https://nextjs.org/docs

