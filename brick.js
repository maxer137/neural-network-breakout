function Brick(x, y, r, g, b, score) {
  this.x = x;
  this.y = y;
  this.score = score;

  this.show = function() {
    fill(r, g, b)
    rectMode(CORNER);
    rect(this.x, this.y, 50, 20);
    fill(255);
  }

}
