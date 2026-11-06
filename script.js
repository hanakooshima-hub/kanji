
// Load flashcards from JSON
let flashcards = [];
let currentIndex = 0;

const praiseMessages = [
  "🌱 Great start!（いいスタート！）",
  "⭐ Well done!（よくできました！）",
  "🎉 Excellent!（すばらしい！）",
  "🏆 You're making progress!（上達していますよ！）",
  "💚 Keep it up!（その調子！）"
];

async function loadFlashcards() {
  try {
    const response = await fetch('flashcards.json');

    if (!response.ok) {
      throw new Error('Failed to load flashcards.json');
    }

    flashcards = await response.json();
    displayCard();
  } catch (error) {
    console.error('Error loading flashcards:', error);
  }
}

function hideFeedback() {
  document.getElementById('reviewArea').classList.add('hidden');
  document.getElementById('praiseArea').classList.add('hidden');
}

function displayCard() {
  if (flashcards.length === 0) return;

  const card = flashcards[currentIndex];
  const frontDiv = document.getElementById('front');
  const backDiv = document.getElementById('back');

  frontDiv.innerHTML = `
    <div class="kanji">${card.kanji}</div>
    <div class="reading">${card.reading}</div>
    <div class="romaji">${card.romaji || ''}</div>
    <div class="details">
      <span>Strokes: ${card.strokes}</span>
      <span>Level: ${card.level}</span>
    </div>
  `;

  backDiv.innerHTML = `
    <div class="meaning">${card.meaning}</div>
    <div class="reading">${card.reading}</div>
    <div class="romaji">${card.romaji || ''}</div>
    <div class="details">
      <span>Strokes: ${card.strokes}</span>
      <span>Level: ${card.level}</span>
    </div>
  `;

  frontDiv.classList.remove('hidden');
  backDiv.classList.add('hidden');

  document.getElementById('showBtn').textContent = 'Show answer';
  hideFeedback();
}

function showReviewOptions() {
  document.getElementById('reviewArea').classList.remove('hidden');
  document.getElementById('praiseArea').classList.add('hidden');
}

function showPraise() {
  const randomIndex = Math.floor(Math.random() * praiseMessages.length);

  document.getElementById('praiseMessage').textContent =
    praiseMessages[randomIndex];

  document.getElementById('reviewArea').classList.add('hidden');
  document.getElementById('praiseArea').classList.remove('hidden');
}

document.getElementById('showBtn').addEventListener('click', function() {
  const frontDiv = document.getElementById('front');
  const backDiv = document.getElementById('back');

  frontDiv.classList.toggle('hidden');
  backDiv.classList.toggle('hidden');

  this.textContent = frontDiv.classList.contains('hidden')
    ? 'Show question'
    : 'Show answer';

  if (frontDiv.classList.contains('hidden')) {
    showReviewOptions();
  } else {
    hideFeedback();
  }
});

document.getElementById('understoodBtn').addEventListener('click', showPraise);

document.getElementById('practiceBtn').addEventListener('click', function() {
  hideFeedback();
  document.getElementById('showBtn').textContent = 'Show answer';
  document.getElementById('front').classList.remove('hidden');
  document.getElementById('back').classList.add('hidden');
});

document.getElementById('nextBtn').addEventListener('click', function() {
  if (flashcards.length === 0) return;

  currentIndex = (currentIndex + 1) % flashcards.length;
  displayCard();
});

function shuffleFlashcards() {
  if (flashcards.length < 2) return;

  for (let i = flashcards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [flashcards[i], flashcards[j]] = [flashcards[j], flashcards[i]];
  }

  currentIndex = 0;
  displayCard();
}

document.getElementById('shuffleBtn').addEventListener('click', shuffleFlashcards);

document.addEventListener('DOMContentLoaded', loadFlashcards);
