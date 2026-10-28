import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Eyebrow } from "@/components/eyebrow";
import { PageTransition } from "@/components/page-transition";
import { Reveal } from "@/components/reveal";
import { profile } from "@/content/profile";
import { localizedAlternates } from "@/lib/i18n";
import { getDictionary, getLocale } from "../dictionaries";

export async function generateMetadata(): Promise<Metadata> {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  return {
    title: dict.profile.metaTitle,
    description: dict.profile.metaDescription,
    alternates: localizedAlternates(locale, "/profile"),
  };
}

const card =
  "rounded-2xl border border-gray-200 bg-white p-6 dark:border-white/10 dark:bg-neutral-900";
// Listed properties only: Reveal drives opacity/transform/filter inline, and a
// CSS transition on those would drag behind its animation.
const cardHover =
  "transition-[translate,box-shadow,border-color] duration-300 hover:border-gray-300 hover:shadow-lg hover:shadow-neutral-900/5 motion-safe:hover:-translate-y-1 dark:hover:border-white/20 dark:hover:shadow-black/40";
const sectionHeading = "text-xl font-semibold text-gray-900 dark:text-gray-50";

export default async function ProfilePage() {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  const t = dict.profile;

  const info = [
    { label: t.fields.position, value: profile.position },
    { label: t.fields.company, value: profile.company },
  ];

  // Stagger order continues down the right-hand column.
  const afterExperience = 5 + profile.experience.length;

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
            {profile.name}
          </Reveal>
          <Reveal as="p" index={2} className="mt-3 font-semibold text-red-500 sm:text-lg">
            {dict.about.role}
          </Reveal>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <Reveal as="aside" index={3} className="md:col-span-1">
              <section className={`${card} ${cardHover}`} aria-labelledby="info-heading">
                <h2 id="info-heading" className={sectionHeading}>
                  {t.infoHeading}
                </h2>
                <dl className="mt-6 space-y-4 text-sm">
                  {info.map(({ label, value }) => (
                    <div key={label}>
                      <dt className="text-gray-500 dark:text-gray-400">{label}</dt>
                      <dd className="mt-1 font-medium text-gray-900 dark:text-gray-50">{value}</dd>
                    </div>
                  ))}
                  <div>
                    <dt className="text-gray-500 dark:text-gray-400">{t.fields.email}</dt>
                    <dd className="mt-1 font-medium">
                      <a
                        href={`mailto:${profile.email}`}
                        className="break-all text-gray-900 underline decoration-gray-300 underline-offset-4 transition-colors hover:decoration-red-500 dark:text-gray-50 dark:decoration-white/30"
                      >
                        {profile.email}
                      </a>
                    </dd>
                  </div>
                </dl>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {profile.socials.map((social) => (
                    <li key={social.label}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex min-h-11 items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-4 text-sm font-semibold text-gray-900 transition-[background-color,translate] duration-200 hover:bg-gray-100 motion-safe:active:translate-y-px dark:border-white/10 dark:bg-white/5 dark:text-gray-50 dark:hover:bg-white/10"
                      >
                        <span className="flex size-6 items-center justify-center rounded bg-white">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={social.icon} alt="" width={16} height={16} />
                        </span>
                        {social.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>

            <div className="space-y-12 md:col-span-2">
              <Reveal index={4}>
                <section aria-labelledby="about-heading">
                  <h2 id="about-heading" className={sectionHeading}>
                    {t.aboutHeading}
                  </h2>
                  <div className="mt-4 space-y-4 leading-relaxed text-gray-600 dark:text-gray-300">
                    {dict.about.paragraphs.map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>
                </section>
              </Reveal>

              <section aria-labelledby="experience-heading">
                <Reveal index={5}>
                  <h2 id="experience-heading" className={sectionHeading}>
                    {t.experienceHeading}
                  </h2>
                </Reveal>
                <ol className="mt-4 space-y-4">
                  {profile.experience.map((job, i) => (
                    <Reveal
                      as="li"
                      index={5 + i}
                      key={`${job.company}-${job.position}`}
                      className={`${card} ${cardHover}`}
                    >
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-gray-50">{job.position}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{job.company}</p>
                        </div>
                        <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600 dark:bg-red-500/15 dark:text-red-300">
                          {job.period[locale]}
                        </span>
                      </div>
                      {job.description && (
                        <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                          {job.description[locale]}
                        </p>
                      )}
                    </Reveal>
                  ))}
                </ol>
              </section>

              {profile.skills.length > 0 && (
                <Reveal index={afterExperience}>
                  <section aria-labelledby="skills-heading">
                    <h2 id="skills-heading" className={sectionHeading}>
                      {t.skillsHeading}
                    </h2>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {profile.skills.map((skill) => (
                        <li
                          key={skill}
                          className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 transition-colors hover:border-red-300 hover:text-red-600 dark:border-white/10 dark:bg-neutral-900 dark:text-gray-200 dark:hover:border-red-400/50 dark:hover:text-red-300"
                        >
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </section>
                </Reveal>
              )}

              {profile.education.length > 0 && (
                <section aria-labelledby="education-heading">
                  <Reveal index={afterExperience + 1}>
                    <h2 id="education-heading" className={sectionHeading}>
                      {t.educationHeading}
                    </h2>
                  </Reveal>
                  <ol className="mt-4 space-y-4">
                    {profile.education.map((item, i) => (
                      <Reveal
                        as="li"
                        index={afterExperience + 1 + i}
                        key={item.school}
                        className={`${card} ${cardHover}`}
                      >
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-gray-50">{item.school}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-300">{item.degree[locale]}</p>
                          </div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">{item.period}</span>
                        </div>
                      </Reveal>
                    ))}
                  </ol>
                </section>
              )}

              <Reveal index={afterExperience + 2}>
                <Link
                  href={`/${locale}/projects`}
                  className="inline-flex gap-2 rounded-lg border border-neutral-700 bg-neutral-900 px-5 py-3 font-semibold text-white transition-all duration-300 hover:gap-4 hover:bg-neutral-950 motion-safe:active:scale-[0.98] dark:border-white dark:bg-white dark:text-neutral-900 dark:hover:bg-gray-200"
                >
                  {t.cta} <ArrowRight aria-hidden="true" />
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </main>
    </PageTransition>
  );
}
