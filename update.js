//////////////////////////////////////////////
// update.js (textures merged)
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

  if (rSel === 0){
    pgT[p].line(5, 5, pgT[p].width - 5, pgT[p].height - 5);
  } else if (rSel === 1){
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

  if (rSel === 0){
    pgT[p].stroke(foreColor);
    pgT[p].strokeWeight(1);
    pgT[p].noFill();
    pgT[p].ellipse(pgT[p].width/2, pgT[p].height/2, pgT[p].width - 10, pgT[p].height - 10);
  } else if (rSel === 1){
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

// --- GRADIENTS ---
function pGradientH(){
  const steps = 512;
  pGradH = createGraphics(1024, 512);
  for (let i = 0; i < steps; i++){
    let c;
    if (i < steps*1/5)       c = lerpColor(colorA[0], colorA[1], i/(steps/5));
    else if (i < steps*2/5)  c = lerpColor(colorA[1], colorA[2], (i-steps/5)/(steps/5));
    else if (i < steps*3/5)  c = lerpColor(colorA[2], colorA[3], (i-steps*2/5)/(steps/5));
    else if (i < steps*4/5)  c = lerpColor(colorA[3], colorA[4], (i-steps*3/5)/(steps/5));
    else                     c = lerpColor(colorA[4], bkgdColor, (i-steps*4/5)/(steps/5));
    pGradH.stroke(c);
    pGradH.strokeWeight(2);
    pGradH.line(i*2, 0, i*2, pGradH.height);
  }
}

function pGradientV(){
  const steps = 256;
  pGradV = createGraphics(1024, 512);
  for (let i = 0; i < steps; i++){
    const c = lerpColor(colorA[0], colorA[4], i/steps);
    pGradV.stroke(c);
    pGradV.strokeWeight(2);
    pGradV.line(0, i*2, pGradV.width, i*2);
  }
}

function pGradientCH(){
  const steps = 512;
  pGradCH = createGraphics(1024, 512);
  for (let i = 0; i < steps; i++){
    const c = (i < steps/2)
      ? lerpColor(bkgdColor, colorA[1], i/(steps/2))
      : lerpColor(colorA[1], bkgdColor, (i-steps/2)/(steps/2));
    pGradCH.stroke(c);
    pGradCH.strokeWeight(2);
    pGradCH.line(i*2, 0, i*2, pGradCH.height);
  }
}

//////////////////////////////////////////////
// INSERTS BETWEEN WORDS ONLY
//////////////////////////////////////////////

// Insert X0..X8 tokens only into the gaps BETWEEN words.
// Never replaces a word; avoids stacking multiple inserts in the same gap.
function randomInsert(){
  const N = keyArray.length;                      // number of words
  const gaps = Array.from({ length: N + 1 }, (_, i) => i); // 0..N
  const inserts = new Map();

  let pool = gaps.slice();                         // available gaps
  const takeGap = () => {
    if (!pool.length) return null;
    const idx = floor(random(pool.length));
    return pool.splice(idx, 1)[0];
  };

  const addTokens = (sym, count) => {
    for (let r = 0; r < count; r++){
      const g = takeGap();
      if (g === null) break;
      if (!inserts.has(g)) inserts.set(g, []);
      inserts.get(g).push(sym);
    }
  };

  // counts similar to your previous scaling
  addTokens("X0", 1 + floor(N / 5));    // images / GIF slots
  addTokens("X1", 1 + floor(N / 12));   // slashes
  addTokens("X2", 1 + floor(N / 12));   // circles
  addTokens("X3", 1 + floor(N / 12));   // scribbles
  addTokens("X4", 1 + floor(N / 18));   // blanks
  addTokens("X5", 1 + floor(N / 10));   // clouds
  addTokens("X6", 1 + floor(N / 15));   // zigzags
  addTokens("X7", 1 + floor(N / 12));   // gradients
  addTokens("X8",      floor(N / 15));  // boxes

  // rebuild tokens: inserts before word i, then the word
  const out = [];
  for (let i = 0; i < N; i++){
    if (inserts.has(i)) out.push(...inserts.get(i));
    out.push(keyArray[i]);
  }
  if (inserts.has(N)) out.push(...inserts.get(N)); // after last word
  keyArray = out;
}

//////////////////////////////////////////////
// LAYOUT + LOGIC
//////////////////////////////////////////////

function setText() {
  // reset state
  pgT = [];
  pEntry = [];
  heightRatio = [];
  xNudge = [];
  wordCount = [];
  sHarry = [];
  fullHeight = 0;

  // input → words
  const enteredText = (document.getElementById("textArea")?.value || "").trim();
  keyText = enteredText;
  keyArray = enteredText ? enteredText.split(/\s+/) : [];

  // insert tokens between words
  randomInsert();

  let lineDist = 0;
  let lineCount = 0;
  let thisWordCount = 0;

  // initial strip height
  let sH = stripH;
  let rSh = random(10);
  if (rSh > 7.5) sH = stripH / 4;
  else if (rSh > 5) sH = stripH / 2;

  const GIF_RATIO = 1.6;
  const wrapWidth = max(1, wWindow);

  for (let k = 0; k < keyArray.length; k++) {
    // wrap line
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

    const token = keyArray[k];
    let ver = 0;

    if (token === "X0") {                 // GIF slot
      ver = 0;
      heightRatio[k] = sH * GIF_RATIO;

    } else if (token === "X1") {          // slashes
      pSlash(k, sH);  ver = 1;

    } else if (token === "X2") {          // circles
      pRound(k, sH);  ver = 2;

    } else if (token === "X3") {          // scribble
      pBlank(k, sH);  ver = 3;

    } else if (token === "X4") {          // blanks
      pBlank(k, sH);  ver = 4;

    } else if (token === "X5") {          // cloud
      pBlank(k, sH);  ver = 5;

    } else if (token === "X6") {          // zigzag
      pBlank(k, sH);  ver = 6;

    } else if (token === "X7") {          // gradient
      pBlank(k, sH);  ver = 7;

    } else if (token === "X8") {          // boxes
      pBlank(k, sH);  ver = 8;

    } else {                              // word → always text
      const rFont = random(10);
      pgTexture1(token, rFont < 8 ? 0 : typeToggle, k, sH);
      ver = 9;
    }

    thisWordCount++;
    lineDist += (heightRatio[k] || sH);
    pEntry[k] = new Entry(k, ver, sH);
  }

  // flush last line
  xNudge[lineCount] = lineDist;
  wordCount[lineCount] = thisWordCount;
  sHarry[lineCount] = sH;
  fullHeight += sH;
}

// --- HELPERS ---
function reRoll(){ typeToggle = round(random(1, 2)); setText(); }

function aSet(ticker, influ){
  const t = ticker % 1;
  return pow(t, influ) / (pow(t, influ) + pow(1 - t, influ));
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
