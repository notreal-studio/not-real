(function(){
  const T = (typeof window !== "undefined" && window.__t) ? window.__t : {};
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const body = document.body;

  /* ---- LOADER ---- */
  const loader=document.getElementById('loader'), lcount=document.getElementById('lcount'), lbar=document.getElementById('lbar');
  function revealSite(){
    body.classList.remove('locked');
    runReveal();
    if(window.gsap && !reduced){
      gsap.to(loader,{yPercent:-100,duration:0.9,ease:'power4.inOut',onComplete:()=>loader.style.display='none'});
      gsap.from('.hero h1',{y:40,opacity:0,duration:1,ease:'power3.out',delay:0.15});
    } else { loader.style.display='none'; }
  }
  if(reduced){ lcount.textContent='100'; lbar.style.width='100%'; revealSite(); }
  else {
    let p=0;
    const t=setInterval(()=>{
      p+=Math.max(1,Math.round((100-p)*0.08));
      if(p>=100){p=100;clearInterval(t);}
      lcount.textContent=p; lbar.style.width=p+'%';
      if(p>=100) setTimeout(revealSite,250);
    },55);
  }

  /* ---- THEME TOGGLE ---- */
  const root = document.documentElement;
  document.getElementById('themeToggle').addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });
  if (!localStorage.getItem('theme') && window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) root.setAttribute('data-theme', e.matches ? 'light' : 'dark');
    });
  }

  /* ---- OVERLAY MENU ---- */
  const menu=document.getElementById('menu');
  const open=()=>{
    menu.classList.add('open');menu.setAttribute('aria-hidden','false');body.classList.add('locked');
    if(window.gsap&&!reduced){
      gsap.from('#menu .ml-item',{x:40,opacity:0,duration:0.55,stagger:0.07,ease:'power3.out',delay:0.25});
      gsap.from('#menu .menu-nr-logo',{opacity:0,y:-10,duration:0.4,ease:'power2.out',delay:0.15});
      gsap.from('#menu .menu-close',{opacity:0,duration:0.35,delay:0.2});
      gsap.from('#menu .menu-foot-left',{opacity:0,y:12,duration:0.4,ease:'power2.out',delay:0.5});
      gsap.from('#menu .reel-ring',{opacity:0,scale:0.7,duration:0.5,ease:'back.out(1.5)',delay:0.55});
    }
  };
  const close=()=>{menu.classList.remove('open');menu.setAttribute('aria-hidden','true');body.classList.remove('locked');};
  document.getElementById('menuOpen').addEventListener('click',open);
  document.getElementById('menuClose').addEventListener('click',close);
  menu.querySelectorAll('.menu-links a').forEach(a=>a.addEventListener('click',(e)=>{
    /* kalbų perjungiklis nuvedа į kitą puslapį — neuždarom be reikalo */
    if(a.closest('.lang-switch')) return;
    close();
  }));

  /* ---- SHOWREEL placeholder ---- */
  document.getElementById('playReel').addEventListener('click',()=>{
    alert(T.reel || 'Showreel placeholder.');
  });

  /* ---- SCROLL REVEAL ---- */
  function runReveal(){
    const els=Array.from(document.querySelectorAll('.reveal'));
    if(reduced||!('IntersectionObserver' in window)){els.forEach(e=>e.classList.add('in'));return;}
    document.querySelectorAll('.svc,.gal').forEach(g=>Array.from(g.children).forEach((c,i)=>{c.style.transitionDelay=(i*0.09)+'s';}));
    const io=new IntersectionObserver((ents)=>{ents.forEach(en=>{if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target);}});},{threshold:0.12,rootMargin:'0px 0px -8% 0px'});
    els.forEach(e=>io.observe(e));
  }

  /* ---- CONTACT FORM ---- */
  const form=document.getElementById('contact-form'), msg=document.getElementById('form-msg');
  form.addEventListener('submit', async (e)=>{
    e.preventDefault(); msg.className='form-msg'; msg.textContent=T.sending || 'Sending…';
    const data=Object.fromEntries(new FormData(form));
    try{
      const res=await fetch('https://api.web3forms.com/submit',{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(data)});
      const json=await res.json();
      if(json.success){msg.className='form-msg ok';msg.textContent=T.ok || 'Sent.';form.reset();}
      else{msg.className='form-msg err';msg.textContent=T.err || 'Failed.';}
    }catch(err){msg.className='form-msg err';msg.textContent=T.neterr || 'Connection error.';}
  });
})();
