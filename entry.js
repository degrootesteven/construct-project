const SHAPE_VERSIONS = new Set([3, 5, 6, 7, 8]);
const SHAPE_BUILDERS = {
  3: (...args) => new Scribble(...args),
  5: (...args) => new Cloud(...args),
  6: (...args) => new Zigzag(...args),
  7: (...args) => new Grad(...args),
  8: (...args) => new Box(...args),
};

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
    const ShapeBuilder = SHAPE_BUILDERS[ver];
    if (ShapeBuilder) {
      this.pg = ShapeBuilder(heightRatio[this.sel], this.sH, this.sel);
    }
  }

  display() {
    // Shapes (cloud, scribble, zigzag, gradient, box)
    if (SHAPE_VERSIONS.has(this.ver)) {
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
