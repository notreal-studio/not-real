/* Home page only: short loader, scroll reveal, contact form. */
(function(){
  const T=(window.__t)||{};
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const body=document.body;

  /* ---- reveal ---- */
  function runReveal(){
    const els=[...document.querySelectorAll('.reveal')];
    if(reduced||!('IntersectionObserver' in window)){ els.forEach(e=>e.classList.add('in')); return; }
    const io=new IntersectionObserver((es)=>{ es.forEach(en=>{ if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); } }); },{threshold:0.12,rootMargin:'0px 0px -8% 0px'});
    els.forEach(e=>io.observe(e));
  }

  /* ---- loader (about one second) ---- */
  const loader=document.getElementById('loader'), lcount=document.getElementById('lcount'), lbar=document.getElementById('lbar');
  function reveal(){
    body.classList.remove('locked'); runReveal();
    if(!loader) return;
    if(reduced){ loader.style.display='none'; return; }
    loader.classList.add('gone'); setTimeout(()=>{ loader.style.display='none'; },900);
  }
  if(!loader){ reveal(); }
  else if(reduced){ lcount.textContent='100'; lbar.style.width='100%'; reveal(); }
  else {
    let p=0;
    const t=setInterval(()=>{
      p+=Math.max(2,Math.round((100-p)*0.14));
      if(p>=100){ p=100; clearInterval(t); }
      lcount.textContent=p; lbar.style.width=p+'%';
      if(p>=100) setTimeout(reveal,150);
    },24);
  }

  /* ---- contact form (Web3Forms) ---- */
  const form=document.getElementById('contact-form'), msg=document.getElementById('form-msg');
  if(form && msg){
    form.addEventListener('submit', async (e)=>{
      e.preventDefault(); msg.className='form-msg'; msg.textContent=T.sending||'Sending…';
      const data=Object.fromEntries(new FormData(form));
      try{
        const res=await fetch('https://api.web3forms.com/submit',{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(data)});
        const json=await res.json();
        if(json.success){ msg.className='form-msg ok'; msg.textContent=T.ok||'Sent.'; form.reset(); }
        else { msg.className='form-msg err'; msg.textContent=T.err||'Failed.'; }
      }catch(err){ msg.className='form-msg err'; msg.textContent=T.neterr||'Connection error.'; }
    });
  }
})();
