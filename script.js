const machine = document.getElementById("machine");
const lights = document.querySelectorAll(".light");
const result = document.getElementById("result");

let running = false;

// 🔊 소리 생성 (파일 필요 없음)
function playSound() {
  const ctx = new AudioContext();
  const osc = ctx.createOscillator();
  osc.type = "square";
  osc.frequency.setValueAtTime(600, ctx.currentTime);
  osc.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.15);
}

// 📳 진동
function vibrate(strength = 200) {
  if (navigator.vibrate) {
    navigator.vibrate(strength);
  }
}

// 🎰 시작
machine.addEventListener("click", () => {
  if (running) return;
  running = true;
  result.textContent = "SCANNING...";

  let index = 0;
  const interval = setInterval(() => {
    lights.forEach(l => l.style.background = "#333");
    lights[index % lights.length].style.background = "yellow";

    playSound();
    index++;

    if (index > 12) {
      clearInterval(interval);
      finish();
    }
  }, 200);
});

// 🎯 결과
function finish() {
  const truth = Math.random() < 0.5;

  lights.forEach(l => l.style.background = truth ? "green" : "red");
  result.textContent = truth ? "TRUTH" : "LIE";

  if (!truth) vibrate([200, 100, 200, 100, 400]);

  running = false;
}
