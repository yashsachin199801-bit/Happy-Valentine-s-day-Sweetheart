/* ================= MCQ WRONG MESSAGES ================= */
const quizWrongMessages = [
  "Hmm… close but not quite 😜",
  "Nope 😅 try remembering again",
  "Aww 🥺 you know this one",
  "Think harder 💭 I believe in you",
  "Hehe 😏 that’s not it",
  "Memory test failed 😆 retry",
  "Dil se yaad karo ❤️",
  "Almost… but not this 😜"
];

/* ================= QUIZ FLOW ================= */
const quizFlow = [
  { id: "quiz1", next: "quiz2", wrongIndex: 0 },
  { id: "quiz2", next: "quiz3", wrongIndex: 0 },
  { id: "quiz3", next: "gameScreen", wrongIndex: 0 }
];

quizFlow.forEach(step => {
  const screen = document.getElementById(step.id);
  const msg = screen.querySelector(".msg");
  const options = screen.querySelectorAll(".opt");

  options.forEach(btn => {
    btn.addEventListener("click", () => {
      if (btn.classList.contains("correct")) {
        screen.classList.add("hidden");
        document.getElementById(step.next).classList.remove("hidden");
      } else {
        msg.textContent = quizWrongMessages[step.wrongIndex];
        step.wrongIndex = (step.wrongIndex + 1) % quizWrongMessages.length;
      }
    });
  });
});

/* ================= GAME ================= */
const yesZone = document.getElementById("yesZone");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const noZone = document.getElementById("noZone");
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
  "Hehe 😅 thoda aur socho",
  "Sach me? 😐",
  "Dil se jawab do ❤️",
  "Aise kaise 🥺",
  "Thak jaogi bhaagte bhaagte 😜",
  "Bas ek YES hi toh chahiye 😌",
  "Destiny muskara rahi hai 😉",
  "Ab toh maan jao 😏",
  "Kismat likhi ja chuki hai 💫",
  "There is no more running… destiny chose us ❤️"
];

noBtn.addEventListener("click", () => {
  attemptsLeft--;
  attemptsText.textContent = `Attempts left: ${attemptsLeft} / 10`;
  destinyMsg.textContent = noMessages[10 - attemptsLeft - 1] || "";

  if (attemptsLeft <= 0) {
    noBtn.style.display = "none";
    return;
  }

  const zone = noZone.getBoundingClientRect();
  const btn = noBtn.getBoundingClientRect();

  noBtn.style.position = "absolute";
  noBtn.style.left = `${Math.random() * (zone.width - btn.width)}px`;
  noBtn.style.top = `${Math.random() * (zone.height - btn.height)}px`;

  if (yesW < window.innerWidth * 0.9) yesW += 24;
  if (yesH < 160) yesH += 12;
  yesZone.style.width = `${yesW}px`;
  yesZone.style.height = `${yesH}px`;
});

yesBtn.addEventListener("click", () => {
  if (audio.paused) audio.play().catch(()=>{});

  setTimeout(() => {
    confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
  }, 300);

  gameScreen.classList.add("hidden");
  finalScreen.classList.remove("hidden");

  let i = 0;
  setInterval(() => {
    i = (i + 1) % 4;
    slideshowImg.src = `megha${i + 1}.jpg`;
  }, 2500);
});
