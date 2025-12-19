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
    
    const formatted = `${number.slice(0,4)} ${number.slice(4,8)} ${number.slice(8,12)}`;
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
        <h3 style="font-size: 14px; margin: 15px 0 10px;">Resize Image</h3>
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

function showCropOptions() {
    const optionsDiv = document.getElementById('imageToolOptions');
    optionsDiv.innerHTML = `
        <h3 style="font-size: 14px; margin: 15px 0 10px;">Crop Image</h3>
        <div class="form-group">
            <label>Aspect Ratio</label>
            <select id="cropRatio">
                <option value="1:1">Square (1:1)</option>
                <option value="4:3">Standard (4:3)</option>
                <option value="16:9">Widescreen (16:9)</option>
                <option value="3:2">Photo (3:2)</option>
            </select>
        </div>
        <button class="btn btn-primary" id="applyCrop">Crop & Download</button>
    `;
    optionsDiv.style.display = 'block';
    
    document.getElementById('applyCrop').addEventListener('click', () => {
        const ratio = document.getElementById('cropRatio').value;
        const [w, h] = ratio.split(':').map(Number);
        cropImage(w / h);
    });
}

function showCompressOptions() {
    const optionsDiv = document.getElementById('imageToolOptions');
    optionsDiv.innerHTML = `
        <h3 style="font-size: 14px; margin: 15px 0 10px;">Compress Image</h3>
        <div class="form-group">
            <label>Quality: <span id="qualityValue">80</span>%</label>
            <input type="range" id="qualitySlider" min="1" max="100" value="80" style="width: 100%;">
        </div>
        <button class="btn btn-primary" id="applyCompress">Compress & Download</button>
    `;
    optionsDiv.style.display = 'block';
    
    document.getElementById('qualitySlider').addEventListener('input', (e) => {
        document.getElementById('qualityValue').textContent = e.target.value;
    });
    
    document.getElementById('applyCompress').addEventListener('click', () => {
        const quality = parseInt(document.getElementById('qualitySlider').value) / 100;
        compressImage(quality);
    });
}

function showConvertOptions() {
    const optionsDiv = document.getElementById('imageToolOptions');
    optionsDiv.innerHTML = `
        <h3 style="font-size: 14px; margin: 15px 0 10px;">Convert Format</h3>
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
        downloadBlob(blob, `resized_${width}x${height}.jpg`);
    }, 'image/jpeg', 0.95);
}

function cropImage(aspectRatio) {
    const canvas = document.createElement('canvas');
    let width, height, sx, sy;
    
    if (originalWidth / originalHeight > aspectRatio) {
        height = originalHeight;
        width = height * aspectRatio;
        sx = (originalWidth - width) / 2;
        sy = 0;
    } else {
        width = originalWidth;
        height = width / aspectRatio;
        sx = 0;
        sy = (originalHeight - height) / 2;
    }
    
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(currentImage, sx, sy, width, height, 0, 0, width, height);
    
    canvas.toBlob((blob) => {
        downloadBlob(blob, `cropped_${Math.round(width)}x${Math.round(height)}.jpg`);
    }, 'image/jpeg', 0.95);
}

function compressImage(quality) {
    const canvas = document.createElement('canvas');
    canvas.width = originalWidth;
    canvas.height = originalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(currentImage, 0, 0);
    
    canvas.toBlob((blob) => {
        downloadBlob(blob, 'compressed.jpg');
    }, 'image/jpeg', quality);
}

function convertImage(format) {
    const canvas = document.createElement('canvas');
    canvas.width = originalWidth;
    canvas.height = originalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(currentImage, 0, 0);
    
    const mimeType = `image/${format}`;
    const extension = format === 'jpeg' ? 'jpg' : format;
    
    canvas.toBlob((blob) => {
        downloadBlob(blob, `converted.${extension}`);
    }, mimeType, 0.9);
}

function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    chrome.downloads.download({
        url: url,
        filename: filename,
        saveAs: true
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
