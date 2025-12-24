const handPad = document.getElementById("hand-pad");
const result = document.getElementById("result");
const leds = document.querySelectorAll(".led");

let running = false;

// 🔊 빰빠빠빰 소리 생성
function playSound() {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  let t = ctx.currentTime;

  [440, 554, 659].forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.frequency.value = freq;
    osc.type = "square";
    gain.gain.value = 0.2;

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(t + i * 0.25);
    osc.stop(t + i * 0.25 + 0.2);
  });
}

// 💡 LED 회전 효과
function spinLeds() {
  let index = 0;
  const interval = setInterval(() => {
    leds.forEach(l => l.style.background = "#333");
    leds[index].style.background = "red";
    index = (index + 1) % leds.length;
  }, 150);

  setTimeout(() => {
    clearInterval(interval);
    leds.forEach(l => l.style.background = "#333");
  }, 2000);
}

// 📳 진동
function vibrateStrong() {
  if (navigator.vibrate) {
    navigator.vibrate([400, 100, 400]);
  }
}

// ▶ 실행
handPad.addEventListener("touchstart", start);
handPad.addEventListener("mousedown", start);

function start() {
  if (running) return;
  running = true;

  result.textContent = "분석 중...";
  playSound();
  spinLeds();

  setTimeout(() => {
    const truth = Math.random() < 0.5;

    if (truth) {
      result.textContent = "✅ 진실";
    } else {
      result.textContent = "❌ 거짓";
      vibrateStrong();
    }

    setTimeout(() => {
      result.textContent = "손을 올리세요";
      running = false;
    }, 2000);

  }, 2000);
}
