# Not Real — paleidimo + SEO instrukcija

Perdavimui į **Claude Code**. Kas padaryta, ko reikia, kaip paleisti, ir kaip kelti SEO.

---

## A. Kur dabar esam (padaryta ir patikrinta)
- **Astro i18n** projektas: **LT** (`/`) + **EN** (`/en/`). `npm run build` praeina, generuoja statinį HTML.
- **SEO pamatas jau įdiegtas kode:**
  - Atskiri URL kiekvienai kalbai + `hreflang` + `x-default`
  - `canonical` kiekvienam puslapiui
  - `sitemap-index.xml` (auto pagal `site`) + `robots.txt`
  - Open Graph + Twitter kortelės + firminis `og.jpg` (1200×630)
  - JSON-LD `Organization` structured data
  - `favicon.svg`, greitas statinis HTML, mobile-friendly, font-display swap

---

## B. Ko tau reikia (paskyros / turtas)
- GitHub paskyra + repo
- **Domenas** (pvz. not-real.ai) — vienintelė piniginė išlaida
- **Web3Forms** Access Key — web3forms.com
- Google paskyra: **Search Console** + **Google Business Profile**
- Vėliau: tikras `og.jpg` / logo / video

---

## C. Užbaigti ir paleisti
1. **Placeholder'iai:**
   - Web3Forms raktas → `src/components/Landing.astro` (`ĮRAŠYK-WEB3FORMS-RAKTĄ`)
   - El. paštas / Instagram → `Landing.astro` (`labas@not-real.ai`, `instagram.com/`)
   - Domenas → `astro.config.mjs` (`site`) **ir** `public/robots.txt` (`Sitemap:` eilutė)
2. `npm install` → `npm run dev` (peržiūra) → `npm run build`
3. GitHub repo: sukelk projektą (be `node_modules/` ir `dist/`)
4. **Settings → Pages → Source: GitHub Actions** → `git push` į `main` (workflow pats deploy'ina)
5. Domenas: `public/CNAME` (`not-real.ai`) + DNS (A → 185.199.108–111.153; `www` → CNAME) + Enforce HTTPS.
   (Jei be domeno → `astro.config.mjs`: `base: "/not-real/"`.)

---

## D. SEO — kas dar pakelia reitingą

### Jau kode (žr. A). Toliau — tavo veiksmai, prioritetų tvarka:

### 1) Indeksavimas (iškart po deploy)
- **Google Search Console:** pridėk domeną, patvirtink (DNS TXT arba HTML), pateik `sitemap-index.xml`. Stebėk indeksavimą ir klaidas.
- (nebūtina) Bing Webmaster Tools — tas pats.

### 2) Vietinis SEO — DIDŽIAUSIAS svertas vietiniam verslui
- **Google Business Profile** (Žemėlapiai): sukurk, pilnas NAP (pavadinimas / adresas / telefonas), kategorija, nuotraukos, aprašymas su raktažodžiais. „Šalia manęs" paieškose tai lemia daugiausiai.
- **Vienodas NAP** visur (svetainė, GBP, katalogai, Instagram).
- LT katalogai/registrai — nuorodos ir citatos.

### 3) Turinys (kad rastų ne tik pagal brando vardą)
- Dabartinis landing puikus brandui, bet **mažai teksto/raktažodžių** — Google reikia teksto.
- Pridėk skiltis/puslapius pagal tai, ko klientai ieško:
  - „Socialinių tinklų valdymas klinikoms Kaune", „AI turinys grožio klinikai", „Reels gamyba", „Meta reklama klinikai"…
  - **FAQ** sekcija (+ `FAQPage` JSON-LD) — gerai rankina, duoda rich results.
  - **Atvejų studijos** (GELO ir kt.) atskirais puslapiais su tekstu.
- Lokalizuok, ne tik versk: EN puslapis gali taikytis į tarptautinę auditoriją.

### 4) Techniniai priedai (gali padaryti Claude Code)
- `og.jpg` → firminis (dabar paprastas placeholder).
- Logo + `apple-touch-icon` + `site.webmanifest`.
- Realių nuotraukų/video `alt`, `loading="lazy"`, `width/height` (mažina CLS).
- `FAQPage` / `Service` / `BreadcrumbList` schema kai atsiras turinys.
- Analytics: privatumą gerbiantis (Plausible / Umami) arba GA4.

### 5) Off-site (ilgalaikis)
- Nuorodos: partnerės klinikos, katalogai, Instagram bio.
- Reguliarus turinys (tinklaraštis) = daugiau indeksuojamų puslapių + autoritetas.

> **Realybė:** vien landing rikiuosis tik pagal brando vardą. Rikiuotis pagal paslaugų raktažodžius reikia (2)+(3)+(5) — vietinio SEO, turinio ir nuorodų. Technika (A) būtina, bet ne pakankama.

---

## E. Claude Code — paruoštas startinis prompt'as
Atidaryk projekto aplanką Claude Code ir įklijuok:

```
Čia Astro i18n statinė landing svetainė „Not Real" (AI turinio agentūra, Kaunas).
Būsena: LT (/) + EN (/en/), npm run build praeina. SEO pamatas įdiegtas: hreflang,
canonical, sitemap (@astrojs/sitemap@3.2.1 — suderinta su Astro 4.16), robots.txt,
Open Graph + Twitter, JSON-LD Organization, favicon, og.jpg.
Tekstai: src/i18n/ui.ts. Dizainas: src/components/Landing.astro + src/styles/global.css.
JS: public/main.js.

Padėk man, po vieną žingsnį:
1) Įrašyti Web3Forms raktą; pakeisti el. paštą/Instagram/domeną (astro.config.mjs + public/robots.txt).
2) git init, sukurti PUBLIC GitHub repo, push į main, įjungti Pages (Source: GitHub Actions) ir duoti gyvą URL.
3) Prijungti domeną not-real.ai: public/CNAME + pasakyti tikslius DNS įrašus.
4) Po deploy: paruošti Google Search Console patvirtinimą ir pateikti sitemap.

SVARBU: @astrojs/sitemap laikyk ties 3.2.1 (3.7+ reikalauja Astro 5).
```

---

## F. Checklistas
- [ ] Web3Forms raktas + paštas/Instagram + domenas (config + robots.txt)
- [ ] `npm run build` praeina; `dist/` turi `/`, `/en/`, sitemap, robots, og.jpg
- [ ] Repo + Pages (GitHub Actions) + gyvas URL
- [ ] Domenas (CNAME + DNS + HTTPS)
- [ ] Google Search Console + sitemap pateiktas
- [ ] Google Business Profile sukurtas
- [ ] (toliau) turinys / FAQ / atvejų studijos, analytics, nuorodos
