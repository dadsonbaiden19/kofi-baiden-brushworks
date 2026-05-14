import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArtworkDetailLayout } from "@/components/ArtworkDetailLayout";
import { JsonLd } from "@/components/JsonLd";
import { absoluteSiteUrl } from "@/data/site";
import { formatGhs, getWork, works } from "@/data/works";
import { resolveImageUrl } from "@/lib/images";
import { createPageMetadata } from "@/lib/seo";

type ArtworkPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return works.map((artwork) => ({ slug: artwork.slug }));
}

export async function generateMetadata({ params }: ArtworkPageProps): Promise<Metadata> {
  const { slug } = await params;
  const artwork = getWork(slug);

  if (!artwork) {
    return {
      title: "Artwork not found",
    };
  }

  return createPageMetadata({
    title: artwork.title,
    description: `${artwork.title}, ${artwork.year}. ${artwork.medium}. ${artwork.dimensions}. ${formatGhs(artwork.priceGhs)}. ${artwork.availability}.`,
    path: `/works/${artwork.slug}`,
    image: resolveImageUrl(artwork.images[0]),
  });
}

export default async function ArtworkDetailPage({ params }: ArtworkPageProps) {
  const { slug } = await params;
  const artwork = getWork(slug);

  if (!artwork) {
    notFound();
  }

  return (
    <main className="page-shell section-y">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "VisualArtwork",
          name: artwork.title,
          creator: {
            "@type": "Person",
            name: "Kofi Baiden",
            address: {
              "@type": "PostalAddress",
              addressCountry: "GH",
              addressLocality: "Accra",
            },
          },
          url: absoluteSiteUrl(`/works/${artwork.slug}`),
          image: resolveImageUrl(artwork.images[0]),
          dateCreated: artwork.year,
          artMedium: artwork.medium,
          size: artwork.dimensions,
          description: `${artwork.description} All artworks come with an authenticity certificate.`,
          offers: {
            "@type": "Offer",
            price: artwork.priceGhs,
            priceCurrency: "GHS",
            availability:
              artwork.availability === "Available"
                ? "https://schema.org/InStock"
                : "https://schema.org/SoldOut",
            url: absoluteSiteUrl(`/works/${artwork.slug}`),
          },
          additionalProperty: [
            {
              "@type": "PropertyValue",
              name: "Authenticity",
              value: "All artworks come with an authenticity certificate.",
            },
            {
              "@type": "PropertyValue",
              name: "Shipping",
              value:
                "Worldwide shipping available. Reach out for a custom shipping quote to your region.",
            },
          ],
        }}
      />
      <ArtworkDetailLayout artwork={artwork} />
    </main>
  );
}
