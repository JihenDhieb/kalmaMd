"use client";

import { useLanguage, useTranslation } from "@/components/i18n/LanguageProvider";

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();
  const { t } = useTranslation();
  const nextLocale = locale === "en-CA" ? "fr-CA" : "en-CA";
  const nextLabel = nextLocale === "en-CA" ? t("language.english") : t("language.french");
  const shortLabel = nextLocale === "en-CA" ? "English" : "Français";

  return (
    <button
      type="button"
      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-stone-200 bg-white px-4 py-2 text-base font-bold text-primary-800 shadow-sm hover:border-primary-200 hover:bg-primary-50 hover:text-primary-900"
      onClick={() => setLocale(nextLocale)}
      aria-label={`${t("language.label")}: ${nextLabel}`}
    >
      <span className="rounded-full bg-primary-50 px-1.5 py-0.5 text-xs font-black uppercase tracking-wide text-primary-800">CA</span>
      {shortLabel}
    </button>
  );
}
