import type { Metadata } from "next";
import Image from "next/image";
import { SocialLinks } from "@/components/SocialLinks";
import { aboutHighlights, artistBio } from "@/data/about";
import { resolveImageUrl } from "@/lib/images";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "About the Artist | Kofi Baiden Brushworks",
  description:
    "Learn about Kofi Baiden, a Ghana-based contemporary artist working across painting and mixed media.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <main>
      <section className="page-shell section-y grid gap-12 lg:grid-cols-[0.85fr_1fr] lg:items-start">
        <div className="reveal">
          <p className="eyebrow">Biography</p>
          <h1 className="mt-6 font-serif text-6xl leading-none tracking-tight sm:text-7xl">
            Kofi Baiden
          </h1>
          <p className="mt-6 max-w-md text-lg leading-8 text-graphite">
            Ghana-based contemporary visual artist working through painting, drawing, and mixed media.
          </p>
          <SocialLinks className="mt-8" />
        </div>
        <div className="reveal reveal-delay-1">
          <div className="overflow-hidden rounded-artwork bg-gallery shadow-artwork">
            <Image
              src={resolveImageUrl("/artist/kofi-baiden-portrait.svg")}
              alt="Editorial portrait of Kofi Baiden"
              width={900}
              height={1125}
              quality={90}
              className="aspect-[4/5] h-full w-full object-cover"
            />
          </div>
          <div className="mt-10 space-y-7 text-lg leading-8 text-graphite">
            {artistBio.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-chalk/80">
        <div className="page-shell section-y grid gap-10 md:grid-cols-3">
          {aboutHighlights.map(({ title, copy }) => (
            <article key={title} className="reveal rounded-soft border border-ink/10 bg-bone/35 p-6 shadow-soft">
              <h2 className="font-serif text-3xl">{title}</h2>
              <p className="mt-4 text-sm leading-7 text-graphite">{copy}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
