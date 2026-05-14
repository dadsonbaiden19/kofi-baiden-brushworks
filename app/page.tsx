import type { Metadata } from "next";
import Link from "next/link";
import { ArtworkCard } from "@/components/ArtworkCard";
import { ArtworkImage } from "@/components/ArtworkImage";
import { CollectorNotes } from "@/components/CollectorNotes";
import { SocialLinks } from "@/components/SocialLinks";
import { featuredWorks } from "@/data/works";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Kofi Baiden Brushworks | Contemporary Artist Based in Ghana",
  description:
    "Explore original paintings and mixed-media works by Kofi Baiden, a contemporary artist based in Ghana. Available artworks include authenticity certificates and worldwide shipping.",
  path: "/",
});

export default function Home() {
  const heroArtwork = featuredWorks[0];

  return (
    <main>
      <section className="page-shell grid min-h-[calc(100vh-5rem)] gap-12 py-12 lg:grid-cols-[0.92fr_1fr] lg:items-center lg:py-20">
        <div className="reveal max-w-3xl">
          <p className="eyebrow">Contemporary artist</p>
          <h1 className="mt-8 font-serif text-6xl leading-[0.92] tracking-[-0.04em] sm:text-7xl lg:text-8xl">
            Kofi Baiden Brushworks
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-8 text-graphite">
            Kofi Baiden is a Ghana-based contemporary visual artist creating restrained, tactile
            works that hold memory, material, and atmosphere in quiet tension.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/works" className="btn-primary">
              View works
            </Link>
            <Link href="/contact" className="btn-secondary">
              Make an inquiry
            </Link>
          </div>
        </div>
        <div className="reveal reveal-delay-2 lg:pl-8">
          <ArtworkImage
            src={heroArtwork.images[0]}
            alt={`${heroArtwork.title} by Kofi Baiden`}
            priority
            className="aspect-[4/5] shadow-artwork"
          />
          <p className="mt-4 text-sm text-umber">
            {heroArtwork.title}, {heroArtwork.year}
          </p>
        </div>
      </section>

      <section className="section-y bg-chalk/80">
        <div className="page-shell">
          <div className="reveal flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">Featured artworks</p>
              <h2 className="mt-5 max-w-2xl font-serif text-5xl leading-none tracking-tight sm:text-6xl">
                Recent works selected for close viewing.
              </h2>
            </div>
            <Link href="/works" className="text-link">
              View all works
            </Link>
          </div>
          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {featuredWorks.map((artwork) => (
              <ArtworkCard key={artwork.slug} artwork={artwork} />
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell section-y grid gap-12 lg:grid-cols-[0.8fr_1fr] lg:items-start">
        <div className="reveal">
          <p className="eyebrow">About the artist</p>
          <h2 className="mt-5 font-serif text-5xl leading-none tracking-tight sm:text-6xl">
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
            <h2 className="mt-5 max-w-3xl font-serif text-5xl leading-none tracking-tight sm:text-6xl">
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
