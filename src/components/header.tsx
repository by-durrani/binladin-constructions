"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { Logo } from "@/components/logo";
import { navigation } from "@/data/site";

type NavProps = {
  variant: "desktop" | "mobile";
  onNavigate?: () => void;
};

function isActive(pathname: string | null, href: string) {
  return pathname === href || Boolean(pathname?.startsWith(`${href}/`));
}

function NavList({ variant, onNavigate, pathname }: NavProps & { pathname: string | null }) {
  return (
    <ul
      className={
        variant === "desktop"
          ? "flex items-center gap-10"
          : "flex flex-col gap-5"
      }
    >
      {navigation.map((link) => {
        const active = isActive(pathname, link.href);
        return (
          <li key={link.href}>
            <Link
              href={link.href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={
                variant === "desktop"
                  ? `label border-b pb-1 transition-colors duration-200 hover:text-ink ${
                      active
                        ? "border-accent text-ink"
                        : "border-transparent"
                    }`
                  : `display text-3xl ${active ? "text-accent" : ""}`
              }
            >
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

// Reading the pathname suspends while dynamic routes prerender, so it sits
// behind a boundary that falls back to the same links without highlighting.
function ActiveNavList(props: NavProps) {
  const pathname = usePathname();
  return <NavList {...props} pathname={pathname} />;
}

function Nav(props: NavProps) {
  return (
    <Suspense fallback={<NavList {...props} pathname={null} />}>
      <ActiveNavList {...props} />
    </Suspense>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  // Slide away while scrolling down, come back on any scroll up.
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - lastY) < 6) return;
      setHidden(y > lastY && y > 160);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b border-line bg-background/90 backdrop-blur-md transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
        hidden && !open ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="shell flex h-16 items-center justify-between sm:h-20">
        <Logo onClick={close} />
        <nav className="hidden items-center gap-10 md:flex" aria-label="Primary">
          <Nav variant="desktop" />
          <Link href="/contact" className="btn btn-primary hidden lg:inline-flex">
            Get an estimate
          </Link>
        </nav>
        <button
          type="button"
          className="label flex min-h-11 min-w-11 items-center justify-end text-ink md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>
      {open ? (
        <nav
          id="mobile-nav"
          className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-background px-5 py-10 md:hidden"
          aria-label="Mobile"
        >
          <Nav variant="mobile" onNavigate={close} />
          <Link href="/contact" onClick={close} className="btn btn-primary mt-12 w-full">
            Get an estimate
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
