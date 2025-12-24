const handPad = document.getElementById("hand-pad");
const resultText = document.getElementById("result");
const screen = document.getElementById("screen");

let running = false;

/* ===== 소리 생성 ===== */
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

function beep(freq, duration) {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.frequency.value = freq;
  osc.connect(gain);
  gain.connect(audioCtx.destination);

  osc.start();
  gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(
    0.001,
    audioCtx.currentTime + duration
  );
  osc.stop(audioCtx.currentTime + duration);
}

/* 빰빠빠빰 */
function startSound() {
  beep(400, 0.15);
  setTimeout(() => beep(500, 0.15), 200);
  setTimeout(() => beep(600, 0.3), 400);
}

/* ===== 실행 ===== */
function startDetector() {
  if (running) return;
  running = true;

  resultText.textContent = "분석 중...";
  screen.classList.add("scanning");
  startSound();

  setTimeout(() => {
    const isTruth = Math.random() < 0.5;

    screen.classList.remove("scanning");

    if (isTruth) {
      resultText.textContent = "✅ 진실";
      beep(800, 0.4);
    } else {
      resultText.textContent = "❌ 거짓";
      beep(200, 0.6);

      // 🔥 강한 진동 (안드로이드)
      if (navigator.vibrate) {
        navigator.vibrate([300, 100, 300, 100, 500]);
      }
    }

    setTimeout(() => {
      resultText.textContent = "손을 올려주세요";
      running = false;
    }, 2000);
  }, 2000);
}

/* ===== 손 올리면 자동 시작 ===== */
handPad.addEventListener("touchstart", () => {
  audioCtx.resume(); // 모바일 사운드 허용
  startDetector();
});
