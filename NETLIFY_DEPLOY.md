# Deploy to Netlify - SEO Audit Pro

## ✅ Status
- ✅ Code pushed to GitHub: https://github.com/Mreoch1/seo-audit-pro
- ✅ Ready for Netlify deployment

## 🚀 Deploy Now (3 Simple Steps)

### Step 1: Connect GitHub to Netlify

1. Go to: **https://app.netlify.com**
2. Click **"Add new site"** → **"Import an existing project"**
3. Click **"Deploy with GitHub"**
4. Authorize Netlify to access your GitHub (if not already)
5. Select repository: **Mreoch1/seo-audit-pro**

### Step 2: Configure Build Settings

Netlify should auto-detect Next.js settings, but verify:

- **Branch to deploy**: `main`
- **Build command**: `npm run build`
- **Publish directory**: `.next`
- **Node version**: 18 (or leave default)

Click **"Deploy site"**

### Step 3: Add Environment Variables

After deployment starts, go to:
**Site settings** → **Environment variables** → **Add a variable**

Add these variables:

```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
Value: [Your Stripe publishable key]

STRIPE_SECRET_KEY
Value: [Your Stripe secret key]

STRIPE_WEBHOOK_SECRET
Value: [You'll get this after setting up webhook - see below]

NEXT_PUBLIC_BASE_URL
Value: https://seoauditpro.net

RESEND_API_KEY
Value: [Your Resend API key]

TO_EMAIL
Value: mreoch82@hotmail.com
```

After adding variables, **trigger a redeploy**:
- Go to: **Deploys** → **Trigger deploy** → **Deploy site**

## 🔗 Set Up Stripe Webhook

1. Wait for Netlify deployment to complete
2. Copy your Netlify URL (e.g., `https://seo-audit-pro.netlify.app`)
3. Go to: **https://dashboard.stripe.com/test/webhooks**
4. Click **"Add endpoint"**
5. **Endpoint URL**: `https://YOUR-SITE.netlify.app/api/webhook`
6. **Events**: Select `checkout.session.completed`
7. Click **"Add endpoint"**
8. Copy the **Signing secret** (starts with `whsec_`)
9. Go back to Netlify → Environment variables
10. Update `STRIPE_WEBHOOK_SECRET` with the new secret
11. **Redeploy** the site

## 🌐 Connect Custom Domain (seoauditpro.net)

### In Netlify:

1. Go to: **Site settings** → **Domain management**
2. Click **"Add custom domain"**
3. Enter: `seoauditpro.net`
4. Click **"Verify"**
5. Netlify will show DNS records to add

### In Network Solutions:

1. Go to your domain dashboard for seoauditpro.net
2. Click **"Manage DNS"** or **"Advanced DNS"**
3. Add these records (Netlify will provide exact values):

**A Record:**
```
Type: A
Host: @ (or leave blank for root domain)
Points to: 75.2.60.5
TTL: 3600
```

**CNAME Record:**
```
Type: CNAME
Host: www
Points to: seo-audit-pro.netlify.app
TTL: 3600
```

4. **Save changes**
5. Wait for DNS propagation (15 minutes to 48 hours)

### Back in Netlify:

1. Once DNS propagates, Netlify will auto-provision SSL certificate
2. Enable **"Force HTTPS"** in Domain settings
3. Your site will be live at: **https://seoauditpro.net**

## 🎯 Continuous Deployment

Now that GitHub is connected:
- Every push to `main` branch will automatically deploy
- Pull requests will create preview deployments
- You can see build logs in Netlify dashboard

To update your site:
```bash
# Make changes to your code
git add .
git commit -m "Your update message"
git push origin main
```

Netlify will automatically rebuild and deploy!

## ✅ Post-Deployment Checklist

- [ ] Site deployed from GitHub
- [ ] Environment variables configured
- [ ] Stripe webhook configured
- [ ] Custom domain connected
- [ ] DNS records added
- [ ] SSL certificate active
- [ ] Test payment completed
- [ ] Email notification received

## 🧪 Test Your Live Site

1. Visit your Netlify URL (or https://seoauditpro.net after DNS)
2. Fill out order form
3. Use test card: **4242 4242 4242 4242**
4. Complete payment
5. Check email

## 📊 Monitor

- **Netlify Dashboard**: Deployments, logs, analytics
- **GitHub**: Code, commits, pull requests
- **Stripe Dashboard**: Payments, webhooks
- **Resend Dashboard**: Email delivery

## 🆘 Troubleshooting

### Build Fails
- Check Netlify build logs
- Verify Node version
- Check environment variables

### Webhook Not Working
- Verify webhook URL in Stripe
- Check webhook secret in Netlify
- View logs in Stripe dashboard

### Domain Not Working
- Verify DNS records
- Wait for propagation
- Check Netlify domain settings

---

## 🎯 Quick Summary

1. **Netlify**: Import from GitHub (Mreoch1/seo-audit-pro)
2. **Build**: Auto-detected Next.js settings
3. **Env Vars**: Add all environment variables
4. **Webhook**: Configure in Stripe dashboard
5. **Domain**: Add DNS records in Network Solutions
6. **Test**: Make a payment and verify email

Your site will be live at **https://seoauditpro.net**!

Repository: https://github.com/Mreoch1/seo-audit-pro

