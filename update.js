//////////////////////////////////////////////
// update.js
//////////////////////////////////////////////

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
  randomInsert();

  let lineDist = 0;
  let lineCount = 0;
  let thisWordCount = 0;

  // Pick initial strip height
  let sH = stripH;
  let rSh = random(10);
  if (rSh > 7.5) sH = stripH / 4;
  else if (rSh > 5) sH = stripH / 2;

  const GIF_RATIO = 1.6;              // width = ratio * sH; tweak if needed
  const wrapWidth = max(1, wWindow);  // guard

  for (let k = 0; k < keyArray.length; k++) {
    // Wrap to next line if needed
    if (lineDist > wrapWidth) {
      xNudge[lineCount] = lineDist;
      wordCount[lineCount] = thisWordCount;
      sHarry[lineCount] = sH;
      fullHeight += sH;

      lineCount++;
      lineDist = 0;
      thisWordCount = 0;

      // Choose next strip height
      rSh = random(10);
      sH = stripH;
      if (rSh > 7.5) sH = stripH / 4;
      else if (rSh > 5) sH = stripH / 2;
    }

    let ver = 0;
    const token = keyArray[k];

    if (token === "X0") {                 // GIF image (drawn in Entry.display)
      ver = 0;
      heightRatio[k] = sH * GIF_RATIO;    // give GIF slot a width for layout

    } else if (token === "X1") {          // SLASHES
      pSlash(k, sH);  ver = 1;

    } else if (token === "X2") {          // CIRCLES
      pRound(k, sH);  ver = 2;

    } else if (token === "X3") {          // SCRIBBLE
      pBlank(k, sH);  ver = 3;

    } else if (token === "X4") {          // BLANKS
      pBlank(k, sH);  ver = 4;

    } else if (token === "X5") {          // CLOUD
      pBlank(k, sH);  ver = 5;

    } else if (token === "X6") {          // ZIGZAG
      pBlank(k, sH);  ver = 6;

    } else if (token === "X7") {          // GRADIENT
      pBlank(k, sH);  ver = 7;

    } else if (token === "X8") {          // BOXES
      pBlank(k, sH);  ver = 8;

    } else {                              // TEXT
      const rFont = random(10);
      if (rFont < 8) pgTexture1(token, 0, k, sH);
      else           pgTexture1(token, typeToggle, k, sH);
      ver = 9;
    }

    thisWordCount++;
    lineDist += (heightRatio[k] || sH);   // fallback if no width computed
    pEntry[k] = new Entry(k, ver, sH);
  }

  // Flush last line
  xNudge[lineCount] = lineDist;
  wordCount[lineCount] = thisWordCount;
  sHarry[lineCount] = sH;
  fullHeight += sH;
}

function reRoll(){
  // swap serif/sans or other type modes
  typeToggle = round(random(1, 2));
  setText();
}

// easing helper (0..1 -> eased 0..1)
function aSet(ticker, influ){
  const capTicker = ticker % 1;
  return pow(capTicker, influ) / (pow(capTicker, influ) + pow(1 - capTicker, influ));
}

function randomInsert(){
  // images
  let r0 = 1 + floor(keyArray.length / 5);
  for(let r = 0; r < r0; r++){
    const insertPoint = round(random(keyArray.length));
    keyArray.splice(insertPoint, 0, "X0");
  }

  // slashes
  let r1 = 1 + floor(keyArray.length / 12);
  for(let r = 0; r < r1; r++){
    const insertPoint = round(random(keyArray.length));
    keyArray.splice(insertPoint, 0, "X1");
  }

  // circles
  let r2 = 1 + floor(keyArray.length / 12);
  for(let r = 0; r < r2; r++){
    const insertPoint = round(random(keyArray.length));
    keyArray.splice(insertPoint, 0, "X2");
  }

  // scribbles
  let r3 = 1 + floor(keyArray.length / 12);
  for(let r = 0; r < r3; r++){
    const insertPoint = round(random(keyArray.length));
    keyArray.splice(insertPoint, 0, "X3");
  }

  // blanks
  let r4 = 1 + floor(keyArray.length / 18);
  for(let r = 0; r < r4; r++){
    const insertPoint = round(random(keyArray.length));
    keyArray.splice(insertPoint, 0, "X4");
  }

  // clouds
  let r5 = 1 + floor(keyArray.length / 10);
  for(let r = 0; r < r5; r++){
    const insertPoint = round(random(keyArray.length));
    keyArray.splice(insertPoint, 0, "X5");
  }

  // zigzags
  let r6 = 1 + floor(keyArray.length / 15);
  for(let r = 0; r < r6; r++){
    const insertPoint = round(random(keyArray.length));
    keyArray.splice(insertPoint, 0, "X6");
  }

  // gradients
  let r7 = 1 + floor(keyArray.length / 12);
  for(let r = 0; r < r7; r++){
    const insertPoint = round(random(keyArray.length));
    keyArray.splice(insertPoint, 0, "X7");
  }

  // boxes
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

// simplified invert: no 6i.gif loads
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

  // rebuild gradients to match palette
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
