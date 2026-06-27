import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  // Pakeisk į savo domeną (BŪTINA SEO: hreflang, sitemap, canonical, OG):
  site: "https://notreal-studio.github.io",

  // SU savu domenu: base "/"  |  BE domeno (username.github.io/not-real/): "/not-real/"
  base: "/not-real/",

  integrations: [
    // Sugeneruoja sitemap-index.xml su visais puslapiais (/, /en/, /sv/ ...).
    // hreflang ryšiai tarp kalbų jau yra <head> (Google juos naudoja).
    sitemap(),
  ],
});
