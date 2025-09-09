//////////////////////////////////////////////
// update.js (merged textures.js inside)
//////////////////////////////////////////////

// --- TEXTURES ---
function pgTexture1(inp, typeP, p, sH){
  textSize(pgTextSize);
  textFont(tFont[typeP]);
  const repeatSize = round(textWidth(inp + " "));

  pgT[p] = createGraphics(repeatSize, pgTextSize * 1.0);
  pgT[p].fill(foreColor);
  pgT[p].noStroke();
  pgT[p].textSize(pgTextSize);
  pgT[p].textAlign(CENTER);
  pgT[p].textFont(tFont[typeP]);
  pgT[p].text(inp, pgT[p].width/2, pgT[p].height/2 + pgTextSize*0.7/2);

  heightRatio[p] = pgT[p].width * sH / pgT[p].height;
}

function pgImage(p, sH){
  const pWidth = 120;
  pgT[p] = createGraphics(pWidth, sH);
  pgT[p].noStroke();
  pgT[p].fill(foreColor);
  pgT[p].rect(0, 0, pWidth, sH);
  heightRatio[p] = pgT[p].width * sH / pgT[p].height;
}

function pSlash(p, sH){
  const rSel = round(random(2));
  const pWidth = random(50, 350);
  pgT[p] = createGraphics(pWidth, sH);

  pgT[p].stroke(foreColor);
  pgT[p].strokeWeight(1);
  pgT[p].noFill();

  if(rSel == 0){
    pgT[p].line(5, 5, pgT[p].width - 5, pgT[p].height - 5);
  } else if(rSel == 1){
    pgT[p].line(5, 5, pgT[p].width - 5, pgT[p].height - 5);
    pgT[p].rect(5, 5, pgT[p].width - 10, pgT[p].height - 10);
  } else {
    pgT[p].line(pgT[p].width/2 - 10, pgT[p].height/2 - 10, pgT[p].width/2 + 10, pgT[p].height/2 + 10);
    pgT[p].line(pgT[p].width/2 - 10, pgT[p].height/2 + 10, pgT[p].width/2 + 10, pgT[p].height/2 - 10);
    pgT[p].rect(5, 5, pgT[p].width - 10, pgT[p].height - 10);
  }

  heightRatio[p] = pgT[p].width * sH / pgT[p].height;
}

function pRound(p, sH){
  const rSel = round(random(2));
  const pWidth = random(sH/2, sH * 2);
  pgT[p] = createGraphics(pWidth, sH);

  if(rSel == 0){
    pgT[p].stroke(foreColor);
    pgT[p].strokeWeight(1);
    pgT[p].noFill();
    pgT[p].ellipse(pgT[p].width/2, pgT[p].height/2, pgT[p].width - 10, pgT[p].height - 10);
  } else if(rSel == 1){
    pgT[p].fill(foreColor);
    pgT[p].noStroke();
    pgT[p].ellipse(pgT[p].width/2, pgT[p].height/2, pgT[p].width - 10, pgT[p].height - 10);
  } else {
    pgT[p].stroke(foreColor);
    pgT[p].strokeWeight(1);
    pgT[p].noFill();
    pgT[p].line(pgT[p].width/2 - 10, pgT[p].height/2 - 10, pgT[p].width/2 + 10, pgT[p].height/2 + 10);
    pgT[p].line(pgT[p].width/2 - 10, pgT[p].height/2 + 10, pgT[p].width/2 + 10, pgT[p].height/2 - 10);
    pgT[p].ellipse(pgT[p].width/2, pgT[p].height/2, pgT[p].width - 10, pgT[p].height - 10);
  }

  heightRatio[p] = pgT[p].width * sH / pgT[p].height;
}

function pBlank(p, sH){
  const pWidth = random(50, 350);
  pgT[p] = createGraphics(pWidth, sH);
  heightRatio[p] = pgT[p].width * sH / pgT[p].height;
}

// --- gradients ---
function pGradientH(){
  const steps = 512;
  pGradH = createGraphics(1024, 512);
  for(let i = 0; i<steps; i++){
    let gradientColor;
    if(i<steps*1/5){
      gradientColor = lerpColor(colorA[0], colorA[1], i/(steps/5));
    } else if(i<steps*2/5){
      gradientColor = lerpColor(colorA[1], colorA[2], (i - steps/5)/(steps/5));
    } else if(i<steps*3/5){
      gradientColor = lerpColor(colorA[2], colorA[3], (i - steps*2/5)/(steps/5));
    } else if(i<steps*4/5){
      gradientColor = lerpColor(colorA[3], colorA[4], (i - steps*3/5)/(steps/5));
    } else {
      gradientColor = lerpColor(colorA[4], bkgdColor, (i - steps*4/5)/(steps/5));
    }
    pGradH.stroke(gradientColor);
    pGradH.strokeWeight(2);
    pGradH.line(i*2, 0, i*2, pGradH.height);
  }
}

function pGradientV(){
  const steps = 256;
  pGradV = createGraphics(1024, 512);
  for(let i = 0; i<steps; i++){
    const gradientColor = lerpColor(colorA[0], colorA[4], i/steps);
    pGradV.stroke(gradientColor);
    pGradV.strokeWeight(2);
    pGradV.line(0, i*2, pGradV.width, i*2);
  }
}

function pGradientCH(){
  const steps = 512;
  pGradCH = createGraphics(1024, 512);
  for(let i = 0; i<steps; i++){
    let gradientColor;
    if(i<steps/2){
      gradientColor = lerpColor(bkgdColor, colorA[1], i/(steps/2));
    } else {
      gradientColor = lerpColor(colorA[1], bkgdColor, (i - steps/2)/(steps/2));
    }
    pGradCH.stroke(gradientColor);
    pGradCH.strokeWeight(2);
    pGradCH.line(i*2, 0, i*2, pGradCH.height);
  }
}

//////////////////////////////////////////////
// READABILITY RULES
//////////////////////////////////////////////

// Phrases to keep intact and text-only
const PROTECTED_PHRASES = [
  "STEVEN DEGROOTE",
  "Graphic Designer",
  "Marketing Strategy",
  "Brand Development",
  "User Interface"
];

// Return a Set of token indexes (in keyArray) that belong to protected phrases
function computeProtectedIndexes(tokens){
  const idxSet = new Set();
  const phrases = PROTECTED_PHRASES.map(s => s.trim().split(/\s+/));
  for (const words of phrases){
    if (!words.length) continue;
    for (let i = 0; i <= tokens.length - words.length; i++){
      let ok = true;
      for (let j = 0; j < words.length; j++){
        if (tokens[i+j] !== words[j]) { ok = false; break; }
      }
      if (ok){
        for (let j = 0; j < words.length; j++) idxSet.add(i+j);
      }
    }
  }
  return idxSet;
}

//////////////////////////////////////////////
// LAYOUT + LOGIC
//////////////////////////////////////////////

function setText() {
  pgT = [];
  pEntry = [];
  heightRatio = [];
  xNudge = [];
  wordCount = [];
  sHarry = [];
  fullHeight = 0;

  const enteredText = (document.getElementById("textArea")?.value || "").trim();
  keyText = enteredText;
  keyArray = enteredText ? enteredText.split(/\s+/) : [];

  // Compute protected indices *before* we insert shapes
  const protectedIdx = computeProtectedIndexes(keyArray);

  // Insert shapes only AFTER the protected block (never inside)
  randomInsert(protectedIdx);

  let lineDist = 0, lineCount = 0, thisWordCount = 0;

  const wrapWidth = max(1, wWindow);
  const GIF_RATIO = 1.6;

  // Protected text uses stable height; decorative items can vary
  const sH_protected = stripH;
  let sH_dynamic = stripH;

  const pickDynamicH = () => {
    const rSh = random(10);
    if (rSh > 7.5) return stripH / 4;
    if (rSh > 5)   return stripH / 2;
    return stripH;
  };

  for (let k = 0; k < keyArray.length; k++) {
    if (lineDist > wrapWidth) {
      xNudge[lineCount] = lineDist;
      wordCount[lineCount] = thisWordCount;
      sHarry[lineCount] = sH_dynamic;
      fullHeight += sH_dynamic;

      lineCount++;
      lineDist = 0;
      thisWordCount = 0;

      sH_dynamic = pickDynamicH();
    }

    const token = keyArray[k];
    let ver = 0;

    // Protected words: always text, consistent height
    if (protectedIdx.has(k)) {
      pgTexture1(token, 0, k, sH_protected);
      ver = 9;
      thisWordCount++;
      lineDist += (heightRatio[k] || sH_protected);
      pEntry[k] = new Entry(k, ver, sH_protected);
      continue;
    }

    // Non-protected
    if (!sH_dynamic) sH_dynamic = pickDynamicH();

    if (token === "X0") {                 // GIF slot
      ver = 0;
      heightRatio[k] = sH_dynamic * GIF_RATIO;

    } else if (token === "X1") {          // SLASHES
      pSlash(k, sH_dynamic);  ver = 1;

    } else if (token === "X2") {          // CIRCLES
      pRound(k, sH_dynamic);  ver = 2;

    } else if (token === "X3") {          // SCRIBBLE
      pBlank(k, sH_dynamic);  ver = 3;

    } else if (token === "X4") {          // BLANKS
      pBlank(k, sH_dynamic);  ver = 4;

    } else if (token === "X5") {          // CLOUD
      pBlank(k, sH_dynamic);  ver = 5;

    } else if (token === "X6") {          // ZIGZAG
      pBlank(k, sH_dynamic);  ver = 6;

    } else if (token === "X7") {          // GRADIENT
      pBlank(k, sH_dynamic);  ver = 7;

    } else if (token === "X8") {          // BOXES
      pBlank(k, sH_dynamic);  ver = 8;

    } else {                              // regular text
      const rFont = random(10);
      pgTexture1(token, rFont < 8 ? 0 : typeToggle, k, sH_dynamic);
      ver = 9;
    }

    thisWordCount++;
    lineDist += (heightRatio[k] || sH_dynamic);
    pEntry[k] = new Entry(k, ver, sH_dynamic);
  }

  xNudge[lineCount] = lineDist;
  wordCount[lineCount] = thisWordCount;
  sHarry[lineCount] = sH_dynamic;
  fullHeight += sH_dynamic;
}

// --- utilities & helpers ---

function reRoll(){
  typeToggle = round(random(1, 2));
  setText();
}

function aSet(ticker, influ){
  const capTicker = ticker % 1;
  return pow(capTicker, influ) / (pow(capTicker, influ) + pow(1 - capTicker, influ));
}

/**
 * Insert shape tokens only AFTER the protected block.
 * @param {Set<number>} protectedIdx indexes of tokens that are protected
 */
function randomInsert(protectedIdx = new Set()){
  // find the last index in the protected block
  let lastProtected = -1;
  for (const i of protectedIdx) if (i > lastProtected) lastProtected = i;

  // choose insertion index >= lastProtected + 1
  const chooseInsert = () => {
    const start = Math.max(0, lastProtected + 1);
    const end = Math.max(start, keyArray.length);
    return start + round(random(end - start));
  };

  const add = (sym, n) => {
    for (let r = 0; r < n; r++) {
      keyArray.splice(chooseInsert(), 0, sym);
    }
  };

  add("X0", 1 + floor(keyArray.length / 5));   // images
  add("X1", 1 + floor(keyArray.length / 12));  // slashes
  add("X2", 1 + floor(keyArray.length / 12));  // circles
  add("X3", 1 + floor(keyArray.length / 12));  // scribbles
  add("X4", 1 + floor(keyArray.length / 18));  // blanks
  add("X5", 1 + floor(keyArray.length / 10));  // clouds
  add("X6", 1 + floor(keyArray.length / 15));  // zigzags
  add("X7", 1 + floor(keyArray.length / 12));  // gradients
  add("X8",      floor(keyArray.length / 15)); // boxes
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
