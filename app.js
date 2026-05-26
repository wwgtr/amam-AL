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

// عرض القول
function showQuote(index) {
    if (quotes.length === 0) return;
    currentIndex = (index + quotes.length) % quotes.length;
    const quote = quotes[currentIndex];
    
    document.getElementById('quoteContent').textContent = quote.text;
    document.getElementById('quoteCategory').textContent = `📂 ${quote.category}`;
    document.getElementById('quoteNumber').textContent = `#${currentIndex + 1}`;
    updateCounter();
}

// تحديث العداد
function updateCounter() {
    document.getElementById('counter').textContent = `${currentIndex + 1} / ${quotes.length}`;
}

// الأزرار
document.getElementById('shuffleBtn').addEventListener('click', function() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    showQuote(randomIndex);
    showToast(' تم اختيار قول عشوائي');
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
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
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
        item.innerHTML = `
            <div class="q-text">${quote.text}</div>
            <div class="q-category">📂 ${quote.category} | #${index + 1}</div>
        `;
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
    const filtered = quotes.filter(q => 
        q.text.includes(searchTerm) || q.category.includes(searchTerm)
    );
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

// حفظ كصورة - دقة عالية جداً
document.getElementById('saveBtn').addEventListener('click', function() {
    const quote = quotes[currentIndex];
    if (!quote) return;
    
    const canvas = document.getElementById('imageCanvas');
    const ctx = canvas.getContext('2d');
    
    // دقة عالية جداً 4K
    canvas.width = 2160;
    canvas.height = 3840;
    
    // خلفية متدرجة
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    const colors = [
        ['#0a0a2e', '#1a1a4e', '#2a1a3e'],
        ['#1a0a2e', '#2a1a4e', '#0a2a1e'],
        ['#2e0a0a', '#4e1a1a', '#3e2a1a'],
        ['#0a2e1a', '#1a4e2a', '#1a3e2a']
    ];
    const colorSet = colors[Math.floor(Math.random() * colors.length)];
    gradient.addColorStop(0, colorSet[0]);
    gradient.addColorStop(0.5, colorSet[1]);
    gradient.addColorStop(1, colorSet[2]);
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // دوائر زخرفية
    for (let i = 0; i < 5; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = 100 + Math.random() * 300;
        const circleGradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        circleGradient.addColorStop(0, `rgba(255, 215, 0, ${0.05 + Math.random() * 0.05})`);
        circleGradient.addColorStop(1, 'rgba(255, 215, 0, 0)');
        ctx.fillStyle = circleGradient;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // بطاقة زجاجية
    const cardX = 180;
    const cardY = 600;
    const cardWidth = canvas.width - 360;
    const cardHeight = canvas.height - 1200;
    
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowBlur = 60;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 10;
    
    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.beginPath();
    ctx.roundRect(cardX, cardY, cardWidth, cardHeight, 60);
    ctx.fill();
    
    ctx.shadowColor = 'transparent';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.roundRect(cardX, cardY, cardWidth, cardHeight, 60);
    ctx.stroke();
    
    // علامات اقتباس ذهبية
    ctx.fillStyle = 'rgba(255, 215, 0, 0.3)';
    ctx.font = '120px "Amiri", serif';
    ctx.textAlign = 'right';
    ctx.fillText('﴿', cardX + cardWidth - 60, cardY + 150);
    ctx.textAlign = 'left';
    ctx.fillText('﴾', cardX + 60, cardY + cardHeight - 50);
    
    // نص القول
    ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
    ctx.shadowBlur = 20;
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    const maxWidth = cardWidth - 160;
    const fontSize = Math.min(80, maxWidth / (quote.text.length * 0.6));
    ctx.font = `${Math.max(40, fontSize)}px "Amiri", serif`;
    
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
    
    const lineHeight = fontSize * 1.8;
    const startY = cardY + cardHeight / 2 - (lines.length - 1) * lineHeight / 2;
    
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowBlur = 30;
    
    lines.forEach((line, i) => {
        ctx.fillText(line.trim(), canvas.width / 2, startY + i * lineHeight);
    });
    
    // التصنيف
    ctx.shadowBlur = 10;
    ctx.fillStyle = 'rgba(255, 215, 0, 0.8)';
    ctx.font = '45px "Cairo", sans-serif';
    ctx.fillText(`📂 ${quote.category}`, canvas.width / 2, cardY + cardHeight - 120);
    
    // حقوق الملكية
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.font = '35px "Cairo", sans-serif';
    ctx.fillText('@ne_7u', canvas.width / 2, canvas.height - 150);
    
    // تحويل إلى صورة
    const link = document.createElement('a');
    link.download = `قول_الإمام_علي_${currentIndex + 1}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    
    showToast(' تم حفظ الصورة بدقة عالية');
});

// Toast
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
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
    this.quadraticCurveTo(x, y + h, x, y + r);
    this.lineTo(x, y + r);
    this.quadraticCurveTo(x, y, x + r, y);
    return this;
};
