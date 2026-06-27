// ====================================================================
// VERTIMAI / TRANSLATIONS
// Norėdamas pridėti naują kalbą (pvz. sv, de, da):
//   1) nukopijuok visą `en: { ... }` bloką,
//   2) pakeisk raktą (pvz. `sv:`) ir išversk reikšmes,
//   3) įrašyk kalbą į `languages` masyvą žemiau,
//   4) sukurk puslapį src/pages/<kalba>/index.astro (žr. README).
// ====================================================================

export const languages = ["lt", "en"] as const;
export type Lang = (typeof languages)[number];
export const defaultLang: Lang = "lt";

// Pavadinimas, rodomas kalbų perjungiklyje
export const langName: Record<string, string> = { lt: "LT", en: "EN" };

export const ui: Record<string, Record<string, string>> = {
  // ---------------- LIETUVIŲ (numatytoji) ----------------
  lt: {
    "meta.title": "Not Real — AI prekės ženklų studija",
    "meta.desc": "AI prekės ženklai, turinys ir reklama grožio, mados ir wellness verslams. Turinys netikras, rezultatai tikri.",

    "loader.loading": "Kraunama",

    "nav.menu": "Meniu",
    "menu.close": "Uždaryti",
    "menu.home": "PRADŽIA",      "menu.home_l": "Namai",
    "menu.services": "PASLAUGOS", "menu.services_l": "Ką darom",
    "menu.work": "DARBAI",        "menu.work_l": "Projektai",
    "menu.showreel_l": "Showreel",
    "menu.about": "APIE",         "menu.about_l": "Kas mes",
    "menu.contact": "KONTAKTAI",  "menu.contact_l": "Susisiek",
    "menu.email": "( El. paštas )",
    "menu.instagram": "( Instagram )",

    "hero.play": "Žiūrėk showreel",
    "hero.ph_note": "[ čia tavo showreel video ]",
    "hero.eyebrow": "AI prekės ženklų studija",
    "hero.h1": "Niekas čia<br>nėra <em>tikra.</em>",
    "hero.sub": "AI prekės ženklai, turinys ir reklama grožio, mados ir wellness verslams. Be brangaus produkcijos cirko.",

    "mq.1": "Not Real", "mq.2": "AI turinys", "mq.3": "Reels",
    "mq.4": "Prekės ženklai", "mq.5": "Reklama", "mq.6": "AI video",

    "giant.label": "Mūsų sritys",
    "giant.beauty": "GROŽIUI", "giant.fashion": "MADAI", "giant.wellness": "IR WELLNESS",
    "giant.beauty_a": "Grožis", "giant.fashion_a": "Mada", "giant.wellness_a": "Wellness",
    "giant.cue_l": "← Spausk", "giant.cue_r": "Spausk →",
    "giant.state": "Pasaulyje, kur visi bando daryti <em>viską</em>, mes pasirinkom vieną — grožį, madą ir wellness. Ir padarom juos <em>neignoruojamus.</em>",

    "work.kicker": "Darbai",
    "work.statement": "Prekės ženklai, kurių <em>nėra.</em><br>Bet galėjo būti.",
    "work.lead": "Kiekvienas — pilnas pasaulis, sukurtas su AI nuo nulio. Tavo realūs darbai ir video atsiras čia.",
    "work.1_ph": "GELO", "work.1_t": "GELO", "work.1_d": "Ledų prekės ženklas",
    "work.2_ph": "Etiketė", "work.2_t": "Mados etiketė", "work.2_d": "Prekės ženklas + reels",
    "work.3_ph": "Grožis", "work.3_t": "Grožio brendas", "work.3_d": "Kampanija + reklama",
    "work.4_ph": "Wellness", "work.4_t": "Wellness studija", "work.4_d": "Turinys + identitetas",

    "cta.h2": "Mes ne tiesiog kuriam turinį. Mes padarom prekės ženklus, kurių <em>neįmanoma ignoruoti.</em>",
    "cta.btn": "Nebūk drovus — parašyk →",

    "contact.kicker": "Kontaktai",
    "contact.h2": "Gauk nemokamą <em>demo.</em>",
    "contact.lead": "Parašyk, koks verslas — atsiųsiu pavyzdinį turinį, padarytą tau. Be įsipareigojimo.",
    "contact.instagram": "@notreal — Instagram",
    "form.name_label": "Vardas", "form.name_ph": "Tavo vardas",
    "form.email_label": "El. paštas", "form.email_ph": "vardas@verslas.lt",
    "form.msg_label": "Verslas ir ko reikia", "form.msg_ph": "Pvz.: grožio klinika Kaune, norim daugiau reels ir reklamos.",
    "form.submit": "Siųsti prašymą",
    "form.subject": "Naujas demo prašymas — Not Real",
    "form.from": "Not Real svetainė",

    "footer.tag": "Turinys netikras, rezultatai tikri. © 2026",

    "js.reel": "Čia atsidarys tavo showreel. Įkelk video į assets/ ir prijunk <video> hero sekcijoj.",
    "js.sending": "Siunčiama…",
    "js.ok": "Gauta. Susisieksiu su demo greitai.",
    "js.err": "Nepavyko. Parašyk tiesiai: labas@not-real.ai",
    "js.neterr": "Ryšio klaida. Parašyk tiesiai: labas@not-real.ai",
  },

  // ---------------- ENGLISH ----------------
  en: {
    "meta.title": "Not Real — AI brand studio",
    "meta.desc": "AI brands, content and ads for beauty, fashion and wellness businesses. Fake content, real results.",

    "loader.loading": "Loading",

    "nav.menu": "Menu",
    "menu.close": "Close",
    "menu.home": "HOME",       "menu.home_l": "Home",
    "menu.services": "SERVICES", "menu.services_l": "What we do",
    "menu.work": "WORK",         "menu.work_l": "Projects",
    "menu.showreel_l": "Showreel",
    "menu.about": "ABOUT",       "menu.about_l": "Who we are",
    "menu.contact": "CONTACT",   "menu.contact_l": "Get in touch",
    "menu.email": "( Email )",
    "menu.instagram": "( Instagram )",

    "hero.play": "Watch showreel",
    "hero.ph_note": "[ your showreel video here ]",
    "hero.eyebrow": "AI brand studio",
    "hero.h1": "Nothing here<br>is <em>real.</em>",
    "hero.sub": "AI brands, content and ads for beauty, fashion and wellness businesses. Without the expensive production circus.",

    "mq.1": "Not Real", "mq.2": "AI content", "mq.3": "Reels",
    "mq.4": "Brands", "mq.5": "Ads", "mq.6": "AI video",

    "giant.label": "Our fields",
    "giant.beauty": "FOR BEAUTY", "giant.fashion": "FOR FASHION", "giant.wellness": "AND WELLNESS",
    "giant.beauty_a": "Beauty", "giant.fashion_a": "Fashion", "giant.wellness_a": "Wellness",
    "giant.cue_l": "← Tap", "giant.cue_r": "Tap →",
    "giant.state": "In a world where everyone tries to do <em>everything</em>, we picked one — beauty, fashion and wellness. And we make them <em>impossible to ignore.</em>",

    "work.kicker": "Work",
    "work.statement": "Brands that <em>don't exist.</em><br>But could have.",
    "work.lead": "Each one — a whole world, built with AI from scratch. Your real work and videos will live here.",
    "work.1_ph": "GELO", "work.1_t": "GELO", "work.1_d": "Ice cream brand",
    "work.2_ph": "Label", "work.2_t": "Fashion label", "work.2_d": "Brand + reels",
    "work.3_ph": "Beauty", "work.3_t": "Beauty brand", "work.3_d": "Campaign + ads",
    "work.4_ph": "Wellness", "work.4_t": "Wellness studio", "work.4_d": "Content + identity",

    "cta.h2": "We don't just make content. We build brands that are <em>impossible to ignore.</em>",
    "cta.btn": "Don't be shy — say hi →",

    "contact.kicker": "Contact",
    "contact.h2": "Get a free <em>demo.</em>",
    "contact.lead": "Tell us about your business — we'll send sample content made for you. No commitment.",
    "contact.instagram": "@notreal — Instagram",
    "form.name_label": "Name", "form.name_ph": "Your name",
    "form.email_label": "Email", "form.email_ph": "name@business.com",
    "form.msg_label": "Your business & what you need", "form.msg_ph": "e.g. a beauty clinic in Kaunas, we want more reels and ads.",
    "form.submit": "Send request",
    "form.subject": "New demo request — Not Real",
    "form.from": "Not Real website",

    "footer.tag": "Fake content, real results. © 2026",

    "js.reel": "Your showreel will open here. Add a video to assets/ and connect <video> in the hero section.",
    "js.sending": "Sending…",
    "js.ok": "Got it — I'll get back to you with a demo soon.",
    "js.err": "Something went wrong. Email directly: labas@not-real.ai",
    "js.neterr": "Connection error. Email directly: labas@not-real.ai",
  },
};
