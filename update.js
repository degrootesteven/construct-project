function setText() {
  pgT = [];
  pEntry = [];
  heightRatio = [];
  xNudge = [];
  wordCount = [];
  sHarry = [];

  fullHeight = 0;

  const enteredText = document.getElementById("textArea").value;
  keyText = enteredText;
  keyArray = enteredText.split(" ");

  if (!keyArray) keyArray = "";

  randomInsert();

  let lineDist = 0;
  let lineCount = 0;
  let thisWordCount = 0;

  let rSh = random(10);
  let sH = stripH;
  if (rSh > 7.5) {
    sH = stripH / 4;
  } else if (rSh > 5) {
    sH = stripH / 2;
  }

  for (let k = 0; k < keyArray.length; k++) {
    if (lineDist > wWindow) {
      xNudge[lineCount] = lineDist;
      wordCount[lineCount] = thisWordCount;
      sHarry[lineCount] = sH;
      fullHeight += sH;

      lineCount++;
      lineDist = 0;
      thisWordCount = 0;

      rSh = random(10);
      sH = stripH;
      if (rSh > 7.5) {
        sH = stripH / 4;
      } else if (rSh > 5) {
        sH = stripH / 2;
      }
    }

    let ver = 0;

    if (keyArray[k] === "X0") {          // IMAGE (GIF handled in Entry.display)
      ver = 0;

    } else if (keyArray[k] === "X1") {   // SLASHES
      pSlash(k, sH);
      ver = 1;

    } else if (keyArray[k] === "X2") {   // CIRCLES
      pRound(k, sH);
      ver = 2;

    } else if (keyArray[k] === "X3") {   // SCRIBBLE
      pBlank(k, sH);
      ver = 3;

    } else if (keyArray[k] === "X4") {   // BLANKS
      pBlank(k, sH);
      ver = 4;

    } else if (keyArray[k] === "X5") {   // CLOUD
      pBlank(k, sH);
      ver = 5;

    } else if (keyArray[k] === "X6") {   // ZIGZAG
      pBlank(k, sH);
      ver = 6;

    } else if (keyArray[k] === "X7") {   // GRADIENT
      pBlank(k, sH);
      ver = 7;

    } else if (keyArray[k] === "X8") {   // BOXES
      pBlank(k, sH);
      ver = 8;

    } else {
