/* Inside-a-sphere gallery. The pictures cover the inner surface of a big ball; the viewer sits (almost) in the middle
   and the ball turns slowly. Drag to turn it yourself, click a picture to open it in the lightbox. */
(function(){
  const root=document.querySelector('.sph'); if(!root) return;
  const view=root.querySelector('.sph-view'), ball=root.querySelector('.sph-ball');
  let pool=[]; try{ pool=JSON.parse(document.getElementById('lb-data').textContent).slice(0,Number(root.dataset.pool)); }catch(e){ return; }
  if(!pool.length) return;
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const RAD=Math.PI/180;
  const SPEED=4;                                     /* degrees per second: one turn in 90 seconds */

  let yaw=0, pitch=0, vYaw=0, built=false, size='';
  let hovering=false, dragging=false, onScreen=false, held=false, moved=0;

  function build(){
    const W=view.clientWidth, H=view.clientHeight, key=W+'x'+H; if(key===size) return; size=key;
    const P=Math.max(420,W*0.62), R=P*0.96, cols=W<700?22:32, rowsMax=W<700?34:38;
    const dTh=360/cols, tw=R*dTh*RAD*0.9, th=tw*0.68, dPh=th/(0.9*R)/RAD;
    const n=Math.floor(rowsMax/dPh), rows=2*n+1;
    view.style.perspective=P+'px';
    ball.style.setProperty('--z',(P-60)+'px');
    ball.textContent='';
    const frag=document.createDocumentFragment();
    for(let r=-n;r<=n;r++){
      for(let c=0;c<cols;c++){
        const it=pool[((c*5+(r+n)*3)%pool.length+pool.length)%pool.length], k=pool.indexOf(it);
        const b=document.createElement('button'); b.type='button'; b.className='sph-t'+(it.kind==='video'?' is-video':'');
        b.tabIndex=-1; b.dataset.lb=k; b.setAttribute('aria-label',it.title);
        b.style.width=tw.toFixed(1)+'px'; b.style.height=th.toFixed(1)+'px';
        b.style.transform='rotateY('+(c*dTh).toFixed(2)+'deg) rotateX('+(-r*dPh).toFixed(2)+'deg) translateZ('+(-R).toFixed(1)+'px) translate(-50%,-50%)';
        const im=document.createElement('img'); im.src=it.cover; im.alt=''; im.decoding='async'; im.draggable=false; b.appendChild(im);
        if(it.kind==='video'){ const p=document.createElement('span'); p.className='play'; p.setAttribute('aria-hidden','true'); b.appendChild(p); }
        frag.appendChild(b);
      }
    }
    ball.appendChild(frag); built=true;
  }
  function paint(){ ball.style.transform='translateZ(var(--z)) rotateX('+pitch.toFixed(2)+'deg) rotateY('+yaw.toFixed(2)+'deg)'; }

  /* ---- drag to turn ---- */
  let sx=0, sy=0, lx=0, ly=0, lt=0;
  view.addEventListener('pointerdown',(e)=>{
    if(e.button!==0) return; dragging=true; moved=0; sx=lx=e.clientX; sy=ly=e.clientY; lt=performance.now(); vYaw=0; view.classList.add('is-drag');
  });
  window.addEventListener('pointermove',(e)=>{
    if(!dragging) return;
    const dx=e.clientX-lx, dy=e.clientY-ly, now=performance.now(), dt=Math.max(1,now-lt)/1000;
    moved=Math.max(moved,Math.hypot(e.clientX-sx,e.clientY-sy));
    yaw-=dx*0.16; pitch=Math.max(-22,Math.min(22,pitch+dy*0.1));
    vYaw=(-dx*0.16)/dt*0.5+vYaw*0.5; lx=e.clientX; ly=e.clientY; lt=now; paint();
  });
  const end=()=>{ if(!dragging) return; dragging=false; view.classList.remove('is-drag'); if(Math.abs(vYaw)>200) vYaw=Math.sign(vYaw)*200; };
  window.addEventListener('pointerup',end); window.addEventListener('pointercancel',end);
  view.addEventListener('click',(e)=>{ if(moved>6){ e.stopPropagation(); e.preventDefault(); } },true);
  view.addEventListener('mouseenter',()=>{ hovering=true; }); view.addEventListener('mouseleave',()=>{ hovering=false; });
  view.addEventListener('keydown',(e)=>{
    if(e.key==='ArrowLeft'){ yaw-=12; paint(); e.preventDefault(); } else if(e.key==='ArrowRight'){ yaw+=12; paint(); e.preventDefault(); }
    else if(e.key==='ArrowUp'){ pitch=Math.max(-22,pitch-6); paint(); e.preventDefault(); } else if(e.key==='ArrowDown'){ pitch=Math.min(22,pitch+6); paint(); e.preventDefault(); }
  });

  window.addEventListener('lb-open',()=>{ held=true; }); window.addEventListener('lb-close',()=>{ held=false; });
  if('IntersectionObserver' in window) new IntersectionObserver((es)=>{ onScreen=es[0].isIntersecting; },{threshold:0.05}).observe(view); else onScreen=true;
  let rt; window.addEventListener('resize',()=>{ clearTimeout(rt); rt=setTimeout(()=>{ build(); paint(); },150); });

  /* ---- loop ---- */
  let last=performance.now(), drive=reduced?0:SPEED, cur=drive;
  function tick(now){
    const dt=Math.min(0.1,(now-last)/1000); last=now;
    if(onScreen && !held){
      if(!dragging){
        const target=(hovering||reduced)?0:SPEED;           /* the ball eases to a stop under the pointer */
        cur+=(target-cur)*Math.min(1,dt*3);
        vYaw*=Math.pow(0.04,dt);                             /* leftover swing from a drag fades out */
        yaw+=(cur+vYaw)*dt;
        pitch+=(0-pitch)*Math.min(1,dt*0.6);
        paint();
      }
    }
    requestAnimationFrame(tick);
  }
  build(); paint(); requestAnimationFrame(tick);
})();
