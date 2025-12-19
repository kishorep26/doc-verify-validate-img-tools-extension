# Extension Testing Guide

## How to Install

1. **Remove old version** (if installed):
   - Go to `chrome://extensions/`
   - Find "Document Verify & Image Tools"
   - Click "Remove"

2. **Load new version**:
   - Go to `chrome://extensions/`
   - Enable "Developer mode" (top right)
   - Click "Load unpacked"
   - Select: `/Users/kishoreprashanth/Developer/Document-Verify-Extension`

3. **Reload extension** after any updates:
   - Click the reload icon on the extension card

## How It Works

### Always-On Side Panel
- **Auto-loads** on every webpage
- **Toggle tab** appears on the right edge (purple gradient tab)
- Click the tab or extension icon to open/close
- **Close button** (×) in the header when open

### Features to Test

#### 1. Aadhar Verification
- Enter: `234567890124` (valid)
- Should show ✓ with green animation
- Enter: `123456789012` (invalid)
- Should show ✗ with red shake animation

#### 2. PAN Validation  
- Enter: `ABCDE1234F` (valid)
- Should show ✓ with holder type
- Enter: `ABC123456` (invalid)
- Should show ✗ error

#### 3. Image Tools

**Upload Test Image**:
- Click "Click to upload image"
- Select any image (< 10MB)
- Image preview should appear

**Resize**:
- Enter width OR height
- Other dimension auto-calculates
- Click "Resize & Download"
- File downloads

**Crop**:
- Select aspect ratio from dropdown
- Preview updates dynamically
- Drag the selection box
- See dimensions update
- Click "Crop & Download"

**Compress**:
- Adjust quality slider (1-100%)
- See estimated size
- Click "Compress & Download"
- File downloads with quality in filename

**Convert**:
- Select format (JPEG/PNG/WebP)
- Click "Convert & Download"
- File downloads in new format

## Known Features

✅ **Working**:
- Always-on collapsible panel
- Toggle tab with icon
- Close button
- All verification features
- Image resize with auto-calculation
- Dynamic crop preview
- Compress with quality control
- Format conversion
- Smooth animations
- Professional UI with Inter font
- New shield icon

## Troubleshooting

**Panel not appearing?**
- Refresh the webpage
- Check console for errors (F12)
- Reload extension

**Downloads not working?**
- Check downloads permission in manifest
- Look in Chrome downloads folder

**Crop preview not updating?**
- Make sure image is uploaded first
- Try different aspect ratios

## UI Features

- Inter font family (modern, clean)
- Smooth cubic-bezier transitions
- Success/error animations
- Hover effects on all interactive elements
- Gradient backgrounds
- Professional color scheme
- 500px wide panel
- Responsive layout
