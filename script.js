const pad = document.getElementById("hand-pad");
const result = document.getElementById("result");
const leds = document.querySelectorAll(".led");

const scanSound = document.getElementById("scan-sound");
const truthSound = document.getElementById("truth-sound");
const lieSound = document.getElementById("lie-sound");

let running = false;
let ledInterval;

function startScan() {
  if (running) return;
  running = true;

  result.textContent = "분석 중...";
  scanSound.currentTime = 0;
  scanSound.play();

  let i = 0;
  ledInterval = setInterval(() => {
    leds.forEach(l => l.style.background = "#222");
    leds[i % leds.length].style.background = "red";
    i++;
  }, 150);

  setTimeout(showResult, 3000); // 분석 시간 길게
}

function showResult() {
  clearInterval(ledInterval);
  leds.forEach(l => l.style.background = "#222");

  const isTruth = Math.random() < 0.5;

  if (isTruth) {
    result.textContent = "진실";
    truthSound.play();
    leds.forEach(l => l.style.background = "lime");
  } else {
    result.textContent = "거짓";
    lieSound.play();
    leds.forEach(l => l.style.background = "red");

    // 안드로이드 진동 세게
    if (navigator.vibrate) {
      navigator.vibrate([300, 100, 300, 100, 500]);
    }
  }

  setTimeout(() => {
    result.textContent = "손을 올려주세요";
    leds.forEach(l => l.style.background = "#222");
    running = false;
  }, 2000);
}

/* 손 올리면 작동 (터치 전용) */
pad.addEventListener("touchstart", startScan);
