const quizData = {
  chemistry: [
    { question: "Chemical symbol for Gold?", choices: ["Au", "Ag", "Gd", "Go"], answer: "Au", index: 0 },
    { question: "pH value less than 7 indicates?", choices: ["Neutral", "Basic", "Acidic", "Salty"], answer: "Acidic", index: 1 },
    { question: "Gas known as Laughing Gas?", choices: ["CO2", "NO2", "N2O", "O3"], answer: "N2O", index: 2 },
    { question: "Avogadro's number?", choices: ["6.02 × 10^23", "3.14", "1.6 × 10^-19", "9.8 m/s²"], answer: "6.02 × 10^23", index: 3 },
    { question: "Element with highest electronegativity?", choices: ["Oxygen", "Fluorine", "Chlorine", "Nitrogen"], answer: "Fluorine", index: 4 },
    { question: "Formula of washing soda?", choices: ["Na2CO3·10H2O", "NaHCO3", "NaOH", "Na2SO4"], answer: "Na2CO3·10H2O", index: 5 },
    { question: "Main gas in Earth's atmosphere?", choices: ["Oxygen", "Nitrogen", "CO2", "Argon"], answer: "Nitrogen", index: 6 },
    { question: "Acid present in lemons?", choices: ["Acetic acid", "Citric acid", "Lactic acid", "Sulfuric acid"], answer: "Citric acid", index: 7 },
    { question: "Metal liquid at room temperature?", choices: ["Mercury", "Gallium", "Lead", "Bromine"], answer: "Mercury", index: 8 },
    { question: "Lightest element?", choices: ["Hydrogen", "Helium", "Lithium", "Neon"], answer: "Hydrogen", index: 9 }
  ],
  general: [
    { question: "What is the capital of France?", choices: ["London", "Berlin", "Paris", "Madrid"], answer: "Paris", index: 0 },
    { question: "Who painted the Mona Lisa?", choices: ["Van Gogh", "Picasso", "Da Vinci", "Michelangelo"], answer: "Da Vinci", index: 1 },
    { question: "What is the largest planet in our solar system?", choices: ["Earth", "Mars", "Jupiter", "Saturn"], answer: "Jupiter", index: 2 },
    { question: "What is the chemical symbol for water?", choices: ["H2O", "CO2", "O2", "N2"], answer: "H2O", index: 3 },
    { question: "In which year did World War II end?", choices: ["1944", "1945", "1946", "1947"], answer: "1945", index: 4 },
    { question: "What is the currency of Japan?", choices: ["Won", "Yen", "Ringgit", "Baht"], answer: "Yen", index: 5 },
    { question: "Who wrote 'To Kill a Mockingbird'?", choices: ["Harper Lee", "J.K. Rowling", "Stephen King", "Mark Twain"], answer: "Harper Lee", index: 6 },
    { question: "What is the smallest country in the world?", choices: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"], answer: "Vatican City", index: 7 },
    { question: "What is the hardest natural substance on Earth?", choices: ["Gold", "Iron", "Diamond", "Platinum"], answer: "Diamond", index: 8 },
    { question: "Which ocean is the largest?", choices: ["Atlantic", "Indian", "Arctic", "Pacific"], answer: "Pacific", index: 9 }
  ],
  coding: [
    { question: "What does HTML stand for?", choices: ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlink and Text Markup Language"], answer: "Hyper Text Markup Language", index: 0 },
    { question: "Which programming language is known as the 'mother of all languages'?", choices: ["C", "Java", "Python", "Assembly"], answer: "C", index: 1 },
    { question: "What is the purpose of CSS?", choices: ["To style web pages", "To create databases", "To handle server-side logic", "To manage network protocols"], answer: "To style web pages", index: 2 },
    { question: "What does API stand for?", choices: ["Application Programming Interface", "Advanced Programming Initiative", "Automated Program Integration", "Application Process Interface"], answer: "Application Programming Interface", index: 3 },
    { question: "Which data structure uses LIFO (Last In, First Out)?", choices: ["Queue", "Stack", "Array", "Linked List"], answer: "Stack", index: 4 },
    { question: "What is the time complexity of binary search?", choices: ["O(n)", "O(log n)", "O(n^2)", "O(1)"], answer: "O(log n)", index: 5 },
    { question: "Which keyword is used to define a function in JavaScript?", choices: ["func", "def", "function", "method"], answer: "function", index: 6 },
    { question: "What does SQL stand for?", choices: ["Structured Query Language", "Simple Query Language", "System Query Language", "Standard Query Language"], answer: "Structured Query Language", index: 7 },
    { question: "Which HTTP method is used to retrieve data?", choices: ["POST", "PUT", "GET", "DELETE"], answer: "GET", index: 8 },
    { question: "What is the purpose of version control systems like Git?", choices: ["To compile code", "To track changes in code", "To debug programs", "To optimize performance"], answer: "To track changes in code", index: 9 }
  ]
};

let shuffledQuestions = [];
let current = 0;
let score = 0;
let userAnswers = [];
let selectedCategory = 'chemistry';
let timerInterval;
let timeLeft = 600; // 10 minutes in seconds

const homeEl = document.getElementById("home");
const quizEl = document.getElementById("quiz");
const resultEl = document.getElementById("result");
const startBtn = document.getElementById("start-btn");
const categoryEl = document.getElementById("category");
const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");
const progressEl = document.getElementById("progress");
const currentQEl = document.getElementById("current-q");
const totalQEl = document.getElementById("total-q");
const timeEl = document.getElementById("time");
const finalScoreEl = document.getElementById("final-score");
const totalScoreEl = document.getElementById("total-score");
const performanceMsgEl = document.getElementById("performance-msg");
const reviewContentEl = document.getElementById("review-content");
const retakeBtn = document.getElementById("retake-btn");
const homeBtn = document.getElementById("home-btn");

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timeEl.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      showResult();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function initQuiz() {
  selectedCategory = categoryEl.value;
  shuffledQuestions = shuffleArray([...quizData[selectedCategory]]);
  current = 0;
  score = 0;
  userAnswers = [];
  timeLeft = 600;
  totalQEl.textContent = shuffledQuestions.length;
  loadQuestion();
  startTimer();
}

function loadQuestion() {
  const q = shuffledQuestions[current];
  questionEl.textContent = q.question;
  choicesEl.innerHTML = "";
  nextBtn.disabled = true;
  prevBtn.disabled = current === 0;

  currentQEl.textContent = current + 1;
  progressEl.style.width = `${((current + 1) / shuffledQuestions.length) * 100}%`;

  // Shuffle choices
  const shuffledChoices = shuffleArray([...q.choices]);
  shuffledChoices.forEach((choice) => {
    const li = document.createElement("li");
    li.textContent = choice;
    li.addEventListener("click", () => selectAnswer(li, choice));
    choicesEl.appendChild(li);
  });

  // Highlight previously selected answer if exists
  if (userAnswers[current]) {
    const selectedLi = [...choicesEl.children].find(li => li.textContent === userAnswers[current].userChoice);
    if (selectedLi) {
      selectedLi.classList.add("selected");
      nextBtn.disabled = false;
    }
  }
}

function selectAnswer(element, choice) {
  // Remove previous selection
  [...choicesEl.children].forEach(li => li.classList.remove("selected"));
  element.classList.add("selected");

  // Store user's answer
  userAnswers[current] = {
    questionIndex: shuffledQuestions[current].index,
    userChoice: choice,
    correctAnswer: shuffledQuestions[current].answer
  };

  nextBtn.disabled = false;
}

function goToHome() {
  stopTimer();
  homeEl.classList.remove("hidden");
  quizEl.classList.add("hidden");
  resultEl.classList.add("hidden");
}

function showResult() {
  stopTimer();
  quizEl.classList.add("hidden");
  resultEl.classList.remove("hidden");

  // Calculate final score
  score = userAnswers.filter(answer => answer && answer.userChoice === answer.correctAnswer).length;

  finalScoreEl.textContent = score;
  totalScoreEl.textContent = shuffledQuestions.length;

  // Performance message
  let performanceMsg = "";
  const percentage = (score / shuffledQuestions.length) * 100;
  if (percentage >= 90) performanceMsg = "Excellent work!";
  else if (percentage >= 70) performanceMsg = "Great job!";
  else if (percentage >= 50) performanceMsg = "Good effort!";
  else performanceMsg = "Keep practicing!";
  performanceMsgEl.textContent = performanceMsg;

  // Review answers
  reviewContentEl.innerHTML = "";
  userAnswers.forEach((answer, index) => {
    if (!answer) return;
    const question = shuffledQuestions[index];
    const isCorrect = answer.userChoice === answer.correctAnswer;
    const div = document.createElement("div");
    div.className = `question-review ${isCorrect ? 'correct' : 'incorrect'}`;
    div.innerHTML = `
      <p><strong>Question ${index + 1}:</strong> ${question.question}</p>
      <p>Your answer: ${answer.userChoice}</p>
      <p>Correct answer: ${answer.correctAnswer}</p>
    `;
    reviewContentEl.appendChild(div);
  });

  // Save score to localStorage
  const scores = JSON.parse(localStorage.getItem('quizScores') || '[]');
  scores.push({ category: selectedCategory, score: score, total: shuffledQuestions.length, date: new Date().toISOString() });
  localStorage.setItem('quizScores', JSON.stringify(scores));
}

function restartQuiz() {
  goToHome();
}

// Event listeners
startBtn.addEventListener("click", () => {
  homeEl.classList.add("hidden");
  quizEl.classList.remove("hidden");
  initQuiz();
});

nextBtn.addEventListener("click", () => {
  if (current < shuffledQuestions.length - 1) {
    current++;
    loadQuestion();
  } else {
    showResult();
  }
});

prevBtn.addEventListener("click", () => {
  if (current > 0) {
    current--;
    loadQuestion();
  }
});

retakeBtn.addEventListener("click", () => {
  resultEl.classList.add("hidden");
  quizEl.classList.remove("hidden");
  initQuiz();
});

homeBtn.addEventListener("click", goToHome);

// Initialize home page
goToHome();
