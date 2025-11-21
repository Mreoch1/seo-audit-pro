# Stripe Test Cards

## ✅ Success Test Cards

Use these cards to test successful payments:

### Card 1: Basic Success
- **Card Number**: `4242 4242 4242 4242`
- **Expiry**: Any future date (e.g., `12/25`)
- **CVC**: Any 3 digits (e.g., `123`)
- **ZIP**: Any 5 digits (e.g., `12345`)

### Card 2: Visa (Success)
- **Card Number**: `4242 4242 4242 4242`
- **Expiry**: `12/34`
- **CVC**: `123`
- **ZIP**: `12345`

### Card 3: Mastercard (Success)
- **Card Number**: `5555 5555 5555 4444`
- **Expiry**: Any future date
- **CVC**: Any 3 digits
- **ZIP**: Any 5 digits

## ❌ Decline Test Cards

Use these to test failed payments:

### Card 1: Generic Decline
- **Card Number**: `4000 0000 0000 0002`
- **Expiry**: Any future date
- **CVC**: Any 3 digits
- **ZIP**: Any 5 digits
- **Result**: Card declined

### Card 2: Insufficient Funds
- **Card Number**: `4000 0000 0000 9995`
- **Expiry**: Any future date
- **CVC**: Any 3 digits
- **ZIP**: Any 5 digits
- **Result**: Insufficient funds

## 🔐 3D Secure Test Cards

Use these to test 3D Secure authentication:

### Card 1: 3D Secure Required (Success)
- **Card Number**: `4000 0025 0000 3155`
- **Expiry**: Any future date
- **CVC**: Any 3 digits
- **ZIP**: Any 5 digits
- **Result**: Will prompt for 3D Secure, then succeed

### Card 2: 3D Secure Required (Decline)
- **Card Number**: `4000 0027 6000 3184`
- **Expiry**: Any future date
- **CVC**: Any 3 digits
- **ZIP**: Any 5 digits
- **Result**: Will prompt for 3D Secure, then decline

## 📝 Quick Reference

**Most Common Test Card (Success):**
```
Card: 4242 4242 4242 4242
Expiry: 12/25
CVC: 123
ZIP: 12345
```

## ⚠️ Important Notes

1. **Test Mode Only**: These cards only work in Stripe test mode
2. **No Real Charges**: No actual money is charged
3. **Any Expiry**: Use any future date (month/year)
4. **Any CVC**: Use any 3-digit number
5. **Any ZIP**: Use any 5-digit number (or postal code)

## 🔍 Verify You're in Test Mode

- Check your Stripe Dashboard: https://dashboard.stripe.com/test
- Look for "Test mode" toggle in the top right
- Your API keys should start with `pk_test_` and `sk_test_`

## 🚀 Testing Your Checkout

1. Fill out the order form on your website
2. Click "Proceed to Checkout"
3. Use test card: `4242 4242 4242 4242`
4. Complete payment
5. Check your email for order notification
6. Check Stripe Dashboard for the payment record

