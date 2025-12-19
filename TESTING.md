# Testing Guide

## Quick Test Checklist

### 1. Load Extension in Chrome
- [ ] Open `chrome://extensions/`
- [ ] Enable "Developer mode"
- [ ] Click "Load unpacked"
- [ ] Select the `Document-Verify-Extension` folder
- [ ] Extension loads without errors

### 2. Test Aadhar Verification
- [ ] Click extension icon
- [ ] Navigate to "Aadhar" tab
- [ ] Test valid number: `234567890124` (should pass)
- [ ] Test invalid number: `123456789012` (should fail - starts with 1)
- [ ] Test invalid checksum: `234567890123` (should fail - wrong checksum)
- [ ] Auto-formatting works (adds spaces)

### 3. Test PAN Validation
- [ ] Navigate to "PAN" tab
- [ ] Test valid PAN: `ABCDE1234F` (Individual)
- [ ] Test valid PAN: `ABCDC1234F` (Company)
- [ ] Test invalid format: `ABC123456` (should fail)
- [ ] Test invalid type: `ABCDK1234F` (should fail - K is invalid)
- [ ] Auto-uppercase works

### 4. Test Image Tools

#### Resize
- [ ] Upload a test image (< 10MB)
- [ ] Image preview appears
- [ ] Click "Resize"
- [ ] Enter width only - height auto-calculates
- [ ] Enter height only - width auto-calculates
- [ ] Click "Resize & Download"
- [ ] File downloads successfully

#### Crop
- [ ] Upload image
- [ ] Click "Crop"
- [ ] Select aspect ratio (1:1, 4:3, etc.)
- [ ] Click "Crop & Download"
- [ ] Cropped image downloads

#### Compress
- [ ] Upload image
- [ ] Click "Compress"
- [ ] Adjust quality slider
- [ ] Click "Compress & Download"
- [ ] Compressed image downloads

#### Convert
- [ ] Upload image
- [ ] Click "Convert"
- [ ] Select format (JPEG, PNG, WebP)
- [ ] Click "Convert & Download"
- [ ] Converted image downloads

### 5. UI/UX Tests
- [ ] All tabs switch correctly
- [ ] Feature cards on home navigate to correct tabs
- [ ] Buttons are clickable and responsive
- [ ] Results display correctly (success/error)
- [ ] Extension popup size is appropriate (400x500px)
- [ ] No console errors

### 6. Edge Cases
- [ ] Upload file > 10MB (should show alert)
- [ ] Empty inputs show appropriate errors
- [ ] Multiple operations in sequence work
- [ ] Extension works offline

## Test Data

### Valid Aadhar Numbers
- `234567890124`
- `987654321098`

### Invalid Aadhar Numbers
- `123456789012` (starts with 1)
- `234567890123` (wrong checksum)
- `12345` (too short)

### Valid PAN Numbers
- `ABCDE1234F` (Individual)
- `ABCDC1234F` (Company)
- `ABCDH1234F` (HUF)
- `ABCDF1234F` (Firm)

### Invalid PAN Numbers
- `ABC123456` (wrong format)
- `ABCDK1234F` (invalid type)
- `abcde1234f` (lowercase - should auto-convert)

## Browser Compatibility
- [ ] Chrome (latest)
- [ ] Edge (Chromium-based)
- [ ] Brave
- [ ] Opera

## Performance Tests
- [ ] Extension loads in < 1 second
- [ ] Image processing completes in reasonable time
- [ ] No memory leaks after multiple operations
- [ ] Popup remains responsive

## Before Publishing
- [ ] All tests pass
- [ ] No console errors or warnings
- [ ] Icons display correctly in all sizes
- [ ] README is complete
- [ ] Privacy policy is accurate
- [ ] Manifest version is correct
- [ ] Screenshots prepared for store listing

## Known Limitations
- Maximum image size: 10MB
- Supported formats: JPG, PNG, WEBP
- Requires Chrome 88+ (Manifest V3)
