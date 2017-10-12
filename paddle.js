function Paddle(x, y) {
  this.x = x;
  this.y = y;
  this.dir = 1;
  this.numb = 0;
  this.best = 0;
  this.bestn;

  this.show = function() {
    rectMode(CENTER);
    rect(this.x, this.y, 100, 10);
  }
  this.update = function() {
    for (var i = 0; i < 2; i++) {
      if (this.best < nets[this.numb].output[i]) {
        this.best = nets[this.numb].output[i]
        this.bestn = i;
      }
    }
    if (this.bestn < 0.5) {
      this.x += 20 * nets[this.numb].output[2];
      this.best = 0;
    } else if (this.bestn = 1) {
      this.x -= 20 * nets[this.numb].output[2];
      this.best = 0;
    }
  }
}
