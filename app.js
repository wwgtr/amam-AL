let currentIndex = 0;
let quotes = [];

// تحميل الأقوال عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    quotes = window.quotesData || [];
    if (quotes.length > 0) {
        showQuote(0);
        updateCounter();
    } else {
        document.getElementById('quoteContent').textContent = 'لا توجد أقوال متاحة';
    }
});

// عرض القول مع ضبط حجم الخط تلقائياً
function showQuote(index) {
    if (quotes.length === 0) return;
    currentIndex = (index + quotes.length) % quotes.length;
    const quote = quotes[currentIndex];
    
    const contentEl = document.getElementById('quoteContent');
    contentEl.textContent = quote.text;
    
    // ضبط حجم الخط حسب طول القول
    const textLength = quote.text.length;
    let fontSize;
    
    if (textLength <= 30) {
        fontSize = 2.2; // قصير -> خط كبير
    } else if (textLength <= 50) {
        fontSize = 1.8;
    } else if (textLength <= 80) {
        fontSize = 1.5;
    } else if (textLength <= 120) {
        fontSize = 1.2;
    } else {
        fontSize = 1.0; // طويل -> خط صغير
    }
    
    contentEl.style.fontSize = fontSize + 'em';
    
    document.getElementById('quoteCategory').textContent = quote.category;
    document.getElementById('quoteNumber').textContent = '#' + (currentIndex + 1);
    updateCounter();
}

// تحديث العداد
function updateCounter() {
    document.getElementById('counter').textContent = (currentIndex + 1) + ' / ' + quotes.length;
}

// الأزرار
document.getElementById('shuffleBtn').addEventListener('click', function() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    showQuote(randomIndex);
    showToast('تم اختيار قول عشوائي');
});

document.getElementById('prevBtn').addEventListener('click', function() {
    showQuote(currentIndex - 1);
});

document.getElementById('nextBtn').addEventListener('click', function() {
    showQuote(currentIndex + 1);
});

// التنقل بلوحة المفاتيح
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowRight') showQuote(currentIndex - 1);
    if (e.key === 'ArrowLeft') showQuote(currentIndex + 1);
    if (e.key === ' ') { e.preventDefault(); showQuote(Math.floor(Math.random() * quotes.length)); }
});

// التنقل باللمس
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches<span class="footnote-wrapper">[0](0)</span>.screenX;
});

document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches<span class="footnote-wrapper">[0](0)</span>.screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
        if (diff > 0) showQuote(currentIndex + 1);
        else showQuote(currentIndex - 1);
    }
});

// جميع الأقوال
document.getElementById('allQuotesBtn').addEventListener('click', function() {
    document.getElementById('allQuotesModal').classList.add('active');
    displayAllQuotes(quotes);
});

document.getElementById('closeAllQuotes').addEventListener('click', function() {
    document.getElementById('allQuotesModal').classList.remove('active');
});

// عرض جميع الأقوال
function displayAllQuotes(quotesArray) {
    const list = document.getElementById('quotesList');
    list.innerHTML = '';
    
    quotesArray.forEach((quote, index) => {
        const item = document.createElement('div');
        item.className = 'quote-item';
        item.innerHTML = '<div class="q-text">' + quote.text + '</div><div class="q-category">' + quote.category + ' | #' + (index + 1) + '</div>';
        item.addEventListener('click', function() {
            showQuote(index);
            document.getElementById('allQuotesModal').classList.remove('active');
        });
        list.appendChild(item);
    });
}

// البحث
document.getElementById('searchInput').addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const filtered = quotes.filter(function(q) {
        return q.text.toLowerCase().includes(searchTerm) || q.category.toLowerCase().includes(searchTerm);
    });
    displayAllQuotes(filtered);
});

// حول الموقع
document.getElementById('aboutBtn').addEventListener('click', function() {
    document.getElementById('aboutModal').classList.add('active');
});

document.getElementById('closeAbout').addEventListener('click', function() {
    document.getElementById('aboutModal').classList.remove('active');
});

// إغلاق النوافذ عند الضغط خارجها
window.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
    }
});

// حفظ كصورة - دقة عالية مع حقوق ملكية جميلة
document.getElementById('saveBtn').addEventListener('click', function() {
    const quote = quotes[currentIndex];
    if (!quote) return;
    
    const canvas = document.getElementById('imageCanvas');
    const ctx = canvas.getContext('2d');
    
    // دقة عالية
    canvas.width = 2160;
    canvas.height = 3840;
    
    // خلفية متدرجة دينية
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#0a0a0a');
    gradient.addColorStop(0.3, '#1a0a05');
    gradient.addColorStop(0.6, '#0a0510');
    gradient.addColorStop(1, '#000000');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // زخارف دائرية ذهبية خفيفة
    for (let i = 0; i < 6; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = 80 + Math.random() * 250;
        const circleGradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        circleGradient.addColorStop(0, 'rgba(212, 168, 67, 0.04)');
        circleGradient.addColorStop(1, 'rgba(212, 168, 67, 0)');
        ctx.fillStyle = circleGradient;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // إطار زخرفي
    ctx.strokeStyle = 'rgba(212, 168, 67, 0.15)';
    ctx.lineWidth = 4;
    ctx.strokeRect(80, 80, canvas.width - 160, canvas.height - 160);
    
    ctx.strokeStyle = 'rgba(212, 168, 67, 0.08)';
    ctx.lineWidth = 1;
    ctx.strokeRect(120, 120, canvas.width - 240, canvas.height - 240);
    
    // بطاقة النص
    const cardX = 200;
    const cardY = 700;
    const cardWidth = canvas.width - 400;
    const cardHeight = canvas.height - 1400;
    
    ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
    ctx.shadowBlur = 80;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 15;
    
    ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.beginPath();
    ctx.roundRect(cardX, cardY, cardWidth, cardHeight, 50);
    ctx.fill();
    
    ctx.shadowColor = 'transparent';
    ctx.strokeStyle = 'rgba(212, 168, 67, 0.12)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(cardX, cardY, cardWidth, cardHeight, 50);
    ctx.stroke();
    
    // علامات اقتباس ذهبية
    ctx.fillStyle = 'rgba(212, 168, 67, 0.2)';
    ctx.font = '100px "Amiri", serif';
    ctx.textAlign = 'right';
    ctx.fillText('\uFD3F', cardX + cardWidth - 50, cardY + 130);
    ctx.textAlign = 'left';
    ctx.fillText('\uFD3E', cardX + 50, cardY + cardHeight - 40);
    
    // نص القول - حجم ديناميكي
    ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
    ctx.shadowBlur = 25;
    ctx.fillStyle = '#f5f0e8';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    const maxWidth = cardWidth - 140;
    const textLength = quote.text.length;
    let baseFontSize;
    
    if (textLength <= 30) baseFontSize = 90;
    else if (textLength <= 50) baseFontSize = 75;
    else if (textLength <= 80) baseFontSize = 60;
    else if (textLength <= 120) baseFontSize = 50;
    else baseFontSize = 42;
    
    ctx.font = baseFontSize + 'px "Amiri", serif';
    
    // تقسيم النص
    const words = quote.text.split(' ');
    let lines = [];
    let currentLine = '';
    
    for (let word of words) {
        const testLine = currentLine + ' ' + word;
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && currentLine !== '') {
            lines.push(currentLine);
            currentLine = word;
        } else {
            currentLine = testLine;
        }
    }
    lines.push(currentLine);
    
    const lineHeight = baseFontSize * 1.8;
    const startY = cardY + cardHeight / 2 - (lines.length - 1) * lineHeight / 2;
    
    ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
    ctx.shadowBlur = 35;
    
    for (let i = 0; i < lines.length; i++) {
        ctx.fillText(lines[i].trim(), canvas.width / 2, startY + i * lineHeight);
    }
    
    // التصنيف
    ctx.shadowBlur = 10;
    ctx.fillStyle = 'rgba(212, 168, 67, 0.7)';
    ctx.font = '40px "Cairo", sans-serif';
    ctx.fillText(quote.category, canvas.width / 2, cardY + cardHeight - 100);
    
    // حقوق الملكية - بشكل جميل
    ctx.shadowBlur = 15;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.font = '32px "Amiri", serif';
    ctx.fillText('\u2014 \u0633\u064A\u0641 \u0639\u0644\u064A \u2014', canvas.width / 2, canvas.height - 200);
    
    ctx.fillStyle = 'rgba(212, 168, 67, 0.3)';
    ctx.font = '28px "Cairo", sans-serif';
    ctx.fillText('@ne_7u', canvas.width / 2, canvas.height - 130);
    
    // تحويل إلى صورة
    const link = document.createElement('a');
    link.download = 'قول_الإمام_علي_' + (currentIndex + 1) + '.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
    
    showToast('تم حفظ الصورة بدقة عالية');
});

// Toast
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(function() {
        toast.classList.remove('show');
    }, 3000);
}

// دالة roundRect
CanvasRenderingContext2D.prototype.roundRect = function(x, y, w, h, r) {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    this.moveTo(x + r, y);
    this.lineTo(x + w - r, y);
    this.quadraticCurveTo(x + w, y, x + w, y + r);
    this.lineTo(x + w, y + h - r);
    this.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    this.lineTo(x + r, y + h);
    this.quadraticCurveTo(x, y + h, x, y + h - r);
    this.lineTo(x,
