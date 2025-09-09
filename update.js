//////////////////////////////////////////////
// update.js
//////////////////////////////////////////////

// --- Safe wrappers for texture functions ---
function safeBlank(k, sH){
  if (typeof pBlank === "function") {
    pBlank(k, sH);
  } else {
    // fallback: simple white block
    const w = max(50, min(350, sH * 2));
    pgT[k] = createGraphics(w, sH);
    pgT[k].noStroke();
    pgT[k].fill(foreColor);
    pgT[k].rect(0, 0, w, sH);
    heightRatio[k] = (pgT[k].width * sH) / pgT[k].height;
  }
}

function safeSlash(k, sH){
  if (typeof pSlash === "function") {
    pSlash(k, sH);
  } else {
    const w = max(80, min(350, sH * 2));
    pgT[k] = createGraphics(w, sH);
    pgT[k].stroke(foreColor);
    pgT[k].noFill();
    pgT[k].line(5, 5, pgT[k].width - 5, pgT[k].height - 5);
    heightRatio[k] = (pgT[k].width * sH) / pgT[k].height;
  }
}

function safeRound(k, sH){
  if (typeof pRound === "function") {
    pRound(k, sH);
  } else {
    const w = max(sH/2, sH * 1.5);
    pgT[k] = createGraphics(w, sH);
    pgT[k].noStroke();
    pgT[k].fill(foreColor);
    pgT[k].ellipse(pgT[k].width/2, pgT[k].height/2, pgT[k].width - 10, pgT[k].height - 10);
    heightRatio[k] = (pgT[k].width * sH) / pgT[k].height;
  }
}

function setText() {
  // Reset layout state
  pgT = [];
  pEntry = [];
  heightRatio = [];
  xNudge = [];
  wordCount = [];
  sHarry = [];
  fullHeight = 0;

  // Parse input
  const enteredText = (document.getElementById("textArea")?.value || "").trim();
  keyText = enteredText;
  keyArray = enteredText ? enteredText.split(/\s+/) : [];

  // Inject special tokens (X0..X8)
  if (typeof randomInsert === "function") randomInsert();

  let lineDist = 0;
  let lineCount = 0;
  let thisWordCount = 0;

  // Pick initial strip height
  let sH = stripH;
  let rSh = random(10);
  if (rSh > 7.5) sH = stripH / 4;
  else if (rSh > 5) sH = stripH / 2;

  const GIF_RATIO = 1.6;              // width = ratio * sH
  const wrapWidth = max(1, wWindow);

  for (let k = 0; k < keyArray.length; k++) {
    if (lineDist > wrapWidth) {
      xNudge[lineCount] = lineDist;
      wordCount[lineCount] = thisWordCount;
      sHarry[lineCount] = sH;
      fullHeight += sH;

      lineCount++;
      lineDist = 0;
      thisWordCount = 0;

      rSh = random(10);
      sH = stripH;
      if (rSh > 7.5) sH = stripH / 4;
      else if (rSh > 5) sH = stripH / 2;
    }

    let ver = 0;
    const token = keyArray[k];

    if (token === "X0") {                 // GIF
      ver = 0;
      heightRatio[k] = sH * GIF_RATIO;

    } else if (token === "X1") {          // SLASHES
      safeSlash(k, sH);  ver = 1;

    } else if (token === "X2") {          // CIRCLES
      safeRound(k, sH);  ver = 2;

    } else if (token === "X3") {          // SCRIBBLE
      safeBlank(k, sH);  ver = 3;

    } else if (token === "X4") {          // BLANKS
      safeBlank(k, sH);  ver = 4;

    } else if (token === "X5") {          // CLOUD
      safeBlank(k, sH);  ver = 5;

    } else if (token === "X6") {          // ZIGZAG
      safeBlank(k, sH);  ver = 6;

    } else if (token === "X7") {          // GRADIENT
      safeBlank(k, sH);  ver = 7;

    } else if (token === "X8") {          // BOXES
      safeBlank(k, sH);  ver = 8;

    } else {                              // TEXT
      const rFont = random(10);
      if (rFont < 8) pgTexture1(token, 0, k, sH);
      else           pgTexture1(token, typeToggle, k, sH);
      ver = 9;
    }

    thisWordCount++;
    lineDist += (heightRatio[k] || sH);
    pEntry[k] = new Entry(k, ver, sH);
  }

  xNudge[lineCount] = lineDist;
  wordCount[lineCount] = thisWordCount;
  sHarry[lineCount] = sH;
  fullHeight += sH;
}

function reRoll(){
  typeToggle = round(random(1, 2));
  setText();
}

function aSet(ticker, influ){
  const capTicker = ticker % 1;
  return pow(capTicker, influ) / (pow(capTicker, influ) + pow(1 - capTicker, influ));
}

function randomInsert(){
  let r0 = 1 + floor(keyArray.length / 5);
  for(let r = 0; r < r0; r++){
    const insertPoint = round(random(keyArray.length));
    keyArray.splice(insertPoint, 0, "X0");
  }
  let r1 = 1 + floor(keyArray.length / 12);
  for(let r = 0; r < r1; r++){
    const insertPoint = round(random(keyArray.length));
    keyArray.splice(insertPoint, 0, "X1");
  }
  let r2 = 1 + floor(keyArray.length / 12);
  for(let r = 0; r < r2; r++){
    const insertPoint = round(random(keyArray.length));
    keyArray.splice(insertPoint, 0, "X2");
  }
  let r3 = 1 + floor(keyArray.length / 12);
  for(let r = 0; r < r3; r++){
    const insertPoint = round(random(keyArray.length));
    keyArray.splice(insertPoint, 0, "X3");
  }
  let r4 = 1 + floor(keyArray.length / 18);
  for(let r = 0; r < r4; r++){
    const insertPoint = round(random(keyArray.length));
    keyArray.splice(insertPoint, 0, "X4");
  }
  let r5 = 1 + floor(keyArray.length / 10);
  for(let r = 0; r < r5; r++){
    const insertPoint = round(random(keyArray.length));
    keyArray.splice(insertPoint, 0, "X5");
  }
  let r6 = 1 + floor(keyArray.length / 15);
  for(let r = 0; r < r6; r++){
    const insertPoint = round(random(keyArray.length));
    keyArray.splice(insertPoint, 0, "X6");
  }
  let r7 = 1 + floor(keyArray.length / 12);
  for(let r = 0; r < r7; r++){
    const insertPoint = round(random(keyArray.length));
    keyArray.splice(insertPoint, 0, "X7");
  }
  let r8 = floor(keyArray.length / 15);
  for(let r = 0; r < r8; r++){
    const insertPoint = round(random(keyArray.length));
    keyArray.splice(insertPoint, 0, "X8");
  }
}

function hideWidget(){
  widgetOn = !widgetOn;
  document.getElementById('widget').style.display = widgetOn ? "block" : "none";
}

function invert(){
  inverter = !inverter;

  if (inverter) {
    bkgdColor = color('#ffffff');
    foreColor = color('#000000');
  } else {
    bkgdColor = color('#000000');
    foreColor = color('#ffffff');
  }
  colorA[4] = bkgdColor;

  if (typeof pGradientH === 'function') pGradientH();
  if (typeof pGradientV === 'function') pGradientV();
  if (typeof pGradientCH === 'function') pGradientCH();

  setText();
}

function setWpadding(val){
  wPad = val;
  wWindow = width - map(wPad, 0, 100, 0, width);
  setText();
}

function setStripH(val){
  stripH = round(val);
  setText();
}

// Expose globally
window.setText = setText;
window.reRoll = reRoll;
window.aSet = aSet;
window.randomInsert = randomInsert;
window.hideWidget = hideWidget;
window.invert = invert;
window.setWpadding = setWpadding;
window.setStripH = setStripH;
