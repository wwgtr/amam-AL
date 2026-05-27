(function() {
    'use strict';
    
    // ============================================
    // قائمة الأقوال (محرك البيانات)
    // ============================================
    var quotes = [
        {
            id: 1,
            text: "لا تظنن كلمة خرجت من أحد إلا وفي نفسه من الخير ما ليس في نفسك",
            author: "الإمام علي بن أبي طالب",
            category: "الحكمة"
        },
        {
            id: 2,
            text: "أفضل الجهاد من جاهد نفسه التي بين جنبيه",
            author: "الإمام علي بن أبي طالب",
            category: "الجهاد"
        },
        {
            id: 3,
            text: "لا تكن عبد غيرك وقد جعلك الله حراً",
            author: "الإمام علي بن أبي طالب",
            category: "الحرية"
        },
        {
            id: 4,
            text: "العلم خير من المال، العلم يحرسك وأنت تحرس المال",
            author: "الإمام علي بن أبي طالب",
            category: "العلم"
        },
        {
            id: 5,
            text: "الصبر مطية لا تكبو",
            author: "الإمام علي بن أبي طالب",
            category: "الصبر"
        },
        {
            id: 6,
            text: "من أطال الأمل أساء العمل",
            author: "الإمام علي بن أبي طالب",
            category: "العمل"
        },
        {
            id: 7,
            text: "لا خير في قول لا يفعل، ولا في عمل لا يخلص، ولا في عبادة لا يعقل",
            author: "الإمام علي بن أبي طالب",
            category: "الإخلاص"
        },
        {
            id: 8,
            text: "أشد الذنوب ما استخف به صاحبه",
            author: "الإمام علي بن أبي طالب",
            category: "الذنوب"
        },
        {
            id: 9,
            text: "لا تطلب السرعة في العمل، واطلب الإتقان فيه",
            author: "الإمام علي بن أبي طالب",
            category: "الإتقان"
        },
        {
            id: 10,
            text: "من كثر كلامه كثر خطؤه",
            author: "الإمام علي بن أبي طالب",
            category: "الكلام"
        }
    ];
    
    // ============================================
    // خيارات التحميل (مقاسات السوشيال ميديا)
    // ============================================
    var downloadOptions = [
        // ستوري
        { name: 'ستوري انستا', dims: '1080×1920', icon: '📱', w: 1080, h: 1920, platform: 'instagram' },
        { name: 'ستوري فيسبوك', dims: '1080×1920', icon: '📖', w: 1080, h: 1920, platform: 'facebook' },
        { name: 'ستوري تلجرام', dims: '1080×1920', icon: '📺', w: 1080, h: 1920, platform: 'telegram' },
        { name: 'حالة واتساب', dims: '750×1334', icon: '💬', w: 750, h: 1334, platform: 'whatsapp' },
        
        // منشورات انستا
        { name: 'منشور انستا (مربع)', dims: '1080×1080', icon: '📷', w: 1080, h: 1080, platform: 'instagram' },
        { name: 'بورترية انستا', dims: '1080×1350', icon: '🖼️', w: 1080, h: 1350, platform: 'instagram' },
        { name: 'بكرات انستا', dims: '1080×1920', icon: '🎬', w: 1080, h: 1920, platform: 'instagram' },
        
        // منشورات تلجرام
        { name: 'منشور تلجرام', dims: '1200×630', icon: '✈️', w: 1200, h: 630, platform: 'telegram' },
        { name: 'قناة تلجرام (كبير)', dims: '1920×1080', icon: '📡', w: 1920, h: 1080, platform: 'telegram' },
        
        // قياسات فيسبوك
        { name: 'منشور فيسبوك', dims: '1200×630', icon: '📘', w: 1200, h: 630, platform: 'facebook' },
        { name: 'غلاف فيسبوك', dims: '851×315', icon: '🖌️', w: 851, h: 315, platform: 'facebook' },
        { name: 'صورة بروفايل فيسبوك', dims: '400×400', icon: '👤', w: 400, h: 400, platform: 'facebook' },
        
        // ملصق شفاف عالي الدقة
        { name: 'ملصق شفاف (HD)', dims: '2000×2000', icon: '🏷️', w: 2000, h: 2000, platform: 'sticker' },
        { name: 'ملصق شفاف (4K)', dims: '4000×4000', icon: '💎', w: 4000, h: 4000, platform: 'sticker' },
        
        // إضافات
        { name: 'تويتر (منشور)', dims: '400×220', icon: '🐦', w: 400, h: 220, platform: 'twitter' },
        { name: 'لينكد إن (منشور)', dims: '1104×736', icon: '💼', w: 1104, h: 736, platform: 'linkedin' },
        { name: 'يوتيوب (غلاف)', dims: '2560×1440', icon: '▶️', w: 2560, h: 1440, platform: 'youtube' }
    ];
    
    // ============================================
    // خلفيات متنوعة
    // ============================================
    var backgrounds = [
        // خلفيات طبيعية
        { id: 'bg-nature-1', name: 'غروب', type: 'gradient', colors: ['#ff7e5f', '#feb47b'], pattern: 'none' },
        { id: 'bg-nature-2', name: 'بحر', type: 'gradient', colors: ['#00b4db', '#0083b0'], pattern: 'none' },
        { id: 'bg-nature-3', name: 'غابة', type: 'gradient', colors: ['#134e5e', '#71b280'], pattern: 'none' },
        { id: 'bg-nature-4', name: 'سماء ليلية', type: 'gradient', colors: ['#0f0c29', '#302b63', '#24243e'], pattern: 'none' },
        
        // خلفيات مخططة
        { id: 'bg-stripe-1', name: 'مخطط أفقي', type: 'solid', colors: ['#667eea', '#764ba2'], pattern: 'stripes-horizontal' },
        { id: 'bg-stripe-2', name: 'مخطط عمودي', type: 'solid', colors: ['#f093fb', '#f5576c'], pattern: 'stripes-vertical' },
        { id: 'bg-stripe-3', name: 'مخطط قطري', type: 'solid', colors: ['#4facfe', '#00f2fe'], pattern: 'stripes-diagonal' },
        { id: 'bg-stripe-4', name: 'مخطط متقاطع', type: 'solid', colors: ['#43e97b', '#38f9d7'], pattern: 'stripes-cross' },
        
        // خلفيات ناعمة
        { id: 'bg-soft-1', name: 'وردي ناعم', type: 'gradient', colors: ['#fccb90', '#d57eeb'], pattern: 'none' },
        { id: 'bg-soft-2', name: 'أزرق ناعم', type: 'gradient', colors: ['#a18cd1', '#fbc2eb'], pattern: 'none' },
        { id: 'bg-soft-3', name: 'أخضر ناعم', type: 'gradient', colors: ['#84fab0', '#8fd3f4'], pattern: 'none' },
        { id: 'bg-soft-4', name: 'ذهبي ناعم', type: 'gradient', colors: ['#fa709a', '#fee140'], pattern: 'none' },
        
        // خلفيات داكنة
        { id: 'bg-dark-1', name: 'داكن أنيق', type: 'solid', colors: ['#2c3e50', '#3498db'], pattern: 'none' },
        { id: 'bg-dark-2', name: 'داكن فاخر', type: 'solid', colors: ['#1a1a2e', '#16213e'], pattern: 'none' },
        { id: 'bg-dark-3', name: 'داكن نجمي', type: 'solid', colors: ['#0d0d0d', '#1a1a2e'], pattern: 'dots' },
        
        // خلفيات بنمط نقاط
        { id: 'bg-dots-1', name: 'نقاط صغيرة', type: 'solid', colors: ['#667eea', '#764ba2'], pattern: 'dots-small' },
        { id: 'bg-dots-2', name: 'نقاط كبيرة', type: 'solid', colors: ['#f093fb', '#f5576c'], pattern: 'dots-large' },
        
        // خلفيات خشبية/رخامية
        { id: 'bg-marble-1', name: 'رخام أبيض', type: 'solid', colors: ['#f5f7fa', '#c3cfe2'], pattern: 'marble' },
        { id: 'bg-marble-2', name: 'خشب', type: 'solid', colors: ['#8e6e53', '#c4a882'], pattern: 'wood' },
        
        // خلفيات هندسية
        { id: 'bg-geo-1', name: 'هندسي مثلثات', type: 'solid', colors: ['#667eea', '#764ba2'], pattern: 'triangles' },
        { id: 'bg-geo-2', name: 'هندسي دوائر', type: 'solid', colors: ['#f093fb', '#f5576c'], pattern: 'circles' },
        { id: 'bg-geo-3', name: 'هندسي سداسي', type: 'solid', colors: ['#4facfe', '#00f2fe'], pattern: 'hexagons' },
        
        // خلفيات زهور
        { id: 'bg-floral-1', name: 'زهور صغيرة', type: 'solid', colors: ['#ffecd2', '#fcb69f'], pattern: 'floral-small' },
        { id: 'bg-floral-2', name: 'زهور كبيرة', type: 'solid', colors: ['#a18cd1', '#fbc2eb'], pattern: 'floral-large' },
        
        // خلفيات إسلامية
        { id: 'bg-islamic-1', name: 'زخرفة إسلامية', type: 'solid', colors: ['#0f2027', '#203a43', '#2c5364'], pattern: 'islamic' },
        { id: 'bg-islamic-2', name: 'قبة ذهبية', type: 'gradient', colors: ['#8e2de2', '#4a00e0'], pattern: 'none' },
        
        // خلفيات ألوان صلبة
        { id: 'bg-solid-1', name: 'أحمر', type: 'solid', colors: ['#e74c3c'], pattern: 'none' },
        { id: 'bg-solid-2', name: 'أزرق', type: 'solid', colors: ['#3498db'], pattern: 'none' },
        { id: 'bg-solid-3', name: 'أخضر', type: 'solid', colors: ['#2ecc71'], pattern: 'none' },
        { id: 'bg-solid-4', name: 'أصفر', type: 'solid', colors: ['#f1c40f'], pattern: 'none' },
        { id: 'bg-solid-5', name: 'بنفسجي', type: 'solid', colors: ['#9b59b6'], pattern: 'none' },
        { id: 'bg-solid-6', name: 'برتقالي', type: 'solid', colors: ['#e67e22'], pattern: 'none' },
        { id: 'bg-solid-7', name: 'أسود', type: 'solid', colors: ['#000000'], pattern: 'none' },
        { id: 'bg-solid-8', name: 'أبيض', type: 'solid', colors: ['#ffffff'], pattern: 'none' }
    ];
    
    // ============================================
    // محرك التطبيق (Application Engine)
    // ============================================
    var engine = {
        // الحالة الحالية
        currentIndex: 0,
        favorites: JSON.parse(localStorage.getItem('favorites')) || [],
        history: [],
        isDarkMode: false,
        selectedBg: 0,
        selectedDownload: 0,
        fontSizeMultiplier: 1,
        
        // ============================================
        // دوال التهيئة
        // ============================================
        init: function() {
            this.loadSettings();
            this.displayQuote(this.currentIndex);
            this.setupEventListeners();
            this.updateUI();
            this.renderBackgrounds();
            this.renderDownloadOptions();
        },
        
        // ============================================
        // دوال عرض الأقوال
        // ============================================
        displayQuote: function(index) {
            if (index < 0 || index >= quotes.length) {
                console.error('Index out of bounds:', index);
                return;
            }
            
            var quote = quotes[index];
            var quoteText = document.getElementById('quote-text');
            var quoteAuthor = document.getElementById('quote-author');
            var quoteCounter = document.getElementById('quote-counter');
            var quoteCategory = document.getElementById('quote-category');
            
            if (quoteText) quoteText.textContent = quote.text;
            if (quoteAuthor) quoteAuthor.textContent = '— ' + quote.author;
            if (quoteCounter) quoteCounter.textContent = (index + 1) + ' / ' + quotes.length;
            if (quoteCategory) quoteCategory.textContent = quote.category;
            
            // تطبيق حجم الخط
            this.applyFontSize();
            
            // إضافة للتاريخ
            this.addToHistory(index);
        },
        
        // ============================================
        // دوال التنقل
        // ============================================
        nextQuote: function() {
            this.currentIndex = (this.currentIndex + 1) % quotes.length;
            this.displayQuote(this.currentIndex);
            this.updateUI();
        },
        
        prevQuote: function() {
            this.currentIndex = (this.currentIndex - 1 + quotes.length) % quotes.length;
            this.displayQuote(this.currentIndex);
            this.updateUI();
        },
        
        randomQuote: function() {
            var randomIndex = Math.floor(Math.random() * quotes.length);
            this.currentIndex = randomIndex;
            this.displayQuote(this.currentIndex);
            this.updateUI();
        },
        
        goToQuote: function(index) {
            if (index >= 0 && index < quotes.length) {
                this.currentIndex = index;
                this.displayQuote(this.currentIndex);
                this.updateUI();
            }
        },
        
        // ============================================
        // دوال المفضلة
        // ============================================
        toggleFavorite: function() {
            var currentQuote = quotes[this.currentIndex];
            var isFavorite = this.favorites.some(function(fav) {
                return fav.id === currentQuote.id;
            });
            
            if (isFavorite) {
                this.favorites = this.favorites.filter(function(fav) {
                    return fav.id !== currentQuote.id;
                });
            } else {
                this.favorites.push(currentQuote);
            }
            
            localStorage.setItem('favorites', JSON.stringify(this.favorites));
            this.updateUI();
        },
        
        isCurrentFavorite: function() {
            var currentQuote = quotes[this.currentIndex];
            return this.favorites.some(function(fav) {
                return fav.id === currentQuote.id;
            });
        },
        
        // ============================================
        // دوال البحث
        // ============================================
        searchQuotes: function(query) {
            if (!query || query.trim() === '') {
                return quotes;
            }
            
            var searchTerm = query.toLowerCase().trim();
            return quotes.filter(function(quote) {
                return quote.text.toLowerCase().includes(searchTerm) ||
                       quote.author.toLowerCase().includes(searchTerm) ||
                       quote.category.toLowerCase().includes(searchTerm);
            });
        },
        
        // ============================================
        // دوال التاريخ
        // ============================================
        addToHistory: function(index) {
            this.history.push({
                index: index,
                timestamp: new Date().toISOString()
            });
            
            // الاحتفاظ بآخر 50 مشاهدة فقط
            if (this.history.length > 50) {
                this.history.shift();
            }
        },
        
        getHistory: function() {
            return this.history;
        },
        
        // ============================================
        // دوال الإعدادات
        // ============================================
        loadSettings: function() {
            var savedSettings = localStorage.getItem('appSettings');
            if (savedSettings) {
                try {
                    var settings = JSON.parse(savedSettings);
                    this.isDarkMode = settings.isDarkMode || false;
                    this.currentIndex = settings.lastIndex || 0;
                    this.selectedBg = settings.selectedBg || 0;
                    this.selectedDownload = settings.selectedDownload || 0;
                    this.fontSizeMultiplier = settings.fontSizeMultiplier || 1;
                } catch (e) {
                    console.error('Error loading settings:', e);
                }
            }
        },
        
        saveSettings: function() {
            var settings = {
                isDarkMode: this.isDarkMode,
                lastIndex: this.currentIndex,
                selectedBg: this.selectedBg,
                selectedDownload: this.selectedDownload,
                fontSizeMultiplier: this.fontSizeMultiplier
            };
            localStorage.setItem('appSettings', JSON.stringify(settings));
        },
        
        toggleDarkMode: function() {
            this.isDarkMode = !this.isDarkMode;
            document.body.classList.toggle('dark-mode', this.isDarkMode);
            this.saveSettings();
            this.updateUI();
        },
        
        // ============================================
        // دوال حجم الخط
        // ============================================
        changeFontSize: function(direction) {
            if (direction === 'increase') {
                this.fontSizeMultiplier = Math.min(this.fontSizeMultiplier + 0.1, 2);
            } else if (direction === 'decrease') {
                this.fontSizeMultiplier = Math.max(this.fontSizeMultiplier - 0.1, 0.5);
            }
            this.applyFontSize();
            this.saveSettings();
        },
        
        applyFontSize: function() {
            var quoteText = document.getElementById('quote-text');
            if (quoteText) {
                quoteText.style.fontSize = (this.fontSizeMultiplier * 1.5) + 'rem';
            }
        },
        
        // ============================================
        // دوال الخلفيات
        // ============================================
        renderBackgrounds: function() {
            var container = document.getElementById('backgrounds-container');
            if (!container) return;
            
            var html = '';
            for (var i = 0; i < backgrounds.length; i++) {
                var bg = backgrounds[i];
                var isSelected = (i === this.selectedBg);
                var bgStyle = this.getBackgroundStyle(bg);
                
                html += '<div class="bg-item' + (isSelected ? ' selected' : '') + '" data-index="' + i + '">';
                html += '<div class="bg-preview" style="' + bgStyle + '"></div>';
                html += '<span class="bg-name">' + bg.name + '</span>';
                html += '</div>';
            }
            
            container.innerHTML = html;
            
            // إضافة مستمعي الأحداث
            var self = this;
            var bgItems = container.querySelectorAll('.bg-item');
            bgItems.forEach(function(item) {
                item.addEventListener('click', function() {
                    var index = parseInt(this.getAttribute('data-index'));
                    self.selectBackground(index);
                });
            });
        },
        
        getBackgroundStyle: function(bg) {
            if (bg.type === 'gradient') {
                if (bg.colors.length === 2) {
                    return 'background: linear-gradient(135deg, ' + bg.colors<span class="footnote-wrapper">[0](0) </span>+ ', ' + bg.colors<span class="footnote-wrapper">[1](1) </span>+ ');';
                } else if (bg.colors.length === 3) {
                    return 'background: linear-gradient(135deg, ' + bg.colors<span class="footnote-wrapper">[0](0) </span>+ ', ' + bg.colors<span class="footnote-wrapper">[1](1) </span>+ ', ' + bg.colors<span class="footnote-wrapper">[2](2) </span>+ ');';
                }
            } else if (bg.type === 'solid') {
                return 'background: ' + bg.colors<span class="footnote-wrapper">[0](0) </span>+ ';';
            }
            return 'background: #ffffff;';
        },
        
        selectBackground: function(index) {
            this.selectedBg = index;
            this.saveSettings();
            this.renderBackgrounds();
            this.applyBackground();
        },
        
        applyBackground: function() {
            var bg = backgrounds[this.selectedBg];
            var mainContainer = document.getElementById('main-container');
            if (!mainContainer || !bg) return;
            
            var style = this.getBackgroundStyle(bg);
            
            // إضافة النمط إذا كان موجوداً
            if (bg.pattern && bg.pattern !== 'none') {
                style += ' background-size: cover; background-blend-mode: overlay;';
            }
            
            mainContainer.style.cssText = style;
        },
        
        // ============================================
        // دوال خيارات التحميل
        // ============================================
        renderDownloadOptions: function() {
            var container = document.getElementById('download-options-container');
            if (!container) return;
            
            var html = '';
            
            // تجميع الخيارات حسب المنصة
            var platforms = {
                'instagram': { name: 'انستغرام', icon: '📷' },
                'facebook': { name: 'فيسبوك', icon: '📘' },
                'telegram': { name: 'تلغرام', icon: '✈️' },
                'whatsapp': { name: 'واتساب', icon: '💬' },
                'sticker': { name: 'ملصقات شفافة', icon: '🏷️' },
                'twitter': { name: 'تويتر', icon: '🐦' },
                'linkedin': { name: 'لينكد إن', icon: '💼' },
                'youtube': { name: 'يوتيوب', icon: '▶️' }
            };
            
            for (var platform in platforms) {
                if (platforms.hasOwnProperty(platform)) {
                    var platformOptions = downloadOptions.filter(function(opt) {
                        return opt.platform === platform;
                    });
                    
                    if (platformOptions.length > 0) {
                        html += '<div class="download-group">';
                        html += '<h3 class="group-title">' + platforms[platform].icon + ' ' + platforms[platform].name + '</h3>';
                        html += '<div class="group-options">';
                        
                        for (var j = 0; j < platformOptions.length; j++) {
                            var opt = platformOptions[j];
                            var optIndex = downloadOptions.indexOf(opt);
                            var isSelected = (optIndex === this.selectedDownload);
                            
                            html += '<div class="download-option' + (isSelected ? ' selected' : '') + '" data-index="' + optIndex + '">';
                            html += '<span class="option-icon">' + opt.icon + '</span>';
                            html += '<span class="option-name">' + opt.name + '</span>';
                            html += '<span class="option-dims">' + opt.dims + '</span>';
                            html += '</div>';
                        }
                        
                        html += '</div>';
                        html += '</div>';
                    }
                }
            }
            
            container.innerHTML = html;
            
            // إضافة مستمعي الأحداث
            var self = this;
            var downloadOptionsElements = container.querySelectorAll('.download-option');
            downloadOptionsElements.forEach(function(item) {
                item.addEventListener('click', function() {
                    var index = parseInt(this.getAttribute('data-index'));
                    self.selectDownloadOption(index);
                });
            });
        },
        
        selectDownloadOption: function(index) {
            this.selectedDownload = index;
            this.saveSettings();
            this.renderDownloadOptions();
        },
        
        // ============================================
        // دوال التحميل
        // ============================================
        downloadQuote: function() {
            var option = downloadOptions[this.selectedDownload];
            if (!option) {
                alert('الرجاء اختيار خيار تحميل');
                return;
            }
            
            var quote = quotes[this.currentIndex];
            var canvas = document.createElement('canvas');
            canvas.width = option.w;
            canvas.height = option.h;
            var ctx = canvas.getContext('2d');
            
            // تطبيق الخلفية
            var bg = backgrounds[this.selectedBg];
            this.drawBackground(ctx, canvas.width, canvas.height, bg);
            
            // رسم النص
            ctx.fillStyle = this.isDarkMode ? '#ffffff' : '#000000';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            
            // حساب حجم الخط المناسب
            var fontSize = Math.min(canvas.width, canvas.height) * 0.06;
            ctx.font = 'bold ' + fontSize + 'px Arial';
            
            // تقسيم النص إلى أسطر
            var maxWidth = canvas.width * 0.8;
            var lines = this.wrapText(ctx, quote.text, maxWidth);
            var lineHeight = fontSize * 1.5;
            var startY = canvas.height / 2 - (lines.length * lineHeight) / 2;
            
            // رسم كل سطر
            for (var i = 0; i < lines.length; i++) {
                ctx.fillText(lines[i], canvas.width / 2, startY + i * lineHeight);
            }
            
            // رسم اسم الكاتب
            var authorY = startY + lines.length * lineHeight + fontSize;
            ctx.font = 'italic ' + (fontSize * 0.6) + 'px Arial';
            ctx.fillText('— ' + quote.author, canvas.width / 2, authorY);
            
            // تحميل الصورة
            var link = document.createElement('a');
            link.download = 'quote-' + quote.id + '-' + option.name.replace(/\s+/g, '-') + '.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        },
        
        drawBackground: function(ctx, width, height, bg) {
            if (bg.type === 'gradient') {
                var gradient = ctx.createLinearGradient(0, 0, width, height);
                for (var i = 0; i < bg.colors.length; i++) {
                    gradient.addColorStop(i / (bg.colors.length - 1), bg.colors[i]);
                }
                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, width, height);
            } else if (bg.type === 'solid') {
                ctx.fillStyle = bg.colors<span class="footnote-wrapper">[0](0)</span>;
                ctx.fillRect(0, 0, width, height);
            }
            
            // إضافة النمط إذا كان موجوداً
            if (bg.pattern && bg.pattern !== 'none') {
                this.drawPattern(ctx, width, height, bg.pattern, bg.colors);
            }
        },
        
        drawPattern: function(ctx, width, height, pattern, colors) {
            ctx.save();
            ctx.globalAlpha = 0.1;
            
            switch(pattern) {
                case 'stripes-horizontal':
                    for (var y = 0; y < height; y += 20) {
                        ctx.fillStyle = colors<span class="footnote-wrapper">[1](1) </span>|| '#ffffff';
                        ctx.fillRect(0, y, width, 10);
                    }
                    break;
                case 'stripes-vertical':
                    for (var x = 0; x < width; x += 20) {
                        ctx.fillStyle = colors<span class="footnote-wrapper">[1](1) </span>|| '#ffffff';
                        ctx.fillRect(x, 0, 10, height);
                    }
                    break;
                case 'stripes-diagonal':
                    ctx.strokeStyle = colors<span class="footnote-wrapper">[1](1) </span>|| '#ffffff';
                    ctx.lineWidth = 5;
                    for (var i = -height; i < width + height; i += 30) {
                        ctx.beginPath();
                        ctx.moveTo(i, 0);
                        ctx.lineTo(i + height, height);
                        ctx.stroke();
                    }
                    break;
                case 'dots':
                    ctx.fillStyle = colors<span class="footnote-wrapper">[1](1) </span>|| '#ffffff';
                    for (var dx = 0; dx < width; dx += 30) {
                        for (var dy = 0; dy < height; dy += 30) {
                            ctx.beginPath();
                            ctx.arc(dx, dy, 3, 0, Math.PI * 2);
                            ctx.fill();
                        }
                    }
                    break;
                case 'dots-small':
                    ctx.fillStyle = colors<span class="footnote-wrapper">[1](1) </span>|| '#ffffff';
                    for (var sx = 0; sx < width; sx += 15) {
                        for (var sy = 0; sy < height; sy += 15) {
                            ctx.beginPath();
                            ctx.arc(sx, sy, 1.5, 0, Math.PI * 2);
                            ctx.fill();
                        }
                    }
                    break;
                case 'dots-large':
                    ctx.fillStyle = colors<span class="footnote-wrapper">[1](1) </span>|| '#ffffff';
                    for (var lx = 0; lx < width; lx += 50) {
                        for (var ly = 0; ly < height; ly += 50) {
                            ctx.beginPath();
                            ctx.arc(lx, ly, 5, 0, Math.PI * 2);
                            ctx.fill();
                        }
                    }
                    break;
                case 'triangles':
                    ctx.fillStyle = colors<span class="footnote-wrapper">[1](1) </span>|| '#ffffff';
                    var triSize = 40;
                    for (var tx = 0; tx < width; tx += triSize) {
                        for (var ty = 0; ty < height; ty += triSize) {
                            ctx.beginPath();
                            ctx.moveTo(tx, ty + triSize);
                            ctx.lineTo(tx + triSize / 2, ty);
                            ctx.lineTo(tx + triSize, ty + triSize);
                            ctx.closePath();
                            ctx.fill();
                        }
                    }
                    break;
                case 'circles':
                    ctx.fillStyle = colors<span class="footnote-wrapper">[1](1) </span>|| '#ffffff';
                    var circleSize = 25;
                    for (var cx = 0; cx < width; cx += circleSize * 2) {
                        for (var cy = 0; cy < height; cy += circleSize * 2) {
                            ctx.beginPath();
                            ctx.arc(cx, cy, circleSize, 0, Math.PI * 2);
                            ctx.fill();
                        }
                    }
                    break;
                case 'hexagons':
                    ctx.strokeStyle = colors<span class="footnote-wrapper">[1](1) </span>|| '#ffffff';
                    ctx.lineWidth = 2;
                    var hexSize = 30;
                    for (var hx = 0; hx < width; hx += hexSize * 1.5) {
                        for (var hy = 0; hy < height; hy += hexSize * 1.73) {
                            this.drawHexagon(ctx, hx, hy, hexSize);
                        }
                    }
                    break;
                case 'marble':
                    // محاكاة الرخام بنمط عشوائي
                    ctx.fillStyle = colors<span class="footnote-wrapper">[1](1) </span>|| '#cccccc';
                    for (var m = 0; m < 50; m++) {
                        var mx = Math.random() * width;
                        var my = Math.random() * height;
                        ctx.beginPath();
                        ctx.arc(mx, my, Math.random() * 30 + 10, 0, Math.PI * 2);
                        ctx.fill();
                    }
                    break;
                case 'wood':
                    // محاكاة الخشب بخطوط أفقية
                    ctx.strokeStyle = colors<span class="footnote-wrapper">[1](1) </span>|| '#8B4513';
                    ctx.lineWidth = 2;
                    for (var wy = 0; wy < height; wy += 15) {
                        ctx.beginPath();
                        ctx.moveTo(0, wy + Math.random() * 5);
                        for (var wx = 0; wx < width; wx += 10) {
                            ctx.lineTo(wx, wy + Math.sin(wx * 0.1) * 3 + Math.random() * 2);
                        }
                        ctx.stroke();
                    }
                    break;
                case 'floral-small':
                    ctx.fillStyle = colors<span class="footnote-wrapper">[1](1) </span>|| '#ff69b4';
                    var flowerSize = 15;
                    for (var fx = 0; fx < width; fx += flowerSize * 3) {
                        for (var fy = 0; fy < height; fy += flowerSize * 3) {
                            this.drawFlower(ctx, fx, fy, flowerSize);
                        }
                    }
                    break;
                case 'floral-large':
                    ctx.fillStyle = colors<span class="footnote-wrapper">[1](1) </span>|| '#ff69b4';
                    var largeFlowerSize = 30;
                    for (var lfx = 0; lfx < width; lfx += largeFlowerSize * 3) {
                        for (var lfy = 0; lfy < height; lfy += largeFlowerSize * 3) {
                            this.drawFlower(ctx, lfx, lfy, largeFlowerSize);
                        }
                    }
                    break;
                case 'islamic':
                    // زخرفة إسلامية بسيطة
                    ctx.strokeStyle = colors<span class="footnote-wrapper">[1](1) </span>|| '#FFD700';
                    ctx.lineWidth = 2;
                    var islamicSize = 50;
                    for (var ix = 0; ix < width; ix += islamicSize) {
                        for (var iy = 0; iy < height; iy += islamicSize) {
                            ctx.beginPath();
                            ctx.arc(ix, iy, islamicSize / 2, 0, Math.PI * 2);
                            ctx.stroke();
                            ctx.beginPath();
                            ctx.arc(ix + islamicSize / 2, iy, islamicSize / 4, 0, Math.PI * 2);
                            ctx.stroke();
                        }
                    }
                    break;
            }
            
            ctx.restore();
        },
        
        drawHexagon: function(ctx, x, y, size) {
            ctx.beginPath();
            for (var i = 0; i < 6; i++) {
                var angle = (Math.PI / 3) * i - Math.PI / 6;
                var hx = x + size * Math.cos(angle);
                var hy = y + size * Math.sin(angle);
                if (i === 0) {
                    ctx.moveTo(hx, hy);
                } else {
                    ctx.lineTo(hx, hy);
                }
            }
            ctx.closePath();
            ctx.stroke();
        },
        
        drawFlower: function(ctx, x, y, size) {
                    drawFlower: function(ctx, x, y, size) {
            // رسم بتلات الزهرة
            var petalCount = 5;
            var petalSize = size * 0.4;
            
            for (var i = 0; i < petalCount; i++) {
                var angle = (Math.PI * 2 / petalCount) * i - Math.PI / 2;
                var px = x + Math.cos(angle) * petalSize;
                var py = y + Math.sin(angle) * petalSize;
                
                ctx.beginPath();
                ctx.ellipse(px, py, petalSize, petalSize * 0.6, angle, 0, Math.PI * 2);
                ctx.fill();
            }
            
            // رسم مركز الزهرة
            ctx.fillStyle = '#FFD700';
            ctx.beginPath();
            ctx.arc(x, y, size * 0.15, 0, Math.PI * 2);
            ctx.fill();
        },
        
        // ============================================
        // دوال تقسيم النص
        // ============================================
        wrapText: function(ctx, text, maxWidth) {
            var words = text.split(' ');
            var lines = [];
            var currentLine = '';
            
            for (var i = 0; i < words.length; i++) {
                var testLine = currentLine + words[i] + ' ';
                var metrics = ctx.measureText(testLine);
                var testWidth = metrics.width;
                
                if (testWidth > maxWidth && i > 0) {
                    lines.push(currentLine.trim());
                    currentLine = words[i] + ' ';
                } else {
                    currentLine = testLine;
                }
            }
            
            lines.push(currentLine.trim());
            return lines;
        },
        
        // ============================================
        // دوال المشاركة
        // ============================================
        shareQuote: function() {
            var currentQuote = quotes[this.currentIndex];
            var shareText = currentQuote.text + '\n\n— ' + currentQuote.author;
            
            if (navigator.share) {
                navigator.share({
                    title: 'قول الإمام علي',
                    text: shareText
                }).catch(function(error) {
                    console.error('Share failed:', error);
                });
            } else {
                // نسخ النص للحافظة كبديل
                navigator.clipboard.writeText(shareText).then(function() {
                    alert('تم نسخ القول!');
                }).catch(function(error) {
                    console.error('Copy failed:', error);
                });
            }
        },
        
        // ============================================
        // دوال تحديث واجهة المستخدم
        // ============================================
        updateUI: function() {
            var favBtn = document.getElementById('favorite-btn');
            if (favBtn) {
                favBtn.textContent = this.isCurrentFavorite() ? '★' : '☆';
                favBtn.classList.toggle('active', this.isCurrentFavorite());
            }
            
            var darkModeBtn = document.getElementById('dark-mode-btn');
            if (darkModeBtn) {
                darkModeBtn.textContent = this.isDarkMode ? '☀️' : '🌙';
            }
            
            // تحديث معلومات التحميل
            var downloadInfo = document.getElementById('download-info');
            if (downloadInfo) {
                var option = downloadOptions[this.selectedDownload];
                downloadInfo.textContent = option.name + ' (' + option.dims + ')';
            }
        },
        
        // ============================================
        // إعداد مستمعي الأحداث
        // ============================================
        setupEventListeners: function() {
            var self = this;
            
            // أزرار التنقل
            var prevBtn = document.getElementById('prev-btn');
            var nextBtn = document.getElementById('next-btn');
            var randomBtn = document.getElementById('random-btn');
            
            if (prevBtn) {
                prevBtn.addEventListener('click', function() {
                    self.prevQuote();
                });
            }
            
            if (nextBtn) {
                nextBtn.addEventListener('click', function() {
                    self.nextQuote();
                });
            }
            
            if (randomBtn) {
                randomBtn.addEventListener('click', function() {
                    self.randomQuote();
                });
            }
            
            // زر المفضلة
            var favBtn = document.getElementById('favorite-btn');
            if (favBtn) {
                favBtn.addEventListener('click', function() {
                    self.toggleFavorite();
                });
            }
            
            // زر المشاركة
            var shareBtn = document.getElementById('share-btn');
            if (shareBtn) {
                shareBtn.addEventListener('click', function() {
                    self.shareQuote();
                });
            }
            
            // زر الوضع الليلي
            var darkModeBtn = document.getElementById('dark-mode-btn');
            if (darkModeBtn) {
                darkModeBtn.addEventListener('click', function() {
                    self.toggleDarkMode();
                });
            }
            
            // زر التحميل
            var downloadBtn = document.getElementById('download-btn');
            if (downloadBtn) {
                downloadBtn.addEventListener('click', function() {
                    self.downloadQuote();
                });
            }
            
            // أزرار حجم الخط
            var increaseFontBtn = document.getElementById('increase-font-btn');
            var decreaseFontBtn = document.getElementById('decrease-font-btn');
            
            if (increaseFontBtn) {
                increaseFontBtn.addEventListener('click', function() {
                    self.changeFontSize('increase');
                });
            }
            
            if (decreaseFontBtn) {
                decreaseFontBtn.addEventListener('click', function() {
                    self.changeFontSize('decrease');
                });
            }
            
            // البحث
            var searchInput = document.getElementById('search-input');
            if (searchInput) {
                searchInput.addEventListener('input', function() {
                    var results = self.searchQuotes(this.value);
                    self.displaySearchResults(results);
                });
            }
            
            // التنقل بلوحة المفاتيح
            document.addEventListener('keydown', function(event) {
                self.handleKeyboard(event);
            });
        },
        
        // ============================================
        // التنقل بلوحة المفاتيح
        // ============================================
        handleKeyboard: function(event) {
            switch(event.key) {
                case 'ArrowLeft':
                    this.prevQuote();
                    break;
                case 'ArrowRight':
                    this.nextQuote();
                    break;
                case ' ':
                    event.preventDefault();
                    this.randomQuote();
                    break;
                case 'f':
                case 'F':
                    this.toggleFavorite();
                    break;
                case 'd':
                case 'D':
                    this.toggleDarkMode();
                    break;
                case 's':
                case 'S':
                    this.downloadQuote();
                    break;
            }
        },
        
        // ============================================
        // عرض نتائج البحث
        // ============================================
        displaySearchResults: function(results) {
            var resultsContainer = document.getElementById('search-results');
            if (!resultsContainer) return;
            
            if (results.length === 0) {
                resultsContainer.innerHTML = '<p class="no-results">لا توجد نتائج</p>';
                return;
            }
            
            var html = '';
            for (var i = 0; i < results.length; i++) {
                html += '<div class="search-result-item" data-index="' + results[i].id + '">';
                html += '<p class="result-text">' + results[i].text + '</p>';
                html += '<span class="result-category">' + results[i].category + '</span>';
                html += '</div>';
            }
            
            resultsContainer.innerHTML = html;
            
            // إضافة مستمعي الأحداث لنتائج البحث
            var self = this;
            var resultItems = resultsContainer.querySelectorAll('.search-result-item');
            resultItems.forEach(function(item) {
                item.addEventListener('click', function() {
                    var index = parseInt(this.getAttribute('data-index')) - 1;
                    self.goToQuote(index);
                });
            });
        },
        
        // ============================================
        // دوال إحصائية
        // ============================================
        getStats: function() {
            return {
                totalQuotes: quotes.length,
                totalFavorites: this.favorites.length,
                totalHistory: this.history.length,
                currentIndex: this.currentIndex,
                selectedBackground: backgrounds[this.selectedBg].name,
                selectedDownload: downloadOptions[this.selectedDownload].name
            };
        }
    };
    
    // ============================================
    // تشغيل المحرك عند تحميل الصفحة
    // ============================================
    document.addEventListener('DOMContentLoaded', function() {
        engine.init();
    });
    
})();

