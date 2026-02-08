const yesZone = document.getElementById("yesZone");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const noZone = document.getElementById("noZone");
const attemptsText = document.getElementById("attempts");
const gameScreen = document.getElementById("gameScreen");
const finalScreen = document.getElementById("finalScreen");
const music = document.getElementById("music");

const slideImage = document.getElementById("slideImage");

const images = [
  "megha1.jpg",
  "megha2.jpg",
  "megha3.jpg",
  "megha4.jpg"
];

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

let noClicks = 0;
let slideIndex = 0;
let slideshowStarted = false;

/* -------- NO BUTTON LOGIC -------- */

noBtn.addEventListener("click", () => {
  if (noClicks >= 10) return;

  noBtn.innerText = noTexts[noClicks];
  noClicks++;
  attemptsText.innerText = `Attempts left: ${10 - noClicks} / 10`;

  // Expand YES ZONE safely
  const newHeight = Math.min(300, yesZone.offsetHeight + 30);
  const newWidth = Math.min(window.innerWidth * 0.9, yesZone.offsetWidth + 30);

  yesZone.style.height = newHeight + "px";
  yesZone.style.width = newWidth + "px";

  // Move NO safely inside its zone
  const zoneW = noZone.clientWidth;
  const zoneH = noZone.clientHeight;
  const btnW = noBtn.offsetWidth;
  const btnH = noBtn.offsetHeight;
  const margin = 10;

  const maxX = zoneW - btnW - margin;
  const maxY = zoneH - btnH - margin;

  const x = Math.max(margin, Math.random() * maxX);
  const y = Math.max(margin, Math.random() * maxY);

  noBtn.style.left = x + "px";
  noBtn.style.top = y + "px";

  if (noClicks === 10) {
    noBtn.style.display = "none";
  }
});

/* -------- YES BUTTON -------- */

yesBtn.addEventListener("click", () => {
  gameScreen.classList.add("hidden");
  finalScreen.classList.remove("hidden");

  // Music plays ONCE
  if (music.paused) {
    music.play().catch(() => {});
  }

  // Confetti (mobile safe)
  setTimeout(() => {
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 }
    });
  }, 300);

  // Slideshow
  if (!slideshowStarted) {
    slideshowStarted = true;
    setInterval(() => {
      slideIndex = (slideIndex + 1) % images.length;
      slideImage.src = images[slideIndex];
    }, 2500);
  }
});
