"use client";

import { usePathname } from "next/navigation";
import {
  type ComponentProps,
  type ReactNode,
  Suspense,
  useEffect,
  useRef,
} from "react";

// Reveals every [data-reveal] element as it scrolls into view. Content is
// visible by default; it is only hidden once this has run, so nothing is lost
// if JavaScript fails. Under reduced motion the CSS turns reveals into fades.
export function ScrollReveal() {
  useEffect(() => {
    const root = document.documentElement;

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

// Scroll-linked ("scrubbed") motion. Every [data-scroll] element on screen
// gets --progress: 0 as its top enters the bottom of the viewport, 1 as its
// bottom leaves the top. <html> gets --page-progress for the whole page.
// CSS decides what each value moves, and falls back to a resting state when
// this never runs. Under reduced motion the CSS keeps only non-moving effects.
export function ScrollScenes() {
  useEffect(() => {
    const root = document.documentElement;
    const onScreen = new Set<HTMLElement>();
    let frame = 0;

    const measure = (element: HTMLElement, viewport: number) => {
      const rect = element.getBoundingClientRect();
      const progress = (viewport - rect.top) / (viewport + rect.height);
      element.style.setProperty(
        "--progress",
        Math.min(1, Math.max(0, progress)).toFixed(4),
      );
    };
    const update = () => {
      frame = 0;
      const viewport = window.innerHeight;
      const scrollable = root.scrollHeight - viewport;
      root.style.setProperty(
        "--page-progress",
        scrollable > 0 ? (window.scrollY / scrollable).toFixed(4) : "0",
      );
      onScreen.forEach((element) => measure(element, viewport));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    // Off-screen elements start from their real position, not the CSS
    // fallback, so nothing jumps as it enters the viewport.
    const measureAll = () => {
      document
        .querySelectorAll<HTMLElement>("[data-scroll]")
        .forEach((element) => measure(element, window.innerHeight));
    };

    const visibility = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const element = entry.target as HTMLElement;
        if (entry.isIntersecting) onScreen.add(element);
        else onScreen.delete(element);
      }
      schedule();
    });
    const observe = (scope: ParentNode) => {
      scope
        .querySelectorAll<HTMLElement>("[data-scroll]")
        .forEach((element) => visibility.observe(element));
    };
    observe(document);

    const mutations = new MutationObserver((records) => {
      for (const record of records) {
        record.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          if (node.matches("[data-scroll]")) visibility.observe(node);
          observe(node);
        });
        if (record.addedNodes.length > 0) measureAll();
        record.removedNodes.forEach((node) => {
          if (node instanceof HTMLElement) onScreen.delete(node);
        });
      }
      schedule();
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("scroll", schedule, { passive: true });
    const onResize = () => {
      measureAll();
      schedule();
    };
    window.addEventListener("resize", onResize);
    measureAll();
    update();

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", onResize);
      visibility.disconnect();
      mutations.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="page-progress pointer-events-none fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-accent"
    />
  );
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

// Shows its content only while the box is at least `minHeight` tall, for
// decoration that is pointless when squeezed (CSS: [data-fits="false"]).
export function SizeGate({
  minHeight,
  className,
  children,
}: {
  minHeight: number;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => {
      element.dataset.fits = String(entry.contentRect.height >= minHeight);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [minHeight]);

  return (
    <div ref={ref} className={className} data-fits="false" aria-hidden="true">
      {children}
    </div>
  );
}

// First-load animations wait for the logo intro via --intro. Once the visitor
// moves to another page that wait no longer applies, so clear it then —
// not on a timer, which would jolt the hero animations still running.
function IntroSettleInner() {
  const pathname = usePathname();
  const first = useRef(pathname);

  useEffect(() => {
    if (pathname !== first.current) {
      document.documentElement.classList.add("intro-seen");
    }
  }, [pathname]);

  return null;
}

export function IntroSettle() {
  return (
    <Suspense fallback={null}>
      <IntroSettleInner />
    </Suspense>
  );
}
