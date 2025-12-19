# DEBUG GUIDE - Extension Not Opening

## Step 1: Check Extension is Loaded

1. Go to `chrome://extensions/`
2. Find "Document Verify & Image Tools"
3. Make sure it's **ENABLED** (toggle should be blue/on)
4. Note the ID (long string of letters)

## Step 2: Check for Errors

### Check Background Script
1. On extension card, click "service worker" (blue link)
2. Console should show:
   ```
   Document Verify Extension: Background script loaded
   Background script setup complete
   ```
3. If you see errors, copy them

### Check Content Script
1. Go to ANY website (e.g., google.com)
2. Press F12 (open DevTools)
3. Go to Console tab
4. Look for:
   ```
   Document Verify Extension: Content script loaded
   Initializing panel...
   Panel added to DOM
   Content script setup complete
   ```
5. If you see errors, copy them

## Step 3: Test the Extension

### Method 1: Click Extension Icon
1. Click the extension icon in toolbar
2. Check console for:
   ```
   Extension icon clicked on tab: [number]
   Message received: {action: 'toggle'}
   Toggle panel clicked
   ```

### Method 2: Look for Toggle Tab
1. On any webpage, look at the RIGHT edge of the screen
2. You should see a purple gradient tab
3. Click it

## Step 4: Force Reload

1. Go to `chrome://extensions/`
2. Click the **reload icon** (circular arrow) on the extension card
3. **Refresh the webpage** you're testing on (F5 or Cmd+R)
4. Try again

## Step 5: Check Permissions

In `chrome://extensions/`, click "Details" on the extension:
- ✅ "Site access" should be "On all sites"
- ✅ If it says "On click", change it to "On all sites"

## Common Issues

### Issue: "Uncaught TypeError: Cannot read properties of null"
**Fix**: The page loaded before the extension. Refresh the page.

### Issue: No console logs at all
**Fix**: 
1. Content script not loading
2. Check manifest.json has content_scripts
3. Reload extension

### Issue: "Extension context invalidated"
**Fix**: You reloaded the extension. Refresh all open webpages.

### Issue: Toggle tab not visible
**Fix**:
1. Check if panel is already open (look for white panel on right)
2. Try scrolling - tab is at 50% height
3. Check console for errors

## Manual Test

Open Console (F12) and run:
```javascript
// Check if content script loaded
document.getElementById('doc-verify-extension')

// Should return the panel element or null
```

If it returns null, content script didn't load.

## Last Resort

1. **Completely remove extension**:
   - chrome://extensions/
   - Click "Remove"
   
2. **Close ALL Chrome windows**

3. **Reopen Chrome**

4. **Load extension fresh**:
   - chrome://extensions/
   - Developer mode ON
   - Load unpacked
   - Select folder

5. **Go to a simple page** (google.com)

6. **Refresh page** (F5)

7. **Check console** for logs

8. **Click extension icon**

## Report Back

If still not working, send me:
1. Console logs from background script
2. Console logs from webpage
3. Any error messages
4. Chrome version (chrome://version/)
