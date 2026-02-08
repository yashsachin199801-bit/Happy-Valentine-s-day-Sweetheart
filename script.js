const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const noArea = document.getElementById("noArea");
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

let clicks = 0;
let yesWidth = 200;
let yesHeight = 70;

const WIDTH_GROW = 1.25;
const HEIGHT_GROW = 1.35;
const MAX_WIDTH = window.innerWidth * 0.9;
const MAX_HEIGHT = window.innerHeight * 0.55;

/* NO CLICK */
noBtn.addEventListener("click", () => {
  if (clicks >= 10) return;

  clicks++;
  attemptsText.textContent = `Attempts left: ${10 - clicks} / 10`;
  noBtn.textContent = noTexts[clicks - 1];

  /* GROW YES (REAL SIZE) */
  yesWidth = Math.min(yesWidth * WIDTH_GROW, MAX_WIDTH);
  yesHeight = Math.min(yesHeight * HEIGHT_GROW, MAX_HEIGHT);

  yesBtn.style.width = `${yesWidth}px`;
  yesBtn.style.height = `${yesHeight}px`;

  /* MOVE NO SAFELY */
  const area = noArea.getBoundingClientRect();
  const btn = noBtn.getBoundingClientRect();
  const margin = 12;

  const maxX = area.width - btn.width - margin;
  const maxY = area.height - btn.height - margin;

  if (maxX > margin && maxY > margin) {
    const x = Math.random() * maxX;
    const y = Math.random() * maxY;
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
    noBtn.style.transform = "none";
  }

  if (clicks === 10) {
    noBtn.style.display = "none";
    title.textContent = "😌 Enough Megha… Destiny has decided 💘";
    attemptsText.textContent = "No more escapes 😌";
  }
});

/* YES CLICK */
yesBtn.addEventListener("click", () => {
  music.play().catch(() => {});

  confetti({
    particleCount: 200,
    spread: 110,
    origin: { y: 0.6 }
  });

  document.getElementById("app").innerHTML = `
    <div style="text-align:center;color:white;padding:40px 20px">
      <h1>Meri pyaari Megha ❤️</h1>

      <p style="font-size:16px;line-height:1.7">
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
