// Background service worker

chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === 'install') {
        console.log('Document Verify Extension installed!');
    } else if (details.reason === 'update') {
        console.log('Extension updated to version:', chrome.runtime.getManifest().version);
    }
});

// Toggle panel when extension icon is clicked
chrome.action.onClicked.addListener(async (tab) => {
    try {
        await chrome.tabs.sendMessage(tab.id, { action: 'toggle' });
    } catch (error) {
        console.log('Panel toggle error:', error);
    }
});
