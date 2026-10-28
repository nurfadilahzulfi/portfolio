import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClickSounds } from "@/components/click-sounds";
import { InlineScript } from "@/components/inline-script";
import { SiteHeader } from "@/components/site-header";
import { profile } from "@/content/profile";
import { locales } from "@/lib/i18n";
import { themeInitScript } from "@/lib/theme";
import { getDictionary, getLocale } from "./dictionaries";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

// Pages set their own title and alternates; this supplies the shared suffix.
export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return {
    title: { default: dict.meta.title, template: `%s | ${profile.name}` },
    description: dict.meta.description,
  };
}

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <InlineScript html={themeInitScript} />
      </head>
      <body className="min-h-full flex flex-col">
        <ClickSounds />
        <SiteHeader locale={locale} dict={dict} />
        {children}
      </body>
    </html>
  );
}
