# Quick Deploy to Netlify - SEO Audit Pro

## ✅ Current Status
- Git repository: Initialized and committed
- Netlify CLI: Installed and logged in
- Code: Ready to deploy

## 🚀 Deploy Now (2 Options)

### Option 1: Netlify Dashboard (Easiest - Recommended)

1. **Build the project first:**
   ```bash
   npm run build
   ```

2. **Go to Netlify Dashboard:**
   - Visit: https://app.netlify.com
   - Click "Add new site" → "Deploy manually"

3. **Drag and drop the `.next` folder** to the upload area

4. **Configure site:**
   - Site name: seo-audit-pro (or auto-generate)
   - Click "Deploy site"

5. **Add environment variables:**
   - Go to: Site settings → Environment variables
   - Add all variables from `.env.local` (see below)

6. **Connect custom domain:**
   - Go to: Site settings → Domain management
   - Add domain: seoauditpro.net
   - Follow DNS instructions

### Option 2: Netlify CLI (Manual Deploy)

```bash
# Build the project
npm run build

# Deploy to Netlify
netlify deploy

# Follow prompts:
# - Create & configure a new site
# - Team: Select your team
# - Site name: seo-audit-pro
# - Deploy path: .next

# After testing, deploy to production:
netlify deploy --prod
```

## 📋 Environment Variables to Add in Netlify

Go to: Site settings → Environment variables

Add these (use LIVE Stripe keys for production):

```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_LIVE_KEY
STRIPE_SECRET_KEY=sk_live_YOUR_LIVE_KEY  
STRIPE_WEBHOOK_SECRET=whsec_YOUR_PRODUCTION_WEBHOOK_SECRET
NEXT_PUBLIC_BASE_URL=https://seoauditpro.net
RESEND_API_KEY=re_MnL5GhTP_GPEp8MDbt8AaXCaJoueyX7BP
TO_EMAIL=mreoch82@hotmail.com
```

⚠️ **IMPORTANT**: 
- Use **LIVE** Stripe keys (pk_live_... and sk_live_...) for production
- Get new webhook secret from Stripe Dashboard for production URL
- Keep test keys for local development only

## 🌐 Connect Domain (seoauditpro.net)

### In Netlify:
1. Site settings → Domain management
2. Add custom domain: `seoauditpro.net`
3. Netlify will show DNS records

### In Network Solutions:
1. Go to your domain dashboard
2. Click "Manage DNS"
3. Add these records:

**A Record:**
```
Type: A
Host: @
Value: 75.2.60.5 (check Netlify for current IP)
TTL: 3600
```

**CNAME Record:**
```
Type: CNAME  
Host: www
Value: YOUR-SITE-NAME.netlify.app
TTL: 3600
```

4. Save and wait for DNS propagation (up to 48 hours)

## 🔒 Set Up Production Stripe Webhook

1. Go to: https://dashboard.stripe.com/webhooks
2. Click "Add endpoint"
3. URL: `https://seoauditpro.net/api/webhook`
4. Events: Select `checkout.session.completed`
5. Copy the signing secret
6. Add to Netlify env vars as `STRIPE_WEBHOOK_SECRET`

## ✅ Post-Deployment Checklist

- [ ] Site deployed to Netlify
- [ ] Environment variables added
- [ ] Custom domain connected
- [ ] DNS records added
- [ ] SSL certificate active
- [ ] Stripe production webhook configured
- [ ] Test payment completed
- [ ] Email notification received

## 🎯 Quick Start Command

```bash
# Build and check for errors
npm run build

# If build succeeds, deploy manually via Netlify dashboard
# or use: netlify deploy --prod
```

## 📞 Need Help?

- Netlify Support: https://answers.netlify.com
- Stripe Support: https://support.stripe.com
- Check DEPLOYMENT_GUIDE.md for detailed instructions

