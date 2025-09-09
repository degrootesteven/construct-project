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

  const GIF_RATIO = 1.6; // width = ratio * sH; tweak to taste
  const wrapWidth = max(1, wWindow); // guard

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
