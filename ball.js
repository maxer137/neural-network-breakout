function Ball(x, y) {
  this.x = x;
  this.y = y;
  this.xdir = random(-4, 4);
  this.ydir = random(1, 2);

  this.show = function() {
    fill(255);
    ellipseMode(CENTER);
    ellipse(this.x, this.y, 10, 10);
  }
  this.check = function() {
    this.x += this.xdir;
    this.y += this.ydir;
    if (dist(this.x, 0, paddle.x, 0) < 50 && this.y > 440 && this.y < 450) {
      this.ydir = -5 + (dist(this.x, 0, paddle.x, 0) / 15);
      if (this.x > paddle.x) {
        this.xdir = (dist(this.x, 0, paddle.x, 0) / 20) + random(-0.5, 0.5);
      } else {
        this.xdir = -1 * (dist(this.x, 0, paddle.x, 0) / 20) + random(-0.5, 0.5);
      }
    }
    if (this.x > 895) {
      this.xdir *= -1;
    }
    if (this.y < 5) {
      this.ydir *= -1;
    }
    if (this.x < 5) {
      this.xdir *= -1;
    }
  }
}
