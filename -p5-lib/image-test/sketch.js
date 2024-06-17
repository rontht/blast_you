let img;

function preload() {
  img = loadImage("bird.jpg");
}

function setup() {
  createCanvas(600,600);
}

function draw() {
  background(127);
  image(img,20,20);
}
