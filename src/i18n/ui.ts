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
    "theme.toggle": "Perjungti šviesų / tamsų režimą",
    "menu.home": "PRADŽIA",
    "menu.services": "PASLAUGOS",
    "menu.portfolio": "PORTFOLIO",
    "menu.sub.art": "Menas",
    "menu.sub.products": "Produktai",
    "menu.sub.fashion": "Mada",
    "menu.sub.other": "Kita",
    "menu.about": "APIE",
    "menu.blog": "BLOGAS",
    "menu.faq": "KLAUSIMAI",
    "menu.contact": "KONTAKTAI",

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
    "work.1_desc": "GELO — pilnai AI sugalvotas ledų prekės ženklas: vizualinė tapatybė, pakuotės dizainas ir socialinių tinklų turinys, sukurti per kelias dienas, ne mėnesius. Pavyzdys, kaip AI turinys atstoja brangią fotosesiją maisto ir grožio prekės ženklams.",
    "work.2_ph": "Etiketė", "work.2_t": "Mados etiketė", "work.2_d": "Prekės ženklas + reels",
    "work.2_desc": "Mados etiketė su pilnu AI sugeneruotu look book'u ir reels serija — be modelių, be studijos nuomos. Rodo, kaip AI reklama mažam mados prekės ženklui sumažina produkcijos kaštus iki minimumo.",
    "work.3_ph": "Grožis", "work.3_t": "Grožio brendas", "work.3_d": "Kampanija + reklama",
    "work.3_desc": "Grožio brendo kampanija su AI sukurtais vaizdais ir Meta reklamos kūriniais, pritaikytais grožio klinikoms ir salonams Kaune. AI turinys grožio klinikai padidina matomumą be nuolatinio fotografo poreikio.",
    "work.4_ph": "Wellness", "work.4_t": "Wellness studija", "work.4_d": "Turinys + identitetas",
    "work.4_desc": "Wellness studijos prekės ženklo identitetas ir turinio strategija, sukurta AI — nuo logotipo iki socialinių tinklų kalendoriaus. Pavyzdys, kaip wellness verslas atrodo premium lygio be didelio biudžeto.",

    "cta.h2": "Mes ne tiesiog kuriam turinį. Mes padarom prekės ženklus, kurių <em>neįmanoma ignoruoti.</em>",
    "cta.btn": "Nebūk drovus — parašyk →",

    "faq.kicker": "Klausimai",
    "faq.h2": "Dažniausiai <em>užduodami</em> klausimai.",
    "faq.1_q": "Kas yra AI turinys ir AI prekės ženklas?",
    "faq.1_a": "AI turinys — tai vizualai, video ir reklamos kūriniai, sukurti naudojant dirbtinį intelektą be tradicinės fotosesijos ar filmavimo. Kuriame pilną prekės ženklo identitetą — nuo logotipo iki reels — taupydami laiką ir biudžetą.",
    "faq.2_q": "Kiek kainuoja AI turinio ar prekės ženklo kūrimas?",
    "faq.2_a": "Kaina priklauso nuo apimties — vienkartinė kampanija skiriasi nuo pilno prekės ženklo kūrimo. Parašyk per kontaktų formą, koks tavo verslas ir ko reikia — atsiųsime nemokamą demo ir pasiūlymą.",
    "faq.3_q": "Kiek užtrunka projektas?",
    "faq.3_a": "Dėl AI darbo eigos pirmą turinio paketą ar prekės ženklo koncepciją galime parodyti per kelias dienas, ne savaites ar mėnesius, kaip su tradicine fotosesija ar filmavimu.",
    "faq.4_q": "Kam tinka šios paslaugos?",
    "faq.4_a": "Dirbame su grožio klinikomis, mados prekės ženklais ir wellness verslais — daugiausiai Kaune ir Lietuvoje, bet kuriame turinį ir tarptautinėms auditorijoms.",
    "faq.5_q": "Ar reikia tikrų nuotraukų ar video?",
    "faq.5_a": "Ne, dauguma turinio gali būti sukurta be tikros fotosesijos. Jei vėliau norėsi įtraukti tikrus produkto kadrus ar video, lengvai sujungiame juos su AI sukurtu turiniu.",
    "faq.6_q": "Kaip pradėti bendradarbiavimą?",
    "faq.6_a": "Parašyk per kontaktų formą arba Instagram, papasakok apie savo verslą — atsiųsime nemokamą demo turinį, pritaikytą tau, be įsipareigojimų.",

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
    "theme.toggle": "Toggle light / dark mode",
    "menu.home": "HOME",
    "menu.services": "SERVICES",
    "menu.portfolio": "PORTFOLIO",
    "menu.sub.art": "Art",
    "menu.sub.products": "Products",
    "menu.sub.fashion": "Fashion",
    "menu.sub.other": "Other",
    "menu.about": "ABOUT",
    "menu.blog": "BLOG",
    "menu.faq": "FAQ",
    "menu.contact": "CONTACT",

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
    "work.1_desc": "GELO is a fully AI-imagined ice cream brand: visual identity, packaging design and social content built in days, not months. A blueprint for how AI content replaces an expensive photoshoot for food and beauty brands.",
    "work.2_ph": "Label", "work.2_t": "Fashion label", "work.2_d": "Brand + reels",
    "work.2_desc": "A fashion label with a full AI-generated lookbook and reels series — no models, no studio rental. Shows how AI ads cut production costs to the minimum for a small fashion brand.",
    "work.3_ph": "Beauty", "work.3_t": "Beauty brand", "work.3_d": "Campaign + ads",
    "work.3_desc": "A beauty brand campaign with AI-generated visuals and Meta ad creatives built for beauty clinics and salons. AI content for a beauty clinic boosts visibility without needing a photographer on retainer.",
    "work.4_ph": "Wellness", "work.4_t": "Wellness studio", "work.4_d": "Content + identity",
    "work.4_desc": "A wellness studio brand identity and content strategy built with AI — from logo to a full social media calendar. An example of how a wellness business can look premium without a big budget.",

    "cta.h2": "We don't just make content. We build brands that are <em>impossible to ignore.</em>",
    "cta.btn": "Don't be shy — say hi →",

    "faq.kicker": "FAQ",
    "faq.h2": "Frequently <em>asked</em> questions.",
    "faq.1_q": "What is AI content and an AI brand?",
    "faq.1_a": "AI content is visuals, video and ad creatives made with artificial intelligence instead of a traditional photoshoot or film shoot. We build a full brand identity — from logo to reels — saving time and budget.",
    "faq.2_q": "How much does AI content or brand work cost?",
    "faq.2_a": "Price depends on scope — a one-off campaign differs from building a full brand. Tell us about your business through the contact form and we'll send a free demo and a quote.",
    "faq.3_q": "How long does a project take?",
    "faq.3_a": "Thanks to the AI workflow, we can show a first content batch or brand concept in days, not the weeks or months a traditional photoshoot or film shoot would take.",
    "faq.4_q": "Who is this for?",
    "faq.4_a": "We work with beauty clinics, fashion brands and wellness businesses — mostly in Kaunas and Lithuania, but we also build content for international audiences.",
    "faq.5_q": "Do I need real photos or video?",
    "faq.5_a": "No, most content can be built without a real photoshoot. If you want to add real product shots or video later, we can easily blend them with AI-generated content.",
    "faq.6_q": "How do I get started?",
    "faq.6_a": "Message us through the contact form or Instagram and tell us about your business — we'll send a free demo made for you, no commitment.",

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
