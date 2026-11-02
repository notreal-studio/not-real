// ============================================================
//  UI texts, LT + EN. English is the default language (root "/"), Lithuanian lives at "/lt/".
//  Add a language: copy the `en` block, translate, add it to `languages` and `langName`, create src/pages/<code>/.
// ============================================================
export const languages = ["en", "lt"] as const;
export type Lang = (typeof languages)[number];
export const defaultLang: Lang = "en";
export const langName: Record<string, string> = { en: "EN", lt: "LT" };

export const ui: Record<string, Record<string, string>> = {
  // ---------------- LIETUVIŠKAI ----------------
  lt: {
    "meta.title": "Not Real — fotografė ir AI vizualų kūrėja",
    "meta.desc": "Tikslūs tikro produkto vizualai: fotografija ir AI. Real feeling. Unreal ideas.",
    "loader.loading": "Kraunasi",

    "nav.menu": "Meniu", "menu.close": "Uždaryti", "theme.toggle": "Šviesi / tamsi tema",
    "nav.work": "Darbai", "nav.about": "Apie", "nav.faq": "DUK", "nav.contact": "Kontaktai", "nav.all_work": "Visi darbai",

    "hero.tag": "Fotografė ir AI vizualų kūrėja", "hero.sr": "Fotografė ir AI vizualų kūrėja. Real feeling. Unreal ideas.",
    "hero.prev": "Ankstesnis", "hero.next": "Kitas", "hero.sound": "Garsas",

    "pf.kicker": "Portfolio",
    "pf.h2": "Atrinkti <em class=\"br-ul\">darbai.</em>",
    "pf.lead": "Fotografija, filmai ir AI vizualai, kuriuose produktas atrodo toks, kokį gaus pirkėjas. Koncepciniai ir mano paties projektai.",
    "pf.view": "Žiūrėti", "pf.works": "darbų", "pf.open": "Atidaryti", "pf.close": "Uždaryti", "pf.prev": "Ankstesnis", "pf.next": "Kitas", "pf.viewer": "Peržiūra",
    "pf.marquee": "Besisukanti darbų juosta",

    "faq.kicker": "DUK", "faq.h2": "Dažni <em class=\"br-ul\">klausimai.</em>",
    "faq.1_q": "Ką iš tikrųjų kuriate?", "faq.1_a": "Tikslius tikro produkto vizualus: nuotraukas, AI vaizdus, trumpus filmus, reklamas ir prekės ženklo identitetą. Viskas prasideda nuo realios šviesos ir produkto, o viena neįmanoma detalė padaro vaizdą įsimintiną.",
    "faq.2_q": "Ar man reikia turėti nuotraukų ar video?", "faq.2_a": "Ne visada. Galiu kurti iš užduoties ir nuorodų. Jei turi tikrų produkto nuotraukų, net ir telefonu darytų, jas panaudoju: produktas lieka tikslus, nes pradedama nuo tikro. Taip pat galiu atvykti ir nufotografuoti pati.",
    "faq.3_q": "Kiek užtrunka projektas?", "faq.3_a": "Pirmieji kadrai ar koncepcija paprastai atsiranda per kelias dienas, o ne per savaites, kaip tradicinėje fotosesijoje. Filmai ir brand kit užtrunka ilgiau; terminą suderiname per pirmą pokalbį.",
    "faq.4_q": "Kiek tai kainuoja?", "faq.4_a": "Kaina priklauso nuo apimties: vienas reels skiriasi nuo viso brand kit. Papasakok apie savo projektą ir atsiųsiu aiškų pasiūlymą.",
    "faq.5_q": "Ar galite dirbti pagal mano prekės ženklo gaires?", "faq.5_a": "Taip. Pradedu nuo tavo brand book, svetainės ar esamų nuotraukų ir užrakinu tavo spalvas, šriftus ir taisykles brand kit viduje, kad kiekvienas vaizdas išliktų prekės ženklo stiliaus.",
    "faq.6_q": "Kaip pradėti?", "faq.6_a": "Parašyk arba užsisakyk trumpą pokalbį. Papasakok apie savo prekės ženklą ir ko tau reikia, o toliau viską suderinsime.",

    "cta.h2": "Pažiūrėk du kartus.<br>Tada <em class=\"br-hw sf\">parašyk.</em>",
    "cta.p": "Papasakok apie savo produktą, ir atsakysiu idėjomis bei pasiūlymu.", "cta.btn": "Pakalbėkime",

    "contact.kicker": "Kontaktai", "contact.h2": "Būkime <em class=\"br-ul\">ryšyje.</em>",
    "contact.lead": "Papasakok apie savo prekės ženklą ir ko tau reikia. Atsakysiu su idėjomis ir pasiūlymu.", "contact.book": "Užsisakyti pokalbį",
    "form.name_label": "Vardas", "form.name_ph": "Tavo vardas", "form.email_label": "El. paštas", "form.email_ph": "vardas@verslas.lt",
    "form.msg_label": "Tavo prekės ženklas ir ko reikia", "form.msg_ph": "pvz. odos priežiūros prekės ženklas, reikia 10 produktų vaizdų ir 15 s reels.",
    "form.submit": "Siųsti užklausą", "form.subject": "Nauja užklausa — Not Real", "form.from": "Not Real svetainė",

    "footer.tag": "Real feeling. Unreal ideas.", "footer.explore": "Naršyk", "footer.hi": "Parašyk",
    "footer.copy": "© 2026 NOT REAL · Inga Bankauskė", "footer.privacy": "Privatumo politika", "footer.cookies": "Slapukų nustatymai",

    "gp.back": "Visi darbai", "gp.works": "darbų", "gp.more": "Kiti darbai",
    "gp.cta.h": "Turi projektą?", "gp.cta.btn": "Paprašyti pasiūlymo",
    "gp.brand.nr": "NOT REAL brandbook 4.0.0", "gp.brand.sx": "SOXI Brand Guidelines", "gp.brand.note": "Parodyti tik pasirinkti puslapiai.",
    "gp.soxi.h": "SOXI atvejo studija", "gp.soxi.p": "Nuo pavadinimo iki kampanijos viename Space: taisyklės, produktas, personažai, scenos, plakatai, e. parduotuvė ir filmas.", "gp.soxi.btn": "Skaityti atvejo studiją",
    "gp.soxi.win": "1 vieta „Magnific One Brand Kit“ konkurse, 2026",

    "js.sending": "Siunčiama…", "js.ok": "Gauta. Netrukus susisieksiu.",
    "js.err": "Nepavyko. Parašyk tiesiai: inga.bankauske@gmail.com", "js.neterr": "Ryšio klaida. Parašyk tiesiai: inga.bankauske@gmail.com",
  },

  // ---------------- ENGLISH ----------------
  en: {
    "meta.title": "Not Real — photographer and AI visual creator",
    "meta.desc": "Exact visuals of the real product: photography and AI. Real feeling. Unreal ideas.",
    "loader.loading": "Loading",

    "nav.menu": "Menu", "menu.close": "Close", "theme.toggle": "Toggle light / dark mode",
    "nav.work": "Work", "nav.about": "About", "nav.faq": "FAQ", "nav.contact": "Contact", "nav.all_work": "All work",

    "hero.tag": "Photographer & AI visual creator", "hero.sr": "Photographer and AI visual creator. Real feeling. Unreal ideas.",
    "hero.prev": "Previous", "hero.next": "Next", "hero.sound": "Sound",

    "pf.kicker": "Portfolio",
    "pf.h2": "Selected <em class=\"br-ul\">work.</em>",
    "pf.lead": "Photography, film and AI visuals where the product looks exactly as the buyer will receive it. Concept work and personal projects.",
    "pf.view": "View", "pf.works": "works", "pf.open": "Open", "pf.close": "Close", "pf.prev": "Previous", "pf.next": "Next", "pf.viewer": "Viewer",
    "pf.marquee": "Rotating strip of work",

    "faq.kicker": "FAQ", "faq.h2": "Frequently <em class=\"br-ul\">asked</em> questions.",
    "faq.1_q": "What do you actually make?", "faq.1_a": "Exact visuals of the real product: photographs, AI images, short films, ads and brand identity. Everything starts from real light and a real product, and one impossible detail makes the picture memorable.",
    "faq.2_q": "Do I need photos or video from my side?", "faq.2_a": "Not always. I can build from a brief and references. If you have real product shots, even phone photos, I use them: the product stays exact because it starts real. I can also come and shoot it myself.",
    "faq.3_q": "How long does a project take?", "faq.3_a": "A first set of frames or a concept usually takes days, not the weeks a traditional shoot needs. Films and brand kits take longer; we agree the timeline on the first call.",
    "faq.4_q": "How much does it cost?", "faq.4_a": "It depends on scope: a single reel is different from a full brand kit. Tell me about your project and I'll send a clear quote.",
    "faq.5_q": "Can you work with my brand guidelines?", "faq.5_a": "Yes. I start from your brand book, site or existing photos and lock your colours, type and rules into a brand kit so every image stays on brand.",
    "faq.6_q": "How do we start?", "faq.6_a": "Write to me or book a short call. Tell me about your brand and what you need, and we'll take it from there.",

    "cta.h2": "Look twice.<br>Then <em class=\"br-hw sf\">say hi.</em>",
    "cta.p": "Tell me about your product, and I'll reply with ideas and a quote.", "cta.btn": "Let's talk",

    "contact.kicker": "Contact", "contact.h2": "Keep in <em class=\"br-ul\">touch.</em>",
    "contact.lead": "Tell me about your brand and what you need. I'll reply with ideas and a quote.", "contact.book": "Book a call",
    "form.name_label": "Name", "form.name_ph": "Your name", "form.email_label": "Email", "form.email_ph": "name@business.com",
    "form.msg_label": "Your brand & what you need", "form.msg_ph": "e.g. a skincare brand, we need 10 product visuals and a 15 s reel.",
    "form.submit": "Send request", "form.subject": "New request — Not Real", "form.from": "Not Real website",

    "footer.tag": "Real feeling. Unreal ideas.", "footer.explore": "Explore", "footer.hi": "Say hi",
    "footer.copy": "© 2026 NOT REAL · Inga Bankauskė", "footer.privacy": "Privacy policy", "footer.cookies": "Cookie settings",

    "gp.back": "All work", "gp.works": "works", "gp.more": "More work",
    "gp.cta.h": "Have a project in mind?", "gp.cta.btn": "Ask for a quote",
    "gp.brand.nr": "NOT REAL brandbook 4.0.0", "gp.brand.sx": "SOXI Brand Guidelines", "gp.brand.note": "Selected pages only.",
    "gp.soxi.h": "SOXI case study", "gp.soxi.p": "From a name to a campaign inside one Space: rules, product, cast, scenes, posters, e-shop and film.", "gp.soxi.btn": "Read the case study",
    "gp.soxi.win": "1st place, Magnific One Brand Kit contest, 2026",

    "js.sending": "Sending…", "js.ok": "Got it. I'll get back to you soon.",
    "js.err": "Something went wrong. Email directly: inga.bankauske@gmail.com", "js.neterr": "Connection error. Email directly: inga.bankauske@gmail.com",
  },
};
