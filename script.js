const handArea = document.getElementById("handArea");
const dotsContainer = document.getElementById("dots");

let running = false;

// Web Audio (소리 생성)
const AudioCtx = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioCtx();

function beep(freq, time) {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.frequency.value = freq;
  osc.type = "square";
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + time);
  osc.stop(audioCtx.currentTime + time);
}

function playBampabam() {
  beep(400, 0.2);
  setTimeout(() => beep(500, 0.2), 250);
  setTimeout(() => beep(600, 0.3), 500);
}

// 점 애니메이션
function animateDots() {
  dotsContainer.innerHTML = "";
  for (let i = 0; i < 7; i++) {
    const d = document.createElement("div");
    d.className = "dot";
    dotsContainer.appendChild(d);
  }

  const dots = document.querySelectorAll(".dot");
  let i = 0;
  const interval = setInterval(() => {
    dots.forEach(dot => dot.style.background = "gray");
    dots[i].style.background = "yellow";
    i++;
    if (i >= dots.length) i = 0;
  }, 150);

  return interval;
}

// 시작
function startTest() {
  if (running) return;
  running = true;
  handArea.textContent = "측정 중...";

  audioCtx.resume();
  playBampabam();

  const anim = animateDots();

  setTimeout(() => {
    clearInterval(anim);
    dotsContainer.innerHTML = "";

    const isTruth = Math.random() < 0.5;

    handArea.textContent = isTruth ? "진실입니다 ✅" : "거짓입니다 ❌";

    if (!isTruth && navigator.vibrate) {
      navigator.vibrate([300, 100, 300, 100, 500]);
    }

    running = false;
  }, 3000);
}

handArea.addEventListener("click", startTest);
handArea.addEventListener("touchstart", startTest);
