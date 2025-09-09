// sketch.js — loads local fonts + drives the sketch

// ---------- Globals shared across your files ----------
let pgT = [];               // text/graphic textures
let pEntry = [];            // Entry objects
let heightRatio = [];       // width/height ratios
let sHarry = [];            // per-line heights

// Own these on window so other files can reference without re-declaring
window.tFont = window.tFont || [];       // p5.Font objects
window.typeToggle = window.typeToggle ?? 0; // 0=Inter, 1=Playfair, 2=SpaceMono, 3=BebasNeue

let pImg = [];              // images/GIFs
let pGradV, pGradH, pGradCH;

let pgTextSize = 80;
let bkgdColor, foreColor;

let keyText = "";
let keyArray = [];
let xNudge = [];            // per-line x offsets
let wordCount = [];         // words per line

let stripH = 70;            // band height
let wWindow = 0;            // working window width
let wPad = 60;              // padding (narrower text column)
let fullHeight = 0;         // computed total layout height

let colorA = [];            // palette
let widgetOn = true;
let inverter = false;

// layout & density (used by update.js)
let LINE_PAD      = 18;
let WORD_PAD      = 8;
let SHAPE_DENSITY = 0.6;
let SHAPE_SCALE   = 0.85;

// ---------- preload: load local fonts + GIFs ----------
function preload() {
  // Make sure these exact files exist at /resources/fonts/
  const F = window.tFont;
  const tryLoad = (path, idx) =>
    loadFont(path,
      f => F[idx] = f,
      () => { console.warn('Font load failed:', path); F[idx] = null; }
    );

  tryLoad('resources/fonts/Inter-Regular.ttf',            0); // Sans
  tryLoad('resources/fonts/PlayfairDisplay-Regular.ttf',  1); // Serif
  tryLoad('resources/fonts/SpaceMono-Regular.ttf',        2); // Mono
  tryLoad('resources/fonts/BebasNeue-Regular.ttf',        3); // Display

  // GIFs 0..10
  pImg = [];
  for (let i = 0; i <= 10; i++) {
    pImg[i] = loadImage(
      'construct/resources/gifs/' + i + '.gif',
      () => console.log('Loaded GIF', i),
      () => console.warn('Failed to load GIF', i)
    );
  }
}

// ---------- setup ----------
function setup() {
  const host = document.getElementById('construct-container') || document.body;
  const cnv = createCanvas(host.clientWidth, host.clientHeight);
  cnv.parent(host);
  frameRate(30);

  // Base colors + gradients
  bkgdColor = color('#000000');
  foreColor = color('#ffffff');

  colorA[0] = color('#25d964');
  colorA[1] = color('#f24f13');
  colorA[2] = color('#f2b90f');
  colorA[3] = color('#0f5cbf');
  colorA[4] = bkgdColor;

  if (typeof pGradientH  === 'function') pGradientH();
  if (typeof pGradientV  === 'function') pGradientV();
  if (typeof pGradientCH === 'function') pGradientCH();

  // Use a safe default immediately; update.js will swap to p5.Font when available
  textFont('system-ui');

  wWindow = width - map(wPad, 0, 100, 0, width);
  if (typeof setText === 'function') setText();
}

// ---------- draw ----------
function draw() {
  background(bkgdColor);
  const fh = (typeof fullHeight !== 'undefined') ? fullHeight : 0;

  push();
  translate(width / 2, height / 2 - fh / 2);
  if (typeof italicWave0 === 'function') italicWave0();
  pop();
}

// ---------- responsive ----------
function windowResized() {
  const host = document.getElementById('construct-container') || document.body;
  resizeCanvas(host.clientWidth, host.clientHeight);
  wWindow = width - map(wPad, 0, 100, 0, width);
  if (typeof setText === 'function') setText();
}

// ---------- live text ----------
document.addEventListener('DOMContentLoaded', () => {
  const ta = document.getElementById('textArea');
  if (ta) ta.addEventListener('input', () => {
    if (typeof setText === 'function') setText();
  });
});

// ---------- simple font controls ----------
function setFontMode(i){
  const F = window.tFont || [];
  const maxIdx = F.length ? F.length - 1 : 0;
  window.typeToggle = constrain(int(i), 0, maxIdx);
  if (typeof setText === 'function') setText();
}
function cycleFont(){
  const F = window.tFont || [];
  const n = F.length || 1;
  window.typeToggle = (window.typeToggle + 1) % n;
  if (typeof setText === 'function') setText();
}
function keyPressed(){
  if (key === '1') setFontMode(0); // Inter
  if (key === '2') setFontMode(1); // Playfair
  if (key === '3') setFontMode(2); // Space Mono
  if (key === '4') setFontMode(3); // Bebas Neue
}
window.setFontMode = setFontMode;
window.cycleFont  = cycleFont;
