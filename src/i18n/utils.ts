import { ui, defaultLang, languages, langName, type Lang } from "./ui";

/** Grąžina t() funkciją pasirinktai kalbai. */
export function useTranslations(lang: Lang) {
  return function t(key: string): string {
    return ui[lang]?.[key] ?? ui[defaultLang]?.[key] ?? key;
  };
}

/** URL kelias kalbai (numatytoji — šaknyje, kitos — /<lang>/). base = '/' arba '/repo/'. */
export function localePath(lang: Lang, base: string): string {
  return lang === defaultLang ? base : `${base}${lang}/`;
}

export { languages, defaultLang, langName };
export type { Lang };
