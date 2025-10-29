const questions = {
  fun: [
    "Kalau bisa punya kekuatan super, kamu mau apa?",
    "Apa makanan terenak versi kamu?",
    "Siapa artis yang ingin kamu ajak makan malam?",
    "Kalau hidupmu film, judulnya apa?",
    "Apa hal konyol yang pernah kamu lakukan di sekolah?"
  ],
  deep: [
    "Apa ketakutan terbesar kamu dalam hidup?",
    "Apa makna kebahagiaan buatmu?",
    "Kapan terakhir kali kamu merasa benar-benar damai?",
    "Apa yang paling kamu sesali tapi membuatmu belajar banyak?",
    "Kalau kamu bisa ubah satu hal di dunia, apa itu?"
  ],
  random: [
    "Lebih suka kopi atau teh?",
    "Kucing atau anjing?",
    "Tidur cepat atau begadang?",
    "Pantai atau gunung?",
    "Main game atau baca buku?"
  ],
  truth: [
    "Truth: Apa rahasia yang belum pernah kamu ceritakan?",
    "Truth: Siapa orang terakhir yang bikin kamu kesal?",
    "Dare: Kirim emoji acak ke chat orang random!",
    "Dare: Lakukan dance cringe 5 detik!",
    "Truth: Siapa orang yang kamu suka diam-diam?"
  ]
};

let currentPlayer = 1;
let totalPlayers = 2;
let category = "fun";
let answeredCount = parseInt(localStorage.getItem("answeredCount")) || 0;

const questionEl = document.getElementById("question");
const nextBtn = document.getElementById("nextBtn");
const resetBtn = document.getElementById("resetBtn");
const answeredCountEl = document.getElementById("answeredCount");
const turnLabel = document.getElementById("turnLabel");
const gameContainer = document.getElementById("game");
const startBtn = document.getElementById("startBtn");

answeredCountEl.textContent = answeredCount;

// Mulai game
startBtn.addEventListener("click", () => {
  category = document.getElementById("categorySelect").value;
  totalPlayers = parseInt(document.getElementById("playerCount").value) || 2;
  document.querySelector(".settings").style.display = "none";
  gameContainer.style.display = "block";
  turnLabel.textContent = `Giliran: Player ${currentPlayer}`;
});

// Next question
nextBtn.addEventListener("click", () => {
  const list = questions[category];
  const randomIndex = Math.floor(Math.random() * list.length);
  questionEl.textContent = list[randomIndex];

  answeredCount++;
  answeredCountEl.textContent = answeredCount;
  localStorage.setItem("answeredCount", answeredCount);

  // Ganti pemain
  currentPlayer = currentPlayer % totalPlayers + 1;
  turnLabel.textContent = `Giliran: Player ${currentPlayer}`;
});

// Reset game
resetBtn.addEventListener("click", () => {
  answeredCount = 0;
  localStorage.removeItem("answeredCount");
  answeredCountEl.textContent = 0;
  questionEl.textContent = "Game direset! Klik Next untuk mulai lagi.";
  currentPlayer = 1;
  turnLabel.textContent = `Giliran: Player ${currentPlayer}`;
});
