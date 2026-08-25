// Load flashcards from JSON
let flashcards = [];
let currentIndex = 0;

// Fetch flashcards data
async function loadFlashcards() {
  try {
    const response = await fetch('flashcards.json');
    flashcards = await response.json();
    displayCard();
  } catch (error) {
    console.error('Error loading flashcards:', error);
  }
}

// Display current card
function displayCard() {
  if (flashcards.length === 0) return;

  const card = flashcards[currentIndex];
  const frontDiv = document.getElementById('front');
  const backDiv = document.getElementById('back');

  // Front side - Kanji
  frontDiv.innerHTML = `
    <div class="kanji">${card.kanji}</div>
    <div class="reading">${card.reading}</div>
    <div class="details">
      <span>Strokes: ${card.strokes}</span>
      <span>Level: ${card.level}</span>
    </div>
  `;

  // Back side - Meaning
  backDiv.innerHTML = `
    <div class="meaning">${card.meaning}</div>
    <div class="reading">${card.reading}</div>
    <div class="details">
      <span>Strokes: ${card.strokes}</span>
      <span>Level: ${card.level}</span>
    </div>
  `;

  // Reset to front side
  frontDiv.classList.remove('hidden');
  backDiv.classList.add('hidden');
}

// Show answer (back side)
document.getElementById('showBtn').addEventListener('click', function() {
  const frontDiv = document.getElementById('front');
  const backDiv = document.getElementById('back');

  frontDiv.classList.toggle('hidden');
  backDiv.classList.toggle('hidden');

  // Change button text
  this.textContent = frontDiv.classList.contains('hidden') ? 'Show question' : 'Show answer';
});

// Next card
document.getElementById('nextBtn').addEventListener('click', function() {
  currentIndex = (currentIndex + 1) % flashcards.length;
  displayCard();

  // Reset button text
  document.getElementById('showBtn').textContent = 'Show answer';
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', loadFlashcards);
