import type { Metadata } from "next";
import { CtaBand } from "@/components/cta-band";
import { PageIntro } from "@/components/page-intro";
import { ProjectBrowser } from "@/components/project-browser";
import { categories, projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Houses, renovations and commercial buildings delivered by BIN LADIN Constructions.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageIntro eyebrow="Portfolio" title="Projects">
        <p>
          Homes and buildings we have designed, built and finished — from grey
          structure to the last coat of paint.
        </p>
      </PageIntro>
      <section className="shell pb-24 sm:pb-32" aria-label="All projects">
        {projects.length > 0 ? (
          <ProjectBrowser projects={projects} categories={categories} />
        ) : (
          <p className="text-muted">New projects are being added soon.</p>
        )}
      </section>
      <CtaBand />
    </>
  );
}
