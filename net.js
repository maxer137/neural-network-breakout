function Net(genes) {
  this.hiddenam = 5;
  this.outputam = 3;
  this.input = [];
  this.hidden = [];
  this.output = [0];
  this.wages = [];
  this.layers = [0];
  this.fit = 1;

  this.input.push(ball.x / 900);
  this.input.push(ball.y / 500);
  this.input.push(paddle.x / 900);
  this.input.push(ball.xdir / 4);
  this.input.push(ball.ydir / 4);


  if (genes) {
    this.wages = genes;
    for (var i = 0; i < this.input.length; i++) {
      for (var j = 0; j < this.hiddenam; j++) {
        this.layers[0] += 1;
      }
    }
  } else {
    for (var i = 0; i < this.input.length; i++) {
      for (var j = 0; j < this.hiddenam; j++) {
        this.wages.push(random(0, 1));
        this.layers[0] += 1;
      }
    }
    for (var i = 0; i < this.hiddenam; i++) {
      for (var j = 0; j < this.outputam; j++) {
        this.wages.push(random(0, 1));
      }
    }
  }

  this.update = function() {
    for (var i = 0; i < this.hiddenam; i++) {
      this.hidden[i] = 0;
      for (var j = 0; j < this.input.length; j++) {
        this.hidden[i] += (this.input[j] * this.wages[j + (this.input.length * i)]);
      }
      this.hidden[i] /= this.input.length;
    }
    for (var i = 0; i < this.outputam; i++) {
      this.output[i] = 0;
      for (var j = 0; j < this.hidden.length; j++) {
        this.output[i] += (this.hidden[j] * this.wages[j + ((this.hidden.length * i) + this.layers[0])])
      }
      this.output[i] /= this.hidden.length;
    }
    this.input[1] = ball.x / 900;
    this.input[2] = ball.y / 500;
    this.input[3] = paddle.x / 900;
    this.input[3] = ball.xdir / 4;
    this.input[4] = ball.ydir / 4;
  }

  this.mutation = function() {
    for (var i = 0; i < this.wages.length; i++) {
      if (random(1) < mutationR / 1000) {
        this.wages[i] += random(-0.05, 0.05);
        if (this.wages[i] > 1) {
          this.wages[i] = 1;
        } else if (this.wages[i] < 0) {
          this.wages[i] = 0;
        }
      }
    }
  }
}
