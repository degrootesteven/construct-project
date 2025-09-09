// sketch.js — loads local fonts + drives the sketch

// ---------- Globals shared across your files ----------
let pgT = [];               // text/graphic textures
let pEntry = [];            // Entry objects
let heightRatio = [];       // width/height ratios
let sHarry = [];            // per-line heights

let tFont = [];             // p5.Font objects (loaded in preload)
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
let wPad = 40;              // padding
let fullHeight = 0;         // computed total layout height

let colorA = [];            // palette

let widgetOn = true;
let inverter = false;
let typeToggle = 1;         // which font in tFont[]

// --- layout & density controls ---
let LINE_PAD      = 18;   // extra pixels between lines (vertical)
let WORD_PAD      = 8;    // extra pixels between tokens (horizontal)
let SHAPE_DENSITY = 0.6;  // 0..1, lower = fewer shapes
let SHAPE_SCALE   = 0.85; // 0..1, shrink shapes inside their strip

// Optional: reduce working width to force nicer wrapping (more lines)
wPad = 60; // try 40–120; higher = narrower text column (more line breaks)


// ---------- preload: load local fonts + GIFs ----------
function preload() {
  // Put these files in resources/fonts/ (same origin as index.html)
  // Inter, Playfair Display, Space Mono, Bebas Neue
  tFont[0] = loadFont('resources/fonts/Inter-Regular.ttf');            // Sans
  tFont[1] = loadFont('resources/fonts/PlayfairDisplay-Regular.ttf');  // Serif
  tFont[2] = loadFont('resources/fonts/SpaceMono-Regular.ttf');        // Mono
  tFont[3] = loadFont('resources/fonts/BebasNeue-Regular.ttf');        // Display

  // Load GIFs 0..10 from construct/resources/gifs/
  pImg = [];
  for (let i = 0; i <= 10; i++) {
    pImg[i] = loadImage(
      'construct/resources/gifs/' + i + '.gif',
      () => {}, // success
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

// ---------- simple font controls from console/UI ----------
function setFontMode(i){
  // clamp to available fonts
  typeToggle = constrain(int(i), 0, max(0, (tFont?.length || 1) - 1));
  if (typeof setText === 'function') setText();
}
function cycleFont(){
  const n = (tFont?.length || 1);
  typeToggle = (typeToggle + 1) % n;
  if (typeof setText === 'function') setText();
}
window.setFontMode = setFontMode;
window.cycleFont  = cycleFont;
