// Background service worker for Chrome extension
// Handles extension installation and updates

chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === 'install') {
        console.log('Extension installed successfully!');
        // Open welcome page or show notification
        chrome.tabs.create({
            url: 'popup.html'
        });
    } else if (details.reason === 'update') {
        console.log('Extension updated to version:', chrome.runtime.getManifest().version);
    }
});

// Handle extension icon click
chrome.action.onClicked.addListener((tab) => {
    // This will open the popup automatically
    // No additional code needed as popup is defined in manifest
});
