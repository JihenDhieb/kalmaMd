"use client";

import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { defaultLocale, dictionaries, isLocale, type Locale } from "@/lib/i18n";

type TranslationValues = Record<string, string | number>;

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, values?: TranslationValues) => string;
};

const languageStorageKey = "eyecare-locale";
const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, updateLocale] = useState<Locale>(defaultLocale);

  useEffect(() => {
    window.queueMicrotask(() => {
      const storedLocale = window.localStorage.getItem(languageStorageKey);

      if (storedLocale && isLocale(storedLocale)) {
        updateLocale(storedLocale);
      }
    });
  }, []);

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      setLocale: (nextLocale) => {
        updateLocale(nextLocale);
        window.localStorage.setItem(languageStorageKey, nextLocale);
      },
      t: (key, values) => translate(locale, key, values),
    }),
    [locale],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useTranslation() {
  const context = useLanguageContext();

  return { t: context.t, locale: context.locale };
}

export function useLanguage() {
  const context = useLanguageContext();

  return { locale: context.locale, setLocale: context.setLocale };
}

function useLanguageContext() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("Language hooks must be used inside LanguageProvider");
  }

  return context;
}

function translate(locale: Locale, key: string, values?: TranslationValues) {
  const message = getMessage(dictionaries[locale], key) ?? getMessage(dictionaries[defaultLocale], key) ?? key;

  if (!values) {
    return message;
  }

  return Object.entries(values).reduce(
    (current, [name, value]) => current.replaceAll(`{${name}}`, String(value)),
    message,
  );
}

function getMessage(messages: unknown, key: string): string | undefined {
  const value = key.split(".").reduce<unknown>((current, part) => {
    if (typeof current !== "object" || current === null || !(part in current)) {
      return undefined;
    }

    return (current as Record<string, unknown>)[part];
  }, messages);

  return typeof value === "string" ? value : undefined;
}
