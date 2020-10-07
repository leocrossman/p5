let songName = `Flight School - Quicksand (Feat. Libby Larkin) [Radio Edit].m4a`;
let mySound;

function preload() {
  soundFormats('mp3', 'ogg', 'm4a');
  mySound = loadSound(`../assets/${songName}`);
  inconsolata = loadFont('../assets/Inconsolata-Medium.ttf');
}

let yoff = 0.0; // 2nd dimension of perlin noise

function setup() {
  createCanvas(windowWidth, windowHeight);
  // stroke(255);
  // strokeWeight(20);
  strokeWeight(60);

  mySound.play();
  amp = new p5.Amplitude();
  fft = new p5.FFT();
}

function draw() {
  background(50, 15, 127);

  let level = amp.getLevel();
  let size = map(level, 0, 1, 0, width);
  let spectrum = fft.analyze();

  // for (let i = 0; i < 50; i++) {
  for (let i = 0; i < 25; i++) {
    // stroke(209, 92, 71);
    stroke(i * 5 + 200, i * 2, i * 8);
    push();
    // translate()
    // rotate((PI / i) * 0.1);
    rotate(PI / 20);
    // fill(71, 38, 181);
    fill(i * 3 + 50, i * 2 + 15, i * 5 + 127);
    // We are going to draw a polygon out of the wave points
    beginShape();

    let xoff = 0; // Option #1: 2D Noise
    // let xoff = yoff; // Option #2: 1D Noise

    // Iterate over horizontal pixels
    for (let x = -1000; x <= width + 200; x += 10) {
      // Calculate a y value according to noise, map to

      // Option #1: 2D Noise
      let y = map(noise(xoff, yoff), 0, 1, -400, -250);

      // Option #2: 1D Noise
      // let y = map(noise(xoff), 0, 1, 200, 300);

      // Set the vertex
      vertex(x + i * 20, y + i * 125);
      // Increment x dimension for noise
      xoff += 0.05;
    }
    // increment y dimension for noise
    yoff += 0.01;
    vertex(width, height);
    vertex(0, height);
    endShape(CLOSE);
    pop();
  }
}
