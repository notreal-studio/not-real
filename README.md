# Not Real — Astro i18n svetainė

Daugiakalbė statinė landing svetainė (Astro). Numatytoji kalba **LT** (šaknyje `/`), **EN** ties `/en/`. Pridėti naują šalį (SV, DE, DA…) — keli žingsniai žemiau.

---

> **Claude Code:** projekto instrukcijos, prieigos ir taisyklės — [`CLAUDE.md`](CLAUDE.md).

## Būsena (2026-09-26)

**Atlikta:**

- Svetainė gyva: **<https://notreal.lt>** — custom domenas pilnai sukonfigūruotas (DNS A įrašai, CNAME, GitHub Pages), HTTPS aktyvus ir priverstinis (`Enforce HTTPS`)
- `astro.config.mjs`: `site: "https://notreal.lt"`, `base: "/"`
- `git init`, commit, push į `https://github.com/notreal-studio/not-real.git` (branch `main`), GitHub Pages **Source: GitHub Actions**, deploy workflow sėkmingas
- Web3Forms raktas + Instagram nuoroda (`notreal.inga`) įrašyti `Landing.astro`
- **FAQ sekcija** (6 klausimai LT+EN, `<details>` akordeonas) + `FAQPage` JSON-LD schema
- **Darbų aprašymai** — 4 case study kortelės papildytos raktažodžiais praturtintu tekstu
- **Google Analytics 4** — property "not-real", Measurement ID `G-6TMLTSEL2S` įrašytas `Base.astro`
- **Naujas brand identity (Cellar & Silk)** — Inga (dizainerė) pristatė pilną brand book'ą (`NOT_REAL_Brand_Book_v1.pdf`, ne repo'je). Įdiegti realūs assets: `favicon.svg`, `favicon.ico`, `favicon-96x96.png`, `apple-touch-icon.png`, `web-app-manifest-192/512x512.png`, `logo.svg`, `logo-512.png`, naujas `og.jpg` — visi Bone Cream/Espresso/Bordeaux paletėje, Instrument Serif šriftu. Visi sujungti `Base.astro` `<head>` ir `site.webmanifest`.
- **Dizaino reskin (2026-06-30 – 07-15):** `global.css` perkeltas į Cellar & Silk paletę, šriftai → Instrument Serif + Inter, šviesi/tamsi tema (tamsi numatytoji, fonas `#100A04`), naujas overlay meniu (2 stulpeliai, subkategorijos, LT/EN), social dock (Instagram, LinkedIn, WhatsApp, kontaktai), pašalinta marquee juosta.
- **Perdavimas (2026-09-26):** projekto vystymą perima Inga; parašytas `CLAUDE.md` su struktūra, taisyklėmis ir prieigų žemėlapiu.
- **Prieigos patikra (2026-10-18):** Inga klonavo repo naujame kompiuteryje, `npm run build` praeina; push į `main` veikia (Inga – org narė su Write teise).
- **Privatumas ir slapukai (2026-10-18):** privatumo politika LT `/privatumas/` ir EN `/en/privacy/` (`src/components/Privacy.astro`, išdėstymas `src/layouts/Legal.astro`); slapukų sutikimo langas `public/consent.js` — GA4 (`G-6TMLTSEL2S`) įkeliamas tik gavus sutikimą (nebėra `Base.astro`); poraštėje nuorodos „Privatumo politika“ ir „Slapukų nustatymai“.
- **Redesign, 1 etapas (branch `redesign`, 2026-10-18; `main` neliestas):** Brand Book v3 pagrindas — šriftai DM Serif Display + Lato, nauji spalvų žetonai (Bordeaux/Bone/Espresso + Saffron/Sage/Cognac; `--pink` dabar = akcentas: saffron tamsioje, bordo šviesioje temoje), nauji logotipai/favicon/og (`public/`), ornamentų rinkinys `public/brand/` (dryžiai, taškai, lipdukai, polaroidai, teptuko linijos), URL pertvarka: **EN pagrindinė `/`, LT `/lt/`**, privatumas `/privacy/` ir `/lt/privatumas/`. Planas: `dokumentai/01-REDESIGN-PLANAS.md` (ne repo). Dar liko: `web-app-manifest-192/512` ikonos (senos), `logo.svg`/`logo-512.png` (senos, nenaudojamos), meniu NR logotipas dar tekstinis.
- **Kontaktai (2026-10-18):** laikinas kontaktinis el. paštas `inga.bankauske@gmail.com` (visur vietoje `labas@not-real.ai`); Web3Forms raktas pakeistas į Ingos paskyros (laiškai ateina į jos Gmail, ištestuota); realios Instagram, LinkedIn ir Telegram (`t.me/ingaBank`) nuorodos (WhatsApp pakeistas Telegram).

## TODO — kitos sesijos darbai

1. **DIDYSIS — tekstų perrašymas pagal brand book'ą.** Spalvos/šriftai jau padaryti; lieka turinys. Naujas pozicionavimas: **"NOT REAL — An AI Visual Studio"**, Ingos studija, taikoma į **"e-commerce and service brands"** tarptautiniu mastu, anglų k. editorial tonas. Reikės: (a) perrašyti `ui.ts` pagal manifestą/tone of voice/taglines, (b) apsispręsti, ar lieka LT+EN dvikalbystė, ar pereinama prie EN-pirmumo. **Nepradėti be patvirtinimo dėl apimties.**
2. **El. paštas** — laikinai naudojamas `inga.bankauske@gmail.com`. Vėliau užsakyti domeno paštą (pvz. Hostinger; DNS valdomas per `ns1–4.serveriai.lt`, ne tiesiogiai Interneto vizijoje; A ir `www` CNAME neliesti), pakeisti adresą `Landing.astro`, `Base.astro`, `ui.ts` ir Web3Forms gavėją. Brand book'e minimas `studio@notreal.xyz` — tik draft.
2a. **Smulkmenos rastos analizėje:** meniu „Blogas“ nuoroda tuščia (`href="#"`); `main.js` showreel `alert` placeholder; svetainėje nėra nė vieno `<img>`/video (hero ir galerija placeholder'iai). Privatumo politikoje (`Privacy.astro`) įrašyti laikini rekvizitai („NOT REAL, kūrėja Inga“) ir 12 mėn. saugojimo terminas — atnaujinti po individualios veiklos/UAB registracijos ir peržiūrėti su teisininku. Google Fonts ir GSAP kraunami iš trečiųjų šalių (nurodyta politikoje); ilgalaikis sprendimas — šriftus ir GSAP talpinti patiems.
3. **Google Search Console** — domenas jau galutinis, dabar gali registruoti `notreal.lt` be jokių kliūčių.
4. **Individuali veikla / UAB registracija** — planuojama prieš pirmus klientus (reikalinga sąskaitoms — LT mokesčių reikalavimas, ne Google).
5. **Google Business Profile** — kurti kartu su #4. Veiklos kategorija (pvz. "Marketing/Advertising agency") yra tik Maps kategorija, ne mokestinė; **PVM kodo Google neprašo**.
6. **GA4 Realtime** — patikrinti, ar duomenys renkasi nuo naujo domeno.

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
