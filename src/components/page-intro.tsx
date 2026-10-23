import type { ReactNode } from "react";

export function PageIntro({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="shell pt-32 pb-16 sm:pt-44 sm:pb-24">
      <p className="label reveal">{eyebrow}</p>
      <h1 className="display reveal reveal-delay-1 mt-5 max-w-4xl text-4xl leading-[1.08] sm:text-6xl">
        {title}
      </h1>
      {children ? (
        <div className="reveal reveal-delay-2 mt-8 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          {children}
        </div>
      ) : null}
    </section>
  );
}
