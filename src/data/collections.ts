// Private collections: unlisted pages for sharing a set of work with one client. They are not linked from anywhere on the site,
// carry noindex, and stay out of the sitemap. The address is /p/<slug>/ - keep the slug long enough that nobody can guess it.
// A section is a list of parts shown in order: a heading, a small label, paragraphs, a sub-heading, and pictures/videos.
import { findMedia, type Media } from "./portfolio";

export type Part =
  | { h: string }
  | { h4: string }
  | { label: string }
  | { p: string[] }
  | { ul: string[] }
  | { hr: true }
  | { imgs: Media[]; first?: "wide" }   // first = the first picture spans the full width
  | { ids: string[] };                  // pictures or videos that already exist on the site, by id
export interface CollectionSection { key: string; title: string; parts: Part[] }
export interface Collection { slug: string; title: string; kicker: string; intro: string; sections: CollectionSection[] }

const photo = (file: string, w: number, h: number, alt: string): Media => ({
  id: "mb-" + file, kind: "image", title: { en: alt, lt: alt },
  cover: `/assets/img/collections/minksti-baldai/${file}-800.webp`, ratio: w / h,
  src: `/assets/img/collections/minksti-baldai/${file}.webp`, w, h,
});

const palete = photo("balta-palete", 1600, 1194, "Pilkšvai kreminė sofa baltame fone ir trys jos spalvų variantai su audinio pavyzdžiais: ruda, žalia, pilka");
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

export const collections: Collection[] = [
  {
    slug: "minksti-baldai-7k3q",
    title: "Minksti baldai",
    kicker: "Atskira kolekcija",
    intro: "Minkštų baldų vizualai vienoje vietoje: nuotraukos ir video. Paspausk bet kurį kadrą, kad pamatytum jį didesnį.",
    sections: [
      {
        key: "nuotraukos", title: "Nuotraukos", parts: [
          { h: "Viena nuotrauka. Visa spalvų paletė." },
          { label: "Baltame fone" },
          { imgs: [palete] },
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
            "Tai leidžia pristatyti skirtingus audinių variantus negaminant ir nefotografuojant kiekvieno baldo atskirai.",
          ] },
          { h4: "Ko reikia iš jūsų?" },
          { ul: [
            "Kokybiškos baldo nuotraukos.",
            "Aiškios norimo audinio nuotraukos iš arti, kuriose matoma jo tekstūra.",
            "Nuotraukos, kuriose matyti, kaip tas pats audinys atrodo ant kito baldo ar gaminio.",
          ] },
          { h4: "Svarbu žinoti" },
          { p: ["Ne visais atvejais įmanoma pakeisti baldo audinį naudojant AI. Ne ant kiekvieno esamo audinio galima tikroviškai pritaikyti kitą, todėl prieš pradedant darbą būtina individuali konsultacija, kurios metu įvertiname keitimo galimybes."] },
          { label: "Interjeruose" },
          { imgs: audinysInterjerai },
        ],
      },
      { key: "video", title: "Video", parts: [{ ids: ["the-armchair", "sofa-360"] }] },
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
