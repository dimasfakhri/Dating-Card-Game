const quizData = {
  general: [
    { q: "Capital of Japan?", a: ["Tokyo", "Kyoto", "Osaka", "Hiroshima"], correct: "Tokyo" },
    { q: "Which ocean is largest?", a: ["Indian", "Arctic", "Pacific", "Atlantic"], correct: "Pacific" },
    { q: "How many continents are there?", a: ["5", "6", "7", "8"], correct: "7" }
  ],
  science: [
    { q: "Water formula?", a: ["CO2", "H2O", "NaCl", "O2"], correct: "H2O" },
    { q: "Human heart has how many chambers?", a: ["2", "3", "4", "5"], correct: "4" },
    { q: "Earth revolves around the?", a: ["Moon", "Sun", "Mars", "Itself"], correct: "Sun" }
  ],
  tech: [
    { q: "Android is based on?", a: ["Linux", "Windows", "iOS", "MacOS"], correct: "Linux" },
    { q: "HTML stands for?", a: ["HyperText Markup Language", "Hyperlink Text Mode Language", "HighText Machine Language", "None"], correct: "HyperText Markup Language" },
    { q: "First computer virus name?", a: ["Creeper", "ILOVEYOU", "Stuxnet", "MyDoom"], correct: "Creeper" }
  ],
  math: [
    { q: "Slice the pie! What's 15 ÷ 5?", a: ["2 Slices", "3 Slices", "4 Slices", "5 Slices"], correct: "3 Slices"},
    { q: "You had 100 candies, gave away 45. What's left?", a: ["65", "55", "45", "50"], correct: "55" },
    { q: "Zap! What's the square of 6?", a: ["36", "12", "18", "24"], correct: "36" }
  ],
  history: [
    { q: "Who discovered America in 1492 (at least from Europe's view)?", a: ["Marco Polo", "Christoper Columbus", "Ferdinand Magellan", "Amerigo Vespucci"], correct: "Christoper Columbus"},
    { q: "What empire built the Colosseum?", a: ["Greek Empire", "Persian Empire", "Ottoman Empire", "Roman Empire"], correct: "Roman Empire" },
    { q: "In which year did World War II end?", a: ["1940", "1939", "1945", "1999"], correct: "1945" }
  ],
  social: [
    { q: "What is the main purpose of government?", a: ["To entertain citizens", "To sell products", "To create laws and maintain order", "To build houses"], correct: "To create laws and maintain order"},
    { q: "Why do people pay taxes?", a: ["To get rich", "To buy the law", "To punish citizens", "To support public services"], correct: "To support public services" },
    { q: "Which of these is a basic human right?", a: ["Freedom of speech", "Watching TV", "Owning a car", "Free pizza"], correct: "Freedom of speech" }
  ],
};

let currentCategory = "";
let currentIndex = 0;
let score = 0;
let timer;
let timeLeft = 10;

const questionText = document.getElementById("question-text");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const progressBar = document.getElementById("progress-bar");
const timeEl = document.getElementById("time-left");
const correctSound = document.getElementById("correct-sound");
const wrongSound = document.getElementById("wrong-sound");

function startGame(category) {
  currentCategory = category;
  document.getElementById("category-screen").classList.add("hidden");
  document.getElementById("quiz-screen").classList.remove("hidden");
  score = 0;
  currentIndex = 0;
  loadQuestion();
}

function loadQuestion() {
  if (currentIndex >= quizData[currentCategory].length) {
    return endGame();
  }

  const qData = quizData[currentCategory][currentIndex];
  questionText.textContent = qData.q;
  optionsEl.innerHTML = "";

  qData.a.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => checkAnswer(btn, qData.correct);
    optionsEl.appendChild(btn);
  });

  progressBar.style.width = `${(currentIndex / quizData[currentCategory].length) * 100}%`;
  resetTimer();
}

function checkAnswer(button, correct) {
  clearInterval(timer);
  const buttons = optionsEl.querySelectorAll("button");
  buttons.forEach(btn => btn.disabled = true);

  if (button.textContent === correct) {
    button.classList.add("correct");
    score++;
    correctSound.play();
  } else {
    button.classList.add("wrong");
    wrongSound.play();
  }

  nextBtn.classList.remove("hidden");
}

nextBtn.onclick = () => {
  currentIndex++;
  nextBtn.classList.add("hidden");
  loadQuestion();
};

function resetTimer() {
  clearInterval(timer);
  timeLeft = 10;
  timeEl.textContent = timeLeft;
  timer = setInterval(() => {
    timeLeft--;
    timeEl.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      autoWrong();
    }
  }, 1000);
}

function autoWrong() {
  const buttons = optionsEl.querySelectorAll("button");
  buttons.forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === quizData[currentCategory][currentIndex].correct)
      btn.classList.add("correct");
  });
  wrongSound.play();
  nextBtn.classList.remove("hidden");
}

function endGame() {
  document.getElementById("quiz-screen").classList.add("hidden");
  document.getElementById("result-screen").classList.remove("hidden");
  document.getElementById("final-score").textContent = `${score}/${quizData[currentCategory].length}`;
  progressBar.style.width = "100%";
  localStorage.setItem("lastScore", score);
}

document.getElementById("restart-btn").onclick = () => {
  document.getElementById("result-screen").classList.add("hidden");
  document.getElementById("category-screen").classList.remove("hidden");
};
