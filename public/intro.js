/* Opening animation (about 2.4 s), from the NOT REAL WebGL prototype: a small reflection unfolds into an irregular glass ring, light slides along its
   edges while the first hero picture shows through it, bent; the shape then flattens into the real frame of that picture and the canvas disappears.
   The shaders and playRefractionIntro() are the prototype's, with the page glue around them:
   - the picture is the hero's own <img class="hs-poster"> (the poster frame of the first film); the end frame is its exact rectangle
   - the first film is parked on that poster frame in the background and starts to play from it once the animation is over
   - it plays on the first visit to the page (not when moving between pages of the site); no picture in time, no WebGL, reduced motion: the hero shows at once */

const POSTER_T=1.5;                                          /* the poster frames were cut at 1.5 s of each film */

async function playRefractionIntro({ poster, duration = 2400, onProgress } = {}) {
  if (!(poster instanceof HTMLImageElement)) return 'no-poster';
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return 'reduced-motion';
  if (document.visibilityState === 'hidden') return 'hidden';
  if (!poster.complete || !poster.naturalWidth) {
    let timer;
    try {
      await Promise.race([
        poster.decode(),
        new Promise((_, reject) => {
          timer = setTimeout(() => reject(new Error('Poster timeout')), 650);
        })
      ]);
    } catch {
      return 'poster-unavailable';
    } finally {
      clearTimeout(timer);
    }
  }
  if (!poster.naturalWidth) return 'poster-unavailable';

  const canvas = document.createElement('canvas');
  canvas.className = 'refraction-overlay';
  canvas.setAttribute('aria-hidden', 'true');
  const gl = canvas.getContext('webgl', {
    alpha: true, premultipliedAlpha: false, antialias: false,
    depth: false, stencil: false, preserveDrawingBuffer: false
  });
  if (!gl) return 'webgl-unavailable';

  const resources = [];
  function keep(item, remove) {
    if (!item) throw new Error('WebGL resource allocation failed');
    resources.push(() => remove.call(gl, item));
    return item;
  }
  function clean() {
    canvas.remove();
    for (const dispose of resources.reverse()) dispose();
    gl.getExtension('WEBGL_lose_context')?.loseContext();
  }
  function shader(type, source) {
    const object = keep(gl.createShader(type), gl.deleteShader);
    gl.shaderSource(object, source);
    gl.compileShader(object);
    if (!gl.getShaderParameter(object, gl.COMPILE_STATUS)) {
      throw new Error(gl.getShaderInfoLog(object));
    }
    return object;
  }

  try {
    const program = keep(gl.createProgram(), gl.deleteProgram);
    gl.attachShader(program, shader(gl.VERTEX_SHADER, REFRACTION_VERTEX));
    gl.attachShader(program, shader(gl.FRAGMENT_SHADER, REFRACTION_FRAGMENT));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program));
    gl.useProgram(program);

    const position = gl.getAttribLocation(program, 'aPosition');
    gl.bindBuffer(gl.ARRAY_BUFFER, keep(gl.createBuffer(), gl.deleteBuffer));
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const texture = keep(gl.createTexture(), gl.deleteTexture);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, poster);
    if (gl.getError() !== gl.NO_ERROR) throw new Error('Poster texture upload failed');

    const uniforms = Object.fromEntries(
      ['uSize', 'uHero', 'uCrop', 'uImage', 'uProgress'].map(name => [name, gl.getUniformLocation(program, name)])
    );
    gl.uniform1i(uniforms.uImage, 0);

    const limit = gl.getParameter(gl.MAX_VIEWPORT_DIMS);
    const length = Number.isFinite(duration) ? Math.max(300, duration) : 2400;
    const FREEZE = parseFloat(new URLSearchParams(location.search).get('introP'));   /* ?introP=0.5 freezes the show at that point (0..1), for checking */
    return await new Promise(resolve => {
      let frame = 0;
      let done = false;
      let start;
      function finish(reason) {
        if (done) return;
        done = true;
        cancelAnimationFrame(frame);
        canvas.removeEventListener('webglcontextlost', onLost);
        document.removeEventListener('visibilitychange', onHidden);
        clean();
        resolve(reason);
      }
      function onLost() { finish('webgl-context-lost'); }
      function onHidden() {
        if (document.visibilityState === 'hidden') finish('hidden');
      }
      function tick(time) {
        if (done) return;
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        const rect = poster.getBoundingClientRect();
        if (!w || !h || !rect.width || !rect.height || rect.bottom <= 0 || rect.top >= h) {
          finish('hero-outside-viewport');
          return;
        }
        const scale = Math.min(devicePixelRatio || 1, 1.5, 1440 / w, 1080 / h, limit[0] / w, limit[1] / h);
        const width = Math.max(1, Math.round(w * scale));
        const height = Math.max(1, Math.round(h * scale));
        if (canvas.width !== width || canvas.height !== height) {
          canvas.width = width;
          canvas.height = height;
        }
        gl.viewport(0, 0, width, height);

        const sx = width / w;
        const sy = height / h;
        gl.uniform2f(uniforms.uSize, width, height);
        gl.uniform4f(uniforms.uHero, rect.left * sx, rect.top * sy, rect.width * sx, rect.height * sy);
        /* the hero picture is object-fit: cover, centred; for another object-position change the origin here */
        const ratio = (rect.width / rect.height) / (poster.naturalWidth / poster.naturalHeight);
        const cropW = Math.min(1, ratio);
        const cropH = Math.min(1, 1 / ratio);
        gl.uniform4f(uniforms.uCrop, (1 - cropW) / 2, (1 - cropH) / 2, cropW, cropH);

        start ??= time;
        const progress = isFinite(FREEZE) ? FREEZE : Math.min(1, (time - start) / length);
        gl.uniform1f(uniforms.uProgress, progress);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
        if (onProgress) onProgress(progress);
        if (isFinite(FREEZE)) return;
        if (progress < 1) frame = requestAnimationFrame(tick);
        else finish('finished');
      }
      canvas.addEventListener('webglcontextlost', onLost);
      document.addEventListener('visibilitychange', onHidden);
      document.body.append(canvas);
      tick(performance.now());
    });
  } catch (error) {
    clean();
    console.warn('NOT REAL intro fallback', error);
    return 'webgl-error';
  }
}

/* ------------------------- shaders (from the prototype, unchanged) ------------------------- */
var REFRACTION_VERTEX=`
attribute vec2 aPosition;
void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;
var REFRACTION_FRAGMENT=`
precision highp float;

uniform vec2 uSize;
uniform vec4 uHero;       // x, y, width, height in canvas pixels, top-left origin
uniform vec4 uCrop;       // image crop origin and size in normalized texture coordinates
uniform sampler2D uImage;
uniform float uProgress;

float band(float distance, float width) {
  float x = distance / width;
  return exp(-x * x);
}

vec3 poster(vec2 point) {
  return texture2D(uImage, uCrop.xy + clamp(point, 0.0, 1.0) * uCrop.zw).rgb;
}

void main() {
  float t = uProgress;
  vec2 screen = vec2(gl_FragCoord.x, uSize.y - gl_FragCoord.y);
  vec2 target = uHero.xy + 0.5 * uHero.zw;
  vec2 center = mix(uSize * vec2(0.5, 0.51), target, smoothstep(0.52, 0.86, t));
  vec2 point = screen - center;
  float distance = length(point);
  vec2 direction = distance > 0.001 ? point / distance : vec2(1.0, 0.0);
  float angle = atan(direction.y, direction.x);
  float rotation = mix(-1.05, 0.83, smoothstep(0.04, 0.77, t));
  float a = angle - rotation;

  float bloom = smoothstep(0.07, 0.53, t);
  float align = smoothstep(0.56, 0.91, t);
  float glass = 1.0 - align;
  float size = min(uSize.x, uSize.y);
  float twist = a + 0.48 * band(distance, size * 0.32);
  float lobes = 0.56 * cos(twist * 6.0) + 0.34 * sin(a * 3.0 - 0.55);
  float flower = size * (0.044 + 0.257 * bloom) * (1.0 + 0.25 * lobes);
  float rectangle = min(
    uHero.z * 0.5 / max(abs(direction.x), 0.0001),
    uHero.w * 0.5 / max(abs(direction.y), 0.0001)
  );
  float radius = mix(flower, rectangle, align);
  float k = min(2.0, distance / max(radius, 1.0));
  float edge = radius - distance;

  // Distorted sampling gives the glass its refraction. At align=1 the
  // coordinates equal the underlying CSS object-fit: cover poster exactly.
  float ripple = sin(6.0 * a + 3.1 * k + 0.8 * sin(3.0 * a));
  float rib = sin(9.0 * a - 8.0 * k + 0.45 * cos(3.0 * a));
  vec2 bend = direction * k * (0.31 + 0.28 * pow(k, 3.0));
  bend += vec2(ripple * 0.071, rib * 0.058) * k;
  vec2 uv = mix(vec2(0.5) + bend, (screen - uHero.xy) / uHero.zw, align);
  float split = 0.013 * glass * k * k * cos(3.0 * a);
  vec3 image = vec3(poster(uv + vec2(split, 0.0)).r,
                    poster(uv).g,
                    poster(uv - vec2(split, 0.0)).b);

  float glint = pow(max(0.0, cos(a + 0.94 + t * 2.8)), 9.0);
  float glint2 = pow(max(0.0, cos(a - 2.2 - t * 2.2)), 13.0);
  float light = 0.21 + 0.73 * glint + 0.55 * glint2;
  float rim = light * band(edge - 1.5, 1.5);
  float inner = light * 0.54 * band(edge - 5.0 - 4.0 * sin(5.0 * a), 2.3);
  float fold = light * 0.54 * band(k - (0.78 + 0.10 * cos(6.0 * a + 0.7)), 0.018);
  float seam = light * 0.41 * band(sin(3.0 * a + 3.0 * k), 0.059) * band(k - 0.68, 0.34);
  float shine = (rim + inner + fold + seam) * glass * smoothstep(0.07, 0.31, t);
  float shade = 0.22 + 0.56 * max(0.0, 1.0 - k * k) + 0.12 * ripple + 0.08 * rib;
  float illumination = mix(0.16, 0.95, smoothstep(0.16, 0.64, t));
  vec3 crystal = image * mix(clamp(shade * illumination, 0.06, 1.0), 1.0, align);
  crystal += shine * vec3(1.0, 0.93, 0.82);

  float halo = band(edge, 20.0) * bloom * glass;
  vec3 backdrop = vec3(0.036, 0.035, 0.046) + halo * vec3(0.08, 0.053, 0.035) * light;
  float backdropAlpha = 1.0 - smoothstep(0.79, 0.98, t);
  float inside = smoothstep(-1.1, 1.1, edge) * smoothstep(0.035, 0.21, t);
  float photoAlpha = inside * (1.0 - smoothstep(0.94, 1.0, t));
  float outAlpha = photoAlpha + backdropAlpha * (1.0 - photoAlpha);
  // Canvas requests straight alpha. Composite the two layers, then unpremultiply.
  vec3 rgb = (crystal * photoAlpha + backdrop * backdropAlpha * (1.0 - photoAlpha))
             / max(outAlpha, 0.0001);
  gl_FragColor = vec4(clamp(rgb, 0.0, 1.0), outAlpha);
}
`;

/* ------------------------- page glue ------------------------- */
(function(){
  const box=document.getElementById('loader');
  const poster=document.querySelector('.hs-poster');
  const hv=document.querySelector('.hs.is-active video, .hs video');
  let finished=false, shown=false, early=false;
  function hideLoader(fast){
    if(!box) return;
    if(fast){ box.style.display='none'; return; }
    box.classList.add('gone'); setTimeout(()=>{ box.style.display='none'; },700);
  }
  function done(reason){
    if(finished) return; finished=true;
    document.body.classList.remove('intro-on');
    hideLoader(shown);
    window.__introRunning=false;
    window.__introResult=reason;
    window.dispatchEvent(new Event('intro-done'));
  }
  window.__introRunning=false;

  /* once per visit: moving between the pages of the site (language switch, back from a gallery) goes straight to the hero */
  let seen=false;
  try{
    const same=document.referrer && new URL(document.referrer).origin===location.origin;
    const nav=(performance.getEntriesByType('navigation')[0]||{}).type;          /* a refresh (F5) always plays it again */
    seen=same && nav!=='reload' && sessionStorage.getItem('nr-intro')==='1' && !/[?&]intro=1/.test(location.search);
    sessionStorage.setItem('nr-intro','1');
  }catch(e){}

  if(!box||!poster||!hv||seen||matchMedia('(prefers-reduced-motion: reduce)').matches||document.visibilityState==='hidden'){ return; }
  window.__introRunning=true; document.body.classList.add('intro-on');

  /* the first film waits quietly on its poster frame, so playback carries on from exactly that picture */
  if(!hv.getAttribute('src')) hv.src=hv.dataset.src;
  hv.preload='auto'; hv.muted=true;
  hv.addEventListener('loadedmetadata',()=>{ try{ hv.currentTime=POSTER_T; }catch(e){} },{once:true});
  window.__heroStartAt=POSTER_T;

  /* the canvas covers the page from its first frame: take the plain loader cover away then (the canvas has its own dark backdrop) */
  new MutationObserver((m,o)=>{ if(document.querySelector('.refraction-overlay')){ o.disconnect(); shown=true; hideLoader(true); } }).observe(document.body,{childList:true});

  playRefractionIntro({
    poster,
    duration:2400,
    onProgress:(p)=>{
      if(p>0.82) document.body.classList.remove('intro-on');            /* the navigation and captions fade in at the end */
      /* the film starts a moment before the canvas goes (the canvas still covers it), so no start-up hitch is left for the hand-over */
      if(p>0.9 && !early){ early=true; if(hv.readyState>=3){ window.__heroStartAt=null; const pp=hv.play(); if(pp&&pp.catch) pp.catch(()=>{}); } }
    }
  }).then(done,()=>done('error'));
})();
