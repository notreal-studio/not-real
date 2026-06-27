# Not Real — Astro i18n svetainė

Daugiakalbė statinė landing svetainė (Astro). Numatytoji kalba **LT** (šaknyje `/`), **EN** ties `/en/`. Pridėti naują šalį (SV, DE, DA…) — keli žingsniai žemiau.

---

## Būsena (2026-06-28)

**Atlikta:**

- `npm install` + `npm run build` patikrinti — praeina be klaidų
- `astro.config.mjs` ir `public/robots.txt` sukonfigūruoti GitHub Pages URL be domeno: `site: "https://notreal-studio.github.io"`, `base: "/not-real/"`
- Web3Forms raktas įrašytas (`Landing.astro`)
- Instagram nuoroda įrašyta visur: `https://instagram.com/notreal.inga`
- `git init`, commit, push į `https://github.com/notreal-studio/not-real.git` (branch `main`)
- **FAQ sekcija** (6 klausimai LT+EN, `<details>` akordeonas) + `FAQPage` JSON-LD schema
- **Darbų aprašymai** — 4 case study kortelės papildytos raktažodžiais praturtintu tekstu
- **og.jpg** — sugeneruotas brendinuotas vaizdas (1200×630) pagal esamus brand spalvas/šriftus
- **apple-touch-icon.png + icon-192/512.png + site.webmanifest** — sugeneruoti iš `favicon.svg`, prijungti `Base.astro` `<head>`
- **Google Analytics 4** — sukurta property "not-real", Measurement ID `G-6TMLTSEL2S` įrašytas `Base.astro`

**Kiti žingsniai (rankiniu būdu, GitHub svetainėje):**

1. **Settings → Pages → Build and deployment → Source: GitHub Actions** — be šito automatinis deploy neprasidės
2. Patikrinti **Actions** skiltyje, kad workflow „Deploy to GitHub Pages" baigėsi sėkmingai (žalia varnelė)
3. Atidaryti `https://notreal-studio.github.io/not-real/` ir `/en/`, patikrinti meniu, kalbos jungiklį, kontaktų formą (testinis pateikimas per Web3Forms)
4. GA4 → po deploy patikrinti **Realtime** ataskaitą, kad duomenys renkasi

**Atidėta / dar nenuspręsta:**

- **El. paštas** — placeholder `labas@not-real.ai` paliktas, kol bus pasirinktas pašto provideris (svarstomas `info@not-real.eu`)
- **Domenas** — kol kas naudojam GitHub Pages URL; svarstomi `.lt` / `.eu` / `.ai`, reikės pasirinkti vieną kaip canonical (kiti — redirect), tada atnaujinti `astro.config.mjs` (`base: "/"`), `robots.txt`, ir pridėti `public/CNAME` + DNS A įrašus
- SEO turinio plėtra (FAQ, case studies, raktažodžių puslapiai) ir Google Search Console / Google Business Profile setup — žr. **NOT-REAL-PALEIDIMAS-IR-SEO.md**

---

## Paleisti lokaliai
```bash
npm install        # tik pirmą kartą
npm run dev        # http://localhost:4321  (LT) ir /en/ (EN)
npm run build      # sugeneruoja dist/  (statiniai failai)
npm run preview    # peržiūrėti sugeneruotą dist/
```

---

## Struktūra (kas kur)
```
src/
  i18n/
    ui.ts            ← VISI tekstai (LT + EN). Čia redaguoji turinį/vertimus.
    utils.ts         ← t() pagalbininkas (neliesti)
  layouts/Base.astro ← <head>, šriftai, GSAP, hreflang, JS injekcija
  components/Landing.astro ← visa svetainės struktūra (vienas šablonas visom kalbom)
  pages/
    index.astro      ← LT puslapis  →  /
    en/index.astro   ← EN puslapis  →  /en/
  styles/global.css  ← visas dizainas (CSS)
public/
  main.js            ← naršyklės JS (loaderis, meniu, forma)
astro.config.mjs     ← domenas + base
.github/workflows/deploy.yml ← automatinis deploy į GitHub Pages
```
**Esmė:** dizainą keiti **vienoje vietoje** (`Landing.astro` / `global.css`), tekstus — `ui.ts`. Niekada nekopijuoji puslapių rankomis.

---

## Pridėti naują kalbą (pvz. švedų `sv`)
1. `src/i18n/ui.ts` → nukopijuok visą `en: { … }` bloką, pervadink į `sv: { … }`, išversk reikšmes.
2. Tame pačiame faile: `languages = ["lt", "en", "sv"]` ir `langName = { lt:"LT", en:"EN", sv:"SV" }`.
3. Sukurk failą `src/pages/sv/index.astro`:
   ```astro
   ---
   import Landing from "../../components/Landing.astro";
   ---
   <Landing lang="sv" />
   ```
4. `npm run build` — atsiras `/sv/`, `hreflang` ir kalbų perjungiklis prisideda automatiškai.

> Claude Code prompt: *„Pridėk kalbą <kalba> į šitą Astro i18n projektą: nukopijuok en bloką ui.ts, išversk, įrašyk į languages/langName, sukurk src/pages/<kalba>/index.astro pagal esamą pavyzdį, ir patikrink npm run build."*

---

## Ką pakeisti prieš paleidžiant (placeholder'iai)
- **Web3Forms raktas:** `Landing.astro` → `value="ĮRAŠYK-WEB3FORMS-RAKTĄ"` (gauk web3forms.com).
- **El. paštas / Instagram:** `Landing.astro` (`labas@not-real.ai`, `https://instagram.com/`).
- **Domenas:** `astro.config.mjs` → `site: "https://not-real.ai"` (naudojama hreflang/SEO).

---

## Deploy į GitHub Pages
1. Sukurk repo (pvz. `not-real`), sukelk visą projektą (be `node_modules/` ir `dist/`).
2. **Settings → Pages → Build and deployment → Source: GitHub Actions.**
3. `git push` į `main` — `.github/workflows/deploy.yml` automatiškai pastatys ir paleis. Po ~1 min svetainė gyva.

### Savas domenas (rekomenduojama)
- `astro.config.mjs`: `base: "/"` (jau taip).
- Sukurk failą `public/CNAME`, jame viena eilutė: `not-real.ai`.
- DNS: A įrašai į `185.199.108.153 / .109 / .110 / .111`; `www` → CNAME į `<vardas>.github.io`.

### BE domeno (projekto URL `username.github.io/not-real/`)
- `astro.config.mjs`: pakeisk `base: "/not-real/"` (kitaip nematys CSS/JS). Tada `npm run build`, push.

---

## Video įdėjimas (vėliau)
- Įkelk failus į `public/assets/`.
- **Hero:** `Landing.astro` → atkomentuok `<video>` bloką, ištrink `<div class="hero-ph">`.
- **Showreel / galerija:** `<span class="gph …"></span>` keisk į `<video autoplay muted loop playsinline><source src="/assets/x.mp4" type="video/mp4"></video>`.

---

Klausimai — mesk klaidą ar `npm run build` išvestį.

---

## SEO (jau įdiegta kode)
- `hreflang` + `x-default` tarp kalbų, `canonical` kiekvienam puslapiui
- `sitemap-index.xml` (auto) + `public/robots.txt`
- Open Graph + Twitter kortelės + firminis `public/og.jpg` (1200×630)
- JSON-LD `Organization` structured data, `favicon.svg`

> **Svarbu:** `@astrojs/sitemap` užfiksuotas ties **3.2.1** (suderinta su Astro 4.16).
> 3.7+ reikalauja Astro 5 — nekelk, nebent kartu keli Astro į 5.

Toliau SEO veiksmai (Google Search Console, Google Business Profile, turinys/FAQ,
nuorodos) — žr. atskirą failą **NOT-REAL-PALEIDIMAS-IR-SEO.md**.
