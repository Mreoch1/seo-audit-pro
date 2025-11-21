#!/bin/bash

# Generate Favicons from SVG
# This script helps generate all required favicon sizes

echo "🎨 Favicon Generator Helper"
echo ""
echo "This script will help you generate all required favicon files."
echo ""
echo "📋 Required Files:"
echo "  • favicon.ico (16x16 or 32x32)"
echo "  • favicon-16x16.png (16x16)"
echo "  • favicon-32x32.png (32x32)"
echo "  • apple-touch-icon.png (180x180)"
echo "  • icon-192.png (192x192)"
echo "  • icon-512.png (512x512)"
echo ""
echo "🚀 Easiest Method:"
echo "  1. Go to: https://realfavicongenerator.net/"
echo "  2. Upload: public/favicon.svg"
echo "  3. Configure all platforms"
echo "  4. Download and extract to public/ folder"
echo ""
echo "Or use ImageMagick (if installed):"
if command -v convert &> /dev/null; then
    echo "✅ ImageMagick found!"
    echo ""
    echo "Converting SVG to PNG sizes..."
    convert public/favicon.svg -resize 16x16 public/favicon-16x16.png
    convert public/favicon.svg -resize 32x32 public/favicon-32x32.png
    convert public/favicon.svg -resize 180x180 public/apple-touch-icon.png
    convert public/favicon.svg -resize 192x192 public/icon-192.png
    convert public/favicon.svg -resize 512x512 public/icon-512.png
    echo "✅ PNG files created!"
    echo ""
    echo "Creating favicon.ico..."
    convert public/favicon-16x16.png public/favicon-32x32.png public/favicon.ico
    echo "✅ favicon.ico created!"
else
    echo "❌ ImageMagick not found. Install it or use online tools."
    echo ""
    echo "Install ImageMagick:"
    echo "  macOS: brew install imagemagick"
    echo "  Linux: sudo apt-get install imagemagick"
fi

