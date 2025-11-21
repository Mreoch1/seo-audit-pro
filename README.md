# SEO Audit Pro - Marketing Website

A modern, high-converting marketing website for SEO Audit Pro, a service that provides agency-grade SEO audits delivered as PDF reports.

## Features

- **Single-page landing site** with all sections
- **Interactive pricing** with tier selection and add-ons
- **Email-based ordering** via mailto links (no payment processing)
- **Fully responsive** design (mobile-first)
- **Modern UI** with Tailwind CSS
- **TypeScript** for type safety

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- React 18

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
seo-audit-pro/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx             # Main landing page
│   └── globals.css          # Global styles
├── components/
│   ├── Hero.tsx             # Hero section
│   ├── HowItWorks.tsx       # How it works section
│   ├── Features.tsx         # Features section
│   ├── Pricing.tsx          # Pricing tiers and add-ons
│   ├── OrderForm.tsx        # Contact/order form
│   ├── SampleReport.tsx     # Sample report preview
│   ├── FAQ.tsx              # FAQ accordion
│   └── Footer.tsx           # Footer
└── ...
```

## Sections

1. **Hero** - Main headline, CTAs, trust elements
2. **How It Works** - 4-step process
3. **Features** - What's included in audits
4. **Pricing** - Three tiers + add-ons with live price calculation
5. **Order Form** - Email-based ordering (mailto)
6. **Sample Report** - Report preview placeholders
7. **FAQ** - Accordion with common questions
8. **Footer** - Contact info and copyright

## Ordering Flow

Users select a tier and add-ons, fill out the form, and click "Send Request". This opens their email client with a pre-filled message to `Mreoch82@hotmail.com` containing all order details.

## Build for Production

```bash
npm run build
npm start
```

## Deployment

This site can be deployed to:
- Vercel (recommended for Next.js)
- Netlify
- Any static hosting service

Make sure to run `npm run build` before deploying.

