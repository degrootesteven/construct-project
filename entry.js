class Entry{
  constructor(sel, ver, sH){
    this.sel = sel;
    this.ver = ver;

    this.ticker = -sel;
    this.shr = 0;

    this.targetShear;
    this.currentShear = 0;
    this.newShear();

    this.animWindow = 60;

    this.sH = sH;

    this.pg;
    if(ver == 5){
      this.pg = new Cloud(heightRatio[this.sel], this.sH, this.sel);
    } else if(ver == 3){
      this.pg = new Scribble(heightRatio[this.sel], this.sH, this.sel);
    } else if(ver == 6){
      this.pg = new Zigzag(heightRatio[this.sel], this.sH, this.sel);
    } else if(ver == 7){
      this.pg = new Grad(heightRatio[this.sel], this.sH, this.sel);
    } else if(ver == 8){
      this.pg = new Box(heightRatio[this.sel], this.sH, this.sel);
    }
  }

  // entry.js
display(){
if (this.ver === 0) {
  const w = heightRatio[this.sel];
  const h = this.sH;
  const idx = gifIndex[this.sel];

  if (gifEls[idx] && gifEls[idx].elt && gifEls[idx].elt.complete) {
    drawingContext.drawImage(gifEls[idx].elt, 0, -h/2, w, h);
  } else {
    image(pgT[this.sel], 0, -h/2, w, h);
  }
  return;
}



  // ... keep your existing branches
  if (this.ver===3 || this.ver===5 || this.ver===6 || this.ver===7 || this.ver===8){
    push();
    translate(heightRatio[this.sel]/2, 0);
    if (typeof SHAPE_SCALE !== 'undefined') scale(SHAPE_SCALE, SHAPE_SCALE);
    this.pg.display();
    pop();
  } else {
    if (this.ver===9){ this.update(); shearX(this.shr); }
    image(pgT[this.sel], 0, -this.sH/2, heightRatio[this.sel], this.sH);
  }
}


  update(){
    if(this.ticker == this.animWindow){
      this.currentShear = this.targetShear;
      this.newShear();
      this.ticker = 0;
    }

    var animTicker = map(this.ticker, 0, this.animWindow, 0, 1);
    var animValue = map(aSet(animTicker, 8), 0, 1, this.currentShear, this.targetShear);

    this.shr = animValue;

    this.ticker ++;
  }

  newShear(){
    var shearOn = random(10);
    if(shearOn > 7.5){
      this.targetShear = random(-PI/3, PI/3);
    } else {
      this.targetShear = 0;
    }
  }
}
