import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { Blueprint } from "@/components/blueprint";
import { ArrowRight } from "@/components/icons";
import { HeroScroll } from "@/components/motion";
import { services } from "@/data/services";
import { site } from "@/data/site";

const headline = "Homes built properly, from foundation to finish.";

export function Hero() {
  const words = headline.split(" ");

  return (
    <HeroScroll
      // On phones the bottom padding keeps the marquee clear of the nav bar.
      className="relative flex min-h-dvh flex-col overflow-hidden bg-ink pb-[calc(env(safe-area-inset-bottom,0px)+4.75rem)] md:pb-0"
      aria-label="Introduction"
    >
      <div className="hero-media absolute inset-0">
        <Image
          src={site.heroImage.src}
          alt={site.heroImage.alt}
          fill
          priority
          sizes="100vw"
          className="hero-image object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-linear-to-t from-ink/90 via-ink/55 to-ink/25 md:from-ink/85 md:via-ink/35 md:to-ink/15" />
      <div className="absolute inset-0 hidden bg-linear-to-l from-ink/55 to-transparent lg:block" />

      {/* Architectural grid lines that grow down the page. */}
      <div className="shell pointer-events-none absolute inset-0 hidden justify-between sm:flex" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((line) => (
          <span
            key={line}
            className="grid-line h-full w-px bg-white/10"
            style={{ "--d": line } as CSSProperties}
          />
        ))}
      </div>

      <div className="hero-content pointer-events-none absolute inset-y-0 right-0 hidden w-[46vw] max-w-[660px] items-center pr-[4vw] lg:flex">
        <Blueprint className="w-full text-white/70" />
      </div>

      <div className="hero-content shell relative flex flex-1 flex-col justify-end pt-10 pb-8 sm:pt-28 sm:pb-16">
        {/* Smaller screens: the drawing always gets at least 7rem above the
            text and grows into any extra space; on very short phones the
            hero grows a little taller rather than dropping it. */}
        <div
          aria-hidden="true"
          className="pointer-events-none relative mb-6 min-h-28 flex-1 sm:mb-8 lg:hidden"
        >
          <Blueprint
            className="absolute inset-0 size-full text-white/55"
            align="xMaxYMax meet"
            strokeWidth={3}
          />
        </div>
        <p className="label reveal text-white/75">
          <span className="mr-3 inline-block h-px w-10 bg-white/50 align-middle" />
          Construction · {site.cities.join(" · ")}
        </p>
        <h1 className="display mt-5 max-w-4xl text-4xl leading-[1.08] text-white sm:text-6xl lg:max-w-[52vw] lg:text-7xl">
          {words.map((word, index) => (
            <span key={index}>
              <span className="mask-line">
                <span
                  className="mask-word"
                  style={{ "--i": index } as CSSProperties}
                >
                  {word}
                </span>
              </span>
              {index < words.length - 1 ? " " : null}
            </span>
          ))}
        </h1>
        {/* Phones skip the paragraph: the marquee lists the services, and the
            text competes with the photo on small screens. */}
        <p className="reveal hero-delay-copy mt-6 hidden max-w-xl text-base leading-relaxed font-light text-white/85 sm:block sm:text-lg">
          {site.fullName} designs and builds houses and commercial spaces —
          grey structure, turnkey homes, finishing and renovation, delivered by
          one accountable team.
        </p>
        <div className="reveal hero-delay-actions mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row">
          <Link href="/projects" className="btn btn-light">
            View our projects <ArrowRight className="size-4" />
          </Link>
          <Link href="/contact" className="btn btn-ghost-light">
            Request an estimate
          </Link>
        </div>
      </div>

      <div className="scroll-cue pointer-events-none absolute right-10 bottom-28 hidden flex-col items-center gap-3 lg:flex" aria-hidden="true">
        <span className="label text-[0.6rem] text-white/60 [writing-mode:vertical-rl]">
          Scroll
        </span>
        <span className="relative h-16 w-px overflow-hidden bg-white/20">
          <span className="scroll-cue-bar absolute inset-x-0 top-0 h-1/2 bg-white" />
        </span>
      </div>

      <div className="marquee-wrap relative border-t border-white/15 py-5 text-white/80" aria-hidden="true">
        <div className="marquee">
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex shrink-0">
              {services.map((service) => (
                <li
                  key={service.id}
                  className="display flex items-center gap-10 pr-10 text-lg tracking-[0.12em] whitespace-nowrap uppercase sm:text-xl"
                >
                  {service.title}
                  <span className="size-1.5 rotate-45 bg-white/45" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </HeroScroll>
  );
}
