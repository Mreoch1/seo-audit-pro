# Manual Deployment to Netlify - SEO Audit Pro

## ✅ Status
- ✅ Code built successfully
- ✅ Git repository initialized
- ✅ Ready to deploy

## 🚀 Deploy Now (Simple 3-Step Process)

### Step 1: Go to Netlify Dashboard

Visit: **https://app.netlify.com**

### Step 2: Deploy Site

1. Click **"Add new site"** → **"Deploy manually"**
2. **Drag and drop** the `.next` folder from your project
3. Wait for deployment to complete
4. You'll get a URL like: `https://random-name-123.netlify.app`

### Step 3: Configure Environment Variables

1. Go to: **Site settings** → **Environment variables**
2. Click **"Add a variable"**
3. Add these variables one by one:

```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
Value: pk_test_YOUR_PUBLISHABLE_KEY_HERE

STRIPE_SECRET_KEY
Value: sk_test_YOUR_SECRET_KEY_HERE

STRIPE_WEBHOOK_SECRET
Value: whsec_YOUR_WEBHOOK_SECRET_HERE

NEXT_PUBLIC_BASE_URL
Value: https://seoauditpro.net

RESEND_API_KEY
Value: re_YOUR_RESEND_API_KEY_HERE

TO_EMAIL
Value: your_email@example.com
```

4. Click **"Save"**
5. **Redeploy** the site for env vars to take effect

## 🔗 Set Up Stripe Webhook

1. Go to: **https://dashboard.stripe.com/test/webhooks**
2. Click **"Add endpoint"**
3. **Endpoint URL**: `https://YOUR-SITE-NAME.netlify.app/api/webhook`
   (Replace with your actual Netlify URL)
4. **Events to send**: Select `checkout.session.completed`
5. Click **"Add endpoint"**
6. Copy the **Signing secret** (starts with `whsec_`)
7. Go back to Netlify → Environment variables
8. Update `STRIPE_WEBHOOK_SECRET` with the new secret
9. **Redeploy** the site

## 🌐 Connect Custom Domain (seoauditpro.net)

### In Netlify:

1. Go to: **Site settings** → **Domain management**
2. Click **"Add custom domain"**
3. Enter: `seoauditpro.net`
4. Click **"Verify"**
5. Netlify will show you DNS records to add

### In Network Solutions:

1. Go to: **https://networksolutions.com/my-account/domain-center**
2. Find **seoauditpro.net** → Click **"Manage"**
3. Click **"Advanced DNS"** or **"Manage DNS"**
4. Add these records:

**A Record:**
```
Type: A
Host: @ (or leave blank)
Points to: 75.2.60.5
TTL: 3600 (or Auto)
```

**CNAME Record:**
```
Type: CNAME
Host: www
Points to: YOUR-SITE-NAME.netlify.app
TTL: 3600 (or Auto)
```

5. **Save changes**
6. Wait for DNS propagation (15 minutes to 48 hours)

### Back in Netlify:

1. Once DNS propagates, Netlify will auto-provision SSL
2. Enable **"Force HTTPS"** in Domain settings
3. Your site will be live at: **https://seoauditpro.net**

## ✅ Post-Deployment Checklist

- [ ] Site deployed to Netlify
- [ ] All environment variables added
- [ ] Stripe webhook configured
- [ ] Custom domain added
- [ ] DNS records added in Network Solutions
- [ ] SSL certificate active
- [ ] Test payment works
- [ ] Email notification received

## 🧪 Test Your Live Site

1. Visit: `https://YOUR-SITE-NAME.netlify.app` (or `https://seoauditpro.net` after DNS)
2. Fill out order form
3. Use test card: **4242 4242 4242 4242**
4. Complete payment
5. Check email at: **mreoch82@hotmail.com**

## 📊 Monitor Your Site

- **Netlify Dashboard**: View deployments, logs, analytics
- **Stripe Dashboard**: Monitor payments, webhooks
- **Resend Dashboard**: Check email delivery

## 🔄 Update Your Site

When you make changes:

```bash
# Make your changes
# Build the project
npm run build

# Go to Netlify Dashboard
# Drag and drop the .next folder again
# Or set up continuous deployment with GitHub
```

## 🆘 Troubleshooting

### Build Fails
- Check Node version (should be 18+)
- Verify all dependencies installed
- Check build logs in Netlify

### Webhook Not Working
- Verify webhook URL in Stripe dashboard
- Check webhook secret in Netlify env vars
- View webhook logs in Stripe dashboard

### Domain Not Working
- Verify DNS records in Network Solutions
- Wait for DNS propagation
- Check Netlify domain settings
- Use `dig seoauditpro.net` to check DNS

### Email Not Sending
- Check Resend API key
- Verify TO_EMAIL is lowercase
- Check Resend dashboard for errors

## 📞 Support

- Netlify: https://answers.netlify.com
- Stripe: https://support.stripe.com
- Resend: https://resend.com/support

---

## 🎯 Quick Summary

1. **Deploy**: Drag `.next` folder to Netlify
2. **Configure**: Add environment variables
3. **Webhook**: Set up in Stripe dashboard
4. **Domain**: Add DNS records in Network Solutions
5. **Test**: Make a payment and check email

Your site will be live at **https://seoauditpro.net** once DNS propagates!

