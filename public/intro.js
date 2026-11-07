/* Opening sequence (about 2.5 seconds).
   1. Light catches a glass edge: at first only a small glint in the middle of a black screen.
   2. From it an irregular, see-through, hand-blown-glass shape unfolds and turns slowly; light slides along its edges and folds.
      The first hero picture is already inside the glass, bent and broken into facets like a view through thick glass.
   3. As the shape turns to face the viewer the fragments join and the picture sharpens; the shape widens, its folds flatten and its outline
      becomes the screen frame: at the end the picture sits exactly where the first hero frame sits, and the navigation fades in.
   The picture is the poster frame of the first hero film. When the show is over the film (already waiting on that very frame) starts to play.
   One WebGL fragment shader does everything. No WebGL, reduced motion, or a slow load: the page simply appears with a short fade. */
(function(){
  const cv=document.getElementById('intro-cv'), box=document.getElementById('loader');
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hv=document.querySelector('.hs.is-active video, .hs video');
  const POSTER_T=1.5;                                        /* the poster frames were cut at 1.5 s of each film */
  let finished=false;
  function done(){
    if(finished) return; finished=true;
    document.body.classList.remove('intro-on');
    if(box){ box.classList.add('gone'); setTimeout(()=>{ box.style.display='none'; },700); }
    window.__introRunning=false;
    window.dispatchEvent(new Event('intro-done'));
  }
  window.__introRunning=false;
  if(!cv||!box||!hv||reduced) return;
  const gl=cv.getContext('webgl',{antialias:false,alpha:false,powerPreference:'high-performance'});
  if(!gl) return;
  const posterUrl=hv.dataset.poster||hv.getAttribute('poster');
  if(!posterUrl) return;
  window.__introRunning=true; document.body.classList.add('intro-on');

  const VS='attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}';
  const FS=`precision highp float;
uniform vec2 uRes; uniform sampler2D uTex; uniform float uVA;
uniform float uR, uM, uAmp, uSwirl, uPh, uRef, uLine, uVS, uFrag, uTurn, uGlint, uCorner, uSpin; uniform vec2 uBox;
const float PI=3.14159265;
mat2 rot(float a){ float c=cos(a), s=sin(a); return mat2(c,-s,s,c); }
float hash(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }
float flower(vec2 p,float R,float amp,float ph,float k){
  float a=atan(p.y,p.x);
  float r=R*(1.+amp*(.2*sin(5.*a+ph)+.11*sin(3.*a-ph*1.3+k)+.06*sin(8.*a+ph*.7)));
  return length(p)-r;
}
float sdBox(vec2 p,vec2 b,float r){ vec2 q=abs(p)-b+r; return length(max(q,0.))+min(max(q.x,q.y),0.)-r; }
/* layer k of the shape: k=0 is the outer edge, higher k are the thinner folds drifting inside it */
float layer(vec2 p,float k){
  float sc=1.-.15*k;
  vec2 q=rot(uSpin*(.8+.45*k)*(mod(k,2.)<1.?1.:-1.)+k*.9)*p;
  float dF=flower(q,uR*sc,uAmp*(1.+.12*k),uPh*(1.+.22*k)+k*1.7,uPh*.6+k);
  vec2 bx=uBox*(1.-.07*k)-.02*k;
  float dB=sdBox(p,bx,uCorner*min(bx.x,bx.y));
  return mix(dF,dB,uM);
}
void main(){
  float m=min(uRes.x,uRes.y);
  vec2 p=(gl_FragCoord.xy*2.-uRes)/m;
  vec2 ps=vec2(p.x/mix(.64,1.,uTurn),p.y);               /* the glass is still turned away: seen from the side it is narrower */
  float d=layer(ps,0.);
  float e=.004;
  vec2 g=vec2(layer(ps+vec2(e,0.),0.)-layer(ps-vec2(e,0.),0.), layer(ps+vec2(0.,e),0.)-layer(ps-vec2(0.,e),0.));
  vec2 n=g/(length(g)+1e-5);
  float edge=exp(min(d,0.)*(7./max(.35,uR*3.)));
  float rad=length(p), ang=atan(p.y,p.x);
  /* a polar swirl in the middle, as light folds through the thickest part of the glass */
  float seg=2.*PI/7., a2=abs(mod(ang+uPh*.25,seg)-seg*.5);
  float k=uSwirl*smoothstep(uR*.95,.05,rad);
  vec2 pk=vec2(cos(a2),sin(a2))*rad*(1.-.42*k);
  vec2 pp=mix(p,pk,k*.85);
  /* thick glass: the picture is cut into bent facets while the shape is turned away; they join as it faces us */
  vec2 fr=rot(uPh*.3)*pp*5.5; vec2 id=floor(fr); vec2 fu=fract(fr)-.5;
  vec2 fo=(vec2(hash(id),hash(id+7.3))-.5)*.2+fu*.11;
  pp+=fo*uFrag*(.45+.55*smoothstep(0.,-.25,d));
  pp*=1.+.16*uFrag*dot(p,p);
  vec2 off=-n*edge*.09*uRef;
  float ca=uRes.x/uRes.y, sx=min(1.,ca/uVA), sy=min(1.,uVA/ca);
  vec3 col=vec3(0.);
  for(int c=0;c<3;c++){
    float f=1.+.45*float(c-1);
    vec2 s=(((pp+off*f)/uVS)*m+uRes)/(2.*uRes);
    vec2 uv=.5+(s-.5)*vec2(sx,sy);
    float v=texture2D(uTex,uv)[c];
    if(c==0) col.r=v; else if(c==1) col.g=v; else col.b=v;
  }
  float depth=smoothstep(0.,.35,-d);
  col*=mix(1.,mix(.74,1.,depth),uRef);
  col+=vec3(.03,.022,.012)*edge*uRef;
  float inside=smoothstep(.006,-.006,d);
  vec3 outc=vec3(0.);
  float o=max(d,0.);
  outc+=vec3(.95,.72,.45)*(.05*exp(-o*7.)*(.55+.45*sin(o*46.-uPh*3.)))*uLine;
  outc+=vec3(1.,.85,.6)*.1*exp(-o*38.)*uLine;
  col=mix(outc,col,inside);
  /* the edge and the folds: thin lines of light, with a bright spot that slides along them */
  float slide=pow(.5+.5*cos(atan(ps.y,ps.x)-uPh*1.7),5.);
  float line=smoothstep(.0055,0.,abs(d))*(.5+1.1*slide);
  for(int i=1;i<4;i++){
    float di=layer(ps,float(i));
    float sl=pow(.5+.5*cos(atan(ps.y,ps.x)-uPh*(1.3+.3*float(i))+float(i)*2.1),4.);
    line+=smoothstep(.0042,0.,abs(di))*(.55+.9*sl)*(.85-.12*float(i))*smoothstep(.02,-.04,d);
  }
  col+=vec3(1.,.9,.7)*line*uLine;
  /* the first glint: a tiny reflection with a cross of light */
  float streak=exp(-abs(p.x)*70.)*exp(-abs(p.y)*7.)+exp(-abs(p.y)*70.)*exp(-abs(p.x)*7.);
  col+=vec3(1.,.93,.78)*(exp(-rad*34.)*1.1+streak*.55)*uGlint;
  /* a little festive sparkle inside the glass */
  vec2 sq=(rot(uPh*.2)*p)*34.; vec2 sg=floor(sq); float sh=hash(sg); float dot_=smoothstep(.5,.05,length(fract(sq)-.5)*2.);
  float tw=pow(max(0.,sin(uPh*5.+sh*40.)),14.);
  col+=vec3(1.,.95,.85)*step(.985,sh)*tw*dot_*.6*inside*uLine;
  gl_FragColor=vec4(col,1.);
}`;
  function sh(t,s){ const o=gl.createShader(t); gl.shaderSource(o,s); gl.compileShader(o); if(!gl.getShaderParameter(o,gl.COMPILE_STATUS)){ console.warn(gl.getShaderInfoLog(o)); return null; } return o; }
  const vs=sh(gl.VERTEX_SHADER,VS), fs=sh(gl.FRAGMENT_SHADER,FS);
  if(!vs||!fs){ done(); return; }
  const pr=gl.createProgram(); gl.attachShader(pr,vs); gl.attachShader(pr,fs); gl.linkProgram(pr);
  if(!gl.getProgramParameter(pr,gl.LINK_STATUS)){ done(); return; }
  gl.useProgram(pr);
  const buf=gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER,buf); gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);
  const loc=gl.getAttribLocation(pr,'a'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);
  const U={}; ['uRes','uTex','uVA','uR','uM','uAmp','uSwirl','uPh','uRef','uLine','uBox','uVS','uFrag','uTurn','uGlint','uCorner','uSpin'].forEach(n=>{ U[n]=gl.getUniformLocation(pr,n); });
  const tex=gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D,tex);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,true);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
  gl.uniform1i(U.uTex,0);

  function size(){
    const dpr=Math.min(window.devicePixelRatio||1, innerWidth<700?1.25:1.5);
    cv.width=Math.round(innerWidth*dpr); cv.height=Math.round(innerHeight*dpr); gl.viewport(0,0,cv.width,cv.height);
  }
  size(); window.addEventListener('resize',size);

  /* ---- the first film waits quietly on its poster frame, so playback can carry on from exactly that picture ---- */
  if(!hv.getAttribute('src')) hv.src=hv.dataset.src;
  hv.preload='auto'; hv.muted=true;
  hv.addEventListener('loadedmetadata',()=>{ try{ hv.currentTime=POSTER_T; }catch(e){} },{once:true});
  window.__heroStartAt=POSTER_T;

  /* ---- the picture: the poster frame, exactly what the hero shows before its film plays ---- */
  const img=new Image(); let vAspect=16/9, ready=false;
  img.onload=()=>{ vAspect=img.naturalWidth/img.naturalHeight; ready=true; };
  img.onerror=()=>{ done(); };
  img.src=posterUrl;
  const wait0=performance.now();
  let t0=0;

  const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
  const sm=(a,b,x)=>{ const t=clamp((x-a)/(b-a),0,1); return t*t*(3-2*t); };
  const outCubic=(x)=>1-Math.pow(1-clamp(x,0,1),3);
  const inOut=(x)=>{ x=clamp(x,0,1); return x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2; };

  const T_END=2.65, T_FADE=2.3, FREEZE=parseFloat(new URLSearchParams(location.search).get('introT'));
  function frame(now){
    if(finished) return;
    if(!t0){
      if(ready){
        gl.bindTexture(gl.TEXTURE_2D,tex);
        try{ gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,img); }catch(e){ done(); return; }
        t0=now;
      }
      else if(now-wait0>3500){ done(); return; }          /* picture too slow to load: skip the show */
      else { requestAnimationFrame(frame); return; }
    }
    const t=isFinite(FREEZE)?FREEZE:(now-t0)/1000;           /* ?introT=1.2 freezes the show at that second (for checking) */
    const ar=innerWidth/innerHeight;
    /* timeline (seconds): 0-.3 the glint, .25-1.4 the glass unfolds and turns, 1.2-2.3 it widens into the frame, 2.3-2.65 hand-over */
    const bloom=outCubic((t-.25)/1.15);
    const R=.01+bloom*.46;
    const morph=sm(1.1,1.8,t);
    const swell=inOut((t-1.25)/1.05);
    const b0=[R*1.3,R*.94], b1=[ar,1.];
    const bx=[b0[0]+(b1[0]-b0[0])*swell, b0[1]+(b1[1]-b0[1])*swell];
    gl.uniform2f(U.uRes,cv.width,cv.height);
    gl.uniform1f(U.uVA,vAspect);
    gl.uniform1f(U.uR,R+swell*1.6);
    gl.uniform1f(U.uM,morph);
    gl.uniform1f(U.uAmp,1.-.4*sm(.9,1.6,t));
    gl.uniform1f(U.uSwirl,.7*(1.-sm(.3,1.2,t)));
    gl.uniform1f(U.uPh,t*1.9);
    gl.uniform1f(U.uSpin,t*.16);
    gl.uniform1f(U.uRef,(1.-.3*sm(.8,1.5,t))*(1.-sm(1.65,2.25,t)));
    gl.uniform1f(U.uLine,sm(.12,.55,t)*(1.-sm(1.85,2.3,t)));
    gl.uniform1f(U.uFrag,1.-sm(.35,1.5,t));
    gl.uniform1f(U.uTurn,sm(.25,1.5,t));
    gl.uniform1f(U.uGlint,sm(0.,.25,t)*(1.-.85*sm(.45,1.3,t)));
    gl.uniform1f(U.uCorner,.18*(1.-swell));
    gl.uniform2f(U.uBox,bx[0],bx[1]);
    gl.uniform1f(U.uVS,.46+.1*bloom+.44*swell);               /* the picture is small inside the glass and grows to the frame with it */
    gl.drawArrays(gl.TRIANGLE_STRIP,0,4);
    cv.style.opacity=t<T_FADE?'1':String(1-clamp((t-T_FADE)/(T_END-T_FADE),0,1));
    if(t>=T_END-.3 && document.body.classList.contains('intro-on')) document.body.classList.remove('intro-on');   /* the navigation and captions fade in */
    if(t>=T_END){ done(); return; }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
