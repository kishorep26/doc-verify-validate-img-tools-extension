// Content script - Injects side panel into every page
let sidePanelOpen = false;
let sidePanelElement = null;

// Listen for messages from background
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'togglePanel') {
        toggleSidePanel();
    }
});

function toggleSidePanel() {
    if (sidePanelOpen) {
        closeSidePanel();
    } else {
        openSidePanel();
    }
}

function openSidePanel() {
    if (sidePanelElement) {
        sidePanelElement.classList.add('open');
        sidePanelOpen = true;
        return;
    }

    // Create side panel
    sidePanelElement = document.createElement('div');
    sidePanelElement.id = 'doc-verify-sidepanel';
    sidePanelElement.className = 'doc-verify-panel open';

    sidePanelElement.innerHTML = `
        <div class="panel-header">
            <h2>Document Verify & Image Tools</h2>
            <button class="close-btn" id="closePanelBtn">✕</button>
        </div>
        <iframe src="${chrome.runtime.getURL('panel.html')}" frameborder="0"></iframe>
    `;

    document.body.appendChild(sidePanelElement);

    // Add close button listener
    document.getElementById('closePanelBtn').addEventListener('click', closeSidePanel);

    sidePanelOpen = true;
}

function closeSidePanel() {
    if (sidePanelElement) {
        sidePanelElement.classList.remove('open');
        sidePanelOpen = false;
    }
}

// Inject styles
const style = document.createElement('style');
style.textContent = `
    .doc-verify-panel {
        position: fixed;
        top: 0;
        right: -420px;
        width: 420px;
        height: 100vh;
        background: white;
        box-shadow: -4px 0 20px rgba(0,0,0,0.15);
        z-index: 2147483647;
        transition: right 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        display: flex;
        flex-direction: column;
    }
    
    .doc-verify-panel.open {
        right: 0;
    }
    
    .doc-verify-panel .panel-header {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 16px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    
    .doc-verify-panel .panel-header h2 {
        font-size: 16px;
        font-weight: 600;
        margin: 0;
    }
    
    .doc-verify-panel .close-btn {
        background: rgba(255,255,255,0.2);
        border: none;
        color: white;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s;
    }
    
    .doc-verify-panel .close-btn:hover {
        background: rgba(255,255,255,0.3);
        transform: rotate(90deg);
    }
    
    .doc-verify-panel iframe {
        flex: 1;
        width: 100%;
        border: none;
    }
`;
document.head.appendChild(style);
