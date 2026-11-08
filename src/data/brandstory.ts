// The SOXI brand-identity story shown on the Brand identity page. LT is Inga's own text; EN is a translation to review.
// Pictures are picked by id from gallery.ts; each block says which pictures appear next to which part of the text.
import { gallery, soxiFrames, type Img } from "./gallery";
import type { L, Media } from "./portfolio";

export const BOOK_PAGES = 34;   // pages of SOXI_Brand_Guidelines_v2.0.pdf, rendered to /assets/img/soxi-brandbook/sb-NN.webp
const bookImgs: Img[] = Array.from({ length: BOOK_PAGES }, (_, i) => { const n = String(i + 1).padStart(2, "0"); return { id: "sb-" + n, src: `/assets/img/soxi-brandbook/sb-${n}.webp`, thumb: `/assets/img/soxi-brandbook/sb-${n}-640.webp`, w: 1800, h: 1013 }; });
const all: Img[] = [...Object.values(gallery).flat(), ...soxiFrames, ...bookImgs];
export const findImg = (id: string): Img => {
  const m = all.find((x) => x.id === id);
  if (!m) throw new Error("brandstory: no picture with id " + id);
  return m;
};

export type BlockType = "pair" | "trio" | "seq" | "grid" | "wide" | "bb";
export interface Block { type: BlockType; ids: string[]; cap?: L }
export interface Sec { n: string; h: L; p: L[]; blocks: Block[] }

export const story = {
  h: { lt: "SOXI – konceptualus kojinių prekės ženklas ir jo identitetas", en: "SOXI – a concept sock brand and its identity" } as L,
  lead: {
    lt: "SOXI – tarptautiniam „Magnific One Brand Kit“ konkursui sukurtas konceptualus kojinių prekės ženklas, pelnęs pirmąją vietą. Projektas apima produkto ir pakuotės dizaino koncepciją, vizualinį identitetą, komunikacijos toną, AI kampanijos vaizdus ir prekės ženklo vadovą.",
    en: "SOXI is a concept sock brand created for the international Magnific One Brand Kit contest, where it won first place. The project covers the product and packaging design concept, the visual identity, the tone of voice, AI campaign images and the brand guidelines.",
  } as L,
  win: { lt: "1 vieta · „Magnific One Brand Kit“ konkursas · 2026", en: "1st place · Magnific One Brand Kit contest · 2026" } as L,
  hero: "01_roll-into-socks",
  book: { lt: "Peržiūrėti visą brandbooką", en: "View the whole brandbook" } as L,
  credit: { lt: "Koncepcija, dizainas ir AI vizualizacijos – Inga Bankauskė / NOT REAL.", en: "Concept, design and AI visuals – Inga Bankauskė / NOT REAL." } as L,
  sections: [
    { n: "01", h: { lt: "Idėja: kojinės kaip suši", en: "The idea: socks as sushi" },
      p: [
        { lt: "SOXI koncepciją sukūriau sujungdama kasdienį produktą su netikėtu jo pateikimu: šešios kojinių poros susuktos kaip suši ir sudėtos į juodą lakuotą „Omakase“ dėžutę. Kiekviena pora turi savo spalvą ir suši įkvėptą pavadinimą.",
          en: "I built the SOXI concept by joining an everyday product with an unexpected way of presenting it: six pairs of socks rolled like sushi and set in a black lacquered “Omakase” box. Each pair has its own colour and a sushi-inspired name." },
        { lt: "Prekės ženklo charakterį grindžiau prabangos estetika ir subtiliu humoru. Pati produkto idėja žaisminga, todėl jos pateikimą pasirinkau santūrų: preciziška pakuotė, apgalvotos kompozicijos ir trumpi tekstai.",
          en: "I based the character of the brand on a luxury look and subtle humour. The product idea itself is playful, so I chose a restrained way to present it: precise packaging, considered compositions and short texts." },
        { lt: "SOXI skirtas dizainą vertinantiems žmonėms, ieškantiems neįprastų daiktų ir išskirtinių dovanų. Ši kryptis nulėmė tolesnius produkto, identiteto ir kampanijos sprendimus.",
          en: "SOXI is for people who value design and look for unusual things and distinctive gifts. This direction shaped the product, identity and campaign decisions that followed." },
      ],
      blocks: [{ type: "trio", ids: ["p015", "p062", "p057"] }] },
    { n: "02", h: { lt: "Logotipas ir atpažinimo ženklas", en: "Logo and identity mark" },
      p: [
        { lt: "Logotipo raidę O pakeičiau spirale, primenančia susuktos kojinės pjūvį. Taip pagrindinis prekės ženklo simbolis kilo iš paties produkto formos.",
          en: "I replaced the letter O of the logo with a spiral that echoes the cross-section of a rolled sock. So the main symbol of the brand comes from the shape of the product itself." },
        { lt: "Lašišos spalvos spiralė derinama su „DM Serif Display“ raidėmis. Logotipas sukurtas kaip plokščias vektorinis ženklas, be šešėlių, gradientų ir tekstūrų. Brandbooke apibrėžti jo spalviniai variantai, naudojimas skirtinguose fonuose, apsaugos zona ir netinkamo naudojimo pavyzdžiai.",
          en: "The salmon-coloured spiral is combined with DM Serif Display letters. The logo is a flat vector mark, without shadows, gradients or textures. The brandbook defines its colour versions, use on different backgrounds, clear space and examples of misuse." },
        { lt: "Spiralės motyvą pritaikiau ir už logotipo ribų: ant pakuotės, produkto detalėse bei kampanijos scenose. Jo pasikartojimas susieja skirtingus kūrinius su SOXI.",
          en: "I also used the spiral motif beyond the logo: on the packaging, in product details and in campaign scenes. Its repetition links different pieces to SOXI." },
      ],
      blocks: [
        { type: "seq", ids: ["p103", "@spiral", "02_logo"], cap: { lt: "Susukta kojinė → spiralės simbolis → SOXI logotipas", en: "Rolled sock → spiral symbol → SOXI logo" } },
        { type: "trio", ids: ["sb-08", "sb-09", "sb-12"], cap: { lt: "Brandbooke: septyni variantai, apsaugos zona, ko nedaryti", en: "In the brandbook: seven versions, clear space, what never to do" } },
        { type: "trio", ids: ["va-09", "p063", "p067"], cap: { lt: "Spiralė ant pakuotės, produkto detalėse ir kampanijos scenoje", en: "The spiral on the packaging, in product details and in a campaign scene" } },
      ] },
    { n: "03", h: { lt: "Spalvų sistema: nuo identiteto iki kolekcijos", en: "Colour system: from identity to collection" },
      p: [
        { lt: "Spalvų sistemą sudaro pagrindinė prekės ženklo paletė ir atskiroms kojinių poroms skirti atspalviai.",
          en: "The colour system consists of the main brand palette and the shades given to each pair of socks." },
        { lt: "Pagrindinėje paletėje kiekviena spalva turi savo paskirtį: kreminė „Rice“ naudojama šviesiems fonams ir etiketėms, tamsiai žalia „Nori“ – tekstui ir tamsiems paviršiams, „Salmon“ – spiralei bei akcentams, o „Wasabi“ papildo derinius žaliu akcentu.",
          en: "In the main palette every colour has its role: cream “Rice” is used for light backgrounds and labels, dark green “Nori” for text and dark surfaces, “Salmon” for the spiral and accents, and “Wasabi” adds a green accent to the combinations." },
        { lt: "Kolekciją sudaro šešios spalvinės kryptys: raudona „Tuna“, geltona „Tamago“, persikinė „Ebi“, žalia „Avocado“, ruda „Unagi“ ir raudonai oranžinė „Ikura“.",
          en: "The collection has six colour directions: red “Tuna”, yellow “Tamago”, peach “Ebi”, green “Avocado”, brown “Unagi” and red-orange “Ikura”." },
        { lt: "Šios spalvos iš produkto pereina į veikėjų aprangą, aplinkas ir kampanijos grafiką. Taip kolekcija ir jos reklaminis pateikimas išlaiko bendrą charakterį.",
          en: "These colours move from the product into the characters’ clothes, the settings and the campaign graphics. This way the collection and its advertising keep one shared character." },
      ],
      blocks: [
        { type: "pair", ids: ["sb-13", "sb-14"], cap: { lt: "Keturios pagrindinės spalvos ir šešios kolekcijos spalvos", en: "Four core colours and six collection colours" } },
        { type: "trio", ids: ["p058", "sb-16", "p017"] },
      ] },
    { n: "04", h: { lt: "Tipografija ir komunikacijos tonas", en: "Typography and tone of voice" },
      p: [
        { lt: "Tipografijai pasirinkau dvi šriftų šeimas. „DM Serif Display“ suteikia antraštėms išraiškingumo, o „Inter“ naudojamas etiketėms, aprašymams ir kitai informacijai. Aiškus jų paskirčių atskyrimas padeda išlaikyti nuoseklią tekstų hierarchiją.",
          en: "For typography I chose two type families. DM Serif Display gives headlines expression, while Inter is used for labels, descriptions and other information. A clear split of their roles keeps the text hierarchy consistent." },
        { lt: "SOXI kalba trumpai, santūriai ir su subtiliu humoru. Tekstuose naudojami suši meniu žodžiai ir pasirinkimo tema: „roll“, „pair“, „set“, „chef“, „menu“, „selection“.",
          en: "SOXI speaks briefly, with restraint and a little humour. The texts use sushi-menu words and the theme of choice: “roll”, “pair”, “set”, “chef”, “menu”, “selection”." },
        { lt: "Pagrindinė kampanijos frazė – „Roll into socks.“ Ją papildo prekės ženklo šūkis „Rolled for the curious“. Tekstai pratęsia produkto idėją, vengiant perdėtų pažadų ir įkyraus pardavimo tono.",
          en: "The main campaign line is “Roll into socks.” It is supported by the brand slogan “Rolled for the curious”. The texts carry the product idea further, avoiding exaggerated promises and a pushy sales tone." },
      ],
      blocks: [
        { type: "trio", ids: ["sb-17", "sb-18", "sb-05"], cap: { lt: "Brandbooke: šriftai, dydžių skalė ir balso taisyklės", en: "In the brandbook: typefaces, type scale and voice rules" } },
        { type: "trio", ids: ["01_roll-into-socks", "p055", "05_dont-walk-roll"] },
      ] },
    { n: "05", h: { lt: "Produkto ir pakuotės dizainas", en: "Product and packaging design" },
      p: [
        { lt: "Kojinių kolekciją ir pakuotę kūriau kaip bendrą dizaino koncepciją. Kiekvienai porai priskirta spalva, tekstilės motyvas ir pavadinimas ant viršutinės kojinės dalies. Suši temą papildo grafiškai pavaizduotos valgomosios lazdelės.",
          en: "I created the sock collection and the packaging as one design concept. Each pair has an assigned colour, a textile motif and a name on the top of the sock. The sushi theme is supported by graphically drawn chopsticks." },
        { lt: "Juodoje lakuotoje „Omakase“ dėžutėje numatyti šeši skyriai susuktoms poroms. Dangtelį žymi SOXI logotipas, o dėžutę apjuosia šviesi popierinė juosta su užrašu „OMAKASE“.",
          en: "The black lacquered “Omakase” box has six compartments for the rolled pairs. The lid carries the SOXI logo, and a pale paper band with the word “OMAKASE” wraps the box." },
        { lt: "Produkto ir pakuotės koncepciją pateikiau AI vizualizacijomis baltame fone. Šie vaizdai tapo pagrindinėmis nuorodomis kuriant kampaniją ir tikrinant produkto formą, spalvas, raštus bei pakuotės detales skirtingose scenose.",
          en: "I presented the product and packaging concept as AI visualisations on a white background. These images became the main references for building the campaign and for checking the shape, colours, patterns and packaging details of the product in different scenes." },
      ],
      blocks: [
        { type: "grid", ids: ["p104", "p062", "p058", "p059"] },
        { type: "pair", ids: ["sb-20", "sb-21"], cap: { lt: "Brandbooke: šešios poros, šeši suši ir „Omakase“ dėžutė", en: "In the brandbook: six pairs, six sushi and the Omakase box" } },
      ] },
    { n: "06", h: { lt: "AI kampanija: SOXI vizualinis pasaulis", en: "AI campaign: the SOXI visual world" },
      p: [
        { lt: "Kampanijos vaizdus kūriau pagal iš anksto apibrėžtą SOXI identitetą. Scenose naudojamos ryškios spalvų plokštumos, aiškios kompozicijos ir spiralės motyvas. Veikėjų apranga bei aplinkos spalvos derinamos su kojinių kolekcija.",
          en: "I built the campaign images from the SOXI identity defined beforehand. The scenes use bold planes of colour, clear compositions and the spiral motif. The characters’ clothes and the colours of the settings are matched with the sock collection." },
        { lt: "Fotografinį įspūdį formuoja švelni šviesa, matoma audinio tekstūra, natūraliai atrodanti oda ir lakuotos pakuotės atspindžiai. Suši idėja perteikiama per produkto formą, spalvas ir pavadinimus, išvengiant tiesioginio restorano interjero ar maisto vaizdavimo.",
          en: "The photographic feel comes from soft light, visible fabric texture, natural-looking skin and the reflections on the lacquered packaging. The sushi idea is carried by the shape, colours and names of the product, avoiding a direct picture of a restaurant interior or of food." },
        { lt: "AI naudotas scenoms ir jų vizualiniams variantams kurti. Galutiniuose maketuose tikslūs logotipai ir tekstai įkomponuoti rankiniu būdu, naudojant originalius vektorinius failus ir pasirinktus šriftus.",
          en: "AI was used to create the scenes and their visual variations. In the final layouts the exact logos and texts were placed by hand, using the original vector files and the chosen typefaces." },
      ],
      blocks: [
        { type: "trio", ids: ["04_hero", "p067", "p065"] },
        { type: "trio", ids: ["p103", "p066", "p057"], cap: { lt: "Audinio tekstūra, oda, lakuotos pakuotės atspindžiai", en: "Fabric texture, skin, reflections on the lacquered packaging" } },
        { type: "pair", ids: ["sb-22", "sb-23"], cap: { lt: "Brandbooke: plokščių spalvų scena ir vienas pasaulis, daug akimirkų", en: "In the brandbook: a staged tableau of flat colour, one world with many moments" } },
      ] },
    { n: "07", h: { lt: "Brandbookas ir projekto rezultatas", en: "The brandbook and the result of the project" },
      p: [
        { lt: "SOXI kūrybinius sprendimus sujungiau į 34 puslapių prekės ženklo vadovą. Jame aprašyta koncepcija, auditorija ir charakteris, logotipo naudojimas, spalvos, tipografija, komunikacijos tonas, produkto bei kampanijos vaizdų kūrimo principai.",
          en: "I brought the SOXI creative decisions together in a 34-page brand guide. It describes the concept, the audience and the character, the use of the logo, colours, typography, the tone of voice and the principles for making product and campaign images." },
        { lt: "Taisyklės ir pavyzdžiai apibrėžia, kurie identiteto elementai turi išlikti pastovūs ir ką galima keisti kuriant naujus darbus. Tai pagrindas tolesnei SOXI kūrybai – nuo produkto vaizdo iki naujos reklamos kampanijos.",
          en: "The rules and examples define which elements of the identity must stay fixed and what may change when new work is made. It is the base for continuing SOXI, from a product picture to a new ad campaign." },
        { lt: "Projektas pelnė pirmąją vietą tarptautiniame „Magnific One Brand Kit“ konkurse.",
          en: "The project won first place at the international Magnific One Brand Kit contest." },
      ],
      blocks: [
        { type: "trio", ids: ["sb-01", "sb-07", "sb-34"] },
        { type: "grid", ids: ["01_roll-into-socks", "p016", "p055", "04_hero", "p104", "p067", "p102", "p015"] },
      ] },
  ] as Sec[],
};
/* every picture the story uses (in order of appearance) – these are the lightbox items that follow the brandbook pages */
export const storyIds: string[] = [];
for (const id of [story.hero, ...story.sections.flatMap((s) => s.blocks.flatMap((b) => b.ids))]) {
  if (!id.startsWith("@") && !storyIds.includes(id)) storyIds.push(id);
}
export const storyMedia = (): Media[] => storyIds.map((id) => {
  const m = findImg(id);
  return { id: "story-" + id, kind: "image", title: { en: "SOXI", lt: "SOXI" }, cover: m.thumb, ratio: m.w / m.h, src: m.src, w: m.w, h: m.h, grp: "story" };
});

/* the whole SOXI brandbook, its own lightbox group: the viewer shows only these pages, never the story pictures */
export const bookMedia = (): Media[] => Array.from({ length: BOOK_PAGES }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  return { id: "sb-" + n, kind: "image", title: { en: "SOXI brandbook", lt: "SOXI brandbookas" }, sub: { en: `Page ${i + 1} / ${BOOK_PAGES}`, lt: `Puslapis ${i + 1} / ${BOOK_PAGES}` },
    cover: `/assets/img/soxi-brandbook/sb-${n}-640.webp`, ratio: 1800 / 1013, src: `/assets/img/soxi-brandbook/sb-${n}.webp`, w: 1800, h: 1013, grp: "book" } as Media;
});
