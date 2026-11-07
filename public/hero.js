/* Full-screen hero video reel: one video at a time, full length, then the next. */
(function(){
  const root=document.querySelector('.hero-slider'); if(!root) return;
  const slides=[...root.querySelectorAll('.hs')]; if(!slides.length) return;
  const bar=root.querySelector('.hs-progress i'), cnt=root.querySelector('.hs-count'), snd=root.querySelector('.hs-sound');
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let i=-1, muted=true, raf=0, started=false, inView=true;

  const vid=(s)=>s.querySelector('video');
  function load(s){
    const v=vid(s); if(!v) return v;
    if(v.dataset.poster && !v.getAttribute('poster')) v.setAttribute('poster',v.dataset.poster);
    const bg=s.querySelector('.hs-bg'); if(bg && bg.dataset.bg && !bg.style.backgroundImage) bg.style.backgroundImage='url('+bg.dataset.bg+')';
    if(!v.getAttribute('src')) v.src=v.dataset.src;
    return v;
  }

  function tick(){
    cancelAnimationFrame(raf);
    const v=vid(slides[i]);
    const step=()=>{ if(v && v.duration){ bar.style.width=(v.currentTime/v.duration*100)+'%'; } raf=requestAnimationFrame(step); };
    step();
  }

  function show(n){
    n=(n+slides.length)%slides.length;
    const prev=slides[i];
    if(prev){ prev.classList.remove('is-active'); const pv=vid(prev); if(pv){ pv.pause(); pv.onended=null; } }
    i=n; const s=slides[i]; s.classList.add('is-active');
    const v=load(s);
    if(cnt) cnt.textContent=String(i+1).padStart(2,'0')+' / '+String(slides.length).padStart(2,'0');
    load(slides[(i+1)%slides.length]);            // metadata only (preload="metadata")
    if(v){
      v.muted=muted; v.loop=false;
      try{ v.currentTime=0; }catch(e){}
      v.onended=()=>show(i+1);
      if(!reduced && inView){ const p=v.play(); if(p&&p.catch) p.catch(()=>{}); }
    }
    if(bar) bar.style.width='0%';
    tick();
  }

  function start(){ if(started) return; started=true; show(0); }
  /* start only after the loader is gone (main.js removes body.locked) */
  if(!document.body.classList.contains('locked')) start();
  else new MutationObserver((m,o)=>{ if(!document.body.classList.contains('locked')){ o.disconnect(); start(); } })
    .observe(document.body,{attributes:true,attributeFilter:['class']});
  setTimeout(start,9000);                           // safety net

  const next=root.querySelector('.hs-next'), prevB=root.querySelector('.hs-prev');
  if(next) next.addEventListener('click',()=>{ start(); show(i+1); });
  if(prevB) prevB.addEventListener('click',()=>{ start(); show(i-1); });
  if(snd) snd.addEventListener('click',()=>{
    muted=!muted; const v=vid(slides[i]); if(v) v.muted=muted;
    snd.setAttribute('aria-pressed',String(!muted)); snd.classList.toggle('on',!muted);
  });

  /* click the picture = pause / play */
  root.addEventListener('click',(e)=>{
    if(e.target.closest('button,a')) return;
    const v=vid(slides[i]); if(!v) return; if(v.paused) v.play().catch(()=>{}); else v.pause();
  });

  /* keyboard + swipe */
  document.addEventListener('keydown',(e)=>{
    if(document.body.classList.contains('locked')) return;
    const r=root.getBoundingClientRect(); if(r.bottom<0||r.top>innerHeight) return;
    if(e.key==='ArrowRight') show(i+1); else if(e.key==='ArrowLeft') show(i-1);
  });
  let x0=null;
  root.addEventListener('touchstart',(e)=>{ x0=e.touches[0].clientX; },{passive:true});
  root.addEventListener('touchend',(e)=>{ if(x0===null) return; const dx=e.changedTouches[0].clientX-x0; x0=null; if(Math.abs(dx)>50) show(i+(dx<0?1:-1)); });

  /* pause while scrolled away */
  if('IntersectionObserver' in window){
    new IntersectionObserver((es)=>{ inView=es[0].isIntersecting; const v=i>=0?vid(slides[i]):null;
      if(!v) return; if(inView){ if(!reduced) v.play().catch(()=>{}); } else v.pause(); },{threshold:0.2}).observe(root);
  }
})();
