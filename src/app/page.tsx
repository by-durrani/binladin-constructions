import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/cta-band";
import { ArrowRight } from "@/components/icons";
import { ProjectCard } from "@/components/project-card";
import { featuredProjects } from "@/data/projects";
import { processSteps, services } from "@/data/services";
import { mapHref, phoneHref, principles, site } from "@/data/site";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  name: site.fullName,
  description: site.description,
  url: site.url,
  telephone: site.phone,
  email: site.email,
  image: site.heroImage.src,
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

      <section className="relative min-h-dvh overflow-hidden" aria-label="Introduction">
        <Image
          src={site.heroImage.src}
          alt={site.heroImage.alt}
          fill
          priority
          sizes="100vw"
          className="hero-image object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-ink/80 via-ink/25 to-ink/10" />
        <div className="shell relative flex min-h-dvh flex-col justify-end pt-28 pb-24 sm:pb-20">
          <p className="label reveal text-white/75">
            Construction · {site.city}
          </p>
          <h1 className="display reveal reveal-delay-1 mt-5 max-w-4xl text-4xl leading-[1.05] text-white sm:text-6xl lg:text-7xl">
            Homes built properly, from foundation to finish.
          </h1>
          <p className="reveal reveal-delay-2 mt-6 max-w-xl text-base leading-relaxed font-light text-white/85 sm:text-lg">
            {site.fullName} designs and builds houses and commercial spaces —
            grey structure, turnkey homes, finishing and renovation, delivered
            by one accountable team.
          </p>
          <div className="reveal reveal-delay-3 mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href="/projects" className="btn btn-light">
              View our projects <ArrowRight className="size-4" />
            </Link>
            <Link href="/contact" className="btn btn-ghost-light">
              Request an estimate
            </Link>
          </div>
        </div>
      </section>

      <section className="shell py-20 sm:py-28">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:items-end">
          <p className="label">Who we are</p>
          <div>
            <p className="display max-w-3xl text-3xl leading-snug sm:text-4xl">
              A construction company for people who want their house built
              once, and built right.
            </p>
            <Link href="/about" className="link-arrow mt-10">
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
            <div>
              <p className="label">What we do</p>
              <h2 id="services-heading" className="display mt-4 text-3xl sm:text-5xl">
                Services
              </h2>
            </div>
            <Link href="/services" className="link-arrow w-fit">
              All services <ArrowRight className="size-4" />
            </Link>
          </div>
          <ul className="grid border-t border-l border-line sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <li key={service.id} className="border-r border-b border-line">
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
            <div>
              <p className="label">Selected work</p>
              <h2 id="projects-heading" className="display mt-4 text-3xl sm:text-5xl">
                Projects
              </h2>
            </div>
            <Link href="/projects" className="link-arrow w-fit">
              All projects <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.slice(0, 3).map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>
      ) : null}

      <section className="bg-ink py-24 text-surface sm:py-32" aria-labelledby="process-heading">
        <div className="shell">
          <p className="label text-surface/60">How we work</p>
          <h2 id="process-heading" className="display mt-4 max-w-2xl text-3xl leading-tight sm:text-5xl">
            One clear process, from first visit to handover.
          </h2>
          <ol className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">
            {processSteps.map((step, index) => (
              <li key={step.title} className="border-t border-surface/20 pt-6">
                <span className="label text-surface/50">
                  Step {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="display mt-4 text-xl">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed font-light text-surface/70">
                  {step.copy}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="shell py-24 sm:py-32" aria-labelledby="why-heading">
        <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
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
            {principles.map((item) => (
              <li key={item.name} className="border-t border-line pt-6">
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
