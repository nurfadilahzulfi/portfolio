import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";
import { ArrowRight } from "lucide-react";
import { Eyebrow } from "@/components/eyebrow";
import { PageTransition } from "@/components/page-transition";
import { Reveal } from "@/components/reveal";
import { projects } from "@/content/projects";
import { localizedAlternates } from "@/lib/i18n";
import { getDictionary, getLocale } from "../dictionaries";

export async function generateMetadata(): Promise<Metadata> {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  return {
    title: dict.projects.metaTitle,
    description: dict.projects.metaDescription,
    alternates: localizedAlternates(locale, "/projects"),
  };
}

export default async function ProjectsPage() {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  const t = dict.projects;

  return (
    <PageTransition>
      <main className="px-4 py-12 md:py-16">
        <div className="mx-auto max-w-6xl">
          <Reveal index={0}>
            <Eyebrow>{t.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal
            as="h1"
            index={1}
            className="mt-4 text-3xl font-semibold leading-[110%] text-gray-900 sm:text-4xl md:text-5xl dark:text-gray-50"
          >
            {t.title}
          </Reveal>
          <Reveal as="p" index={2} className="mt-4 max-w-2xl leading-relaxed text-gray-600 dark:text-gray-300">
            {t.intro}
          </Reveal>

          {projects.length === 0 ? (
            <Reveal
              as="p"
              index={3}
              className="mt-12 rounded-2xl border border-dashed border-gray-300 px-6 py-12 text-center text-gray-600 dark:border-white/25 dark:text-gray-300"
            >
              {t.empty}
            </Reveal>
          ) : (
            <ul className="mt-12 grid gap-6 md:grid-cols-2">
              {projects.map((project, i) => (
                <Reveal as="li" index={3 + i} key={project.slug}>
                  <article className="group relative flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-4 transition-[translate,box-shadow,border-color] duration-300 hover:border-gray-300 hover:shadow-lg hover:shadow-neutral-900/5 motion-safe:hover:-translate-y-1 dark:border-white/10 dark:bg-neutral-900 dark:hover:border-white/20 dark:hover:shadow-black/40">
                    {project.cover && (
                      // Same name as the detail page's cover, so it morphs between them.
                      <ViewTransition name={`project-cover-${project.slug}`} share="morph" default="none">
                        <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-gray-100 dark:bg-neutral-800">
                          <Image
                            src={project.cover}
                            alt=""
                            fill
                            sizes="(min-width: 768px) 50vw, 100vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          />
                        </div>
                      </ViewTransition>
                    )}
                    <div className="flex flex-1 flex-col p-2 pt-4">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {project.year} · {project.role[locale]}
                      </p>
                      <h2 className="mt-1 text-xl font-semibold text-gray-900 dark:text-gray-50">
                        {/* The ::after overlay makes the whole card clickable. */}
                        <Link
                          href={`/${locale}/projects/${project.slug}`}
                          className="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-neutral-900 dark:focus-visible:after:outline-white"
                        >
                          {project.title[locale]}
                        </Link>
                      </h2>
                      <p className="mt-2 leading-relaxed text-gray-600 dark:text-gray-300">
                        {project.summary[locale]}
                      </p>
                      <ul className="mt-4 flex flex-wrap gap-2" aria-label={t.tech}>
                        {project.tech.map((tech) => (
                          <li
                            key={tech}
                            className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700 dark:bg-white/10 dark:text-gray-200"
                          >
                            {tech}
                          </li>
                        ))}
                      </ul>
                      <p
                        className="mt-auto flex items-center gap-2 pt-6 text-sm font-semibold text-gray-900 transition-all group-hover:gap-3 dark:text-gray-50"
                        aria-hidden="true"
                      >
                        {t.readMore} <ArrowRight className="size-4" />
                      </p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </ul>
          )}
        </div>
      </main>
    </PageTransition>
  );
}
