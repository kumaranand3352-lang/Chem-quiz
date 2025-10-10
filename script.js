 quizData = [
  { question: "Chemical symbol for Gold?", choices: ["Au", "Ag", "Gd", "Go"], answer: "Au", index: 0 },
  { question: "pH value less than 7 indicates?", choices: ["Neutral", "Basic", "Acidic", "Salty"], answer: "Acidic", index: 1 },
  { question: "Gas known as Laughing Gas?", choices: ["CO2", "NO2", "N2O", "O3"], answer: "N2O", index: 2 },
  { question: "Avogadro's number?", choices: ["6.02 × 10^23", "3.14", "1.6 × 10^-19", "9.8 m/s²"], answer: "6.02 × 10^23", index: 3 },
  { question: "Element with highest electronegativity?", choices: ["Oxygen", "Fluorine", "Chlorine", "Nitrogen"], answer: "Fluorine", index: 4 },
  { questionconst: "Formula of washing soda?", choices: ["Na2CO3·10H2O", "NaHCO3", "NaOH", "Na2SO4"], answer: "Na2CO3·10H2O", index: 5 },
  { question: "Main gas in Earth's atmosphere?", choices: ["Oxygen", "Nitrogen", "CO2", "Argon"], answer: "Nitrogen", index: 6 },
  { question: "Acid present in lemons?", choices: ["Acetic acid", "Citric acid", "Lactic acid", "Sulfuric acid"], answer: "Citric acid", index: 7 },
  { question: "Metal liquid at room temperature?", choices: ["Mercury", "Gallium", "Lead", "Bromine"], answer: "Mercury", index: 8 },
  { question: "Lightest element?", choices: ["Hydrogen", "Helium", "Lithium", "Neon"], answer: "Hydrogen", index: 9 }
];

let shuffledQuestions = [];
let current = 0;
let score = 0;
let userAnswers = [];

const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");
const resultEl = document.getElementById("result");
const scoreEl = document.getElementById("score");

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function initQuiz() {
  shuffledQuestions = shuffleArray([...quizData]);
  current = 0;
  score = 0;
  userAnswers = [];
  loadQuestion();
}

function loadQuestion() {
  const q = shuffledQuestions[current];
  questionEl.textContent = `Q${current + 1}. ${q.question}`;
  choicesEl.innerHTML = "";
  feedbackEl.classList.add("hidden");
  nextBtn.disabled = true;

  // Shuffle choices
  const shuffledChoices = shuffleArray([...q.choices]);
  shuffledChoices.forEach((choice, index) => {
    const li = document.createElement("li");
    li.textContent = choice;
    li.addEventListener("click", () => selectAnswer(li, choice, index));
    choicesEl.appendChild(li);
  });
}

function selectAnswer(element, choice, index) {
  // Disable multiple selections
  [...choicesEl.children].forEach(li => li.style.pointerEvents = "none");
  
  // Store user's answer
  const currentQuestion = shuffledQuestions[current];
  userAnswers.push({
    questionIndex: currentQuestion.index,
    userChoice: choice,
    correctAnswer: currentQuestion.answer
  });

  // Highlight selected answer without showing if it's correct
  element.style.background = "#a8dadc";
  nextBtn.disabled = false;
}

nextBtn.addEventListener("click", () => {
  current++;
  if (current < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  document.getElementById("quiz").classList.add("hidden");
  resultEl.classList.remove("hidden");

  // Calculate final score
  score = userAnswers.filter(answer => answer.userChoice === answer.correctAnswer).length;

  // Generate result HTML
  let resultHTML = `<h2>Your Final Score: ${score} / ${quizData.length}</h2>`;
  resultHTML += '<div class="answers-review">';
  
  userAnswers.forEach((answer, index) => {
    const question = quizData.find(q => q.index === answer.questionIndex);
    const isCorrect = answer.userChoice === answer.correctAnswer;
    
    resultHTML += `
      <div class="question-review ${isCorrect ? 'correct' : 'incorrect'}">
        <p><strong>Question ${index + 1}:</strong> ${question.question}</p>
        <p>Your answer: ${answer.userChoice}</p>
        <p>Correct answer: ${answer.correctAnswer}</p>
      </div>
    `;
  });

  resultHTML += '</div>';
  resultHTML += '<button onclick="restartQuiz()">Play Again</button>';
  resultEl.innerHTML = resultHTML;
}

function restartQuiz() {
  current = 0;
  score = 0;
  scoreEl.textContent = score;
  userAnswers = [];
  resultEl.classList.add("hidden");
  document.getElementById("quiz").classList.remove("hidden");
  initQuiz();
}

// Start the quiz
initQuiz();