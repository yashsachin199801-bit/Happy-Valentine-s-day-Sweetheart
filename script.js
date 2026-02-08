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
let scaleX = 1;
let scaleY = 1;

const GROW_X = 1.18;
const GROW_Y = 1.25;
const MAX_X = 3;

/* NO CLICK */
noBtn.addEventListener("click", () => {
  if (clicks >= 10) return;

  clicks++;
  attemptsText.textContent = `Attempts left: ${10 - clicks} / 10`;
  noBtn.textContent = noTexts[clicks - 1];

  /* Grow YES calmly */
  scaleX = Math.min(scaleX * GROW_X, MAX_X);
  scaleY = scaleY * GROW_Y;
  yesBtn.style.transform = `scale(${scaleX}, ${scaleY})`;

  /* Move NO safely inside playground */
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
    particleCount: 180,
    spread: 100,
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
