"use client";

import { Moon, Sun } from "lucide-react";
import { useLayoutEffect, useSyncExternalStore } from "react";
import { applySavedTheme, themeStorageKey } from "@/lib/theme";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
}

const isDarkNow = () => document.documentElement.classList.contains("dark");

function setTheme(dark: boolean) {
  document.documentElement.classList.toggle("dark", dark);
  try {
    localStorage.setItem(themeStorageKey, dark ? "dark" : "light");
  } catch {
    // Storage blocked (private mode); the choice just won't persist.
  }
}

export function ThemeToggle({ label }: { label: string }) {
  const isDark = useSyncExternalStore(subscribe, isDarkNow, () => false);

  // Strict Mode's dev remount resets <html> attributes and drops the class the
  // inline script set; put it back before paint. No-op in production.
  useLayoutEffect(applySavedTheme, []);

  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={isDark}
      title={label}
      onClick={() => setTheme(!isDark)}
      className="flex size-11 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 dark:border-white/10 dark:bg-neutral-900 dark:text-gray-300 dark:hover:bg-neutral-800 dark:hover:text-white dark:focus-visible:outline-white"
    >
      {/* Icons switch via CSS so the right one shows before hydration. */}
      <Moon className="size-5 dark:hidden" aria-hidden="true" />
      <Sun className="hidden size-5 dark:block" aria-hidden="true" />
    </button>
  );
}
