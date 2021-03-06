
let activeColorBtn = '';
let currentTool = 'penTool';
let currentColor = '';
let mousedown = false;


const gridSize = document.querySelector('#gridSize');
const canvas = document.querySelector('#canvas');
const clearBtn = document.querySelector('#clearBtn');
const densitySlider = document.querySelector('#densitySlider');
const blackColorBtn = document.querySelector('#black');
const pastelColorBtn = document.querySelector('#pastel');
const colorPicker = document.querySelector('#colorPicker');
const customColorBtn = document.querySelector('#custom');
const penTool = document.querySelector('#penTool');
const eyedropperTool = document.querySelector('#eyedropperTool');
const eraserTool = document.querySelector('#eraserTool');




clearBtn.addEventListener('click', clearCanvas);
densitySlider.addEventListener('input', function() {
    changeDensity(this.value);
})
blackColorBtn.addEventListener('click', () => setColor('black'));
pastelColorBtn.addEventListener('click', () => setColor('pastel'));
customColorBtn.addEventListener('click', () => setColor('custom'));

penTool.addEventListener('click', () => setTool('penTool'));
eyedropperTool.addEventListener('click', () => setTool('eyedropperTool'));
eraserTool.addEventListener('click', () => setTool('eraserTool'));

document.addEventListener('mousedown', function(){
    mousedown= true;
});

document.addEventListener('mouseup', function(){
    mousedown= false;
});

function createCanvas(n = 30) {
    canvas.style.gridTemplateColumns = `repeat(${n}, 1fr)`;
    canvas.style.gridTemplateRows = `repeat(${n}, 1fr)`;
    for (let i = 0; i < n*n; i++) {
        let gridBox = document.createElement('div');
        gridBox.classList.add('pixel');
        gridBox.style.backgroundColor = '#ffffff'
        canvas.appendChild(gridBox);
    }
    let pixels = document.querySelectorAll('.pixel');
    pixels.forEach(pixel => pixel.addEventListener('mouseover', function() {
        if (mousedown) {
            transformPixel(this);
        }
    }));
    pixels.forEach(pixel => pixel.addEventListener('click', function() {
        transformPixel(this);
    }));
    gridSize.textContent = `${n} x ${n}`;
    
}

function clearCanvas() {
    let pixels = document.querySelectorAll('.pixel');
    pixels.forEach(pixel => pixel.style.backgroundColor = '#ffffff');
}

function changeDensity(density) {
    clearCanvas();
    canvas.textContent = '';
    createCanvas(density);
}

function setColor(color) {
    setTool('penTool');
    currentColor = color;
    if (document.getElementsByClassName('activeColor')[0]) {
        document.getElementsByClassName('activeColor')[0].classList.remove('activeColor');
    }
    document.getElementById(color).classList.add('activeColor');
}

function colorPixel(pixel) {
    switch(currentColor) {
        case 'black':
            pixel.style.backgroundColor = '#262626';
            break;
        case 'pastel':
            let hue = Math.floor(Math.random() * 360);
            pixel.style.backgroundColor = 'hsl(' + hue + ', 100%, 90%)';
            break;
        case 'custom':
            pixel.style.backgroundColor = colorPicker.value;
            break;
    }
}

function transformPixel(pixel) {
    switch (currentTool) {
        case 'penTool':
            colorPixel(pixel);
            break;
        case 'eyedropperTool':
            colorPicker.value = rgbToHex(pixel.style.backgroundColor);
            break;
        case 'eraserTool':
            pixel.style.backgroundColor = '#ffffff';
            break;
    }
}

function setTool(tool) {
    currentTool = tool;
    if (document.getElementsByClassName('activeTool')[0]) {
        document.getElementsByClassName('activeTool')[0].classList.remove('activeTool');
    }
    document.getElementById(tool).classList.add('activeTool');
}

//from @Tim Down on https://stackoverflow.com/questions/13070054/convert-rgb-strings-to-hex-in-javascript
function componentFromStr(numStr, percent) {
    var num = Math.max(0, parseInt(numStr, 10));
    return percent ?
        Math.floor(255 * Math.min(100, num) / 100) : Math.min(255, num);
}

function rgbToHex(rgb) {
    var rgbRegex = /^rgb\(\s*(-?\d+)(%?)\s*,\s*(-?\d+)(%?)\s*,\s*(-?\d+)(%?)\s*\)$/;
    var result, r, g, b, hex = "";
    if ( (result = rgbRegex.exec(rgb)) ) {
        r = componentFromStr(result[1], result[2]);
        g = componentFromStr(result[3], result[4]);
        b = componentFromStr(result[5], result[6]);

        hex = "#" + (0x1000000 + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }
    return hex;
}

setTool('penTool');
createCanvas();
setColor('black');

// Add keyboard listeners
// Add function documentation

