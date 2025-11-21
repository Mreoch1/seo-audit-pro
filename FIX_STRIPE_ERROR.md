# Fix "Module not found: Can't resolve 'stripe'" Error

## Quick Fix

Run these commands in your terminal:

```bash
cd /Users/michaelreoch/seo-audit-pro

# Remove node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Clear Next.js cache
rm -rf .next

# Reinstall all dependencies
npm install

# Verify stripe is installed
npm list stripe

# Restart dev server
npm run dev
```

## Alternative: Install Stripe Explicitly

If the above doesn't work:

```bash
cd /Users/michaelreoch/seo-audit-pro
npm install stripe@latest --save
npm install resend@latest --save
npm run dev
```

## Verify Installation

Check if stripe is installed:
```bash
ls node_modules/stripe
```

Should show the stripe package directory.

## If Still Not Working

1. Check `package.json` - should have:
   ```json
   "dependencies": {
     "stripe": "^14.21.0",
     "resend": "^3.2.0"
   }
   ```

2. Delete `.next` folder completely
3. Run `npm install` again
4. Restart dev server

