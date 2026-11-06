
let flashcards = [];
let currentIndex = 0;

const praiseMessages = [
  "🌱 Great start!（いいスタート！）",
  "⭐ Well done!（よくできました！）",
  "🎉 Excellent!（すばらしい！）",
  "🏆 You're making progress!（上達していますよ！）",
  "💚 Keep it up!（その調子！）"
];

document.addEventListener("DOMContentLoaded", () => {
  const showBtn = document.getElementById("showBtn");
  const nextBtn = document.getElementById("nextBtn");
  const shuffleBtn = document.getElementById("shuffleBtn");
  const understoodBtn = document.getElementById("understoodBtn");
  const practiceBtn = document.getElementById("practiceBtn");
  const closePraiseBtn = document.getElementById("closePraiseBtn");
  const praiseArea = document.getElementById("praiseArea");

  async function loadFlashcards() {
    try {
      const response = await fetch("./flashcards.json");

      if (!response.ok) {
        throw new Error("Failed to load flashcards.json");
      }

      flashcards = await response.json();
      displayCard();

    } catch (error) {
      console.error("Error loading flashcards:", error);
    }
  }

  function hideFeedback() {
    document.getElementById("reviewArea").classList.add("hidden");
    praiseArea.classList.add("hidden");
  }

  function displayCard() {
    if (flashcards.length === 0) return;

    const card = flashcards[currentIndex];

    document.getElementById("front").innerHTML = `
      <div class="kanji">${card.kanji}</div>
      <div class="reading">${card.reading}</div>
      <div class="romaji">${card.romaji || ""}</div>
      <div class="details">
        <span>Strokes: ${card.strokes}</span>
        <span>Level: ${card.level}</span>
      </div>
    `;

    document.getElementById("back").innerHTML = `
      <div class="meaning">${card.meaning}</div>
      <div class="reading">${card.reading}</div>
      <div class="romaji">${card.romaji || ""}</div>
      <div class="details">
        <span>Strokes: ${card.strokes}</span>
        <span>Level: ${card.level}</span>
      </div>
    `;

    document.getElementById("front").classList.remove("hidden");
    document.getElementById("back").classList.add("hidden");

    showBtn.textContent = "Show answer";
    hideFeedback();
  }

  function showReviewOptions() {
    document.getElementById("reviewArea").classList.remove("hidden");
    praiseArea.classList.add("hidden");
  }

  function showPraise() {
    const randomIndex = Math.floor(
      Math.random() * praiseMessages.length
    );

    document.getElementById("praiseMessage").textContent =
      praiseMessages[randomIndex];

    document.getElementById("reviewArea").classList.add("hidden");
    praiseArea.classList.remove("hidden");
  }

  showBtn.addEventListener("click", () => {
    const front = document.getElementById("front");
    const back = document.getElementById("back");

    front.classList.toggle("hidden");
    back.classList.toggle("hidden");

    if (front.classList.contains("hidden")) {
      showBtn.textContent = "Show question";
      showReviewOptions();
    } else {
      showBtn.textContent = "Show answer";
      hideFeedback();
    }
  });

  understoodBtn.addEventListener("click", showPraise);

  practiceBtn.addEventListener("click", () => {
    hideFeedback();
    document.getElementById("front").classList.remove("hidden");
    document.getElementById("back").classList.add("hidden");
    showBtn.textContent = "Show answer";
  });

  nextBtn.addEventListener("click", () => {
    if (flashcards.length === 0) return;

    currentIndex = (currentIndex + 1) % flashcards.length;
    displayCard();
  });

  shuffleBtn.addEventListener("click", () => {
    if (flashcards.length < 2) return;

    for (let i = flashcards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [flashcards[i], flashcards[j]] =
        [flashcards[j], flashcards[i]];
    }

    currentIndex = 0;
    displayCard();
  });

  closePraiseBtn.addEventListener("click", () => {
    praiseArea.classList.add("hidden");
  });

  loadFlashcards();
});
