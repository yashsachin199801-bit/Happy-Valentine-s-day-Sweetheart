const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const playground = document.getElementById("playground");
const attemptsText = document.getElementById("attempts");

const audio = new Audio("music.mp3");
audio.loop = true;

let attemptsLeft = 10;
let yesScale = 1;

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


// 🔴 YES CLICK — MUSIC MUST START HERE
yesBtn.addEventListener("click", () => {
  // Create audio and play immediately inside this click
  const music = new Audio("khairiyat.mp3");
  music.loop = true;

  music.play().catch(err => {
    console.log("Music couldn’t autoplay:", err);
  });

  // THEN update screen
  document.getElementById("card").innerHTML = `
    <div style="
      padding:40px 20px;
      text-align:center;
      background: pink;
      min-height: 100vh;
    ">
      <h1>Meri pyaari Megha ❤️</h1>
      <p style="font-size:16px;line-height:1.6">
        Tum meri life ka wo hissa ho jahan har din thoda zyada sukoon milta hai.<br><br>
        Tumhari smile meri strength hai...
      </p>
      <img src="megha.jpg" style="width:220px;border-radius:16px;border:4px solid white">
    </div>
  `;
});

// 🟠 NO CLICK
noBtn.addEventListener("click", () => {
  attemptsLeft--;
  attemptsText.textContent = `Attempts left: ${attemptsLeft} / 10`;

  // Change NO text
  const index = Math.min(10 - attemptsLeft, noTexts.length - 1);
  noBtn.textContent = noTexts[index];

  // YES grows exponentially
  yesScale *= 1.35;

  // Calculate max size so it never overlaps question
  const playgroundRect = playground.getBoundingClientRect();
  const maxHeight = playgroundRect.height * 0.8;

  yesBtn.style.transform = `scale(${yesScale})`;
  yesBtn.style.maxHeight = `${maxHeight}px`;
  yesBtn.style.width = "90%";

  // Move NO safely inside playground
  moveNoButton();
});

function moveNoButton() {
  const pg = playground.getBoundingClientRect();
  const nb = noBtn.getBoundingClientRect();

  const padding = 16;

  const maxX = pg.width - nb.width - padding;
  const maxY = pg.height - nb.height - padding;

  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  noBtn.style.position = "absolute";
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}
