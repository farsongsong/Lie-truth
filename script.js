let running = false;
const result = document.getElementById("result");
const leds = document.getElementById("leds");
const handArea = document.getElementById("hand-area");

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// 소리 생성 함수
function playBeep(freq, duration) {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.frequency.value = freq;
  osc.type = "square";

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  osc.start();
  gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
  osc.stop(audioCtx.currentTime + duration);
}

// 손 올리면 시작
handArea.addEventListener("touchstart", () => {
  if (running) return;
  running = true;

  audioCtx.resume(); // 🔥 모바일 소리 활성화

  result.textContent = "분석 중...";
  leds.classList.add("active");

  playBeep(600, 0.15);
  playBeep(800, 0.15);

  // 분석 시간 길게 (3초)
  setTimeout(() => {
    leds.classList.remove("active");

    const truth = Math.random() < 0.5;

    if (truth) {
      result.textContent = "✅ 진실";
      playBeep(1000, 0.4);
    } else {
      result.textContent = "❌ 거짓말";
      playBeep(200, 0.6);

      // 🔥 진동 세게
      if (navigator.vibrate) {
        navigator.vibrate([300, 100, 300, 100, 500]);
      }
    }

    // 결과 2초 보여주기
    setTimeout(() => {
      result.textContent = "손을 올려주세요";
      running = false;
    }, 2000);

  }, 3000);
});
