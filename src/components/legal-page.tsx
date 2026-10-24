import Link from "next/link";
import type { ReactNode } from "react";
import { PageIntro } from "@/components/page-intro";
import { officeAddress, phoneHref, site } from "@/data/site";

// Update this whenever the wording of any legal page changes.
export const legalUpdated = "24 October 2026";

const legalLinks = [
  { href: "/terms", label: "Terms & Conditions" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/cookies", label: "Cookie Policy" },
] as const;

export function LegalPage({
  title,
  current,
  intro,
  children,
}: {
  title: string;
  current: (typeof legalLinks)[number]["href"];
  intro: string;
  children: ReactNode;
}) {
  return (
    <>
      <PageIntro eyebrow="Legal" title={title}>
        <p>{intro}</p>
        <p className="mt-4 text-sm">Last updated {legalUpdated}</p>
      </PageIntro>
      <div className="shell grid gap-12 pb-24 sm:pb-32 lg:grid-cols-[14rem_1fr] lg:gap-20">
        <nav aria-label="Legal pages" className="lg:sticky lg:top-28 lg:self-start">
          <ul className="grid gap-3 border-t border-line pt-6 text-sm">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={link.href === current ? "page" : undefined}
                  className={
                    link.href === current
                      ? "text-accent"
                      : "transition-colors hover:text-accent"
                  }
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <article className="legal max-w-3xl border-t border-line pt-2">
          {children}
        </article>
      </div>
    </>
  );
}

// Who we are and how to reach us, shared by every legal page.
export function LegalContact() {
  return (
    <ul>
      <li>
        <strong>{site.fullName}</strong>
      </li>
      {site.offices.map((office) => (
        <li key={office.city}>
          {office.label}: {officeAddress(office)}, Pakistan
        </li>
      ))}
      <li>
        Email: <a href={`mailto:${site.email}`}>{site.email}</a>
      </li>
      <li>
        Phone / WhatsApp: <a href={phoneHref}>{site.phone}</a>
      </li>
    </ul>
  );
}
