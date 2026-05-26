(function() {
    'use strict';
    
    var currentIndex = 0;
    var quotes = [];
    
    function init() {
        if (typeof quotesData !== 'undefined' && quotesData.length > 0) {
            quotes = quotesData;
            showQuote(0);
        } else {
            document.getElementById('quoteContent').textContent = 'لا توجد أقوال متاحة';
        }
        
        initParticles();
        
        document.getElementById('shuffleBtn').addEventListener('click', shuffleQuote);
        document.getElementById('prevBtn').addEventListener('click', prevQuote);
        document.getElementById('nextBtn').addEventListener('click', nextQuote);
        document.getElementById('saveBtn').addEventListener('click', saveAsImage);
        document.getElementById('allQuotesBtn').addEventListener('click', openAllQuotes);
        document.getElementById('aboutBtn').addEventListener('click', openAbout);
        document.getElementById('closeAllQuotes').addEventListener('click', closeAllQuotes);
        document.getElementById('closeAbout').addEventListener('click', closeAbout);
        document.getElementById('searchInput').addEventListener('input', searchQuotes);
        
        window.addEventListener('click', function(e) {
            if (e.target.classList.contains('modal')) e.target.classList.remove('active');
        });
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowRight') prevQuote();
            if (e.key === 'ArrowLeft') nextQuote();
            if (e.key === ' ') { e.preventDefault(); shuffleQuote(); }
        });
        
        var touchStartX = 0, touchEndX = 0;
        document.addEventListener('touchstart', function(e) { touchStartX = e.changedTouches[0].screenX; }, {passive: true});
        document.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            var diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 50) { if (diff > 0) nextQuote(); else prevQuote(); }
        }, {passive: true});
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
        var len = quote.text.length;
        el.style.fontSize = (len<=30?2.0:len<=50?1.6:len<=80?1.3:len<=120?1.1:0.95)+'em';
    }
    
    function shuffleQuote() { showQuote(Math.floor(Math.random()*quotes.length)); showToast('تم اختيار قول عشوائي'); }
    function prevQuote() { showQuote(currentIndex-1); }
    function nextQuote() { showQuote(currentIndex+1); }
    function openAllQuotes() { document.getElementById('allQuotesModal').classList.add('active'); displayAllQuotes(quotes); }
    function closeAllQuotes() { document.getElementById('allQuotesModal').classList.remove('active'); }
    function openAbout() { document.getElementById('aboutModal').classList.add('active'); }
    function closeAbout() { document.getElementById('aboutModal').classList.remove('active'); }
    
    function displayAllQuotes(arr) {
        var list = document.getElementById('quotesList');
        list.innerHTML = '';
        for (var i=0;i<arr.length;i++) {
            (function(idx){
                var item = document.createElement('div');
                item.className = 'quote-item';
                item.innerHTML = '<div class="q-text">'+arr[idx].text+'</div>';
                item.addEventListener('click',function(){ showQuote(idx); closeAllQuotes(); });
                list.appendChild(item);
            })(i);
        }
    }
    
    function searchQuotes() {
        var term = this.value.toLowerCase();
        var filtered = [];
        for (var i=0;i<quotes.length;i++) {
            if (quotes[i].text.toLowerCase().includes(term)) filtered.push(quotes[i]);
        }
        displayAllQuotes(filtered);
    }
    
    function saveAsImage() {
        var quote = quotes[currentIndex];
        if (!quote) return;
        var canvas = document.getElementById('imageCanvas');
        var ctx = canvas.getContext('2d');
        canvas.width = 2160; canvas.height = 3840;
        
        var grad = ctx.createLinearGradient(0,0,canvas.width,canvas.height);
        grad.addColorStop(0,'#0a0505'); grad.addColorStop(0.3,'#1a0a05'); grad.addColorStop(0.6,'#0a0510'); grad.addColorStop(1,'#000000');
        ctx.fillStyle = grad; ctx.fillRect(0,0,canvas.width,canvas.height);
        
        for (var i=0;i<6;i++) {
            var x=Math.random()*canvas.width, y=Math.random()*canvas.height, r=80+Math.random()*250;
            var cg=ctx.createRadialGradient(x,y,0,x,y,r);
            cg.addColorStop(0,'rgba(212,168,67,0.04)'); cg.addColorStop(1,'rgba(212,168,67,0)');
            ctx.fillStyle=cg; ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2); ctx.fill();
        }
        
        ctx.strokeStyle='rgba(212,168,67,0.12)'; ctx.lineWidth=3; ctx.strokeRect(100,100,canvas.width-200,canvas.height-200);
        ctx.strokeStyle='rgba(212,168,67,0.06)'; ctx.lineWidth=1; ctx.strokeRect(140,140,canvas.width-280,canvas.height-280);
        
        ctx.shadowColor='rgba(0,0,0,0.5)'; ctx.shadowBlur=20;
        ctx.fillStyle='rgba(212,168,67,0.5)'; ctx.textAlign='center'; ctx.textBaseline='middle';
        ctx.font='55px "Amiri", serif'; ctx.fillText('قال الإمام علي (عليه السلام)',canvas.width/2,350);
        
        var cx=200, cy=600, cw=canvas.width-400, ch=canvas.height-1300;
        ctx.shadowColor='rgba(0,0,0,0.6)'; ctx.shadowBlur=80; ctx.shadowOffsetX=0; ctx.shadowOffsetY=15;
        ctx.fillStyle='rgba(255,255,255,0.04)'; roundRect(ctx,cx,cy,cw,ch,50); ctx.fill();
        ctx.shadowColor='transparent'; ctx.strokeStyle='rgba(212,168,67,0.12)'; ctx.lineWidth=2; roundRect(ctx,cx,cy,cw,ch,50); ctx.stroke();
        
        ctx.fillStyle='rgba(212,168,67,0.18)'; ctx.font='90px "Amiri", serif';
        ctx.textAlign='right'; ctx.fillText('\uFD3F',cx+cw-40,cy+120);
        ctx.textAlign='left'; ctx.fillText('\uFD3E',cx+40,cy+ch-30);
        
        ctx.shadowColor='rgba(0,0,0,0.4)'; ctx.shadowBlur=25;
        ctx.fillStyle='#f5f0e8'; ctx.textAlign='center'; ctx.textBaseline='middle';
        
        var mw=cw-120, tl=quote.text.length, bfs=tl<=30?85:tl<=50?70:tl<=80?55:tl<=120?45:38;
        ctx.font=bfs+'px "Amiri", serif';
        
        var words=quote.text.split(' '), lines=[], cl='';
        for (var w=0;w<words.length;w++) {
            var tl2=cl+' '+words[w], m=ctx.measureText(tl2);
            if (m.width>mw&&cl!==''){lines.push(cl);cl=words[w];}else{cl=tl2;}
        }
        lines.push(cl);
        
        var lh=bfs*1.8, sy=cy+ch/2-(lines.length-1)*lh/2;
        ctx.shadowColor='rgba(0,0,0,0.6)'; ctx.shadowBlur=35;
        for (var l=0;l<lines.length;l++) ctx.fillText(lines[l].trim(),canvas.width/2,sy+l*lh);
        
        ctx.shadowBlur=15; ctx.fillStyle='rgba(255,255,255,0.2)'; ctx.font='30px "Amiri", serif';
        ctx.fillText('\u2014 \u0633\u064A\u0641 \u0639\u0644\u064A \u2014',canvas.width/2,canvas.height-180);
        ctx.fillStyle='rgba(212,168,67,0.25)'; ctx.font='26px "Cairo", sans-serif';
        ctx.fillText('@ne_7u',canvas.width/2,canvas.height-120);
        
        var link=document.createElement('a');
        link.download='قول_الإمام_علي_'+(currentIndex+1)+'.png';
        link.href=canvas.toDataURL('image/png'); link.click();
        showToast('تم حفظ الصورة بدقة عالية');
    }
    
    function roundRect(ctx,x,y,w,h,r) {
        if(w<2*r)r=w/2; if(h<2*r)r=h/2;
        ctx.beginPath(); ctx.moveTo(x+r,y); ctx.lineTo(x+w-r,y);
        ctx.quadraticCurveTo(x+w,y,x+w,y+r); ctx.lineTo(x+w,y+h-r);
        ctx.quadraticCurveTo(x+w,y+h,x+w-r,y+h); ctx.lineTo(x+r,y+h);
        ctx.quadraticCurveTo(x,y+h,x,y+h-r); ctx.lineTo(x,y+r);
        ctx.quadraticCurveTo(x,y,x+r,y); ctx.closePath();
    }
    
    function showToast(msg) {
        var t=document.getElementById('toast'); t.textContent=msg; t.classList.add('show');
        setTimeout(function(){t.classList.remove('show');},3000);
    }
    
    if (document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();
