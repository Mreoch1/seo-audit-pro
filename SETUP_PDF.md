# Setup Sample Report PDF

To add the sample report PDF to your website:

## Quick Setup

1. **Copy the PDF file to the public folder:**
   ```bash
   cd ~/seo-audit-pro
   cp seo-audit-cmi8af99j00495q5uwds9bkk2.pdf public/sample-report.pdf
   ```

   Or if the PDF is in your home directory:
   ```bash
   cp ~/seo-audit-cmi8af99j00495q5uwds9bkk2.pdf public/sample-report.pdf
   ```

2. **Verify it's there:**
   ```bash
   ls -lh public/sample-report.pdf
   ```

3. **Restart your dev server** (if running):
   ```bash
   npm run dev
   ```

4. **Test it:**
   - Visit `http://localhost:3000/sample-report.pdf` in your browser
   - The PDF should open/download

## What Changed

- **Sample Report section** now has a prominent "View Full Sample Report (PDF)" button
- **Hero section** "View Sample Report" button now links directly to the PDF
- PDF will be accessible at `/sample-report.pdf` on your live site

## File Location

The PDF should be located at:
```
seo-audit-pro/public/sample-report.pdf
```

This file will be served statically by Next.js and accessible to all visitors.

