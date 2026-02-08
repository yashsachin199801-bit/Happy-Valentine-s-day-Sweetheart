/* ===================== MCQ SECTION ===================== */

const quizWrongMessages = [
  "Oops 🙈 thoda aur yaad karo 💭",
  "Hehe 😜 galat ho gaya",
  "Aww 🥺 close tha!",
  "Think again 🤔💖",
  "Memory test fail 😆",
  "Dil se yaad karo ❤️✨"
];

const quizSteps = [
  { id: "quiz1", next: "quiz2", wrong: 0 },
  { id: "quiz2", next: "quiz3", wrong: 0 },
  { id: "quiz3", next: "gameScreen", wrong: 0 }
];

quizSteps.forEach(step => {
  const screen = document.getElementById(step.id);
  const msg = screen.querySelector(".msg");

  screen.querySelectorAll(".opt").forEach(btn => {
    btn.addEventListener("click", () => {
      if (btn.classList.contains("correct")) {
        msg.textContent = "";
        screen.classList.add("hidden");

        const next = document.getElementById(step.next);
        next.classList.remove("hidden");

        if (step.next === "gameScreen") {
          placeNoButtonInitially();
        }
      } else {
        msg.textContent = quizWrongMessages[step.wrong];
        step.wrong = (step.wrong + 1) % quizWrongMessages.length;
      }
    });
  });
});

/* ===================== GAME SECTION ===================== */

const noBtn = document.getElementById("noBtn");
const yesZone = document.getElementById("yesZone");
const yesBtn = document.getElementById("yesBtn");
const questionBlock = document.getElementById("questionBlock");
const gameArea = document.getElementById("gameArea");

const attemptsText = document.getElementById("attempts");
const destinyMsg = document.getElementById("destinyMsg");
const audio = document.getElementById("loveAudio");

const gameScreen = document.getElementById("gameScreen");
const finalScreen = document.getElementById("finalScreen");
const slideshowImg = document.getElementById("slideshow");

let attemptsLeft = 10;
let yesW = 160;
let yesH = 64;

const noMessages = [
  "Hehe 😅 bhaag gaya!",
  "Sach me NO? 😐💔",
  "Dil maanta nahi ❤️🥹",
  "Aise kaise chalega 😜",
  "Bas maan jao na 🥺💖",
  "Dekho destiny 😌✨",
  "Ab toh YES likha hai 💫",
  "Bhaagna band karo 😏",
  "Almost caught you 😈",
  "No more running… destiny chose us ❤️💍"
];

/* ===================== GEOMETRY HELPERS ===================== */

function rectOverlapArea(a, b) {
  const x = Math.max(
    0,
    Math.min(a.right, b.right) - Math.max(a.left, b.left)
  );
  const y = Math.max(
    0,
    Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top)
  );
  return x * y;
}

function overlaps(a, b) {
  return !(
    a.right < b.left ||
    a.left > b.right ||
    a.bottom < b.top ||
    a.top > b.bottom
  );
}

/* ===================== NO BUTTON PLACEMENT ===================== */

function placeNoButtonInitially() {
  moveNoButtonSafely(true);
}

function moveNoButtonSafely(isInitial = false) {
  const area = gameArea.getBoundingClientRect();
  const noRect = noBtn.getBoundingClientRect();
  const yesRect = yesZone.getBoundingClientRect();
  const quesRect = questionBlock.getBoundingClientRect();

  const noArea = noRect.width * noRect.height;
  const yesArea = yesRect.width * yesRect.height;

  let x, y, tries = 0;

  do {
    if (isInitial) {
      x = (area.width - noRect.width) / 2;
      y = yesRect.bottom - area.top + 20;
    } else {
      x = Math.random() * (area.width - noRect.width);
      y = Math.random() * (area.height - noRect.height);
    }

    const future = {
      left: area.left + x,
      right: area.left + x + noRect.width,
      top: area.top + y,
      bottom: area.top + y + noRect.height
    };

    // ❌ Never overlap question
    if (overlaps(future, quesRect)) {
      tries++;
      continue;
    }

    const overlapArea = rectOverlapArea(future, yesRect);

    const overlapRatioOnYes = overlapArea / yesArea;
    const overlapRatioOnNo = overlapArea / noArea;

    // ❌ Reject if:
    // - YES hidden > 40%
    // - NO hidden > 40%
    if (overlapRatioOnYes > 0.4 || overlapRatioOnNo > 0.4) {
      tries++;
      continue;
    }

    break;
  } while (tries < 150);

  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}

/* ===================== NO BUTTON CLICK ===================== */

noBtn.addEventListener("click", () => {
  attemptsLeft--;
  attemptsText.textContent = `Attempts left: ${attemptsLeft} / 10 😏`;
  destinyMsg.textContent = noMessages[10 - attemptsLeft - 1] || "";

  if (attemptsLeft <= 0) {
    noBtn.style.display = "none";
    destinyMsg.textContent =
      "There is no more running… destiny has already chosen us ❤️💍✨";
    return;
  }

  moveNoButtonSafely(false);

  // Grow YES safely (NO scale)
  if (yesW < window.innerWidth * 0.9) yesW += 28;
  if (yesH < 180) yesH += 14;
  yesZone.style.width = `${yesW}px`;
  yesZone.style.height = `${yesH}px`;
});

/* ===================== YES BUTTON ===================== */

yesBtn.addEventListener("click", () => {
  if (audio.paused) audio.play().catch(() => {});

  setTimeout(() => {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 }
    });
  }, 300);

  gameScreen.classList.add("hidden");
  finalScreen.classList.remove("hidden");

  let i = 0;
  setInterval(() => {
    i = (i + 1) % 4;
    slideshowImg.src = `megha${i + 1}.jpg`;
  }, 2500);
});
