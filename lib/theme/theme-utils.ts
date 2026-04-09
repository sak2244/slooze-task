export type ThemeMode = "light" | "dark";

export function sanitizeTheme(value: string | null): ThemeMode {
  return value === "dark" ? "dark" : "light";
}

export function getNextTheme(theme: ThemeMode): ThemeMode {
  return theme === "light" ? "dark" : "light";
}
