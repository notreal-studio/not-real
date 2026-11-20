// Private collections: unlisted pages for sharing a set of work with one client. They are not linked from anywhere on the site,
// carry noindex, and stay out of the sitemap. The address is /p/<slug>/ - keep the slug long enough that nobody can guess it.
import { findMedia, type Media } from "./portfolio";

export interface CollectionSection { key: string; title: string; ids: string[] }
export interface Collection { slug: string; title: string; kicker: string; intro: string; sections: CollectionSection[] }

export const collections: Collection[] = [
  {
    slug: "minksti-baldai-7k3q",
    title: "Minksti baldai",
    kicker: "Atskira kolekcija",
    intro: "Minkštų baldų vizualai vienoje vietoje: nuotraukos, video ir grafika. Paspausk bet kurį kadrą, kad pamatytum jį didesnį.",
    sections: [
      { key: "nuotraukos", title: "Nuotraukos", ids: ["ph-13", "ph-17", "ph-14", "ph-01"] },
      { key: "video", title: "Video", ids: ["the-armchair", "sofa-360"] },
      { key: "grafika", title: "Grafika", ids: ["gd-n13"] },
    ],
  },
];

export const sectionMedia = (c: Collection): { key: string; title: string; items: Media[] }[] =>
  c.sections.map((s) => ({ key: s.key, title: s.title, items: s.ids.map((id) => findMedia(id)) }));
