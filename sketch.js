let sandParticles = [];
let sandAmount = 1000;
let startTime, currentTime, elapsedTime;
let interval;
let timerElement, startButton, stopButton, resetButton, saveButton;

function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < sandAmount; i++) {
    sandParticles.push(new SandParticle());
  }

  timerElement = document.getElementById("timer");
  startButton = document.getElementById("start");
  stopButton = document.getElementById("stop");
  resetButton = document.getElementById("reset");
  saveButton = document.getElementById("save");

  startButton.addEventListener("click", startTimer);
  stopButton.addEventListener("click", stopTimer);
  resetButton.addEventListener("click", resetTimer);
  saveButton.addEventListener("click", saveTime);

  resetTimer();
}

function draw() {
  background(230);

  for (let i = 0; i < sandParticles.length; i++) {
    sandParticles[i].update();
    sandParticles[i].show();
  }
}

function startTimer() {
  if (!interval) {
    startTime = Date.now() - elapsedTime;
    interval = setInterval(updateTimer, 100);
  }
}

function stopTimer() {
  clearInterval(interval);
  interval = null;
}

function resetTimer() {
  stopTimer();
  elapsedTime = 0;
  timerElement.textContent = formatTime(elapsedTime);
}

function saveTime() {
    let savedTimesContainer = document.getElementById("savedTimes");
    let timeElement = document.createElement("p");
    timeElement.textContent = "Tiempo guardado: " + formatTime(elapsedTime);
    savedTimesContainer.appendChild(timeElement);
  }
  
function updateTimer() {
  currentTime = Date.now();
  elapsedTime = currentTime - startTime;
  timerElement.textContent = formatTime(elapsedTime);
}

function formatTime(ms) {
  let totalSeconds = Math.floor(ms / 1000);
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;
  let milliseconds = ms % 1000;

  return `${pad(minutes, 2)}:${pad(seconds, 2)}:${pad(milliseconds, 3)}`;
}

function pad(number, size) {
  let s = String(number);
  while (s.length < (size || 2)) {
    s = "0" + s;
  }
  return s;
}

class SandParticle {
  constructor() {
    this.pos = createVector(width / 2, height / 2);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);

    let gravity = createVector(0, 0.1);
    this.applyForce(gravity);

    if (this.pos.x < width / 2 - 100 || this.pos.x > width / 2 + 100 || this.pos.y < height / 2 - 100 || this.pos.y > height / 2 + 100) {
      this.pos.x = width / 2;
      this.pos.y = height / 2;
      this.vel.mult(0);
    }
  }

  show() {
    fill(255, 215, 0);
    noStroke();
    ellipse(this.pos.x, this.pos.y, 2, 2);
  }
}

