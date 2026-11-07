// Services ("What I make possible"), how-it-works steps and the About text. EN + LT. Draft copy for Inga to approve.
type L = { en: string; lt: string };
type LL = { en: string[]; lt: string[] };

export interface Service {
  n: string; title: L; tag: L; lead: L; gets: LL; who: L;
  link?: { label: L; href: L };
}

export const servicesUi = {
  kicker: { en: "Services", lt: "Paslaugos" } as L,
  h2: { en: "What I make <em>possible.</em>", lt: "Ką padarau <em>įmanoma.</em>" } as L,
  lead: { en: "Four ways to work together. Pick one, or mix them.", lt: "Keturi būdai dirbti kartu. Pasirink vieną arba sujunk." } as L,
  gets: { en: "What you get", lt: "Ką gauni" } as L,
  who: { en: "Good for", lt: "Tinka" } as L,
  quote: { en: "Ask for a quote", lt: "Paprašyti pasiūlymo" } as L,
  book: { en: "Book a call", lt: "Užsisakyti pokalbį" } as L,
  howH: { en: "How it works", lt: "Kaip tai vyksta" } as L,
};

export const services: Service[] = [
  { n: "01",
    title: { en: "AI Visuals", lt: "AI vizualai" },
    tag: { en: "Photography without the shoot.", lt: "Fotografija be fotosesijos." },
    lead: { en: "Campaign images, e-shop shots and editorials, built from your brief and references, in your brand's look.",
            lt: "Kampanijų vaizdai, e. parduotuvės kadrai ir editorialai, sukurti pagal tavo užduotį ir nuorodas, tavo prekės ženklo stiliumi." },
    gets: { en: ["Product, lifestyle and editorial images that look photographed", "Your colours, type and rules locked in, so every image matches", "Web and social sizes, finished and retouched", "First frames in days, then refinement"],
            lt: ["Produkto, gyvenimo būdo ir editorial vaizdai, kurie atrodo nufotografuoti", "Tavo spalvos, šriftai ir taisyklės užrakinti, todėl visi vaizdai tarpusavyje dera", "Paruošti ir sutvarkyti vaizdai internetui ir socialiniams tinklams", "Pirmieji kadrai per kelias dienas, paskui tobulinimas"] },
    who: { en: "E-commerce brands, creators, founders who need a lot of images, fast.", lt: "E. prekybos prekių ženklams, kūrėjams, įkūrėjams, kuriems greitai reikia daug vaizdų." } },
  { n: "02",
    title: { en: "Shoot + Twist", lt: "Shoot + Twist" },
    tag: { en: "Real footage, one impossible thing.", lt: "Tikra medžiaga ir viena neįmanoma detalė." },
    lead: { en: "I come to you, shoot your product or space, then take it somewhere real light never went. Real first, twist second.",
            lt: "Atvykstu pas tave, nufotografuoju ar nufilmuoju tavo produktą ar erdvę, o tada nuvedu ją ten, kur tikra šviesa niekada nepasiekė. Pirma tikra, paskui kitaip." },
    gets: { en: ["An on-location photo and video day by arrangement", "A remote kit for clients elsewhere: shoot with a phone, I guide you", "Your product stays exact, because it starts real", "Stills and edited video, with the twist added"],
            lt: ["Fotografavimo ir filmavimo diena vietoje pagal susitarimą", "Nuotolinis variantas kitur esantiems klientams: filmuoji telefonu, aš vedu per procesą", "Tavo produktas lieka tikslus, nes pradedama nuo tikro", "Nuotraukos ir sumontuotas video su pridėta neįmanoma detale"] },
    who: { en: "Brands whose product must look exactly right: furniture, fashion, beauty, objects.", lt: "Prekių ženklams, kurių produktas turi atrodyti tiksliai: baldai, mada, grožis, objektai." } },
  { n: "03",
    title: { en: "Reels & Video", lt: "Reels ir video" },
    tag: { en: "Motion that stops the scroll.", lt: "Judesys, sustabdantis slinkimą." },
    lead: { en: "Short films, reels and ads, from storyboard to final cut with sound. One idea, told in seconds.",
            lt: "Trumpi filmai, reels ir reklamos nuo storyboard iki galutinio montažo su garsu. Viena idėja, papasakota per kelias sekundes." },
    gets: { en: ["Concept, script and storyboard", "Generated and directed footage, edited with sound and voice", "Every format you need: 9:16, 16:9, 1:1", "Typical length 10 to 45 seconds"],
            lt: ["Koncepcija, scenarijus ir storyboard", "Sugeneruota ir režisuota medžiaga, sumontuota su garsu ir balsu", "Visi reikalingi formatai: 9:16, 16:9, 1:1", "Įprasta trukmė nuo 10 iki 45 sekundžių"] },
    who: { en: "Launches, product ads and brands that want to be remembered on social.", lt: "Naujų produktų pristatymams, produktų reklamoms ir prekių ženklams, norintiems išlikti atmintyje socialiniuose tinkluose." } },
  { n: "04",
    title: { en: "Brand Kit Space", lt: "Brand Kit Space" },
    tag: { en: "Build your brand once. The workflow does the rest.", lt: "Sukurk prekės ženklą vieną kartą. Likusį padaro workflow." },
    lead: { en: "A Magnific One brand kit that produces on-brand posters, e-shop shots, characters and campaigns at the push of a button. From a name to a campaign, inside one Space.",
            lt: "Magnific One brand kit, kuris paspaudus mygtuką sukuria prekės ženklo stiliaus plakatus, e. parduotuvės kadrus, personažus ir kampanijas. Nuo pavadinimo iki kampanijos viename Space." },
    gets: { en: ["A kit built from your brand book, website or photos", "A locked product, a cast of characters, scenes and an e-shop panel", "Posters, social posts and banners in one consistent style", "You get the Space with team access, or I run it for you"],
            lt: ["Rinkinys, sukurtas iš tavo brand book, svetainės ar nuotraukų", "Užrakintas produktas, personažų komanda, scenos ir e. parduotuvės skydelis", "Plakatai, socialinių tinklų įrašai ir baneriai vienu nuosekliu stiliumi", "Gauni Space su komandos prieiga arba aš jį valdau už tave"] },
    who: { en: "Brands that need a steady stream of consistent visuals.", lt: "Prekių ženklams, kuriems nuolat reikia nuoseklių vizualų." },
    link: { label: { en: "See the SOXI case study", lt: "Žiūrėk SOXI atvejo studiją" }, href: { en: "/work/soxi/", lt: "/lt/work/soxi/" } } },
];

export const howSteps: { n: string; h: L; p: L }[] = [
  { n: "01", h: { en: "A short call", lt: "Trumpas pokalbis" }, p: { en: "Tell me about your brand and what you need. About 20 minutes.", lt: "Papasakok apie savo prekės ženklą ir ko reikia. Apie 20 minučių." } },
  { n: "02", h: { en: "Idea & references", lt: "Idėja ir nuorodos" }, p: { en: "I come back with one clear idea, a look and a quote.", lt: "Grįžtu su viena aiškia idėja, stiliumi ir pasiūlymu." } },
  { n: "03", h: { en: "Create", lt: "Kuriame" }, p: { en: "First frames in days. We refine until it feels right.", lt: "Pirmieji kadrai per kelias dienas. Tobuliname, kol jausmas tinka." } },
  { n: "04", h: { en: "Deliver", lt: "Pristatome" }, p: { en: "Final files in every format you need, ready to publish.", lt: "Galutiniai failai visais reikalingais formatais, paruošti skelbti." } },
];

export const about = {
  kicker: { en: "About", lt: "Apie" } as L,
  h2: { en: "I'm Inga. <em>I look twice.</em>", lt: "Aš Inga. <em>Žiūriu du kartus.</em>" } as L,
  p: [
    { en: "I'm a photographer turned AI creative director. I still begin with real light and real skin, then add the one thing nobody ordered.",
      lt: "Esu fotografė, tapusi AI kūrybos direktore. Vis dar pradedu nuo tikros šviesos ir tikros odos, o tada pridedu vieną dalyką, kurio niekas neužsakė." },
    { en: "Beauty gets the eye. Music gets the chest. Words get the memory. I make visuals that look believable and behave impossibly, for brands, creators and founders who refuse to blend in.",
      lt: "Grožis pagauna akį. Muzika pagauna krūtinę. Žodžiai pagauna atmintį. Kuriu vizualus, kurie atrodo tikėtinai ir elgiasi neįmanomai, prekių ženklams, kūrėjams ir įkūrėjams, kurie nenori susilieti su minia." },
    { en: "Based in Lithuania, working with brands anywhere. On-location shoots by arrangement; everything else happens remotely.",
      lt: "Gyvenu ir dirbu Lietuvoje, bendradarbiauju su prekių ženklais visur. Fotosesijos vietoje pagal susitarimą, viskas kita nuotoliu." },
  ] as L[],
  facts: [
    { k: { en: "Name", lt: "Vardas" }, v: { en: "Inga Bankauskė", lt: "Inga Bankauskė" } },
    { k: { en: "Studio", lt: "Studija" }, v: { en: "Not Real · AI Visual Studio", lt: "Not Real · AI vizualų studija" } },
    { k: { en: "Based", lt: "Veikla" }, v: { en: "Lithuania, working worldwide", lt: "Lietuva, dirbu visur" } },
    { k: { en: "Works with", lt: "Dirba su" }, v: { en: "Brands, creators, founders", lt: "Prekių ženklais, kūrėjais, įkūrėjais" } },
  ],
  cta: { en: "Say hi", lt: "Parašyk" } as L,
  portrait: { en: "[ your portrait here ]", lt: "[ čia tavo portretas ]" } as L,
};
