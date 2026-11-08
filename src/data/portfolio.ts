// Single source for the portfolio: videos, the five groups and what the home page shows.
// Files: /public/assets/video/<slug>.mp4 + <slug>.webp (poster); /public/assets/img/... (see gallery.ts).
import { gallery, soxiFrames, type Img } from "./gallery";

export type L = { en: string; lt: string };
export type Lang = "en" | "lt";

export interface Video { slug: string; title: string; titleLt?: string; sub: L; vertical: boolean }
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
  { slug: "bubblegum-city", title: "Oops, My Bad", titleLt: "Ups, netyčia", sub: { en: "Personal AI film", lt: "Asmeninis AI filmas" }, vertical: false },
  { slug: "beyond-the-elements", title: "Element", titleLt: "Stichija", sub: { en: "AI outerwear commercial", lt: "AI viršutinių drabužių reklama" }, vertical: false },
  { slug: "the-armchair", title: "A Room Built Around It", titleLt: "Interjeras aplink jį", sub: { en: "AI product visualisation", lt: "AI produkto vizualizacija" }, vertical: false },
  { slug: "piazza", title: "From Model to Motion", titleLt: "Nuo modelio iki judesio", sub: { en: "AI fashion film created from a 3D model", lt: "AI mados filmas, sukurtas iš 3D modelio" }, vertical: false },
  { slug: "sofa-360", title: "The Turn", titleLt: "Apsisukimas", sub: { en: "360° product visualisation", lt: "360° produkto vizualizacija" }, vertical: false },
  { slug: "scene-08", title: "Crime Scene Presentation", titleLt: "Nusikaltimo vietos pristatymas", sub: { en: "AI cinematic environment", lt: "AI kinematografinė aplinka" }, vertical: false },
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
  return { id: slug, kind: "video", title: { en: v.title, lt: v.titleLt ?? v.title }, sub: v.sub, cover: `/assets/video/${slug}.webp`, ratio: v.vertical ? 4 / 5 : 16 / 10,
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
    intro: { en: "AI films and video ads can make even the most improbable story feel as though it really happened. Your product or service can take the lead. A good story makes people feel something and helps them remember your brand.",
             lt: "AI filmuose ir vaizdo reklamose net neįtikėtina istorija gali atrodyti taip, lyg būtų nutikusi iš tiesų. Jos herojumi gali tapti jūsų produktas ar paslauga. Gera istorija sukelia emociją ir padeda žiūrovams prisiminti jūsų prekės ženklą." },
    cardSub: { en: "Films and ads", lt: "Filmai ir reklamos" },
    items: videos.map((v) => vMedia(v.slug)), slides: ["bubblegum-city", "vesper", "the-armchair", "limone", "beyond-the-elements", "dress-to-kill"].map((s) => `/assets/video/${s}.webp`) },
  { slug: "photography", n: "02", title: { en: "Photo / AI Images", lt: "Foto / AI foto" },
    intro: { en: "The same product or service can tell a different story depending on where it’s seen. An online shop needs a clear image, a catalogue needs a cohesive series, and social media needs a shot worth pausing for.\n\nPhotography and AI make it possible to start with a simple shot on white, explore new angles or colours, use light to bring out textures and build a scene that once existed only in your imagination. Each image is tailored to where it will appear, with your brand’s style tying them together.",
             lt: "Tas pats produktas ar paslauga skirtingose vietose turi pasakoti skirtingas istorijas. E. parduotuvei reikia aiškaus vaizdo, katalogui – vientisos serijos, o socialiniams tinklams – kadro, prie kurio norisi stabtelėti.\n\nFotografija ir AI leidžia pradėti nuo paprasto kadro baltame fone, keisti rakursą ar spalvas, šviesa išryškinti tekstūras ir sukurti sceną, kurią iki šiol tik įsivaizdavote. Vaizdai pritaikomi tam, kur bus rodomi, o visus juos sieja jūsų prekės ženklo stilius." },
    cardSub: { en: "Campaign and product", lt: "Kampanijos ir produktai" },
    items: photographyItems, slides: ["ph-06", "ph-07", "ph-18", "ph-17", "ph-09", "ph-16"].map((id) => ph(id).thumb) },
  { slug: "graphic-design", n: "03", title: { en: "Graphic design", lt: "Grafinis dizainas" },
    intro: { en: "Packaging catches the eye, a catalogue helps people choose, and on screen, motion sets the pace at which a message unfolds.\n\nAI makes it possible to explore several design directions from a single sketch, including styles you might not have considered at first. The chosen direction is refined to fit your brand’s visual identity. Motion design comes in where movement can catch the eye and draw attention to what matters most.",
             lt: "Pakuotė patraukia žvilgsnį, katalogas padeda išsirinkti, o ekrane judesys leidžia žinutę atskleisti pasirinktu ritmu.\n\nSu AI iš vieno eskizo galima greitai išbandyti kelias dizaino kryptis, net ir tokias, apie kurias iš pradžių nepagalvotumėte. Pasirinkta kryptis derinama prie jūsų prekės ženklo vizualinio identiteto. Animuota grafika (motion design) pasitelkiama ten, kur judesys padeda patraukti dėmesį ir išryškinti tai, kas svarbiausia." },
    cardSub: { en: "Posters and type", lt: "Plakatai ir tipografija" },
    items: graphicItems, slides: gd.map((m) => m.thumb) },
  { slug: "brand-identity", n: "04", title: { en: "Brand identity", lt: "Prekės ženklo identitetas" },
    intro: { en: "What makes your product or service distinctive deserves to be seen. Brand identity starts with understanding who it is for, what makes it valuable and why someone would choose it. Research into the audience, competitors and existing communication helps establish a distinctive direction and translate it into design.\n\nThat direction takes shape through the logo, colours, typography, graphics, photography and tone of voice. These elements are developed together and tested where customers encounter the brand: on packaging, websites, social media and advertising.\n\nThe brand guidelines bring these decisions together through practical rules and examples. They give you and your creative collaborators a shared reference, so every new piece of content does not require a fresh decision about how the brand should look or sound. There is room for new ideas, with a consistent and recognisable identity to build on.",
             lt: "Jūsų produkto ar paslaugos išskirtinumas turi būti matomas. Prekės ženklo identiteto kūrimas prasideda nuo jo esmės: kam jis skirtas, kuo vertingas ir kodėl žmogus turėtų pasirinkti būtent jį. Auditorijos, konkurentų ir esamos komunikacijos analizė padeda atrasti savą kryptį ir suteikti jai aiškią kūrybinę išraišką.\n\nŠi kryptis atsiskleidžia logotipe, spalvose, šriftuose, grafikoje, fotografijoje ir bendravimo tone. Sprendimai derinami tarpusavyje ir išbandomi ten, kur prekės ženklą sutinka klientas: ant pakuotės, svetainėje, socialiniuose tinkluose ar reklamoje.\n\nVisa tai sujungiama į prekės ženklo vadovą – brandbooką. Jame pateikiamos naudojimo taisyklės ir konkretūs pavyzdžiai, kad kuriant naują turinį nereikėtų kaskart iš naujo spręsti, kaip jūsų prekės ženklas turi atrodyti ir kalbėti. Tai bendras pagrindas jums ir su jumis dirbantiems kūrėjams: laisvė plėtoti naujas idėjas, išlaikant savitą, vientisą ir atpažįstamą įvaizdį." },
    cardSub: { en: "Logos and brandbooks", lt: "Logotipai ir brand book'ai" }, countLabel: { en: "2 brandbooks", lt: "2 brand book'ai" },
    items: [...nrPages, ...sxPages], slides: [...gallery.brandNR.slice(0, 4), ...gallery.brandSX.slice(0, 2)].map((m) => m.thumb) },
  { slug: "visual-automation", n: "05", title: { en: "Visual automation", lt: "Vizualų automatizavimas" },
    intro: { en: "Build the brand once, then let the workflow make the rest: a Brand Kit that produces on-brand photos, posters, e-shop shots and film from one Space.",
             lt: "Sukurk prekės ženklą vieną kartą, o likusį padaro workflow: Brand Kit, kuris viename Space sukuria prekės ženklo stiliaus nuotraukas, plakatus, e. parduotuvės kadrus ir filmą." },
    cardSub: { en: "Brand Kit workflows", lt: "Brand Kit procesai" }, countLabel: { en: "1 Brand Kit", lt: "1 Brand Kit" },
    items: [vMedia("soxi-film"), ...vaItems], slides: ["va-09", "va-14", "va-20", "va-01", "va-12", "va-17"].map((id) => gallery.visual.find((x) => x.id === id)!.thumb) },
];

/* ---------------- home: living mosaic + About video ---------------- */
const pick = (g: string, ids: string[]) => ids.map((id) => groups.find((x) => x.slug === g)!.items.find((m) => m.id === id)!);
// The mosaic cycles through this pool (first 7 are what you see on load). Same indices are used by the lightbox.
export const mosaicPool: Media[] = [
  ...pick("photography", ["ph-06"]), ...pick("video", ["vesper"]), ...pick("photography", ["ph-03"]),
  ...pick("graphic-design", ["gd-dont-walk-roll"]), ...pick("photography", ["ph-18", "ph-09"]), ...pick("video", ["limone"]),
  ...pick("photography", ["ph-04", "ph-07", "ph-19", "ph-17", "ph-14", "ph-13", "ph-16", "ph-02", "ph-10", "ph-20", "ph-08", "ph-15"]),
  ...pick("video", ["dress-to-kill", "bees", "drinks", "midsummer"]),
  ...pick("graphic-design", ["gd-raw-style"]), ...pick("visual-automation", ["va-09", "va-14", "va-20"]), ...pick("brand-identity", ["nr-04"]),
];
/* Layouts on a 12 x 8 grid: [x, y, w, h] per tile. Slots 0-4 are the five group tiles (Video, Photography, Graphic design, Brand identity,
   Visual automation: always visible, they link to the group pages), slots 5-11 are photo tiles that fade out and come back with new pictures.
   Every layout tiles the grid completely (no gaps). */
export const mosaicLayouts: number[][][] = [
  [[0, 0, 4, 3], [4, 0, 4, 3], [2, 5, 4, 3], [6, 5, 3, 3], [9, 5, 3, 3],   [8, 0, 2, 3], [10, 0, 2, 3], [0, 3, 3, 2], [3, 3, 3, 2], [6, 3, 3, 2], [9, 3, 3, 2], [0, 5, 2, 3]],
  [[3, 3, 4, 3], [3, 0, 4, 3], [7, 6, 5, 2], [7, 0, 3, 3], [3, 6, 4, 2],   [0, 0, 3, 2], [0, 2, 3, 2], [10, 0, 2, 3], [0, 4, 3, 2], [0, 6, 3, 2], [7, 3, 2, 3], [9, 3, 3, 3]],
  [[8, 5, 4, 3], [0, 0, 5, 3], [3, 5, 3, 3], [7, 0, 3, 3], [0, 5, 3, 3],   [5, 0, 2, 3], [10, 0, 2, 3], [0, 3, 4, 2], [4, 3, 4, 2], [8, 3, 2, 2], [10, 3, 2, 2], [6, 5, 2, 3]],
  [[5, 4, 4, 4], [0, 4, 3, 4], [8, 0, 4, 4], [0, 0, 4, 4], [4, 2, 4, 2],   [4, 0, 2, 2], [6, 0, 2, 2], [3, 4, 2, 2], [3, 6, 2, 2], [9, 4, 3, 1], [9, 5, 3, 1], [9, 6, 3, 2]],
];export const introVideo = vMedia("inga-intro");
export const homeLb: (Media & { solo?: boolean })[] = [...mosaicPool, { ...introVideo, solo: true }];
export const introIndex = mosaicPool.length;
export const soxiCover = soxiFrames.find((f) => f.id.includes("04_hero"))!;
