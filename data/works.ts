export type Work = {
  slug: string;
  title: string;
  year: string;
  medium: string;
  dimensions: string;
  priceGhs?: number;
  priceLabel?: string;
  availability: "Available" | "Sold";
  alt: string;
  description: string;
  images: string[];
  format?: "Landscape" | "Portrait" | "Square";
  featured?: boolean;
};

const requestDimensions = "Dimensions available on request";
const requestPrice = "Price on inquiry";
const originalPainting = "Original painting";
const requestYear = "Year available on request";
const contextPlaceholder = "/paintings/placeholder-context.svg";

type WorkInput = Omit<Work, "year" | "medium" | "dimensions" | "priceLabel" | "alt" | "description"> &
  Partial<Pick<Work, "year" | "medium" | "dimensions" | "priceLabel" | "alt" | "description">>;

function createWork(work: WorkInput): Work {
  const images =
    work.images.length >= 2
      ? work.images.slice(0, 2)
      : [work.images[0] ?? "/paintings/placeholder-artwork.svg", contextPlaceholder];

  return {
    year: requestYear,
    medium: originalPainting,
    dimensions: requestDimensions,
    priceLabel: requestPrice,
    alt: `${work.title} by Kofi Baiden`,
    description:
      work.availability === "Available"
        ? `${work.title} is an available original painting by Kofi Baiden, offered for collector inquiry.`
        : `${work.title} is a sold original painting by Kofi Baiden, kept in the archive for close viewing.`,
    ...work,
    images,
  };
}

export const soldWorks: Work[] = [
  createWork({
    slug: "9",
    title: "9",
    availability: "Sold",
    images: ["/paintings/9.png"],
    format: "Portrait",
  }),
  createWork({
    slug: "4",
    title: "4",
    availability: "Sold",
    images: ["/paintings/4.png"],
  }),
  createWork({
    slug: "3",
    title: "3",
    availability: "Sold",
    images: ["/paintings/3.png"],
  }),
  createWork({
    slug: "5",
    title: "5",
    availability: "Sold",
    images: ["/paintings/5.png"],
    format: "Portrait",
  }),
  createWork({
    slug: "8",
    title: "8",
    availability: "Sold",
    images: ["/paintings/8.png"],
  }),
  createWork({
    slug: "12",
    title: "Lifestyles",
    year: "November 2022",
    dimensions: '27" x 33"',
    priceGhs: 9325,
    availability: "Sold",
    images: ["/paintings/12.jpg"],
    format: "Portrait",
    description:
      "Lifestyles is a sold original painting by Kofi Baiden, held in the archive as part of the artist's colour-rich figurative work.",
  }),
  createWork({
    slug: "20",
    title: "20",
    availability: "Sold",
    images: ["/paintings/20.jpg"],
    format: "Portrait",
  }),
  createWork({
    slug: "11",
    title: "11",
    availability: "Sold",
    images: ["/paintings/placeholder-artwork.svg"],
    format: "Portrait",
  }),
  createWork({
    slug: "jazz-tiles",
    title: "Jazz Tiles",
    availability: "Sold",
    images: ["/paintings/jazz-tiles.jpg"],
  }),
  createWork({
    slug: "jazz-poses",
    title: "Jazz Poses",
    year: "2022",
    availability: "Sold",
    images: ["/paintings/jazz-poses.jpg"],
    format: "Landscape",
  }),
  createWork({
    slug: "rush-hour",
    title: "Rush Hour",
    availability: "Sold",
    images: ["/paintings/rush-hour.jpg"],
  }),
  createWork({
    slug: "till-the-last-beat",
    title: "Till the Last Beat",
    availability: "Sold",
    images: ["/paintings/till-the-last-beat.jpg"],
  }),
  createWork({
    slug: "skill-and-beauty",
    title: "Skill and Beauty",
    availability: "Sold",
    images: ["/paintings/skill-and-beauty.png"],
  }),
  createWork({
    slug: "anticipation",
    title: "Anticipation",
    year: "2018",
    availability: "Sold",
    images: ["/paintings/anticipation.jpg"],
  }),
  createWork({
    slug: "anticipation-2",
    title: "Anticipation 2",
    year: "2018",
    availability: "Sold",
    images: ["/paintings/anticipation-2.jpg"],
  }),
  createWork({
    slug: "jazz-tunes",
    title: "Jazz Tunes",
    availability: "Sold",
    images: ["/paintings/jazz-tunes.jpg"],
  }),
  createWork({
    slug: "festive-time",
    title: "Festive Time",
    availability: "Sold",
    images: ["/paintings/festive-time.jpg"],
  }),
  createWork({
    slug: "twists-and-turns",
    title: "Twists and Turns",
    availability: "Sold",
    images: ["/paintings/twists-and-turns.jpg"],
  }),
  createWork({
    slug: "rhythmic-colours",
    title: "Rhythmic Colours",
    year: "2018",
    availability: "Sold",
    images: ["/paintings/rythmic-colours-2018.jpg"],
  }),
  createWork({
    slug: "all-jazz",
    title: "All Jazz",
    availability: "Sold",
    images: ["/paintings/all-jazz.jpg"],
  }),
  createWork({
    slug: "1",
    title: "1",
    availability: "Sold",
    images: ["/paintings/1.jpg"],
  }),
];

export const availableWorks: Work[] = [
  createWork({
    slug: "17",
    title: "Heritage",
    year: "April 2023",
    medium: "Oil on canvas",
    dimensions: '31" x 29"',
    priceGhs: 10325,
    availability: "Available",
    images: ["/paintings/17.jpg"],
    format: "Square",
    featured: true,
    description:
      "Heritage is an available oil painting by Kofi Baiden, built through bold colour, rhythm, and layered figure-ground movement.",
  }),
  createWork({
    slug: "19",
    title: "Negotiables",
    year: "April 2023",
    medium: "Oil on canvas",
    dimensions: '31" x 29"',
    priceGhs: 8325,
    availability: "Available",
    images: ["/paintings/19.jpg"],
    format: "Square",
    featured: true,
    description:
      "Negotiables is an available oil painting by Kofi Baiden, composed with lively colour relationships and a strong sense of visual rhythm.",
  }),
  createWork({
    slug: "7",
    title: "7",
    availability: "Available",
    images: ["/paintings/7.png"],
    format: "Square",
    featured: true,
  }),
  createWork({
    slug: "6",
    title: "6",
    availability: "Available",
    images: ["/paintings/6.png"],
    format: "Landscape",
  }),
  createWork({
    slug: "colour-acoustics",
    title: "Colour Acoustics",
    year: "December 2022",
    medium: "Oil on canvas",
    dimensions: '27" x 34"',
    priceGhs: 7875,
    availability: "Available",
    images: ["/paintings/colour-acoustics.jpg"],
    format: "Portrait",
    description:
      "Colour Acoustics is an available oil painting by Kofi Baiden, bringing sound, colour, and movement into a compact figurative composition.",
  }),
  createWork({
    slug: "jazz-in-the-shadows",
    title: "Jazz in the Shadows",
    year: "December 2022",
    medium: "Oil on canvas",
    dimensions: '30" x 35"',
    priceGhs: 7325,
    availability: "Available",
    images: ["/paintings/jazz-in-the-shadows.jpg"],
    format: "Portrait",
    description:
      "Jazz in the Shadows is an available oil painting by Kofi Baiden, pairing performance, silhouette, and colour into a vivid jazz-inspired scene.",
  }),
  createWork({
    slug: "abibigroma",
    title: "Abibigroma",
    year: "December 2022",
    medium: "Oil on canvas",
    dimensions: '33" x 25"',
    priceGhs: 7325,
    availability: "Available",
    images: ["/paintings/abibigroma.jpg"],
    format: "Landscape",
    description:
      "Abibigroma is an available oil painting by Kofi Baiden, shaped by cultural memory, colour, and expressive movement.",
  }),
  createWork({
    slug: "colour-ripples",
    title: "Colour Ripples",
    year: "April 2023",
    medium: "Oil on canvas",
    dimensions: '31" x 29"',
    priceGhs: 8325,
    availability: "Available",
    images: ["/paintings/colour-ripples.jpg"],
    format: "Portrait",
    description:
      "Colour Ripples is an available oil painting by Kofi Baiden, using layered colour and rhythm to create a lively sense of motion.",
  }),
];

export const works: Work[] = [...availableWorks, ...soldWorks];

export const homepageSoldWorks = ["9", "5", "12", "20", "11"]
  .map((slug) => soldWorks.find((work) => work.slug === slug))
  .filter((work): work is Work => Boolean(work));

export const worksPageWorks: Work[] = [...availableWorks, ...homepageSoldWorks];

export function getWork(slug: string) {
  return works.find((work) => work.slug === slug);
}

export const featuredWorks = availableWorks.filter((work) => work.featured);

export function formatGhs(amount?: number, fallback = requestPrice) {
  if (!amount || amount <= 0) {
    return fallback;
  }

  return `GHS ${amount.toLocaleString("en-GH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} incl. VAT`;
}
