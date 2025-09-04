// sketch.js — portable version for GitHub Pages / Squarespace

// ---------- Globals shared across your files ----------
let pgT = [];               // text/graphic textures
let pEntry = [];            // Entry objects
let heightRatio = [];       // width/height ratios
let sHarry = [];            // per-line heights

let tFont = [];             // fonts (we'll use system fonts)
let pImg = [];              // images/GIFs (kept empty for portability)

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
let typeToggle = 1;         // font variation selector

// --- layout & density knobs ---
let LINE_PAD    = 24;   // vertical space between lines (try 24–36)
let WORD_PAD    = 12;   // horizontal space between tokens (try 10–18)
let SHAPE_SCALE = 0.85; // shrink non-text shapes (0.75–0.9 looks good)
let GIF_DENSITY = 1.3; // try 1.2–1.6 for “a few more” GIFs


// optional: reduce working width to force nicer wrapping (more lines)
wPad = 60; // try 40–120; higher = narrower text column (more line breaks)


// ---------- preload: avoid external assets ----------
function preload() {
  // Use system fonts so we don't need to host .otf/.ttf files
  tFont[0] = 'system-ui';
  tFont[1] = 'system-ui';
  tFont[2] = 'system-ui';

  // load GIFs
  pImg = [];
  for (let i = 0; i <= 10; i++) {
    pImg[i] = loadImage("construct/resources/gifs/" + i + ".gif", 
      () => console.log("Loaded GIF " + i),
      () => console.warn("Failed to load GIF " + i)
    );
  }
}

// ---------- setup: create full-viewport canvas ----------
function setup() {
  const host = document.getElementById('construct-container') || document.body;
  const cnv = createCanvas(host.clientWidth, host.clientHeight);
  cnv.parent(host);
  frameRate(30);

  // Colors (tweak as you like)
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
