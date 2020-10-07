let songName = `Flight School - Quicksand (Feat. Libby Larkin) [Radio Edit].m4a`;
let mySound;
let img;
let t;

let inconsolata;

function preload() {
  soundFormats('mp3', 'ogg');
  mySound = loadSound(`../assets/${songName}`);
  inconsolata = loadFont('../assets/Inconsolata-Medium.ttf');
  img = loadImage('../assets/andrewViz.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  frameRate(10);
  background(0);
  mySound.play();
  amp = new p5.Amplitude();
  fft = new p5.FFT();

  textFont(inconsolata);
  textSize(width / 3);
  textAlign(CENTER, CENTER);
}

function draw() {
  lights();
  background(0);

  let level = amp.getLevel();
  let size = map(level, 0, 1, 0, width);
  let spectrum = fft.analyze();

  // translate(-width / 2, -height / 2);
  noStroke();
  // fill(255, 0, 255);
  fill(255, 255, 255);
  rotateZ(frameCount * 0.00015);
  rotateX(frameCount * 0.001);
  rotateY(frameCount * 0.01);
  // rotateZ(frameCount * 0.0001);
  // rotateX(frameCount * 0.01);
  // rotateY(frameCount * 0.1);
  for (let i = 0; i < spectrum.length; i++) {
    let x = map(i, 0, spectrum.length, 0, width);
    let h = -height + map(spectrum[i], 0, 255, height, 0);
    push();
    // translate(x / sin(x), x / cos(x), random(-1000, 1000));
    translate(random(-750, 750), random(-750, 750), random(-750, 750));
    // translate(
    //   random(-frameCount, frameCount),
    //   random(-frameCount, frameCount),
    //   random(-frameCount, frameCount)
    // );
    sphere(x / 1000);
    pop();
  }
  // textSize(100);
  // text('>:(', 0, 0);
  push();
  // rotate(frameCount * 0.00001);
  texture(img);
  box(275);
  // sphere(round(level) * 100);
  pop();
  // image(img, 0, 0);

  // let waveform = fft.waveform();
  // noFill();
  // beginShape();
  // stroke(220);
  // for (let i = 0; i < waveform.length; i++) {
  //   let x = map(i, 0, waveform.length, 0, width);
  //   let y = map(waveform[i], -1, 1, 0, height);
  //   vertex(x, y);
  // }
  // endShape();
}
