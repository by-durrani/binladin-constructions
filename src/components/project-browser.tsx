"use client";

import { useState } from "react";
import { ProjectCard } from "@/components/project-card";
import type { Project, ProjectCategory } from "@/data/projects";

export function ProjectBrowser({
  projects,
  categories,
}: {
  projects: Project[];
  categories: ProjectCategory[];
}) {
  const [filter, setFilter] = useState<ProjectCategory | "All">("All");
  const visible =
    filter === "All"
      ? projects
      : projects.filter((project) => project.category === filter);

  return (
    <>
      {categories.length > 1 ? (
        <div
          className="mb-12 flex flex-wrap gap-2"
          role="group"
          aria-label="Filter projects by type"
        >
          {(["All", ...categories] as const).map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={filter === option}
              onClick={() => setFilter(option)}
              className={`min-h-11 border px-5 text-[0.65rem] tracking-[0.24em] uppercase transition-colors duration-200 ${
                filter === option
                  ? "border-ink bg-ink text-surface"
                  : "border-line hover:border-ink"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      ) : null}
      <p className="sr-only" aria-live="polite">
        Showing {visible.length} {visible.length === 1 ? "project" : "projects"}
      </p>
      <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>
    </>
  );
}
