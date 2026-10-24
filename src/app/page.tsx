import Link from "next/link";
import type { CSSProperties } from "react";
import { CtaBand } from "@/components/cta-band";
import { Hero } from "@/components/hero";
import { KineticBand } from "@/components/kinetic-band";
import { ArrowRight } from "@/components/icons";
import { ProjectCard } from "@/components/project-card";
import { ScrollText } from "@/components/scroll-text";
import { featuredProjects } from "@/data/projects";
import { processSteps, services } from "@/data/services";
import { mapHref, phoneHref, principles, site } from "@/data/site";

const delay = (step: number) => ({ "--d": step }) as CSSProperties;

const structuredData = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  name: site.fullName,
  description: site.description,
  url: site.url,
  telephone: site.phone,
  email: site.email,
  image: site.heroImage.src,
  logo: new URL("/brand/logo-stacked.svg", site.url).toString(),
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address,
    addressLocality: site.city,
    addressCountry: "PK",
  },
  areaServed: site.city,
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <Hero />

      <section className="shell py-20 sm:py-28">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:items-end">
          <p className="label" data-reveal>Who we are</p>
          <div>
            <ScrollText
              className="display max-w-3xl text-3xl leading-snug sm:text-5xl"
              text="A construction company for people who want their house built once, and built right."
            />
            <Link href="/about" className="link-arrow mt-10" data-reveal>
              About the company <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <section
        className="border-y border-line bg-surface py-20 sm:py-28"
        aria-labelledby="services-heading"
      >
        <div className="shell">
          <div className="mb-14 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div data-reveal>
              <p className="label">What we do</p>
              <h2 id="services-heading" className="display mt-4 text-3xl sm:text-5xl">
                Services
              </h2>
            </div>
            <Link href="/services" className="link-arrow w-fit" data-reveal style={delay(1)}>
              All services <ArrowRight className="size-4" />
            </Link>
          </div>
          <ul className="grid border-t border-l border-line sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <li
                key={service.id}
                className="border-r border-b border-line"
                data-reveal
                style={delay(index % 3)}
              >
                <Link
                  href={`/services#${service.id}`}
                  className="group flex h-full flex-col p-8 transition-colors duration-200 hover:bg-background sm:p-10"
                >
                  <span className="label">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="display mt-8 text-2xl group-hover:text-accent">
                    {service.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed font-light text-muted">
                    {service.summary}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {featuredProjects.length > 0 ? (
        <section className="shell py-24 sm:py-32" aria-labelledby="projects-heading">
          <div className="mb-14 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div data-reveal>
              <p className="label">Selected work</p>
              <h2 id="projects-heading" className="display mt-4 text-3xl sm:text-5xl">
                Projects
              </h2>
            </div>
            <Link href="/projects" className="link-arrow w-fit" data-reveal style={delay(1)}>
              All projects <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.slice(0, 3).map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </div>
        </section>
      ) : null}

      <KineticBand lines={["Foundation · Structure · Finish ·", "Built to last · Islamabad ·"]} />

      <section className="bg-ink py-24 text-surface sm:py-32" aria-labelledby="process-heading">
        <div className="shell">
          <p className="label text-surface/60" data-reveal>How we work</p>
          <h2 id="process-heading" className="display mt-4 max-w-2xl text-3xl leading-tight sm:text-5xl" data-reveal style={delay(1)}>
            One clear process, from first visit to handover.
          </h2>
          <ol className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">
            {processSteps.map((step, index) => (
              <li key={step.title}>
                <span className="block h-px bg-surface/25" data-reveal="line" style={delay(index)} />
                <div className="pt-6" data-reveal style={delay(index + 1)}>
                  <span className="label text-surface/50">
                    Step {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="display mt-4 text-xl">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed font-light text-surface/70">
                    {step.copy}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="shell py-24 sm:py-32" aria-labelledby="why-heading">
        <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr]">
          <div data-reveal>
            <p className="label">Why {site.name}</p>
            <h2 id="why-heading" className="display mt-4 max-w-md text-3xl leading-tight sm:text-5xl">
              Built to last, without surprises.
            </h2>
            <dl className="mt-12 grid gap-6 text-sm">
              <div>
                <dt className="label">Office</dt>
                <dd className="mt-2 font-light">
                  <a href={mapHref} target="_blank" rel="noreferrer" className="hover:text-accent">
                    {site.address}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="label">Call</dt>
                <dd className="mt-2 font-light">
                  <a href={phoneHref} className="hover:text-accent">
                    {site.phone}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
          <ul className="grid gap-10">
            {principles.map((item, index) => (
              <li key={item.name} className="border-t border-line pt-6" data-reveal style={delay(index)}>
                <h3 className="display text-2xl">{item.name}</h3>
                <p className="mt-3 max-w-lg text-base leading-relaxed font-light text-muted">
                  {item.copy}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
