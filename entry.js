class Entry {
  constructor(sel, ver, sH) {
    this.sel = sel;
    this.ver = ver;

    this.ticker = -sel;
    this.shr = 0;

    this.targetShear;
    this.currentShear = 0;
    this.newShear();

    this.animWindow = 60;

    this.sH = sH;

    this.pg = null;
    if (ver === 5) {
      this.pg = new Cloud(heightRatio[this.sel], this.sH, this.sel);
    } else if (ver === 3) {
      this.pg = new Scribble(heightRatio[this.sel], this.sH, this.sel);
    } else if (ver === 6) {
      this.pg = new Zigzag(heightRatio[this.sel], this.sH, this.sel);
    } else if (ver === 7) {
      this.pg = new Grad(heightRatio[this.sel], this.sH, this.sel);
    } else if (ver === 8) {
      this.pg = new Box(heightRatio[this.sel], this.sH, this.sel);
    }
  }

  display() {
    // Shapes (cloud, scribble, zigzag, gradient, box)
    if (this.ver === 3 || this.ver === 5 || this.ver === 6 || this.ver === 7 || this.ver === 8) {
      push();
      translate(heightRatio[this.sel] / 2, 0);
      this.pg.display();
      pop();

    // GIFs
    } else if (this.ver === 0) {
      const gifIndex = this.sel % pImg.length; // cycle through available GIFs
      if (pImg[gifIndex]) {
        image(pImg[gifIndex], 0, -this.sH / 2, heightRatio[this.sel], this.sH);
      }

    // Typography
    } else {
      if (this.ver === 9) {
        this.update();
        shearX(this.shr);
      }
      image(pgT[this.sel], 0, -this.sH / 2, heightRatio[this.sel], this.sH);
    }
  }

  update() {
    if (this.ticker === this.animWindow) {
      this.currentShear = this.targetShear;
      this.newShear();
      this.ticker = 0;
    }

    const animTicker = map(this.ticker, 0, this.animWindow, 0, 1);
    const animValue = map(aSet(animTicker, 8), 0, 1, this.currentShear, this.targetShear);

    this.shr = animValue;
    this.ticker++;
  }

  newShear() {
    const shearOn = random(10);
    if (shearOn > 7.5) {
      this.targetShear = random(-PI / 3, PI / 3);
    } else {
      this.targetShear = 0;
    }
  }
}
