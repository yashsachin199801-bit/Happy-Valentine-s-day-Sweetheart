const yesBtn = document.getElementById("yesBtn");
const yesZone = document.getElementById("yesZone");
const noBtn = document.getElementById("noBtn");
const noZone = document.getElementById("noZone");
const attemptsText = document.getElementById("attempts");
const title = document.getElementById("title");
const music = document.getElementById("music");

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

const SCALE_X = 1.22;
const SCALE_Y = 1.35;
const MAX_X = 3.4;
const YES_ZONE_GROW = 45;

noBtn.addEventListener("click", () => {
  if (noClicks >= 10) return;

  noClicks++;
  attemptsText.innerText = `Attempts left: ${10 - noClicks} / 10`;
  noBtn.innerText = noTexts[noClicks - 1];

  // Grow YES zone vertically
  const headerH = document.querySelector(".header").offsetHeight;
  const maxH = window.innerHeight - headerH - 40;
  yesZone.style.height = `${Math.min(
    yesZone.offsetHeight + YES_ZONE_GROW,
    maxH
  )}px`;

  // Grow YES button (center locked)
  scaleX = Math.min(scaleX * SCALE_X, MAX_X);
  scaleY = scaleY * SCALE_Y;
  yesBtn.style.transform = `scale(${scaleX}, ${scaleY})`;

  // Move NO safely inside screen
  const zoneRect = noZone.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();
  const margin = 12;

  const maxX = zoneRect.width - btnRect.width - margin;
  const maxY = zoneRect.height - btnRect.height - margin;

  if (maxX > margin && maxY > margin) {
    const x = Math.random() * maxX;
    const y = Math.random() * maxY;
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
    noBtn.style.transform = "none";
  }

  if (noClicks === 10) {
    noBtn.style.display = "none";
    title.innerText = "😌 Enough Megha… Destiny has decided 💘";
    attemptsText.innerText = "No more escapes 😌";
  }
});

// YES CLICK
yesBtn.addEventListener("click", () => {
  music.play().catch(() => {});

  confetti({
    particleCount: 200,
    spread: 100,
    origin: { y: 0.6 }
  });

  document.getElementById("card").innerHTML = `
    <div style="text-align:center;padding:40px 20px;color:white">
      <h1>Meri pyaari Megha ❤️</h1>
      <p style="line-height:1.7">
        Tum meri life ka wo hissa ho jahan har din thoda zyada sukoon milta hai.<br><br>
        Tumhari smile meri strength hai, tumhara saath meri sabse badi blessing 💖<br><br>
        Har Valentine, har din, main tumhe thoda aur pyaar karunga 💍<br><br>
        Forever yours,<br>Your Valentine 💘
      </p>
      <img src="megha1.jpg"
        style="width:220px;border-radius:16px;border:4px solid white;margin-top:20px">
    </div>
  `;
});
