import Link from "next/link";
import { Logo } from "@/components/logo";
import { services } from "@/data/services";
import {
  mapHref,
  navigation,
  phoneHref,
  site,
  whatsappHref,
} from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="shell grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr] lg:py-20">
        <div>
          <Logo />
          <p className="mt-6 max-w-xs text-sm leading-relaxed font-light text-muted">
            {site.description}
          </p>
        </div>
        <div>
          <p className="label">Explore</p>
          <ul className="mt-5 grid gap-3 text-sm">
            <li>
              <Link className="transition-colors hover:text-accent" href="/">
                Home
              </Link>
            </li>
            {navigation.map((link) => (
              <li key={link.href}>
                <Link
                  className="transition-colors hover:text-accent"
                  href={link.href}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="label">Services</p>
          <ul className="mt-5 grid gap-3 text-sm">
            {services.map((service) => (
              <li key={service.id}>
                <Link
                  className="transition-colors hover:text-accent"
                  href={`/services#${service.id}`}
                >
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="label">Contact</p>
          <ul className="mt-5 grid gap-3 text-sm font-light">
            <li>
              <a className="transition-colors hover:text-accent" href={mapHref} target="_blank" rel="noreferrer">
                {site.address}
              </a>
            </li>
            <li>
              <a className="transition-colors hover:text-accent" href={phoneHref}>
                {site.phone}
              </a>
            </li>
            <li>
              <a className="transition-colors hover:text-accent" href={whatsappHref()} target="_blank" rel="noreferrer">
                WhatsApp
              </a>
            </li>
            <li>
              <a className="break-all transition-colors hover:text-accent" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="shell flex flex-col gap-2 pt-6 pb-28 text-xs tracking-[0.16em] text-muted uppercase sm:flex-row sm:justify-between md:pb-6">
          <p>© {site.fullName}</p>
          <p>{site.city} · Built to last</p>
        </div>
      </div>
    </footer>
  );
}
