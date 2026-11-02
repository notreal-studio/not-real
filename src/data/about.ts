// About text. LT is Inga's own wording from the brandbook 4.0.0 package (APRASYMAI.md); EN is a translation to review.
type L = { en: string; lt: string };
export const about = {
  kicker: { en: "About", lt: "Apie" } as L,
  h2: { en: "A photographer who shoots <em class=\"br-ul\">without a camera.</em>", lt: "Fotografė, kuri fotografuoja <em class=\"br-ul\">be kameros.</em>" } as L,
  p: [
    { en: "NOT REAL is Inga Bankauskė's studio in Kaunas. She creates ads and product visuals in which the product looks exactly as the buyer will receive it.",
      lt: "NOT REAL yra Ingos Bankauskės studija Kaune. Ji kuria reklamas ir prekių vizualus, kuriuose produktas atrodo toks, kokį gaus pirkėjas." },
    { en: "I'm a photographer who has worked with light, shadow and colour for more than five years. Where it's needed, I photograph the product; where it fits, I build the scene with AI, always in one brand style.",
      lt: "Esu fotografė, daugiau nei penkerius metus dirbanti su šviesa, šešėliu ir spalva. Kur reikia, produktą nufotografuoju, kur tinka, scenas sukuriu su AI, visada pagal vieną prekės ženklo stilių." },
    { en: "If a brand doesn't have a brandbook yet, I create one; if it does, every visual follows it. The SOXI Brand Kit project won 1st place in the 2026 Magnific One Brand Kit contest.",
      lt: "Jei prekės ženklas dar neturi brandbook, jį sukuriu; jei turi, visi vizualai kuriami pagal jį. SOXI Brand Kit projektas 2026 m. laimėjo 1 vietą „Magnific One Brand Kit“ konkurse." },
  ] as L[],
  facts: [
    { k: { en: "Name", lt: "Vardas" }, v: { en: "Inga Bankauskė", lt: "Inga Bankauskė" } },
    { k: { en: "Studio", lt: "Studija" }, v: { en: "NOT REAL · Kaunas", lt: "NOT REAL · Kaunas" } },
    { k: { en: "Works with", lt: "Dirba su" }, v: { en: "E-commerce and service brands", lt: "E. prekybos ir paslaugų prekių ženklais" } },
    { k: { en: "Award", lt: "Apdovanojimas" }, v: { en: "1st place, Magnific One Brand Kit, 2026", lt: "1 vieta, Magnific One Brand Kit, 2026" } },
  ],
  cta: { en: "Say hi", lt: "Parašyk" } as L,
  caption: { en: "Hello, I'm Inga", lt: "Labas, aš Inga" } as L,
};
