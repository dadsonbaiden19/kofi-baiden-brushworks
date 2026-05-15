import Image from "next/image";
import type { GalleryWork } from "@/data/gallery";
import { resolveImageUrl } from "@/lib/images";

export function GalleryGrid({ works }: { works: GalleryWork[] }) {
  return (
    <div className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {works.map((work) => (
        <article key={`${work.title}-${work.year}`} className="reveal">
          <div className="relative aspect-[4/5] overflow-hidden rounded-artwork border border-ink/10 bg-gallery shadow-soft">
            <Image
              src={resolveImageUrl(work.image)}
              alt={work.alt}
              fill
              quality={88}
              sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
              className="object-contain p-4"
            />
          </div>
          <div className="mt-5 border-t border-ink/10 pt-4">
            <h2 className="heading text-2xl leading-tight">{work.title}</h2>
            <p className="mt-1 text-sm text-umber">{work.year}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
