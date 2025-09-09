//////////////////////////////////////////////
// update.js (merged textures.js inside)
//////////////////////////////////////////////

// --- TEXTURES (merged from textures.js) ---
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
    if(i<steps* 1/5){
      gradientColor = lerpColor(colorA[0], colorA[1], i/(steps/5));
    } else if(i<steps * 2/5){
      gradientColor = lerpColor(colorA[1], colorA[2], (i - steps/5)/(steps/5));
    } else if(i<steps * 3/5){
      gradientColor = lerpColor(colorA[2], colorA[3], (i - steps*2/5)/(steps/5));
    } else if(i<steps * 4/5){
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
// LAYOUT + LOGIC (your old update.js)
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

  randomInsert();

  let lineDist = 0, lineCount = 0, thisWordCount = 0;
  let sH = stripH;
  let rSh = random(10);
  if (rSh > 7.5) sH = stripH / 4;
  else if (rSh > 5) sH = stripH / 2;

  const GIF_RATIO = 1.6;
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

    let ver = 0, token = keyArray[k];
    if (token === "X0") { ver = 0; heightRatio[k] = sH * GIF_RATIO; }
    else if (token === "X1") { pSlash(k, sH); ver = 1; }
    else if (token === "X2") { pRound(k, sH); ver = 2; }
    else if (token === "X3") { pBlank(k, sH); ver = 3; }
    else if (token === "X4") { pBlank(k, sH); ver = 4; }
    else if (token === "X5") { pBlank(k, sH); ver = 5; }
    else if (token === "X6") { pBlank(k, sH); ver = 6; }
    else if (token === "X7") { pBlank(k, sH); ver = 7; }
    else if (token === "X8") { pBlank(k, sH); ver = 8; }
    else {
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

// ... keep reRoll, aSet, randomInsert, hideWidget, invert, setWpadding, setStripH, window.exposures unchanged
