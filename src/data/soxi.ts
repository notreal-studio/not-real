// Copy for the SOXI case study (source: "SOXI — How it was built", Inga's own PDF). EN is the original, LT is a translation to review.
export interface Soxi {
  metaTitle: string; metaDesc: string; back: string; kicker: string; tagline: string;
  facts: [string, string][];
  stepsTitle: string; steps: [string, string, string][];
  s1: { n: string; h: string; p: string[]; tags: string[] };
  s2: { n: string; h: string; p: string; qLabel: string; q: string; cap: string };
  s3: { n: string; h: string; p: string[]; tipH: string; tip: string };
  s4: { n: string; h: string; p: string[]; th: [string, string]; rows: [string, string][]; cap: string };
  s5: { n: string; h: string; cols: [string, string, string][] };
  s6: { n: string; h: string; p: string; ruleH: string; rule: string; fourH: string; four: string };
  s7: { n: string; h: string; p: string; notes: [string, string][] };
  s8: { n: string; h: string; lines: string[]; p: string[] };
  s9: { n: string; h: string; p: string };
  s10: { n: string; h: string; p: string; th: [string, string]; rows: [string, string][] };
  result: string;
  more: { h: string; items: [string, string][] };
  cta: { h: string; p: string; book: string; work: string };
}

export const soxi: Record<"en" | "lt", Soxi> = {
  en: {
    metaTitle: "SOXI — Brand kit case study | Not Real",
    metaDesc: "A luxury sock brand, rolled like sushi: how one witty idea became a name, a brand kit, a cast, a campaign and an e-shop inside one Space.",
    back: "All work", kicker: "Case study · Brand kit",
    tagline: "A luxury sock brand, rolled like sushi: from a name to a campaign, inside one Space.",
    facts: [["Role", "Photographer & AI creative director"], ["Studio", "Not Real"], ["Tools", "Magnific One · Claude · Seedream 5 Pro"], ["Type", "Concept project, 2026"]],
    stepsTitle: "How it was built",
    steps: [["01", "Idea", "One sentence, one object, one signature"], ["02", "Rules", "Guidelines written before any image"], ["03", "Product", "Box and socks alone on white"],
      ["04", "Brand kit", "Rules and references into Magnific"], ["05", "World", "Characters, then staged scenes"], ["06", "Campaign", "Posters, posts, e-shop, film"], ["07", "Finish", "Exact logo and type, by hand"]],
    s1: { n: "01 · The idea", h: "One witty idea.", p: [
      "SOXI is a made-up brand: socks rolled tight like sushi, six pairs in a black lacquer box called the Omakase. The object is the joke. Everything around it is calm, precise and expensive.",
      "The signature is the spiral. The O of the wordmark is a rolled sock seen from the end, and the same spiral returns on the socks, on the box lid and in the artwork of every scene.",
      "The brief to myself: sushi is the language, never the setting. No bamboo, no kanji, no real food in frame, no cartoon mascots. The brand never explains the joke twice."],
      tags: ["Refined", "Witty", "Precise", "Curious"] },
    s2: { n: "02 · Rules first", h: "Write the rules first.",
      p: "Before any image, I wrote a 13-page brand guideline with Claude: wordmark, colours, type, voice, product, photography rules and a Do / Don't list. The same rules live inside the Brand Kit, so every generator that carries it starts from them.",
      qLabel: "Rule that paid off most", q: "Never let a generator redraw the logo. Leave the area clean, then place the exact vector by hand.",
      cap: "Six of the thirteen pages: idea, wordmark, colour, typography, product, photography rules." },
    s3: { n: "03 · Product first", h: "Design the object first.", p: [
      "I designed the box and the socks alone on white before anything else. They became the product references in the Brand Kit, so the product never drifts.",
      "The Omakase box: black lacquer, six compartments, cream OMAKASE band. Six pairs, six sushi: Tuna, Tamago, Ebi, Avocado, Unagi, Ikura."],
      tipH: "The label line", tip: "“No text” in a prompt also wipes the lettering on the product. So every product prompt ends with one line: keep the printed SOXI mark and all lettering exactly as in the reference." },
    s4: { n: "04 · Brand kit in Magnific One", h: "One kit, wired everywhere.", p: [
      "One SOXI kit node sits at the top and is wired into every generator that should look on-brand.",
      "Each prompt has its own text node. To change a picture, I edit one sentence and nothing else moves."],
      th: ["Panel", "What it holds"],
      rows: [["1 · Brand", "Palette, type, rules, references"], ["2 · Product", "Packshots, macro, open-box shots"], ["3 · Character", "Four characters, two sheets each"],
        ["4 · Scenes", "Nine staged scenes and the 9:16 hero"], ["5 · Social", "Six type posters and three posts"], ["6 · E-shop", "Ten white-background shots"], ["7 · Identity", "Logo, colour and type cards"]],
      cap: "The Space, zoomed out. Panels are laid out by hand so each one reads left to right: prompt, then picture." },
    s5: { n: "05 · Identity", h: "A spiral for an O.", cols: [
      ["Logo", "The O is a rolled sock seen from the end: a ring with a Salmon spiral. The mark was vectorised once and is only ever placed by hand, because generators bend the letters and swap the spiral.", "logo"],
      ["Colour", "Four core colours: Rice about half of every image, Nori a quarter, Salmon a fifth, Wasabi a sliver. Six sushi colours belong to the socks and the world around them. Never more than three colour fields in a scene.", "colour"],
      ["Type", "DM Serif Display for voice, Inter for information. Headlines are short, sentence case, with a full stop. Text in images is set by hand, because generators misspell.", "type"]] },
    s6: { n: "06 · People", h: "Build the cast once.",
      p: "Four characters, each built once as a character sheet and a close-up sheet, then used as references everywhere. Made in Seedream 5 Pro. Every shot that uses them runs in Magnific One with the kit: references lock the people, the kit locks the brand.",
      ruleH: "The rule", rule: "Describe the world, not the pose: who she is, what she wears, where she is. When I dictated poses, I got the same photo several times.",
      fourH: "Four people, four colours.", four: "Each character owns one colour and one sock: Tuna in burgundy, Ikura in orange-red, Avocado in green, and the fourth in a dress made of rolled socks. On white they are references; on a coloured wall they are the campaign." },
    s7: { n: "07 · Scenes", h: "A staged tableau.",
      p: "Every scene is a small stage of flat colour fields: one wall colour, a Nori floor, one oversized spiral artwork. Deadpan and graphic, but photographic: real knit, real skin, real lacquer. One node, one prompt, one picture.",
      notes: [["One dominant colour", "One palette colour on the wall, Nori on the floor."], ["The signature in frame", "A spiral artwork in every scene, so the logo never has to shout."], ["Socks always visible", "Ankle, cuff and woven word stay readable."]] },
    s8: { n: "08 · Campaign", h: "Lines that sell the joke.",
      lines: ["This week's menu.", "Fresh off the roll.", "Six rolls. Zero regrets.", "Raw style. Well rolled."],
      p: ["Sushi-menu language: roll, omakase, pair, set, chef, menu. One idea per line, a wink never a punchline, no hype words and no exclamation marks.",
        "Poster type is the one place the generator letters words itself. I check every letter at 100 percent, and re-run only the poster that is wrong, from the same references. Each post is a text node, a product reference and the kit. The look changes from poster to poster; the product, the label and the palette do not."] },
    s9: { n: "09 · E-shop", h: "One product, many angles.",
      p: "Ten shots on pure white: box, legs, hands, model, clothesline, chopsticks, cuff. One recipe for every shot: references lock the product, the kit locks the brand." },
    s10: { n: "10 · Motion", h: "From still to film.",
      p: "One idea in ten seconds, 9:16: the sock becomes sushi. Three shots, one move per shot, no dialogue and no music; the sound is the chopsticks, the knit and one step.",
      th: ["Time", "Shot"], rows: [["0 – 3.5 s", "Top-down on the open Omakase box. Chopsticks lift the Tuna roll out."], ["3.5 – 6.5 s", "The roll unrolls in the air into the sock with its nigiri motif and name."], ["6.5 – 10 s", "Low on bare feet: the same sock on one foot, one calm step. Lower third left clean for the line and the logos."]] },
    result: "Eight frames, one brand.",
    more: { h: "What else a Brand Kit makes", items: [
      ["Social and LinkedIn", "Posts, posters, banners, all in the same style."], ["Sales material", "Presentation illustrations, sales sheets, e-shop shots."],
      ["Print and gifts", "Thank-you cards, stickers, layouts."], ["Any format", "1K, 2K, 4K and every aspect ratio."],
      ["A kit from a website link", "Paste a website link, get a ready Brand Kit. Handy for client brands."], ["Team access", "Everyone uses the same Brand Kit, so the images do not drift."]] },
    cta: { h: "Build your brand once. The workflow does the rest.", p: "Using Magnific? I will share the workflow link. Not yet, but want it? I will build one for your brand.", book: "Book a call", work: "More work" },
  },
  lt: {
    metaTitle: "SOXI — Brand kit atvejo studija | Not Real",
    metaDesc: "Prabangus kojinių prekės ženklas, suvyniotas kaip suši: kaip viena sąmojinga idėja tapo pavadinimu, brand kit, aktoriais, kampanija ir e. parduotuve viename Space.",
    back: "Visi darbai", kicker: "Atvejo studija · Brand kit",
    tagline: "Prabangus kojinių prekės ženklas, suvyniotas kaip suši: nuo pavadinimo iki kampanijos viename Space.",
    facts: [["Vaidmuo", "Fotografė ir AI kūrybos direktorė"], ["Studija", "Not Real"], ["Įrankiai", "Magnific One · Claude · Seedream 5 Pro"], ["Tipas", "Koncepcinis projektas, 2026"]],
    stepsTitle: "Kaip tai buvo sukurta",
    steps: [["01", "Idėja", "Vienas sakinys, vienas objektas, vienas parašas"], ["02", "Taisyklės", "Gairės parašytos prieš bet kokį vaizdą"], ["03", "Produktas", "Dėžutė ir kojinės vienos ant balto fono"],
      ["04", "Brand kit", "Taisyklės ir nuorodos į Magnific"], ["05", "Pasaulis", "Personažai, paskui surežisuotos scenos"], ["06", "Kampanija", "Plakatai, įrašai, e. parduotuvė, filmas"], ["07", "Užbaigimas", "Tikslus logotipas ir šriftas, rankomis"]],
    s1: { n: "01 · Idėja", h: "Viena sąmojinga idėja.", p: [
      "SOXI yra išgalvotas prekės ženklas: kojinės, susuktos kaip suši, šešios poros juodoje lakuotoje dėžutėje, pavadintoje Omakase. Pats objektas yra pokštas. Viskas aplink jį rami, tiksli ir brangi.",
      "Parašas yra spiralė. Žodžio ženklo O yra susukta kojinė, žiūrint iš galo, ir ta pati spiralė kartojasi ant kojinių, ant dėžutės dangtelio ir kiekvienos scenos paveiksle.",
      "Užduotis sau: suši yra kalba, niekada ne aplinka. Jokio bambuko, jokių kanji, jokio tikro maisto kadre, jokių animacinių talismanų. Prekės ženklas niekada nepaaiškina pokšto du kartus."],
      tags: ["Rafinuotas", "Sąmojingas", "Tikslus", "Smalsus"] },
    s2: { n: "02 · Pirmiausia taisyklės", h: "Pirmiausia parašyk taisykles.",
      p: "Prieš bet kokį vaizdą su Claude parašiau 13 puslapių prekės ženklo gaires: žodžio ženklas, spalvos, šriftai, balsas, produktas, fotografijos taisyklės ir sąrašas, ką daryti ir ko nedaryti. Tos pačios taisyklės gyvena Brand Kit viduje, todėl kiekvienas jį naudojantis generatorius pradeda nuo jų.",
      qLabel: "Taisyklė, kuri labiausiai atsipirko", q: "Niekada neleisk generatoriui perpiešti logotipo. Palik vietą švarią, o tikslų vektorių įdėk rankomis.",
      cap: "Šeši iš trylikos puslapių: idėja, žodžio ženklas, spalvos, tipografija, produktas, fotografijos taisyklės." },
    s3: { n: "03 · Pirmiausia produktas", h: "Pirmiausia sukurk objektą.", p: [
      "Dėžutę ir kojines pirmiausia sukūriau vienas ant balto fono. Jos tapo produkto nuorodomis Brand Kit viduje, todėl produktas niekada nenukrypsta.",
      "Omakase dėžutė: juodas lakas, šeši skyreliai, kreminė OMAKASE juosta. Šešios poros, šeši suši: Tuna, Tamago, Ebi, Avocado, Unagi, Ikura."],
      tipH: "Užrašo eilutė", tip: "„Be teksto“ promte ištrina ir užrašus ant paties produkto. Todėl kiekvienas produkto promptas baigiasi viena eilute: išlaikyk atspausdintą SOXI ženklą ir visus užrašus tiksliai kaip nuorodoje." },
    s4: { n: "04 · Brand kit Magnific One", h: "Vienas rinkinys, prijungtas visur.", p: [
      "Viršuje yra vienas SOXI rinkinio mazgas, prijungtas prie kiekvieno generatoriaus, kuris turi atrodyti pagal prekės ženklą.",
      "Kiekvienas promptas turi savo teksto mazgą. Norėdama pakeisti paveikslą, redaguoju vieną sakinį ir niekas kitas nejuda."],
      th: ["Skydelis", "Ką jis laiko"],
      rows: [["1 · Prekės ženklas", "Paletė, šriftai, taisyklės, nuorodos"], ["2 · Produktas", "Pakuotės kadrai, makro, atidarytos dėžutės kadrai"], ["3 · Personažai", "Keturi personažai, po dvi lenteles"],
        ["4 · Scenos", "Devynios surežisuotos scenos ir 9:16 pagrindinis kadras"], ["5 · Socialiniai tinklai", "Šeši tipografiniai plakatai ir trys įrašai"], ["6 · E. parduotuvė", "Dešimt kadrų ant balto fono"], ["7 · Tapatybė", "Logotipo, spalvų ir šriftų kortelės"]],
      cap: "Space, nutolinus vaizdą. Skydeliai išdėlioti rankomis, kad kiekvienas skaitytųsi iš kairės į dešinę: promptas, tada paveikslas." },
    s5: { n: "05 · Tapatybė", h: "Spiralė vietoj O.", cols: [
      ["Logotipas", "O yra susukta kojinė, žiūrint iš galo: žiedas su Salmon spirale. Ženklas vektorizuotas vieną kartą ir dedamas tik rankomis, nes generatoriai lanksto raides ir pakeičia spiralę.", "logo"],
      ["Spalvos", "Keturios pagrindinės spalvos: Rice apie pusę kiekvieno vaizdo, Nori ketvirtadalį, Salmon penktadalį, Wasabi truputį. Šešios suši spalvos priklauso kojinėms ir pasauliui aplink jas. Niekada daugiau nei trys spalvų laukai scenoje.", "colour"],
      ["Šriftai", "DM Serif Display balsui, Inter informacijai. Antraštės trumpos, sakinio rašyba, su tašku pabaigoje. Tekstas vaizduose dedamas rankomis, nes generatoriai daro klaidų.", "type"]] },
    s6: { n: "06 · Žmonės", h: "Sukurk aktorius vieną kartą.",
      p: "Keturi personažai, kiekvienas sukurtas vieną kartą kaip personažo lentelė ir artimų planų lentelė, o paskui naudojamas kaip nuoroda visur. Sukurta su Seedream 5 Pro. Kiekvienas juos naudojantis kadras sukamas Magnific One su rinkiniu: nuorodos užrakina žmones, rinkinys užrakina prekės ženklą.",
      ruleH: "Taisyklė", rule: "Apibūdink pasaulį, ne pozą: kas ji, ką vilki, kur yra. Kai diktavau pozas, gaudavau tą pačią nuotrauką kelis kartus.",
      fourH: "Keturi žmonės, keturios spalvos.", four: "Kiekvienas personažas turi vieną spalvą ir vieną kojinę: Tuna bordo, Ikura oranžinė-raudona, Avocado žalia, o ketvirtoji suknelėje iš susuktų kojinių. Ant balto fono jie yra nuorodos, ant spalvotos sienos jie yra kampanija." },
    s7: { n: "07 · Scenos", h: "Surežisuotas paveikslas.",
      p: "Kiekviena scena yra maža scena iš plokščių spalvų laukų: viena sienos spalva, Nori grindys, vienas milžiniškas spiralės paveikslas. Šalta ir grafiška, bet fotografiška: tikras trikotažas, tikra oda, tikras lakas. Vienas mazgas, vienas promptas, vienas paveikslas.",
      notes: [["Viena vyraujanti spalva", "Viena paletės spalva ant sienos, Nori ant grindų."], ["Parašas kadre", "Kiekvienoje scenoje spiralės paveikslas, todėl logotipui niekada nereikia šaukti."], ["Kojinės visada matomos", "Kulkšnis, rankogalis ir austas užrašas išlieka įskaitomi."]] },
    s8: { n: "08 · Kampanija", h: "Eilutės, kurios parduoda pokštą.",
      lines: ["This week's menu.", "Fresh off the roll.", "Six rolls. Zero regrets.", "Raw style. Well rolled."],
      p: ["Suši meniu kalba: roll, omakase, pair, set, chef, menu. Viena idėja eilutėje, mirktelėjimas, o ne punchline, jokių reklamos žodžių ir jokių šauktukų.",
        "Plakatų tekstas yra vienintelė vieta, kur generatorius pats rašo žodžius. Kiekvieną raidę tikrinu 100 procentų mastelio ir iš naujo sukuriu tik tą plakatą, kuris klaidingas, iš tų pačių nuorodų. Kiekvienas įrašas yra teksto mazgas, produkto nuoroda ir rinkinys. Išvaizda keičiasi nuo plakato iki plakato; produktas, užrašas ir paletė nesikeičia."] },
    s9: { n: "09 · E. parduotuvė", h: "Vienas produktas, daug kampų.",
      p: "Dešimt kadrų ant gryno balto: dėžutė, kojos, rankos, modelis, drabužių virvė, lazdelės, rankogalis. Vienas receptas kiekvienam kadrui: nuorodos užrakina produktą, rinkinys užrakina prekės ženklą." },
    s10: { n: "10 · Judesys", h: "Nuo nuotraukos iki filmo.",
      p: "Viena idėja per dešimt sekundžių, 9:16: kojinė tampa suši. Trys kadrai, vienas judesys kiekviename, jokių dialogų ir jokios muzikos; garsas yra lazdelės, trikotažas ir vienas žingsnis.",
      th: ["Laikas", "Kadras"], rows: [["0 – 3,5 s", "Iš viršaus atidaryta Omakase dėžutė. Lazdelės išima Tuna ritinį."], ["3,5 – 6,5 s", "Ritinys ore išsivynioja į kojinę su nigiri motyvu ir pavadinimu."], ["6,5 – 10 s", "Žemai ant basų kojų: ta pati kojinė ant vienos pėdos, vienas ramus žingsnis. Apatinis trečdalis paliktas švarus eilutei ir logotipams."]] },
    result: "Aštuoni kadrai, vienas prekės ženklas.",
    more: { h: "Ką dar sukuria Brand Kit", items: [
      ["Socialiniai tinklai ir LinkedIn", "Įrašai, plakatai, baneriai tame pačiame stiliuje."], ["Pardavimo medžiaga", "Prezentacijų iliustracijos, pardavimų lapai, e. parduotuvės kadrai."],
      ["Spausdinti ir dovanoti", "Padėkos kortelės, lipdukai, maketai."], ["Bet koks formatas", "1K, 2K, 4K ir visi kraštinių santykiai."],
      ["Kit iš svetainės nuorodos", "Įklijuok svetainės nuorodą ir gauk paruoštą Brand Kit. Patogu dirbant su klientų prekės ženklais."], ["Komandos prieiga", "Visi naudoja tą patį Brand Kit, todėl vaizdai nesiskiria."]] },
    cta: { h: "Sukurk prekės ženklą vieną kartą. Likusį padaro workflow.", p: "Naudoji Magnific? Pasidalinsiu workflow nuoroda. Dar nenaudoji, bet nori? Sukursiu tavo prekės ženklui.", book: "Užsisakyti pokalbį", work: "Daugiau darbų" },
  },
};
