const yesBtn = document.getElementById("yesBtn");
const yesZone = document.getElementById("yesZone");
const noBtn = document.getElementById("noBtn");
const noZone = document.getElementById("noZone");
const attemptsText = document.getElementById("attempts");
const title = document.getElementById("title");
const music = document.getElementById("music");

/* FINAL NO TEXTS */
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

/* YES scaling */
let scaleX = 1;
let scaleY = 1;

const SCALE_X_FACTOR = 1.22;
const SCALE_Y_FACTOR = 1.35;
const MAX_X_SCALE = 3.4;
const YES_ZONE_INCREMENT = 45;

/* NO CLICK */
noBtn.addEventListener("click", () => {
  if (noClicks >= 10) return;

  noClicks++;
  attemptsText.innerText = `Attempts left: ${10 - noClicks} / 10`;
  noBtn.innerText = noTexts[noClicks - 1];

  /* EXPAND YES ZONE DOWNWARD (never touches header) */
  const headerHeight = document.querySelector(".header").offsetHeight;
  const maxZoneHeight = window.innerHeight - headerHeight - 40;

  yesZone.style.height = `${Math.min(
    yesZone.offsetHeight + YES_ZONE_INCREMENT,
    maxZoneHeight
  )}px`;

  /* GROW YES BUTTON (DOWNWARD ONLY) */
  scaleX = Math.min(scaleX * SCALE_X_FACTOR, MAX_X_SCALE);
  scaleY = scaleY * SCALE_Y_FACTOR;

  yesBtn.style.transform = `scale(${scaleX}, ${scaleY})`;

  /* MOVE NO BUTTON — ALWAYS INSIDE NO ZONE */
  const zoneRect = noZone.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();
  const margin = 12;

  const minX = margin;
  const maxX = zoneRect.width - btnRect.width - margin;
  const minY = margin;
  const maxY = zoneRect.height - btnRect.height - margin;

  if (maxX > minX && maxY > minY) {
    const x = Math.random() * (maxX - minX) + minX;
    const y = Math.random() * (maxY - minY) + minY;

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
  /* Start music INSIDE click (browser-safe) */
  music.play().catch(() => {});

  confetti({
    particleCount: 200,
    spread: 100,
    origin: { y: 0.6 }
  });

  document.getElementById("card").innerHTML = `
    <div style="text-align:center;padding:40px 20px;color:white">
      <h1>Meri pyaari Megha ❤️</h1>

      <p style="line-height:1.7;font-size:16px">
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
        style="width:220px;border-radius:16px;border:4px solid white;margin-top:20px">
    </div>
  `;
});
