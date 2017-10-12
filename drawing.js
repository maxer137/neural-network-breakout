function Drawing(x, y, size, nets) {
  this.x = x;
  this.y = y;
  this.s = size;
  this.net = nets;

  from = color(255, 0, 0);
  to = color(0, 255, 0);

  this.show = function() {
    for (var i = 0; i < this.net.input.length; i++) {
      for (var j = 0; j < this.net.hidden.length; j++) {
        push();
        stroke(lerpColor(from, to, this.net.wages[j + i * this.net.hidden.length] + 1));
        //stroke((this.net.wages[j + i * this.net.hidden.length] + 1) * 127.5);
        line(this.x, this.y + (i * size) - (this.net.input.length / 2) * this.s, this.x + size * 2, this.y + (j * size) - (this.net.hidden.length / 2) * this.s);
        pop();
      }
    }
    for (var i = 0; i < this.net.hidden.length; i++) {
      for (var j = 0; j < this.net.output.length; j++) {
        push();
        stroke(lerpColor(from, to, this.net.wages[(j + i * this.net.output.length) + this.net.input.length * this.net.hidden.length] + 1));
        line(this.x + size * 2, this.y + (i * size) - (this.net.hidden.length / 2) * this.s, this.x + size * 4, this.y + (j * size) - (this.net.output.length / 2) * this.s);
        pop();
      }
    }
    for (var i = 0; i < this.net.input.length; i++) {
      push();
      fill(this.net.input[i] * 255);
      ellipse(this.x, this.y + (i * size) - (this.net.input.length / 2) * this.s, this.s, this.s);
      pop();
    }
    for (var i = 0; i < this.net.hidden.length; i++) {
      push();
      fill(this.net.hidden[i] * 255);
      ellipse(this.x + size * 2, this.y + (i * size) - (this.net.hidden.length / 2) * this.s, this.s, this.s);
      pop();
    }
    for (var i = 0; i < this.net.output.length; i++) {
      push();
      fill(this.net.output[i] * 255);
      ellipse(this.x + size * 4, this.y + (i * size) - (this.net.output.length / 2) * this.s, this.s, this.s);
      pop();
    }
  }
}
