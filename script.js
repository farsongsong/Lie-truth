let running = false;

const screen = document.getElementById("screen");
const handArea = document.getElementById("hand-area");

const AudioCtx = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioCtx();

// 분석 중 소리 (빰빠빠빰)
function analysisSound() {
  let time = audioCtx.currentTime;
  for (let i = 0; i < 6; i++) {
    const osc = audioCtx.createOscillator();
    osc.frequency.value = 400 + i * 80;
    osc.connect(audioCtx.destination);
    osc.start(time + i * 0.25);
    osc.stop(time + i * 0.25 + 0.15);
  }
}

// 결과 소리
function resultSound(isLie) {
  const osc = audioCtx.createOscillator();
  osc.frequency.value = isLie ? 120 : 800;
  osc.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.6);
}

// 손 올리면 시작 (터치 인식)
handArea.addEventListener("touchstart", startDetector);
handArea.addEventListener("mousedown", startDetector);

function startDetector() {
  if (running) return;
  running = true;

  screen.textContent = "분석 중...";
  screen.style.color = "#ff0";
  analysisSound();

  setTimeout(() => {
    const isLie = Math.random() < 0.5;

    if (isLie) {
      screen.textContent = "거짓";
      screen.style.color = "red";
      resultSound(true);

      if (navigator.vibrate) {
        navigator.vibrate([300, 100, 300, 100, 300]);
      }
    } else {
      screen.textContent = "진실";
      screen.style.color = "#0f0";
      resultSound(false);
    }

    setTimeout(() => {
      screen.textContent = "손을 올리세요";
      screen.style.color = "#0f0";
      running = false;
    }, 2000);

  }, 3000); // 분석 시간 3초
}
