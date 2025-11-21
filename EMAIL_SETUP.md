# Email Setup Instructions

The website now sends email notifications directly when users submit orders, instead of using mailto links.

## Option 1: Resend (Recommended - Free Tier Available)

1. **Sign up for Resend** (free tier includes 3,000 emails/month):
   - Go to https://resend.com
   - Create an account
   - Navigate to API Keys section
   - Create a new API key

2. **Set up environment variables**:
   - Copy `.env.example` to `.env.local`
   - Add your Resend API key:
     ```
     RESEND_API_KEY=re_your_actual_api_key_here
     TO_EMAIL=Mreoch82@hotmail.com
     ```

3. **Verify your domain** (for production):
   - In Resend dashboard, add and verify your domain
   - Update the `from` field in `app/api/submit-order/route.ts` to use your domain

## Option 2: Development Mode (No API Key Needed)

If you don't set `RESEND_API_KEY`, the API will log requests to the console instead of sending emails. This is useful for local development.

## Option 3: Alternative Email Services

You can replace Resend with other services:

### SendGrid
- Free tier: 100 emails/day
- Update the API route to use SendGrid's API

### Nodemailer (SMTP)
- Works with any SMTP server (Gmail, Outlook, etc.)
- Requires SMTP credentials

### EmailJS
- Client-side email service
- Free tier available
- Would require different implementation

## Testing

1. Start your dev server: `npm run dev`
2. Fill out the order form
3. Click "Send Request"
4. Check your email (or console logs if no API key is set)

## Production Deployment

When deploying to Vercel/Netlify:
1. Add environment variables in your hosting platform's dashboard
2. Set `RESEND_API_KEY` and `TO_EMAIL`
3. Deploy - emails will work automatically!

