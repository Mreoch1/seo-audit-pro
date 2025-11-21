# Public Folder

This folder contains static assets served by Next.js.

## Sample Report PDF

To add the sample report PDF:

1. Place your PDF file in this folder (`public/`)
2. Name it exactly: `sample-report.pdf`
3. The file will be accessible at: `http://localhost:3000/sample-report.pdf`

### Quick Setup

If you have the PDF file `seo-audit-cmi8af99j00495q5uwds9bkk2.pdf` somewhere on your computer:

```bash
# Find the file (replace ~/Downloads with your actual location)
find ~ -name "seo-audit-cmi8af99j00495q5uwds9bkk2.pdf" 2>/dev/null

# Copy it to this folder
cp /path/to/seo-audit-cmi8af99j00495q5uwds9bkk2.pdf public/sample-report.pdf
```

### Alternative: Use a Different Filename

If you want to use a different filename, update the download link in:
- `app/sample-report/page.tsx` (line 82)
- `components/SampleReport.tsx` (if there are any direct links)
