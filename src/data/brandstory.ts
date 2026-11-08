// The SOXI brand-identity story shown on the Brand identity page. LT is Inga's own text; EN is a translation to review.
// Pictures are picked by id from gallery.ts; each block says which pictures appear next to which part of the text.
import { gallery, soxiFrames, type Img } from "./gallery";
import type { L, Media } from "./portfolio";

export interface BookDef { prefix: string; dir: string; pages: number; w: number; h: number }
export const SOXI_BOOK: BookDef = { prefix: "sb", dir: "soxi-brandbook", pages: 34, w: 1800, h: 1013 };   // SOXI_Brand_Guidelines_v2.0.pdf
export const NR_BOOK: BookDef = { prefix: "nb", dir: "nr-brandbook", pages: 62, w: 1700, h: 956 };          // NOT_REAL_brandbook_4.0.0_web.pdf
const bookPageImgs = (b: BookDef): Img[] => Array.from({ length: b.pages }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  return { id: `${b.prefix}-${n}`, src: `/assets/img/${b.dir}/${b.prefix}-${n}.webp`, thumb: `/assets/img/${b.dir}/${b.prefix}-${n}-640.webp`, w: b.w, h: b.h };
});
// ALDEMA serum campaign (concept): the same bottle in four different scenes
const aldema: Img[] = [["al-01", 928, 1152], ["al-02", 1100, 1467], ["al-03", 928, 1152], ["al-04", 928, 1152]].map(([id, w, h]) => ({ id: id as string, src: `/assets/img/aldema/${id}.webp`, thumb: `/assets/img/aldema/${id}-640.webp`, w: w as number, h: h as number }));
// real artwork cropped out of the NOT REAL brandbook pages (carousel slides, closing frame)
const examples: Img[] = [["ex-s1", 1014, 1273], ["ex-s2", 1014, 1273], ["ex-s3", 1014, 1273], ["ex-end", 1400, 787]].map(([id, w, h]) => ({ id: id as string, src: `/assets/img/nr-brandbook/${id}.webp`, thumb: `/assets/img/nr-brandbook/${id}-640.webp`, w: w as number, h: h as number }));
const all: Img[] = [...Object.values(gallery).flat(), ...soxiFrames, ...bookPageImgs(SOXI_BOOK), ...bookPageImgs(NR_BOOK), ...aldema, ...examples];export const findImg = (id: string): Img => {
  const m = all.find((x) => x.id === id);
  if (!m) throw new Error("brandstory: no picture with id " + id);
  return m;
};

export type BlockType = "pair" | "trio" | "seq" | "grid" | "wide" | "bb" | "logos" | "palette" | "typo" | "onphoto" | "bands" | "checks" | "mockups" | "labelled" | "slides";
export interface Block { type: BlockType; ids: string[]; cap?: L; labels?: L[]; link?: { to: "soxi" | "not-real"; t: L } }
export type Para = L & { k?: L };            // k = bold lead-in word(s)
export interface Sec { n: string; h: L; p: Para[]; blocks: Block[] }
export interface Story { name: string; h: L; lead: L; win: L; hero: string; bookLabel: L; book: BookDef; credit: L; foot?: { to: "soxi" | "not-real"; t: L }; sections: Sec[] }

export const soxiStory: Story = {
  name: "SOXI", book: SOXI_BOOK,
  h: { lt: "SOXI – konceptualus kojinių prekės ženklas ir jo identitetas", en: "SOXI – a concept sock brand and its identity" } as L,
  lead: {
    lt: "SOXI – tarptautiniam „Magnific One Brand Kit“ konkursui sukurtas konceptualus kojinių prekės ženklas, pelnęs pirmąją vietą. Projektas apima produkto ir pakuotės dizaino koncepciją, vizualinį identitetą, komunikacijos toną, AI kampanijos vaizdus ir prekės ženklo vadovą.",
    en: "SOXI is a concept sock brand created for the international Magnific One Brand Kit contest, where it won first place. The project covers the product and packaging design concept, the visual identity, the tone of voice, AI campaign images and the brand guidelines.",
  } as L,
  win: { lt: "1 vieta · „Magnific One Brand Kit“ konkursas · 2026", en: "1st place · Magnific One Brand Kit contest · 2026" } as L,
  hero: "01_roll-into-socks",
  bookLabel: { lt: "Peržiūrėti visą brandbooką", en: "View the whole brandbook" } as L,
  credit: { lt: "Koncepcija, dizainas ir AI vizualizacijos – Inga Bankauskė / NOT REAL.", en: "Concept, design and AI visuals – Inga Bankauskė / NOT REAL." } as L,
  foot: { to: "not-real", t: { lt: "Studijos identitetas: NOT REAL", en: "The studio identity: NOT REAL" } },
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
/* ---------------- NOT REAL: the studio brand (brandbook 4.0.0, 62 pages). LT is Inga's text; EN is a translation to review. ---------------- */
export const nrStory: Story = {
  name: "NOT REAL", book: NR_BOOK,
  h: { lt: "NOT REAL – fotografijos, grafinio dizaino ir AI kūrybos studija", en: "NOT REAL – a studio for photography, graphic design and AI creation" },
  lead: {
    lt: "NOT REAL – mano, Ingos Bankauskės, kūrybinė studija, jungianti fotografijos patirtį, grafinį dizainą ir AI vaizdų kūrimą. Jos identitetą sukūriau remdamasi savo estetika ir darbo principais. Juos aprašiau 62 puslapių prekės ženklo vadove, kuris padeda nuosekliai pristatyti studiją ir jos darbus.",
    en: "NOT REAL is my creative studio, Inga Bankauskė’s, joining photography experience, graphic design and AI image making. I built its identity from my own taste and ways of working, and set them down in a 62-page brand guide that helps present the studio and its work consistently.",
  },
  win: { lt: "Real feeling. Unreal ideas.", en: "Real feeling. Unreal ideas." },
  hero: "nb-01",
  bookLabel: { lt: "Peržiūrėti visą brandbooką", en: "View the whole brandbook (in Lithuanian)" },
  credit: { lt: "Identiteto idėja ir dizainas – Inga Bankauskė / NOT REAL.", en: "Identity concept and design – Inga Bankauskė / NOT REAL." },
  foot: { to: "soxi", t: { lt: "Kaip tai atrodo praktikoje: SOXI projektas", en: "How it looks in practice: the SOXI project" } },
  sections: [
    { n: "01", h: { lt: "Pavadinimas ir kūrybinis principas", en: "The name and the creative principle" },
      p: [
        { k: { lt: "Atvirumas.", en: "Openness." }, lt: "Pavadinimą NOT REAL pasirinkau dėl paprastumo ir tiesumo. Juo iš karto pasakau, kad vaizdas gali būti sukurtas pasitelkiant AI. Tai mano kūrybos dalis, kurią įvardiju atvirai.",
          en: "I chose the name NOT REAL for its simplicity and directness. It says at once that an image may have been made with AI. That is part of my work, and I name it openly." },
        { k: { lt: "Provokacija.", en: "Provocation." }, lt: "Dar prieš žmogui paklausiant, ar tai tikra, pavadinimas atsako – „NOT REAL“. Tuomet pats darbas turi parodyti, kaip įtikinamai galima perteikti šviesą, medžiagas, aplinką ir emociją.",
          en: "Before anyone can ask whether it is real, the name answers: “NOT REAL”. Then the work itself has to show how convincingly light, materials, setting and emotion can be conveyed." },
        { k: { lt: "Fotografija ir AI.", en: "Photography and AI." }, lt: "Studijoje dirbu ir su tikra fotografija. Abu kūrybos būdus sieja tie patys kokybės kriterijai ir principas „Real feeling. Unreal ideas.“",
          en: "In the studio I also work with real photography. The same quality criteria and the principle “Real feeling. Unreal ideas.” join both ways of creating." },
      ],
      blocks: [
        { type: "trio", ids: ["ph-03", "ph-17", "ph-13"], cap: { lt: "Real feeling. Šviesa, medžiaga, oda, kuriomis galima patikėti", en: "Real feeling. Light, material and skin you can believe" } },
        { type: "trio", ids: ["ph-18", "ph-04", "ph-06"], cap: { lt: "Unreal ideas. Scenos, kurių realybėje nepastatysi", en: "Unreal ideas. Scenes you could not stage in real life" } },
      ] },
    { n: "02", h: { lt: "Logotipas ir atpažinimo ženklas", en: "Logo and identity mark" },
      p: [
        { k: { lt: "Netikėtas atradimas.", en: "An unexpected find." }, lt: "NR monograma gimė generuojant logotipo variantus. Pamačiusi šią formą atpažinau tai, ko ieškojau savo studijai. Ji tapo pagrindu tolesniam identitetui.",
          en: "The NR monogram came out of generating logo variants. When I saw this shape I recognised what I had been looking for in my studio. It became the base of the identity that followed." },
        { k: { lt: "Trys variantai.", en: "Three versions." }, lt: "Logotipo sistemą sudaro NR simbolis, užrašas „NOT REAL“ ir jų junginys. Kiekvienas turi savo paskirtį – nuo profilio piktogramos iki projekto pristatymo.",
          en: "The logo system consists of the NR symbol, the “NOT REAL” wordmark and the combination of the two. Each has its own use, from a profile icon to a project presentation." },
        { k: { lt: "Naudojimo taisyklės.", en: "Rules of use." }, lt: "Brandbooke apibrėžti dydžiai, apsaugos zonos ir spalviniai variantai. Naudojamas ant nuotraukos, ženklas turi išlikti įskaitomas ir neuždengti svarbių vaizdo detalių.",
          en: "The brandbook defines sizes, clear zones and colour versions. Used on a photograph, the mark has to stay legible and must not cover important details of the picture." },
      ],
      blocks: [
        { type: "logos", ids: [], cap: { lt: "Trys logotipo variantai: NR simbolis, užrašas ir junginys", en: "The three logo versions: the NR symbol, the wordmark and the combination" } },
        { type: "onphoto", ids: ["ph-16", "ph-19", "ph-14"], cap: { lt: "Logotipas ant nuotraukos: tik NR simbolis, mažas, rami vieta kampe", en: "The logo on a photograph: only the NR symbol, small, in a calm corner" } },
      ] },
    { n: "03", h: { lt: "Spalvų sistema ir tekstūros", en: "Colour system and textures" },
      p: [
        { k: { lt: "Bordo – pradinis pasirinkimas.", en: "Bordeaux – the starting point." }, lt: "Tai mano mėgstamiausia spalva ir asmeniškiausia NOT REAL identiteto dalis. Aplink ją suderinau likusią paletę.",
          en: "It is my favourite colour and the most personal part of the NOT REAL identity. I matched the rest of the palette around it." },
        { k: { lt: "Aiškios spalvų paskirtys.", en: "Clear roles for colours." }, lt: "Kreminė ir šilto popieriaus atspalvis naudojami šviesiems fonams, tamsiai ruda „Espresso“ – tekstui ir tamsioms kompozicijoms. Šafrano geltona palikta kaip viena akcentinė spalva svarbiam žodžiui, žymai ar detalei išskirti.",
          en: "Cream and a warm paper tone are used for light backgrounds, dark brown “Espresso” for text and dark compositions. Saffron yellow is kept as a single accent colour to pick out an important word, label or detail." },
        { k: { lt: "Tekstūra ir paryškinimai.", en: "Texture and highlights." }, lt: "Mėgstu tekstūras, nes jos suteikia vaizdui gyvybės. Popieriaus grūdėtumas ir sauso teptuko potėpiai papildo studijos maketus, o paryškinimai nukreipia dėmesį. Bordo, tekstūra ir šie akcentai geriausiai atspindi mano skonį.",
          en: "I like textures because they give a picture life. Paper grain and dry-brush strokes add to the studio layouts, and highlights guide the eye. Bordeaux, texture and these accents reflect my taste best." },
      ],
      blocks: [
        { type: "palette", ids: [], cap: { lt: "Penkios spalvos, popieriaus tekstūra ir teptuko paryškinimai", en: "Five colours, the paper texture and the brush highlights" } },
        { type: "bands", ids: [], cap: { lt: "Teptuko juostos: spalvą keičia fonas, todėl vienas failas tinka visoms", en: "Brush bands: the background changes the colour, so one file works for all" } },
      ] },
    { n: "04", h: { lt: "Tipografija ir komunikacijos tonas", en: "Typography and tone of voice" },
      p: [
        { k: { lt: "Šriftų derinys.", en: "The type pairing." }, lt: "Antraštėms ir citatoms pasirinkau „Newsreader“, aprašymams bei informacijai – „Figtree“. Skirtingos jų paskirtys padeda aiškiai atskirti pagrindinę mintį nuo paaiškinimo.",
          en: "For headlines and quotes I chose Newsreader, for descriptions and information Figtree. Their different roles keep the main thought clearly apart from the explanation." },
        { k: { lt: "Akcentas tekste.", en: "An accent in the text." }, lt: "Vieną pasirinktą antraštės žodį išskiriu kursyvu. Kartu su saikingai naudojamu pabraukimu tai tampa pasikartojančia NOT REAL stiliaus detale.",
          en: "I set one chosen word of a headline in italics. Together with a sparingly used underline it becomes a recurring detail of the NOT REAL style." },
        { k: { lt: "Bendravimas.", en: "Communication." }, lt: "NOT REAL tonas drąsus, tiesus ir šiltas, su vieta žaismingumui. Tekstuose svarbūs konkretumas, kūrybinių sprendimų paaiškinimas ir dėmesys klientui. Vengiu perdėtų pažadų ir rinkodaros klišių.",
          en: "The NOT REAL tone is bold, direct and warm, with room to play. In the texts, concreteness, explaining the creative decisions and attention to the client matter. I avoid exaggerated promises and marketing clichés." },
      ],
      blocks: [
        { type: "typo", ids: [], cap: { lt: "„Newsreader“ ir „Figtree“, kursyvas su pabraukimu ir tono pavyzdžiai", en: "Newsreader and Figtree, italics with an underline and examples of tone" } },
      ] },
    { n: "05", h: { lt: "Produkto tikslumas ir AI kūryba", en: "Product accuracy and AI creation" },
      p: [
        { k: { lt: "Fotografės požiūris.", en: "A photographer’s eye." }, lt: "Vertindama AI vaizdą atkreipiu dėmesį į šviesos kryptį, šešėlius, atspindžius, medžiagų tekstūras ir natūraliai atrodančią odą. Šios detalės lemia, ar scena atrodo įtikinamai.",
          en: "When I judge an AI image I look at the direction of the light, shadows, reflections, material textures and natural-looking skin. These details decide whether a scene is convincing." },
        { k: { lt: "Tikslus produkto pateikimas.", en: "Accurate presentation of the product." }, lt: "Produkto formą, spalvą, medžiagą, proporcijas ir ženklinimą tikrinu pagal patvirtintą šaltinį. Kliento produktas neturi būti keičiamas vien tam, kad derėtų prie NOT REAL paletės.",
          en: "I check the shape, colour, material, proportions and labelling of the product against an approved source. A client’s product must not be changed just to suit the NOT REAL palette." },
        { k: { lt: "Kūryba ir patikra.", en: "Creation and checking." }, lt: "AI naudoju scenoms, aplinkoms ir vizualams kurti bei redaguoti. Galutinį rezultatą vertinu pagal projekto reikalavimus: tikrinu produkto detales, tekstus, kompoziciją ir vaizdo kokybę.",
          en: "I use AI to create and edit scenes, settings and visuals. I judge the final result against the needs of the project: I check the product details, texts, composition and image quality." },
      ],
      blocks: [
        { type: "grid", ids: ["al-01", "al-02", "al-03", "al-04"], cap: { lt: "Tas pats flakonas skirtingose scenose: forma, spalva ir ženklinimas nesikeičia", en: "The same bottle in different scenes: shape, colour and labelling do not change" } },
        { type: "labelled", ids: ["ph-20", "ph-11", "ph-09"], labels: [{ lt: "Šviesos kryptis", en: "Direction of light" }, { lt: "Medžiagų tekstūra", en: "Material texture" }, { lt: "Natūrali oda", en: "Natural skin" }], cap: { lt: "Į ką žiūriu vertindama AI vaizdą", en: "What I look at when I judge an AI image" } },
        { type: "checks", ids: [], cap: { lt: "Ką tikrinu prieš atiduodama darbą", en: "What I check before a piece leaves the studio" } },
      ] },
    { n: "06", h: { lt: "Brandbookas kasdienėje veikloje", en: "The brandbook in everyday work" },
      p: [
        { k: { lt: "Aiškus pagrindas.", en: "A clear base." }, lt: "62 puslapių vadove sujungiau studijos pozicionavimą, logotipą, spalvas, tipografiją, grafinius elementus, komunikacijos toną, šablonų aprašymus ir vaizdų kūrimo taisykles.",
          en: "In the 62-page guide I brought together the studio’s positioning, logo, colours, typography, graphic elements, tone of voice, template descriptions and the rules for making images." },
        { k: { lt: "Praktinė paskirtis.", en: "Practical use." }, lt: "Brandbookas padeda nuosekliai rengti portfolio, projektų pristatymus, socialinių tinklų maketus ir vaizdo įrašų pabaigos kadrus. Naujam turiniui turiu aiškų pagrindą, todėl nereikia kiekvieną kartą iš naujo spręsti, kaip studija turėtų atrodyti.",
          en: "The brandbook helps me prepare the portfolio, project presentations, social media layouts and the closing frames of videos consistently. For any new content I have a clear base, so I do not have to decide again each time how the studio should look." },
        { k: { lt: "Atpažįstamumas.", en: "Recognisability." }, lt: "Bendri principai susieja skirtingus formatus ir palieka erdvės naujoms idėjoms. Taip plėtoju NOT REAL braižą, išlaikydama kiekvieno kliento projekto savitumą.",
          en: "Shared principles link different formats and leave room for new ideas. That is how I develop the NOT REAL style while keeping the individuality of each client’s project." },
      ],
      blocks: [
{ type: "grid", ids: ["ex-s1", "ex-s2", "ex-s3", "ex-end"], cap: { lt: "Karuselės skaidrės 4:5 ir pabaigos kadras: tas pats popierius, bordo juosta ir NR ženklas", en: "Carousel slides 4:5 and the closing frame: the same paper, the bordeaux band and the NR mark" } },
        { type: "slides", ids: [], cap: { lt: "Viena sistema, keturios spalvos: kreminė, bordo, espresso ir šafranas. Kontrastas kinta, šriftas, juosta ir akcentas lieka", en: "One system, four colours: cream, bordeaux, espresso and saffron. The contrast changes; the type, the band and the accent stay" } },
      ] },
  ],
};
/* every picture a story uses (in order of appearance): lightbox group "story" */
export const idsOf = (s: Story): string[] => {
  const out: string[] = [];
  for (const id of [s.hero, ...s.sections.flatMap((x) => x.blocks.flatMap((b) => b.ids))]) {
    if (!id.startsWith("@") && !out.includes(id)) out.push(id);
  }
  return out;
};
export const mediaOf = (s: Story): Media[] => idsOf(s).map((id) => {
  const m = findImg(id);
  return { id: "story-" + id, kind: "image", title: { en: s.name, lt: s.name }, cover: m.thumb, ratio: m.w / m.h, src: m.src, w: m.w, h: m.h, grp: "story" };
});
/* the whole brandbook of a story, its own lightbox group: the viewer shows only these pages, never the story pictures */
export const bookOf = (s: Story): Media[] => bookPageImgs(s.book).map((m, i) => ({
  id: m.id, kind: "image", title: { en: s.name + " brandbook", lt: s.name + " brandbookas" },
  sub: { en: `Page ${i + 1} / ${s.book.pages}`, lt: `Puslapis ${i + 1} / ${s.book.pages}` },
  cover: m.thumb, ratio: m.w / m.h, src: m.src, w: m.w, h: m.h, grp: "book",
} as Media));