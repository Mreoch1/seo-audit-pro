# Fix: 404 Error for Sample Report PDF

The PDF file is missing from the `public` folder. Here's how to fix it:

## Quick Fix

1. **Find the PDF file:**
   ```bash
   find ~ -name "seo-audit-cmi8af99j00495q5uwds9bkk2.pdf" 2>/dev/null
   ```

2. **Copy it to the public folder:**
   ```bash
   cd ~/seo-audit-pro
   cp [path-from-step-1] public/sample-report.pdf
   ```

   For example, if it's in your home directory:
   ```bash
   cp ~/seo-audit-cmi8af99j00495q5uwds9bkk2.pdf public/sample-report.pdf
   ```

3. **Verify it's there:**
   ```bash
   ls -lh public/sample-report.pdf
   ```

4. **Restart your dev server:**
   ```bash
   npm run dev
   ```

5. **Test it:**
   - Visit `http://localhost:3000/sample-report.pdf`
   - It should open/download the PDF

## Alternative: Use the Helper Script

Run the helper script:
```bash
cd ~/seo-audit-pro
chmod +x COPY_PDF.sh
./COPY_PDF.sh
```

This will automatically find and copy the PDF if it's in common locations.

## File Location

The PDF must be at:
```
seo-audit-pro/public/sample-report.pdf
```

Files in the `public` folder are served statically by Next.js at the root URL path.

