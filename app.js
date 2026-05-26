// app.js - منطق الموقع الكامل

(function () {
  'use strict';

  // ══════════════════════════════════════
  // المتغيرات الأساسية
  // ══════════════════════════════════════
  let currentIndex  = 0;
  let shuffledOrder = [];

  const quoteText   = document.getElementById('quoteText');
  const quoteCard   = document.getElementById('quoteCard');
  const currentNum  = document.getElementById('currentNum');
  const totalNum    = document.getElementById('totalNum');
  const progressBar = document.getElementById('progressBar');
  const prevBtn     = document.getElementById('prevBtn');
  const nextBtn     = document.getElementById('nextBtn');
  const randomBtn   = document.getElementById('randomBtn');
  const copyBtn     = document.getElementById('copyBtn');
  const copyMsg     = document.getElementById('copyMsg');

  // ══════════════════════════════════════
  // توليد ترتيب عشوائي (Fisher-Yates)
  // ══════════════════════════════════════
  function generateShuffledOrder() {
    shuffledOrder = Array.from({ length: quotes.length }, (_, i) => i);
    for (let i = shuffledOrder.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledOrder[i], shuffledOrder[j]] = [shuffledOrder[j], shuffledOrder[i]];
    }
  }

  // ══════════════════════════════════════
  // عرض القول مع تأثير الانتقال
  // ══════════════════════════════════════
  function displayQuote(index, direction) {
    quoteCard.classList.add('flipping');

    setTimeout(() => {
      const realIndex = shuffledOrder[index];
      quoteText.textContent = quotes[realIndex];

      // تحديث العداد
      currentNum.textContent = index + 1;
      totalNum.textContent   = quotes.length;

      // تحديث شريط التقدم
      const progress = ((index + 1) / quotes.length) * 100;
      progressBar.style.width = progress + '%';

      quoteCard.classList.remove('flipping');
    }, 250);
  }

  // ══════════════════════════════════════
  // التنقل بين الأقوال
  // ══════════════════════════════════════
  function goNext() {
    currentIndex = (currentIndex + 1) % quotes.length;
    displayQuote(currentIndex, 'next');
  }

  function goPrev() {
    currentIndex = (currentIndex - 1 + quotes.length) % quotes.length;
    displayQuote(currentIndex, 'prev');
  }

  function goRandom() {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * quotes.length);
    } while (newIndex === currentIndex && quotes.length > 1);
    currentIndex = newIndex;
    displayQuote(currentIndex, 'random');
  }

  // ══════════════════════════════════════
  // نسخ القول
  // ══════════════════════════════════════
  function copyQuote() {
    const text = quoteText.textContent + '\n— الإمام علي بن أبي طالب عليه السلام';
    navigator.clipboard.writeText(text).then(() => {
      copyMsg.classList.add('show');
      setTimeout(() => copyMsg.classList.remove('show'), 2000);
    }).catch(() => {
      // fallback للمتصفحات القديمة
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      copyMsg.classList.add('show');
      setTimeout(() => copyMsg.classList.remove('show'), 2000);
    });
  }

  // ══════════════════════════════════════
  // إنشاء جسيمات الخلفية
  // ══════════════════════════════════════
  function createParticles() {
    const container = document.getElementById('particles');
    const count = window.innerWidth < 600 ? 15 : 30;

    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'particle';

      const size     = Math.random() * 4 + 1;
      const left     = Math.random() * 100;
      const duration = Math.random() * 20 + 15;
      const delay    = Math.random() * 20;

      p.style.cssText = `
        width:  ${size}px;
        height: ${size}px;
        left:   ${left}%;
        animation-duration:  ${duration}s;
        animation-delay:    -${delay}s;
      `;
      container.appendChild(p);
    }
  }

  // ══════════════════════════════════════
  // التنقل بلوحة المفاتيح
  // ══════════════════════════════════════
  function handleKeyboard(e) {
    switch (e.key) {
      case 'ArrowLeft':
      case 'ArrowDown':
        goNext();
        break;
      case 'ArrowRight':
      case 'ArrowUp':
        goPrev();
        break;
      case ' ':
      case 'Enter':
        e.preventDefault();
        goRandom();
        break;
      case 'c':
      case 'C':
        copyQuote();
        break;
    }
  }

  // ══════════════════════════════════════
  // السحب باللمس (Swipe)
  // ══════════════════════════════════════
  let touchStartX = 0;
  let touchStartY = 0;

  function handleTouchStart(e) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }

  function handleTouchEnd(e) {
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;

    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
      if (dx > 0) goPrev();
      else        goNext();
    }
  }

  // ══════════════════════════════════════
  // تهيئة الموقع
  // ══════════════════════════════════════
  function init() {
    if (!quotes || quotes.length === 0) {
      quoteText.textContent = 'لا توجد أقوال متاحة.';
      return;
    }

    generateShuffledOrder();
    totalNum.textContent = quotes.length;

    // ابدأ بقول عشوائي
    currentIndex = Math.floor(Math.random() * quotes.length);
    displayQuote(currentIndex);

    // ربط الأحداث
    nextBtn.addEventListener('click',  goNext);
    prevBtn.addEventListener('click',  goPrev);
    randomBtn.addEventListener('click', goRandom);
    copyBtn.addEventListener('click',  copyQuote);

    document.addEventListener('keydown',    handleKeyboard);
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend',   handleTouchEnd,   { passive: true });

    // إنشاء الجسيمات
    createParticles();

    // تغيير تلقائي كل 30 ثانية
    setInterval(goNext, 30000);
  }

  // تشغيل عند تحميل الصفحة
  document.addEventListener('DOMContentLoaded', init);

})();
