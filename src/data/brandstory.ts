// The SOXI brand-identity story shown on the Brand identity page. LT is Inga's own text; EN is a translation to review.
// Pictures are picked by id from gallery.ts; each block says which pictures appear next to which part of the text.
import { gallery, soxiFrames, type Img } from "./gallery";
import type { L, Media } from "./portfolio";

const all: Img[] = [...Object.values(gallery).flat(), ...soxiFrames];
export const findImg = (id: string): Img => {
  const m = all.find((x) => x.id === id);
  if (!m) throw new Error("brandstory: no picture with id " + id);
  return m;
};

export type BlockType = "pair" | "trio" | "seq" | "grid" | "wide" | "bb";
export interface Block { type: BlockType; ids: string[]; cap?: L }
export interface Sec { n: string; h: L; p: L[]; blocks: Block[] }

export const story = {
  h: { lt: "SOXI – kojinių prekės ženklo identitetas", en: "SOXI – a sock brand identity" } as L,
  lead: {
    lt: "Kojinės, susuktos kaip suši. Tarptautiniam „Magnific One Brand Kit“ konkursui sukurtas konceptualus prekės ženklas: nuo pirmosios idėjos ir logotipo iki produkto, pakuotės, reklamos vaizdų ir prekės ženklo vadovo.",
    en: "Socks rolled like sushi. A concept brand created for the international Magnific One Brand Kit contest: from the first idea and logo to the product, packaging, campaign images and the brand guidelines.",
  } as L,
  win: { lt: "1 vieta · „Magnific One Brand Kit“ konkursas · 2026", en: "1st place · Magnific One Brand Kit contest · 2026" } as L,
  hero: "01_roll-into-socks",
  credit: { lt: "Koncepcija ir kūrybinis įgyvendinimas – Inga Bankauskė / NOT REAL.", en: "Concept and creative direction – Inga Bankauskė / NOT REAL." } as L,
  sections: [
    { n: "01", h: { lt: "Kaip gimė SOXI", en: "How SOXI was born" },
      p: [
        { lt: "Ruošdamasi tarptautiniam konkursui norėjau sukurti ryškią, netikėtą ir įsimenamą idėją. Ieškojau kasdienio daikto, kurį būtų galima pateikti taip, kad į jį norėtųsi pažvelgti dar kartą.",
          en: "Preparing for an international contest, I wanted an idea that was bold, unexpected and memorable. I looked for an everyday object that could be presented in a way that makes you want to look twice." },
        { lt: "Taip gimė kojinės, susuktos kaip suši. Šešios poros juodoje „Omakase“ dėžutėje primena kruopščiai atrinktą degustacinį rinkinį. Ši mintis nulėmė visą tolesnę kūrybą: produkto išvaizdą, pakuotę, spalvas, pavadinimus ir bendravimo toną.",
          en: "That is how socks rolled like sushi were born. Six pairs in a black “Omakase” box feel like a carefully chosen tasting set. This one thought shaped everything that followed: the look of the product, the packaging, the colours, the names and the tone of voice." },
      ],
      blocks: [{ type: "pair", ids: ["p015", "p062"] }] },
    { n: "02", h: { lt: "Produkto forma tampa logotipu", en: "The shape of the product becomes the logo" },
      p: [
        { lt: "Žiūrint į susuktą kojinę iš galo, matyti spiralė. Ji tapo pagrindiniu SOXI ženklu ir pakeitė logotipo raidę O.",
          en: "Looking at a rolled sock from the end, you see a spiral. It became the main SOXI mark and replaced the letter O of the logo." },
        { lt: "Taip logotipas tiesiogiai susijungė su produkto idėja. Spiralė gali veikti ir atskirai: ant pakuotės, tekstilės ar kaip grafinis motyvas reklamos vaizduose. Tas pats ženklas skirtingose vietose padeda susieti visus kūrinius su SOXI.",
          en: "So the logo is tied directly to the idea of the product. The spiral also works on its own: on the packaging, on textiles or as a graphic motif in campaign images. The same mark in different places links every piece back to SOXI." },
      ],
      blocks: [
        { type: "seq", ids: ["p103", "@spiral", "02_logo"], cap: { lt: "Susukta kojinė → spiralės simbolis → SOXI logotipas", en: "Rolled sock → spiral symbol → SOXI logo" } },
        { type: "trio", ids: ["p102", "p063", "p067"] },
      ] },
    { n: "03", h: { lt: "Charakteris įgauna spalvas ir šriftus", en: "The character gets its colours and type" },
      p: [
        { lt: "SOXI charakteris jungia prabangos estetiką ir subtilų humorą. Produktas netikėtas, tačiau jo pateikimas išlieka santūrus ir preciziškas.",
          en: "The SOXI character joins a luxury look with a subtle sense of humour. The product is unexpected, but its presentation stays restrained and precise." },
        { lt: "Kreminė, tamsi nori ir lašišos spalvos sudaro identiteto pagrindą, o kolekcijos spalvos siejamos su skirtingais suši pavadinimais. Išraiškingas „DM Serif Display“ šriftas suteikia antraštėms charakterio, „Inter“ skirtas aiškiai informacijai.",
          en: "Cream, dark nori and salmon form the base of the identity, while the collection colours are tied to different sushi names. The expressive DM Serif Display gives headlines character, and Inter is for clear information." },
        { lt: "Ta pati idėja tęsiama tekstuose: trumpos frazės apie pasirinkimą, rinkinius ir „šefo meniu“ papildo produkto istoriją. Spalvos, tipografija ir kalba kuria bendrą SOXI nuotaiką.",
          en: "The same idea continues in the words: short lines about choice, sets and the “chef’s menu” add to the story of the product. Colour, typography and language create one SOXI mood." },
      ],
      blocks: [
        { type: "pair", ids: ["07_colour", "p058"] },
        { type: "wide", ids: ["sx-06"] },
        { type: "trio", ids: ["p055", "01_roll-into-socks", "05_dont-walk-roll"] },
      ] },
    { n: "04", h: { lt: "Produktas ir pakuotė kuriami kartu", en: "Product and packaging are made together" },
      p: [
        { lt: "Kiekviena iš šešių kojinių porų turi savo spalvą, pavadinimą ir tekstilės motyvą. Susuktos poros sudedamos į atskirus juodos lakuotos dėžutės skyrius, o pakuotę papildo SOXI ženklas ir šviesi „Omakase“ juosta.",
          en: "Each of the six pairs has its own colour, name and textile motif. The rolled pairs sit in separate compartments of a black lacquer box, and the packaging is completed by the SOXI mark and a pale “Omakase” band." },
        { lt: "Dėžutė pratęsia pačią idėją: jos atidarymas tampa kolekcijos pristatymu. Kojinės, jų išdėstymas ir pakuotės detalės suprojektuoti kaip vienas rinkinys.",
          en: "The box extends the idea itself: opening it becomes the presentation of the collection. The socks, their arrangement and the details of the packaging are designed as one set." },
        { lt: "Pirmiausia sukurti produkto ir pakuotės vaizdai baltame fone. Jie tapo atskaitos tašku kuriant tolesnes AI scenas.",
          en: "The product and packaging pictures on white were made first. They became the reference point for the AI scenes that came next." },
      ],
      blocks: [{ type: "grid", ids: ["p104", "p057", "p062", "p058"] }] },
    { n: "05", h: { lt: "SOXI pasaulis", en: "The SOXI world" },
      p: [
        { lt: "Kai produkto išvaizda ir identiteto principai jau buvo apibrėžti, aplink juos pradėtas kurti SOXI pasaulis.",
          en: "Once the look of the product and the principles of the identity were defined, the SOXI world started to grow around them." },
        { lt: "Ryškios spalvų plokštumos, preciziškos kompozicijos, stilizuotos erdvės ir santūrūs veikėjai pratęsia prekės ženklo charakterį. Fotografinei estetikai svarbios audinio tekstūros, odos detalės, šviesa ir lako atspindžiai.",
          en: "Bold planes of colour, precise compositions, stylised spaces and restrained characters carry the character of the brand further. For the photographic look, fabric textures, skin details, light and the reflections on lacquer matter." },
        { lt: "Spiralė persikelia į scenų grafiką, kolekcijos spalvos atsikartoja aplinkoje ir aprangoje. Keičiasi situacijos ir veikėjai, tačiau juos sieja tie patys atpažįstami elementai.",
          en: "The spiral moves into the graphics of the scenes, and the collection colours return in the surroundings and the clothes. Situations and characters change, but the same recognisable elements hold them together." },
      ],
      blocks: [
        { type: "trio", ids: ["04_hero", "p067", "p065"] },
        { type: "trio", ids: ["p063", "p066", "va-14"] },
      ] },
    { n: "06", h: { lt: "Kūrybiniai sprendimai tampa brandbooku", en: "Creative decisions become a brandbook" },
      p: [
        { lt: "Kuriant SOXI, priimti sprendimai buvo surašyti ir parodyti prekės ženklo vadove – brandbooke. Jame apibrėžtas charakteris ir auditorija, logotipo naudojimas, spalvų deriniai, šriftų paskirtis bei bendravimo tonas.",
          en: "While SOXI was being made, the decisions were written down in the brand guidelines, the brandbook. It defines the character and the audience, the use of the logo, colour combinations, the role of each typeface and the tone of voice." },
        { lt: "Vadovas taip pat apima produkto, pakuotės ir vaizdų kūrimo principus: kompoziciją, apšvietimą, medžiagiškumą ir AI darbo eigą. Nurodyta, ką galima keisti kuriant naujas scenas ir kurios detalės turi išlikti pastovios.",
          en: "It also covers the principles for making the product, the packaging and the pictures: composition, lighting, materiality and the AI workflow. It says what may change when new scenes are made and which details must stay fixed." },
        { lt: "Brandbookas leidžia tęsti SOXI kūrybą remiantis aiškiais sprendimais. Nauja reklama ar produkto vaizdas gali būti kitoks, tačiau turi priklausyti tam pačiam prekės ženklui.",
          en: "The brandbook lets the work on SOXI continue from clear decisions. A new ad or product picture may look different, but it has to belong to the same brand." },
      ],
      blocks: [{ type: "bb", ids: ["sx-03", "p104", "sx-05", "p055", "sx-09", "04_hero"] }] },
    { n: "07", h: { lt: "Nuo vienos idėjos iki vientiso prekės ženklo", en: "From one idea to a whole brand" },
      p: [
        { lt: "SOXI prasidėjo nuo susuktos kojinės. Iš jos formos gimė simbolis, iš suši idėjos – kolekcijos spalvos, pavadinimai ir pakuotė. Šie sprendimai vėliau persikėlė į reklamos vaizdus ir buvo apibrėžti brandbooke.",
          en: "SOXI began with a rolled sock. Its shape gave the symbol, and the sushi idea gave the collection colours, names and packaging. These decisions later moved into the campaign images and were set down in the brandbook." },
        { lt: "Projektas pelnė pirmąją vietą tarptautiniame „Magnific One Brand Kit“ konkurse.",
          en: "The project won first place at the international Magnific One Brand Kit contest." },
      ],
      blocks: [{ type: "grid", ids: ["01_roll-into-socks", "p016", "p055", "04_hero", "p104", "p067", "p102", "p015"] }] },
  ] as Sec[],
};

/* every picture the story uses (in order of appearance) – these are the lightbox items that follow the brandbook pages */
export const storyIds: string[] = [];
for (const id of [story.hero, ...story.sections.flatMap((s) => s.blocks.flatMap((b) => b.ids))]) {
  if (!id.startsWith("@") && !storyIds.includes(id)) storyIds.push(id);
}
export const storyMedia = (): Media[] => storyIds.map((id) => {
  const m = findImg(id);
  return { id: "story-" + id, kind: "image", title: { en: "SOXI", lt: "SOXI" }, cover: m.thumb, ratio: m.w / m.h, src: m.src, w: m.w, h: m.h };
});
