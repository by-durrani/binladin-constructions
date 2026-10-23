import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { CtaBand } from "@/components/cta-band";
import { ArrowLeft, ArrowRight } from "@/components/icons";
import { getProject, projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      images: [{ url: project.cover.src, alt: project.cover.alt }],
    },
  };
}

export default async function ProjectPage({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];

  const facts = [
    { label: "Type", value: project.category },
    { label: "Status", value: project.status },
    { label: "Location", value: project.location },
    { label: "Year", value: project.year },
    { label: "Plot", value: project.plot },
    { label: "Covered area", value: project.coveredArea },
    { label: "Duration", value: project.duration },
  ].filter((fact) => fact.value);

  return (
    <>
      <section className="shell pt-28 sm:pt-36">
        <Link href="/projects" className="link-arrow border-transparent">
          <ArrowLeft className="size-4" /> All projects
        </Link>
        <div className="mt-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="label reveal">
              {project.category} · {project.location}
            </p>
            <h1 className="display reveal reveal-delay-1 mt-4 text-4xl leading-[1.08] sm:text-6xl">
              {project.title}
            </h1>
          </div>
          {project.sample ? (
            <p className="max-w-xs text-xs leading-relaxed text-muted">
              Sample project with stock photography — shown as a layout example.
            </p>
          ) : null}
        </div>
      </section>

      <div className="shell mt-10 sm:mt-14">
        <div className="parallax relative aspect-[4/3] overflow-hidden bg-line sm:aspect-[16/9]" data-scroll>
          <Image
            src={project.cover.src}
            alt={project.cover.alt}
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover"
          />
        </div>
      </div>

      <section className="shell grid gap-14 py-16 sm:py-24 lg:grid-cols-[1fr_1.6fr]">
        <dl className="grid h-fit grid-cols-2 gap-x-6 gap-y-8 border-t border-line pt-8" data-reveal>
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt className="label">{fact.label}</dt>
              <dd className="mt-2 text-base">{fact.value}</dd>
            </div>
          ))}
        </dl>
        <div className="border-t border-line pt-8" data-reveal style={{ "--d": 1 } as CSSProperties}>
          <p className="display text-2xl leading-snug sm:text-3xl">
            {project.summary}
          </p>
          <div className="mt-8 grid gap-5 text-base leading-relaxed font-light text-muted sm:text-lg">
            {project.description.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          {project.scope.length > 0 ? (
            <>
              <h2 className="label mt-12">Scope of work</h2>
              <ul className="mt-5 flex flex-wrap gap-2">
                {project.scope.map((item) => (
                  <li key={item} className="border border-line px-4 py-2 text-sm">
                    {item}
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </div>
      </section>

      {project.gallery.length > 0 ? (
        <section className="shell pb-24 sm:pb-32" aria-label="Gallery">
          <ul className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            {project.gallery.map((image, imageIndex) => (
              <li
                key={image.src}
                data-reveal="image"
                data-scroll
                style={{ "--d": imageIndex % 3 === 0 ? 0 : (imageIndex % 3) - 1 } as CSSProperties}
                className={`parallax relative overflow-hidden bg-line ${
                  imageIndex % 3 === 0
                    ? "aspect-[4/3] sm:col-span-2 sm:aspect-[16/9]"
                    : "aspect-[4/5]"
                }`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes={
                    imageIndex % 3 === 0
                      ? "(max-width: 1280px) 100vw, 1280px"
                      : "(max-width: 640px) 100vw, 640px"
                  }
                  className="object-cover"
                />
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {next && next.slug !== project.slug ? (
        <section className="border-t border-line">
          <Link
            href={`/projects/${next.slug}`}
            className="shell group flex items-center justify-between gap-6 py-14 sm:py-20"
          >
            <div>
              <p className="label">Next project</p>
              <p className="display mt-3 text-3xl transition-colors group-hover:text-accent sm:text-5xl">
                {next.title}
              </p>
            </div>
            <ArrowRight className="size-8 shrink-0 transition-transform duration-300 group-hover:translate-x-2" />
          </Link>
        </section>
      ) : null}

      <CtaBand title="Want something like this?" />
    </>
  );
}
