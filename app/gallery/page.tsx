import type { Metadata } from "next";
import { GalleryGrid } from "@/components/GalleryGrid";
import { galleryWorks } from "@/data/gallery";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Historical Gallery | Kofi Baiden Brushworks",
  description:
    "Explore earlier archive works by Kofi Baiden Brushworks, a Ghana-based contemporary artist working across painting and mixed media.",
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <main id="main-content" className="page-shell section-y">
      <div className="reveal max-w-3xl">
        <p className="eyebrow">Historical Gallery</p>
        <h1 className="mt-6 heading text-6xl sm:text-7xl">
          Archive works, 1990s-2026
        </h1>
        <p className="mt-6 text-lg leading-8 text-graphite">
          A quiet archive of earlier works and studies. Each gallery entry is intentionally
          simple: one image, one title, and the year of the work.
        </p>
      </div>
      <GalleryGrid works={galleryWorks} />
    </main>
  );
}
