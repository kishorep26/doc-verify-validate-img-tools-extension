// Content script - Creates always-on collapsible side panel
console.log('Document Verify Extension: Content script loaded');

let panelState = {
    isOpen: false,
    element: null
};

// Wait for page to be fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePanel);
} else {
    initializePanel();
}

function initializePanel() {
    console.log('Initializing panel...');

    try {
        // Check if panel already exists
        if (document.getElementById('doc-verify-extension')) {
            console.log('Panel already exists');
            return;
        }

        // Create panel HTML
        const panel = document.createElement('div');
        panel.id = 'doc-verify-extension';
        panel.className = 'doc-verify-panel';

        const extensionURL = chrome.runtime.getURL('popup.html');
        console.log('Extension URL:', extensionURL);

        panel.innerHTML = `
            <div class="panel-toggle-tab" id="panelToggle">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 18l6-6-6-6"/>
                </svg>
            </div>
            <div class="panel-content">
                <div class="panel-header">
                    <h2>Document Verify & Image Tools</h2>
                    <button class="close-btn" id="closePanel">×</button>
                </div>
                <iframe src="${extensionURL}" id="panelFrame"></iframe>
            </div>
        `;

        document.body.appendChild(panel);
        panelState.element = panel;
        console.log('Panel added to DOM');

        // Add event listeners
        const toggleBtn = document.getElementById('panelToggle');
        const closeBtn = document.getElementById('closePanel');

        if (toggleBtn) {
            toggleBtn.addEventListener('click', togglePanel);
            console.log('Toggle button listener added');
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', closePanel);
            console.log('Close button listener added');
        }

        // Inject styles
        injectStyles();
        console.log('Panel initialized successfully');

    } catch (error) {
        console.error('Error initializing panel:', error);
    }
}

function togglePanel() {
    console.log('Toggle panel clicked');
    if (panelState.isOpen) {
        closePanel();
    } else {
        openPanel();
    }
}

function openPanel() {
    console.log('Opening panel');
    if (panelState.element) {
        panelState.element.classList.add('open');
        panelState.isOpen = true;
    }
}

function closePanel() {
    console.log('Closing panel completely');
    if (panelState.element) {
        panelState.element.remove();
        panelState.element = null;
        panelState.isOpen = false;
    }
}

function injectStyles() {
    // Check if styles already injected
    if (document.getElementById('doc-verify-styles')) {
        return;
    }

    const style = document.createElement('style');
    style.id = 'doc-verify-styles';
    style.textContent = `
        .doc-verify-panel {
            position: fixed;
            top: 0;
            right: -500px;
            width: 500px;
            height: 100vh;
            z-index: 2147483647;
            transition: right 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
        
        .doc-verify-panel.open {
            right: 0;
        }
        
        .doc-verify-panel .panel-toggle-tab {
            position: absolute;
            left: -50px;
            top: 100px;
            width: 50px;
            height: 80px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 12px 0 0 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: -4px 0 12px rgba(0,0,0,0.15);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            color: white;
        }
        
        .doc-verify-panel .panel-toggle-tab:hover {
            left: -48px;
            box-shadow: -6px 0 16px rgba(102,126,234,0.3);
        }
        
        .doc-verify-panel.open .panel-toggle-tab svg {
            transform: rotate(0deg);
        }
        
        .doc-verify-panel .panel-toggle-tab svg {
            transform: rotate(180deg);
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .doc-verify-panel .panel-content {
            width: 100%;
            height: 100%;
            background: white;
            box-shadow: -4px 0 20px rgba(0,0,0,0.15);
            display: flex;
            flex-direction: column;
        }
        
        .doc-verify-panel .panel-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        
        .doc-verify-panel .panel-header h2 {
            font-size: 18px;
            font-weight: 600;
            margin: 0;
        }
        
        .doc-verify-panel .close-btn {
            background: rgba(255,255,255,0.2);
            border: none;
            color: white;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            cursor: pointer;
            font-size: 28px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            line-height: 1;
            padding: 0;
        }
        
        .doc-verify-panel .close-btn:hover {
            background: rgba(255,255,255,0.3);
            transform: rotate(90deg);
        }
        
        .doc-verify-panel iframe {
            flex: 1;
            width: 100%;
            border: none;
            background: #f8f9fa;
        }
        
        @keyframes pulse {
            0%, 100% {
                box-shadow: -4px 0 12px rgba(0,0,0,0.15);
            }
            50% {
                box-shadow: -4px 0 20px rgba(102,126,234,0.4);
            }
        }
        
        .doc-verify-panel:not(.open) .panel-toggle-tab {
            animation: pulse 2s ease-in-out infinite;
        }
    `;
    document.head.appendChild(style);
    console.log('Styles injected');
}

// Listen for messages from background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('Message received:', request);
    if (request.action === 'toggle') {
        togglePanel();
        sendResponse({ success: true });
    }
    return true;
});

console.log('Content script setup complete');
