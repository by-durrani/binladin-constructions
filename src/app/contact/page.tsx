import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { ChatIcon, MailIcon, PhoneIcon, PinIcon } from "@/components/icons";
import { PageIntro } from "@/components/page-intro";
import { mapHref, officeAddress, phoneHref, site, whatsappHref } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Request an estimate or arrange a site visit with ${site.fullName}.`,
};

const channels = [
  { label: "Call", value: site.phone, href: phoneHref, Icon: PhoneIcon },
  { label: "WhatsApp", value: site.phone, href: whatsappHref(), Icon: ChatIcon, external: true },
  { label: "Email", value: site.email, href: `mailto:${site.email}`, Icon: MailIcon },
  ...site.offices.map((office) => ({
    label: office.label,
    value: officeAddress(office),
    href: mapHref(office),
    Icon: PinIcon,
    external: true,
  })),
];

export default function ContactPage() {
  return (
    <>
      <PageIntro eyebrow="Contact" title="Tell us what you want to build.">
        <p>
          Share a few details and we will arrange a site visit, review your
          drawings, or prepare an estimate. Prefer to talk? Call or message us
          directly.
        </p>
      </PageIntro>

      <section className="shell grid gap-16 pb-24 sm:pb-32 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <ul className="grid h-fit gap-8 border-t border-line pt-8">
          {channels.map(({ label, value, href, Icon, external }) => (
            <li key={label}>
              <a
                href={href}
                {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                className="group flex gap-4"
              >
                <Icon className="mt-0.5 size-5 shrink-0 text-accent" />
                <span>
                  <span className="label block">{label}</span>
                  <span className="mt-2 block break-words font-light transition-colors group-hover:text-accent">
                    {value}
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
        <div className="border-t border-line pt-8">
          <ContactForm />
        </div>
      </section>
    </>
  );
}
