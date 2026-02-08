/* QUIZ FLOW */
const quizzes = [
  { screen: "quiz1", next: "quiz2" },
  { screen: "quiz2", next: "quiz3" },
  { screen: "quiz3", next: "gameScreen" }
];

quizzes.forEach(({ screen, next }) => {
  const container = document.getElementById(screen);
  const msg = container.querySelector(".msg");
  const options = container.querySelectorAll(".opt");

  options.forEach(btn => {
    btn.addEventListener("click", () => {
      if (btn.classList.contains("correct")) {
        container.classList.add("hidden");
        document.getElementById(next).classList.remove("hidden");
      } else {
        msg.textContent = "Hehe… dobara socho 😜";
      }
    });
  });
});

/* GAME LOGIC */
const yesZone = document.getElementById("yesZone");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const noZone = document.getElementById("noZone");
const attemptsText = document.getElementById("attempts");
const audio = document.getElementById("loveAudio");
const finalScreen = document.getElementById("finalScreen");
const gameScreen = document.getElementById("gameScreen");
const slideshowImg = document.getElementById("slideshow");

let attemptsLeft = 10;
let yesW = 140;
let yesH = 60;

const noTexts = [
  "Think again Megha 🤨","Really? 😐","Are you sure? 😳","Dil se socho ❤️",
  "Mat bhaago 😅","Last chance 😬","Btau Abhi 😏","Ghoosa Pad jayega 😈",
  "Na Mano 😳","Bas Megha 😌"
];

noBtn.addEventListener("click", () => {
  attemptsLeft--;
  attemptsText.textContent = `Attempts left: ${attemptsLeft} / 10`;
  noBtn.textContent = noTexts[10 - attemptsLeft - 1] || noBtn.textContent;

  if (attemptsLeft <= 0) {
    noBtn.style.display = "none";
    return;
  }

  const zone = noZone.getBoundingClientRect();
  const btn = noBtn.getBoundingClientRect();

  noBtn.style.position = "absolute";
  noBtn.style.left = `${Math.random() * (zone.width - btn.width)}px`;
  noBtn.style.top = `${Math.random() * (zone.height - btn.height)}px`;

  if (yesW < window.innerWidth * 0.9) yesW += 20;
  if (yesH < 140) yesH += 10;
  yesZone.style.width = `${yesW}px`;
  yesZone.style.height = `${yesH}px`;
});

yesBtn.addEventListener("click", () => {
  if (audio.paused) audio.play().catch(() => {});

  setTimeout(() => {
    confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
  }, 300);

  gameScreen.classList.add("hidden");
  finalScreen.classList.remove("hidden");

  let i = 0;
  setInterval(() => {
    i = (i + 1) % 4;
    slideshowImg.src = `megha${i + 1}.jpg`;
  }, 2500);
});
