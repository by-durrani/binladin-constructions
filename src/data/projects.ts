// Your portfolio. Each entry becomes a card on /projects and its own page at
// /projects/<slug>. See README.md → "Adding a project" for a full walkthrough.
//
// The entries below marked `sample: true` are placeholders with stock photos.
// They show a "Sample project" tag on the site. Replace or delete them as
// soon as you add your own work.

export type ProjectCategory =
  | "Residential"
  | "Commercial"
  | "Renovation"
  | "Interiors";

export type ProjectStatus = "Completed" | "In progress";

export type ProjectImage = {
  // A file in /public (e.g. "/projects/f7-residence/cover.jpg") or an
  // https://images.unsplash.com URL.
  src: string;
  // Describe what the photo shows, for screen readers and search engines.
  alt: string;
};

export type Project = {
  // URL-safe id: lowercase letters, numbers and dashes only.
  slug: string;
  title: string;
  category: ProjectCategory;
  status: ProjectStatus;
  location: string;
  year: string;
  plot?: string;
  coveredArea?: string;
  duration?: string;
  // What you delivered on this project.
  scope: string[];
  // One line for the project card.
  summary: string;
  // Paragraphs for the project page.
  description: string[];
  cover: ProjectImage;
  gallery: ProjectImage[];
  // Featured projects appear on the home page.
  featured?: boolean;
  sample?: boolean;
};

const photo = (id: string, width = 2000) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=80`;

export const projects: Project[] = [
  {
    slug: "white-court-house",
    title: "White Court House",
    category: "Residential",
    status: "Completed",
    location: "Islamabad",
    year: "2025",
    plot: "1 Kanal",
    coveredArea: "5,200 sq ft",
    duration: "14 months",
    scope: ["Design & approvals", "Grey structure", "Finishing", "Landscaping"],
    summary:
      "A double-storey family home arranged around a quiet entry court.",
    description: [
      "A complete turnkey build for a family of five: drawings, approvals, structure and finishing delivered under one contract.",
      "The plan is organised around a planted entry court that brings light into the centre of the house, with living spaces on the ground floor and private rooms above.",
    ],
    cover: {
      src: photo("1600573472592-401b489a3cdc"),
      alt: "White stucco residence with a quiet entry court and olive trees",
    },
    gallery: [
      {
        src: photo("1600607687939-ce8a6c25118c"),
        alt: "Living room with warm oak, linen seating, and floor-to-ceiling windows",
      },
      {
        src: photo("1600566753190-17f0baa2a6c3"),
        alt: "Kitchen with stone counters, pale oak cabinets, and natural light",
      },
      {
        src: photo("1552321554-5fefe8c9ef14"),
        alt: "Stone bathroom with a freestanding tub and a narrow garden window",
      },
    ],
    featured: true,
    sample: true,
  },
  {
    slug: "courtyard-pool-house",
    title: "Courtyard Pool House",
    category: "Residential",
    status: "Completed",
    location: "Islamabad",
    year: "2024",
    plot: "2 Kanal",
    coveredArea: "7,800 sq ft",
    duration: "18 months",
    scope: ["Grey structure", "Finishing", "Swimming pool", "External works"],
    summary:
      "A single-level house that opens onto a still pool and a shaded terrace.",
    description: [
      "Built from the client’s own architectural drawings, with our team handling structure, services and every finish inside and out.",
      "Deep overhangs and a long glass wall connect the living spaces to the courtyard, keeping the house cool through the summer.",
    ],
    cover: {
      src: photo("1600585154340-be6161a56a0c"),
      alt: "Modern courtyard house with a still pool and warm evening light",
    },
    gallery: [
      {
        src: photo("1600210492486-724fe5c67fb0"),
        alt: "Sunlit entry hall with plaster walls, oak flooring, and a sculptural staircase",
      },
      {
        src: photo("1600047509807-ba8f99d2cdbc"),
        alt: "Open living space with a long window wall and a sculptural fireplace",
      },
      {
        src: photo("1616594039964-ae9021a400a0"),
        alt: "Bedroom with oak millwork, linen bedding, and a view to a private garden",
      },
    ],
    featured: true,
    sample: true,
  },
  {
    slug: "oak-kitchen-refit",
    title: "Oak Kitchen & Living",
    category: "Interiors",
    status: "Completed",
    location: "Rawalpindi",
    year: "2024",
    coveredArea: "1,100 sq ft",
    duration: "10 weeks",
    scope: ["Kitchen", "Woodwork", "Flooring", "Lighting"],
    summary:
      "A new kitchen and living floor finished in stone, oak and plaster.",
    description: [
      "A finishing package for an existing house: the ground floor was stripped back and rebuilt as one open kitchen and living space.",
      "Custom oak joinery, stone counters and a new lighting layout were installed while the family continued to live upstairs.",
    ],
    cover: {
      src: photo("1600566753190-17f0baa2a6c3"),
      alt: "Kitchen with stone counters, pale oak cabinets, and natural light",
    },
    gallery: [
      {
        src: photo("1600607687939-ce8a6c25118c"),
        alt: "Living room with warm oak, linen seating, and floor-to-ceiling windows",
      },
      {
        src: photo("1600210492486-724fe5c67fb0"),
        alt: "Entry hall with plaster walls and oak flooring",
      },
    ],
    featured: true,
    sample: true,
  },
  {
    slug: "hillside-renovation",
    title: "Hillside Renovation",
    category: "Renovation",
    status: "In progress",
    location: "Islamabad",
    year: "2026",
    plot: "1 Kanal",
    coveredArea: "4,600 sq ft",
    scope: ["Structural assessment", "Extension", "Finishing"],
    summary:
      "An older house reworked with a new upper floor and a brighter living room.",
    description: [
      "The existing structure was assessed and strengthened before a new upper floor was added for two bedrooms and a family lounge.",
      "Downstairs, internal walls were opened up to create a single living space around a new fireplace.",
    ],
    cover: {
      src: photo("1600047509807-ba8f99d2cdbc"),
      alt: "Open living space with a long window wall and a sculptural fireplace",
    },
    gallery: [
      {
        src: photo("1616594039964-ae9021a400a0"),
        alt: "Bedroom with oak millwork, linen bedding, and a view to a private garden",
      },
      {
        src: photo("1552321554-5fefe8c9ef14"),
        alt: "Stone bathroom with a freestanding tub and a narrow garden window",
      },
    ],
    sample: true,
  },
];

export const categories = Array.from(
  new Set(projects.map((project) => project.category)),
);

export const featuredProjects = projects.filter((project) => project.featured);

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
