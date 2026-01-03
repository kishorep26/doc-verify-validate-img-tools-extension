#!/bin/bash

# Package Chrome Extension for Web Store Submission
# This script creates a clean ZIP file with only necessary files

echo "🎯 Packaging Document Verify & Image Tools Extension..."

# Define the output filename
OUTPUT="document-verify-extension-v1.0.1.zip"

# Remove old package if it exists
if [ -f "$OUTPUT" ]; then
    echo "📦 Removing old package..."
    rm "$OUTPUT"
fi

# Create the package with only necessary files
echo "📦 Creating new package..."
zip -r "$OUTPUT" \
    manifest.json \
    background.js \
    popup.html \
    popup.js \
    styles.css \
    icons/icon16.png \
    icons/icon48.png \
    icons/icon128.png \
    -x "*.DS_Store" \
    -x "__MACOSX/*"

# Check if successful
if [ -f "$OUTPUT" ]; then
    echo "✅ Package created successfully: $OUTPUT"
    echo "📊 Package size:"
    ls -lh "$OUTPUT" | awk '{print $5}'
    echo ""
    echo "📋 Package contents:"
    unzip -l "$OUTPUT"
    echo ""
    echo "🚀 Next steps:"
    echo "1. Update your email in PRIVACY_POLICY.md"
    echo "2. Push changes to GitHub"
    echo "3. Enable GitHub Pages for privacy policy"
    echo "4. Upload $OUTPUT to Chrome Web Store"
    echo "5. Add privacy policy URL to your listing"
else
    echo "❌ Error creating package"
    exit 1
fi
