import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Eyebrow } from "@/components/eyebrow";
import { PageTransition } from "@/components/page-transition";
import { Reveal } from "@/components/reveal";
import { projects } from "@/content/projects";
import { localizedAlternates } from "@/lib/i18n";
import { getDictionary, getLocale } from "../../dictionaries";

// Cache Components rejects an empty list, so a placeholder stands in until the
// first project is added. It matches no project and renders the 404 page.
export async function generateStaticParams() {
  return projects.length > 0
    ? projects.map(({ slug }) => ({ slug }))
    : [{ slug: "__placeholder__" }];
}

async function findProject(params: PageProps<"/[lang]/projects/[slug]">["params"]) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();
  return project;
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/projects/[slug]">): Promise<Metadata> {
  const [locale, project] = await Promise.all([getLocale(), findProject(params)]);
  return {
    title: project.title[locale],
    description: project.summary[locale],
    alternates: localizedAlternates(locale, `/projects/${project.slug}`),
  };
}

const button =
  "inline-flex min-h-11 items-center gap-2 rounded-lg border px-4 text-sm font-semibold transition-[background-color,translate] duration-200 motion-safe:active:translate-y-px";

export default async function ProjectPage({ params }: PageProps<"/[lang]/projects/[slug]">) {
  const [locale, dict, project] = await Promise.all([
    getLocale(),
    getDictionary(),
    findProject(params),
  ]);
  const t = dict.projects;

  return (
    <PageTransition>
      <main className="px-4 py-12 md:py-16">
        <article className="mx-auto max-w-3xl">
          <Reveal index={0}>
            <Link
              href={`/${locale}/projects`}
              className="group inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              <ArrowLeft
                className="size-4 transition-transform motion-safe:group-hover:-translate-x-1"
                aria-hidden="true"
              />{" "}
              {t.back}
            </Link>
          </Reveal>

          <Reveal index={1} className="mt-6">
            <Eyebrow>{t.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal
            as="h1"
            index={2}
            className="mt-4 text-3xl font-semibold leading-[110%] text-gray-900 sm:text-4xl md:text-5xl dark:text-gray-50"
          >
            {project.title[locale]}
          </Reveal>
          <Reveal as="p" index={3} className="mt-4 text-lg leading-relaxed text-gray-600 dark:text-gray-300">
            {project.summary[locale]}
          </Reveal>

          <Reveal
            as="dl"
            index={4}
            className="mt-8 grid gap-6 border-y border-gray-200 py-6 text-sm sm:grid-cols-3 dark:border-white/10"
          >
            <div>
              <dt className="text-gray-500 dark:text-gray-400">{t.role}</dt>
              <dd className="mt-1 font-medium text-gray-900 dark:text-gray-50">{project.role[locale]}</dd>
            </div>
            <div>
              <dt className="text-gray-500 dark:text-gray-400">{t.year}</dt>
              <dd className="mt-1 font-medium text-gray-900 dark:text-gray-50">{project.year}</dd>
            </div>
            <div>
              <dt className="text-gray-500 dark:text-gray-400">{t.tech}</dt>
              <dd className="mt-1 font-medium text-gray-900 dark:text-gray-50">{project.tech.join(", ")}</dd>
            </div>
          </Reveal>

          {(project.links?.repo || project.links?.demo) && (
            <Reveal index={5} className="mt-6 flex flex-wrap gap-3">
              {project.links.demo && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${button} border-neutral-700 bg-neutral-900 text-white hover:bg-neutral-950 dark:border-white dark:bg-white dark:text-neutral-900 dark:hover:bg-gray-200`}
                >
                  {t.demo} <ArrowUpRight className="size-4" aria-hidden="true" />
                </a>
              )}
              {project.links.repo && (
                <a
                  href={project.links.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${button} border-gray-200 bg-white text-gray-900 hover:bg-gray-100 dark:border-white/10 dark:bg-neutral-900 dark:text-gray-50 dark:hover:bg-neutral-800`}
                >
                  {t.repo} <ArrowUpRight className="size-4" aria-hidden="true" />
                </a>
              )}
            </Reveal>
          )}

          {project.cover && (
            // Same name as the card cover on /projects, so it morphs between them.
            <ViewTransition name={`project-cover-${project.slug}`} share="morph" default="none">
              <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-2xl bg-gray-100 dark:bg-neutral-800">
                <Image
                  src={project.cover}
                  alt=""
                  fill
                  priority
                  sizes="(min-width: 768px) 768px, 100vw"
                  className="object-cover"
                />
              </div>
            </ViewTransition>
          )}

          <div className="mt-10 space-y-10">
            {project.sections.map((section, i) => (
              <Reveal as="section" index={6 + i} key={section.heading.en}>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50">
                  {section.heading[locale]}
                </h2>
                <div className="mt-3 space-y-4 leading-relaxed text-gray-600 dark:text-gray-300">
                  {section.body[locale].split("\n\n").map((paragraph, j) => (
                    <p key={j}>{paragraph}</p>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </article>
      </main>
    </PageTransition>
  );
}
