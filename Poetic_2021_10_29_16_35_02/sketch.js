let impression = [];

function setup() {
  createCanvas(600, 600);

}

function mousePressed() {
  let p = new Impression(mouseX, mouseY, random(2,4));
  impression.push(p);
}

function draw() {
  background(255,30);

  fill(0);
  noStroke();
  if(mouseIsPressed){
    ellipse (width/2,height/2,400);
  } else {
    ellipse (width/2,height/2,300);
  }
  for(let i = 0; i < impression.length; i++){
    let fall = createVector(0, 0.2*impression[i].mass);
    impression[i].applyForce(fall);

  impression[i].update();
  impression[i].show();
  impression[i].edges();

  }
}

function Impression(x, y, m) {
  this.pos = createVector(x, y);
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);
  this.mass = m;

  this.applyForce = function(force) {
    let f = force.copy();
    f.div(this.mass);
    this.acc.add(f);
  }

  this.update = function() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);

    this.acc.set(0,0);
  }

  this.show = function() {
    fill(random(0,255),random(0,5),random(0,255),90);
    ellipse(this.pos.x, this.pos.y, this.mass*10, this.mass*10);


  }

  this.edges = function() {
    if (this.pos.y > height) {
      this.vel.y *= -0.5;
      this.pos.y = height;
    }

    if (this.pos.x > width) {
      this.vel.x *= -0.1;
      this.pos.x = width;
    }
  }
}
