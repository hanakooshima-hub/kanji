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
  // DOM要素のキャッシュ
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
      frontEl.innerHTML = `<p class="error">カードの読み込みに失敗しました。</p>`;
    }
  }

  function renderCardSide(content) {
    return `
      <div class="${content.isBack ? 'meaning' : 'kanji'}">${content.main}</div>
      <div class="reading">${content.reading || ""}</div>
      ${content.romaji ? `<div class="romaji">${content.romaji}</div>` : ""}
      <div class="details">
        ${content.strokes ? `<span>Strokes: ${content.strokes}</span>` : ""}
        ${content.level ? `<span>Level: ${content.level}</span>` : ""}
      </div>
    `;
  }

  function setElementVisibility(element, isVisible) {
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

    // 表を表示状態に初期化
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
    const message = praiseMessages[Math.floor(Math.random() * praiseMessages.length)];
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

    // Fisher-Yates アルゴリズム
    for (let i = flashcards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [flashcards[i], flashcards[j]] = [flashcards[j], flashcards[i]];
    }

    currentIndex = 0;
    displayCard();
  }

  // イベントリスナー
  showBtn.addEventListener("click", flipCard);
  understoodBtn.addEventListener("click", showPraise);
  nextBtn.addEventListener("click", nextCard);
  shuffleBtn.addEventListener("click", shuffleCards);

  practiceBtn.addEventListener("click", () => {
    hideFeedback();
    setElementVisibility(frontEl, true);
    setElementVisibility(backEl, false);
    showBtn.textContent = "Show answer";
  });

  closePraiseBtn.addEventListener("click", () => {
    setElementVisibility(praiseArea, false);
    showBtn.focus();
  });

  // キーボードショートカット（Space: 表裏切り替え、Enter/→: 次へ）
  document.addEventListener("keydown", (e) => {
    if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;

    if (e.code === "Space") {
      e.preventDefault();
      flipCard();
    } else if (e.code === "ArrowRight") {
      e.preventDefault();
      nextCard();
    }
  });

  loadFlashcards();
});
