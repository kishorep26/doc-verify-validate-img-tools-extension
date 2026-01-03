// Background service worker
console.log('Document Verify & Image Tools: Background script loaded');

chrome.runtime.onInstalled.addListener((details) => {
    console.log('Extension installed/updated:', details.reason);
    if (details.reason === 'install') {
        console.log('Document Verify & Image Tools installed successfully!');
        // Set default preferences if needed
        chrome.storage.local.set({
            preferences: {
                theme: 'light',
                lastUsed: Date.now()
            }
        });
    } else if (details.reason === 'update') {
        console.log('Extension updated to version:', chrome.runtime.getManifest().version);
    }
});

console.log('Background script setup complete');
