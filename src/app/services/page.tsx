import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { CtaBand } from "@/components/cta-band";
import { KineticBand } from "@/components/kinetic-band";
import { PageIntro } from "@/components/page-intro";
import { faqs, processSteps, services } from "@/data/services";

const delay = (step: number) => ({ "--d": step }) as CSSProperties;

export const metadata: Metadata = {
  title: "Services",
  description:
    "Turnkey homes, grey structure, finishing, renovation, commercial construction, and design & approvals in Islamabad.",
};

export default function ServicesPage() {
  return (
    <>
      <PageIntro eyebrow="Services" title="Everything a building needs, under one contract.">
        <p>
          Take one service or all of them. Either way you deal with one team
          that is accountable for the whole job.
        </p>
      </PageIntro>

      <section className="border-t border-line" aria-label="Our services">
        {services.map((service, index) => (
          <article
            key={service.id}
            id={service.id}
            className="border-b border-line"
          >
            <div className="shell grid gap-8 py-14 sm:py-20 lg:grid-cols-[0.3fr_1fr_1fr] lg:gap-16">
              <span className="label" data-reveal>{String(index + 1).padStart(2, "0")}</span>
              <div data-reveal style={delay(1)}>
                <h2 className="display text-3xl leading-tight sm:text-4xl">
                  {service.title}
                </h2>
                <p className="mt-5 max-w-md text-base leading-relaxed font-light text-muted">
                  {service.summary}
                </p>
              </div>
              <ul className="grid gap-3 self-end">
                {service.points.map((point, pointIndex) => (
                  <li
                    key={point}
                    data-reveal
                    style={delay(pointIndex + 2)}
                    className="flex gap-4 border-t border-line pt-3 text-base font-light"
                  >
                    <span aria-hidden="true" className="text-accent">
                      —
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </section>

      <KineticBand lines={["Design · Approvals · Structure ·", "Finishing · Handover ·"]} />

      <section className="bg-surface py-24 sm:py-32" aria-labelledby="process-heading">
        <div className="shell">
          <p className="label" data-reveal>How we work</p>
          <h2 id="process-heading" className="display mt-4 max-w-2xl text-3xl leading-tight sm:text-5xl" data-reveal style={delay(1)}>
            From first visit to handover.
          </h2>
          <ol className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">
            {processSteps.map((step, index) => (
              <li key={step.title}>
                <span className="block h-px bg-line" data-reveal="line" style={delay(index)} />
                <div className="pt-6" data-reveal style={delay(index + 1)}>
                  <span className="label">Step {String(index + 1).padStart(2, "0")}</span>
                  <h3 className="display mt-4 text-xl">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed font-light text-muted">
                    {step.copy}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="shell grid gap-12 py-24 sm:py-32 lg:grid-cols-[0.8fr_1.2fr]" aria-labelledby="faq-heading">
        <div data-reveal>
          <p className="label">Questions</p>
          <h2 id="faq-heading" className="display mt-4 text-3xl sm:text-5xl">
            Common questions
          </h2>
        </div>
        <div className="border-t border-line">
          {faqs.map((faq, index) => (
            <details key={faq.question} className="group border-b border-line" data-reveal style={delay(index)}>
              <summary className="flex min-h-16 list-none items-center justify-between gap-6 py-5 text-lg [&::-webkit-details-marker]:hidden">
                {faq.question}
                <span
                  aria-hidden="true"
                  className="text-2xl font-light text-accent transition-transform duration-200 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="max-w-xl pb-6 text-base leading-relaxed font-light text-muted">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
