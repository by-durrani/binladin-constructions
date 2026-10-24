// Company details used across the whole site. Edit these first.
export const site = {
  name: "BIN LADIN",
  fullName: "BIN LADIN Constructions",
  description:
    "Residential and commercial construction in Islamabad — grey structure, turnkey homes, finishing and renovation, built to drawing and handed over complete.",
  city: "Islamabad",
  phone: "+92 301 7758065",
  // International format without "+" or spaces, used for wa.me links.
  whatsapp: "923017758065",
  email: "binladinconstructions@gmail.com",
  address: "204, Salam Tower, Block A, Faisal Town, Islamabad 44000",
  // Absolute links (share previews, sitemap) need the live address. Vercel
  // provides its production domain at build time when this isn't set.
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
  // Swap for a photo of your own best project once you have one.
  heroImage: {
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=80",
    alt: "Modern courtyard house with a still pool in warm evening light",
  },
};

export const phoneHref = `tel:${site.phone.replace(/\s/g, "")}`;

export const mapHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address)}`;

export function whatsappHref(text?: string) {
  const base = `https://wa.me/${site.whatsapp}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export const navigation = [
  { href: "/projects", label: "Projects" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const principles = [
  {
    name: "Built to drawing",
    copy: "Every house is built against approved architectural and structural drawings, and checked on site at each stage — never improvised as we go.",
  },
  {
    name: "Materials, named",
    copy: "Cement, steel and finishing materials are specified by brand and grade in the estimate, so you know exactly what goes into your walls.",
  },
  {
    name: "One team, start to handover",
    copy: "Design, approvals, structure and finishing under one contract, with a single point of contact from the first visit to the keys.",
  },
  {
    name: "Progress you can see",
    copy: "Regular site updates with photos, so you watch the house rise even when you cannot visit.",
  },
] as const;
