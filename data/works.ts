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
    title: "12",
    availability: "Sold",
    images: ["/paintings/12.jpg"],
    format: "Portrait",
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
    title: "17",
    availability: "Available",
    images: ["/paintings/17.jpg"],
    format: "Square",
    featured: true,
  }),
  createWork({
    slug: "19",
    title: "19",
    availability: "Available",
    images: ["/paintings/19.jpg"],
    format: "Square",
    featured: true,
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
    availability: "Available",
    images: ["/paintings/colour-acoustics.jpg"],
    format: "Portrait",
  }),
  createWork({
    slug: "abibigroma",
    title: "Abibigroma",
    availability: "Available",
    images: ["/paintings/abibigroma.jpg"],
    format: "Landscape",
  }),
  createWork({
    slug: "colour-ripples",
    title: "Colour Ripples",
    availability: "Available",
    images: ["/paintings/colour-ripples.jpg"],
    format: "Portrait",
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

  return `GHS ${amount.toLocaleString("en-GH")}`;
}
