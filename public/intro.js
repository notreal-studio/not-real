/* Opening sequence. A black screen; a small glassy, flower-shaped blob appears in the middle, its thin outlines drifting, and the hero film is
   seen through it. The blob grows, its petals settle into a soft rectangle, the rectangle swells past the edges of the screen and becomes the
   hero itself. The film is the real first hero video, playing the whole time, so the hand-over is seamless.
   One WebGL fragment shader does all of it (shape, outlines, glass refraction, colour fringes, a polar swirl in the middle). */
(function(){
  const cv=document.getElementById('intro-cv'), box=document.getElementById('loader');
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hv=document.querySelector('.hs.is-active video, .hs video');
  let finished=false;
  function done(){
    if(finished) return; finished=true;
    document.body.classList.remove('intro-on');
    if(box){ box.classList.add('gone'); setTimeout(()=>{ box.style.display='none'; },700); }
    window.__introRunning=false;
    window.dispatchEvent(new Event('intro-done'));
  }
  window.__introDone=done;
  if(!cv||!box||!hv||reduced){ window.__introRunning=false; return; }
  const gl=cv.getContext('webgl',{antialias:false,alpha:false,powerPreference:'high-performance'});
  if(!gl){ window.__introRunning=false; return; }
  window.__introRunning=true; document.body.classList.add('intro-on');

  const VS='attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}';
  const FS=`precision highp float;
uniform vec2 uRes; uniform sampler2D uTex; uniform float uVA;
uniform float uR, uM, uAmp, uSwirl, uPh, uRef, uLine, uVS; uniform vec2 uBox;
const float PI=3.14159265;
mat2 rot(float a){ float c=cos(a), s=sin(a); return mat2(c,-s,s,c); }
float flower(vec2 p,float R,float amp,float ph,float k){
  float a=atan(p.y,p.x);
  float r=R*(1.+amp*(.2*sin(5.*a+ph)+.11*sin(3.*a-ph*1.3+k)+.06*sin(8.*a+ph*.7)));
  return length(p)-r;
}
float sdBox(vec2 p,vec2 b,float r){ vec2 q=abs(p)-b+r; return length(max(q,0.))+min(max(q.x,q.y),0.)-r; }
/* layer k of the shape: k=0 is the outer edge, higher k are the thinner outlines drifting inside it */
float layer(vec2 p,float k){
  float sc=1.-.15*k;
  vec2 q=rot(uPh*(.12+.07*k)*(mod(k,2.)<1.?1.:-1.)+k*.9)*p;
  float dF=flower(q,uR*sc,uAmp*(1.+.12*k),uPh*(1.+.22*k)+k*1.7,uPh*.6+k);
  vec2 bx=uBox*(1.-.07*k)-.02*k;
  float dB=sdBox(p,bx,.18*min(bx.x,bx.y));
  return mix(dF,dB,uM);
}
void main(){
  float m=min(uRes.x,uRes.y);
  vec2 p=(gl_FragCoord.xy*2.-uRes)/m;
  float d=layer(p,0.);
  /* gradient of the shape: direction in which the glass bends the picture */
  float e=.004;
  vec2 g=vec2(layer(p+vec2(e,0.),0.)-layer(p-vec2(e,0.),0.), layer(p+vec2(0.,e),0.)-layer(p-vec2(0.,e),0.));
  vec2 n=g/(length(g)+1e-5);
  float edge=exp(min(d,0.)*(7./max(.35,uR*3.)));
  /* polar swirl in the middle (the pinched petal pattern), fading out as the blob grows */
  float rad=length(p), ang=atan(p.y,p.x);
  float seg=2.*PI/7., a2=abs(mod(ang+uPh*.25,seg)-seg*.5);
  float k=uSwirl*smoothstep(uR*.95,.05,rad);
  float r2=rad*(1.-.42*k);
  vec2 pk=vec2(cos(a2),sin(a2))*r2;
  vec2 pp=mix(p,pk,k*.85);
  vec2 off=-n*edge*.09*uRef;
  float ca=uRes.x/uRes.y, sx=min(1.,ca/uVA), sy=min(1.,uVA/ca);
  vec3 col;
  for(int c=0;c<3;c++){
    float f=1.+.45*float(c-1);
    vec2 s=(((pp+off*f)/uVS)*m+uRes)/(2.*uRes);
    vec2 uv=.5+(s-.5)*vec2(sx,sy);
    float v=texture2D(uTex,uv)[c];
    if(c==0) col.r=v; else if(c==1) col.g=v; else col.b=v;
  }
  /* glass: darker towards the rim, warmer tint inside the small blob */
  float depth=smoothstep(0.,.35,-d);
  col*=mix(.74,1.,depth);
  col+=vec3(.03,.022,.012)*edge*uRef;
  float inside=smoothstep(.006,-.006,d);
  vec3 outc=vec3(0.);
  /* faint halo rings outside the shape */
  float o=max(d,0.);
  outc+=vec3(.95,.72,.45)*(.05*exp(-o*7.)*(.55+.45*sin(o*46.-uPh*3.)));
  outc+=vec3(1.,.85,.6)*.1*exp(-o*38.)*uLine;
  col=mix(outc,col,inside);
  /* outlines: the edge itself plus three thinner contours inside it */
  float line=0.;
  line+=smoothstep(.0055,0.,abs(d))*.9;
  for(int i=1;i<4;i++){
    float di=layer(p,float(i));
    line+=smoothstep(.0042,0.,abs(di))*(.75-.12*float(i))*smoothstep(.02,-.04,d);
  }
  col+=vec3(1.,.9,.7)*line*uLine;
  gl_FragColor=vec4(col,1.);
}`;
  function sh(t,s){ const o=gl.createShader(t); gl.shaderSource(o,s); gl.compileShader(o); if(!gl.getShaderParameter(o,gl.COMPILE_STATUS)){ console.warn(gl.getShaderInfoLog(o)); return null; } return o; }
  const vs=sh(gl.VERTEX_SHADER,VS), fs=sh(gl.FRAGMENT_SHADER,FS);
  if(!vs||!fs){ window.__introRunning=false; return; }
  const pr=gl.createProgram(); gl.attachShader(pr,vs); gl.attachShader(pr,fs); gl.linkProgram(pr);
  if(!gl.getProgramParameter(pr,gl.LINK_STATUS)){ window.__introRunning=false; return; }
  gl.useProgram(pr);
  const buf=gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER,buf); gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);
  const loc=gl.getAttribLocation(pr,'a'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);
  const U={}; ['uRes','uTex','uVA','uR','uM','uAmp','uSwirl','uPh','uRef','uLine','uBox','uVS'].forEach(n=>{ U[n]=gl.getUniformLocation(pr,n); });
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

  /* ---- start the first hero film (muted) and wait until it can show a frame ---- */
  if(!hv.getAttribute('src')) hv.src=hv.dataset.src;
  hv.muted=true; try{ hv.currentTime=0; }catch(e){}
  const pp=hv.play(); if(pp&&pp.catch) pp.catch(()=>{});
  const wait0=performance.now();
  let t0=0;

  const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
  const sm=(a,b,x)=>{ const t=clamp((x-a)/(b-a),0,1); return t*t*(3-2*t); };
  const outCubic=(x)=>1-Math.pow(1-clamp(x,0,1),3);
  const inOut=(x)=>{ x=clamp(x,0,1); return x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2; };

  const T_END=4.5, T_FADE=3.95, FREEZE=parseFloat(new URLSearchParams(location.search).get('introT'));
  function frame(now){
    if(finished) return;
    if(!t0){
      if(hv.readyState>=2 && hv.videoWidth){ t0=now; }
      else if(now-wait0>5000){ done(); return; }          /* film too slow to load: skip the show */
      else { requestAnimationFrame(frame); return; }
    }
    const t=isFinite(FREEZE)?FREEZE:(now-t0)/1000;                /* ?introT=2.1 freezes the show at that second (for checking) */
    if(hv.readyState>=2){ gl.bindTexture(gl.TEXTURE_2D,tex); try{ gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,hv); }catch(e){ done(); return; } }
    const ar=innerWidth/innerHeight;
    /* timeline (seconds): 0-.7 black, .7-2.1 the blob blooms, 2.1-3.7 petals settle into a rectangle that swells over the screen, then the hand-over */
    const grow=outCubic((t-.7)/1.5);                       /* 0 -> 1 */
    const R=.012+grow*.46;
    const morph=sm(2.0,3.0,t);
    const swell=inOut((t-2.15)/1.6);                       /* 0 -> 1, box grows past the screen */
    const bx0=[R*1.3,R*.94], bx1=[ar*1.25,1.25];
    const box=[bx0[0]+(bx1[0]-bx0[0])*swell, bx0[1]+(bx1[1]-bx0[1])*swell];
    const R2=R+swell*1.6;
    gl.uniform2f(U.uRes,cv.width,cv.height);
    gl.uniform1f(U.uVA,hv.videoWidth/hv.videoHeight||1.78);
    gl.uniform1f(U.uR,R2);
    gl.uniform1f(U.uM,morph);
    gl.uniform1f(U.uAmp,1.-.35*sm(1.4,2.4,t));
    gl.uniform1f(U.uSwirl,1.-sm(1.3,2.9,t));
    gl.uniform1f(U.uPh,t*1.35);
    gl.uniform1f(U.uRef,(1.-.3*sm(1.5,2.3,t))*(1.-sm(2.9,3.9,t)));
    gl.uniform1f(U.uLine,sm(.75,1.3,t)*(1.-sm(3.2,3.9,t)));
    gl.uniform2f(U.uBox,box[0],box[1]);
    gl.uniform1f(U.uVS,.46+.1*grow+.44*swell);                 /* the film is shown small inside the blob and grows to full screen with it */
    gl.drawArrays(gl.TRIANGLE_STRIP,0,4);
    cv.style.opacity=t<T_FADE?'1':String(1-clamp((t-T_FADE)/(T_END-T_FADE),0,1));
    if(t>=T_END-.35 && document.body.classList.contains('intro-on')) document.body.classList.remove('intro-on');
    if(t>=T_END){ done(); return; }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
