"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ComponentType, type SVGProps, Suspense } from "react";
import { Monogram } from "@/components/brand";
import {
  ChatIcon,
  GridIcon,
  LayersIcon,
  MailIcon,
  UserIcon,
} from "@/components/icons";
import { site, whatsappHref } from "@/data/site";

const items: {
  href: string;
  label: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
}[] = [
  { href: "/projects", label: "Projects", Icon: GridIcon },
  { href: "/services", label: "Services", Icon: LayersIcon },
  { href: "/about", label: "About", Icon: UserIcon },
  { href: "/contact", label: "Contact", Icon: MailIcon },
];

function isActive(pathname: string | null, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || Boolean(pathname?.startsWith(`${href}/`));
}

function Items({ pathname }: { pathname: string | null }) {
  const home = isActive(pathname, "/");

  return (
    <>
      <Link
        href="/"
        aria-label={`${site.fullName} — home`}
        aria-current={home ? "page" : undefined}
        className={`flex size-11 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
          home ? "bg-ink text-surface" : "text-ink hover:bg-ink/5"
        }`}
      >
        <Monogram className="h-5 w-auto" />
      </Link>
      {items.map(({ href, label, Icon }) => {
        const active = isActive(pathname, href);
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={`flex min-h-11 min-w-0 flex-1 flex-col items-center justify-center gap-0.5 rounded-full px-1 transition-colors duration-300 ${
              active ? "bg-ink text-surface" : "text-ink/75 hover:text-ink"
            }`}
          >
            <Icon className="size-[18px]" />
            <span className="text-[0.6rem] leading-none tracking-[0.06em]">
              {label}
            </span>
          </Link>
        );
      })}
    </>
  );
}

// The pathname suspends while dynamic routes prerender; fall back to the
// same bar without a highlighted item.
function ActiveItems() {
  return <Items pathname={usePathname()} />;
}

export function MobileNav() {
  return (
    <nav
      aria-label="Primary"
      className="mobile-nav fixed inset-x-3 z-40 md:hidden"
    >
      <div className="glass flex items-center gap-1 rounded-full p-1.5">
        <Suspense fallback={<Items pathname={null} />}>
          <ActiveItems />
        </Suspense>
        <a
          href={whatsappHref("Hello, I would like to discuss a construction project.")}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat with us on WhatsApp"
          className="flex size-11 shrink-0 items-center justify-center rounded-full bg-accent text-white transition-colors duration-300 hover:bg-ink"
        >
          <ChatIcon className="size-5" />
        </a>
      </div>
    </nav>
  );
}
