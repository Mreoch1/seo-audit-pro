// Quick script to copy the PDF with the correct name
const fs = require('fs');
const path = require('path');

const sourceFile = path.join(__dirname, 'public', 'seo-audit-cmi8af99j00495q5uwds9bkk2.pdf');
const targetFile = path.join(__dirname, 'public', 'sample-report.pdf');

if (fs.existsSync(sourceFile)) {
  fs.copyFileSync(sourceFile, targetFile);
  console.log('✓ PDF copied to public/sample-report.pdf');
  console.log('✓ File size:', fs.statSync(targetFile).size, 'bytes');
} else {
  console.log('✗ Source file not found:', sourceFile);
}

