"use client";

import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type ThemeMode = "light" | "dark";

type ThemeContextValue = {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
};

const themeStorageKey = "klaramd-theme";
const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, updateTheme] = useState<ThemeMode>("light");

  useEffect(() => {
    window.queueMicrotask(() => {
      updateTheme("light");
      applyTheme("light");
      window.localStorage.setItem(themeStorageKey, "light");
    });
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      setTheme: () => {
        updateTheme("light");
        applyTheme("light");
        window.localStorage.setItem(themeStorageKey, "light");
      },
      toggleTheme: () => {
        updateTheme("light");
        applyTheme("light");
        window.localStorage.setItem(themeStorageKey, "light");
      },
    }),
    [theme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }

  return context;
}

function applyTheme(theme: ThemeMode) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
}
