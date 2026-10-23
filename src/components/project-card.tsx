import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import type { Project } from "@/data/projects";

export function ProjectCard({
  project,
  index = 0,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
}: {
  project: Project;
  index?: number;
  sizes?: string;
}) {
  return (
    <article className="group relative">
      <div
        className="zoom-frame relative aspect-[4/5] overflow-hidden bg-line"
        data-reveal="image"
        style={{ "--d": index % 3 } as CSSProperties}
      >
        <Image
          src={project.cover.src}
          alt={project.cover.alt}
          fill
          sizes={sizes}
          className="object-cover"
        />
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          <span className="bg-surface/90 px-3 py-1.5 text-[0.6rem] tracking-[0.22em] text-ink uppercase backdrop-blur-sm">
            {project.status}
          </span>
          {project.sample ? (
            <span className="bg-ink/70 px-3 py-1.5 text-[0.6rem] tracking-[0.22em] text-white uppercase backdrop-blur-sm">
              Sample project
            </span>
          ) : null}
        </div>
      </div>
      <div className="mt-5 flex items-baseline justify-between gap-4">
        <h3 className="display text-2xl">
          <Link
            href={`/projects/${project.slug}`}
            className="after:absolute after:inset-0 group-hover:text-accent"
          >
            {project.title}
          </Link>
        </h3>
        <span className="label shrink-0">{project.year}</span>
      </div>
      <p className="mt-2 text-sm font-light text-muted">
        {[project.category, project.location, project.plot]
          .filter(Boolean)
          .join(" · ")}
      </p>
    </article>
  );
}
