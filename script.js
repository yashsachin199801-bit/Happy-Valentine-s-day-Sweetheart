const yesZone = document.getElementById("yesZone");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const noZone = document.getElementById("noZone");
const attemptsText = document.getElementById("attempts");

const gameScreen = document.getElementById("gameScreen");
const finalScreen = document.getElementById("finalScreen");

const audio = document.getElementById("loveAudio");
const slideshowImg = document.getElementById("slideshow");

let attemptsLeft = 10;
let yesWidth = 140;
let yesHeight = 60;

const noTexts = [
  "Think again Megha 🤨",
  "Really? 😐",
  "Are you sure? 😳",
  "Dil se socho ❤️",
  "Mat bhaago 😅",
  "Last chance 😬",
  "Btau Abhi 😏",
  "Ghoosa Pad jayega 😈",
  "Na Mano 😳",
  "Bas Megha 😌"
];

let slideIndex = 0;
let slideshowInterval = null;

/* NO BUTTON LOGIC */
noBtn.addEventListener("click", () => {
  attemptsLeft--;
  attemptsText.textContent = `Attempts left: ${attemptsLeft} / 10`;

  const index = 10 - attemptsLeft - 1;
  if (noTexts[index]) {
    noBtn.textContent = noTexts[index];
  }

  if (attemptsLeft <= 0) {
    noBtn.style.display = "none";
    return;
  }

  const zoneRect = noZone.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  const maxX = zoneRect.width - btnRect.width;
  const maxY = zoneRect.height - btnRect.height;

  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  noBtn.style.position = "absolute";
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;

  // Grow YES safely
  const maxWidth = window.innerWidth * 0.9;
  if (yesWidth < maxWidth) yesWidth += 20;
  if (yesHeight < 140) yesHeight += 10;

  yesZone.style.width = `${yesWidth}px`;
  yesZone.style.height = `${yesHeight}px`;
});

/* YES BUTTON LOGIC */
yesBtn.addEventListener("click", () => {
  // Audio: user-initiated, plays once
  if (audio.paused) {
    audio.play().catch(() => {});
  }

  // Confetti with delay (mobile-safe)
  setTimeout(() => {
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, 300);

  // Screen transition
  gameScreen.classList.add("hidden");
  finalScreen.classList.remove("hidden");

  startSlideshow();
});

/* SLIDESHOW */
function startSlideshow() {
  if (slideshowInterval) return;

  slideshowInterval = setInterval(() => {
    slideIndex = (slideIndex + 1) % 4;
    slideshowImg.src = `megha${slideIndex + 1}.jpg`;
  }, 2500);
}
