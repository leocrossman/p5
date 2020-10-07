let songName = `HOME - Resonance.mp3`;
let mySound;

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
  rotateZ(frameCount * 0.001);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.1);
  for (let i = 0; i < spectrum.length; i++) {
    let x = map(i, 0, spectrum.length, 0, width);
    let h = -height + map(spectrum[i], 0, 255, height, 0);
    // rect(x, height, width / spectrum.length, h);
    push();
    translate(x / random(-3, 3), x / random(-3, 3), x / random(-3, 3));
    sphere(x / 150);
    pop();
  }

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
