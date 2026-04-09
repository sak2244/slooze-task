"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getNextTheme, sanitizeTheme, type ThemeMode } from "@/lib/theme/theme-utils";

interface ThemeContextValue {
  theme: ThemeMode;
  toggleTheme: () => void;
}

const STORAGE_KEY = "commodities_theme";
const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof window === "undefined") return "light";
    return sanitizeTheme(localStorage.getItem(STORAGE_KEY));
  });

  const toggleTheme = useCallback(() => {
    const next = getNextTheme(theme);
    setTheme(next);
  }, [theme]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
