/* Lightbox for photos, brand book pages and videos. Items come from <script id="lb-data" type="application/json">;
   any element with data-lb="<index>" opens that item, arrows/keys/swipe move through the list. */
(function(){
  const lb=document.getElementById('lb'), dataEl=document.getElementById('lb-data');
  if(!lb||!dataEl) return;
  let items=[]; try{ items=JSON.parse(dataEl.textContent); }catch(e){}
  const stage=lb.querySelector('.lb-stage'), tTitle=lb.querySelector('.lb-title'), tSub=lb.querySelector('.lb-sub'), tCount=lb.querySelector('.lb-count');
  const prevB=lb.querySelector('.lb-prev'), nextB=lb.querySelector('.lb-next'), closeB=lb.querySelector('.lb-close');
  let idx=0, opener=null;

  /* the viewer steps only through the items of the opened item's group (items without a group form one group) */
  const peers=(i)=>{ const g=items[i].grp||''; const out=[]; items.forEach((x,k)=>{ if(!x.solo&&(x.grp||'')===g) out.push(k); }); return out; };
  function render(){
    const it=items[idx]; stage.innerHTML=''; stage.classList.remove('zoomed');
    if(it.video){
      const v=document.createElement('video');
      v.src=it.video.src; v.poster=it.video.poster; v.controls=true; v.autoplay=true; v.playsInline=true; v.loop=true;
      if(it.video.vertical) v.className='is-v';
      stage.appendChild(v); const p=v.play(); if(p&&p.catch) p.catch(()=>{});
    } else {
      const im=document.createElement('img'); im.src=it.src; im.width=it.w; im.height=it.h; im.alt=it.title; stage.appendChild(im);
      const ps=peers(idx), at=ps.indexOf(idx);
      if(at>=0) [-1,1].forEach(d=>{ const o=items[ps[(at+d+ps.length)%ps.length]]; if(o&&o.src){ const p=new Image(); p.src=o.src; } });
    }
    const gp=peers(idx);
    tTitle.textContent=it.title; tSub.textContent=it.sub||''; tCount.textContent=it.solo?'':(gp.indexOf(idx)+1)+' / '+gp.length;
    prevB.hidden=nextB.hidden=!!it.solo||gp.length<2;
  }
  function open(i,el){ idx=i; opener=el; render(); lb.classList.add('open'); lb.setAttribute('aria-hidden','false'); document.body.classList.add('lb-open'); window.dispatchEvent(new Event('lb-open')); closeB.focus(); }
  function close(){
    const v=stage.querySelector('video'); if(v) v.pause();
    stage.innerHTML=''; lb.classList.remove('open'); lb.setAttribute('aria-hidden','true'); document.body.classList.remove('lb-open'); window.dispatchEvent(new Event('lb-close'));
    if(opener) opener.focus();
  }
  function step(d){ if(items[idx].solo) return; const ps=peers(idx), at=ps.indexOf(idx); if(ps.length<2) return; idx=ps[(at+d+ps.length)%ps.length]; render(); }

  document.addEventListener('click',(e)=>{ const t=e.target.closest('[data-lb]'); if(t){ e.preventDefault(); open(Number(t.dataset.lb),t); } });
  stage.addEventListener('click',(e)=>{ if(e.target.tagName==='IMG') stage.classList.toggle('zoomed'); });                       /* click a page to zoom in, click again to go back */
  closeB.addEventListener('click',close); prevB.addEventListener('click',()=>step(-1)); nextB.addEventListener('click',()=>step(1));
  lb.addEventListener('click',(e)=>{ if(e.target===lb||e.target===stage) close(); });
  document.addEventListener('keydown',(e)=>{
    if(!lb.classList.contains('open')) return;
    if(e.key==='Escape') close(); else if(e.key==='ArrowRight') step(1); else if(e.key==='ArrowLeft') step(-1);
    else if(e.key==='Tab'){ const f=[...lb.querySelectorAll('button:not([hidden]),video')]; if(!f.length) return; const a=document.activeElement, first=f[0], last=f[f.length-1];
      if(e.shiftKey&&a===first){ e.preventDefault(); last.focus(); } else if(!e.shiftKey&&a===last){ e.preventDefault(); first.focus(); } }
  });
  let x0=null;
  lb.addEventListener('touchstart',(e)=>{ x0=e.touches[0].clientX; },{passive:true});
  lb.addEventListener('touchend',(e)=>{ if(x0===null) return; const dx=e.changedTouches[0].clientX-x0; x0=null; if(Math.abs(dx)>60) step(dx<0?1:-1); });
})();
