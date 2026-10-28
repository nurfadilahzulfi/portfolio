"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FlagGB, FlagID } from "@/components/flags";
import { localeCookie, locales, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const flags = { id: FlagID, en: FlagGB } satisfies Record<Locale, unknown>;

// Read by proxy.ts so a returning visitor lands on the language they picked.
function rememberLocale(locale: Locale) {
  document.cookie = `${localeCookie}=${locale}; path=/; max-age=31536000; samesite=lax`;
}

type LanguageSwitcherProps = {
  current: Locale;
  label: string;
  names: Record<Locale, string>;
};

export function LanguageSwitcher({ current, label, names }: LanguageSwitcherProps) {
  const pathname = usePathname();

  // Swap only the first path segment so /id/projects becomes /en/projects.
  const hrefFor = (locale: Locale) => {
    const rest = pathname.split("/").slice(2).join("/");
    return `/${locale}${rest ? `/${rest}` : ""}`;
  };

  return (
    <nav aria-label={label} className="flex items-center gap-1 rounded-lg border border-gray-200 bg-white p-1 dark:border-white/10 dark:bg-neutral-900">
      {locales.map((locale) => {
        const Flag = flags[locale];
        const active = locale === current;
        return (
          <Link
            key={locale}
            href={hrefFor(locale)}
            hrefLang={locale}
            lang={locale}
            title={names[locale]}
            aria-label={names[locale]}
            aria-current={active ? "true" : undefined}
            onClick={() => rememberLocale(locale)}
            className={cn(
              "flex min-h-9 items-center gap-2 rounded-md px-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 dark:focus-visible:outline-white",
              active
                ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-white/10 dark:hover:text-white"
            )}
          >
            <Flag className="h-3.5 w-5 rounded-[2px] ring-1 ring-black/10" />
            <span>{locale.toUpperCase()}</span>
          </Link>
        );
      })}
    </nav>
  );
}
