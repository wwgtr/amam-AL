(function() {
    'use strict';
    
    var currentIndex = 0;
    var quotes = [];
    var fontSizeMultiplier = 1;
    var selectedBg = 0;
    var selectedSize = 0;
    var timerInterval = null;
    
    // مقاسات التحميل (9 خيارات)
    var sizes = [
        { name: 'ستوري', dims: '1080×1920', icon: '📱', w: 1080, h: 1920 },
        { name: 'منشور انستا', dims: '1080×1080', icon: '📷', w: 1080, h: 1080 },
        { name: 'بورترية انستا', dims: '1080×1350', icon: '🖼️', w: 1080, h: 1350 },
        { name: 'منشور تلجرام', dims: '1200×630', icon: '✈️', w: 1200, h: 630 },
        { name: 'ستوري تلجرام', dims: '1080×1920', icon: '📺', w: 1080, h: 1920 },
        { name: 'منشور فيسبوك', dims: '1200×630', icon: '📘', w: 1200, h: 630 },
        { name: 'ستوري فيسبوك', dims: '1080×1920', icon: '📖', w: 1080, h: 1920 },
        { name: 'غلاف فيسبوك', dims: '851×315', icon: '🖌️', w: 851, h: 315 },
        { name: 'ملصق شفاف', dims: '2000×2000', icon: '🏷️', w: 2000, h: 2000 }
    ];
    
    // 40 خلفية متنوعة (عادية، مخططة، منقطة، هندسية، نجوم)
    var backgrounds = [
        // خلفيات عادية (10)
        { name: 'ذهبي كلاسيك', colors: ['#0a0505','#1a0a05','#0a0510','#000000'], type: 'gradient' },
        { name: 'أزرق ليلي', colors: ['#050a15','#0a1530','#051020','#000510'], type: 'gradient' },
        { name: 'أخضر زمردي', colors: ['#050a08','#0a1a10','#051008','#000a05'], type: 'gradient' },
        { name: 'بنفسجي ملكي', colors: ['#0a0515','#150a25','#0a0510','#05000a'], type: 'gradient' },
        { name: 'أحمر غامق', colors: ['#150505','#250a0a','#100505','#0a0000'], type: 'gradient' },
        { name: 'وردي ناعم', colors: ['#1a0a15','#2a1520','#150a10','#0a0508'], type: 'gradient' },
        { name: 'كحلي أنيق', colors: ['#050a15','#0a1025','#050810','#00050a'], type: 'gradient' },
        { name: 'نحاسي دافئ', colors: ['#150a05','#251510','#100a05','#0a0500'], type: 'gradient' },
        { name: 'رمادي دخاني', colors: ['#0a0a0a','#151515','#0a0a0a','#050505'], type: 'gradient' },
        { name: 'تركواز', colors: ['#051015','#0a2025','#051518','#000a0e'], type: 'gradient' },
        // خلفيات مخططة (10)
        { name: 'مخطط ذهبي', colors: ['#0a0505','#d4a843'], type: 'stripes', stripeWidth: 40 },
        { name: 'مخطط أزرق', colors: ['#050a15','#1a3a6a'], type: 'stripes', stripeWidth: 30 },
        { name: 'مخطط أخضر', colors: ['#050a08','#1a4a2a'], type: 'stripes', stripeWidth: 35 },
        { name: 'مخطط بنفسجي', colors: ['#0a0515','#3a1a5a'], type: 'stripes', stripeWidth: 45 },
        { name: 'مخطط أحمر', colors: ['#150505','#5a1a1a'], type: 'stripes', stripeWidth: 25 },
        { name: 'مخطط وردي', colors: ['#1a0a15','#5a2a3a'], type: 'stripes', stripeWidth: 50 },
        { name: 'مخطط كحلي', colors: ['#050a15','#2a3a5a'], type: 'stripes', stripeWidth: 30 },
        { name: 'مخطط نحاسي', colors: ['#150a05','#5a3a1a'], type: 'stripes', stripeWidth: 40 },
        { name: 'مخطط رمادي', colors: ['#0a0a0a','#3a3a3a'], type: 'stripes', stripeWidth: 35 },
        { name: 'مخطط تركواز', colors: ['#051015','#1a4a4a'], type: 'stripes', stripeWidth: 45 },
        // خلفيات منقطة (10)
        { name: 'منقط ذهبي', colors: ['#0a0505','#d4a843'], type: 'dots', dotSize: 8, dotSpacing: 40 },
        { name: 'منقط أزرق', colors: ['#050a15','#1a3a6a'], type: 'dots', dotSize: 6, dotSpacing: 35 },
        { name: 'منقط أخضر', colors: ['#050a08','#1a4a2a'], type: 'dots', dotSize: 10, dotSpacing: 50 },
        { name: 'منقط بنفسجي', colors: ['#0a0515','#3a1a5a'], type: 'dots', dotSize: 7, dotSpacing: 30 },
        { name: 'منقط أحمر', colors: ['#150505','#5a1a1a'], type: 'dots', dotSize: 9, dotSpacing: 45 },
        { name: 'منقط وردي', colors: ['#1a0a15','#5a2a3a'], type: 'dots', dotSize: 5, dotSpacing: 25 },
        { name: 'منقط كحلي', colors: ['#050a15','#2a3a5a'], type: 'dots', dotSize: 8, dotSpacing: 40 },
        { name: 'منقط نحاسي', colors: ['#150a05','#5a3a1a'], type: 'dots', dotSize: 6, dotSpacing: 35 },
        { name: 'منقط رمادي', colors: ['#0a0a0a','#3a3a3a'], type: 'dots', dotSize: 7, dotSpacing: 30 },
        { name: 'منقط تركواز', colors: ['#051015','#1a4a4a'], type: 'dots', dotSize: 10, dotSpacing: 50 },
        // خلفيات هندسية ونجوم (10)
        { name: 'هندسي ذهبي', colors: ['#0a0505','#d4a843'], type: 'geometric', shape: 'hexagon' },
        { name: 'هندسي أزرق', colors: ['#050a15','#1a3a6a'], type: 'geometric', shape: 'triangle' },
        { name: 'هندسي أخضر', colors: ['#050a08','#1a4a2a'], type: 'geometric', shape: 'diamond' },
        { name: 'هندسي بنفسجي', colors: ['#0a0515','#3a1a5a'], type: 'geometric', shape: 'circle' },
        { name: 'هندسي أحمر', colors: ['#150505','#5a1a1a'], type: 'geometric', shape: 'square' },
        { name: 'نجوم ذهبية', colors: ['#0a0505','#d4a843'], type: 'stars', starCount: 50 },
        { name: 'نجوم زرقاء', colors: ['#050a15','#1a3a6a'], type: 'stars', starCount: 60 },
        { name: 'نجوم خضراء', colors: ['#050a08','#1a4a2a'], type: 'stars', starCount: 40 },
        { name: 'نجوم بنفسجية', colors: ['#0a0515','#3a1a5a'], type: 'stars', starCount: 55 },
        { name: 'نجوم حمراء', colors: ['#150505','#5a1a1a'], type: 'stars', starCount: 45 }
    ];
    
    function init() {
        if (typeof quotesData !== 'undefined' && quotesData.length > 0) {
            quotes = quotesData;
            showQuote(0);
        } else {
            document.getElementById('quoteContent').textContent = 'لا توجد أقوال متاحة';
        }
        
        initParticles();
        initSizeGrid();
        initBgGrid();
        
        document.getElementById('shuffleBtn').addEventListener('click', shuffleQuote);
        document.getElementById('prevBtn').addEventListener('click', prevQuote);
        document.getElementById('nextBtn').addEventListener('click', nextQuote);
        document.getElementById('saveBtn').addEventListener('click', openSaveModal);
        document.getElementById('shareBtn').addEventListener('click', shareQuote);
        document.getElementById('allQuotesBtn').addEventListener('click', openAllQuotes);
        document.getElementById('aboutBtn').addEventListener('click', openAbout);
        document.getElementById('settingsBtn').addEventListener('click', openSettings);
        document.getElementById('closeAllQuotes').addEventListener('click', closeAllQuotes);
        document.getElementById('closeAbout').addEventListener('click', closeAbout);
        document.getElementById('closeSettings').addEventListener('click', closeSettings);
        document.getElementById('closeSave').addEventListener('click', closeSaveModal);
        document.getElementById('confirmSave').addEventListener('click', saveAsImage);
        document.getElementById('searchInput').addEventListener('input', searchQuotes);
        document.getElementById('fontSizeSelect').addEventListener('change', changeFontSize);
        document.getElementById('darkModeToggle').addEventListener('click', toggleDarkMode);
        document.getElementById('minimalModeToggle').addEventListener('click', toggleMinimalMode);
        document.getElementById('timerSelect').addEventListener('change', toggleTimer);
        
        window.addEventListener('click', function(e) {
            if (e.target.classList.contains('modal')) e.target.classList.remove('active');
        });
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowRight') prevQuote();
            if (e.key === 'ArrowLeft') nextQuote();
            if (e.key === ' ') { e.preventDefault(); shuffleQuote(); }
        });
        
        var touchStartX = 0, touchEndX = 0;
        document.addEventListener('touchstart', function(e) { touchStartX = e.changedTouches<span class="footnote-wrapper">[0](0)</span>.screenX; }, {passive: true});
        document.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches<span class="footnote-wrapper">[0](0)</span>.screenX;
            var diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 50) { if (diff > 0) nextQuote(); else prevQuote(); }
        }, {passive: true});
    }
    
    function initSizeGrid() {
        var grid = document.getElementById('sizeGrid');
        grid.innerHTML = '';
        for (var i = 0; i < sizes.length; i++) {
            (function(idx) {
                var div = document.createElement('div');
                div.className = 'size-item' + (idx === selectedSize ? ' selected' : '');
                div.innerHTML = '<div class="size-icon">' + sizes[idx].icon + '</div><div class="size-name">' + sizes[idx].name + '</div><div class="size-dims">' + sizes[idx].dims + '</div>';
                div.addEventListener('click', function() {
                    document.querySelectorAll('.size-item').forEach(function(el) { el.classList.remove('selected'); });
                    div.classList.add('selected');
                    selectedSize = idx;
                });
                grid.appendChild(div);
            })(i);
        }
    }
    
    function initBgGrid() {
        var grid = document.getElementById('bgGrid');
        grid.innerHTML = '';
        for (var i = 0; i < backgrounds.length; i++) {
            (function(idx) {
                var div = document.createElement('div');
                div.className = 'bg-grid-item' + (idx === selectedBg ? ' selected' : '');
                var previewStyle = '';
                var bg = backgrounds[idx];
                if (bg.type === 'gradient') {
                    previewStyle = 'background: linear-gradient(135deg, ' + bg.colors.join(',') + ');';
                } else if (bg.type === 'stripes') {
                    previewStyle = 'background: repeating-linear-gradient(45deg, ' + bg.colors<span class="footnote-wrapper">[0](0) </span>+ ' 0px, ' + bg.colors<span class="footnote-wrapper">[0](0) </span>+ ' ' + bg.stripeWidth + 'px, ' + bg.colors<span class="footnote-wrapper">[1](1) </span>+ ' ' + bg.stripeWidth + 'px, ' + bg.colors<span class="footnote-wrapper">[1](1) </span>+ ' ' + (bg.stripeWidth*2) + 'px);';
                } else if (bg.type === 'dots') {
                    previewStyle = 'background: ' + bg.colors<span class="footnote-wrapper">[0](0) </span>+ '; background-image: radial-gradient(' + bg.colors<span class="footnote-wrapper">[1](1) </span>+ ' ' + bg.dotSize + 'px, transparent ' + bg.dotSize + 'px); background-size: ' + bg.dotSpacing + 'px ' + bg.dotSpacing + 'px;';
                } else if (bg.type === 'geometric') {
                    previewStyle = 'background: ' + bg.colors<span class="footnote-wrapper">[0](0) </span>+ '; background-image: repeating-conic-gradient(' + bg.colors<span class="footnote-wrapper">[1](1) </span>+ ' 0% 25%, transparent 0% 50%); background-size: 20px 20px;';
                } else if (bg.type === 'stars') {
                    previewStyle = 'background: ' + bg.colors<span class="footnote-wrapper">[0](0) </span>+ '; background-image: radial-gradient(2px 2px at 20px 30px, ' + bg.colors<span class="footnote-wrapper">[1](1) </span>+ ', transparent), radial-gradient(2px 2px at 40px 70px, ' + bg.colors<span class="footnote-wrapper">[1](1) </span>+ ', transparent), radial-gradient(2px 2px at 50px 160px, ' + bg.colors<span class="footnote-wrapper">[1](1) </span>+ ', transparent), radial-gradient(2px 2px at 90px 40px, ' + bg.colors<span class="footnote-wrapper">[1](1) </span>+ ', transparent), radial-gradient(2px 2px at 130px 80px, ' + bg.colors<span class="footnote-wrapper">[1](1) </span>+ ', transparent); background-size: 200px 200px;';
                }
                div.innerHTML = '<div class="preview" style="' + previewStyle + '"></div><div class="name">' + bg.name + '</div>';
                div.addEventListener('click', function() {
                    document.querySelectorAll('.bg-grid-item').forEach(function(el) { el.classList.remove('selected'); });
                    div.classList.add('selected');
                    selectedBg = idx;
                });
                grid.appendChild(div);
            })(i);
        }
    }
    
    function initParticles() {
        var canvas = document.getElementById('particlesCanvas');
        var ctx = canvas.getContext('2d');
        var particles = [];
        var mouseX = 0, mouseY = 0;
        
        function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
        resize();
        window.addEventListener('resize', resize);
        
        for (var i = 0; i < 80; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 4 + 1,
                speedX: (Math.random() - 0.5) * 1.5,
                speedY: (Math.random() - 0.5) * 1.5 - 0.5,
                opacity: Math.random() * 0.8 + 0.2,
                color: getColor(),
                life: Math.random() * 100 + 50,
                maxLife: Math.random() * 100 + 50
            });
        }
        
        function getColor() {
            var colors = [
                {r:255,g:200,b:50},{r:255,g:150,b:30},{r:255,g:100,b:20},
                {r:255,g:50,b:10},{r:200,g:100,b:20},{r:255,g:220,b:100},{r:255,g:180,b:60}
            ];
            return colors[Math.floor(Math.random() * colors.length)];
        }
        
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (var i = 0; i < particles.length; i++) {
                var p = particles[i];
                p.x += p.speedX;
                p.y += p.speedY;
                p.life--;
                
                var dx = mouseX - p.x, dy = mouseY - p.y, dist = Math.sqrt(dx*dx+dy*dy);
                if (dist < 200) { p.speedX -= dx/dist*0.02; p.speedY -= dy/dist*0.02; }
                
                if (p.life <= 0 || p.x < -50 || p.x > canvas.width+50 || p.y < -50 || p.y > canvas.height+50) {
                    p.x = Math.random()*canvas.width; p.y = canvas.height+20;
                    p.speedX = (Math.random()-0.5)*1.5; p.speedY = -(Math.random()*2+0.5);
                    p.life = p.maxLife; p.color = getColor(); p.size = Math.random()*4+1;
                }
                
                var alpha = p.opacity * (p.life/p.maxLife);
                var glow = ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.size*4);
                glow.addColorStop(0,'rgba('+p.color.r+','+p.color.g+','+p.color.b+','+(alpha*0.3)+')');
                glow.addColorStop(1,'rgba('+p.color.r+','+p.color.g+','+p.color.b+',0)');
                ctx.fillStyle = glow;
                ctx.beginPath(); ctx.arc(p.x,p.y,p.size*4,0,Math.PI*2); ctx.fill();
                
                ctx.fillStyle = 'rgba('+p.color.r+','+p.color.g+','+p.color.b+','+alpha+')';
                ctx.shadowColor = 'rgba('+p.color.r+','+p.color.g+','+p.color.b+','+(alpha*0.5)+')';
                ctx.shadowBlur = 15;
                ctx.beginPath(); ctx.arc(p.x,p.y,p.size,0,Math.PI*2); ctx.fill();
                ctx.shadowBlur = 0;
            }
            requestAnimationFrame(animate);
        }
        
        document.addEventListener('mousemove', function(e) { mouseX=e.clientX; mouseY=e.clientY; });
        animate();
    }
    
    function showQuote(index) {
        if (quotes.length === 0) return;
        currentIndex = (index + quotes.length) % quotes.length;
        var quote = quotes[currentIndex];
        var el = document.getElementById('quoteContent');
        el.textContent = quote.text;
        updateFontSize(quote.text.length);
    }
    
    function updateFontSize(textLength) {
        var el = document.getElementById('quoteContent');
        var baseSize;
        if (textLength <= 30) baseSize = 2.0;
        else if (textLength <= 50) baseSize = 1.6;
        else if (textLength <= 80) baseSize = 1.3;
        else if (textLength <= 120) baseSize = 1.1;
        else baseSize = 0.95;
        el.style.fontSize = (baseSize * fontSizeMultiplier) + 'em';
    }
    
    function changeFontSize() {
        var val = document.getElementById('fontSizeSelect').value;
        if (val === 'small') fontSizeMultiplier = 0.8;
        else if (val === 'medium') fontSizeMultiplier = 1;
        else if (val === 'large') fontSizeMultiplier = 1.3;
        else if (val === 'xlarge') fontSizeMultiplier = 1.6;
        var quote = quotes[currentIndex];
        if (quote) updateFontSize(quote.text.length);
        showToast('تم تغيير حجم الخط');
    }
    
    function toggleDarkMode() {
        var container = document.getElementById('mainContainer');
        var track = document.getElementById('darkModeTrack');
        container.classList.toggle('dark-mode');
        track.classList.toggle('active');
        showToast(container.classList.contains('dark-mode') ? 'تم تفعيل الوضع الداكن' : 'تم إلغاء الوضع الداكن');
    }
    
    function toggleMinimalMode() {
        var container = document.getElementById('mainContainer');
        var track = document.getElementById('minimalModeTrack');
        container.classList.toggle('minimal-mode');
        track.classList.toggle('active');
        showToast(container.classList.contains('minimal-mode') ? 'تم إخفاء العناصر' : 'تم إظهار العناصر');
    }
    
    function toggleTimer() {
        var val = parseInt(document.getElementById('timerSelect').value);
        if (timerInterval) { clearInterval(timerInterval); timerInterval = null; }
        if (val > 0) {
            timerInterval = setInterval(function() { nextQuote(); }, val * 1000);
            showToast('تم تفعيل المؤقت التلقائي كل ' + val + ' ثواني');
        } else {
            showToast('تم إيقاف المؤقت التلقائي');
        }
    }
    
    function shuffleQuote() { showQuote(Math.floor(Math.random()*quotes.length)); showToast('تم اختيار قول عشوائي'); }
    function prevQuote() { showQuote(currentIndex-1); }
    function nextQuote() { showQuote(currentIndex+1); }
    function openAllQuotes() { document.getElementById('allQuotesModal').classList.add('active'); displayAllQuotes(quotes); }
    function closeAllQuotes() { document.getElementById('allQuotesModal').classList.remove('active'); }
    function openAbout() { document.getElementById('aboutModal').classList.add('active'); }
    function closeAbout() { document.getElementById('aboutModal').classList.remove('active'); }
    function openSettings() { document.getElementById('settingsModal').classList.add('active'); }
    function closeSettings() { document.getElementById('settingsModal').classList.remove('active'); }
    function openSaveModal() { document.getElementById('saveModal').classList.add('active'); }
    function closeSaveModal() { document.getElementById('saveModal').classList.remove('active'); }
    
    function displayAllQuotes(arr) {
        var list = document.getElementById('quotesList');
        list.innerHTML = '';
        for (var i=0;i<arr.length;i++) {
            (function(idx){
                var item = document.createElement('div');
                item.className = 'quote-item';
                item.innerHTML = '<div class="q-text">'+arr[idx].text+'</div><div class="q-number">#'+(idx+1)+'</div>';
                item.addEventListener('click',function(){ showQuote(idx); closeAllQuotes(); });
                list.appendChild(item);
            })(i);
        }
    }
    
    function searchQuotes() {
        var term = this.value.toLowerCase();
        var termClean = term.replace(/[ًٌٍَُِّْ]/g, '');
        var filtered = [];
        for (var i=0;i<quotes.length;i++) {
            var textClean = quotes[i].text.replace(/[ًٌٍَُِّْ]/g, '');
            if (textClean.toLowerCase().includes(termClean) || quotes[i].text.toLowerCase().includes(term)) {
                filtered.push(quotes[i]);
            }
        }
        displayAllQuotes(filtered);
    }
    
    function shareQuote() {
        var quote = quotes[currentIndex];
        if (!quote) return;
        var text = 'قال الإمام علي (عليه السلام):\n\n' + quote.text + '\n\n— موقع أقوال الإمام علي';
        var url = window.location.href;
        
        if (navigator.share) {
            navigator.share({ title: 'أقوال الإمام علي', text: text, url: url })
                .then(function() { showToast('تم المشاركة بنجاح'); })
                .catch(function() { showToast('تم إلغاء المشاركة'); });
        } else {
            var textarea = document.createElement('textarea');
            textarea.value = text + '\n' + url;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            showToast('تم نسخ النص للمشاركة');
        }
    }
    
    function saveAsImage() {
        var quote = quotes[currentIndex];
        if (!quote) return;
        closeSaveModal();
        
        var canvas = document.getElementById('imageCanvas');
        var ctx = canvas.getContext('2d');
        var size = sizes[selectedSize];
        canvas.width = size.w;
        canvas.height = size.h;
        
        var bg = backgrounds[selectedBg];
        
        // رسم الخلفية حسب النوع
        if (bg.type === 'gradient') {
            var grad = ctx.createLinearGradient(0,0,canvas.width,canvas.height);
            grad.addColorStop(0, bg.colors<span class="footnote-wrapper">[0](0)</span>);
            grad.addColorStop(0.3, bg.colors<span class="footnote-wrapper">[1](1)</span>);
            grad.addColorStop(0.6, bg.colors<span class="footnote-wrapper">[2](2)</span>);
            grad.addColorStop(1, bg.colors<span class="footnote-wrapper">[3](3)</span>);
            ctx.fillStyle = grad;
            ctx.fillRect(0,0,canvas.width,canvas.height);
        } else if (bg.type === 'stripes') {
            ctx.fillStyle = bg.colors<span class="footnote-wrapper">[0](0)</span>;
            ctx.fillRect(0,0,canvas.width,canvas.height);
            var sw = bg.stripeWidth * (canvas.width / 1080);
            for (var x = 0; x < canvas.width + canvas.height; x += sw * 2) {
                ctx.save();
                ctx.translate(x, 0);
                ctx.rotate(45 * Math.PI / 180);
                ctx.fillStyle = bg.colors<span class="footnote-wrapper">[1](1)</span>;
                ctx.fillRect(0, -canvas.height, sw, canvas.height * 3);
                ctx.restore();
            }
        } else if (bg.type === 'dots') {
            ctx.fillStyle = bg.colors<span class="footnote-wrapper">[0](0)</span>;
            ctx.fillRect(0,0,canvas.width,canvas.height);
            var ds = bg.dotSize * (canvas.width / 1080);
            var dsp = bg.dotSpacing * (canvas.width / 1080);
            ctx.fillStyle = bg.colors<span class="footnote-wrapper">[1](1)</span>;
            for (var dx = 0; dx < canvas.width; dx += dsp) {
                for (var dy = 0; dy < canvas.height; dy += dsp) {
                    ctx.beginPath();
                    ctx.arc(dx, dy, ds, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        } else if (bg.type === 'geometric') {
            ctx.fillStyle = bg.colors<span class="footnote-wrapper">[0](0)</span>;
            ctx.fillRect(0,0,canvas.width,canvas.height);
            ctx.strokeStyle = bg.colors<span class="footnote-wrapper">[1](1)</span>;
            ctx.lineWidth = 2;
            var gs = 40 * (canvas.width / 1080);
            for (var gx = 0; gx < canvas.width + gs; gx += gs) {
                for (var gy = 0; gy < canvas.height + gs; gy += gs) {
                    if (bg.shape === 'hexagon') {
                        ctx.beginPath();
                        for (var hi = 0; hi < 6; hi++) {
                            var ha = hi * Math.PI / 3 - Math.PI / 6;
                            var hx = gx + gs/2 + gs/2 * Math.cos(ha);
                            var hy = gy + gs/2 + gs/2 * Math.sin(ha);
                            if (hi === 0) ctx.moveTo(hx, hy);
                            else ctx.lineTo(hx, hy);
                        }
                        ctx.closePath();
                        ctx.stroke();
                    } else if (bg.shape === 'triangle') {
                        ctx.beginPath();
                        ctx.moveTo(gx + gs/2, gy);
                        ctx.lineTo(gx + gs, gy + gs);
                        ctx.lineTo(gx, gy + gs);
                        ctx.closePath();
                        ctx.stroke();
                    } else if (bg.shape === 'diamond') {
                        ctx.beginPath();
                        ctx.moveTo(gx + gs/2, gy);
                        ctx.lineTo(gx + gs, gy + gs/2);
                        ctx.lineTo(gx + gs/2, gy + gs);
                        ctx.lineTo(gx, gy + gs/2);
                        ctx.closePath();
                        ctx.stroke();
                    } else if (bg.shape === 'circle') {
                        ctx.beginPath();
                        ctx.arc(gx + gs/2, gy + gs/2, gs/3, 0, Math.PI * 2);
                        ctx.stroke();
                    } else if (bg.shape === 'square') {
                        ctx.strokeRect(gx + gs/6, gy + gs/6, gs * 2/3, gs * 2/3);
                    }
                }
            }
        } else if (bg.type === 'stars') {
            ctx.fillStyle = bg.colors<span class="footnote-wrapper">[0](0)</span>;
            ctx.fillRect(0,0,canvas.width,canvas.height);
            ctx.fillStyle = bg.colors<span class="footnote-wrapper">[1](1)</span>;
            for (var si = 0; si < bg.starCount; si++) {
                var sx = Math.random() * canvas.width;
                var sy = Math.random() * canvas.height;
                var sr = Math.random() * 3 + 1;
                ctx.beginPath();
                ctx.arc(sx, sy, sr, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        
        // إضافة تأثيرات ضوئية
        for (var i=0;i<6;i++) {
            var x=Math.random()*canvas.width, y=Math.random()*canvas.height, r=Math.min(canvas.width,canvas.height)*0.15;
            var cg=ctx.createRadialGradient(x,y,0,x,y,r);
            cg.addColorStop(0,'rgba(212,168,67,0.04)'); cg.addColorStop(1,'rgba(212,168,67,0)');
            ctx.fillStyle=cg; ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2); ctx.fill();
        }
        
        // إطار زخرفي
        var margin = Math.min(canvas.width, canvas.height) * 0.05;
        ctx.strokeStyle='rgba(212,168,67,0.12)'; ctx.lineWidth=3; ctx.strokeRect(margin,margin,canvas.width-margin*2,canvas.height-margin*2);
        ctx.strokeStyle='rgba(212,168,67,0.06)'; ctx.lineWidth=1; ctx.strokeRect(margin*1.5,margin*1.5,canvas.width-margin*3,canvas.height-margin*3);
        
        // عنوان
        var titleSize = Math.min(canvas.width, canvas.height) * 0.035;
        ctx.shadowColor='rgba(0,0,0,0.5)'; ctx.shadowBlur=20;
        ctx.fillStyle='rgba(212,168,67,0.5)'; ctx.textAlign='center'; ctx.textBaseline='middle';
        ctx.font=titleSize+'px "Amiri", serif';
        ctx.fillText('قال الإمام علي (عليه السلام)',canvas.width/2,canvas.height * 0.1);
        
        // خلفية النص
        var textMarginX = canvas.width * 0.1;
        var textMarginY = canvas.height * 0.18;
        var textWidth = canvas.width - textMarginX * 2;
        var textHeight = canvas.height * 0.6;
        ctx.shadowColor='rgba(0,0,0,0.6)'; ctx.shadowBlur=60; ctx.shadowOffsetX=0; ctx.shadowOffsetY=10;
        ctx.fillStyle='rgba(255,255,255,0.04)';
        roundRect(ctx, textMarginX, textMarginY, textWidth, textHeight, Math.min(canvas.width,canvas.height)*0.03);
        ctx.fill();
        ctx.shadowColor='transparent'; ctx.strokeStyle='rgba(212,168,67,0.1)'; ctx.lineWidth=2;
        roundRect(ctx, textMarginX, textMarginY, textWidth, textHeight, Math.min(canvas.width,canvas.height)*0.03);
        ctx.stroke();
        
        // النص
        ctx.shadowColor='rgba(0,0,0,0.4)'; ctx.shadowBlur=25;
        ctx.fillStyle='#f5f0e8'; ctx.textAlign='center'; ctx.textBaseline='middle';
        
        var maxTextWidth = textWidth - canvas.width * 0.06;
        var tl = quote.text.length;
        var bfs;
        if (size.name === 'ملصق شفاف') bfs = Math.min(canvas.width, canvas.height) * 0.08;
        else if (tl <= 30) bfs = Math.min(canvas.width, canvas.height) * 0.06;
        else if (tl <= 50) bfs = Math.min(canvas.width, canvas.height) * 0.05;
        else if (tl <= 80) bfs = Math.min(canvas.width, canvas.height) * 0.04;
        else if (tl <= 120) bfs = Math.min(canvas.width, canvas.height) * 0.035;
        else bfs = Math.min(canvas.width, canvas.height) * 0.03;
        
        ctx.font=bfs+'px "Amiri", serif';
        
        var words=quote.text.split(' '), lines=[], cl='';
        for (var w=0;w<words.length;w++) {
            var tl2=cl+' '+words[w], m=ctx.measureText(tl2);
            if (m.width>maxTextWidth&&cl!==''){lines.push(cl);cl=words[w];}else{cl=tl2;}
        }
        lines.push(cl);
        
        var lh=bfs*1.8;
        var startY = textMarginY + textHeight/2 - (lines.length-1)*lh/2;
        ctx.shadowColor='rgba(0,0,0,0.6)'; ctx.shadowBlur=30;
        
     for (var l = 0; l < lines.length; l++) {
    ctx.fillText(lines[l], canvas.width / 2, startY + l * lh);
}

        for (var l = 0; l < lines.length; l++) {
            ctx.fillText(lines[l], canvas.width / 2, startY + l * lh);
        }
        
        // توقيع
        var signSize = Math.min(canvas.width, canvas.height) * 0.025;
        ctx.shadowColor = 'rgba(0,0,0,0.3)';
        ctx.shadowBlur = 10;
        ctx.fillStyle = 'rgba(212,168,67,0.4)';
        ctx.font = signSize + 'px "Amiri", serif';
        ctx.fillText('— موقع أقوال الإمام علي (عليه السلام)', canvas.width / 2, canvas.height * 0.88);
        
        // تحويل اللوحة إلى صورة وتحميلها
        var link = document.createElement('a');
        link.download = 'imam-ali-quote-' + (currentIndex + 1) + '.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
        
        showToast('تم تحميل الصورة بنجاح');
    }
    
    // دالة مساعدة لرسم مستطيل بزوايا دائرية
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
    
    // دالة عرض الإشعارات (Toast)
    function showToast(message) {
        var toast = document.getElementById('toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'toast';
            toast.style.cssText = 'position:fixed;bottom:30px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,0.8);color:#f5f0e8;padding:12px 24px;border-radius:8px;font-family:"Amiri",serif;font-size:1.1em;z-index:10000;opacity:0;transition:opacity 0.3s ease;pointer-events:none;border:1px solid rgba(212,168,67,0.3);';
            document.body.appendChild(toast);
        }
        toast.textContent = message;
        toast.style.opacity = '1';
        setTimeout(function() {
            toast.style.opacity = '0';
        }, 2000);
    }
    
    // تشغيل التطبيق عند تحميل الصفحة
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
})();
