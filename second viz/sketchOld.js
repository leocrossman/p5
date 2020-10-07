let songName = `Elohim - Half Love.mp3`;
let mySound;
let level, size, spectrum;

let depth = 20;

function preload() {
  soundFormats('mp3', 'ogg');
  mySound = loadSound(`../assets/${songName}`);
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  background(0);
  mySound.play();
  amp = new p5.Amplitude();
  fft = new p5.FFT();

  noStroke();
}

function draw() {
  background(0);
  lights();
  level = amp.getLevel();
  size = map(level, 0, 1, 0, width);
  spectrum = fft.analyze();
  push();
  translate(0, 0, 0);
  rotateX(frameCount * 0.01);
  // translate(frameCount, 0, 0);
  makeShape();
  // makeBox(depth);
  pop();
}

function makeShape() {
  beginShape();
  vertex(-10, 10, 10);
  vertex(0, 35, 0);
  vertex(10, -10, 10);
  vertex(0, 35, 0);
  vertex(0, 10, 0);
  vertex(0, 35, 35);
  vertex(-10, 10, 10);
  vertex(35, 35, 0);

  endShape();
}

function makeBox(depth) {
  if (depth > 0) {
    depth--;
    push();
    rotateZ(frameCount * 0.001);
    rotateY(frameCount * 0.001);
    translate(frameCount * 0.1, frameCount * 0.1, frameCount * 0.1);
    // fill(random(255), random(255), random(255));
    box(50);
    makeBox(depth);
    pop();
  }
}
