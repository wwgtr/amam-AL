// التطبيق الرئيسي
(function() {
    'use strict';
    
    var currentIndex = 0;
    var quotes = [];
    
    // تهيئة الموقع
    function init() {
        // التحقق من وجود البيانات
        if (typeof quotesData !== 'undefined' && quotesData.length > 0) {
            quotes = quotesData;
            showQuote(0);
            updateCounter();
        } else {
            document.getElementById('quoteContent').textContent = 'لا توجد أقوال متاحة';
        }
        
        // ربط الأزرار
        document.getElementById('shuffleBtn').addEventListener('click', shuffleQuote);
        document.getElementById('prevBtn').addEventListener('click', prevQuote);
        document.getElementById('nextBtn').addEventListener('click', nextQuote);
        document.getElementById('saveBtn').addEventListener('click', saveAsImage);
        document.getElementById('allQuotesBtn').addEventListener('click', openAllQuotes);
        document.getElementById('aboutBtn').addEventListener('click', openAbout);
        
        document.getElementById('closeAllQuotes').addEventListener('click', closeAllQuotes);
        document.getElementById('closeAbout').addEventListener('click', closeAbout);
        
        document.getElementById('searchInput').addEventListener('input', searchQuotes);
        
        // إغلاق النوافذ عند الضغط خارجها
        window.addEventListener('click', function(e) {
            if (e.target.classList.contains('modal')) {
                e.target.classList.remove('active');
            }
        });
        
        // التنقل بلوحة المفاتيح
        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowRight') prevQuote();
            if (e.key === 'ArrowLeft') nextQuote();
            if (e.key === ' ') {
                e.preventDefault();
                shuffleQuote();
            }
        });
        
        // التنقل باللمس
        var touchStartX = 0;
        var touchEndX = 0;
        
        document.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, {passive: true});
        
        document.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            var diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) nextQuote();
                else prevQuote();
            }
        }, {passive: true});
    }
    
    // عرض القول
    function showQuote(index) {
        if (quotes.length === 0) return;
        currentIndex = (index + quotes.length) % quotes.length;
        var quote = quotes[currentIndex];
        
        var contentEl = document.getElementById('quoteContent');
        contentEl.textContent = quote.text;
        
        // ضبط حجم الخط حسب طول القول
        var textLength = quote.text.length;
        var fontSize;
        
        if (textLength <= 30) {
            fontSize = 2.0;
        } else if (textLength <= 50) {
            fontSize = 1.6;
        } else if (textLength <= 80) {
            fontSize = 1.3;
        } else if (textLength <= 120) {
            fontSize = 1.1;
        } else {
            fontSize = 0.95;
        }
        
        contentEl.style.fontSize = fontSize + 'em';
        
        document.getElementById('quoteCategory').textContent = quote.category;
        document.getElementById('quoteNumber').textContent = '#' + (currentIndex + 1);
        updateCounter();
    }
    
    function updateCounter() {
        document.getElementById('counter').textContent = (currentIndex + 1) + ' / ' + quotes.length;
    }
    
    function shuffleQuote() {
        var randomIndex = Math.floor(Math.random() * quotes.length);
        showQuote(randomIndex);
        showToast('تم اختيار قول عشوائي');
    }
    
    function prevQuote() {
        showQuote(currentIndex - 1);
    }
    
    function nextQuote() {
        showQuote(currentIndex + 1);
    }
    
    function openAllQuotes() {
        document.getElementById('allQuotesModal').classList.add('active');
        displayAllQuotes(quotes);
    }
    
    function closeAllQuotes() {
        document.getElementById('allQuotesModal').classList.remove('active');
    }
    
    function openAbout() {
        document.getElementById('aboutModal').classList.add('active');
    }
    
    function closeAbout() {
        document.getElementById('aboutModal').classList.remove('active');
    }
    
    function displayAllQuotes(quotesArray) {
        var list = document.getElementById('quotesList');
        list.innerHTML = '';
        
        for (var i = 0; i < quotesArray.length; i++) {
            (function(index) {
                var item = document.createElement('div');
                item.className = 'quote-item';
                item.innerHTML = '<div class="q-text">' + quotesArray[index].text + '</div><div class="q-category">' + quotesArray[index].category + ' | #' + (index + 1) + '</div>';
                item.addEventListener('click', function() {
                    showQuote(index);
                    closeAllQuotes();
                });
                list.appendChild(item);
            })(i);
        }
    }
    
    function searchQuotes() {
        var searchTerm = this.value.toLowerCase();
        var filtered = [];
        
        for (var i = 0; i < quotes.length; i++) {
            if (quotes[i].text.toLowerCase().includes(searchTerm) || quotes[i].category.toLowerCase().includes(searchTerm)) {
                filtered.push(quotes[i]);
            }
        }
        
        displayAllQuotes(filtered);
    }
    
    function saveAsImage() {
        var quote = quotes[currentIndex];
        if (!quote) return;
        
        var canvas = document.getElementById('imageCanvas');
        var ctx = canvas.getContext('2d');
        
        // دقة عالية
        canvas.width = 2160;
        canvas.height = 3840;
        
        // خلفية متدرجة
        var gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, '#0a0a0a');
        gradient.addColorStop(0.3, '#1a0a05');
        gradient.addColorStop(0.6, '#0a0510');
        gradient.addColorStop(1, '#000000');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // زخارف دائرية
        for (var i = 0; i < 6; i++) {
            var x = Math.random() * canvas.width;
            var y = Math.random() * canvas.height;
            var radius = 80 + Math.random() * 250;
            var circleGradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
            circleGradient.addColorStop(0, 'rgba(212, 168, 67, 0.04)');
            circleGradient.addColorStop(1, 'rgba(212, 168, 67, 0)');
            ctx.fillStyle = circleGradient;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // إطار زخرفي
        ctx.strokeStyle = 'rgba(212, 168, 67, 0.12)';
        ctx.lineWidth = 3;
        ctx.strokeRect(100, 100, canvas.width - 200, canvas.height - 200);
        
        ctx.strokeStyle = 'rgba(212, 168, 67, 0.06)';
        ctx.lineWidth = 1;
        ctx.strokeRect(140, 140, canvas.width - 280, canvas.height - 280);
        
        // بطاقة النص
        var cardX = 220;
        var cardY = 750;
        var cardWidth = canvas.width - 440;
        var cardHeight = canvas.height - 1500;
        
        ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
        ctx.shadowBlur = 80;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 15;
        
        ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
        roundRect(ctx, cardX, cardY, cardWidth, cardHeight, 50);
        ctx.fill();
        
        ctx.shadowColor = 'transparent';
        ctx.strokeStyle = 'rgba(212, 168, 67, 0.12)';
        ctx.lineWidth = 2;
        roundRect(ctx, cardX, cardY, cardWidth, cardHeight, 50);
        ctx.stroke();
        
        // علامات اقتباس
        ctx.fillStyle = 'rgba(212, 168, 67, 0.18)';
        ctx.font = '90px "Amiri", serif';
        ctx.textAlign = 'right';
        ctx.fillText('\uFD3F', cardX + cardWidth - 40, cardY + 120);
        ctx.textAlign = 'left';
        ctx.fillText('\uFD3E', cardX + 40, cardY + cardHeight - 30);
        
        // نص القول
        ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
        ctx.shadowBlur = 25;
        ctx.fillStyle = '#f5f0e8';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        var maxWidth = cardWidth - 120;
        var textLength = quote.text.length;
        var baseFontSize;
        
        if (textLength <= 30) baseFontSize = 85;
        else if (textLength <= 50) baseFontSize = 70;
        else if (textLength <= 80) baseFontSize = 55;
        else if (textLength <= 120) baseFontSize = 45;
        else baseFontSize = 38;
        
        ctx.font = baseFontSize + 'px "Amiri", serif';
        
        // تقسيم النص
        var words = quote.text.split(' ');
        var lines = [];
        var currentLine = '';
        
        for (var w = 0; w < words.length; w++) {
            var testLine = currentLine + ' ' + words[w];
            var metrics = ctx.measureText(testLine);
            if (metrics.width > maxWidth && currentLine !== '') {
                lines.push(currentLine);
                currentLine = words[w];
            } else {
                currentLine = testLine;
            }
        }
        lines.push(currentLine);
        
        var lineHeight = baseFontSize * 1.8;
        var startY = cardY + cardHeight / 2 - (lines.length - 1) * lineHeight / 2;
        
        ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
        ctx.shadowBlur = 35;
        
        for (var l = 0; l < lines.length; l++) {
            ctx.fillText(lines[l].trim(), canvas.width / 2, startY + l * lineHeight);
        }
        
        // التصنيف
        ctx.shadowBlur = 10;
        ctx.fillStyle = 'rgba(212, 168, 67, 0.65)';
        ctx.font = '36px "Cairo", sans-serif';
        ctx.fillText(quote.category, canvas.width / 2, cardY + cardHeight - 90);
        
        // حقوق الملكية
        ctx.shadowBlur = 15;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.font = '30px "Amiri", serif';
        ctx.fillText('\u2014 \u0633\u064A\u0641 \u0639\u0644\u064A \u2014', canvas.width / 2, canvas.height - 180);
        
        ctx.fillStyle = 'rgba(212, 168, 67, 0.25)';
        ctx.font = '26px "Cairo", sans-serif';
        ctx.fillText('@ne_7u', canvas.width / 2, canvas.height - 120);
        
        // تحميل الصورة
        var link = document.createElement('a');
        link.download = 'قول_الإمام_علي_' + (currentIndex + 1) + '.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
        
        showToast('تم حفظ الصورة بدقة عالية');
    }
    
    // دالة roundRect
    function roundRect(ctx, x, y, w, h, r) {
        if (w < 2 * r) r = w / 2;
        if (h < 2 * r) r = h / 2;
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
    
    function showToast(message) {
        var toast = document.getElementById('toast');
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(function() {
            toast.classList.remove('show');
        }, 3000);
    }
    
    // تشغيل عند تحميل الصفحة
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
