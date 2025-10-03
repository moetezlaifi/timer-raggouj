let timerDisplay = document.getElementById("timer");
let startBtn = document.getElementById("startBtn");
let pauseBtn = document.getElementById("pauseBtn");
let resetBtn = document.getElementById("resetBtn");
let bgMusic = document.getElementById("bgMusic");

let totalTime = 90 * 60;
let remainingTime = totalTime;
let timerInterval = null;
let isRunning = false;

function formatTime(seconds) {
  let h = Math.floor(seconds / 3600);
  let m = Math.floor((seconds % 3600) / 60);
  let s = seconds % 60;
  return [h, m, s]
    .map(unit => String(unit).padStart(2, "0"))
    .join(":");
}

function updateDisplay() {
  timerDisplay.textContent = formatTime(remainingTime);
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;

  bgMusic.play();

  timerInterval = setInterval(() => {
    if (remainingTime > 0) {
      remainingTime--;
      updateDisplay();
    } else {
      clearInterval(timerInterval);
      isRunning = false;
      bgMusic.pause();
      bgMusic.currentTime = 0;
      alert("Time is up!");
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timerInterval);
  isRunning = false;
  bgMusic.pause();
}

function resetTimer() {
  clearInterval(timerInterval);
  isRunning = false;
  remainingTime = totalTime;
  updateDisplay();
  bgMusic.pause();
  bgMusic.currentTime = 0;
}

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

updateDisplay();
