//settings
popsize = 50; //population size
speed = 1;
mutationR = 10;

//arrays for handeling object/functions
nets = []; //array for handeling the neural networks
bricks = []; //array for handeling bricks

//arrays for next generation
nextgen = []; //neural networks that have a chance for the next generation
newgen = []; //selected networks

generation = 0; //generation counter

function setup() {
  createCanvas(900, 500);
  createP('speed');
  speed = createSlider(1, 1000, 1);
  this.createblocks = function() {
    for (var i = 0; i < 18; i++) {
      brick = new Brick(50 * i, 50, 255, 0, 0, 320);
      bricks.push(brick);
    }
    for (var i = 0; i < 18; i++) {
      brick = new Brick(50 * i, 70, 255, 155, 0, 160);
      bricks.push(brick);
    }
    for (var i = 0; i < 18; i++) {
      brick = new Brick(50 * i, 90, 255, 255, 0, 80);
      bricks.push(brick);
    }
    for (var i = 0; i < 18; i++) {
      brick = new Brick(50 * i, 110, 0, 255, 0, 40);
      bricks.push(brick);
    }
    for (var i = 0; i < 18; i++) {
      brick = new Brick(50 * i, 130, 0, 125, 255, 20);
      bricks.push(brick);
    }
  }
  this.createblocks();
  population = new Population();
  paddle = new Paddle(450, 450);
  ball = new Ball(450, 300);
  for (var i = 0; i < popsize; i++) {
    net = new Net();
    nets.push(net);
  }
}

function draw() {
  background(51);
  for (var k = 0; k < speed.value(); k++) {
    for (var i = 0; i < bricks.length; i++) {
      if (ball.x < bricks[i].x + 50 && ball.x > bricks[i].x && ball.y < bricks[i].y + 20 && ball.y > bricks[i].y) {
        if (ball.y < bricks[i].y + 20 + ball.ydir && ball.y > bricks[i].y + ball.ydir) {
          ball.xdir *= -1;
        } else {
          ball.ydir *= -1;
        }
        nets[paddle.numb].fit += bricks[i].score;
        bricks.splice(i, 1);
      }
    }
    ball.check();
    for (var i = 0; i < nets.length; i++) {
      nets[i].update();
    }
    paddle.update();
    textSize(20);
    if (ball.y > 500) {
      for (var i = bricks.length; i > 0; i--) {
        bricks.splice(0, 1);
      }
      this.createblocks();
      paddle.numb++;
      ball.x = 450;
      ball.y = 300;
      ball.xdir = random(-4, 4);
      ball.ydir = random(1, 2);
      paddle.x = 450;
      if (paddle.numb > popsize - 1) {
        generation++;
        paddle.numb = 0;
        for (var i = 0; i < nets.length; i++) {
          for (var j = 0; j < nets[i].fit; j++) {
            nextgen.push(nets[i]);
          }
        }
        population.selection();
        nets = newgen;
      }
    }
  }
  ball.show();
  for (var i = 0; i < bricks.length; i++) {
    bricks[i].show();
  }
  paddle.show();
  text("generation: " + generation, 0, 450);
  text("genome: " + paddle.numb, 0, 470);
  text("fitness: " + nets[paddle.numb].fit, 0, 490);
}
