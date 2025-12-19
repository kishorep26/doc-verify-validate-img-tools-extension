# Document Verify & Image Tools - Chrome Extension

A powerful Chrome extension for verifying Aadhar & PAN cards and processing images with professional tools.

## Features

### 📋 Document Verification
- **Aadhar Card Validation**: Verify 12-digit Aadhar numbers using Verhoeff checksum algorithm
- **PAN Card Validation**: Validate PAN format and identify holder type (Individual, Company, HUF, etc.)
- **Offline Processing**: All verification happens locally in your browser - no data sent to servers

### 🖼️ Image Processing Tools
- **Resize**: Scale images by dimensions or percentage with auto aspect ratio calculation
- **Crop**: Crop to preset aspect ratios (1:1, 4:3, 16:9, 3:2)
- **Compress**: Reduce file size with quality control (1-100%)
- **Convert**: Convert between JPEG, PNG, and WebP formats
- **Client-side Processing**: All image processing happens in your browser

## Installation

### For Development/Testing

1. **Clone or download this repository**
   ```bash
   cd /path/to/Document-Verify-Extension
   ```

2. **Open Chrome and go to Extensions**
   - Navigate to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top-right corner)

3. **Load the extension**
   - Click "Load unpacked"
   - Select the `Document-Verify-Extension` folder
   - The extension will appear in your extensions list

4. **Pin the extension** (optional)
   - Click the puzzle icon in Chrome toolbar
   - Find "Document Verify & Image Tools"
   - Click the pin icon to keep it visible

## Usage

### Aadhar Verification
1. Click the extension icon
2. Go to "Aadhar" tab
3. Enter 12-digit Aadhar number
4. Click "Verify Aadhar"
5. See validation result with formatted number

### PAN Validation
1. Click the extension icon
2. Go to "PAN" tab
3. Enter 10-character PAN number
4. Click "Validate PAN"
5. See validation result with holder type

### Image Processing
1. Click the extension icon
2. Go to "Image Tools" tab
3. Upload an image (max 10MB)
4. Choose a tool: Resize, Crop, Compress, or Convert
5. Adjust settings and click the action button
6. Image will be downloaded automatically

## Publishing to Chrome Web Store

### Prerequisites
1. **Google Developer Account** ($5 one-time fee)
   - Go to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
   - Pay the registration fee

### Preparation Steps

1. **Create a ZIP file**
   ```bash
   cd /path/to/Document-Verify-Extension
   zip -r document-verify-extension.zip . -x "*.git*" -x "*.DS_Store" -x "README.md"
   ```

2. **Prepare Store Listing Assets**
   - **Icon**: 128x128px (already included in `icons/icon128.png`)
   - **Screenshots**: 1280x800px or 640x400px (take 3-5 screenshots of the extension in use)
   - **Promotional Images** (optional):
     - Small tile: 440x280px
     - Marquee: 1400x560px

3. **Write Store Listing Content**
   - **Name**: Document Verify & Image Tools
   - **Summary**: Verify Aadhar & PAN cards and process images offline
   - **Description**: (See below)
   - **Category**: Productivity
   - **Language**: English

### Store Description Template

```
Verify Indian government documents and process images with professional tools - all offline!

✓ DOCUMENT VERIFICATION
• Aadhar Card: Validate 12-digit numbers with Verhoeff checksum
• PAN Card: Verify format and identify holder type
• 100% offline - no data leaves your browser

✓ IMAGE PROCESSING
• Resize: Scale by dimensions or percentage
• Crop: Multiple aspect ratio presets
• Compress: Quality control (1-100%)
• Convert: JPEG, PNG, WebP formats

✓ PRIVACY FIRST
• All processing happens locally
• No data sent to external servers
• No tracking or analytics

Perfect for:
- Verifying document numbers before submission
- Quick image editing without online tools
- Privacy-conscious users
- Offline work environments

Open source and transparent. Your data stays on your device.
```

### Publishing Steps

1. **Go to Chrome Web Store Developer Dashboard**
   - https://chrome.google.com/webstore/devconsole

2. **Click "New Item"**
   - Upload your ZIP file
   - Fill in all required fields

3. **Complete Store Listing**
   - Add description, screenshots, and icons
   - Set pricing (Free)
   - Select category and language

4. **Privacy Practices**
   - Declare that you don't collect user data
   - No remote code
   - Justify permissions:
     - `storage`: Save user preferences
     - `downloads`: Download processed images

5. **Submit for Review**
   - Review can take 1-3 business days
   - You'll receive email when approved

### Review Guidelines Compliance

✅ **Your extension complies with:**
- Single Purpose: Document verification and image processing
- No remote code execution
- Clear privacy policy (no data collection)
- Minimal permissions
- User value: Offline tools for common tasks

## Permissions Explained

- **storage**: Save user preferences and settings
- **downloads**: Download processed images to your computer

## Privacy Policy

This extension does NOT:
- Collect any personal data
- Send data to external servers
- Track user behavior
- Use analytics

All processing happens locally in your browser.

## Technical Details

- **Manifest Version**: 3 (latest Chrome extension standard)
- **Size**: < 1MB
- **Offline**: Works without internet connection
- **Algorithms**: Verhoeff checksum for Aadhar validation

## Support

For issues or questions:
- Create an issue on GitHub
- Email: [your-email@example.com]

## License

MIT License - Free to use and modify

## Version History

### v1.0.0 (Initial Release)
- Aadhar card validation with Verhoeff algorithm
- PAN card format validation
- Image resize, crop, compress, convert tools
- Offline processing
- Clean, professional UI
