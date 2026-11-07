/* Shared by every page: theme toggle, header state, overlay menu. */
(function(){
  const root=document.documentElement, body=document.body;

  /* theme (light = paper is the default) */
  const tt=document.getElementById('themeToggle');
  if(tt) tt.addEventListener('click',()=>{
    const next=root.getAttribute('data-theme')==='dark'?'light':'dark';
    root.setAttribute('data-theme',next);
    try{localStorage.setItem('theme',next);}catch(e){}
  });

  /* header: transparent over the hero, solid after scrolling (inner pages are always solid) */
  const hd=document.getElementById('siteHead');
  if(hd && !hd.classList.contains('solid')){
    const on=()=>hd.classList.toggle('scrolled',window.scrollY>60);
    on(); window.addEventListener('scroll',on,{passive:true});
  }

  /* overlay menu */
  const menu=document.getElementById('menu'), openB=document.getElementById('menuOpen'), closeB=document.getElementById('menuClose');
  if(menu && openB && closeB){
    const open=()=>{menu.removeAttribute('inert');menu.classList.add('open');menu.setAttribute('aria-hidden','false');body.classList.add('lb-open');closeB.focus();};
    const close=()=>{menu.classList.remove('open');menu.setAttribute('aria-hidden','true');menu.setAttribute('inert','');body.classList.remove('lb-open');openB.focus();};
    openB.addEventListener('click',open); closeB.addEventListener('click',close);
    menu.querySelectorAll('a[data-close]').forEach(a=>a.addEventListener('click',()=>{menu.classList.remove('open');menu.setAttribute('aria-hidden','true');menu.setAttribute('inert','');body.classList.remove('lb-open');}));
    document.addEventListener('keydown',(e)=>{ if(e.key==='Escape' && menu.classList.contains('open')) close(); });
  }
})();
