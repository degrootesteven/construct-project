function setText(){
  pgT = []; pEntry = []; heightRatio = []; xNudge = []; wordCount = []; sHarry = [];
  fullHeight = 0;

  const el = document.getElementById("textArea");
  const enteredText = (el && el.value) ? el.value : "";
  keyText = enteredText;
  keyArray = enteredText.trim() ? enteredText.split(" ") : [];

  randomInsert();

  let lineDist = 0, lineCount = 0, thisWordCount = 0;

  // pick initial strip height
  let rSh = random(10);
  let sH = stripH;
  if (rSh > 7.5) sH = stripH/4;
  else if (rSh > 5) sH = stripH/2;

  for (let k = 0; k < keyArray.length; k++) {

    // wrap to new line
    if (lineDist > wWindow){
      xNudge[lineCount]    = lineDist;
      wordCount[lineCount] = thisWordCount;

      // base vertical padding + jitter
      let padY = LINE_PAD + random(-LINE_PAD*PAD_JITTER, LINE_PAD*PAD_JITTER);
      sHarry[lineCount]    = sH + padY;
      fullHeight          += sHarry[lineCount];

      lineCount++; lineDist = 0; thisWordCount = 0;

      rSh = random(10);
      sH = stripH;
      if (rSh > 7.5) sH = stripH/4;
      else if (rSh > 5) sH = stripH/2;
    }

    // determine token type
    let ver = 0;
    const token = keyArray[k];

    if      (token === "X0"){ pgImage(k, sH); ver = 0; }
    else if (token === "X1"){ pSlash(k, sH);  ver = 1; }
    else if (token === "X2"){ pRound(k, sH);  ver = 2; }
    else if (token === "X3"){ pBlank(k, sH);  ver = 3; }
    else if (token === "X4"){ pBlank(k, sH);  ver = 4; }
    else if (token === "X5"){ pBlank(k, sH);  ver = 5; }
    else if (token === "X6"){ pBlank(k, sH);  ver = 6; }
    else if (token === "X7"){ pBlank(k, sH);  ver = 7; }
    else if (token === "X8"){ pBlank(k, sH);  ver = 8; }
    else {
      const rFont = random(10);
      if (rFont < 8) pgTexture1(token, 0, k, sH);
      else           pgTexture1(token, typeToggle, k, sH);
      ver = 9;
    }

    thisWordCount++;

    // base horizontal padding + jitter
    let padX = WORD_PAD + random(-WORD_PAD*PAD_JITTER, WORD_PAD*PAD_JITTER);
    lineDist += heightRatio[k] + padX;

    // randomize height scale (shapes only)
    const shrink = (ver === 9) ? 1 : SHAPE_SCALE;
    const sizeJitter = 1 + random(-SIZE_JITTER, SIZE_JITTER);
    const entryH = Math.max(8, sH * shrink * sizeJitter);

    pEntry[k] = new Entry(k, ver, entryH);
  }

  // finalize last line
  xNudge[lineCount]    = lineDist;
  wordCount[lineCount] = thisWordCount;
  let padY = LINE_PAD + random(-LINE_PAD*PAD_JITTER, LINE_PAD*PAD_JITTER);
  sHarry[lineCount]    = sH + padY;
  fullHeight          += sHarry[lineCount];
}

    // decide token type
    let ver = 0;
    const token = keyArray[k];

    if      (token === "X0"){ pgImage(k, sH);      ver = 0; }  // GIF strip
    else if (token === "X1"){ pSlash(k, sH);       ver = 1; }
    else if (token === "X2"){ pRound(k, sH);       ver = 2; }
    else if (token === "X3"){ pBlank(k, sH);       ver = 3; }
    else if (token === "X4"){ pBlank(k, sH);       ver = 4; }
    else if (token === "X5"){ pBlank(k, sH);       ver = 5; }
    else if (token === "X6"){ pBlank(k, sH);       ver = 6; }
    else if (token === "X7"){ pBlank(k, sH);       ver = 7; }
    else if (token === "X8"){ pBlank(k, sH);       ver = 8; }
    else {
      const rFont = random(10);
      if (rFont < 8) pgTexture1(token, 0, k, sH);
      else           pgTexture1(token, typeToggle, k, sH);
      ver = 9; // text
    }

    thisWordCount++;

    // advance cursor with horizontal padding
    const padX = (typeof WORD_PAD !== 'undefined') ? WORD_PAD : 0;
    lineDist += heightRatio[k] + padX;

    // shrink non-text shapes to reduce overlap
    const shrink = (typeof SHAPE_SCALE !== 'undefined') ? SHAPE_SCALE : 1;
    const entryH = (ver === 9) ? sH : Math.max(8, sH * shrink);
    pEntry[k] = new Entry(k, ver, entryH);
  }

  // push the last line
  xNudge[lineCount]    = lineDist;
  wordCount[lineCount] = thisWordCount;
  const padY = (typeof LINE_PAD !== 'undefined') ? LINE_PAD : 0;
  sHarry[lineCount]    = sH + padY;
  fullHeight          += sHarry[lineCount];
}


  randomInsert();

  var lineDist = 0;
  var lineCount = 0;
  var thisWordCount = 0;

  var rSh = random(10);
  var sH = stripH;
  if(rSh>7.5){
    sH = stripH/4;
  } else if(rSh>5){
    sH = stripH/2;
  }

  for(var k = 0; k<keyArray.length; k++){

    if(lineDist > wWindow){
      xNudge[lineCount] = lineDist;
      wordCount[lineCount] = thisWordCount;
      sHarry[lineCount] = sH;
      fullHeight += sH;

      lineCount ++;
      lineDist = 0;
      thisWordCount = 0;

      var rSh = random(10);

      sH = stripH;
      if(rSh>7.5){
        sH = stripH/4;
      } else if(rSh>5){
        sH = stripH/2;
      }
    }

    var ver = 0;

    if(keyArray[k] == "X0"){  // IMAGE
      pgImage(k, sH);
      ver = 0;
    } else if(keyArray[k] == "X1"){  // SLASHES
      pSlash(k, sH);
      ver = 1;
    } else if(keyArray[k] == "X2"){  // CIRCLES
      pRound(k, sH);
      ver = 2;
    } else if(keyArray[k] == "X3"){  // SCRIBBLE
      pBlank(k, sH);
      ver = 3;
    } else if(keyArray[k] == "X4"){  // BLANKS
      pBlank(k, sH);
      ver = 4;
    } else if(keyArray[k] == "X5"){  // CLOUD
      pBlank(k, sH);
      ver = 5;
    } else if(keyArray[k] == "X6"){  // ZIGZAG
      pBlank(k, sH);
      ver = 6;
    } else if(keyArray[k] == "X7"){  // GRADIENT
      pBlank(k, sH);
      ver = 7;
    } else if(keyArray[k] == "X8"){  // BOXES
      pBlank(k, sH);
      ver = 8;
    } else {
      var rFont = random(10);
      if(rFont < 8){
        pgTexture1(keyArray[k], 0, k, sH);
      } else {
        pgTexture1(keyArray[k], typeToggle, k, sH);
      }
      ver = 9;
    }

    thisWordCount ++;
    lineDist += heightRatio[k];

    pEntry[k] = new Entry(k, ver, sH);
  }

  xNudge[lineCount] = lineDist;
  wordCount[lineCount] = thisWordCount;
  sHarry[lineCount] = sH;
  fullHeight += sH;
}

function reRoll(){
  typeToggle = round(random(1,2));

  setText();
}

function aSet(ticker, influ){          // takes a 0 - 1 and returns an eased 0 - 1
  var capTicker = ticker%1;

  var targetPoint = pow(capTicker,influ)/(pow(capTicker,influ) + pow(1-capTicker,influ));
  return targetPoint;
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
  const DG = (typeof GIF_DENSITY   !== 'undefined') ? GIF_DENSITY   : 1.0; // new knob

  // ↑ bump GIFs: raise the base, use GIF_DENSITY to fine-tune
  add(Math.max(1, Math.round((2 + Math.floor(words/10)) * D * DG)), "X0");

  // keep the others
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
  if(widgetOn==true){
    document.getElementById('widget').style.display = "block";
  } else {
    document.getElementById('widget').style.display = "none";
  }
}

function invert(){
  inverter = !inverter;
  if (inverter) {
    bkgdColor = color('#ffffff');
    foreColor = color('#000000');
    colorA[4] = bkgdColor;
    pImg[6] = loadImage("construct/resources/gifs/6.gif");
  } else {
    bkgdColor = color('#000000');
    foreColor = color('#ffffff');
    colorA[4] = bkgdColor;
    pImg[6] = loadImage("construct/resources/gifs/6.gif");
  }
  pGradientH();
  pGradientV();
  pGradientCH();
  setText();
}

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
