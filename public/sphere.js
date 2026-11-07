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
    G={R:R,dTh:dTh,dPh:dPh,cols:cols,tw:tw,th:th}; focus=null; stopVideo();
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
        b._c=c; b._r=r; place(b,0,0,0,1,1);
        const im=document.createElement('img'); im.src=it.cover; im.alt=''; im.decoding='async'; im.draggable=false; b.appendChild(im);
        if(it.kind==='video'){ const p=document.createElement('span'); p.className='play'; p.setAttribute('aria-hidden','true'); b.appendChild(p); }
        frag.appendChild(b);
      }
    }
    ball.appendChild(frag); built=true;
  }
  /* a tile sits at column angle c*dTh and row angle r*dPh on the inside of the ball; dy/dp nudge it sideways/up-down, lift moves it toward the viewer, s scales it */
  let G={R:700,dTh:11,dPh:7,cols:32,tw:130,th:88};
  function place(b,dy,dp,lift,sx,sy){
    b.style.transform='rotateY('+(b._c*G.dTh+dy).toFixed(2)+'deg) rotateX('+(-b._r*G.dPh+dp).toFixed(2)+'deg) translateZ('+(-G.R+lift).toFixed(1)+'px) scale('+sx.toFixed(3)+','+sy.toFixed(3)+') translate(-50%,-50%)';
  }

  /* Fisheye lens: the tile under the pointer grows to its own picture shape and about 2.9 times the normal width;
     the tiles around it shrink and slide so that the lens area stays exactly as big as before (no black gaps),
     and everything outside the lens is untouched. Distances are counted in tiles. */
  const TILE=0.9;                                     /* a tile fills 90% of its grid cell */
  function solveD(T,U){                               /* lens strength that makes the centre tile T cells wide */
    if(T<=TILE) return 0; let lo=0, hi=400;
    for(let i=0;i<40;i++){ const d=(lo+hi)/2, s=TILE/2/U, v=2*U*((d+1)*s/(d*s+1)); if(v<T) lo=d; else hi=d; }
    return (lo+hi)/2;
  }
  function lens(u,U,d){ const a=Math.abs(u); if(a>=U) return u; const s=a/U; return Math.sign(u)*U*((d+1)*s/(d*s+1)); }
  function span(u,U,d){ const l=lens(u-TILE/2,U,d), r=lens(u+TILE/2,U,d); return [(l+r)/2,(r-l)/TILE]; }   /* [new centre, scale] */

  let focus=null, vid=null, vt=0;
  function stopVideo(){ clearTimeout(vt); if(vid){ vid.pause(); vid.remove(); vid.parentNode&&vid.parentNode.classList.remove('is-live'); vid=null; } ball.querySelectorAll('.is-live').forEach(t=>t.classList.remove('is-live')); }
  function lift(b){
    if(focus===b) return; focus=b; stopVideo();
    const tiles=ball.querySelectorAll('.sph-t');
    if(!b){ tiles.forEach(t=>place(t,0,0,0,1,1)); return; }
    const it=pool[Number(b.dataset.lb)], ratio=it.ratio>0?it.ratio:G.tw/G.th;
    const w=Math.min(2.9*G.tw,3.4*G.th*ratio), h=w/ratio;          /* picture keeps its own shape */
    const Ux=4, Uy=3.5, dx=solveD(TILE*w/G.tw,Ux), dy=solveD(TILE*h/G.th,Uy);
    tiles.forEach(t=>{
      let dc=t._c-b._c; if(dc>G.cols/2) dc-=G.cols; if(dc<-G.cols/2) dc+=G.cols;
      const dr=t._r-b._r;
      if(Math.abs(dc)>Ux+1||Math.abs(dr)>Uy+1){ place(t,0,0,0,1,1); return; }
      const X=span(dc,Ux,dx), Y=span(dr,Uy,dy);
      place(t,(X[0]-dc)*G.dTh,-(Y[0]-dr)*G.dPh,t===b?G.R*0.03:0,X[1],Y[1]);
    });
    if(it.kind==='video' && it.video && it.video.src){
      vt=setTimeout(()=>{
        const v=document.createElement('video'); v.src=it.video.src; v.poster=it.video.poster||it.cover; v.muted=true; v.loop=true; v.playsInline=true; v.className='sph-vid';
        b.appendChild(v); b.classList.add('is-live'); vid=v; const p=v.play(); if(p&&p.catch) p.catch(()=>{});
      },450);
    }
  }
  ball.addEventListener('mouseover',(e)=>{ const t=e.target.closest('.sph-t'); if(t&&!dragging) lift(t); });
  view.addEventListener('mouseleave',()=>lift(null));
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
