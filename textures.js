// ========================================
// Safe text texture: guards against 0-width,
// missing fonts, and empty strings.
// ========================================
function pgTexture1(inp, typeP, p, sH){
  const safeText = (typeof inp === 'string' && inp.length) ? inp : " ";
  const fontRef  = (tFont && tFont[typeP]) ? tFont[typeP] : (tFont && tFont[0]) || "system-ui";
  const size     = max(2, (pgTextSize|0));  // ensure >= 2px

  // measure on main canvas, then clamp to a minimum width
  push();
  textSize(size);
  textFont(fontRef);
  let repeatSize = round(textWidth(safeText + " "));
  pop();

  repeatSize = max(4, repeatSize);          // avoid 0-width buffers

  // create buffer safely
  pgT[p] = createGraphics(repeatSize, size);
  if (!pgT[p]) {                            // last-ditch fallback for layout
    heightRatio[p] = sH;
    return;
  }

  // draw text to buffer
  pgT[p].clear();
  pgT[p].fill(foreColor);
  pgT[p].noStroke();
  pgT[p].textSize(size);
  pgT[p].textAlign(CENTER);
  pgT[p].textFont(fontRef);
  pgT[p].text(safeText, pgT[p].width/2, pgT[p].height/2 + size*0.7/2);

  // report width for layout
  heightRatio[p] = (pgT[p].width * sH) / pgT[p].height;
}
