#!/bin/bash
# Script to copy the sample report PDF to the public folder

cd "$(dirname "$0")"

# Try different possible locations
if [ -f ~/seo-audit-cmi8af99j00495q5uwds9bkk2.pdf ]; then
    echo "Found PDF in home directory"
    cp ~/seo-audit-cmi8af99j00495q5uwds9bkk2.pdf public/sample-report.pdf
    echo "✓ PDF copied to public/sample-report.pdf"
elif [ -f seo-audit-cmi8af99j00495q5uwds9bkk2.pdf ]; then
    echo "Found PDF in project directory"
    cp seo-audit-cmi8af99j00495q5uwds9bkk2.pdf public/sample-report.pdf
    echo "✓ PDF copied to public/sample-report.pdf"
else
    echo "⚠ PDF file not found in common locations"
    echo ""
    echo "Please copy the PDF manually:"
    echo "  cp [path-to-pdf]/seo-audit-cmi8af99j00495q5uwds9bkk2.pdf public/sample-report.pdf"
    echo ""
    echo "Or find it first:"
    echo "  find ~ -name 'seo-audit-cmi8af99j00495q5uwds9bkk2.pdf' 2>/dev/null"
fi

# Verify
if [ -f public/sample-report.pdf ]; then
    echo ""
    echo "✓ Verification: PDF is now in public/sample-report.pdf"
    ls -lh public/sample-report.pdf
else
    echo ""
    echo "✗ PDF still not found in public folder"
fi

