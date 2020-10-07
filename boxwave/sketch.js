let songName = `French 79 - Between the Buttons.mp3`;
let mySound;
let t;

let angle = 0;
let w = 24; // width
let ma; // magic angle
let maxD;

function preload() {
  soundFormats('mp3', 'ogg');
  mySound = loadSound(`../assets/${songName}`);
}

function setup() {
  createCanvas(720, 1280, WEBGL);
  // createCanvas(windowWidth, windowHeight, WEBGL);
  mySound.play();
  amp = new p5.Amplitude();

  fft = new p5.FFT();

  ma = atan(1 / sqrt(2));
  maxD = dist(0, 0, 200, 200);
}

function draw() {
  background(0);

  let level = amp.getLevel();
  let size = map(level, 0, 1, 0, width);
  let spectrum = fft.analyze();

  ortho(-750, 750, -2000, 2000, 0, 2000);
  rotateX(-ma);
  rotateY(-QUARTER_PI);
  // rotateZ(frameCount * 0.001);
  // rotateY(frameCount * 0.01);

  let offset = 0;
  for (let z = 0; z < height; z += w) {
    for (let x = 0; x < width; x += w) {
      push();
      let d = dist(x, z, width / 2, height / 2);
      let offset = map(d, 0, maxD, -PI, PI);
      let a = angle + offset;
      let h = map(sin(a), -1, 1, 50, level * 750 + 300);
      translate(x - width / 2, 0, z - height / 2);
      // ambientMaterial(255);
      normalMaterial();
      box(w - 2, h, w - 2);
      pop();
    }
  }
  angle -= 0.035;
}
