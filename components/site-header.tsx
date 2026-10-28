import Link from "next/link";
import { LanguageSwitcher } from "@/components/language-switcher";
import { SiteDock } from "@/components/site-dock";
import { ThemeToggle } from "@/components/theme-toggle";
import { profile } from "@/content/profile";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import type { Locale } from "@/lib/i18n";

type SiteHeaderProps = {
  locale: Locale;
  dict: Pick<Dictionary, "language" | "theme" | "nav">;
};

export function SiteHeader({ locale, dict }: SiteHeaderProps) {
  const { language, theme, nav } = dict;
  return (
    // Named so page transitions leave it in place (see globals.css); relative so
    // the dock's absolute position is measured from here. The name makes the
    // header its own stacking context, which traps the dock's z-index inside it,
    // so the header itself must sit above the page content.
    <header className="relative z-50 px-4 pt-4" style={{ viewTransitionName: "site-header" }}>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        <Link href={`/${locale}`} className="text-base font-bold tracking-tight text-gray-900 dark:text-gray-50">
          {profile.name}
        </Link>
        {/* Top-center of the page on desktop (scrolls with it); fixed bottom-right on phones. */}
        <SiteDock locale={locale} nav={nav} />
        <div className="flex items-center gap-2">
          <LanguageSwitcher
            current={locale}
            label={language.label}
            names={{ id: language.id, en: language.en }}
          />
          <ThemeToggle label={theme.label} />
        </div>
      </div>
    </header>
  );
}
