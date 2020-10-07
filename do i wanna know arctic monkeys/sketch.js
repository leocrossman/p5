let songName = `Arctic Monkeys - Do I Wanna Know (Official Video).mp3`;
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
  background(0);
  frameRate(15);
  let level = amp.getLevel();
  let size = map(level, 0, 1, 0, width);
  let spectrum = fft.analyze();

  // translate(-width / 2, -height / 2);
  // noStroke();
  // fill(255, 0, 255);
  // for (let i = 0; i < spectrum.length; i++) {
  //   let x = map(i, 0, spectrum.length, 0, width);
  //   let h = -height + map(spectrum[i], 0, 255, height, 0);
  //   rect(x, height, width / spectrum.length, h);
  // }

  translate(0, -height / 2);
  rotateX(-PI / 8);
  rotateY(-frameCount * 0.01);
  let waveform = fft.waveform();
  noFill();
  beginShape();
  strokeWeight(10);
  stroke(255);
  for (let i = 0; i < waveform.length; i++) {
    let x = map(i, 0, waveform.length, 0, width);
    let y = map(waveform[i], -1, 1, 0, height);
    vertex(x, y);
  }
  endShape();
}
