import type { Metadata } from "next";
import Link from "next/link";
import { CollectorNotes } from "@/components/CollectorNotes";
import { FlexibleImage } from "@/components/FlexibleImage";
import { HomeParallax } from "@/components/HomeParallax";
import { MailIcon } from "@/components/Icons";
import { SocialLinks } from "@/components/SocialLinks";
import { featuredWorks, formatGhs, getWork, homepageSoldWorks, type Work } from "@/data/works";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Kofi Baiden Brushworks | Contemporary Artist Based in Ghana",
  description:
    "Explore original paintings and mixed-media works by Kofi Baiden, a contemporary artist based in Ghana. Available artworks include authenticity certificates and worldwide shipping.",
  path: "/",
});

export default function Home() {
  const heroArtwork = getWork("jazz-poses") ?? featuredWorks[0];
  const homepageWorks = [...featuredWorks, ...homepageSoldWorks];

  return (
    <main id="main-content">
      <HomeParallax />
      <section className="home-hero-section group">
        <HomeHoverArtwork
          artwork={heroArtwork}
          priority
          maxImages={1}
          wrapperClassName="home-hero-artwork"
          className="home-hero-artwork-image"
        />
        <div className="page-shell home-hero-content">
          <div className="reveal max-w-3xl">
            <p className="eyebrow home-hero-eyebrow">Contemporary artist</p>
            <h1 className="mt-7 heading-display home-hero-title text-6xl sm:text-7xl lg:text-8xl">
              <span className="block">Kofi Baiden</span>
              <span className="block">Brushworks</span>
            </h1>
          </div>
          <div className="reveal reveal-delay-1 mt-10 flex flex-wrap gap-4">
            <Link href="/works" className="btn-inverse">
              View latest works
            </Link>
            <Link href="/contact" className="btn-hero-outline">
              Make an inquiry
            </Link>
          </div>
        </div>
        <p className="home-hero-caption">
          {heroArtwork.title} · {heroArtwork.year}
        </p>
      </section>

      <section className="page-shell pt-4 pb-16 sm:pt-6 sm:pb-20">
        <div className="home-process-grid">
          <blockquote className="reveal home-quote">
            “Behind every surface is a rhythm that asks to be felt before it is explained.”
          </blockquote>
          <div className="reveal reveal-delay-1 text-lg leading-8 text-graphite">
            <p className="eyebrow">Works</p>
            <h2 className="mt-5 heading text-5xl sm:text-6xl">
              Handmade originals with colour, movement, and touch at the centre.
            </h2>
            <p className="mt-7">
              Baiden&apos;s paintings are built through repeated marks, layered pigment, and
              measured revisions. Texture gives the works their physical presence; rhythm gives
              them their emotional charge.
            </p>
            <p className="mt-5">
              For available works, commissions, or shipping questions, every conversation begins
              directly with the studio.
            </p>
            <Link href="/contact" className="text-link mt-8">
              Contact the studio
            </Link>
          </div>
        </div>
      </section>

      <section className="section-y bg-chalk/80">
        <div className="page-shell">
          <div className="reveal flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">Latest artworks</p>
              <h2 className="mt-5 max-w-2xl heading text-5xl sm:text-6xl">
                Recent works selected for close viewing.
              </h2>
            </div>
            <Link href="/works" className="text-link">
              See more artworks
            </Link>
          </div>
          <div className="home-latest-list">
            {homepageWorks.map((artwork, index) => (
              <HomeLatestArtwork key={artwork.slug} artwork={artwork} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell section-y grid gap-12 lg:grid-cols-[0.8fr_1fr] lg:items-start">
        <div className="reveal">
          <p className="eyebrow">About the artist</p>
          <h2 className="mt-5 heading text-5xl sm:text-6xl">
            A practice shaped by place, pressure, and time.
          </h2>
        </div>
        <div className="reveal reveal-delay-1 text-lg leading-8 text-graphite">
          <p>
            Baiden&apos;s practice draws from the layered surfaces of urban walls, coastal earth, and
            private interiors in Ghana. His works are built through repeated applications of pigment,
            drawing, scraping, staining, and quiet revision.
          </p>
          <p className="mt-6">
            The resulting surfaces feel architectural yet intimate: fields of pigment that gather
            evidence of touch while remaining composed, spacious, and deliberate.
          </p>
          <Link href="/about" className="text-link mt-8">
            Read biography
          </Link>
        </div>
      </section>

      <section className="bg-ink py-20 text-chalk sm:py-24">
        <div className="page-shell grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div className="reveal">
            <p className="eyebrow text-clay">Studio inquiries</p>
            <h2 className="mt-5 max-w-3xl heading text-5xl sm:text-6xl">
              For commissions, exhibitions, and artwork acquisitions.
            </h2>
            <div className="mt-8 max-w-3xl">
              <CollectorNotes />
            </div>
            <SocialLinks className="mt-8" />
          </div>
          <Link href="/contact" className="btn-inverse reveal reveal-delay-1">
            Contact the studio
          </Link>
        </div>
      </section>
    </main>
  );
}

function HomeHoverArtwork({
  artwork,
  priority = false,
  maxImages = 2,
  wrapperClassName,
  className,
}: {
  artwork: Work;
  priority?: boolean;
  maxImages?: number;
  wrapperClassName?: string;
  className?: string;
}) {
  const displayImages = artwork.images.slice(0, maxImages);
  const lightboxImages = displayImages.map((image, imageIndex) => ({
    src: image,
    alt: imageIndex === 0 ? artwork.alt : `${artwork.alt}, alternate view ${imageIndex + 1}`,
  }));

  return (
    <>
      {displayImages.map((image, imageIndex) => (
        <FlexibleImage
          key={`${artwork.slug}-${imageIndex}-${image}`}
          src={image}
          alt={imageIndex === 0 ? artwork.alt : `${artwork.alt}, alternate view ${imageIndex + 1}`}
          priority={priority}
          lightboxImages={lightboxImages}
          lightboxIndex={imageIndex}
          wrapperClassName={
            imageIndex === 0
              ? wrapperClassName
              : `${wrapperClassName ?? ""} work-preview-image work-preview-image-2`
          }
          className={className}
        />
      ))}
    </>
  );
}

function HomeLatestArtwork({ artwork, index }: { artwork: Work; index: number }) {
  const isSold = artwork.availability === "Sold";
  const formatClass = artwork.format ? `is-${artwork.format.toLowerCase()}` : "is-square";

  return (
    <article className={`home-latest-row reveal ${index % 2 === 1 ? "is-reversed" : ""}`}>
      <div className="home-latest-copy">
        <p className="metadata-label">
          {String(index + 1).padStart(2, "0")} · {isSold ? "Sold work" : "Available work"}
        </p>
        <h3 className="mt-5 heading text-5xl sm:text-6xl">{artwork.title}</h3>
        <div className="mt-6 grid gap-3 text-sm leading-6 text-graphite">
          <p>{artwork.dimensions}</p>
          <p>{artwork.medium}</p>
          <p className="font-medium text-umber">{formatGhs(artwork.priceGhs, artwork.priceLabel)}</p>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {artwork.format ? <span className="shop-tag">{artwork.format}</span> : null}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={`/works/${artwork.slug}`} className="btn-secondary">
            More info
          </Link>
          {isSold ? (
            <span className="sold-action-label">Sold</span>
          ) : (
            <Link href={`/contact?artwork=${artwork.slug}`} className="btn-primary">
              <MailIcon className="h-4 w-4" />
              Inquire
            </Link>
          )}
        </div>
      </div>
      <div className={`home-latest-media ${formatClass}`}>
        <div className="artwork-frame group">
          <div className="artwork-core">
            <HomeHoverArtwork
              artwork={artwork}
              priority={index === 0}
              className="image-pad home-latest-image"
            />
            {isSold ? <span className="sold-overlay-badge">Sold</span> : null}
          </div>
        </div>
      </div>
    </article>
  );
}
