/* Portfolio: category filters + lightbox (photos, galleries, videos). */
(function(){
  const sec=document.getElementById('darbai'); if(!sec) return;
  const grid=sec.querySelector('.pf-grid'), cards=[...grid.querySelectorAll('.pf-card')], empty=sec.querySelector('.pf-empty');
  let data={}; try{ data=JSON.parse(document.getElementById('pf-data').textContent); }catch(e){}

  /* ---- filters ---- */
  const btns=[...sec.querySelectorAll('.pf-filter')];
  function applyFilter(f){
    let n=0;
    cards.forEach(c=>{ const on=f==='all'||c.dataset.cats.split(' ').includes(f); c.hidden=!on; if(on) n++; });
    btns.forEach(b=>{ const on=b.dataset.f===f; b.classList.toggle('is-on',on); b.setAttribute('aria-pressed',String(on)); });
    empty.hidden=n>0;
  }
  btns.forEach(b=>b.addEventListener('click',()=>applyFilter(b.dataset.f)));

  /* ---- lightbox ---- */
  const lb=document.getElementById('lb'), stage=lb.querySelector('.lb-stage');
  const tTitle=lb.querySelector('.lb-title'), tSub=lb.querySelector('.lb-sub'), tCount=lb.querySelector('.lb-count');
  const prevB=lb.querySelector('.lb-prev'), nextB=lb.querySelector('.lb-next'), closeB=lb.querySelector('.lb-close');
  let cur=null, idx=0, opener=null;

  function render(){
    stage.innerHTML='';
    if(cur.video){
      const v=document.createElement('video');
      v.src=cur.video.src; v.poster=cur.video.poster; v.controls=true; v.autoplay=true; v.playsInline=true; v.loop=true;
      if(cur.video.vertical) v.className='is-v';
      stage.appendChild(v); v.play().catch(()=>{});
      tCount.textContent='';
    } else {
      const m=cur.images[idx], im=document.createElement('img');
      im.src=m.src; im.width=m.w; im.height=m.h; im.alt=cur.title+' — '+(idx+1);
      stage.appendChild(im);
      tCount.textContent=(idx+1)+' / '+cur.images.length;
      [-1,1].forEach(d=>{ const o=cur.images[(idx+d+cur.images.length)%cur.images.length]; const p=new Image(); p.src=o.src; });  /* preload neighbours */
    }
    const multi=!!cur.images && cur.images.length>1;
    prevB.hidden=nextB.hidden=!multi;
  }
  function open(id,el){
    cur=data[id]; if(!cur) return; idx=0; opener=el;
    tTitle.textContent=cur.title; tSub.textContent=cur.sub;
    render();
    lb.classList.add('open'); lb.setAttribute('aria-hidden','false'); document.body.classList.add('lb-open');
    closeB.focus();
  }
  function close(){
    const v=stage.querySelector('video'); if(v) v.pause();
    stage.innerHTML=''; lb.classList.remove('open'); lb.setAttribute('aria-hidden','true'); document.body.classList.remove('lb-open');
    cur=null; if(opener) opener.focus();
  }
  function step(d){ if(!cur||!cur.images) return; idx=(idx+d+cur.images.length)%cur.images.length; render(); }

  cards.forEach(c=>{ if(c.dataset.open) c.addEventListener('click',()=>open(c.dataset.open,c)); });
  closeB.addEventListener('click',close);
  prevB.addEventListener('click',()=>step(-1));
  nextB.addEventListener('click',()=>step(1));
  lb.addEventListener('click',(e)=>{ if(e.target===lb||e.target===stage) close(); });
  document.addEventListener('keydown',(e)=>{
    if(!lb.classList.contains('open')) return;
    if(e.key==='Escape') close(); else if(e.key==='ArrowRight') step(1); else if(e.key==='ArrowLeft') step(-1);
    else if(e.key==='Tab'){ const f=[...lb.querySelectorAll('button:not([hidden]),video')]; if(!f.length) return;
      const a=document.activeElement, first=f[0], last=f[f.length-1];
      if(e.shiftKey&&a===first){ e.preventDefault(); last.focus(); } else if(!e.shiftKey&&a===last){ e.preventDefault(); first.focus(); } }
  });
  let x0=null;
  lb.addEventListener('touchstart',(e)=>{ x0=e.touches[0].clientX; },{passive:true});
  lb.addEventListener('touchend',(e)=>{ if(x0===null) return; const dx=e.changedTouches[0].clientX-x0; x0=null; if(Math.abs(dx)>60) step(dx<0?1:-1); });
})();
