//settings
mutationR = 10;
mutationS = 1;
popsize = 50; //population size
speed = 1;
show = 1;
counter = 0;

//arrays for handeling object/functions
nets = []; //array for handeling the neural networks
bricks = []; //array for handeling bricks

//arrays for next generation
nextgen = []; //neural networks that have a chance for the next generation
newgen = []; //selected networks

average = 0;
record = 0;
generation = 0; //generation counter

function setup() {
  var cnv = createCanvas(920, 520);
  cnv.position((windowWidth / 2) - 460, 300);
  speed = createP('speed');
  speed = createSlider(1, 20000, 1);
  checkbox = createCheckbox('show', true);
  checkbox.changed(myCheckedEvent);
  button = createButton('kill');
  button.position((windowWidth / 2) + (windowWidth / 4), 225);
  button.mousePressed(update);
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
  this.update = function() {
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
      average = 0;
      for (var i = 0; i < nets.length; i++) {
        average += nets[i].fit;
      }
      average /= nets.length;
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
  background(200, 255, 255);
  translate(10, 10);
  button.position((windowWidth / 2) + (windowWidth / 4), 225);
  for (var k = 0; k < speed.value(); k++) {
    if (record < nets[paddle.numb].fit) {
      record = nets[paddle.numb].fit;
    }
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
    nets[paddle.numb].update();
    paddle.update();
    counter++;
    if (counter > 10000000) {
      update();
      counter = 0;
    }
    textSize(20);
    if (ball.y > 500) {
      update();
    }
  }

  if (show == 1) {
    ball.show();
    for (var i = 0; i < bricks.length; i++) {
      bricks[i].show();
    }
    paddle.show();
    fill(0);
    translate(-10, -10);
    fill(51);
    rect(0, 0, 18, 1500);
    rect(920, 0, 18, 1500);
    rect(0, 0, 2000, 18);
    rect(0, 520, 2000, 18);
    translate(10, 10);
  }
  text("generation: " + generation, 0, 410);
  text("genome: " + paddle.numb, 0, 430);
  text("fitness: " + nets[paddle.numb].fit, 0, 450);
  text("average fitness: " + average, 0, 470);
  text("record fitness: " + record, 0, 490);
  drawing = new Drawing(775, 430, 25, nets[paddle.numb]);
  drawing.show();
}

function myCheckedEvent() {
  if (this.checked()) {
    show = 1;
    console.log(show);
  } else {
    show = 0;
    console.log(show);
  }
}

function update() {
  for (var i = bricks.length; i > 0; i--) {
    bricks.splice(0, 1);
  }
  createblocks();
  paddle.numb++;
  ball.x = 450;
  ball.y = 300;
  ball.xdir = random(-4, 4);
  ball.ydir = random(1, 2);
  paddle.x = 450;
  if (paddle.numb > popsize - 1) {
    average = 0;
    for (var i = 0; i < nets.length; i++) {
      average += nets[i].fit;
    }
    average /= nets.length;
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
