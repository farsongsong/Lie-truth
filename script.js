const handArea = document.getElementById("handArea");
const lights = document.querySelectorAll(".light");
const result = document.getElementById("result");

let audioCtx;

function playBeep(freq, time) {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }

  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = "square";
  osc.frequency.value = freq;
  gain.gain.value = 0.1;

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  osc.start();
  osc.stop(audioCtx.currentTime + time);
}

function startScan() {
  result.textContent = "SCANNING...";
  let index = 0;

  const interval = setInterval(() => {
    lights.forEach(l => l.classList.remove("active"));
    lights[index % lights.length].classList.add("active");

    playBeep(600 + index * 40, 0.1);
    index++;
  }, 200);

  setTimeout(() => {
    clearInterval(interval);
    lights.forEach(l => l.classList.remove("active"));

    const isTruth = Math.random() < 0.5;

    if (isTruth) {
      result.textContent = "TRUTH";
      result.style.color = "green";
      playBeep(400, 0.4);
    } else {
      result.textContent = "LIE";
      result.style.color = "red";
      playBeep(120, 0.6);

      if (navigator.vibrate) {
        navigator.vibrate([300, 100, 300, 100, 500]);
      }
    }
  }, 3000);
}

handArea.addEventListener("touchstart", startScan);
handArea.addEventListener("mousedown", startScan);
