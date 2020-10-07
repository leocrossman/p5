let songName = `L'Impératrice SÉQUENCES (Parcels remix).mp3`;
let mySound;
let t;

let cols, rows;
let scl = 20;
let terrain;
let flying = 0;
let minHeight = -100;
let maxHeight = -100;
let rColor, gColor, bColor;
let timeThing;

function preload() {
  soundFormats('mp3', 'ogg');
  mySound = loadSound(`../assets/${songName}`);
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  let w = 1000;
  let h = 2000;
  cols = w / scl;
  rows = h / scl;
  // make 2D array for each points z direction (elevation))
  terrain = [];
  for (let i = 0; i < cols; i++) {
    terrain[i] = [];
    for (let j = 0; j < rows; j++) {
      terrain[i][j] = 0;
    }
  }

  background(0);
  // stroke(255);
  noStroke();
  mySound.play();
  amp = new p5.Amplitude();
  fft = new p5.FFT();
  t = 0;
}

function draw() {
  background(0);
  // stroke(255);

  let level = amp.getLevel();
  let size = map(level, 0, 1, 0, width);
  let spectrum = fft.analyze();

  // fly
  flying -= 0.1;
  // create peaks
  let yoff = flying;
  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      // terrain[x][y] = map(spectrum[500], 0, 250, -50, 75);
      // terrain[x][y] = map(noise(xoff, yoff), 0, 1, -50, terrain[x][y]);
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, -150, 150);
      xoff += spectrum[x] * 0.0005;
      // xoff += 0.2;
      // xoff += 0.2;
    }
    // yoff += spectrum[y] * 0.001;
    yoff += 0.2;
  }

  rotateX(PI / 3);
  // rotate(X)
  rotateY(frameCount * 0.015);
  rotateZ(frameCount * 0.01);
  translate(-width / 2, -height / 2 + 300, 300);
  for (let y = 0; y < rows - 1; y++) {
    beginShape(TRIANGLE_STRIP);
    for (let x = 0; x < cols; x++) {
      // stroke(255);
      // noFill();
      rColor = map(level, minHeight, maxHeight, 127, 255);
      bColor = map(x, 0, cols, 127, 255);
      gColor = map(y, 0, rows, 0, 255);

      timeThing = map(frameCount, 0, 20000, 0, 4);

      fill(
        abs(timeThing * rColor),
        abs(timeThing * gColor),
        abs(timeThing * bColor)
      );
      vertex(x * scl, y * scl, terrain[x][y]);
      vertex(x * scl, (y + 1) * scl, terrain[x][y + 1]);
    }
    endShape();
  }
}
