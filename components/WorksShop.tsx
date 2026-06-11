"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { formatGhs, type Work } from "@/data/works";
import { FlexibleImage } from "./FlexibleImage";
import { MailIcon, SearchIcon } from "./Icons";

export function WorksShop({ works }: { works: Work[] }) {
  const [query, setQuery] = useState("");

  const filteredWorks = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return works;
    }

    return works.filter((work) =>
      [work.title, work.medium, work.dimensions, work.availability, work.format ?? ""]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }, [query, works]);

  function resetSearch() {
    setQuery("");
  }

  return (
    <section className="shop-layout reveal reveal-delay-2" aria-label="Works catalogue">
      <div className="shop-toolbar">
        <div className="shop-search-block">
          <label htmlFor="works-search" className="shop-label">
            Search
          </label>
          <div className="shop-search-field">
            <SearchIcon className="h-4 w-4" />
            <input
              id="works-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Title, status, medium"
              className="shop-input"
            />
          </div>
        </div>
        <div className="text-sm text-graphite">
          Showing {filteredWorks.length} of {works.length} works
        </div>
      </div>

      {filteredWorks.length > 0 ? (
        <div className="shop-grid">
          {filteredWorks.map((work, index) => (
            <ShopWorkCard key={work.slug} work={work} index={index} />
          ))}
        </div>
      ) : (
        <div className="surface-quiet mt-8 py-12 text-center">
          <h2 className="heading text-3xl">No works match</h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-graphite">
            Try another search to return to the full catalogue.
          </p>
          <button type="button" className="btn-primary mt-6" onClick={resetSearch}>
            Show all works
          </button>
        </div>
      )}
    </section>
  );
}

function ShopWorkCard({ work, index }: { work: Work; index: number }) {
  const isSold = work.availability === "Sold";
  const lightboxImages = work.images.slice(0, 2).map((image, imageIndex) => ({
    src: image,
    alt: imageIndex === 0 ? work.alt : `${work.alt}, alternate view ${imageIndex + 1}`,
  }));

  return (
    <article className="shop-work-card group">
      <div className="artwork-frame group-hover:-translate-y-1 group-hover:shadow-soft">
        <div className="artwork-core">
          <FlexibleImage
            src={work.images[0]}
            alt={work.alt}
            lightboxImages={lightboxImages}
            className="image-pad group-hover:scale-[1.02]"
          />
          {isSold ? <span className="sold-overlay-badge">Sold</span> : null}
        </div>
      </div>

      <div className="catalogue-rule mt-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="metadata-label mb-3">{String(index + 1).padStart(2, "0")}</p>
            <Link href={`/works/${work.slug}`} className="inline-block rounded-xl">
              <h2 className="heading text-3xl leading-tight">{work.title}</h2>
            </Link>
          </div>
          <span className="shrink-0 rounded-full border border-ink/15 bg-chalk/55 px-3 py-1 text-xs text-umber">
            {work.availability}
          </span>
        </div>

        <div className="mt-5 grid gap-3 text-sm text-graphite">
          <p>{work.medium}</p>
          <p>{work.dimensions}</p>
          <p className="font-medium text-umber">{formatGhs(work.priceGhs, work.priceLabel)}</p>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Link href={`/works/${work.slug}`} className="btn-secondary min-h-11 px-4 py-2">
            View details
          </Link>
          {isSold ? (
            <span className="sold-action-label">Sold</span>
          ) : (
            <Link href={`/contact?artwork=${work.slug}`} className="btn-primary min-h-11 px-4 py-2">
              <MailIcon className="h-4 w-4" />
              Inquire
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
