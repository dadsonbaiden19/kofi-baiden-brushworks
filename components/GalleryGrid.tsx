import type { GalleryWork } from "@/data/gallery";
import { FlexibleImage } from "./FlexibleImage";

export function GalleryGrid({ works }: { works: GalleryWork[] }) {
  return (
    <div className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {works.map((work, index) => (
        <article key={`${work.title}-${work.year}`} className="reveal">
          <div className="artwork-frame shadow-soft hover:-translate-y-1">
            <div className="artwork-core">
              <FlexibleImage
                src={work.image}
                alt={work.alt}
                className="image-pad hover:scale-[1.015]"
              />
            </div>
          </div>
          <div className="catalogue-rule mt-5">
            <p className="metadata-label mb-3">{String(index + 1).padStart(2, "0")}</p>
            <h2 className="heading text-2xl leading-tight">{work.title}</h2>
            <p className="mt-1 text-sm text-umber">{work.year}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
