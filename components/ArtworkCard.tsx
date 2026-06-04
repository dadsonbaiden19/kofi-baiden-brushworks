import Link from "next/link";
import { formatGhs, type Work } from "@/data/works";
import { FlexibleImage } from "./FlexibleImage";

export function ArtworkCard({
  artwork,
  index,
  hoverSwap = false,
  priorityImages = false,
}: {
  artwork: Work;
  index?: number;
  hoverSwap?: boolean;
  priorityImages?: boolean;
}) {
  const isSold = artwork.availability === "Sold";
  const catalogueNumber = typeof index === "number" ? String(index + 1).padStart(2, "0") : null;
  const lightboxImages = artwork.images.slice(0, 2).map((image, imageIndex) => ({
    src: image,
    alt: imageIndex === 0 ? artwork.alt : `${artwork.alt}, alternate view ${imageIndex + 1}`,
  }));
  const previewImages = hoverSwap ? artwork.images.slice(0, 2) : artwork.images.slice(0, 1);

  return (
    <article className="group reveal">
      <div className="artwork-frame group-hover:-translate-y-1 group-hover:shadow-soft">
        <div className="artwork-core">
          {previewImages.map((image, imageIndex) => (
            <FlexibleImage
              key={image}
              src={image}
              alt={imageIndex === 0 ? artwork.alt : `${artwork.alt}, alternate view ${imageIndex + 1}`}
              lightboxImages={lightboxImages}
              lightboxIndex={imageIndex}
              priority={priorityImages}
              wrapperClassName={
                imageIndex === 0 ? "" : `work-preview-image work-preview-image-${imageIndex + 1}`
              }
              className="image-pad group-hover:scale-[1.02]"
            />
          ))}
          {isSold ? (
            <span className="absolute left-4 top-4 z-10 rounded-full border border-chalk/45 bg-ink/78 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-chalk backdrop-blur-sm">
              Sold
            </span>
          ) : null}
        </div>
      </div>
      <div className="catalogue-rule mt-6 flex items-start justify-between gap-6">
        <div>
          {catalogueNumber ? (
            <p className="metadata-label mb-3">{catalogueNumber}</p>
          ) : null}
          <Link href={`/works/${artwork.slug}`} className="inline-block rounded-xl">
            <h2 className="heading text-3xl leading-tight">{artwork.title}</h2>
          </Link>
          <p className="mt-3 text-sm leading-6 text-graphite">
            {artwork.year} · {artwork.medium}
          </p>
          <p className="text-sm leading-6 text-graphite">{artwork.dimensions}</p>
          <p className="mt-3 text-sm text-umber">
            {formatGhs(artwork.priceGhs, artwork.priceLabel)}
          </p>
          <Link href={`/works/${artwork.slug}`} className="text-link mt-4">
            View details
          </Link>
        </div>
        <span className={`shrink-0 rounded-full border px-3 py-1 text-xs ${
            isSold
              ? "border-ink/25 bg-ink/10 text-ink"
              : "border-ink/15 bg-chalk/50 text-umber"
          }`}>
          {artwork.availability}
        </span>
      </div>
    </article>
  );
}
