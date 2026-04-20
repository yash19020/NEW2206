"use client";

import { useEffect, useSyncExternalStore } from "react";

const STORAGE_KEY = "ps-theme";
const THEME_EVENT = "ps-theme-change";

type ThemeMode = "light" | "dark";

function useClientMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

function getPreferredTheme(): ThemeMode {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme: ThemeMode) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
}

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const onStorage = (e: StorageEvent) => {
    if (!e.key || e.key === STORAGE_KEY) callback();
  };
  const onMedia = () => callback();
  const onThemeEvent = () => callback();
  window.addEventListener("storage", onStorage);
  media.addEventListener("change", onMedia);
  window.addEventListener(THEME_EVENT, onThemeEvent);
  return () => {
    window.removeEventListener("storage", onStorage);
    media.removeEventListener("change", onMedia);
    window.removeEventListener(THEME_EVENT, onThemeEvent);
  };
}

function getThemeSnapshot(): ThemeMode {
  return getPreferredTheme();
}

function getServerThemeSnapshot(): ThemeMode {
  return "light";
}

export function ThemeToggle() {
  const mounted = useClientMounted();
  const theme = useSyncExternalStore(subscribe, getThemeSnapshot, getServerThemeSnapshot);

  useEffect(() => {
    if (!mounted) return;
    applyTheme(theme);
  }, [mounted, theme]);

  if (!mounted) {
    return (
      <button
        type="button"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-[#722f37]/25 bg-[#fdf6e8] text-base font-semibold text-[#4a1c24]"
        aria-label="Toggle theme"
        title="Toggle theme"
      >
        ☽
      </button>
    );
  }

  const next = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={() => {
        applyTheme(next);
        window.localStorage.setItem(STORAGE_KEY, next);
        window.dispatchEvent(new Event(THEME_EVENT));
      }}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-[#722f37]/25 bg-[#fdf6e8] text-lg font-semibold leading-none text-[#4a1c24] shadow-sm transition duration-200 hover:-translate-y-[1px] hover:border-[#722f37]/45 hover:bg-[#f5e6c8] hover:shadow-md active:translate-y-0"
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
    >
      {theme === "dark" ? "☼" : "☽"}
    </button>
  );
}

