"use client";

import { type ComponentProps, useEffect, useRef } from "react";

// Reveals every [data-reveal] element as it scrolls into view. Content is
// visible by default; it is only hidden once this has run, so nothing is lost
// if JavaScript fails.
export function ScrollReveal() {
  useEffect(() => {
    const root = document.documentElement;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );

    const observe = (scope: ParentNode) => {
      scope
        .querySelectorAll("[data-reveal]:not(.is-visible)")
        .forEach((element) => observer.observe(element));
    };

    // Anything already on screen stays put instead of blinking out and back.
    document.querySelectorAll("[data-reveal]").forEach((element) => {
      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        element.classList.add("is-visible", "no-transition");
      }
    });
    root.classList.add("motion");
    requestAnimationFrame(() => {
      document
        .querySelectorAll(".no-transition")
        .forEach((element) => element.classList.remove("no-transition"));
    });
    observe(document);

    // Pick up elements added by client-side navigation or filtering.
    const mutations = new MutationObserver((records) => {
      for (const record of records) {
        record.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          if (node.matches("[data-reveal]")) observer.observe(node);
          observe(node);
        });
      }
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
      root.classList.remove("motion");
    };
  }, []);

  return null;
}

// Exposes how far the hero has scrolled out of view (0–1) as --hero-progress.
export function HeroScroll(props: ComponentProps<"section">) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const progress = Math.min(
        1,
        Math.max(0, window.scrollY / element.offsetHeight),
      );
      element.style.setProperty("--hero-progress", progress.toFixed(4));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <section ref={ref} {...props} />;
}
