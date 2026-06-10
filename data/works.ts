import worksContent from "./works.json";

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
  showOnHomepage?: boolean;
  showOnWorksPage?: boolean;
  showInGallery?: boolean;
};

type WorkContent = Omit<Work, "year" | "medium" | "dimensions" | "priceLabel" | "alt" | "description"> &
  Partial<Pick<Work, "year" | "medium" | "dimensions" | "priceLabel" | "alt" | "description">>;

const requestDimensions = "Dimensions available on request";
const requestPrice = "Price on inquiry";
const originalPainting = "Original painting";
const requestYear = "Year available on request";
const contextPlaceholder = "/paintings/placeholder-context.svg";
const availabilityOptions = new Set(["Available", "Sold"]);
const formatOptions = new Set(["Landscape", "Portrait", "Square"]);

function assertValidWork(work: WorkContent, index: number) {
  const label = `Artwork record ${index + 1}`;

  if (!work.slug || typeof work.slug !== "string") {
    throw new Error(`${label} needs a slug in data/works.json.`);
  }

  if (!work.title || typeof work.title !== "string") {
    throw new Error(`${label} (${work.slug}) needs a title in data/works.json.`);
  }

  if (!availabilityOptions.has(work.availability)) {
    throw new Error(`${label} (${work.slug}) must use availability "Available" or "Sold".`);
  }

  if (!Array.isArray(work.images) || work.images.length === 0) {
    throw new Error(`${label} (${work.slug}) needs at least one image path.`);
  }

  if (work.format && !formatOptions.has(work.format)) {
    throw new Error(`${label} (${work.slug}) must use format "Portrait", "Landscape", or "Square".`);
  }
}

function createWork(work: WorkContent, index: number): Work {
  assertValidWork(work, index);

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
    slug: work.slug.trim(),
    title: work.title.trim(),
    images,
  };
}

export const works: Work[] = (worksContent as unknown as WorkContent[]).map(createWork);

export const availableWorks: Work[] = works.filter((work) => work.availability === "Available");

export const soldWorks: Work[] = works.filter((work) => work.availability === "Sold");

export const homepageSoldWorks = soldWorks.filter((work) => work.showOnHomepage);

export const worksPageWorks: Work[] = [
  ...availableWorks,
  ...soldWorks.filter((work) => work.showOnWorksPage),
];

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
