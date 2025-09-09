// sketch.js — loads local fonts + drives the sketch

// ---------- Globals shared across your files ----------
let pgT = [];               // text/graphic textures
let pEntry = [];            // Entry objects
let heightRatio = [];       // width/height ratios
let sHarry = [];            // per-line heights

let tFont = [];             // p5.Font objects (loaded in preload)  <-- NOTE: tFont (not "font")
let pImg = [];              // images/GIFs

let pGradV, pGradH, pGradCH; // gradient graphics

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

// which font family index update.js will use via textFont(tFont[typeP])
let typeToggle = 0;         // 0=Inter, 1=Playfair, 2=SpaceMono, 3=BebasNeue

// --- layout & density controls (consumed by update.js) ---
let LINE_PAD      = 18;   // extra pixels between lines (vertical)
let WORD_PAD      = 8;    // extra pixels between tokens (horizontal)
let SHAPE_DENSITY = 0.6;  // 0..1, lower = fewer shapes
let SHAPE_SCALE   = 0.85; // 0..1, shrink shapes inside their strip


// ---------- preload: load local fonts + GIFs ----------
function preload() {
  // Local fonts (make sure these files exist with exact names/paths)
  tFont[0] = loadFont('resources/fonts/Inter-Regular.ttf');             // Sans
  tFont[1] = loadFont('resources/fonts/PlayfairDisplay-Regular.ttf');   // Serif
  tFont[2] = loadFont('resources/fonts/SpaceMono-Regular.ttf');         // Mono
  tFont[3] = loadFont('resources/fonts/BebasNeue-Regular.ttf');         // Display

  // Load GIFs 0..10 from construct/resources/gifs/
  pImg = [];
  for (let i = 0; i <= 10; i++) {
    pImg[i] = loadImage(
      'construct/resources/gifs/' + i + '.gif',
      () => console.log('Loaded GIF', i),
      () => console.warn('Failed to load GIF', i)
    );
  }
}

// ---------- setup: create full-viewport canvas ----------
function setup() {
  const host = document.getElementById('construct-container') || document.body;
  const cnv = createCanvas(host.clientWidth, host.clientHeight);
  cnv.parent(host);
  frameRate(30);

  // Colors
  bkgdColor = color('#000000');
  foreColor = color('#ffffff');

  colorA[0] = color('#25d964'); // green
  colorA[1] = color('#f24f13'); // orange
  colorA[2] = color('#f2b90f'); // yellow
  colorA[3] = color('#0f5cbf'); // blue
  colorA[4] = bkgdColor;

  // Build gradients if helpers are present
  if (typeof pGradientH  === 'function') pGradientH();
  if (typeof pGradientV  === 'function') pGradientV();
  if (typeof pGradientCH === 'function') pGradientCH();

  wWindow = width - map(wPad, 0, 100, 0, width);

  if (typeof setText === 'function') setText();
}

// ---------- draw: center layout and render ----------
function draw() {
  background(bkgdColor);

  const fh = (typeof fullHeight !== 'undefined') ? fullHeight : 0;

  push();
  translate(width / 2, height / 2 - fh / 2);
  if (typeof italicWave0 === 'function') italicWave0();
  pop();
}

// ---------- responsive resize ----------
function windowResized() {
  const host = document.getElementById('construct-container') || document.body;
  resizeCanvas(host.clientWidth, host.clientHeight);
  wWindow = width - map(wPad, 0, 100, 0, width);
  if (typeof setText === 'function') setText();
}

// ---------- live-update text from <textarea> ----------
document.addEventListener('DOMContentLoaded', () => {
  const ta = document.getElementById('textArea');
  if (ta) ta.addEventListener('input', () => {
    if (typeof setText === 'function') setText();
  });
});

// ---------- simple font controls ----------
function setFontMode(i){
  const maxIdx = (tFont && tFont.length) ? tFont.length - 1 : 0;
  typeToggle = constrain(int(i), 0, maxIdx);
  if (typeof setText === 'function') setText();
}
function cycleFont(){
  const n = (tFont && tFont.length) ? tFont.length : 1;
  typeToggle = (typeToggle + 1) % n;
  if (typeof setText === 'function') setText();
}
function keyPressed(){
  if (key === '1') setFontMode(0); // Inter
  if (key === '2') setFontMode(1); // Playfair Display
  if (key === '3') setFontMode(2); // Space Mono
  if (key === '4') setFontMode(3); // Bebas Neue
}
window.setFontMode = setFontMode;
window.cycleFont  = cycleFont;
