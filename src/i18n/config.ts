export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es";

export const localeNames: Record<Locale, string> = {
  es: "Español",
  en: "English",
};

// Preparado para i18n futuro con next-intl u otra librería.
// La primera versión opera en español (es) con lang="es" en el HTML.
