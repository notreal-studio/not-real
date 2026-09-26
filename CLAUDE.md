# CLAUDE.md — NOT REAL svetainė (notreal.lt)

Instrukcijos Claude Code sesijoms šiame repo. **Bendrauk su vartotoja lietuviškai.**

Projekto savininkė ir pagrindinė kūrėja — **Inga** (NOT REAL įkūrėja, foto → AI visual director, pati sukūrė brand book'ą). Iki 2026-09 projektą vystė jos vyras Arnoldas; dabar vystymą perima Inga savo kompiuteryje ir savo Claude Code paskyroje.

> ⚠️ **Repo yra VIEŠAS** (`github.com/notreal-studio/not-real`). Niekada nerašyk čia slaptažodžių, API raktų (išskyrus jau viešus kliento pusės raktus — žr. žemiau), asmens duomenų ar klientų sąrašų. Prisijungimai laikomi slaptažodžių tvarkyklėje, ne repo.

---

## Kas tai

Statinė dvikalbė (LT `/`, EN `/en/`) landing svetainė **„NOT REAL — An AI Visual Studio"**. Astro 4, be framework'ų (vanilla JS + GSAP iš CDN). Gyva: **https://notreal.lt**.

## Komandos

```bash
npm install        # pirmą kartą
npm run dev        # http://localhost:4321  (LT) ir /en/
npm run build      # → dist/ ; PRIEŠ KIEKVIENĄ push patikrink, kad praeina
npm run preview
```

Reikia Node.js 20+ (LTS). Deploy'us naudoja `withastro/action@v3`.

## Struktūra

| Failas | Kas jame |
|---|---|
| `src/i18n/ui.ts` | **VISI tekstai** LT + EN. Turinį keisti tik čia. |
| `src/components/Landing.astro` | Visa puslapio struktūra (vienas šablonas visoms kalboms), meniu, social dock, kontaktų forma |
| `src/layouts/Base.astro` | `<head>`: SEO, hreflang, JSON-LD, šriftai, GSAP, GA4, favicon'ai |
| `src/styles/global.css` | Visas dizainas; spalvų tokenai `:root` (tamsi tema — numatytoji) ir `[data-theme="light"]` |
| `public/main.js` | Naršyklės JS: loaderis, meniu, temos perjungiklis, forma (Web3Forms) |
| `public/` | Brand assets (favicon'ai, `logo.svg`, `og.jpg`, manifest), `CNAME`, `robots.txt` |
| `astro.config.mjs` | `site: "https://notreal.lt"`, `base: "/"` |
| `.github/workflows/deploy.yml` | Auto-deploy į GitHub Pages po push į `main` |
| `README.md` | **Būsena + TODO sąrašas** — sesijų perdavimo šaltinis |
| `NOT-REAL-PALEIDIMAS-IR-SEO.md` | SEO planas ir paleidimo žingsniai |
| `NOT-REAL-Brand-Book.pdf` | Brand book (spalvos, šriftai, tonas, taglines) |

Nauja kalba: žr. README skyrių „Pridėti naują kalbą".

## Brand sistema (Cellar & Silk)

- Spalvos: Bone Cream `#F2EDE4`, Espresso `#2B1D14`, Vintage Bordeaux `#5C1F2A`, Cognac `#8B5A3C`, Mushroom `#A8997F`; tamsios temos fonas `#100A04`. Taisyklė 60-30-10.
- Šriftai: **Instrument Serif** (display) + **Inter** (body), Google Fonts.
- Taglines: „Not real. Sells real." / „Crafted, not captured." / „The end of expensive shoots."
- CSS tokenų pavadinimai istoriniai: `--cream` = pagrindinis tekstas, `--pink` = akcentas (jų reikšmės keičiasi pagal temą). Neperkrikštyk be reikalo.

## Deploy

`git push` į `main` → GitHub Actions pastato ir paskelbia per ~1 min. Rezultatą tikrink repo **Actions** skiltyje. Jokio rankinio deploy'aus nėra.

---

## Taisyklės (privaloma)

1. **Brand assets neliečiami.** Failai `public/` (favicon'ai, logo, `og.jpg`, manifest ikonos) yra Ingos rankų darbas. Prieš ką nors darant su assetu — atidaryk ir pažiūrėk failą. Niekada neperrašyk, nekeisk dydžio ir negeneruok pakaitalo be aiškaus leidimo; taisyk tik kodo nuorodas (`Base.astro`, `site.webmanifest`). Jei assetas trūksta — pasakyk, ko tiksliai trūksta, ir paklausk.
2. **README „Būsena" / „TODO" atnaujinama** kiekvienos prasmingos sesijos pabaigoje — tai perdavimo tarp sesijų šaltinis, ne Claude atmintis.
3. **`@astrojs/sitemap` lieka 3.2.1** (suderinta su Astro 4). Nekelk, nebent kartu keli Astro į 5.
4. **Didelių pakeitimų (pozicionavimas, kalbų strategija, viso teksto perrašymas) nepradėk be patvirtinimo** dėl apimties.
5. Commit'ai — maži, aprašantys ką ir kodėl (angliškai, kaip iki šiol). Prieš push — `npm run build`.

---

## Prieigos ir paskyros (kur kas yra)

Slaptažodžių čia nėra ir nebus. Jei kažkam trūksta prieigos — paprašyk Ingos, ji paprašys Arnoldo.

| Paslauga | Kam naudojama | Kaip prieinama |
|---|---|---|
| **GitHub** org `notreal-studio`, repo `not-real` | Kodas + hosting (Pages) | Ingos GitHub paskyra pridedama kaip org **Owner**. Kompiuteryje: `git clone https://github.com/notreal-studio/not-real.git`; autentifikacija per Git Credential Manager (atsidaro naršyklė) arba `gh auth login`. |
| **GitHub Pages** | Hostingas, HTTPS | Repo → Settings → Pages. Source: GitHub Actions, custom domain `notreal.lt`, Enforce HTTPS ✓ |
| **Domenas `notreal.lt`** | Registratorius **Interneto vizija** | DNS: A → `185.199.108.153` / `.109` / `.110` / `.111`, `www` → CNAME į GitHub Pages. Prisijungimas — Arnoldo/Ingos IV paskyra. DNS be reikalo nekeisti. |
| **Web3Forms** | Kontaktų formos laiškai | `access_key` yra `Landing.astro` — jis **viešas iš prigimties** (matomas HTML), tai normalu. Laiškai eina į Web3Forms paskyros el. paštą. Keisti gavėją — web3forms.com paskyroje. |
| **Google Analytics 4** | Lankomumas | Property „not-real", ID `G-6TMLTSEL2S` (`Base.astro`). Ingos Google paskyra pridedama per GA Admin → Property access management. |
| **Google Search Console** | Indeksavimas | Dar nesukurta (žr. README TODO). |
| **Instagram** | `instagram.com/notreal.inga` | Ingos paskyra. |
| **El. paštas** | — | Dar nėra. Visur placeholder `labas@not-real.ai` (žr. README TODO). |

**Ne repo (privatūs verslo failai)** — Arnoldo kompiuteryje `not-real-project-plan/` (`klientu-analize.pdf`, `potencialus_klientai*.xlsx`) ir OneDrive aplankas. Jų į šį viešą repo **nekelti** — dalinamasi per OneDrive/Google Drive.

---

## Dabartinė būsena

Žr. `README.md` → „Būsena" ir „TODO". Trumpai (2026-09): Cellar & Silk paletė, šriftai, šviesi/tamsi tema, naujas overlay meniu ir social dock — padaryta. Tekstai `ui.ts` dar seno pozicionavimo (LT grožio/mados/wellness studija) — laukia perrašymo pagal brand book'ą.
