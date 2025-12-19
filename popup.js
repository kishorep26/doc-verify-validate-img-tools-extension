// Tab Navigation
document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        const targetTab = tab.dataset.tab;

        // Update active tab
        document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Update active content
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        document.getElementById(`${targetTab}-tab`).classList.add('active');
    });
});

// Feature card navigation
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('click', () => {
        const target = card.dataset.navigate;
        document.querySelector(`[data-tab="${target}"]`).click();
    });
});

// Aadhar Verification
document.getElementById('verifyAadhar').addEventListener('click', () => {
    const number = document.getElementById('aadharNumber').value.trim().replace(/\s/g, '');
    const resultDiv = document.getElementById('aadharResult');

    if (!number) {
        showResult(resultDiv, 'Please enter an Aadhar number!', 'error');
        return;
    }

    if (number.length !== 12 || !number.match(/^\d+$/)) {
        showResult(resultDiv, 'Aadhar number must be exactly 12 digits!', 'error');
        return;
    }

    if (number[0] === '0' || number[0] === '1') {
        showResult(resultDiv, 'Aadhar number cannot start with 0 or 1!', 'error');
        return;
    }

    // Verhoeff validation
    if (!verhoeffValidate(number)) {
        showResult(resultDiv, 'Invalid Aadhar number (checksum failed)!', 'error');
        return;
    }

    const formatted = `${number.slice(0, 4)} ${number.slice(4, 8)} ${number.slice(8, 12)}`;
    showResult(resultDiv, `✓ Valid Aadhar Number: ${formatted}`, 'success');
});

// PAN Verification
document.getElementById('verifyPAN').addEventListener('click', () => {
    const number = document.getElementById('panNumber').value.trim().toUpperCase();
    const resultDiv = document.getElementById('panResult');

    if (!number) {
        showResult(resultDiv, 'Please enter a PAN number!', 'error');
        return;
    }

    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

    if (!panRegex.test(number)) {
        showResult(resultDiv, 'Invalid PAN format! Should be: ABCDE1234F', 'error');
        return;
    }

    // Validate structure
    const validTypes = ['P', 'C', 'H', 'F', 'A', 'T', 'B', 'L', 'J', 'G'];
    if (!validTypes.includes(number[3])) {
        showResult(resultDiv, 'Invalid PAN holder type!', 'error');
        return;
    }

    const holderTypes = {
        'P': 'Individual',
        'C': 'Company',
        'H': 'HUF',
        'F': 'Firm',
        'A': 'AOP',
        'T': 'Trust',
        'B': 'BOI',
        'L': 'Local Authority',
        'J': 'Artificial Juridical Person',
        'G': 'Government'
    };

    showResult(resultDiv, `✓ Valid PAN: ${number}<br>Holder Type: ${holderTypes[number[3]]}`, 'success');
});

// Auto-format Aadhar input
document.getElementById('aadharNumber').addEventListener('input', (e) => {
    let value = e.target.value.replace(/\s/g, '');
    if (value.length > 0) {
        value = value.match(/.{1,4}/g).join(' ');
    }
    e.target.value = value;
});

// Auto-uppercase PAN input
document.getElementById('panNumber').addEventListener('input', (e) => {
    e.target.value = e.target.value.toUpperCase();
});

// Image Upload
let currentImage = null;
let originalWidth = 0;
let originalHeight = 0;
let currentImageData = null;

document.getElementById('uploadArea').addEventListener('click', () => {
    document.getElementById('imageInput').click();
});

document.getElementById('imageInput').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB');
        return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
            currentImage = img;
            currentImageData = event.target.result;
            originalWidth = img.width;
            originalHeight = img.height;

            document.getElementById('previewImg').src = event.target.result;
            document.getElementById('imagePreview').style.display = 'block';
            document.getElementById('toolButtons').style.display = 'grid';

            const info = `
                <strong>Image Info:</strong><br>
                Size: ${originalWidth} × ${originalHeight}px<br>
                File: ${(file.size / 1024).toFixed(2)} KB
            `;
            document.getElementById('imageInfo').innerHTML = info;
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(file);
});

// Image Tool Buttons
document.getElementById('resizeBtn').addEventListener('click', () => showResizeOptions());
document.getElementById('cropBtn').addEventListener('click', () => showCropOptions());
document.getElementById('compressBtn').addEventListener('click', () => showCompressOptions());
document.getElementById('convertBtn').addEventListener('click', () => showConvertOptions());

function showResizeOptions() {
    const optionsDiv = document.getElementById('imageToolOptions');
    optionsDiv.innerHTML = `
        <h3>Resize Image</h3>
        <div class="form-group">
            <label>Width (px)</label>
            <input type="number" id="resizeWidth" placeholder="Auto">
        </div>
        <div class="form-group">
            <label>Height (px)</label>
            <input type="number" id="resizeHeight" placeholder="Auto">
        </div>
        <button class="btn btn-primary" id="applyResize">Resize & Download</button>
    `;
    optionsDiv.style.display = 'block';

    // Auto-calculate dimensions
    document.getElementById('resizeWidth').addEventListener('input', (e) => {
        if (e.target.value && originalWidth && originalHeight) {
            const newWidth = parseInt(e.target.value);
            const newHeight = Math.round(newWidth * (originalHeight / originalWidth));
            document.getElementById('resizeHeight').value = newHeight;
        }
    });

    document.getElementById('resizeHeight').addEventListener('input', (e) => {
        if (e.target.value && originalWidth && originalHeight) {
            const newHeight = parseInt(e.target.value);
            const newWidth = Math.round(newHeight * (originalWidth / originalHeight));
            document.getElementById('resizeWidth').value = newWidth;
        }
    });

    document.getElementById('applyResize').addEventListener('click', () => {
        let width = parseInt(document.getElementById('resizeWidth').value);
        let height = parseInt(document.getElementById('resizeHeight').value);

        if (!width && !height) {
            alert('Please enter width or height');
            return;
        }

        if (!width) width = Math.round(height * (originalWidth / originalHeight));
        if (!height) height = Math.round(width * (originalHeight / originalWidth));

        resizeImage(width, height);
    });
}

// Crop with interactive preview
let cropSelection = null;

function showCropOptions() {
    const optionsDiv = document.getElementById('imageToolOptions');
    optionsDiv.innerHTML = `
        <h3>Crop Image</h3>
        <div class="form-group">
            <label>Aspect Ratio</label>
            <select id="cropRatio">
                <option value="free">Free (drag to select)</option>
                <option value="1:1">Square (1:1)</option>
                <option value="4:3">Standard (4:3)</option>
                <option value="16:9">Widescreen (16:9)</option>
                <option value="3:2">Photo (3:2)</option>
            </select>
        </div>
        <div id="cropPreviewContainer"></div>
        <button class="btn btn-primary" id="applyCrop">Crop & Download</button>
    `;
    optionsDiv.style.display = 'block';

    // Initialize crop preview
    initCropPreview();

    document.getElementById('cropRatio').addEventListener('change', () => {
        initCropPreview();
    });

    document.getElementById('applyCrop').addEventListener('click', () => {
        if (!cropSelection) {
            alert('Please select a crop area');
            return;
        }
        cropImageWithSelection();
    });
}

function initCropPreview() {
    const container = document.getElementById('cropPreviewContainer');
    const ratio = document.getElementById('cropRatio').value;

    // Calculate display size (max 300px width)
    const maxWidth = 300;
    const scale = Math.min(1, maxWidth / originalWidth);
    const displayWidth = originalWidth * scale;
    const displayHeight = originalHeight * scale;

    container.innerHTML = `
        <div class="crop-preview-container" style="width: ${displayWidth}px; height: ${displayHeight}px; position: relative; margin: 15px auto;">
            <img src="${currentImageData}" class="crop-preview-image" style="width: 100%; height: 100%; display: block;">
            <div class="crop-selection" id="cropSelection" style="left: 10%; top: 10%; width: 80%; height: 80%;">
                <div class="crop-dimensions" id="cropDimensions"></div>
            </div>
        </div>
    `;

    const selection = document.getElementById('cropSelection');
    makeDraggable(selection, scale);
    updateCropDimensions();
}

function makeDraggable(element, scale) {
    let isDragging = false;
    let startX, startY, startLeft, startTop;

    element.addEventListener('mousedown', (e) => {
        if (e.target === element) {
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            startLeft = element.offsetLeft;
            startTop = element.offsetTop;
            e.preventDefault();
        }
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            const newLeft = Math.max(0, Math.min(startLeft + dx, element.parentElement.offsetWidth - element.offsetWidth));
            const newTop = Math.max(0, Math.min(startTop + dy, element.parentElement.offsetHeight - element.offsetHeight));
            element.style.left = newLeft + 'px';
            element.style.top = newTop + 'px';
            updateCropDimensions();
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
}

function updateCropDimensions() {
    const selection = document.getElementById('cropSelection');
    if (!selection) return;

    const container = selection.parentElement;
    const scale = originalWidth / container.offsetWidth;

    const x = Math.round(selection.offsetLeft * scale);
    const y = Math.round(selection.offsetTop * scale);
    const width = Math.round(selection.offsetWidth * scale);
    const height = Math.round(selection.offsetHeight * scale);

    cropSelection = { x, y, width, height };

    const dims = document.getElementById('cropDimensions');
    if (dims) {
        dims.textContent = `${width} × ${height}px`;
    }
}

function cropImageWithSelection() {
    if (!cropSelection) return;

    const canvas = document.createElement('canvas');
    canvas.width = cropSelection.width;
    canvas.height = cropSelection.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
        currentImage,
        cropSelection.x, cropSelection.y, cropSelection.width, cropSelection.height,
        0, 0, cropSelection.width, cropSelection.height
    );

    canvas.toBlob((blob) => {
        downloadBlob(blob, `cropped_${cropSelection.width}x${cropSelection.height}.jpg`);
    }, 'image/jpeg', 0.95);
}

function showCompressOptions() {
    const optionsDiv = document.getElementById('imageToolOptions');
    optionsDiv.innerHTML = `
        <h3>Compress Image</h3>
        <div class="form-group">
            <label>Quality: <span id="qualityValue">80</span>%</label>
            <input type="range" id="qualitySlider" min="1" max="100" value="80" class="form-group input" style="width: 100%; padding: 0;">
        </div>
        <div id="compressPreview" style="font-size: 12px; color: #666; margin: 10px 0;"></div>
        <button class="btn btn-primary" id="applyCompress">Compress & Download</button>
    `;
    optionsDiv.style.display = 'block';

    document.getElementById('qualitySlider').addEventListener('input', (e) => {
        const quality = e.target.value;
        document.getElementById('qualityValue').textContent = quality;

        // Show estimated size
        const estimatedSize = Math.round((originalWidth * originalHeight * quality) / 10000);
        document.getElementById('compressPreview').textContent = `Estimated size: ~${estimatedSize}KB`;
    });

    // Trigger initial preview
    document.getElementById('qualitySlider').dispatchEvent(new Event('input'));

    document.getElementById('applyCompress').addEventListener('click', () => {
        const quality = parseInt(document.getElementById('qualitySlider').value) / 100;
        compressImage(quality);
    });
}

function showConvertOptions() {
    const optionsDiv = document.getElementById('imageToolOptions');
    optionsDiv.innerHTML = `
        <h3>Convert Format</h3>
        <div class="form-group">
            <label>Convert To</label>
            <select id="convertFormat">
                <option value="jpeg">JPEG</option>
                <option value="png">PNG</option>
                <option value="webp">WebP</option>
            </select>
        </div>
        <button class="btn btn-primary" id="applyConvert">Convert & Download</button>
    `;
    optionsDiv.style.display = 'block';

    document.getElementById('applyConvert').addEventListener('click', () => {
        const format = document.getElementById('convertFormat').value;
        convertImage(format);
    });
}

// Image Processing Functions
function resizeImage(width, height) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(currentImage, 0, 0, width, height);

    canvas.toBlob((blob) => {
        if (blob) {
            downloadBlob(blob, `resized_${width}x${height}.jpg`);
        }
    }, 'image/jpeg', 0.95);
}

function compressImage(quality) {
    const canvas = document.createElement('canvas');
    canvas.width = originalWidth;
    canvas.height = originalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(currentImage, 0, 0);

    canvas.toBlob((blob) => {
        if (blob) {
            const sizeMB = (blob.size / 1024 / 1024).toFixed(2);
            console.log(`Compressed to ${sizeMB}MB at ${Math.round(quality * 100)}% quality`);
            downloadBlob(blob, `compressed_q${Math.round(quality * 100)}.jpg`);
        } else {
            alert('Compression failed. Try a different quality setting.');
        }
    }, 'image/jpeg', quality);
}

function convertImage(format) {
    const canvas = document.createElement('canvas');
    canvas.width = originalWidth;
    canvas.height = originalHeight;
    const ctx = canvas.getContext('2d');

    // For PNG, we need to handle transparency
    if (format === 'png') {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    ctx.drawImage(currentImage, 0, 0);

    const mimeType = `image/${format}`;
    const extension = format === 'jpeg' ? 'jpg' : format;
    const quality = format === 'jpeg' ? 0.9 : undefined;

    canvas.toBlob((blob) => {
        if (blob) {
            downloadBlob(blob, `converted.${extension}`);
        } else {
            alert('Conversion failed. Please try again.');
        }
    }, mimeType, quality);
}

function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    chrome.downloads.download({
        url: url,
        filename: filename,
        saveAs: true
    }, (downloadId) => {
        if (chrome.runtime.lastError) {
            console.error('Download error:', chrome.runtime.lastError);
            alert('Download failed. Please check permissions.');
        }
    });
}

// Verhoeff Algorithm for Aadhar
function verhoeffValidate(number) {
    const d = [
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
        [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
        [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
        [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
        [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
        [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
        [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
        [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
        [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
    ];

    const p = [
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
        [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
        [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
        [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
        [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
        [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
        [7, 0, 4, 6, 9, 1, 3, 2, 5, 8]
    ];

    let c = 0;
    const reversed = number.split('').reverse();

    for (let i = 0; i < reversed.length; i++) {
        c = d[c][p[(i % 8)][parseInt(reversed[i])]];
    }

    return c === 0;
}

// Helper function to show results
function showResult(element, message, type) {
    element.innerHTML = message;
    element.className = `result ${type}`;
    element.style.display = 'block';
}
