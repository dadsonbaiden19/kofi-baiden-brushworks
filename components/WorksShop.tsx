"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { formatGhs, type Work } from "@/data/works";
import { FlexibleImage } from "./FlexibleImage";
import { FilterIcon, MailIcon, SearchIcon, SortIcon } from "./Icons";

type SortKey = "curated" | "title-az" | "title-za" | "format";

const allOption = "All";

function uniqueValues(values: string[]) {
  return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b));
}

function compareFormat(a: Work, b: Work) {
  const order = ["Portrait", "Square", "Landscape"];
  return order.indexOf(a.format ?? "") - order.indexOf(b.format ?? "");
}

export function WorksShop({ works }: { works: Work[] }) {
  const [query, setQuery] = useState("");
  const [formatFilter, setFormatFilter] = useState(allOption);
  const [sortKey, setSortKey] = useState<SortKey>("curated");

  const formatOptions = useMemo(
    () => [allOption, ...uniqueValues(works.map((work) => work.format).filter(Boolean) as string[])],
    [works],
  );

  const filteredWorks = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return works
      .filter((work) => {
        const matchesQuery =
          normalizedQuery.length === 0 ||
          [work.title, work.medium, work.dimensions, work.availability, work.format ?? ""]
            .join(" ")
            .toLowerCase()
            .includes(normalizedQuery);
        const matchesFormat = formatFilter === allOption || work.format === formatFilter;

        return matchesQuery && matchesFormat;
      })
      .sort((a, b) => {
        if (sortKey === "title-az") {
          return a.title.localeCompare(b.title, undefined, { numeric: true });
        }

        if (sortKey === "title-za") {
          return b.title.localeCompare(a.title, undefined, { numeric: true });
        }

        if (sortKey === "format") {
          return compareFormat(a, b) || a.title.localeCompare(b.title, undefined, { numeric: true });
        }

        return works.indexOf(a) - works.indexOf(b);
      });
  }, [formatFilter, query, sortKey, works]);

  const hasActiveFilters = query || formatFilter !== allOption || sortKey !== "curated";

  function resetFilters() {
    setQuery("");
    setFormatFilter(allOption);
    setSortKey("curated");
  }

  return (
    <section className="shop-layout reveal reveal-delay-2" aria-label="Works catalogue">
      <aside className="shop-filter-panel">
        <div className="flex items-center gap-3 border-b border-ink/10 pb-5">
          <span className="icon-button h-10 w-10 bg-chalk/60">
            <FilterIcon className="h-4 w-4" />
          </span>
          <div>
            <p className="metadata-label">Filter</p>
            <h2 className="heading text-2xl">Find a work</h2>
          </div>
        </div>

        <div className="shop-filter-group">
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
              placeholder="Title, status, format"
              className="shop-input"
            />
          </div>
        </div>

        <FilterButtonGroup
          label="Format"
          options={formatOptions}
          value={formatFilter}
          onChange={setFormatFilter}
        />

        <div className="shop-filter-group">
          <p className="shop-label">Acquisition</p>
          <div className="rounded-soft border border-ink/10 bg-chalk/45 p-4 text-sm leading-6 text-graphite">
            <span className="mb-2 inline-flex rounded-full border border-ink/15 bg-chalk px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-umber">
              Inquiry led
            </span>
            <p>Available works can be discussed with the studio. Sold works are shown for reference only.</p>
          </div>
        </div>

        {hasActiveFilters ? (
          <button type="button" className="btn-secondary w-full" onClick={resetFilters}>
            Reset filters
          </button>
        ) : null}
      </aside>

      <div className="min-w-0">
        <div className="shop-toolbar">
          <div>
            <p className="metadata-label">Works</p>
            <p className="mt-2 text-sm text-graphite">
              Showing {filteredWorks.length} of {works.length} works
            </p>
          </div>
          <label className="shop-sort-control">
            <SortIcon className="h-4 w-4" />
            <span className="sr-only">Sort works</span>
            <select
              value={sortKey}
              onChange={(event) => setSortKey(event.target.value as SortKey)}
              className="shop-select"
            >
              <option value="curated">Curated order</option>
              <option value="title-az">Title A-Z</option>
              <option value="title-za">Title Z-A</option>
              <option value="format">Format</option>
            </select>
          </label>
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
              Adjust the filter selection or clear everything to return to the full available list.
            </p>
            <button type="button" className="btn-primary mt-6" onClick={resetFilters}>
              Show all works
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function FilterButtonGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="shop-filter-group">
      <p className="shop-label">{label}</p>
      <div className="grid gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={value === option}
            className={`shop-filter-button ${value === option ? "is-active" : ""}`}
            onClick={() => onChange(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
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

        <div className="mt-5 flex flex-wrap gap-2">
          {work.format ? <span className="shop-tag">{work.format}</span> : null}
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
