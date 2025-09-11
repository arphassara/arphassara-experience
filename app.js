// Year
document.addEventListener('DOMContentLoaded', ()=>{
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
});

/* ===== Intro: lens ===== */
(function(){
  const intro = document.getElementById('lens-intro');
  if (!intro) return;
  // กันการ scroll ระหว่างอินโทร
  document.documentElement.style.overflow = 'hidden';
  const hide = ()=> {
    intro.classList.add('hidden');
    setTimeout(()=> {
      intro.remove();
      document.documentElement.style.overflow = '';
    }, 650);
  };
  // เผื่อโหลดช้า/เร็ว
  setTimeout(hide, 1600);
  window.addEventListener('load', ()=> setTimeout(hide, 900));
})();

/* ===== Moments lane: buttons scroll ===== */
(function(){
  const lane = document.getElementById('momentsLane');
  if (!lane) return;
  const wrap = lane.closest('.lane-wrap');
  const prev = wrap.querySelector('.prev');
  const next = wrap.querySelector('.next');
  const step = () => Math.min(420, lane.clientWidth * 0.8);

  prev.addEventListener('click', ()=> lane.scrollBy({ left: -step(), behavior: 'smooth' }));
  next.addEventListener('click', ()=> lane.scrollBy({ left:  step(), behavior: 'smooth' }));

  // drag/ swipe
  let down=false, sx=0, sl=0;
  lane.addEventListener('pointerdown', e=>{ down=true; sx=e.clientX; sl=lane.scrollLeft; lane.setPointerCapture(e.pointerId); });
  lane.addEventListener('pointermove', e=>{ if(!down) return; lane.scrollLeft = sl - (e.clientX - sx); });
  lane.addEventListener('pointerup',   ()=> down=false);
})();

/* ===== Certificates: open lightbox from back side button ===== */
(function(){
  const lb  = document.getElementById('lightbox');
  const img = lb?.querySelector('.lb-img');
  const cap = lb?.querySelector('.lb-cap');
  if (!lb || !img) return;

  document.querySelectorAll('.open-lightbox').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const src = btn.getAttribute('data-full');
      const text = btn.getAttribute('data-cap') || '';
      img.src = src;
      cap.textContent = text;
      lb.classList.add('open');
    });
  });

  lb.querySelector('.lb-close').addEventListener('click', ()=> lb.classList.remove('open'));
  lb.addEventListener('click', e=>{ if(e.target.id==='lightbox') lb.classList.remove('open'); });
})();



/* ===== Lightbox for story media (moments + cert) ===== */
(function(){
  const lb  = document.getElementById('lightbox');
  const img = lb?.querySelector('.lb-img');
  const cap = lb?.querySelector('.lb-cap');
  if (!lb || !img) return;

  document.querySelectorAll('.t-media img').forEach(el=>{
    el.addEventListener('click', ()=>{
      img.src = el.dataset.full || el.src;
      cap.textContent = el.alt || '';
      lb.classList.add('open');
    });
  });
})();
