/* Orbit globe gallery (Video, Photography, Graphic design pages).
   The pictures sit on the surface of a ball, all facing the viewer and keeping their own shape; the ball turns slowly, nearer pictures are a little
   larger and brighter, the ones behind are smaller and darker. Drag to turn it, hover to stop it, click a picture to open it in the lightbox. */
(function(){
  const grid=document.querySelector('.gp-grid[data-orb]'); if(!grid) return;
  const items=[...grid.querySelectorAll('.gp-card')].map(b=>{
    const media=b.querySelector('.gp-media'), im=b.querySelector('img');
    const r=media&&parseFloat((media.style.aspectRatio||'').replace(',','.'));
    return { lb:b.dataset.lb, src:im?im.getAttribute('src'):'', ratio:r>0?r:1.5, video:!!b.querySelector('.gp-play'), title:b.getAttribute('aria-label')||'' };
  });
  if(!items.length) return;
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const RAD=Math.PI/180, SPEED=7;                       /* degrees per second */

  const wrap=document.createElement('div'); wrap.className='orb';
  const view=document.createElement('div'); view.className='orb-view'; view.setAttribute('role','region'); view.setAttribute('aria-label',(document.querySelector('.gp-h1')||{}).textContent||'');
  const hint=document.createElement('p'); hint.className='orb-hint'; hint.textContent=grid.dataset.orb||'';
  wrap.appendChild(view); wrap.appendChild(hint);
  grid.parentNode.replaceChild(wrap,grid);

  /* evenly spread points on a sphere (golden-angle spiral) */
  const N=items.length, GA=Math.PI*(3-Math.sqrt(5));
  const pts=items.map((it,i)=>{ const y=N===1?0:1-2*(i+.5)/N, r=Math.sqrt(Math.max(0,1-y*y)), th=i*GA; return {x:Math.cos(th)*r, y:y, z:Math.sin(th)*r}; });
  const els=items.map((it,i)=>{
    const b=document.createElement('button'); b.type='button'; b.className='orb-c'+(it.video?' is-video':''); b.dataset.lb=it.lb; b.setAttribute('aria-label',it.title);
    const im=document.createElement('img'); im.src=it.src; im.alt=''; im.decoding='async'; im.draggable=false;
    im.addEventListener('load',()=>{ if(im.naturalWidth&&im.naturalHeight){ it.ratio=im.naturalWidth/im.naturalHeight; size(); } });
    b.appendChild(im);
    if(it.video){ const p=document.createElement('span'); p.className='play'; p.setAttribute('aria-hidden','true'); b.appendChild(p); }
    view.appendChild(b); return b;
  });

  let W=0,H=0,R=300,D=1800, yaw=-25, pitch=-14, vYaw=0, appear=0, hovered=null, hovering=false, dragging=false, onScreen=false, held=false, moved=0;
  function size(){
    W=view.clientWidth; H=view.clientHeight;
    R=Math.max(150,Math.min(W*(W<700?.36:.31),H*.4)); D=R*6;
    const sp=R*Math.sqrt(4*Math.PI/N), base=Math.min(.9*sp, R*(N<9?.85:.62));       /* picture size follows the spacing, so few pictures stay big and many stay small */
    els.forEach((b,i)=>{ const r=items[i].ratio, w=base*Math.sqrt(r), h=base/Math.sqrt(r); b.style.width=w.toFixed(1)+'px'; b.style.height=h.toFixed(1)+'px'; });
  }
  function paint(){
    const cy=Math.cos(yaw*RAD), sy=Math.sin(yaw*RAD), cp=Math.cos(pitch*RAD), sp=Math.sin(pitch*RAD);
    const k=1-Math.pow(1-Math.min(1,appear),3);                                   /* the globe opens up when the page loads */
    els.forEach((b,i)=>{
      const q=pts[i], x1=q.x*cy+q.z*sy, z1=-q.x*sy+q.z*cy, y2=q.y*cp-z1*sp, z2=q.y*sp+z1*cp;
      const s=D/(D-z2*R)*(b===hovered?1.18:1), depth=(z2+1)/2;
      b.style.transform='translate3d('+(W/2+x1*R*k)+'px,'+(H/2+y2*R*k)+'px,0) translate(-50%,-50%) scale('+(s*(.4+.6*k)).toFixed(3)+')';
      b.style.zIndex=b===hovered?1000:Math.round(depth*100);
      b.style.opacity=String(Math.min(1,k*1.4));
      b.style.filter='brightness('+(b===hovered?1:(.5+.5*depth)).toFixed(2)+')';
    });
  }

  /* ---- drag to turn, hover to stop ---- */
  let sx=0, sy=0, lx=0, lt=0;
  view.addEventListener('pointerdown',(e)=>{ if(e.button!==0) return; dragging=true; moved=0; sx=lx=e.clientX; sy=e.clientY; lt=performance.now(); vYaw=0; view.classList.add('is-drag'); });
  window.addEventListener('pointermove',(e)=>{
    if(!dragging) return;
    const dx=e.clientX-lx, now=performance.now(), dt=Math.max(1,now-lt)/1000; lt=now;
    moved=Math.max(moved,Math.hypot(e.clientX-sx,e.clientY-sy));
    yaw+=dx*.3; pitch=Math.max(-45,Math.min(45,pitch+(e.movementY||0)*.15)); vYaw=dx*.3/dt*.5+vYaw*.5; lx=e.clientX; paint();
  });
  const end=()=>{ if(!dragging) return; dragging=false; view.classList.remove('is-drag'); vYaw=Math.max(-240,Math.min(240,vYaw)); };
  window.addEventListener('pointerup',end); window.addEventListener('pointercancel',end);
  view.addEventListener('click',(e)=>{ if(moved>6){ e.stopPropagation(); e.preventDefault(); } },true);
  view.addEventListener('mouseover',(e)=>{ const c=e.target.closest('.orb-c'); hovered=c||null; hovering=!!c; });
  view.addEventListener('mouseleave',()=>{ hovered=null; hovering=false; });
  view.addEventListener('focusin',(e)=>{ hovered=e.target.closest('.orb-c'); hovering=!!hovered; });
  view.addEventListener('focusout',()=>{ hovered=null; hovering=false; });
  window.addEventListener('lb-open',()=>{ held=true; }); window.addEventListener('lb-close',()=>{ held=false; });
  if('IntersectionObserver' in window) new IntersectionObserver((es)=>{ onScreen=es[0].isIntersecting; },{threshold:0.05}).observe(view); else onScreen=true;
  window.addEventListener('resize',()=>{ size(); paint(); });

  let last=performance.now(), cur=reduced?0:SPEED;
  function tick(now){
    const dt=Math.min(.1,(now-last)/1000); last=now;
    if(appear<1){ appear=Math.min(1,appear+dt/1.1); paint(); }
    if(onScreen&&!held&&!dragging){
      const target=(hovering||reduced)?0:SPEED;
      cur+=(target-cur)*Math.min(1,dt*4);
      vYaw*=Math.pow(.04,dt);
      yaw+=(cur+vYaw)*dt; pitch+=(-14-pitch)*Math.min(1,dt*.5);
      paint();
    }
    requestAnimationFrame(tick);
  }
  size(); paint(); requestAnimationFrame(tick);
})();
