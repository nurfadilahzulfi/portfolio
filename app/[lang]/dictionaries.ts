import { lang } from "next/root-params";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";
import type en from "./dictionaries/en.json";

// en.json defines the shape; id.json must have exactly the same keys.
export type Dictionary = typeof en;

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  id: () => import("./dictionaries/id.json").then((module) => module.default),
  en: () => import("./dictionaries/en.json").then((module) => module.default),
};

export async function getLocale(): Promise<Locale> {
  const locale = await lang();
  if (!isLocale(locale)) notFound();
  return locale;
}

export async function getDictionary(): Promise<Dictionary> {
  return dictionaries[await getLocale()]();
}
