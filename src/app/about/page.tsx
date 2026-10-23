import type { Metadata } from "next";
import Image from "next/image";
import type { CSSProperties } from "react";
import { CtaBand } from "@/components/cta-band";
import { PageIntro } from "@/components/page-intro";
import { principles, site } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description: `${site.fullName} is a residential and commercial construction company based in ${site.city}.`,
};

export default function AboutPage() {
  return (
    <>
      <PageIntro eyebrow="About" title="Construction is a promise. We build to keep it.">
        <p>
          {site.fullName} is a construction company based in {site.city}. We
          build homes and commercial spaces for clients who care how a building
          is made — not only how it looks on handover day.
        </p>
      </PageIntro>

      <div className="shell">
        <div className="relative aspect-[4/3] overflow-hidden bg-line sm:aspect-[21/9]" data-reveal="image">
          <Image
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2400&q=80"
            alt="Sunlit entry hall with plaster walls, oak flooring, and a sculptural staircase"
            fill
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover"
          />
        </div>
      </div>

      <section className="shell grid gap-12 py-24 sm:py-32 lg:grid-cols-2 lg:gap-24">
        <p className="display text-3xl leading-snug sm:text-4xl" data-reveal>
          We take responsibility for the whole building — the parts you see,
          and the parts inside the walls.
        </p>
        <div className="grid gap-6 text-base leading-relaxed font-light text-muted sm:text-lg" data-reveal style={{ "--d": 1 } as CSSProperties}>
          <p>
            A house is the largest thing most families will ever buy, and most
            of what makes it good is hidden: the foundations, the steel, the
            waterproofing, the wiring. That is where we spend our attention.
          </p>
          <p>
            We work from clear drawings and an itemised estimate, keep you
            informed while the house rises, and finish every room as if we
            were going to live in it.
          </p>
        </div>
      </section>

      <section className="border-t border-line bg-surface py-24 sm:py-32" aria-labelledby="values-heading">
        <div className="shell">
          <p className="label" data-reveal>What we stand by</p>
          <h2 id="values-heading" className="display mt-4 text-3xl sm:text-5xl">
            Our principles
          </h2>
          <ul className="mt-14 grid gap-10 sm:grid-cols-2">
            {principles.map((item, index) => (
              <li key={item.name} className="border-t border-line pt-6" data-reveal style={{ "--d": index % 2 } as CSSProperties}>
                <span className="label">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="display mt-4 text-2xl">{item.name}</h3>
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
