// Single source for the portfolio: videos, the five groups and what the home page shows.
// Files: /public/assets/video/<slug>.mp4 + <slug>.webp (poster); /public/assets/img/... (see gallery.ts).
import { gallery, soxiFrames, type Img } from "./gallery";

export type L = { en: string; lt: string };
export type Lang = "en" | "lt";

export interface Video { slug: string; title: string; sub: L; vertical: boolean }
export interface Media {
  id: string;
  kind: "image" | "video";
  title: L;
  sub?: L;
  cover: string;                 // thumbnail / poster path
  ratio: number;                 // width / height of the card picture
  src?: string; w?: number; h?: number;                        // images
  video?: { src: string; poster: string; vertical: boolean };  // videos
}
export interface Group {
  slug: string; n: string; title: L; intro: L; cardSub: L; countLabel?: L;
  items: Media[]; slides: string[];   // slides = images the home card cycles through
}

/* ---------------- videos ---------------- */
export const videos: Video[] = [
  { slug: "bubblegum-city",     title: "Bubblegum City",      sub: { en: "Concept film",                lt: "Koncepcinis filmas" },                 vertical: false },
  { slug: "beyond-the-elements",title: "Beyond the Elements", sub: { en: "Outerwear film",              lt: "Lauko drabužių filmas" },              vertical: false },
  { slug: "the-armchair",       title: "The Armchair",        sub: { en: "From product to interior",    lt: "Nuo produkto iki interjero" },         vertical: false },
  { slug: "piazza",             title: "Piazza",              sub: { en: "Fashion film + 3D scene",     lt: "Mados filmas + 3D scena" },            vertical: false },
  { slug: "sofa-360",           title: "Sofa, 360°",          sub: { en: "Product visualisation",       lt: "Produkto vizualizacija" },             vertical: false },
  { slug: "scene-08",           title: "Scene 08",            sub: { en: "Concept film",                lt: "Koncepcinis filmas" },                 vertical: false },
  { slug: "vesper",             title: "Vesper",              sub: { en: "Headphones · concept ad",     lt: "Ausinės · koncepcinė reklama" },       vertical: true },
  { slug: "drinks",             title: "Splash",              sub: { en: "Drinks, in motion",           lt: "Gėrimai judesyje" },                   vertical: true },
  { slug: "limone",             title: "Limone",              sub: { en: "Beverage · concept ad",       lt: "Gėrimas · koncepcinė reklama" },       vertical: true },
  { slug: "dress-to-kill",      title: "Dress to Kill",       sub: { en: "Fashion story with music",    lt: "Mados istorija su muzika" },           vertical: true },
  { slug: "midsummer",          title: "Midsummer",           sub: { en: "A folk ritual, in motion",    lt: "Joninių ritualas judesyje" },          vertical: true },
  { slug: "bees",               title: "The Hive",            sub: { en: "Macro and nature film",       lt: "Makro ir gamtos filmas" },             vertical: true },
  { slug: "kitchen",            title: "Kitchen",             sub: { en: "Cinematic story",             lt: "Kinematografinė istorija" },           vertical: false },
  { slug: "seamstress",         title: "The Seamstress",      sub: { en: "Period fantasy short",        lt: "Fantastinis trumpametražis" },         vertical: false },
  { slug: "soxi-film",          title: "SOXI",                sub: { en: "Brand film · sock to sushi",  lt: "Prekės ženklo filmas" },               vertical: true },
  { slug: "inga-intro",         title: "Hello, I'm Inga",     sub: { en: "Intro film",                  lt: "Pasisveikinimo filmas" },              vertical: true },
];
export const heroSlugs = ["bubblegum-city", "beyond-the-elements", "the-armchair", "piazza", "sofa-360", "scene-08"];
export const heroVideos = heroSlugs.map((s) => videos.find((v) => v.slug === s)!);

const vMedia = (slug: string): Media => {
  const v = videos.find((x) => x.slug === slug)!;
  return { id: slug, kind: "video", title: { en: v.title, lt: v.title }, sub: v.sub, cover: `/assets/video/${slug}.webp`, ratio: v.vertical ? 4 / 5 : 16 / 10,
    video: { src: `/assets/video/${slug}.mp4`, poster: `/assets/video/${slug}.webp`, vertical: v.vertical } };
};
const iMedia = (m: Img, title: L, sub?: L): Media => ({ id: m.id, kind: "image", title, sub, cover: m.thumb, ratio: m.w / m.h, src: m.src, w: m.w, h: m.h });
const byId = (key: string) => (id: string) => gallery[key].find((x) => x.id === id)!;

/* ---------------- photography ---------------- */
const ph = byId("photography");
const photoCaps: Record<string, L> = {
  "ph-06": { en: "Brocade blazer, goose, lake light", lt: "Brokato švarkas, žąsis, ežero šviesa" },
  "ph-03": { en: "Red dress, camel, desert sky", lt: "Raudona suknelė, kupranugaris, dykumos dangus" },
  "ph-04": { en: "Embroidered dress in mid-air", lt: "Siuvinėta suknelė ore" },
  "ph-07": { en: "Perfume bottle on black glass", lt: "Kvepalų flakonas ant juodo stiklo" },
  "ph-09": { en: "Champagne pleated gown", lt: "Šampano spalvos klostuota suknelė" },
  "ph-18": { en: "Poppy field, floating screens", lt: "Aguonų laukas, svyrantys ekranai" },
  "ph-19": { en: "Bubblegum on a rooftop", lt: "Kramtomoji guma ant stogo" },
  "ph-17": { en: "Striped armchair, pink wall", lt: "Dryžuotas fotelis, rožinė siena" },
  "ph-14": { en: "Retro armchair, warm room", lt: "Retro fotelis, šiltas kambarys" },
  "ph-13": { en: "Cream sofa, modern living room", lt: "Kreminė sofa, modernus kambarys" },
  "ph-16": { en: "Outerwear on a rocky coast", lt: "Lauko drabužiai uolėtame krante" },
  "ph-02": { en: "A car frame made of light", lt: "Šviesos sukurtas automobilio karkasas" },
  "ph-15": { en: "One figure, a blurred subway", lt: "Viena figūra, išsiliejęs metro" },
  "ph-10": { en: "Lace dress in golden grass", lt: "Nėriniuota suknelė auksinėje žolėje" },
  "ph-20": { en: "Perfume in a courtyard", lt: "Kvepalai kieme" },
  "ph-08": { en: "Perfume and candle on a vanity", lt: "Kvepalai ir žvakė ant tualetinio staliuko" },
  "ph-11": { en: "Matchbox product still life", lt: "Degtukų dėžutės natiurmortas" },
  "ph-01": { en: "Children on a cream sofa", lt: "Vaikai ant kreminės sofos" },
};
const photographyOrder = ["ph-06", "ph-03", "ph-04", "ph-07", "ph-09", "ph-18", "ph-19", "ph-17", "ph-14", "ph-13", "ph-16", "ph-02", "ph-15", "ph-10", "ph-20", "ph-08", "ph-11", "ph-01"];
const photographyItems = photographyOrder.map((id) => iMedia(ph(id), photoCaps[id]));

/* ---------------- graphic design ---------------- */
const gd = gallery.graphic;
const gdCaps: Record<string, L> = {
  "gd-dont-walk-roll": { en: "Don't walk. Roll.", lt: "Don't walk. Roll." },
  "gd-raw-style": { en: "Raw style. Well rolled.", lt: "Raw style. Well rolled." },
  "p055": { en: "Six rolls. Zero regrets.", lt: "Six rolls. Zero regrets." },
  "p102": { en: "Poster, man in a red suit", lt: "Plakatas, vyras raudonu kostiumu" },
  "p019": { en: "Roll into socks.", lt: "Roll into socks." },
};
const graphicItems = gd.map((m) => iMedia(m, gdCaps[m.id] ?? { en: "SOXI poster", lt: "SOXI plakatas" }, { en: "SOXI campaign", lt: "SOXI kampanija" }));

/* ---------------- brand identity (selected pages only) ---------------- */
const nrTitles: Record<string, L> = {
  "nr-01": { en: "Cover", lt: "Viršelis" }, "nr-04": { en: "Positioning", lt: "Pozicionavimas" }, "nr-08": { en: "Three logo variants", lt: "Trys logotipo variantai" },
  "nr-14": { en: "Colour by role", lt: "Spalvos pagal roles" }, "nr-19": { en: "Type roles", lt: "Šriftų vaidmenys" }, "nr-23": { en: "Brush highlight and underline", lt: "Teptuko žodžio juosta ir pabraukimas" },
  "nr-24": { en: "Brush library", lt: "Teptuko biblioteka" }, "nr-38": { en: "Carousel slides", lt: "Karuselės skaidrės" }, "nr-41": { en: "Reels cover", lt: "Reels viršelis" }, "nr-45": { en: "Reference image", lt: "Etalono vaizdas" },
};
const sxTitles: Record<string, L> = {
  "sx-01": { en: "Cover", lt: "Viršelis" }, "sx-02": { en: "The idea", lt: "Idėja" }, "sx-03": { en: "The wordmark", lt: "Žodžio ženklas" }, "sx-05": { en: "Colour", lt: "Spalvos" },
  "sx-06": { en: "Typography", lt: "Tipografija" }, "sx-08": { en: "The product", lt: "Produktas" }, "sx-09": { en: "A staged tableau", lt: "Surežiseruota scena" }, "sx-13": { en: "Closing page", lt: "Baigiamasis puslapis" },
};
const nrPages = gallery.brandNR.map((m) => iMedia(m, nrTitles[m.id], { en: "NOT REAL brandbook 4.0.0", lt: "NOT REAL brandbook 4.0.0" }));
const sxPages = gallery.brandSX.map((m) => iMedia(m, sxTitles[m.id], { en: "SOXI Brand Guidelines", lt: "SOXI Brand Guidelines" }));

/* ---------------- visual automation ---------------- */
const vaItems = gallery.visual.map((m, i) => iMedia(m, { en: `SOXI, frame ${i + 1}`, lt: `SOXI, kadras ${i + 1}` }, { en: "One Brand Kit, many frames", lt: "Vienas Brand Kit, daug kadrų" }));

/* ---------------- the five groups ---------------- */
export const groups: Group[] = [
  { slug: "video", n: "01", title: { en: "Video", lt: "Video" },
    intro: { en: "Short films and ads where the product, the light and the feeling stay real, and one idea nobody ordered moves the story.",
             lt: "Trumpi filmai ir reklamos, kuriuose produktas, šviesa ir jausmas lieka tikri, o viena niekieno neužsakyta idėja judina istoriją." },
    cardSub: { en: "Films and ads", lt: "Filmai ir reklamos" },
    items: videos.map((v) => vMedia(v.slug)), slides: ["bubblegum-city", "vesper", "the-armchair", "limone", "beyond-the-elements", "dress-to-kill"].map((s) => `/assets/video/${s}.webp`) },
  { slug: "photography", n: "02", title: { en: "Photography", lt: "Fotografija" },
    intro: { en: "Photography and AI visuals built to one rule: the product looks exactly as the buyer will receive it. Real light, real material, one system.",
             lt: "Fotografija ir AI vizualai pagal vieną taisyklę: produktas atrodo toks, kokį gaus pirkėjas. Tikra šviesa, tikra medžiaga, viena sistema." },
    cardSub: { en: "Campaign and product", lt: "Kampanijos ir produktai" },
    items: photographyItems, slides: ["ph-06", "ph-07", "ph-18", "ph-17", "ph-09", "ph-16"].map((id) => ph(id).thumb) },
  { slug: "graphic-design", n: "03", title: { en: "Graphic design", lt: "Grafinis dizainas" },
    intro: { en: "Posters, type and campaign lines that carry the brand where a photograph alone cannot.",
             lt: "Plakatai, tipografija ir kampanijų frazės, kurios perduoda prekės ženklą ten, kur vien nuotraukos neužtenka." },
    cardSub: { en: "Posters and type", lt: "Plakatai ir tipografija" },
    items: graphicItems, slides: gd.map((m) => m.thumb) },
  { slug: "brand-identity", n: "04", title: { en: "Brand identity", lt: "Prekės ženklo identitetas" },
    intro: { en: "From a name to a system: logo, colour, type, voice and the rules that keep every image on brand. Two brandbooks, shown in selected pages.",
             lt: "Nuo pavadinimo iki sistemos: logotipas, spalvos, šriftai, balsas ir taisyklės, laikančios kiekvieną vaizdą prekės ženklo stiliuje. Du brand book'ai, parodyti pasirinktais puslapiais." },
    cardSub: { en: "Logos and brandbooks", lt: "Logotipai ir brand book'ai" }, countLabel: { en: "2 brandbooks", lt: "2 brand book'ai" },
    items: [...nrPages, ...sxPages], slides: [...gallery.brandNR.slice(0, 4), ...gallery.brandSX.slice(0, 2)].map((m) => m.thumb) },
  { slug: "visual-automation", n: "05", title: { en: "Visual automation", lt: "Vizualų automatizavimas" },
    intro: { en: "Build the brand once, then let the workflow make the rest: a Brand Kit that produces on-brand photos, posters, e-shop shots and film from one Space.",
             lt: "Sukurk prekės ženklą vieną kartą, o likusį padaro workflow: Brand Kit, kuris viename Space sukuria prekės ženklo stiliaus nuotraukas, plakatus, e. parduotuvės kadrus ir filmą." },
    cardSub: { en: "Brand Kit workflows", lt: "Brand Kit procesai" }, countLabel: { en: "1 Brand Kit", lt: "1 Brand Kit" },
    items: [vMedia("soxi-film"), ...vaItems], slides: ["va-09", "va-14", "va-20", "va-01", "va-12", "va-17"].map((id) => gallery.visual.find((x) => x.id === id)!.thumb) },
];

/* ---------------- home: marquee + About video ---------------- */
const pick = (g: string, ids: string[]) => ids.map((id) => groups.find((x) => x.slug === g)!.items.find((m) => m.id === id)!);
export const marqueeItems: Media[] = [
  ...pick("photography", ["ph-06", "ph-03", "ph-04", "ph-07"]),
  ...pick("video", ["vesper", "limone"]),
  ...pick("photography", ["ph-18", "ph-17", "ph-09", "ph-19"]),
  ...pick("graphic-design", ["gd-dont-walk-roll"]),
  ...pick("video", ["dress-to-kill", "bees"]),
  ...pick("photography", ["ph-14", "ph-16", "ph-13"]),
  ...pick("visual-automation", ["va-09", "va-14"]),
  ...pick("video", ["drinks"]),
  ...pick("photography", ["ph-02", "ph-10"]),
  ...pick("brand-identity", ["nr-04"]),
];
export const introVideo = vMedia("inga-intro");
export const soxiCover = soxiFrames.find((f) => f.id.includes("04_hero"))!;

/* marquee layout: clusters of one big tile + two small ones; the home lightbox list = marquee items + the intro video */
const usable = marqueeItems.slice(0, marqueeItems.length - (marqueeItems.length % 3));
export const marqueeClusters = Array.from({ length: usable.length / 3 }, (_, c) => ({
  flip: c % 2 === 1,
  tiles: usable.slice(c * 3, c * 3 + 3).map((m, k) => ({ m, i: c * 3 + k })),
}));
export const homeLb: (Media & { solo?: boolean })[] = [...marqueeItems, { ...introVideo, solo: true }];
export const introIndex = marqueeItems.length;
