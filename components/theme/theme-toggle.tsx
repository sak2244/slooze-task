"use client";

import { useTheme } from "@/components/theme/theme-provider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700"
    >
      {theme === "light" ? "Dark mode" : "Light mode"}
    </button>
  );
}
