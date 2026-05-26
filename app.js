// ══════════════════════════════════════
// المتغيرات العامة
// ══════════════════════════════════════
let currentIndex = 0;
let shuffledIndices = [];
let touchStartX = 0;
let touchStartY = 0;

// ══════════════════════════════════════
// تهيئة الموقع
// ══════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  initShuffled();
  showQuote(0);
  initParticles();
  initSwipe();
  initKeyboard();
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
  const card = document.getElementById('quote-card');
  const textEl = document.getElementById('quote-text');
  const counterEl = document.getElementById('quote-counter');
  const progressEl = document.getElementById('progress-fill');

  // تأثير الانتقال
  card.classList.add('flip');
  setTimeout(() => {
    const realIndex = shuffledIndices[index];
    textEl.textContent = quotes[realIndex];
    card.classList.remove('flip');
  }, 250);

  // تحديث العداد والشريط
  counterEl.textContent = `${index + 1} / ${quotes.length}`;
  const percent = ((index + 1) / quotes.length) * 100;
  progressEl.style.width = percent + '%';
}

function nextQuote() {
  currentIndex = (currentIndex + 1) % quotes.length;
  showQuote(currentIndex);
}

function prevQuote() {
  currentIndex = (currentIndex - 1 + quotes.length) % quotes.length;
  showQuote(currentIndex);
}

function randomQuote() {
  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * quotes.length);
  } while (newIndex === currentIndex && quotes.length > 1);
  currentIndex = newIndex;
  showQuote(currentIndex);
}

// ══════════════════════════════════════
// التنقل بالكيبورد
// ══════════════════════════════════════
function initKeyboard() {
  document.addEventListener('keydown', (e) => {
    if (document.getElementById('search-input') === document.activeElement) return;
    switch(e.key) {
      case 'ArrowLeft':
      case 'ArrowDown':
        nextQuote(); break;
      case 'ArrowRight':
      case 'ArrowUp':
        prevQuote(); break;
      case ' ':
        e.preventDefault();
        randomQuote(); break;
    }
  });
}

// ══════════════════════════════════════
// التنقل بالسحب (Swipe)
// ══════════════════════════════════════
function initSwipe() {
  const card = document.getElementById('quote-card');

  card.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  card.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
      dx > 0 ? prevQuote() : nextQuote();
    }
  }, { passive: true });
}

// ══════════════════════════════════════
// إدارة الصفحات
// ══════════════════════════════════════
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById(pageId);
  target.classList.add('active');

  if (pageId === 'page-all') {
    renderAllQuotes(quotes);
  }

  window.scrollTo(0, 0);
}

// ══════════════════════════════════════
// عرض جميع الأقوال
// ══════════════════════════════════════
function renderAllQuotes(list) {
  const grid = document.getElementById('all-quotes-grid');
  grid.innerHTML = '';

  if (list.length === 0) {
    grid.innerHTML = '<p style="color:var(--text-secondary);text-align:center;padding:40px;grid-column:1/-1">لا توجد نتائج</p>';
    return;
  }

  const fragment = document.createDocumentFragment();
  list.forEach((quote, i) => {
    const item = document.createElement('div');
    item.className = 'quote-item';
    item.innerHTML = `
      <div class="quote-item-num">القول ${i + 1}</div>
      <div class="quote-item-text">${quote}</div>
    `;
    item.addEventListener('click', () => {
      const realIdx = quotes.indexOf(quote);
      currentIndex = shuffledIndices.indexOf(realIdx);
      if (currentIndex === -1) currentIndex = 0;
      showPage('page-home');
      showQuote(currentIndex);
    });
    fragment.appendChild(item);
  });
  grid.appendChild(fragment);
}

// ══════════════════════════════════════
// البحث في الأقوال
// ══════════════════════════════════════
function searchQuotes() {
  const query = document.getElementById('search-input').value.trim();
  if (!query) {
    renderAllQuotes(quotes);
    return;
  }
  const filtered = quotes.filter(q =>
    q.toLowerCase().includes(query.toLowerCase())
  );
  renderAllQuotes(filtered);
}

// ══════════════════════════════════════
// نسخ القول
// ══════════════════════════════════════
function copyQuote() {
  const text = document.getElementById('quote-text').textContent;
  const fullText = `"${text}"\n— الإمام علي بن أبي طالب عليه السلام`;
  navigator.clipboard.writeText(fullText).then(() => {
    showToast('تم نسخ القول بنجاح');
  }).catch(() => {
    showToast('تعذّر النسخ');
  });
}

// ══════════════════════════════════════
// مشاركة القول
// ══════════════════════════════════════
function shareQuote() {
  const text = document.getElementById('quote-text').textContent;
  const shareData = {
    title: 'أقوال الإمام علي عليه السلام',
    text: `"${text}"\n— الإمام علي بن أبي طالب عليه السلام`,
  };
  if (navigator.share) {
    navigator.share(shareData).catch(() => {});
  } else {
    copyQuote();
    showToast('تم نسخ القول للمشاركة');
  }
}

// ══════════════════════════════════════
// حفظ كصورة ستوري عالية الدقة
// ══════════════════════════════════════
async function saveAsImage() {
  showToast('جاري إنشاء الصورة...');

  const canvas = document.getElementById('save-canvas');
  const ctx = canvas.getContext('2d');

  // قياس ستوري انستجرام (1080x1920)
  const W = 1080;
  const H = 1920;
  canvas.width = W;
  canvas.height = H;

  // ── الخلفية المتدرجة ──
  const bgGrad = ctx.createLinearGradient(0, 0, W, H);
  bgGrad.addColorStop(0, '#0a0a0f');
  bgGrad.addColorStop(0.4, '#0f0f1a');
  bgGrad.addColorStop(0.7, '#12101e');
  bgGrad.addColorStop(1, '#0a0a0f');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, W, H);

  // ── دوائر زخرفية خلفية ──
  drawDecorativeCircles(ctx, W, H);

  // ── بطاقة الزجاج ──
  const cardX = 80;
  const cardY = H * 0.28;
  const cardW = W - 160;
  const cardH = H * 0.44;
  const cardR = 48;

  // ظل البطاقة
  ctx.save();
  ctx.shadowColor = 'rgba(0,0,0,0.6)';
  ctx.shadowBlur = 80;
  ctx.shadowOffsetY = 20;
  roundRect(ctx, cardX, cardY, cardW, cardH, cardR);
  ctx.fillStyle = 'rgba(255,255,255,0.07)';
  ctx.fill();
  ctx.restore();

  // حدود البطاقة
  ctx.save();
  roundRect(ctx, cardX, cardY, cardW, cardH, cardR);
  ctx.strokeStyle = 'rgba(201,168,76,0.35)';
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.restore();

  // خط علوي ذهبي
  const topLineGrad = ctx.createLinearGradient(cardX, 0, cardX + cardW, 0);
  topLineGrad.addColorStop(0, 'transparent');
  topLineGrad.addColorStop(0.3, 'rgba(201,168,76,0.7)');
  topLineGrad.addColorStop(0.7, 'rgba(255,255,255,0.4)');
  topLineGrad.addColorStop(1, 'transparent');
  ctx.save();
  ctx.strokeStyle = topLineGrad;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cardX + cardR, cardY);
  ctx.lineTo(cardX + cardW - cardR, cardY);
  ctx.stroke();
  ctx.restore();

  // ── علامة الاقتباس العلوية ──
  ctx.save();
  ctx.font = `bold 160px serif`;
  const goldGrad = ctx.createLinearGradient(0, cardY, 0, cardY + 200);
  goldGrad.addColorStop(0, '#f0d080');
  goldGrad.addColorStop(1, '#c9a84c');
  ctx.fillStyle = goldGrad;
  ctx.globalAlpha = 0.5;
  ctx.fillText('"', cardX + 60, cardY + 140);
  ctx.restore();

  // ── نص القول ──
  const quoteText = document.getElementById('quote-text').textContent;
  ctx.save();
  ctx.fillStyle = '#f5e6c0';
  ctx.textAlign = 'center';
  ctx.direction = 'rtl';

  // اختيار حجم الخط حسب طول النص
  let fontSize = 52;
  if (quoteText.length > 120) fontSize = 42;
  if (quoteText.length > 200) fontSize = 36;
  if (quoteText.length > 300) fontSize = 30;

  ctx.font = `${fontSize}px 'CustomFont', 'Amiri', serif`;

  // تقسيم النص إلى أسطر
  const lines = wrapText(ctx, quoteText, cardW - 120, fontSize);
  const lineHeight = fontSize * 1.9;
  const totalTextH = lines.length * lineHeight;
  let startY = cardY + (cardH - totalTextH) / 2 + fontSize * 0.5;

  lines.forEach(line => {
    ctx.fillText(line, W / 2, startY);
    startY += lineHeight;
  });
  ctx.restore();

  // ── علامة الاقتباس السفلية ──
  ctx.save();
  ctx.font = `bold 160px serif`;
  ctx.fillStyle = goldGrad;
  ctx.globalAlpha = 0.5;
  ctx.save();
  ctx.translate(cardX + cardW - 60, cardY + cardH - 30);
  ctx.rotate(Math.PI);
  ctx.fillText('"', 0, 0);
  ctx.restore();
  ctx.restore();

  // ── المصدر ──
  ctx.save();
  ctx.font = `32px 'CustomFont', 'Amiri', serif`;
  ctx.fillStyle = '#c9a84c';
  ctx.globalAlpha = 0.8;
  ctx.textAlign = 'center';
  ctx.direction = 'rtl';
  ctx.fillText('— الإمام علي بن أبي طالب عليه السلام', W / 2, cardY + cardH + 60);
  ctx.restore();

  // ── فاصل ذهبي ──
  const divGrad = ctx.createLinearGradient(W * 0.2, 0, W * 0.8, 0);
  divGrad.addColorStop(0, 'transparent');
  divGrad.addColorStop(0.5, 'rgba(201,168,76,0.5)');
  divGrad.addColorStop(1, 'transparent');
  ctx.save();
  ctx.strokeStyle = divGrad;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(W * 0.2, cardY + cardH + 100);
  ctx.lineTo(W * 0.8, cardY + cardH + 100);
  ctx.stroke();
  ctx.restore();

  // ── الشعار العلوي ──
  ctx.save();
  ctx.textAlign = 'center';
  ctx.direction = 'rtl';
  ctx.font = `bold 56px 'CustomFont', 'Amiri', serif`;
  const titleGrad = ctx.createLinearGradient(W * 0.3, 0, W * 0.7, 0);
  titleGrad.addColorStop(0, '#f0d080');
  titleGrad.addColorStop(0.5, '#c9a84c');
  titleGrad.addColorStop(1, '#8a6a1a');
  ctx.fillStyle = titleGrad;
  ctx.fillText('أقوال الإمام علي', W / 2, H * 0.18);
  ctx.font = `36px 'CustomFont', 'Amiri', serif`;
  ctx.fillStyle = 'rgba(245,230,192,0.5)';
  ctx.fillText('عليه السلام', W / 2, H * 0.18 + 60);
  ctx.restore();

  // ── حقوق الملكية (انستجرام) ──
  ctx.save();
  ctx.textAlign = 'center';
  ctx.font = `bold 34px Arial, sans-serif`;
  ctx.fillStyle = 'rgba(201,168,76,0.9)';
  ctx.fillText('@ne_7u', W / 2, H - 100);
  ctx.restore();

  // ── تحميل الصورة ──
  setTimeout(() => {
    const link = document.createElement('a');
    link.download = `imam-ali-quote-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png', 1.0);
    link.click();
    showToast('تم حفظ الصورة بنجاح');
  }, 100);
}

// ── دوال مساعدة للكانفاس ──
function drawDecorativeCircles(ctx, W, H) {
  const circles = [
    { x: W * 0.1, y: H * 0.1, r: 300, color: 'rgba(201,168,76,0.04)' },
    { x: W * 0.9, y: H * 0.2, r: 250, color: 'rgba(201,168,76,0.03)' },
    { x: W * 0.5, y: H * 0.5, r: 400, color: 'rgba(255,255,255,0.02)' },
    { x: W * 0.15, y: H * 0.85, r: 280, color: 'rgba(201,168,76,0.04)' },
    { x: W * 0.85, y: H * 0.9, r: 220, color: 'rgba(201,168,76,0.03)' },
  ];
  circles.forEach(c => {
    const grad = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, c.r);
    grad.addColorStop(0, c.color);
    grad.addColorStop(1, 'transparent');
    ctx.beginPath();
    ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();
  });
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function wrapText(ctx, text, maxWidth, fontSize) {
  const words = text.split(' ');
  const lines = [];
  let currentLine = '';

  for (let i = 0; i < words.length; i++) {
    const testLine = currentLine ? currentLine + ' ' + words[i] : words[i];
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = words[i];
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines;
}

// ══════════════════════════════════════
// Toast إشعار
// ══════════════════════════════════════
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2800);
}

// ══════════════════════════════════════
// جسيمات الخلفية
// ══════════════════════════════════════
function initParticles() {
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let W, H;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function createParticle() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.8 + 0.3,
      dx: (Math.random() - 0.5) * 0.3,
      dy: -Math.random() * 0.5 - 0.1,
      alpha: Math.random() * 0.5 + 0.1,
      color: Math.random() > 0.5 ? '201,168,76' : '255,255,255',
    };
  }

  function init() {
    resize();
    particles = Array.from({ length: 80 }, createParticle);
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach((p, i) => {
      p.x += p.dx;
      p.y += p.dy;
      p.alpha -= 0.0008;

      if (p.y < -10 || p.alpha <= 0) {
        particles[i] = createParticle();
        particles[i].y = H + 10;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
      ctx.fill();
    });
    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', () => {
    resize();
    particles = Array.from({ length: 80 }, createParticle);
  });

  init();
  animate();
}
