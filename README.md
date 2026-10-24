# BIN LADIN Constructions — website

Portfolio and enquiry site for BIN LADIN Constructions, Islamabad. Built with
Next.js 16 (App Router, Cache Components), React 19 and Tailwind CSS 4.

## Run it

```bash
bun install
bun dev          # http://localhost:3000
bun run build    # production build
bun run lint
```

## Pages

| Route              | What it shows                                                |
| ------------------ | ------------------------------------------------------------ |
| `/`                | Hero, services, featured projects, process, principles      |
| `/projects`        | Every project, filterable by type                            |
| `/projects/[slug]` | One project: facts, description, scope, gallery              |
| `/services`        | Each service in detail, the process, and FAQs                |
| `/about`           | Company story and principles                                 |
| `/contact`         | Enquiry form, phone, WhatsApp, email, office                 |

## Where the content lives

All text and data is in `src/data/` — you rarely need to touch the pages.

- `src/data/site.ts` — company name, phone, WhatsApp number, email, address,
  hero photo, principles.
- `src/data/projects.ts` — the portfolio.
- `src/data/services.ts` — services, process steps and FAQs.

## Logo and brand files

The logo was traced to vectors from the brand sheet's primary logo.

- `src/components/brand-paths.ts` — the shapes (monogram, wordmark,
  "CONSTRUCTIONS"). Replace these with the designer's master SVG paths when
  available; everything else follows.
- `src/components/brand.tsx` — `Monogram`, `LogoHorizontal` and `LogoStacked`,
  drawn in the current text colour.
- `public/brand/` — standalone SVGs (dark and white) for use elsewhere.
- `src/app/icon.svg`, `src/app/apple-icon.png`, `src/app/opengraph-image.png`
  — browser tab icon, iPhone home-screen icon and link-preview image.

## Adding a project

1. Put the photos in `public/projects/<slug>/`, for example
   `public/projects/f7-residence/cover.jpg`. Use landscape JPGs around
   2000px wide; Next.js resizes them automatically.
2. Add an entry to the `projects` array in `src/data/projects.ts`:

   ```ts
   {
     slug: "f7-residence",
     title: "F-7 Residence",
     category: "Residential", // Residential | Commercial | Renovation | Interiors
     status: "Completed",     // Completed | In progress
     location: "F-7, Islamabad",
     year: "2025",
     plot: "1 Kanal",              // optional
     coveredArea: "5,200 sq ft",   // optional
     duration: "14 months",        // optional
     scope: ["Grey structure", "Finishing"],
     summary: "One sentence shown on the project card.",
     description: [
       "First paragraph for the project page.",
       "Second paragraph.",
     ],
     cover: { src: "/projects/f7-residence/cover.jpg", alt: "Front of the house at dusk" },
     gallery: [
       { src: "/projects/f7-residence/living.jpg", alt: "Double-height living room" },
     ],
     featured: true, // show on the home page (first three featured are used)
   },
   ```

3. Delete the placeholder entries marked `sample: true` once you have real
   work — they display a "Sample project" tag until you do.

Projects appear in the order they are listed. The project page, sitemap and
filters update automatically.

## Enquiry form

The contact form validates input on the server (`src/app/actions.ts`).

- **With email configured**, enquiries are emailed to you through
  [Resend](https://resend.com). Copy `.env.example` to `.env.local` and fill
  in the values (set the same variables in your hosting dashboard).
- **Without email configured**, the visitor is handed a pre-filled WhatsApp
  message to send to the company number instead. No enquiry is silently lost.

Set `NEXT_PUBLIC_SITE_URL` to the live domain so the sitemap and social
previews use the correct links.
