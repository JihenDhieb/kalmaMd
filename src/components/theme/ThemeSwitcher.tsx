"use client";

import { useTranslation } from "@/components/i18n/LanguageProvider";
import { useTheme } from "@/components/theme/ThemeProvider";

export function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-stone-200 bg-white px-4 py-2 text-base font-bold text-primary-800 shadow-sm hover:border-primary-200 hover:bg-primary-50 hover:text-primary-900"
      onClick={toggleTheme}
      aria-label={isDark ? t("theme.switchToLight") : t("theme.switchToDark")}
    >
      {isDark ? <MoonIcon /> : <SunIcon />}
      <span>{isDark ? t("theme.dark") : t("theme.light")}</span>
    </button>
  );
}

function SunIcon() {
  return (
    <svg aria-hidden="true" className="size-4" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <path
        d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg aria-hidden="true" className="size-4" viewBox="0 0 24 24" fill="none">
      <path
        d="M20 15.5A8.5 8.5 0 0 1 8.5 4 7 7 0 1 0 20 15.5Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}
