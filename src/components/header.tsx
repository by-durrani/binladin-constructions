"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { Logo } from "@/components/logo";
import { navigation } from "@/data/site";

function isActive(pathname: string | null, href: string) {
  return pathname === href || Boolean(pathname?.startsWith(`${href}/`));
}

function NavList({ pathname }: { pathname: string | null }) {
  return (
    <ul className="flex items-center gap-10">
      {navigation.map((link) => {
        const active = isActive(pathname, link.href);
        return (
          <li key={link.href}>
            <Link
              href={link.href}
              aria-current={active ? "page" : undefined}
              className={`label border-b pb-1 transition-colors duration-200 hover:text-ink ${
                active ? "border-accent text-ink" : "border-transparent"
              }`}
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
function ActiveNavList() {
  return <NavList pathname={usePathname()} />;
}

function Nav() {
  return (
    <Suspense fallback={<NavList pathname={null} />}>
      <ActiveNavList />
    </Suspense>
  );
}

// Desktop and tablet header. Phones use <MobileNav> at the bottom instead.
export function Header() {
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

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 hidden border-b border-line bg-background/90 backdrop-blur-md transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none md:block ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="shell flex h-20 items-center justify-between">
        <Logo />
        <nav className="flex items-center gap-10" aria-label="Primary">
          <Nav />
          <Link href="/contact" className="btn btn-primary hidden lg:inline-flex">
            Get an estimate
          </Link>
        </nav>
      </div>
    </header>
  );
}
