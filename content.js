// Content script - Creates always-on collapsible side panel
let panelState = {
    isOpen: false,
    element: null
};

// Initialize on page load
initializePanel();

function initializePanel() {
    // Create panel HTML
    const panel = document.createElement('div');
    panel.id = 'doc-verify-extension';
    panel.className = 'doc-verify-panel';

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
            <iframe src="${chrome.runtime.getURL('popup.html')}" id="panelFrame"></iframe>
        </div>
    `;

    document.body.appendChild(panel);
    panelState.element = panel;

    // Add event listeners
    document.getElementById('panelToggle').addEventListener('click', togglePanel);
    document.getElementById('closePanel').addEventListener('click', closePanel);

    // Inject styles
    injectStyles();
}

function togglePanel() {
    if (panelState.isOpen) {
        closePanel();
    } else {
        openPanel();
    }
}

function openPanel() {
    panelState.element.classList.add('open');
    panelState.isOpen = true;
}

function closePanel() {
    panelState.element.classList.remove('open');
    panelState.isOpen = false;
}

function injectStyles() {
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
            top: 50%;
            transform: translateY(-50%);
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
            transform: rotate(180deg);
        }
        
        .doc-verify-panel .panel-toggle-tab svg {
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
        
        /* Animation for toggle tab pulse */
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
}

// Listen for messages from background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'toggle') {
        togglePanel();
        sendResponse({ success: true });
    }
    return true;
});
