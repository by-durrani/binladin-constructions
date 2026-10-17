export const site = {
  name: "BIN LADIN",
  tagline: "Houses built to be lived in.",
  city: "Islamabad",
  phone: "+92 3017758065",
  email: "binladinconstructions@gmail.com",
  address: "Faisal town Block A Salam tower, 204, Islamabad, 44000",
};

export const rooms = [
  {
    id: "entry",
    number: "01",
    name: "Entry",
    title: "A quiet threshold.",
    copy: "Light meets limestone. The first room is never rushed — it is where the house takes its breath.",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2400&q=80",
    alt: "Sunlit entry hall with plaster walls, oak flooring, and a sculptural staircase",
  },
  {
    id: "living",
    number: "02",
    name: "Living",
    title: "Rooms that hold time.",
    copy: "Soft plaster, linen, and a low horizon of windows. The living room is designed for lingering, not display.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2400&q=80",
    alt: "Minimal living room with warm oak, linen seating, and floor-to-ceiling windows",
  },
  {
    id: "kitchen",
    number: "03",
    name: "Kitchen",
    title: "Craft, close at hand.",
    copy: "Stone counters, quiet hardware, and a long island that becomes the day’s center of gravity.",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=2400&q=80",
    alt: "Minimal kitchen with stone counters, pale oak cabinets, and natural light",
  },
  {
    id: "terrace",
    number: "04",
    name: "Terrace",
    title: "Inside, slightly outside.",
    copy: "A courtyard that borrows the sky. The house does not end at the glass — it continues into still water and shade.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=80",
    alt: "Modern courtyard house with a still pool and warm evening light",
  },
] as const;

export const works = [
  {
    year: "2025",
    name: "Casa North",
    place: "Santa Monica",
    area: "4,200 sq ft",
    image:
      "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&w=1800&q=80",
    alt: "White stucco residence with a quiet entry court and olive trees",
  },
  {
    year: "2024",
    name: "The Oak Pavilion",
    place: "Pasadena",
    area: "3,140 sq ft",
    image:
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1800&q=80",
    alt: "Bedroom with oak millwork, linen bedding, and a view to a private garden",
  },
  {
    year: "2024",
    name: "Hillside House",
    place: "Los Feliz",
    area: "5,080 sq ft",
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdbc?auto=format&fit=crop&w=1800&q=80",
    alt: "Open living space with a long window wall and a sculptural fireplace",
  },
  {
    year: "2023",
    name: "Maison Marlow",
    place: "Venice",
    area: "2,760 sq ft",
    image:
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1800&q=80",
    alt: "Stone bathroom with a freestanding tub and a narrow garden window",
  },
] as const;

export const principles = [
  {
    name: "Material honesty",
    copy: "Plaster, oak, stone, and linen — used as they are, without costume.",
  },
  {
    name: "Light as structure",
    copy: "Openings are placed to move the sun through rooms the way a floor plan moves people.",
  },
  {
    name: "Quiet craft",
    copy: "Joinery you feel with your hand. Hardware that disappears. Details that last.",
  },
] as const;
