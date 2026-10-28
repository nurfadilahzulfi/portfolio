import type { Metadata } from "next";
import { PageTransition } from "@/components/page-transition";
import AboutSection3 from "@/components/ui/about-section";
import { localizedAlternates } from "@/lib/i18n";
import { getDictionary, getLocale } from "./dictionaries";

export async function generateMetadata(): Promise<Metadata> {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  return {
    title: { absolute: dict.meta.title },
    alternates: localizedAlternates(locale),
  };
}

export default async function Home() {
  const dict = await getDictionary();
  return (
    <PageTransition>
      <main>
        <AboutSection3 content={dict.about} />
      </main>
    </PageTransition>
  );
}
