// Audiospective by Noah Parsons Corpuz | January 2024

var song;
var fft;
var amp;
var backgroundImage = 0;

function preload() {
  soundFormats('mp3', 'ogg');
  song = loadSound('redbone.mp3');
  
  // change bpm of song for more/less frequently changing visuals
  song.rate(1);

  // change volume of song for larger/smaller expressed visuals
  song.setVolume(0.6);
  
  // set background image - uncomment to 
  //backgroundImage = loadImage('space.jpg');

  getPeaks(windowWidth);

}
 
function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  fft = new p5.FFT();
}

function draw() {

  background(backgroundImage);

  // wave thickness
  strokeWeight(0.5);
  
  // wave colour
  stroke(255);
  //stroke(57, 255, 20);

  noFill();

  // initialize analysis of fft
  fft.analyze();

  // interprete fft aalysis with getEnergy(x, y) - returning an average of frequencies between x & y being played/
  amp = fft.getEnergy(1, 255);

  translate(width / 2, height / 2);

  var wave = fft.waveform();

  /*creating audio-reactive rings that appear based on 'amp' level. 
  The thresholds may be changed for different visual outcomes 
  that greatly vary genre to genre */

  // innermost ring
  for (var t = -1; t<= 1; t+= 2) {
    beginShape() 
    for (var i = 0; i <= 180; i+= 0.5) {
      var index = floor(map(i, 0, 180, 0, wave.length - 1));
      var r = map(wave[index], -1, 1, -150, 350);
      var x = r * sin(i) * t;
      var y = r * cos(i);
      vertex(x, y); 
    }
    endShape(); 
  }

  // middle ring
  if (amp >= 190) {
    for (var t = -1; t<= 1; t+= 2) {
      beginShape() 
      for (var i = 0; i <= 180; i+= 0.5) {
        var index = floor(map(i, 0, 180, 0, wave.length - 1));
        var r = map(wave[index], -1, 1, 150, 350);
        var x = r * sin(i) * t;
        var y = r * cos(i);
        vertex(x, y); 
      }
      endShape(); 
    }
  }

    // outmost ring
    if (amp >= 215) {
      for (var t = -1; t<= 1; t+= 2) {
        beginShape() 
        for (var i = 0; i <= 180; i+= 0.5) {
          var index = floor(map(i, 0, 180, 0, wave.length - 1));
          var r = map(wave[index], -1, 1, 300, 350);
          var x = r * sin(i) * t;
          var y = r * cos(i);
          vertex(x, y); 
        }
        endShape(); 
      }
    }
}

// action listener to pause / play animation + music on click
function mouseClicked() {
  if (song.isPlaying()) {
    song.pause();
    noLoop();
  } else {
    song.play();
    loop();
  }
}