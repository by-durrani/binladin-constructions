import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRight } from "@/components/icons";
import { whatsappHref } from "@/data/site";

export function CtaBand({
  title = "Planning to build?",
  copy = "Tell us about your plot, your drawings, or the house you have in mind. We will visit, listen, and come back with a clear estimate.",
}: {
  title?: string;
  copy?: string;
}) {
  return (
    <section className="bg-accent text-white">
      <div className="shell grid gap-10 py-20 sm:py-28 lg:grid-cols-[1.3fr_1fr] lg:items-end">
        <div data-reveal>
          <p className="label text-white/70">Start a project</p>
          <h2 className="display mt-4 text-3xl leading-tight sm:text-5xl">
            {title}
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed font-light text-white/80">
            {copy}
          </p>
        </div>
        <div
          className="flex flex-col gap-3 sm:flex-row lg:justify-end"
          data-reveal
          style={{ "--d": 1 } as CSSProperties}
        >
          <Link href="/contact" className="btn btn-light">
            Request an estimate <ArrowRight className="size-4" />
          </Link>
          <a
            href={whatsappHref()}
            target="_blank"
            rel="noreferrer"
            className="btn btn-ghost-light"
          >
            WhatsApp us
          </a>
        </div>
      </div>
    </section>
  );
}
