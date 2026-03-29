
(function(){
  const btn = document.querySelector('[data-menu-btn]');
  const panel = document.querySelector('[data-mobile-panel]');
  if(btn && panel){ btn.addEventListener('click', ()=> panel.classList.toggle('open')); }

  const cfg = window.SITE_CONFIG || {};
  const setHref = (selector, value) => { if(!value) return; document.querySelectorAll(selector).forEach(el => el.href = value); };
  setHref('[data-instagram-link]', cfg.instagramUrl);
  setHref('[data-facebook-link]', cfg.facebookUrl);
  setHref('[data-tripadvisor-link]', cfg.tripadvisorUrl);
  document.querySelectorAll('[data-email-link]').forEach(el => { if(cfg.email){ el.href = 'mailto:' + cfg.email; el.textContent = cfg.email; } });
  document.querySelectorAll('[data-phone-link]').forEach(el => { if(cfg.phone){ el.href = 'tel:' + cfg.phone.replace(/\s+/g,''); el.textContent = cfg.phone; el.classList.remove('hidden'); } });
  document.querySelectorAll('[data-booking-link]').forEach(el => { if(cfg.bookingUrl) el.href = cfg.bookingUrl; });
  document.querySelectorAll('[data-booking-embed]').forEach(el => {
    if(cfg.bookingUrl){
      const wrap = document.createElement('div');
      wrap.className = 'booking-placeholder';
      wrap.innerHTML = '<h3 style="margin-top:0">Book with Mia</h3><p style="color:var(--muted);line-height:1.8">Fresha blocks direct embedding, so the booking flow opens in a secure booking page while keeping the website branded.</p><div class="note" style="margin:18px 0">Clients will see Mia’s live availability, select a treatment, and pay the £10 deposit in the secure booking flow.</div><a class="btn" href="'+cfg.bookingUrl+'" target="_blank" rel="noopener">Open booking</a>';
      el.innerHTML = ''; el.appendChild(wrap);
    }
  });

  const slider = document.querySelector('[data-review-slider]');
  if(slider){
    const track = slider.querySelector('[data-review-track]');
    const slides = slider.querySelectorAll('.review-slide');
    let index = 0;
    const update = ()=> track.style.transform = 'translateX(-' + (index * 100) + '%)';
    const prev = slider.querySelector('[data-prev]');
    const next = slider.querySelector('[data-next]');
    if(prev) prev.addEventListener('click', ()=>{ index = (index - 1 + slides.length) % slides.length; update(); });
    if(next) next.addEventListener('click', ()=>{ index = (index + 1) % slides.length; update(); });
    setInterval(()=>{ index = (index + 1) % slides.length; update(); }, 5500);
  }

  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, {threshold:0.12});
  document.querySelectorAll('.reveal').forEach(el=> io.observe(el));

  const r1 = document.querySelector('[data-review-1]');
  const r2 = document.querySelector('[data-review-2]');
  const r3 = document.querySelector('[data-review-3]');
  if(r1 && cfg.review1) r1.textContent = cfg.review1;
  if(r2 && cfg.review2) r2.textContent = cfg.review2;
  if(r3 && cfg.review3) r3.textContent = cfg.review3;
})();
