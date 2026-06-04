import type { Metadata } from "next";
import { GalleryGrid } from "@/components/GalleryGrid";
import { galleryWorks } from "@/data/gallery";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Sold Works",
  description:
    "Explore sold paintings by Kofi Baiden Brushworks, a Ghana-based contemporary artist working across colour, rhythm, figure, and movement.",
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <main id="main-content" className="page-shell section-y">
      <div className="reveal max-w-3xl">
        <p className="eyebrow">Gallery</p>
        <h1 className="mt-6 heading text-6xl sm:text-7xl">
          Sold Works
        </h1>
        <p className="mt-6 text-lg leading-8 text-graphite">
          A focused archive of sold paintings from the studio. Click any work to inspect it in the
          full-screen viewer.
        </p>
      </div>
      <GalleryGrid works={galleryWorks} />
    </main>
  );
}
