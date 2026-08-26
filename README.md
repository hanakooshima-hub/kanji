# 🎴 Kanji Flashcards

> Learn Japanese Kanji together • 日本語漢字を一緒に勉強しましょう

An interactive, browser-based flashcard app for mastering Japanese kanji characters. Study at your own pace with stroke counts, readings, meanings, and JLPT levels.

---

## ✨ Features

- 🎯 **Interactive Flashcards** — Click to flip and reveal meanings
- 📊 **JLPT Levels** — Cards tagged N1–N5 for structured learning
- 🎨 **Beautiful UI** — Purple gradient design with smooth animations
- ⚡ **Zero Dependencies** — Vanilla HTML/CSS/JavaScript, instant load
- 📱 **Responsive Design** — Works on desktop, tablet, and mobile
- 🔄 **Infinite Loop** — Study as many times as you want

---

## 🚀 Quick Start

### Option 1: Open Directly
Clone the repo and open `index.html` in your browser.

```bash
git clone https://github.com/hanakooshima-hub/kanji.git
cd kanji
open index.html  # macOS
# or double-click index.html on Windows/Linux
```

### Option 2: Local Server
```bash
# Python 3
python -m http.server 8000

# Node.js (requires http-server)
npx http-server

# Then open http://localhost:8000
```

---

## 📚 How to Use

1. **View Front Side** — See the kanji character, reading, stroke count, and JLPT level
2. **Click "Show Answer"** — Flip to reveal the English meaning
3. **Click "Next"** — Move to the next card (loops at the end)
4. **Study Repeatedly** — Go through the deck as many times as you want

**Example Card:**
```json
{
  "kanji": "愛",
  "reading": "あい",
  "meaning": "love",
  "strokes": 10,
  "level": "N3"
}
```

---

## 📖 Adding Kanji

Edit `flashcards.json` to add, remove, or modify cards:

```json
[
  {
    "kanji": "漢",
    "reading": "かん",
    "meaning": "Sino-, Han (dynasty)",
    "strokes": 13,
    "level": "N2"
  }
]
```

**Fields:**
- `kanji` — The character itself
- `reading` — Hiragana pronunciation (e.g., "あい")
- `meaning` — English translation or definition
- `strokes` — Number of strokes to write the character
- `level` — JLPT proficiency level (N5=easiest, N1=hardest)

---

## 🗂️ Project Structure

```
kanji/
├── index.html          Main HTML page
├── script.js           Flashcard logic (load, display, navigate)
├── style.css           Styling and animations
├── flashcards.json     Kanji data
└── README.md           This file
```

---

## 🎓 JLPT Levels Explained

| Level | Difficulty | Typical Knowledge |
|-------|------------|-------------------|
| **N5** | Easiest   | ~100 kanji (beginner) |
| **N4** | Easy      | ~300 kanji (elementary) |
| **N3** | Intermediate | ~600 kanji |
| **N2** | Advanced  | ~1,000 kanji |
| **N1** | Hardest   | ~2,000 kanji (fluent) |

---

## 💡 Future Ideas

- [ ] Progress tracking with localStorage
- [ ] Filter cards by JLPT level
- [ ] Shuffle mode
- [ ] Keyboard shortcuts (spacebar to flip, arrow keys to navigate)
- [ ] Spaced repetition algorithm
- [ ] Audio pronunciation
- [ ] Stroke order animations
- [ ] Dark mode
- [ ] Export/import study logs

---

## 🤝 Contributing

Want to add more kanji? Submit a pull request with updates to `flashcards.json`!

**Guidelines:**
- Keep meanings concise
- Use accurate stroke counts
- Include correct JLPT levels
- Test in the app before submitting

---

## 📝 License

Open source. Feel free to use, modify, and share!

---

## 🌟 Enjoy Your Study!

素晴らしい! Happy learning! 🎌

Questions? Open an issue or start a discussion.
