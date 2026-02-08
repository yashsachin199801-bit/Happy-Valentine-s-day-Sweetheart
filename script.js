const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const yesZone = document.getElementById("yesZone");
const noZone = document.getElementById("noZone");
const attemptsText = document.getElementById("attempts");
const title = document.getElementById("title");
const card = document.getElementById("card");
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
let scale = 1;

const images = [
  "megha1.jpg",
  "megha2.jpg",
  "megha3.jpg",
  "megha4.jpg"
];

noBtn.addEventListener("click", () => {
  if (clicks >= 10) return;

  clicks++;
  attemptsText.innerText = `Attempts left: ${10 - clicks} / 10`;
  noBtn.innerText = noTexts[clicks - 1];

  /* YES GROWTH */
  scale = Math.min(scale * 1.25, 3.5);
  yesBtn.style.transform = `scale(${scale})`;

  /* NO BUTTON SAFE MOVE */
  const zoneW = noZone.clientWidth;
  const zoneH = noZone.clientHeight;
  const btnW = noBtn.offsetWidth;
  const btnH = noBtn.offsetHeight;
  const margin = 12;

  const maxX = zoneW - btnW - margin;
  const maxY = zoneH - btnH - margin;

  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  noBtn.style.left = `${Math.max(margin, x)}px`;
  noBtn.style.top = `${Math.max(margin, y)}px`;

  if (clicks === 10) {
    noBtn.style.display = "none";
    title.innerText = "😌 Enough Megha… Destiny has decided 💘";
    attemptsText.innerText = "";
  }
});

yesBtn.addEventListener("click", () => {
  music.play().catch(() => {});

  setTimeout(() => {
    confetti({
      particleCount: 180,
      spread: 90,
      origin: { y: 0.6 }
    });
  }, 300);

  card.innerHTML = `
    <div class="final">
      <h1>💖 YAY! SHE SAID YES 💖</h1>

      <p>
        Meri pyaari Megha ❤️<br><br>
        Tum meri life ka wo hissa ho jahan har din thoda zyada sukoon milta hai.<br><br>
        Tumhari smile meri strength hai, tumhara saath meri sabse badi blessing 💖<br><br>
        Har Valentine, har din, main tumhe thoda aur pyaar karunga 💍<br><br>
        Forever yours,<br>
        Your Valentine 💘
      </p>

      <img id="slideImage" src="${images[0]}" />
    </div>
  `;

  let index = 0;
  setInterval(() => {
    index = (index + 1) % images.length;
    document.getElementById("slideImage").src = images[index];
  }, 2500);
});
