// ---------------- update.js ----------------

function setText(){
  // reset
  pgT = []; pEntry = []; heightRatio = []; xNudge = []; wordCount = []; sHarry = [];
  fullHeight = 0;

  // get input safely
  const el = document.getElementById("textArea");
  const enteredText = (el && el.value) ? el.value : "";
  keyText = enteredText;
  keyArray = enteredText.trim() ? enteredText.split(" ") : [];

  // inject decoration tokens
  randomInsert();

  let lineDist = 0, lineCount = 0, thisWordCount = 0;

  // pick initial strip height
  let rSh = random(10);
  let sH = stripH;
  if (rSh > 7.5) sH = stripH/4;
  else if (rSh > 5) sH = stripH/2;

  for (let k = 0; k < keyArray.length; k++) {

    // wrap
    if (lineDist > wWindow){
      xNudge[lineCount]    = lineDist;
      wordCount[lineCount] = thisWordCount;

      // vertical padding (with jitter from sketch.js knobs)
      let padY = LINE_PAD + random(-LINE_PAD*PAD_JITTER, LINE_PAD*PAD_JITTER);
      sHarry[lineCount]    = sH + padY;
      fullHeight          += sHarry[lineCount];

      lineCount++; lineDist = 0; thisWordCount = 0;

      rSh = random(10);
      sH = stripH;
      if (rSh > 7.5) sH = stripH/4;
      else if (rSh > 5) sH = stripH/2;
    }

    // build token
    let ver = 0;
    const token = keyArray[k];

    if      (token === "X0"){ pgImage(k, sH);  ver = 0; }
    else if (token === "X1"){ pSlash(k, sH);   ver = 1; }
    else if (token === "X2"){ pRound(k, sH);   ver = 2; }
    else if (token === "X3"){ pBlank(k, sH);   ver = 3; }
    else if (token === "X4"){ pBlank(k, sH);   ver = 4; }
    else if (token === "X5"){ pBlank(k, sH);   ver = 5; }
    else if (token === "X6"){ pBlank(k, sH);   ver = 6; }
    else if (token === "X7"){ pBlank(k, sH);   ver = 7; }
    else if (token === "X8"){ pBlank(k, sH);   ver = 8; }
    else {
      const rFont = random(10);
      if (rFont < 8) pgTexture1(token, 0, k, sH);
      else           pgTexture1(token, typeToggle, k, sH);
      ver = 9;
    }

    thisWordCount++;

    // horizontal padding (with jitter)
    let padX = WORD_PAD + random(-WORD_PAD*PAD_JITTER, WORD_PAD*PAD_JITTER);
    lineDist += heightRatio[k] + padX;

    // shrink + size jitter for non-text shapes
    const shrink = (ver === 9) ? 1 : SHAPE_SCALE;
    const sizeJ = 1 + random(-SIZE_JITTER, SIZE_JITTER);
    const entryH = Math.max(8, sH * shrink * sizeJ);
    pEntry[k] = new Entry(k, ver, entryH);
  }

  // finalize last line
  xNudge[lineCount]    = lineDist;
  wordCount[lineCount] = thisWordCount;
  let padY = LINE_PAD + random(-LINE_PAD*PAD_JITTER, LINE_PAD*PAD_JITTER);
  sHarry[lineCount]    = sH + padY;
  fullHeight          += sHarry[lineCount];
}

function reRoll(){
  typeToggle = round(random(1,2));
  setText();
}

function aSet(ticker, influ){
  const cap = ticker % 1;
  return pow(cap,influ) / (pow(cap,influ) + pow(1-cap,influ));
}

function randomInsert(){
  const add = (count, tag) => {
    for (let r = 0; r < count; r++){
      const insertPoint = Math.round(random(keyArray.length));
      keyArray.splice(insertPoint, 0, tag);
    }
  };

  const words = keyArray.length;
  const D  = (typeof SHAPE_DENSITY !== 'undefined') ? SHAPE_DENSITY : 1.0;
  const DG = (typeof GIF_DENSITY   !== 'undefined') ? GIF_DENSITY   : 1.0;

  add(Math.max(1, Math.round((2 + Math.floor(words/10)) * D * DG)), "X0");
  add(Math.round((1 + Math.floor(words/12)) * D), "X1");
  add(Math.round((1 + Math.floor(words/12)) * D), "X2");
  add(Math.round((1 + Math.floor(words/12)) * D), "X3");
  add(Math.round((1 + Math.floor(words/18)) * D), "X4");
  add(Math.round((1 + Math.floor(words/10)) * D), "X5");
  add(Math.round((1 + Math.floor(words/15)) * D), "X6");
  add(Math.round((1 + Math.floor(words/12)) * D), "X7");
  add(Math.round((Math.floor(words/15))  * D), "X8");
}

function hideWidget(){
  widgetOn = !widgetOn;
  const w = document.getElementById('widget');
  if (w) w.style.display = widgetOn ? "block" : "none";
}

function invert(){
  inverter = !inverter;
  if (inverter){
    bkgdColor = color('#ffffff'); foreColor = color('#000000'); colorA[4] = bkgdColor;
  } else {
    bkgdColor = color('#000000'); foreColor = color('#ffffff'); colorA[4] = bkgdColor;
  }
  if (typeof pGradientH  === 'function') pGradientH();
  if (typeof pGradientV  === 'function') pGradientV();
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
// ------------- end update.js -------------
