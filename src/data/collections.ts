// Private collections: unlisted pages for sharing a set of work with one client. They are not linked from anywhere on the site,
// carry noindex, and stay out of the sitemap. The address is /p/<slug>/ - keep the slug long enough that nobody can guess it.
// A section is a list of parts shown in order: a heading, a small label, paragraphs, a sub-heading, and pictures/videos.
import { findMedia, type Media } from "./portfolio";

export interface PriceTable { cols: [string, string, string]; groups: { h: string; rows: [string, string, string][] }[]; note: string; legendH: string; legend: [string, string, string][]; after: string }
export type Part =
  | { h: string }
  | { steps: string[] }
  | { h4: string }
  | { label: string }
  | { p: string[] }
  | { ul: string[] }
  | { ulb: string[] }
  | { table: PriceTable }
  | { hr: true }
  | { imgs: Media[]; first?: "wide"; uniform?: boolean; vid?: boolean }   // first = the first picture spans the full width; uniform = all tiles 16:9
  | { ids: string[] };                  // pictures or videos that already exist on the site, by id
export interface CollectionSection { key: string; title: string; parts: Part[] }
export interface Collection { slug: string; title: string; kicker: string; intro: string; about?: string[]; sections: CollectionSection[] }

const photo = (file: string, w: number, h: number, alt: string): Media => ({
  id: "mb-" + file, kind: "image", title: { en: alt, lt: alt },
  cover: `/assets/img/collections/minksti-baldai/${file}-800.webp`, ratio: w / h,
  src: `/assets/img/collections/minksti-baldai/${file}.webp`, w, h,
});

const palete = [
  photo("palete-kreminis", 1600, 1066, "Ta pati sofa baltame fone, kreminis audinys"),
  photo("palete-ruda", 1600, 1066, "Ta pati sofa baltame fone, ruda spalva"),
  photo("palete-zalia", 1600, 1066, "Ta pati sofa baltame fone, žalia spalva"),
];
const interjerai = [
  photo("interjeras-kreminis", 1600, 1074, "Interjeras su foteliu ir pufu, kreminė spalva"),
  photo("interjeras-pilkas", 1600, 1074, "Tas pats interjeras, šviesiai pilka spalva"),
  photo("interjeras-ruda", 1600, 1074, "Tas pats interjeras, ruda spalva"),
  photo("interjeras-zalias", 1600, 1074, "Tas pats interjeras, žalia spalva"),
  photo("interjeras-grafito", 1600, 1074, "Tas pats interjeras, grafito spalva"),
];

const audinysBalta = photo("audinys-balta", 1600, 534, "Balta modulinė sofa baltame fone, audinio pavyzdys iš arti ir ta pati sofa su smėlio spalvos audiniu");
const audinysInterjerai = [
  photo("audinys-fotelis-sviesus", 1600, 1066, "Fotelis ir pufas su šviesiu austu audiniu, vaizdas iš viršaus"),
  photo("audinys-fotelis-pilkas", 1600, 1066, "Tas pats fotelis ir pufas su pilku lygiu audiniu"),
  photo("audinys-sofa-ruda", 1600, 1074, "Sofa su rudu audiniu interjere"),
  photo("audinys-sofa-pilka", 1600, 1074, "Sofa su pilku margu audiniu interjere"),
];

const rinkinysBalta = [
  { ...photo("rinkinys-kampas-pilkas", 1600, 893, "Pradinė nuotrauka, iš kurios sukurtas visas rinkinys: sofa šviesiai pilkame fone"), badge: "Pradinė nuotrauka" } as Media,
  photo("rinkinys-priekis", 1600, 893, "Bordo spalvos kampinė sofa su gulimąja dalimi, vaizdas iš priekio baltame fone"),
  photo("rinkinys-galas", 1600, 893, "Ta pati sofa iš galo ir šono"),
  photo("rinkinys-sonas", 1600, 893, "Ta pati sofa, vaizdas iš šono"),
  photo("rinkinys-kampas", 1600, 893, "Ta pati sofa, vaizdas iš kampo"),
];
const rinkinysDetales = [
  photo("rinkinys-detale-ranktelis", 1600, 893, "Sofos porankio detalė iš arti"),
  photo("rinkinys-audinys", 1600, 893, "Bordo audinio tekstūra iš arti"),
  photo("rinkinys-detale-kampas", 1600, 893, "Sofos kampas su siūle iš arti"),
  photo("rinkinys-detale-pagalve", 1600, 893, "Porankis, pagalvė ir sėdynė iš arti"),
];
const rinkinysInterjerai = [
  photo("rinkinys-int-langai", 1600, 893, "Bordo sofa interjere su dideliais langais"),
  photo("rinkinys-int-virsus", 1600, 893, "Bordo sofa šiltame medžio interjere, vaizdas iš viršaus"),
  photo("rinkinys-int-kaktusas", 1600, 1194, "Bordo sofa šviesiame interjere su akmens siena ir kaktusu"),
  photo("rinkinys-int-sodas", 1600, 893, "Bordo sofa interjere su vaizdu į sodą"),
  photo("rinkinys-int-plokstes", 1600, 893, "Bordo sofa klasikinio interjero fone su sienų plokštėmis"),
  photo("rinkinys-int-lubos", 1600, 1194, "Bordo sofa aukštų lubų interjere su šiltomis šviesomis"),
];

const reklama = [
  photo("reklama-01", 1600, 893, "Moteris ilsisi ant apvalios formos sofos šviesiame interjere, vaizdas iš viršaus"),
  photo("reklama-02", 1600, 1074, "Šeima kambaryje su kampine sofa: tėtis, mama su knyga ir žaidžiantis vaikas"),
  photo("reklama-03", 1600, 893, "Pora ilsisi ant kordo audinio sofos tarp vinilo plokštelių"),
  photo("reklama-04", 1600, 893, "Dvi merginos guli ant sofos ir skaito knygas"),
  photo("reklama-05", 1600, 893, "Šunys šokinėja ant sofos ir bėgioja po kambarį, katė miega"),
  photo("reklama-06", 1600, 893, "Besijuokianti pora ant sofos tarp kraustymosi dėžių ir augalų"),
  photo("reklama-07", 1600, 893, "Besijuokianti pora ant sofos, artimas kadras"),
  photo("reklama-08", 1600, 893, "Šuniukai bėgioja prieš šviesią kampinę sofą, katė miega ant jos"),
  photo("reklama-09", 1600, 893, "Žiovaujanti katė ant sofos"),
  photo("reklama-10", 1600, 893, "Mergaitės ranka su tortu ant sofos sėdynės"),
  photo("reklama-11", 1600, 893, "Besijuokianti mergaitė valgo gimtadienio tortą prieš sofą"),
  photo("reklama-12", 1600, 893, "Vaikai šokinėja ant sofos gimtadienio proga"),
  photo("reklama-13", 1600, 893, "Moteris ilsisi ant garstyčių spalvos kampinės sofos šalia židinio"),
  photo("reklama-14", 1600, 893, "Moteris sėdi ant sofos tarp kraustymosi dėžių"),
];

const fotelisZmones = [
  photo("fotelis-1", 1600, 893, "Šokėja dryžuoto fotelio šalia, prabangiame interjere su paauksuotu veidrodžiu"),
  photo("fotelis-2", 1600, 893, "Vyras bordo kostiumu palinkęs ant dryžuoto fotelio, šiltame kabinete su paveikslais"),
  photo("fotelis-6", 1600, 893, "Vyras geltonu švarku sėdi dryžuotame fotelyje rausvame fone"),
  photo("fotelis-7", 1600, 900, "Moteris su vinilo plokštele ilsisi dryžuotame fotelyje retro interjere"),
  photo("fotelis-8", 1600, 893, "Moteris sukryžiavusi kojas skaito knygą dryžuotame fotelyje, vaizdas iš viršaus"),
];
const fotelisAugintiniai = [
  photo("fotelis-3", 1600, 893, "Katė miega ant dryžuoto fotelio atlošo marokietiško stiliaus interjere"),
  photo("fotelis-4", 1600, 893, "Šuo miega dryžuotame fotelyje dailininko dirbtuvėje"),
  photo("fotelis-5", 1600, 893, "Juoda katė sėdi dryžuotame fotelyje tamsiame detektyviniame interjere"),
];

// people and pets shown together as one set, alternating so no two pet pictures sit next to each other
const fotelisVisi = [fotelisZmones[0], fotelisZmones[1], fotelisAugintiniai[0], fotelisZmones[2], fotelisAugintiniai[1], fotelisZmones[3], fotelisAugintiniai[2], fotelisZmones[4]];

const adVideo = (n: number, lt: string): Media => ({
  id: "mb-ad-" + n, kind: "video", title: { en: lt, lt },
  cover: `/assets/video/minksti-ad-${n}.webp`, ratio: 16 / 9,
  video: { src: `/assets/video/minksti-ad-${n}.mp4`, poster: `/assets/video/minksti-ad-${n}.webp`, vertical: false },
});
const reklamosVideo = [
  adVideo(2, "Augintiniai ant sofos"), adVideo(1, "Muzikos vakaras"), adVideo(3, "Žaidimų kambarys"),
  adVideo(4, "Naujų namų jausmas"), adVideo(5, "Pirmoji diena naujuose namuose"),
];

const everyoneFits: Media = {
  id: "mb-everyone-fits", kind: "video", title: { en: "Everyone fits", lt: "Everyone fits – kiek gyvenimų telpa ant vienos sofos" },
  cover: "/assets/video/minksti-everyone-fits.webp", ratio: 9 / 16,
  video: { src: "/assets/video/minksti-everyone-fits.mp4", poster: "/assets/video/minksti-everyone-fits.webp", vertical: true },
};

export const collections: Collection[] = [
  {
    slug: "minksti-baldai-7k3q",
    title: "Minksti baldai",
    kicker: "Atskira kolekcija",
    about: [
      "Esu Inga Bankauskė – fotografė, vizualų kūrėja ir NOT REAL studijos įkūrėja.",
      "Pusantrų metų specializavausi minkštųjų baldų fotografijoje, kurdama komercinius vizualus, skirtus didelėms Europos e. prekybos platformoms, tokioms kaip OTTO, fonQ ir home24, bei baldų prekių ženklams „Veken“ ir „Skaidar“.",
      "Puikiai pažįstu minkštųjų baldų fotografavimo subtilybes – nuo formų ir proporcijų iki audinių tekstūrų, spalvų tikslumo, apšvietimo ir konstrukcinių detalių.",
      "Šiandien šią patirtį jungiu su profesionaliu retušavimu, grafiniu dizainu ir AI technologijomis, kurdama tikroviškas baldų nuotraukas, reklaminius vizualus bei vaizdo įrašus.",
      "Man svarbu ne tik estetika, bet ir **tikslus baldas, medžiagiškumas bei išskirtinių savybių perteikimas.**",
    ],
    intro: "Minkštų baldų vizualai vienoje vietoje: nuotraukos ir video. Paspausk bet kurį kadrą, kad pamatytum jį didesnį.",
    sections: [
      {
        key: "nuotraukos", title: "Nuotraukos", parts: [
          { h: "Viena nuotrauka. Visa spalvų paletė." },
          { label: "Baltame fone" },
          { imgs: palete, vid: true },
          { p: [
            "Vieną kartą nufotografuotas baldas gali būti pristatomas visomis siūlomomis spalvomis – kiekvieno varianto nereikia fotografuoti atskirai.",
            "Baldas išlieka tas pats: nekeičiame jo formos, proporcijų, audinio tekstūros, siūlių, apšvietimo ar šešėlių. Keičiasi tik spalva, kurią deriname pagal tikrą audinio pavyzdį.",
            "Taip galima pristatyti visą spalvų kolekciją, išlaikant vienodą nuotraukų kokybę ir nuoseklumą. Spalvą galima keisti visose nuotraukose – tiek baltame fone, tiek interjeruose.",
          ] },
          { h4: "Ko reikia iš jūsų?" },
          { p: ["Kokybiškos baldo nuotraukos ir norimų spalvų audinių pavyzdžių, pagal kuriuos atkuriamos spalvos."] },
          { label: "Interjeruose" },
          { imgs: interjerai, first: "wide" },
          { hr: true },
          { h: "Tas pats baldas. Kitas audinys." },
          { label: "Baltame fone" },
          { imgs: [audinysBalta] },
          { h4: "Kaip atrodytų tas pats baldas su visiškai kitu audiniu?" },
          { p: [
            "Pasitelkdami AI, galime pakeisti baldo audinį, išlaikydami jo formą, proporcijas ir konstrukcines detales. Keičiasi ne tik spalva, bet ir audinio tekstūra, paviršiaus savybės bei šviesos atspindžiai.",
            "Pirmiausia sukuriame baldo nuotrauką baltame fone su nauju audiniu. Įvertiname, kaip audinys atrodo ant baldo, ir patikriname svarbiausias detales. Tuomet jau paruoštą baldo variantą galime pristatyti pasirinktame interjere, pritaikydami aplinką, apšvietimą ir bendrą vizualinį stilių.",
          ] },
          { steps: ["Originalus baldas", "Naujas audinys", "Baldas interjere"] },
          { p: [
            "Taip galima pristatyti skirtingus audinių variantus negaminant ir nefotografuojant kiekvieno baldo atskirai.",
          ] },
          { h4: "Ko reikia iš jūsų?" },
          { ul: [
            "Kokybiškos baldo nuotraukos.",
            "Aiškios norimo audinio nuotraukos iš arti, kurioje matoma jo tekstūra.",
            "Nuotraukos, kurioje matyti, kaip tas pats audinys atrodo ant kito baldo ar gaminio.",
          ] },
          { h4: "Svarbu žinoti" },
          { p: ["Ne visais atvejais įmanoma pakeisti baldo audinį naudojant AI. Ne ant kiekvieno esamo audinio galima tikroviškai pritaikyti kitą, todėl prieš pradedant darbą būtina individuali konsultacija, kurios metu įvertiname keitimo galimybes."] },
          { label: "Interjeruose" },
          { imgs: audinysInterjerai },
          { hr: true },
          { h: "Iš vienos nuotraukos – visas vizualų rinkinys." },
          { label: "Baltame fone" },
          { imgs: rinkinysBalta, first: "wide", uniform: true },
          { p: [
            "Viena baldo nuotrauka gali tapti pagrindu visai vizualų kolekcijai. Pasitelkdami AI, galime parodyti tą patį baldą iš skirtingų pusių, aukščių ir perspektyvų – nuo bendrų produkto vaizdų iki stambių kadrų, atskleidžiančių audinio tekstūrą, siūles ir konstrukcines detales.",
            "Baldą taip pat galime perkelti į įvairius interjerus, pritaikydami aplinką prie jūsų prekės ženklo estetikos. Nuo šviesaus minimalizmo iki išraiškingo maksimalizmo, nuo jaukios namų aplinkos iki modernaus, prabangaus interjero. Keičiame erdvę, apšvietimą, kompoziciją ir fotografavimo perspektyvą, kad tas pats produktas būtų pristatytas skirtingomis vizualinėmis kryptimis.",
            "Taip iš vienos pradinės nuotraukos sukuriame nuoseklų vizualų rinkinį, tinkamą e. parduotuvėms, katalogams, reklamai, socialiniams tinklams ir tolesnei AI vaizdo įrašų kūrybai – be papildomos fotosesijos.",
          ] },
          { h4: "Ko reikia iš jūsų?" },
          { p: ["Kokybiškos baldo nuotraukos ir pageidaujamos vizualinės krypties."] },
          { label: "Detalės iš arti" },
          { imgs: rinkinysDetales, uniform: true },
          { label: "Interjeruose" },
          { imgs: rinkinysInterjerai, uniform: true },
          { hr: true },
          { h: "Creative Ads – reklama, kuri pasakoja istoriją." },
          { p: [
            "Produktas gali būti daugiau nei gražiai nufotografuotas objektas. Jis gali tapti istorijos dalimi, sukelti emociją ir kurti asociacijas, kurios išlieka atmintyje.",
            "Jungdami fotografiją, AI ir grafinį dizainą, kuriame kūrybinius reklaminius vizualus – nuo tikroviškų gyvenimo situacijų iki netikėtų, drąsių ir siurrealistinių koncepcijų.",
            "Į vizualus įtraukiame žmones, personažus, objektus ir aplinką. Kuriame istorijas, kuriose vyksta gyvenimas: šeimos akimirkos, pokalbiai, susitikimai, poilsis ar mažos kasdienės tradicijos. Baldas tampa natūralia šių istorijų dalimi – ne tik interjero elementu, bet ir vieta, kurioje kuriami prisiminimai.",
          ] },
          { imgs: reklama, first: "wide", uniform: true },
          { p: [
            "Kūrybinę kryptį formuojame pagal jūsų prekės ženklo charakterį ir projekto užduotį. Kartu išgryniname, kokią istoriją pasakoti, kokius namus, žmones ir emocijas parodyti bei kokį įspūdį norime sukurti.",
            "Kiekvieną detalę – nuo aplinkos ir veikėjų iki apšvietimo, kompozicijos ir galutinio reklamos maketo – sujungiame į vientisą vizualinį pasakojimą.",
            "Tikslas – ne tik parodyti produktą, bet ir padėti auditorijai įsivaizduoti jį savo gyvenime, stiprinti prekės ženklo atpažįstamumą ir kurti įsimintiną komunikaciją.",
          ] },
          { h4: "Vienas fotelis. Skirtingi gyvenimai." },
          { imgs: fotelisVisi, first: "wide", uniform: true },
        ],
      },
      {
        key: "video", title: "Video", parts: [
          { h: "AI VIDEO – nuo produkto nuotraukos iki reklaminės istorijos" },
          { p: ["Pasitelkdami AI, iš minkštųjų baldų nuotraukų kuriame tikroviškus vaizdo įrašus – nuo produkto pristatymo baltame fone iki reklaminių istorijų su veikėjais. Galime sukurti skirtingas aplinkas, kameros judesius ir scenas be papildomo filmavimo."] },
          { h4: "Ką AI leidžia sukurti?" },
          { ulb: [
            "Skirtingi rakursai ir kadruotės. Kameros priartėjimai, judėjimas iš skirtingų aukščių, perspektyvų keitimas ir dinamiški produkto pristatymai.",
            "Produkto detalės. Kameros priartėjimai prie audinio tekstūros, siūlių, porankių ir kitų baldo elementų, išryškinant jų dizainą ir medžiagiškumą.",
            "Skirtingos aplinkos. Baldas moderniame, klasikiniame ar minimalistiniame interjere, terasoje arba kitoje pasirinktoje realistiškoje erdvėje.",
            "Žmonės ir gyvūnai. Veikėjų įtraukimas į produkto pristatymo scenas.",
            "Reklaminės istorijos. Kelių scenų pasakojimai su apgalvotu veiksmu, emocija ir montažu.",
            "Sezoniniai pokyčiai. Skirtingas apšvietimas, metų laikai, dekoras ir atmosfera.",
          ] },
          { p: ["Iš vienos ar kelių kokybiškų produkto nuotraukų galime sukurti skirtingus vaizdo įrašus – nuo subtilaus produkto pristatymo iki vientisos reklaminės istorijos. Tai leidžia išplėsti vizualinę komunikaciją neorganizuojant kiekvienai idėjai atskiro filmavimo."] },
          { hr: true },
          { h: "Kada rinktis AI, filmavimą ar abu?" },
          { table: {
            cols: ["Ką norite sukurti?", "Rekomenduojamas būdas", "Sąnaudos*"],
            groups: [
              { h: "Produkto pristatymas", rows: [
                ["Trumpas baldo video baltame fone", "AI video", "€€"],
                ["Papildomi rakursai ir detalių kadrai", "AI video", "€€"],
                ["Baldas skirtinguose interjeruose", "AI video", "€€"],
              ] },
              { h: "Kūrybinė reklama", rows: [
                ["Trumpa kūrybinė reklama", "AI video", "€€"],
                ["Gyvenimo istorija su veikėjais", "AI / hibridinis", "€€–€€€"],
                ["Sezoninė reklama", "AI video", "€€"],
                ["Ilgesnis reklaminis pasakojimas", "AI / hibridinis", "€€€"],
              ] },
              { h: "Produkto funkcijos", rows: [
                ["Sofos-lovos išskleidimo mechanizmas", "Filmavimas", "€€"],
                ["Modulių perstatymas ir funkcijų demonstravimas", "Filmavimas / hibridinis", "€€–€€€"],
              ] },
              { h: "Hibridiniai sprendimai", rows: [
                ["Tikras filmuotas baldas AI interjere", "Hibridinis", "€€"],
                ["Vienas filmavimas kelioms reklamos versijoms", "Hibridinis", "€€€"],
              ] },
            ],
            note: "* € – mažesnės, €€ – vidutinės, €€€ – didesnės orientacinės gamybos sąnaudos. Tai nėra fiksuotos kainos. Konkretus biudžetas priklauso nuo projekto apimties ir sudėtingumo.",
            legendH: "",
            legend: [],
            after: "",
          } },
          { p: ["AI gali būti ekonomiškesnis kuriant papildomus vaizdo įrašus iš turimų nuotraukų, ypač kai reikia kelių interjerų ar reklamos versijų. Filmavimas tinkamesnis, kai būtina tiksliai parodyti baldo mechanizmus ir realų veikimą. Hibridinis būdas leidžia derinti tikrą filmuotą produktą su AI sukurtomis aplinkomis ar papildomomis scenomis."] },
          { hr: true },
          { h: "Svarbu žinoti" },
          { p: [
            "AI leidžia kurti tikroviškas scenas su žmonėmis, gyvūnais ir jų sąveika su baldais. Tačiau ne visada galima užtikrinti visišką produkto detalių ir sudėtingų judesių tikslumą.",
            "Kai svarbu tiksliai parodyti baldo mechanizmus, funkcionalumą ar tikrąsias fizines savybes, rekomenduojame realų filmavimą arba hibridinį sprendimą. Kiekvienam projektui tinkamiausią būdą parenkame individualiai.",
          ] },
          { hr: true },
          { h: "Video pavyzdžiai" },
          { imgs: [everyoneFits, findMedia("the-armchair"), findMedia("sofa-360")], vid: true },
          { imgs: reklamosVideo, first: "wide", uniform: true },
        ],
      },
    ],
  },
];

export interface ResolvedSection { key: string; title: string; parts: (Part & { media?: Media[] })[] }
export const resolve = (c: Collection): { sections: ResolvedSection[]; all: Media[] } => {
  const all: Media[] = [];
  const sections = c.sections.map((s) => ({
    key: s.key, title: s.title,
    parts: s.parts.map((p) => {
      if ("imgs" in p) { all.push(...p.imgs); return { ...p, media: p.imgs }; }
      if ("ids" in p) { const media = p.ids.map((id) => findMedia(id)); all.push(...media); return { ...p, media }; }
      return p;
    }),
  }));
  return { sections, all };
};
