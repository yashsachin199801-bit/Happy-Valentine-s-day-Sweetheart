const yesBtn = document.getElementById("yesBtn");
const yesZone = document.getElementById("yesZone");
const noBtn = document.getElementById("noBtn");
const noZone = document.getElementById("noZone");
const attemptsText = document.getElementById("attempts");
const title = document.getElementById("title");
const music = document.getElementById("music");

/* UPDATED TEXTS */
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
let scaleX = 1;
let scaleY = 1;

const SCALE_X_FACTOR = 1.18;
const SCALE_Y_FACTOR = 1.32;
const MAX_X_SCALE = 3.2;
const YES_ZONE_INCREMENT = 45;

noBtn.addEventListener("click", () => {
  if (noClicks >= 10) return;

  noClicks++;
  attemptsText.innerText = `Attempts left: ${10 - noClicks} / 10`;
  noBtn.innerText = noTexts[noClicks - 1];

  /* EXPAND YES ZONE */
  const headerHeight = document.querySelector(".header").offsetHeight;
  const maxZoneHeight = window.innerHeight - headerHeight - 40;

  yesZone.style.height = `${Math.min(
    yesZone.offsetHeight + YES_ZONE_INCREMENT,
    maxZoneHeight
  )}px`;

  /* SCALE YES (CENTER LOCKED) */
  scaleX = Math.min(scaleX * SCALE_X_FACTOR, MAX_X_SCALE);
  scaleY = scaleY * SCALE_Y_FACTOR;

  yesBtn.style.transform =
    `translate(-50%, -50%) scale(${scaleX}, ${scaleY})`;

  /* NO BUTTON — BULLETPROOF BOUNDARY */
  const zoneH = noZone.clientHeight;
  const zoneW = noZone.clientWidth;
  const btnH = noBtn.offsetHeight;
  const btnW = noBtn.offsetWidth;
  const margin = 12;

  if (zoneH <= btnH + margin * 2) {
    // Safe lock when space is tight
    noBtn.style.left = "50%";
    noBtn.style.top = "10px";
    noBtn.style.transform = "translateX(-50%)";
  } else {
    const maxX = zoneW - btnW - margin;
    const maxY = zoneH - btnH - margin;

    const x = Math.max(margin, Math.random() * maxX);
    const y = Math.max(margin, Math.random() * maxY);

    noBtn.style.transform = "none";
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
  }

  if (noClicks === 10) {
    noBtn.style.display = "none";
    title.innerText = "😌 Enough Megha… Destiny has decided 💘";
    attemptsText.innerText = "No more escapes 😌";
  }
});

/* YES CLICK */
yesBtn.addEventListener("click", () => {
  music.play().catch(() => {});

  confetti({
    particleCount: 200,
    spread: 100,
    origin: { y: 0.6 }
  });

  document.getElementById("card").innerHTML = `
    <div style="padding:40px 20px;text-align:center">
      <h1>Meri pyaari Megha ❤️</h1>

      <p style="font-size:16px;line-height:1.6">
        Tum meri life ka wo hissa ho jahan har din
        thoda zyada sukoon milta hai.<br><br>

        Tumhari smile meri strength hai,
        tumhara saath meri sabse badi blessing 💖<br><br>

        Har Valentine, har din,
        main tumhe thoda aur pyaar karunga 💍<br><br>

        Forever yours,<br>
        Your Valentine 💘
      </p>

      <img src="megha1.jpg"
        style="width:220px;border-radius:16px;border:4px solid white">
    </div>
  `;
});