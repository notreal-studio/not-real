/* Gallery pages: every card hangs from its own thread. When a card scrolls into view it lowers itself slowly
   from above (the thread lengthens with it), then it keeps swaying a hair (CSS). No effect under reduced motion. */
(function(){
  const grids=[...document.querySelectorAll('.gp-grid:not([data-orb]),.gp-pages')]; if(!grids.length) return;
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const HOLE=9.5;                       /* hole centre, px below the card's top edge */
  const rnd=(a,b)=>a+Math.random()*(b-a);

  grids.forEach(grid=>{
    const cards=[...grid.querySelectorAll('.gp-card')];
    const threads=cards.map(()=>{ const t=document.createElement('i'); t.className='gp-thread'; t.setAttribute('aria-hidden','true'); grid.appendChild(t); return t; });
    cards.forEach((c,i)=>{
      c.style.setProperty('--sw',((i%2?-1:1)*rnd(.45,.85)).toFixed(2)+'deg');
      c.style.setProperty('--sd',rnd(5.5,8.5).toFixed(1)+'s');
      c.style.setProperty('--sl',(-rnd(0,6)).toFixed(1)+'s');
    });

    const geo=[];                        /* final position of every card, measured from the rod */
    function measure(){
      const g=grid.getBoundingClientRect();
      cards.forEach((c,i)=>{
        const r=c.getBoundingClientRect();
        const top=r.top-g.top, x=r.left-g.left+r.width/2;
        geo[i]={top:top};
        const t=threads[i]; t.style.left=x+'px'; t.style.height=(top+HOLE)+'px';
      });
    }

    function lower(i,delay){
      const c=cards[i], t=threads[i], T=geo[i].top, L=Math.max(0,Math.min(T-4,230));
      c.classList.add('is-in'); t.classList.add('is-in');
      const opt={duration:2400,delay:delay,easing:'cubic-bezier(.2,.75,.25,1)',fill:'backwards'};
      c.animate([{translate:'0 '+(-L)+'px',opacity:0},{opacity:1,offset:.3},{translate:'0 0',opacity:1}],opt);
      t.animate([{height:(T+HOLE-L)+'px',opacity:0},{opacity:1,offset:.3},{height:(T+HOLE)+'px',opacity:1}],opt);
    }

    measure();
    if(reduced || !('IntersectionObserver' in window)){ cards.forEach(c=>c.classList.add('is-in')); threads.forEach(t=>t.classList.add('is-in')); }
    else {
      grid.classList.add('is-armed');
      const io=new IntersectionObserver((es)=>{
        let n=0;
        es.filter(e=>e.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top||a.boundingClientRect.left-b.boundingClientRect.left)
          .forEach(e=>{ io.unobserve(e.target); lower(cards.indexOf(e.target),n++*140); });
      },{threshold:0.12,rootMargin:'0px 0px -6% 0px'});
      cards.forEach(c=>io.observe(c));
    }

    /* resize: everything just settles at its new place */
    let timer;
    window.addEventListener('resize',()=>{
      clearTimeout(timer);
      timer=setTimeout(()=>{
        [...cards,...threads].forEach(el=>{ el.getAnimations().forEach(a=>a.cancel()); el.classList.add('is-in'); });
        measure();
      },200);
    });
  });
})();
