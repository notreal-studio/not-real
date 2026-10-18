import { works } from "./works";
import { gallery, soxiFrames, type Img } from "./gallery";

export type Cat = "photos" | "brandbooks" | "video" | "ads";
export type Lang2 = { en: string; lt: string };

export interface Item {
  id: string;
  type: "video" | "gallery" | "case";
  cats: Cat[];
  title: string;
  sub: Lang2;
  cover: string;            // image shown on the card
  ratio: number;            // card media width / height
  video?: { src: string; poster: string; vertical: boolean };
  images?: Img[];
  href?: Lang2;             // for type "case"
}

const vid = (slug: string, cats: Cat[]): Item => {
  const w = works.find((x) => x.slug === slug)!;
  return {
    id: slug, type: "video", cats, title: w.title, sub: w.sub,
    cover: `/assets/video/${slug}.jpg`, ratio: w.vertical ? 4 / 5 : 16 / 10,
    video: { src: `/assets/video/${slug}.mp4`, poster: `/assets/video/${slug}.jpg`, vertical: w.vertical },
  };
};
const gal = (id: string, key: string, title: string, sub: Lang2, cats: Cat[], coverIdx = 0): Item => {
  const imgs = gallery[key];
  const c = imgs[coverIdx];
  return { id, type: "gallery", cats, title, sub, cover: c.thumb, ratio: c.w / c.h, images: imgs };
};

const soxiHero = soxiFrames.find((f) => f.src.includes("04_hero"))!;

export const items: Item[] = [
  { id: "soxi", type: "case", cats: ["brandbooks"], title: "SOXI", sub: { en: "From a name to a campaign", lt: "Nuo vardo iki kampanijos" },
    cover: soxiHero.thumb, ratio: soxiHero.w / soxiHero.h, href: { en: "/work/soxi/", lt: "/lt/work/soxi/" } },
  vid("bubblegum-city", ["video"]),
  gal("look-twice", "look", "Look Twice", { en: "Believable. Then wrong.", lt: "Tikėtina. Tada neteisinga." }, ["photos"]),
  vid("vesper", ["video", "ads"]),
  gal("soxi-posters", "soxiPosters", "SOXI — Posters", { en: "Type posters, one recipe", lt: "Tipografiniai plakatai, vienas receptas" }, ["ads"]),
  vid("striped-armchair", ["video"]),
  gal("armchair-rooms", "armchair", "The Armchair — Rooms", { en: "One chair, twelve worlds", lt: "Vienas fotelis, dvylika pasaulių" }, ["photos"], 4),
  vid("lemon-coast", ["video", "ads"]),
  gal("soxi-shop", "soxiShop", "SOXI — E-shop & editorial", { en: "One product, many angles", lt: "Vienas produktas, daug kampų" }, ["photos"], 7),
  vid("everyone-fits", ["video", "ads"]),
  gal("soxi-sheets", "soxiSheets", "SOXI — Brand sheets", { en: "Colour, logo, characters", lt: "Spalvos, logotipas, personažai" }, ["brandbooks"], 1),
  vid("italy-street", ["video"]),
  vid("beverage-splash", ["video", "ads"]),
  vid("soxi-film", ["video", "ads"]),
  vid("babushka-kitchen", ["video"]),
  vid("csi-bedroom", ["video"]),
  vid("sofa-360", ["video"]),
];
