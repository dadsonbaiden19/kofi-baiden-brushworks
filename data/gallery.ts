import { soldWorks } from "./works";

export type GalleryWork = {
  slug: string;
  title: string;
  year: string;
  image: string;
  alt: string;
  availability: "Sold";
};

export const galleryWorks: GalleryWork[] = soldWorks.filter((work) => work.slug !== "11").map((work) => ({
  slug: work.slug,
  title: work.title,
  year: work.year,
  image: work.images[0],
  alt: work.alt,
  availability: "Sold",
}));
