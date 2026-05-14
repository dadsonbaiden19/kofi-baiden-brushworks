"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const initial = getInitialTheme();
    setTheme(initial);
    setMounted(true);
    document.documentElement.classList.toggle("dark", initial === "dark");
    document.documentElement.dataset.theme = initial;
  }, []);

  function updateTheme(nextTheme: Theme) {
    setTheme(nextTheme);
    window.localStorage.setItem("theme", nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    document.documentElement.dataset.theme = nextTheme;
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      aria-pressed={isDark}
      onClick={() => updateTheme(isDark ? "light" : "dark")}
      className="group relative inline-flex h-10 w-[4.75rem] items-center rounded-full border border-ink/15 bg-chalk/70 p-1 shadow-soft backdrop-blur-sm hover:-translate-y-0.5 hover:border-ink/25"
    >
      <span
        className={`grid h-8 w-8 place-items-center rounded-full bg-ink text-[0.68rem] font-medium text-chalk shadow-soft transition-transform duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          mounted && isDark ? "translate-x-[2.25rem]" : "translate-x-0"
        }`}
      >
        {mounted && isDark ? "M" : "S"}
      </span>
      <span className="sr-only">{isDark ? "Dark mode enabled" : "Light mode enabled"}</span>
    </button>
  );
}
