
let flashcards = [];
let currentIndex = 0;

const praiseMessages = [
  "🌱 Great start!（いいスタート！）",
  "⭐ Well done!（よくできました！）",
  "🎉 Excellent!（すばらしい！）",
  "🏆 You're making progress!（上達していますよ！）",
  "💚 Keep it up!（その調子！）"
];

// Bible quiz questions
const bibleQuestions = [
  {
    question: "Who created the heavens and the earth?",
    options: ["Moses", "God", "David", "Noah"],
    answer: 1,
    explanation: "The Bible begins by telling us that God created the heavens and the earth.",
    reference: "Genesis 1:1"
  },
  {
    question: "Who built an ark to survive the great flood?",
    options: ["Abraham", "Moses", "Noah", "Solomon"],
    answer: 2,
    explanation: "God told Noah to build an ark to save his family and the animals.",
    reference: "Genesis 6:14"
  },
  {
    question: "Who led the Israelites out of Egypt?",
    options: ["David", "Moses", "Peter", "Joseph"],
    answer: 1,
    explanation: "Moses led the Israelites out of slavery in Egypt.",
    reference: "Exodus 3:10"
  },
  {
    question: "Who defeated the giant Goliath?",
    options: ["David", "Solomon", "Samson", "Joshua"],
    answer: 0,
    explanation: "David defeated Goliath with a sling and a stone.",
    reference: "1 Samuel 17:49-50"
  },
  {
    question: "Where was Jesus born?",
    options: ["Jerusalem", "Nazareth", "Bethlehem", "Rome"],
    answer: 2,
    explanation: "Jesus was born in Bethlehem.",
    reference: "Luke 2:4-7"
  },
  {
    question: "Who was the mother of Jesus?",
    options: ["Martha", "Mary", "Elizabeth", "Ruth"],
    answer: 1,
    explanation: "Mary was the mother of Jesus.",
    reference: "Luke 1:30-31"
  },
  {
    question: "What was Jesus' first miracle?",
    options: [
      "Walking on water",
      "Healing a blind man",
      "Turning water into wine",
      "Feeding five thousand people"
    ],
    answer: 2,
    explanation: "Jesus turned water into wine at a wedding in Cana.",
    reference: "John 2:1-11"
  },
  {
    question: "Which disciple denied knowing Jesus three times?",
    options: ["John", "Peter", "Thomas", "Andrew"],
    answer: 1,
    explanation: "Peter denied knowing Jesus three times before the rooster crowed.",
    reference: "Luke 22:54-62"
  },
  {
    question: "What did Jesus use to feed five thousand people?",
    options: [
      "Five loaves and two fish",
      "Ten loaves and five fish",
      "Bread and grapes",
      "Seven loaves and seven fish"
    ],
    answer: 0,
    explanation: "Jesus fed the crowd with five loaves and two fish.",
    reference: "Matthew 14:17-21"
  },
  {
    question: "Who was swallowed by a great fish?",
    options: ["Daniel", "Jonah", "Elijah", "Paul"],
    answer: 1,
    explanation: "Jonah was swallowed by a great fish after trying to run away from God's instruction.",
    reference: "Jonah 1:17"
  }
];

document.addEventListener("DOMContentLoaded", () => {
  const frontEl = document.getElementById("front");
  const backEl = document.getElementById("back");
  const showBtn = document.getElementById("showBtn");
  const nextBtn = document.getElementById("nextBtn");
  const shuffleBtn = document.getElementById("shuffleBtn");
  const reviewArea = document.getElementById("reviewArea");
  const understoodBtn = document.getElementById("understoodBtn");
  const practiceBtn = document.getElementById("practiceBtn");
  const praiseArea = document.getElementById("praiseArea");
  const praiseMessage = document.getElementById("praiseMessage");
  const closePraiseBtn = document.getElementById("closePraiseBtn");

  async function loadFlashcards() {
    try {
      const response = await fetch("./flashcards.json");

      if (!response.ok) {
        throw new Error(`Failed to load flashcards: ${response.status}`);
      }

      flashcards = await response.json();
      displayCard();
    } catch (error) {
      console.error("Error loading flashcards:", error);
      frontEl.innerHTML =
        `<p class="error">カードの読み込みに失敗しました。</p>`;
    }
  }

  function renderCardSide(content) {
    return `
      <div class="${content.isBack ? "meaning" : "kanji"}">${content.main}</div>
      <div class="reading">${content.reading || ""}</div>
      ${content.romaji ? `<div class="romaji">${content.romaji}</div>` : ""}
      <div class="details">
        ${content.strokes ? `<span>Strokes: ${content.strokes}</span>` : ""}
        ${content.level ? `<span>Level: ${content.level}</span>` : ""}
      </div>
    `;
  }

  function setElementVisibility(element, isVisible) {
    if (!element) return;

    if (isVisible) {
      element.classList.remove("hidden");
      element.removeAttribute("aria-hidden");
    } else {
      element.classList.add("hidden");
      element.setAttribute("aria-hidden", "true");
    }
  }

  function hideFeedback() {
    setElementVisibility(reviewArea, false);
    setElementVisibility(praiseArea, false);
  }

  function displayCard() {
    if (!flashcards.length) return;

    const card = flashcards[currentIndex];

    frontEl.innerHTML = renderCardSide({
      main: card.kanji,
      reading: card.reading,
      romaji: card.romaji,
      strokes: card.strokes,
      level: card.level,
      isBack: false
    });

    backEl.innerHTML = renderCardSide({
      main: card.meaning,
      reading: card.reading,
      romaji: card.romaji,
      strokes: card.strokes,
      level: card.level,
      isBack: true
    });

    setElementVisibility(frontEl, true);
    setElementVisibility(backEl, false);

    showBtn.textContent = "Show answer";
    hideFeedback();
  }

  function flipCard() {
    const isShowingFront = !frontEl.classList.contains("hidden");

    setElementVisibility(frontEl, !isShowingFront);
    setElementVisibility(backEl, isShowingFront);

    if (isShowingFront) {
      showBtn.textContent = "Show question";
      setElementVisibility(reviewArea, true);
      setElementVisibility(praiseArea, false);
    } else {
      showBtn.textContent = "Show answer";
      hideFeedback();
    }
  }

  function showPraise() {
    const message =
      praiseMessages[Math.floor(Math.random() * praiseMessages.length)];

    praiseMessage.textContent = message;

    setElementVisibility(reviewArea, false);
    setElementVisibility(praiseArea, true);
    closePraiseBtn.focus();
  }

  function nextCard() {
    if (!flashcards.length) return;

    currentIndex = (currentIndex + 1) % flashcards.length;
    displayCard();
  }

  function shuffleCards() {
    if (flashcards.length < 2) return;

    for (let i = flashcards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [flashcards[i], flashcards[j]] =
        [flashcards[j], flashcards[i]];
    }

    currentIndex = 0;
    displayCard();
  }

  // Create the Bible quiz window
  function createQuizWindow() {
    if (document.getElementById("bibleQuiz")) return;

    const style = document.createElement("style");

    style.textContent = `
      #bibleQuiz {
        position: fixed;
        inset: 0;
        z-index: 1000;
        background: rgba(0, 0, 0, 0.65);
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 16px;
      }

      #bibleQuiz .quiz-box {
        background: #F7F5EF;
        color: #183f32;
        width: 100%;
        max-width: 520px;
        max-height: 90vh;
        overflow-y: auto;
        padding: 28px;
        border-radius: 18px;
        text-align: center;
        box-shadow: 0 8px 30px rgba(0,0,0,0.25);
      }

      #bibleQuiz h2 {
        color: #245B43;
        margin-bottom: 12px;
      }

      #bibleQuiz .quiz-question {
        font-size: 1.2rem;
        font-weight: bold;
        margin: 24px 0;
      }

      #bibleQuiz .quiz-options {
        display: grid;
        gap: 10px;
      }

      #bibleQuiz button {
        cursor: pointer;
        padding: 12px 16px;
        border: none;
        border-radius: 9px;
        font-size: 1rem;
      }

      #bibleQuiz .quiz-option {
        background: white;
        color: #183f32;
        border: 2px solid #245B43;
      }

      #bibleQuiz .quiz-option:hover:not(:disabled) {
        background: #e5eee8;
      }

      #bibleQuiz .quiz-option:disabled {
        cursor: default;
        opacity: 1;
      }

      #bibleQuiz .quiz-option.correct {
        background: #d7eadb;
        border-color: #245B43;
      }

      #bibleQuiz .quiz-option.incorrect {
        background: #f5dddd;
        border-color: #B83A3A;
      }

      #bibleQuiz .quiz-feedback {
        margin: 20px 0;
        line-height: 1.6;
      }

      #bibleQuiz .quiz-next {
        background: #245B43;
        color: white;
        margin-top: 12px;
      }

      #bibleQuiz .quiz-close {
        background: #B83A3A;
        color: white;
        margin-top: 12px;
        margin-left: 8px;
      }

      #bibleQuiz .quiz-progress {
        color: #666;
        font-size: 0.9rem;
      }
    `;

    document.head.appendChild(style);

    const quiz = document.createElement("div");
    quiz.id = "bibleQuiz";
    quiz.setAttribute("role", "dialog");
    quiz.setAttribute("aria-modal", "true");
    quiz.setAttribute("aria-labelledby", "quizTitle");

    quiz.innerHTML = `
      <div class="quiz-box">
        <h2 id="quizTitle">📖 Bible Quiz</h2>
        <p class="quiz-progress" id="quizProgress"></p>
        <p class="quiz-question" id="quizQuestion"></p>
        <div class="quiz-options" id="quizOptions"></div>
        <div class="quiz-feedback" id="quizFeedback" aria-live="polite"></div>
        <button type="button" class="quiz-next" id="quizNext" hidden>
          Next question
        </button>
        <button type="button" class="quiz-close" id="quizClose">
          Close
        </button>
      </div>
    `;

    document.body.appendChild(quiz);

    document.getElementById("quizClose").addEventListener("click", closeQuiz);
    document.getElementById("quizNext").addEventListener("click", nextQuizQuestion);
  }

  let quizQuestions = [];
  let quizIndex = 0;
  let quizScore = 0;
  let quizAnswered = false;

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  }

  function startBibleQuiz() {
    createQuizWindow();

    quizQuestions = shuffleArray([...bibleQuestions]).slice(0, 5);
    quizIndex = 0;
    quizScore = 0;

    setElementVisibility(reviewArea, false);
    setElementVisibility(praiseArea, false);

    showQuizQuestion();
  }

  function showQuizQuestion() {
    const question = quizQuestions[quizIndex];

    quizAnswered = false;

    document.getElementById("quizProgress").textContent =
      `Question ${quizIndex + 1} of ${quizQuestions.length}`;

    document.getElementById("quizQuestion").textContent =
      question.question;

    document.getElementById("quizFeedback").textContent = "";

    const optionsContainer = document.getElementById("quizOptions");
    optionsContainer.replaceChildren();

    document.getElementById("quizNext").hidden = true;

    question.options.forEach((option, index) => {
      const button = document.createElement("button");

      button.type = "button";
      button.className = "quiz-option";
      button.textContent = option;

      button.addEventListener("click", () => {
        checkQuizAnswer(index, button);
      });

      optionsContainer.appendChild(button);
    });
  }

  function checkQuizAnswer(selectedIndex, selectedButton) {
    if (quizAnswered) return;

    quizAnswered = true;

    const question = quizQuestions[quizIndex];
    const buttons = document.querySelectorAll("#quizOptions button");
    const isCorrect = selectedIndex === question.answer;

    if (isCorrect) {
      quizScore++;
    }

    buttons.forEach((button, index) => {
      button.disabled = true;

      if (index === question.answer) {
        button.classList.add("correct");
      }
    });

    if (!isCorrect) {
      selectedButton.classList.add("incorrect");
    }

    const feedback = document.getElementById("quizFeedback");

    feedback.textContent =
      (isCorrect ? "✅ Correct! " : "❌ Not quite. ") +
      question.explanation +
      " Bible reference: " +
      question.reference;

    document.getElementById("quizNext").textContent =
      quizIndex === quizQuestions.length - 1
        ? "See my score"
        : "Next question";

    document.getElementById("quizNext").hidden = false;
  }

  function nextQuizQuestion() {
    if (quizIndex < quizQuestions.length - 1) {
      quizIndex++;
      showQuizQuestion();
    } else {
      showQuizResult();
    }
  }

  function showQuizResult() {
    document.getElementById("quizProgress").textContent =
      "Quiz completed!";

    document.getElementById("quizQuestion").textContent =
      `You scored ${quizScore} out of ${quizQuestions.length}!`;

    document.getElementById("quizOptions").replaceChildren();

    document.getElementById("quizFeedback").textContent =
      quizScore === 5
        ? "🌟 Excellent! You know your Bible very well!"
        : "💚 Well done! Keep learning and exploring the Bible!";

    document.getElementById("quizNext").textContent = "Try again";
    document.getElementById("quizNext").hidden = false;

    document.getElementById("quizNext").onclick = () => {
      startBibleQuiz();
    };
  }

  function closeQuiz() {
    const quiz = document.getElementById("bibleQuiz");

    if (quiz) {
      quiz.remove();
    }

    showBtn.focus();
  }

  // Event listeners
  showBtn.addEventListener("click", flipCard);
  understoodBtn.addEventListener("click", showPraise);
  nextBtn.addEventListener("click", nextCard);
  shuffleBtn.addEventListener("click", shuffleCards);

  // The practice button now starts the Bible quiz
  practiceBtn.addEventListener("click", startBibleQuiz);

  closePraiseBtn.addEventListener("click", () => {
    setElementVisibility(praiseArea, false);
    showBtn.focus();
  });

  document.addEventListener("keydown", (e) => {
    if (e.target.tagName === "INPUT" ||
        e.target.tagName === "TEXTAREA") return;

    if (e.code === "Space") {
      if (document.getElementById("bibleQuiz")) return;

      e.preventDefault();
      flipCard();
    } else if (e.code === "ArrowRight") {
      if (document.getElementById("bibleQuiz")) return;

      e.preventDefault();
      nextCard();
    } else if (e.code === "Escape") {
      closeQuiz();
    }
  });

  loadFlashcards();
});

