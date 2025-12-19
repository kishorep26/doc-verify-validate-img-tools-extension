// Background service worker for Chrome extension

chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === 'install') {
        console.log('Extension installed successfully!');
    } else if (details.reason === 'update') {
        console.log('Extension updated to version:', chrome.runtime.getManifest().version);
    }
});

// Handle extension icon click - toggle side panel
chrome.action.onClicked.addListener(async (tab) => {
    // Send message to content script to toggle panel
    try {
        await chrome.tabs.sendMessage(tab.id, { action: 'togglePanel' });
    } catch (error) {
        console.log('Could not inject panel:', error);
    }
});
