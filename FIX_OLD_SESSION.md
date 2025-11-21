# Fix: Old Payment Session Issue

## The Problem

Your browser is trying to access `localhost:3002/success` but your server is on `localhost:3000`.

This is because the Stripe payment session was created BEFORE you updated the port configuration.

## Why This Happens

When you click "Proceed to Checkout", Stripe creates a session with:
- `success_url`: The URL to redirect to after payment
- `cancel_url`: The URL to redirect to if cancelled

That session was created when your `.env.local` still had port 3002, so Stripe saved:
```
success_url: http://localhost:3002/success?session_id=...
```

Now your server is on 3000, but Stripe is redirecting to the old URL (3002).

## Solution 1: Change URL Manually (Quick)

In your browser address bar, change:
```
localhost:3002/success?session_id=cs_test_a1xsMgUesYCJCzQHe75b1O6zNaJludSftNJzlLeuYE3wHgf9eptQg...
```

To:
```
localhost:3000/success?session_id=cs_test_a1xsMgUesYCJCzQHe75b1O6zNaJludSftNJzlLeuYE3wHgf9eptQg...
```

Just change `3002` to `3000` and press Enter.

## Solution 2: Make a New Payment (Proper)

1. **Go to your site**: http://localhost:3000
2. **Fill out the order form** again
3. **Click "Proceed to Checkout"**
4. **Complete payment** with test card: 4242 4242 4242 4242
5. **This time** it will redirect to port 3000 correctly

## Verify Your Server

Make sure Next.js is running on port 3000:

```bash
# Check what's running on port 3000
lsof -i:3000

# Should show something like:
# node    12345 user   23u  IPv4  ...  TCP *:3000 (LISTEN)
```

If nothing is running on port 3000:
```bash
npm run dev
```

## Summary

- ✅ Stripe CLI: Running on port 3000
- ✅ Environment: Configured for port 3000
- ❌ Old payment session: Still has port 3002 URL
- ✅ New payments: Will use port 3000 correctly

**Just make a new test payment and it will work!**

