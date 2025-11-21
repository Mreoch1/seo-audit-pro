#!/bin/bash

# Add Custom Domain to Netlify Site
# This script uses the Netlify API to add seoauditpro.net

echo "🌐 Adding custom domain: seoauditpro.net"
echo ""

# Get site ID
SITE_ID=$(cat .netlify/state.json 2>/dev/null | grep -o '"siteId":"[^"]*"' | cut -d'"' -f4)

if [ -z "$SITE_ID" ]; then
    echo "❌ Site not linked. Run: netlify link"
    exit 1
fi

echo "✅ Site ID: $SITE_ID"
echo ""

# Add domain using Netlify API
echo "📡 Adding domain via Netlify API..."
RESPONSE=$(netlify api createSiteDomain --data "{\"site_id\":\"$SITE_ID\",\"domain\":\"seoauditpro.net\"}" 2>&1)

if echo "$RESPONSE" | grep -q "error\|Error"; then
    echo "⚠️  API method not available or domain already exists"
    echo ""
    echo "✅ Use Netlify Dashboard instead:"
    echo "   1. Go to: https://app.netlify.com/sites/seoauditpro"
    echo "   2. Site settings → Domain management"
    echo "   3. Add custom domain: seoauditpro.net"
    echo "   4. Follow DNS setup instructions"
else
    echo "$RESPONSE"
    echo ""
    echo "✅ Domain added! Now configure DNS:"
    echo "   - Add A record pointing to Netlify IP"
    echo "   - Or add CNAME record to your Netlify URL"
fi

