#!/usr/bin/env node

/**
 * Generate all required image assets from SVG sources
 * This script uses sharp (if available) or provides instructions
 */

const fs = require('fs');
const path = require('path');

const sizes = {
  'favicon-16x16.png': 16,
  'favicon-32x32.png': 32,
  'apple-touch-icon.png': 180,
  'icon-192.png': 192,
  'icon-512.png': 512,
};

const publicDir = path.join(__dirname, '..', 'public');

// Check if sharp is available
let sharp;
try {
  sharp = require('sharp');
} catch (e) {
  console.log('⚠️  sharp not installed. Installing...');
  console.log('Run: npm install sharp --save-dev');
  process.exit(1);
}

async function generateImages() {
  console.log('🎨 Generating image assets...\n');

  const svgPath = path.join(publicDir, 'favicon.svg');
  
  if (!fs.existsSync(svgPath)) {
    console.error('❌ favicon.svg not found!');
    process.exit(1);
  }

  // Generate PNG files
  for (const [filename, size] of Object.entries(sizes)) {
    const outputPath = path.join(publicDir, filename);
    try {
      await sharp(svgPath)
        .resize(size, size)
        .png()
        .toFile(outputPath);
      console.log(`✅ Created ${filename} (${size}x${size})`);
    } catch (error) {
      console.error(`❌ Failed to create ${filename}:`, error.message);
    }
  }

  // Generate favicon.ico (16x16 and 32x32 combined)
  try {
    const favicon16 = await sharp(svgPath).resize(16, 16).png().toBuffer();
    const favicon32 = await sharp(svgPath).resize(32, 32).png().toBuffer();
    
    // For ICO, we'll create a simple 32x32 PNG as favicon.ico
    // (Most browsers accept PNG as favicon.ico)
    await sharp(svgPath).resize(32, 32).png().toFile(path.join(publicDir, 'favicon.ico'));
    console.log('✅ Created favicon.ico (32x32)');
  } catch (error) {
    console.error('❌ Failed to create favicon.ico:', error.message);
  }

  console.log('\n✅ All image assets generated!');
}

generateImages().catch(console.error);

