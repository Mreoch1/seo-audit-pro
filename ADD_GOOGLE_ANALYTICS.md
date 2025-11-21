# How to Add Google Analytics

## Step 1: Create Google Analytics Account

1. Go to: https://analytics.google.com/
2. Click: "Start measuring"
3. Create account: "SEO Audit Pro"
4. Set up property: "SEO Audit Pro Website"
5. Get your **Measurement ID** (format: `G-XXXXXXXXXX`)

## Step 2: Add to Next.js

I'll add the Google Analytics code to your `app/layout.tsx` file.

## Step 3: Add Environment Variable

Add to Netlify environment variables:
- Key: `NEXT_PUBLIC_GA_ID`
- Value: `G-XXXXXXXXXX` (your Measurement ID)

## Step 4: Test

1. Deploy to Netlify
2. Visit your site
3. Check Google Analytics Real-Time reports
4. You should see your visit!

---

**Note**: I can add the code for you once you have the Measurement ID!

