const yesBtn = document.getElementById("yesBtn");
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

/* NO BUTTON */
noBtn.addEventListener("click", () => {
  if (noClicks >= 10) return;

  noBtn.innerText = noTexts[noClicks];
  noClicks++;
  attemptsText.innerText = `Attempts left: ${10 - noClicks} / 10`;

  // Move NO safely inside its own zone
  const zoneW = noZone.clientWidth;
  const zoneH = noZone.clientHeight;
  const btnW = noBtn.offsetWidth;
  const btnH = noBtn.offsetHeight;

  const x = Math.random() * (zoneW - btnW);
  const y = Math.random() * (zoneH - btnH);

  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
  noBtn.style.transform = "none";

  // Grow YES button (REAL size, not transform)
  yesBtn.style.width = `${220 + noClicks * 18}px`;
  yesBtn.style.height = `${110 + noClicks * 22}px`;

  if (noClicks === 10) {
    noBtn.style.display = "none";
    title.innerText = "😌 Enough Megha… Destiny has decided 💘";
    attemptsText.innerText = "No more escapes 😌";
  }
});




/* YES BUTTON */
yesBtn.addEventListener("click", () => {
  music.play().catch(() => {});

  document.getElementById("card").innerHTML = `
    <div style="text-align:center;padding:40px;color:white">
      <h1>💖 YAY! SHE SAID YES 💖</h1>
      <p style="margin-top:20px;font-size:18px">
        Meri pyaari Megha ❤️<br><br>
        Har Valentine, har din,<br>
        main tumhe thoda aur pyaar karunga 💍
      </p>
      <img src="megha1.jpg" style="margin-top:20px;width:220px;border-radius:16px">
    </div>
  `;
});
