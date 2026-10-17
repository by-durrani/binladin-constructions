"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";
import Image from "next/image";

const links = [
  { href: "#rooms", label: "Rooms" },
  { href: "#works", label: "Works" },
  { href: "#studio", label: "Studio" },
  { href: "#visit", label: "Visit" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background,border-color] duration-300 ${
        scrolled || open
          ? "border-b border-line bg-background/90 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:h-20 sm:px-8">
        <a
          href="#ll"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ behavior: "smooth", top: 0 });
          }}
          className="display text-[0.95rem] tracking-[0.22em] uppercase  flex gap-2 items-center  "
        >
          <Image src={"/bin-ladin.svg"} alt="logo" height={40} width={20} />
          <span className="mt-3">{site.name} </span>
        </a>
        <nav
          className="hidden items-center gap-10 md:flex"
          aria-label="Primary"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="label text-[0.65rem] text-black! transition-colors duration-200 "
            >
              {link.label}
            </a>
          ))}
        </nav>
        <button
          type="button"
          className="label flex min-h-11 min-w-11 items-center justify-end md:hidden"
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
          className="border-t border-line px-5 py-6 md:hidden"
          aria-label="Mobile"
        >
          <ul className="flex flex-col gap-4">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="display text-2xl"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
