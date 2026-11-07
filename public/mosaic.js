/* Living mosaic. The five group tiles always stay (their pictures cycle inside and they link to the galleries).
   Photo tiles do the show: one fades out, the whole collage slides into a new arrangement, then a new picture fades in on that tile, in its new place. */
(function(){
  const root=document.querySelector('.lm'); if(!root) return;
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const groupTiles=[...root.querySelectorAll('.lm-g')], photoTiles=[...root.querySelectorAll('.lm-p')];
  const tiles=[...groupTiles,...photoTiles];                 /* same order as the layout slots */
  let layouts=[], pool=[];
  try{ layouts=JSON.parse(root.dataset.layouts); }catch(e){ return; }
  try{ pool=JSON.parse(document.getElementById('lb-data').textContent).slice(0,Number(root.dataset.pool)); }catch(e){ return; }

  /* ---- group tiles: slow picture cycle ---- */
  const timers=new Map();
  function cycle(tile,delay){
    const imgs=[...tile.querySelectorAll('.lm-slides img')]; if(imgs.length<2) return;
    let i=imgs.findIndex(x=>x.classList.contains('is-on')); if(i<0) i=0;
    timers.set(tile,setTimeout(function loop(){
      imgs[i].classList.remove('is-on'); i=(i+1)%imgs.length; imgs[i].loading='eager'; imgs[i].classList.add('is-on');
      timers.set(tile,setTimeout(loop,3800));
    },delay));
  }
  if(!reduced) groupTiles.forEach((g,n)=>cycle(g,2200+n*640));

  /* ---- label row above the collage: hovering a label holds the collage and lights up its tile ---- */
  document.querySelectorAll('.lm-l').forEach(l=>{
    const g=groupTiles[Number(l.dataset.g)];
    const on=()=>{ root.classList.add('is-hold'); if(g) g.classList.add('is-hl'); };
    const off=()=>{ root.classList.remove('is-hold'); if(g) g.classList.remove('is-hl'); };
    l.addEventListener('mouseenter',on); l.addEventListener('mouseleave',off); l.addEventListener('focus',on); l.addEventListener('blur',off);
  });

  if(reduced || !layouts.length || pool.length<=photoTiles.length) return;

  /* ---- photo tiles: fade out, rearrange, reappear elsewhere ---- */
  const shown=new Set(photoTiles.map(t=>Number(t.dataset.lb)));
  let cur=0, hovered=false, onScreen=false, held=false;
  const wait=(ms)=>new Promise(r=>setTimeout(r,ms));
  const phone=()=>window.matchMedia('(max-width: 700px)').matches;
  const active=()=>onScreen && !hovered && !root.classList.contains('is-hold') && !held && !phone() && !document.hidden;

  function place(n){
    tiles.forEach((t,i)=>{ const r=layouts[n][i]; t.style.setProperty('--x',r[0]); t.style.setProperty('--y',r[1]); t.style.setProperty('--w',r[2]); t.style.setProperty('--h',r[3]); });
  }
  function fresh(){ let k; do{ k=Math.floor(Math.random()*pool.length); }while(shown.has(k)); return k; }
  function preload(src){ return new Promise(res=>{ const im=new Image(); im.onload=im.onerror=()=>res(); im.src=src; }); }
  function swap(tile,k){
    shown.delete(Number(tile.dataset.lb)); shown.add(k);
    const it=pool[k]; tile.dataset.lb=k; tile.setAttribute('aria-label',it.title);
    tile.classList.toggle('is-video',it.kind==='video');
    tile.querySelector('img').src=it.cover;
  }
  async function step(){
    const tile=photoTiles[Math.floor(Math.random()*photoTiles.length)];
    tile.classList.add('out');                                   /* 1. one photo disappears */
    await wait(520);
    cur=(cur+1)%layouts.length; place(cur);                      /* 2. the collage slides into a new arrangement */
    const k=fresh(); await preload(pool[k].cover);
    await wait(1000);
    swap(tile,k); tile.classList.remove('out');                  /* 3. a new picture appears in its new place */
    await wait(650);
  }
  (async function loop(){
    await wait(2600);
    for(;;){ if(active()) await step(); await wait(1100); }
  })();

  root.addEventListener('mouseenter',()=>{ hovered=true; });
  root.addEventListener('mouseleave',()=>{ hovered=false; });
  root.addEventListener('focusin',()=>{ hovered=true; });
  root.addEventListener('focusout',()=>{ hovered=false; });
  window.addEventListener('lb-open',()=>{ held=true; });
  window.addEventListener('lb-close',()=>{ held=false; });
  if('IntersectionObserver' in window) new IntersectionObserver((es)=>{ onScreen=es[0].isIntersecting; },{threshold:0.3}).observe(root); else onScreen=true;
})();
