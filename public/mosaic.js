/* Living mosaic: a tile fades out, the whole collage slides into a new arrangement, then a new picture fades in on that tile, in its new place. */
(function(){
  const root=document.querySelector('.lm'); if(!root) return;
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const tiles=[...root.querySelectorAll('.lm-t')];
  let layouts=[], pool=[];
  try{ layouts=JSON.parse(root.dataset.layouts); }catch(e){ return; }
  try{ pool=JSON.parse(document.getElementById('lb-data').textContent).slice(0,Number(root.dataset.pool)); }catch(e){ return; }
  if(!layouts.length || pool.length<=tiles.length) return;

  const shown=new Set(tiles.map(t=>Number(t.dataset.lb)));
  let cur=0, hovered=false, onScreen=false, held=false;
  const wait=(ms)=>new Promise(r=>setTimeout(r,ms));
  const active=()=>onScreen && !hovered && !held && !document.hidden;

  function place(n){
    tiles.forEach((t,i)=>{ const r=layouts[n][i]; t.style.setProperty('--x',r[0]); t.style.setProperty('--y',r[1]); t.style.setProperty('--w',r[2]); t.style.setProperty('--h',r[3]); });
  }
  function fresh(){
    let k; do{ k=Math.floor(Math.random()*pool.length); }while(shown.has(k)); return k;
  }
  function preload(src){ return new Promise(res=>{ const im=new Image(); im.onload=im.onerror=()=>res(); im.src=src; }); }
  function swap(tile,k){
    shown.delete(Number(tile.dataset.lb)); shown.add(k);
    const it=pool[k]; tile.dataset.lb=k; tile.setAttribute('aria-label',it.title);
    tile.classList.toggle('is-video',it.kind==='video');
    tile.querySelector('img').src=it.cover;
  }

  async function step(){
    const tile=tiles[Math.floor(Math.random()*tiles.length)];
    tile.classList.add('out');                       /* 1. one tile disappears */
    await wait(520);
    cur=(cur+1)%layouts.length; place(cur);          /* 2. the others slide into a new collage */
    const k=fresh(); await preload(pool[k].cover);
    await wait(1000);
    swap(tile,k); tile.classList.remove('out');      /* 3. a new tile appears in its new place */
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
