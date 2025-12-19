// Background service worker
console.log('Document Verify Extension: Background script loaded');

chrome.runtime.onInstalled.addListener((details) => {
    console.log('Extension installed/updated:', details.reason);
    if (details.reason === 'install') {
        console.log('Document Verify Extension installed successfully!');
    } else if (details.reason === 'update') {
        console.log('Extension updated to version:', chrome.runtime.getManifest().version);
    }
});

// Toggle panel when extension icon is clicked
chrome.action.onClicked.addListener(async (tab) => {
    console.log('Extension icon clicked on tab:', tab.id);
    try {
        const response = await chrome.tabs.sendMessage(tab.id, { action: 'toggle' });
        console.log('Toggle message sent, response:', response);
    } catch (error) {
        console.error('Error toggling panel:', error);
        console.log('This might mean the content script hasn\'t loaded yet. Try refreshing the page.');
    }
});

console.log('Background script setup complete');
