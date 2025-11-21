# Quick Start Guide

## Development

1. **Install dependencies** (if not already done):
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Production Build

1. **Build for production**:
   ```bash
   npm run build
   ```

2. **Start production server**:
   ```bash
   npm start
   ```

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import the repository in Vercel
3. Deploy automatically

### Netlify
1. Build command: `npm run build`
2. Publish directory: `.next`
3. Deploy

### Other Platforms
The site is a static Next.js app and can be deployed to any platform that supports Node.js or static hosting.

## Features Implemented

✅ Hero section with CTAs
✅ How It Works (4 steps)
✅ Features breakdown (5 categories)
✅ Interactive pricing with tier selection
✅ Add-ons with dynamic pricing
✅ Order form with email integration (mailto)
✅ Sample report section
✅ FAQ accordion
✅ Footer with contact info
✅ Fully responsive design
✅ TypeScript for type safety
✅ Tailwind CSS styling

## Email Integration

The order form uses `mailto:` links to send order requests to:
- **Email**: Mreoch82@hotmail.com
- **Subject**: SEO Audit Request – {Tier} – {Website URL}
- **Body**: Includes all form data and calculated total price

## Customization

### Colors
Edit `tailwind.config.ts` to change the color scheme:
- Primary colors: Blue palette
- Accent colors: Yellow palette

### Content
All content is in the component files:
- `components/Hero.tsx` - Hero section
- `components/Features.tsx` - Feature descriptions
- `components/Pricing.tsx` - Pricing tiers and add-ons
- `components/FAQ.tsx` - FAQ questions and answers

### Email Address
Change the email in:
- `components/OrderForm.tsx` (line with `mailto:Mreoch82@hotmail.com`)
- `components/Footer.tsx` (contact section)

## Next Steps

1. Add real sample report images to `components/SampleReport.tsx`
2. Customize colors and branding in `tailwind.config.ts`
3. Add analytics (Google Analytics, etc.)
4. Add SEO meta tags in `app/layout.tsx`
5. Test the email flow on different devices/browsers

