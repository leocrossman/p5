let songName = `Danrell X Smaland - Hostage.mp3`;
let mySound;

let inconsolata;

function preload() {
  soundFormats('mp3', 'ogg');
  mySound = loadSound(`../assets/${songName}`);
  inconsolata = loadFont('../assets/Inconsolata-Medium.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
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
  rotateZ(frameCount * 0.0001);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.1);
  for (let i = 0; i < spectrum.length; i++) {
    let x = map(i, 0, spectrum.length, 0, width);
    let h = -height + map(spectrum[i], 0, 255, height, 0);
    // rect(x, height, width / spectrum.length, h);
    push();
    // translate(x, x);
    // if (frameCount < 400) {
    // translate(sin(x) * frameCount, cos(x) * frameCount);
    translate(sin(exp(x)) * frameCount, cos(exp(x)) * frameCount);
    sphere(x / frameCount);
    // } else {
    //   translate(
    //     sin(x) * lerp(frameCount, frameCount * 0.1, frameCount),
    //     cos(x) * frameCount
    //   );
    //   sphere(x / frameCount);
    // }
    pop();
    push();
    translate(x / sin(x), x / sin(x), x / random(-2, 2));
    // translate(x / random(-2, 2), x / random(-2, 2), x / random(-2, 2));
    sphere(x / 150);
    pop();
  }
  textSize(100);
  text('>:(', 0, 0);

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
