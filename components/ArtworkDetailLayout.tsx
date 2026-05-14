import { formatGhs, type Work } from "@/data/works";
import { CollectorNotes } from "./CollectorNotes";
import { ImageCarousel } from "./ImageCarousel";

export function ArtworkDetailLayout({ artwork }: { artwork: Work }) {
  return (
    <div className="grid gap-12 lg:grid-cols-[1.08fr_0.72fr] lg:items-start">
      <ImageCarousel images={artwork.images} title={artwork.title} alt={artwork.alt} />
      <section className="reveal reveal-delay-1">
        <p className="eyebrow">Artwork detail</p>
        <h1 className="mt-6 max-w-xl font-serif text-5xl leading-[0.95] tracking-tight sm:text-6xl">
          {artwork.title}
        </h1>
        <dl className="mt-10 grid gap-5 border-y border-ink/10 py-8 text-sm">
          <div className="flex justify-between gap-6">
            <dt className="text-umber">Year</dt>
            <dd className="text-right text-ink">{artwork.year}</dd>
          </div>
          <div className="flex justify-between gap-6">
            <dt className="text-umber">Medium</dt>
            <dd className="max-w-xs text-right text-ink">{artwork.medium}</dd>
          </div>
          <div className="flex justify-between gap-6">
            <dt className="text-umber">Dimensions</dt>
            <dd className="text-right text-ink">{artwork.dimensions}</dd>
          </div>
          <div className="flex justify-between gap-6">
            <dt className="text-umber">Availability</dt>
            <dd className="text-right font-medium text-ink">{artwork.availability}</dd>
          </div>
          <div className="flex justify-between gap-6">
            <dt className="text-umber">Price</dt>
            <dd className="text-right text-ink">{formatGhs(artwork.priceGhs)}</dd>
          </div>
        </dl>
        <p className="mt-8 text-lg leading-8 text-graphite">{artwork.description}</p>
        <div className="mt-8">
          <CollectorNotes compact />
        </div>
        {artwork.availability === "Available" ? (
          <a href={`/contact?artwork=${artwork.slug}`} className="btn-primary mt-10">
            Inquire about this work
          </a>
        ) : (
          <a href="/contact" className="btn-secondary mt-10">
            Ask about similar works
          </a>
        )}
      </section>
    </div>
  );
}
