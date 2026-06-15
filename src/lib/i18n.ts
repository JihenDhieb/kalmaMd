import enCA from "../../messages/en-CA.json";
import frCA from "../../messages/fr-CA.json";

export const locales = ["en-CA", "fr-CA"] as const;

export type Locale = (typeof locales)[number];
export type Messages = typeof enCA;

export const defaultLocale: Locale = "en-CA";

export const dictionaries: Record<Locale, Messages> = {
  "en-CA": enCA,
  "fr-CA": frCA,
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}
