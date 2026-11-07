import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  // Pakeisk į savo domeną (BŪTINA SEO: hreflang, sitemap, canonical, OG):
  site: "https://notreal.lt",
  redirects: { "/en": "/", "/en/": "/", "/privatumas": "/lt/privatumas/", "/privatumas/": "/lt/privatumas/", "/en/privacy": "/privacy/", "/en/privacy/": "/privacy/" },

  // SU savu domenu: base "/"  |  BE domeno (username.github.io/not-real/): "/not-real/"
  base: "/",

  integrations: [
    // Sugeneruoja sitemap-index.xml su visais puslapiais (/, /en/, /sv/ ...).
    // hreflang ryšiai tarp kalbų jau yra <head> (Google juos naudoja).
    sitemap(),
  ],
});
