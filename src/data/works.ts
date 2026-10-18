// Portfolio videos. Files live in public/assets/video/<slug>.mp4 (+ <slug>.jpg poster).
// All current pieces are the studio's own concept work, so every entry is flagged as such.
export interface Work {
  slug: string;
  title: string;                       // brand/piece name, same in every language
  sub: { en: string; lt: string };     // italic line under the title
  vertical: boolean;                   // 9:16 source
  kind: "ad" | "film" | "product";
}

export const works: Work[] = [
  { slug: "bubblegum-city",   title: "Bubblegum City",  sub: { en: "Concept film",                lt: "Koncepcinis filmas" },        vertical: false, kind: "film" },
  { slug: "vesper",           title: "Vesper",          sub: { en: "Headphones · concept ad",     lt: "Ausinės · koncepcinė reklama" }, vertical: true,  kind: "ad" },
  { slug: "striped-armchair", title: "The Armchair",    sub: { en: "From product to interior",    lt: "Nuo produkto iki interjero" }, vertical: false, kind: "product" },
  { slug: "lemon-coast",      title: "Limone",          sub: { en: "Beverage · concept ad",       lt: "Gėrimas · koncepcinė reklama" }, vertical: true,  kind: "ad" },
  { slug: "everyone-fits",    title: "Everyone Fits",   sub: { en: "Sofa · concept campaign",     lt: "Sofa · koncepcinė kampanija" }, vertical: true,  kind: "ad" },
  { slug: "italy-street",     title: "Piazza",          sub: { en: "Fashion film + 3D scene",     lt: "Mados filmas + 3D scena" },    vertical: false, kind: "film" },
  { slug: "beverage-splash",  title: "Splash",          sub: { en: "Drinks, in motion",           lt: "Gėrimai judesyje" },           vertical: true,  kind: "ad" },
  { slug: "babushka-kitchen", title: "Kitchen",         sub: { en: "Cinematic story",             lt: "Kinematografinė istorija" },   vertical: false, kind: "film" },
  { slug: "csi-bedroom",      title: "Scene 08",        sub: { en: "Concept film",                lt: "Koncepcinis filmas" },         vertical: false, kind: "film" },
  { slug: "sofa-360",         title: "Sofa, 360°",      sub: { en: "Product visualisation",       lt: "Produkto vizualizacija" },     vertical: false, kind: "product" },
];

// Order of the full-screen reel at the top of the home page.
export const heroSlugs = ["bubblegum-city", "vesper", "striped-armchair", "lemon-coast", "everyone-fits", "italy-street"];
export const heroWorks = heroSlugs.map((s) => works.find((w) => w.slug === s)!);
