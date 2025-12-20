# Document Verify & Image Tools

A Chrome extension for verifying Aadhar and PAN cards and processing images with professional tools.

## Features

### Document Verification
- **Aadhar Card Validation**: Verify 12-digit Aadhar numbers using Verhoeff checksum algorithm
- **PAN Card Validation**: Validate PAN format and identify holder type (Individual, Company, HUF, etc.)
- **Offline Processing**: All verification happens locally in your browser

### Image Processing Tools
- **Resize**: Scale images by dimensions or percentage with automatic aspect ratio calculation
- **Crop**: Crop to preset aspect ratios (1:1, 4:3, 16:9, 3:2)
- **Compress**: Reduce file size with quality control (1-100%)
- **Convert**: Convert between JPEG, PNG, and WebP formats
- **Client-side Processing**: All image processing happens in your browser

## Usage

### Aadhar Verification
1. Click the extension icon in your Chrome toolbar
2. Navigate to the "Aadhar" tab
3. Enter the 12-digit Aadhar number
4. Click "Verify Aadhar"
5. View the validation result with formatted number

### PAN Validation
1. Click the extension icon in your Chrome toolbar
2. Navigate to the "PAN" tab
3. Enter the 10-character PAN number
4. Click "Validate PAN"
5. View the validation result with holder type information

### Image Processing
1. Click the extension icon in your Chrome toolbar
2. Navigate to the "Image Tools" tab
3. Upload an image (maximum 10MB)
4. Select a tool: Resize, Crop, Compress, or Convert
5. Adjust the settings as needed
6. Click the action button to process
7. The processed image will download automatically

## Privacy

This extension does not:
- Collect any personal data
- Send data to external servers
- Track user behavior
- Use analytics

All processing happens locally in your browser.

## Permissions

- **storage**: Save user preferences and settings
- **downloads**: Download processed images to your device

## Technical Information

- **Manifest Version**: 3
- **Size**: Less than 1MB
- **Offline Capable**: Works without internet connection
- **Algorithms**: Verhoeff checksum for Aadhar validation

## License

MIT License
