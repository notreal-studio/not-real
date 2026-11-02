/* The five group cards on the home page: each one slowly cycles through its own pictures. */
(function(){
  const cards=[...document.querySelectorAll('.gc')]; if(!cards.length) return;
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const timers=new Map();
  function start(card,delay){
    const imgs=[...card.querySelectorAll('.gc-slides img')]; if(imgs.length<2) return;
    let i=imgs.findIndex(x=>x.classList.contains('is-on')); if(i<0) i=0;
    const tick=()=>{ imgs[i].classList.remove('is-on'); i=(i+1)%imgs.length; imgs[i].loading='eager'; imgs[i].classList.add('is-on'); };
    timers.set(card,setTimeout(function loop(){ tick(); timers.set(card,setTimeout(loop,3600)); },delay));
  }
  function stop(card){ clearTimeout(timers.get(card)); timers.delete(card); }
  if(!('IntersectionObserver' in window)){ cards.forEach((c,n)=>start(c,2400+n*520)); return; }
  const io=new IntersectionObserver((es)=>{ es.forEach(en=>{ const n=cards.indexOf(en.target); if(en.isIntersecting){ if(!timers.has(en.target)) start(en.target,1800+n*520); } else stop(en.target); }); },{threshold:0.25});
  cards.forEach(c=>io.observe(c));
})();
