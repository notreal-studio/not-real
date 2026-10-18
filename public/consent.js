/* Slapukų sutikimas + Google Analytics 4 (įkeliamas TIK gavus sutikimą) */
(function(){
  var GA_ID='G-6TMLTSEL2S', KEY='nr-consent';
  var lang=(document.documentElement.lang||'lt').slice(0,2)==='en'?'en':'lt';
  var T={
    lt:{title:'Slapukai ir analitika',
      text:'Naudojame Google Analytics, kad suprastume, kaip naudojamasi svetaine. Tai vykdoma tik gavus tavo sutikimą.',
      more:'Privatumo politika',yes:'Sutinku',no:'Nesutinku',href:'/privatumas/'},
    en:{title:'Cookies and analytics',
      text:'We use Google Analytics to understand how the site is used. This only runs with your consent.',
      more:'Privacy policy',yes:'Accept',no:'Decline',href:'/en/privacy/'}
  }[lang];

  function get(){try{return localStorage.getItem(KEY);}catch(e){return null;}}
  function set(v){try{localStorage.setItem(KEY,v);}catch(e){}}

  function loadGA(){
    if(window.__gaLoaded) return; window.__gaLoaded=true;
    window.dataLayer=window.dataLayer||[];
    window.gtag=function(){dataLayer.push(arguments);};
    gtag('js',new Date()); gtag('config',GA_ID);
    var s=document.createElement('script'); s.async=true;
    s.src='https://www.googletagmanager.com/gtag/js?id='+GA_ID;
    document.head.appendChild(s);
  }

  function clearGA(){
    var host=location.hostname, parts=host.split('.'), domains=[host,'.'+host];
    if(parts.length>2) domains.push('.'+parts.slice(-2).join('.'));
    document.cookie.split(';').forEach(function(c){
      var n=c.split('=')[0].trim();
      if(n==='_ga'||n.indexOf('_ga_')===0||n==='_gid'||n==='_gat'){
        domains.forEach(function(d){document.cookie=n+'=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain='+d;});
        document.cookie=n+'=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
      }
    });
    window['ga-disable-'+GA_ID]=true;
  }

  function hide(){var b=document.getElementById('cc');if(b)b.remove();}

  function show(){
    hide();
    var b=document.createElement('div');
    b.id='cc'; b.className='cc'; b.setAttribute('role','dialog'); b.setAttribute('aria-label',T.title);
    b.innerHTML='<div class="cc-t"></div><p class="cc-p"></p><a class="cc-a"></a><div class="cc-b"><button type="button" class="cc-btn" data-v="denied"></button><button type="button" class="cc-btn" data-v="granted"></button></div>';
    b.querySelector('.cc-t').textContent=T.title;
    b.querySelector('.cc-p').textContent=T.text;
    var a=b.querySelector('.cc-a'); a.textContent=T.more; a.href=T.href;
    var bt=b.querySelectorAll('.cc-btn'); bt[0].textContent=T.no; bt[1].textContent=T.yes;
    b.addEventListener('click',function(e){
      var v=e.target.getAttribute&&e.target.getAttribute('data-v'); if(!v) return;
      set(v); if(v==='granted'){window['ga-disable-'+GA_ID]=false;loadGA();} else clearGA();
      hide();
    });
    document.body.appendChild(b);
  }

  document.addEventListener('click',function(e){
    var t=e.target.closest&&e.target.closest('[data-cookie-settings]');
    if(t){e.preventDefault();show();}
  });

  function init(){
    var c=get();
    if(c==='granted') loadGA(); else if(c==='denied') clearGA(); else show();
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();
