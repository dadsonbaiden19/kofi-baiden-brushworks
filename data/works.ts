export type Work = {
  slug: string;
  title: string;
  year: string;
  medium: string;
  dimensions: string;
  priceGhs: number;
  availability: "Available" | "Sold";
  alt: string;
  description: string;
  images: string[];
  featured?: boolean;
};

export const works: Work[] = [
  {
    slug: "ochre-field-no-3",
    title: "Ochre Field No. 3",
    year: "2026",
    medium: "Oil, earth pigment, and graphite on linen",
    dimensions: "60 x 48 in",
    priceGhs: 8500,
    availability: "Available",
    alt: "Ochre Field No. 3 by Kofi Baiden, oil, earth pigment, and graphite on linen",
    images: [
      "/artworks/ochre-field.svg",
      "/artworks/ochre-field-detail.svg",
      "/artworks/ochre-field-installed.svg",
    ],
    featured: true,
    description:
      "A measured field work where softened ochre planes meet gestural dark marks, inviting a slow reading of surface, weight, and quiet movement.",
  },
  {
    slug: "after-the-rain",
    title: "After the Rain",
    year: "2025",
    medium: "Acrylic and mineral wash on canvas",
    dimensions: "72 x 54 in",
    priceGhs: 12000,
    availability: "Available",
    alt: "After the Rain by Kofi Baiden, acrylic and mineral wash on canvas",
    images: [
      "/artworks/after-the-rain.svg",
      "/artworks/after-the-rain-detail.svg",
      "/artworks/after-the-rain-installed.svg",
    ],
    featured: true,
    description:
      "A contemplative composition built from translucent washes and dense vertical forms, reflecting the atmospheric calm that follows rainfall.",
  },
  {
    slug: "harbor-memory",
    title: "Harbor Memory",
    year: "2025",
    medium: "Oil and cold wax on panel",
    dimensions: "48 x 40 in",
    priceGhs: 7600,
    availability: "Available",
    alt: "Harbor Memory by Kofi Baiden, oil and cold wax on panel",
    images: [
      "/artworks/harbor-memory.svg",
      "/artworks/harbor-memory-detail.svg",
      "/artworks/harbor-memory-installed.svg",
    ],
    featured: true,
    description:
      "Layered blues and clay-toned passages form a compressed landscape of memory, place, and accumulated gesture.",
  },
  {
    slug: "groundwork-study",
    title: "Groundwork Study",
    year: "2024",
    medium: "Mixed media on handmade paper",
    dimensions: "30 x 22 in",
    priceGhs: 4200,
    availability: "Sold",
    alt: "Groundwork Study by Kofi Baiden, mixed media on handmade paper",
    images: [
      "/artworks/groundwork-study.svg",
      "/artworks/groundwork-study-detail.svg",
      "/artworks/groundwork-study-installed.svg",
    ],
    description:
      "A smaller work that studies the architecture of mark-making, balancing open paper with compact painted interventions.",
  },
  {
    slug: "silent-red",
    title: "Silent Red",
    year: "2024",
    medium: "Oil and pigment stick on canvas",
    dimensions: "64 x 50 in",
    priceGhs: 9800,
    availability: "Available",
    alt: "Silent Red by Kofi Baiden, oil and pigment stick on canvas",
    images: [
      "/artworks/silent-red.svg",
      "/artworks/silent-red-detail.svg",
      "/artworks/silent-red-installed.svg",
    ],
    description:
      "A restrained red composition where atmosphere, erasure, and edge create a charged but meditative visual field.",
  },
  {
    slug: "interior-light",
    title: "Interior Light",
    year: "2023",
    medium: "Acrylic, sand, and oil pastel on linen",
    dimensions: "52 x 42 in",
    priceGhs: 6900,
    availability: "Available",
    alt: "Interior Light by Kofi Baiden, acrylic, sand, and oil pastel on linen",
    images: [
      "/artworks/interior-light.svg",
      "/artworks/interior-light-detail.svg",
      "/artworks/interior-light-installed.svg",
    ],
    description:
      "Textural passages of pale pigment gather around a warm central glow, suggesting the held light of a quiet room.",
  },
];

export function getWork(slug: string) {
  return works.find((work) => work.slug === slug);
}

export const featuredWorks = works.filter((work) => work.featured);

export function formatGhs(amount: number) {
  return `GHS ${amount.toLocaleString("en-GH")}`;
}
