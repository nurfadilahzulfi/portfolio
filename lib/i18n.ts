export const locales = ["id", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";
export const localeCookie = "NEXT_LOCALE";

// Text written once per language, used in content/ files.
export type Localized = Record<Locale, string>;

// canonical + hreflang links for a page path such as "/projects".
export function localizedAlternates(locale: Locale, path = "") {
  return {
    canonical: `/${locale}${path}`,
    languages: Object.fromEntries(locales.map((l) => [l, `/${l}${path}`])),
  };
}

export function isLocale(value: string | undefined): value is Locale {
  return locales.includes(value as Locale);
}

// Indonesian browsers send "id" (or the legacy "in"); everyone else gets English.
export function localeFromAcceptLanguage(header: string | null): Locale {
  if (!header) return defaultLocale;

  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { lang: tag.toLowerCase().split("-")[0], q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { lang } of ranked) {
    if (lang === "id" || lang === "in") return "id";
    if (lang === "en") return "en";
  }
  return defaultLocale;
}
