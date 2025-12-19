// Background service worker for Chrome extension
// Handles extension installation and side panel

chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === 'install') {
        console.log('Extension installed successfully!');
    } else if (details.reason === 'update') {
        console.log('Extension updated to version:', chrome.runtime.getManifest().version);
    }
});

// Open side panel when extension icon is clicked
chrome.action.onClicked.addListener((tab) => {
    chrome.sidePanel.open({ windowId: tab.windowId });
});
