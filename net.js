function Net(genes) {
  this.hiddenam = 7;
  this.outputam = 3;
  this.input = [];
  this.hidden = [];
  this.output = [0];
  this.wages = [];
  this.layers = [0];
  this.fit = 1;

  this.input.push(1);
  this.input.push(1);
  this.input.push(1);
  this.input.push(1);
  this.input.push(1);


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
        this.wages.push(random(-1, 1));
        this.layers[0] += 1;
      }
    }
    for (var i = 0; i < this.hiddenam; i++) {
      for (var j = 0; j < this.outputam; j++) {
        this.wages.push(random(-1, 1));
      }
    }
  }

  this.update = function() {
    for (var i = 0; i < this.hiddenam; i++) {
      this.hidden[i] = 0;
      for (var j = 0; j < this.input.length; j++) {
        this.hidden[i] += (this.input[j] * this.wages[j + (this.input.length * i)]);
      }
      this.hidden[i] = this.sigmoid(this.hidden[i]);
    }
    for (var i = 0; i < this.outputam; i++) {
      this.output[i] = 0;
      for (var j = 0; j < this.hidden.length; j++) {
        this.output[i] += (this.hidden[j] * this.wages[j + ((this.hidden.length * i) + this.layers[0])])
      }
      this.output[i] = this.sigmoid(this.output[i]);
    }
    this.hidden[this.hiddenam - 1] = 1;
    this.input[0] = this.sigmoid((ball.x - 460) / width);
    this.input[1] = this.sigmoid((ball.y - 260) / height);
    this.input[2] = this.sigmoid((paddle.x - 460) / width);
    this.input[3] = this.sigmoid(ball.xdir);
    this.input[4] = this.sigmoid(ball.ydir);
    this.input[5] = 1;

  }

  this.sigmoid = function(x) {
    return 1 / (1 + Math.pow(Math.E, -x));
  }

  this.mutation = function() {
    for (var i = 0; i < this.wages.length; i++) {
      if (random(1) < mutationR / 1000) {
        this.wages[i] += random(-0.5, 0.5);
        if (this.wages[i] > 1) {
          this.wages[i] = 1;
        } else if (this.wages[i] < -1) {
          this.wages[i] = -1;
        }
      }
    }
  }
}
