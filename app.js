// ══════════════════════════════════════
// المتغيرات العامة
// ══════════════════════════════════════
let currentIndex = 0;
let shuffledIndices = [];
let touchStartX = 0;
let touchStartY = 0;
let autoTimer = null;

// ══════════════════════════════════════
// تهيئة الموقع
// ══════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  initShuffled();
  showQuote(0);
  initParticles();
  initSwipe();
  initKeyboard();
  startAutoPlay();
  document.getElementById('total-quotes').textContent = quotes.length;
});

// ══════════════════════════════════════
// إدارة الأقوال
// ══════════════════════════════════════
function initShuffled() {
  shuffledIndices = [...Array(quotes.length).keys()];
  for (let i = shuffledIndices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledIndices[i], shuffledIndices[j]] = [shuffledIndices[j], shuffledIndices[i]];
  }
}

function showQuote(index) {
  const card = document
