const hand = document.getElementById("hand");
const result = document.getElementById("result");

let running = false;

// 소리 생성 (파일 필요 없음)
function playBeep(freq, duration) {
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.frequency.value = freq;
  osc.type = "square";

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  osc.start();
  setTimeout(() => {
    osc.stop();
  }, duration);
}

hand.addEventListener("click", () => {
  if (running) return;
  running = true;

  result.textContent = "분석 중...";
  
  // 빰빠빠빰 느낌
  playBeep(400, 200);
  setTimeout(() => playBeep(600, 200), 250);
  setTimeout(() => playBeep(800, 200), 500);

  setTimeout(() => {
    const isTruth = Math.random() < 0.5;

    if (isTruth) {
      result.textContent = "진실 ✅";
      playBeep(1000, 500);
    } else {
      result.textContent = "거짓 ❌";
      playBeep(200, 600);

      // 안드로이드 진동
      if (navigator.vibrate) {
        navigator.vibrate([300, 100, 300, 100, 300]);
      }
    }

    running = false;
  }, 1200);
});
