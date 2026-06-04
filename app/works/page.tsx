import type { Metadata } from "next";
import { CollectorNotes } from "@/components/CollectorNotes";
import { WorksShop } from "@/components/WorksShop";
import { worksPageWorks } from "@/data/works";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Available Works",
  description:
    "View original fine art paintings and mixed-media works by Kofi Baiden, including titles, mediums, dimensions, pricing details, and availability.",
  path: "/works",
});

export default function WorksPage() {
  return (
    <main id="main-content" className="page-shell section-y">
      <div className="reveal max-w-3xl">
        <p className="eyebrow">Works</p>
        <h1 className="mt-6 heading text-6xl sm:text-7xl">
          Catalogue of works
        </h1>
        <p className="mt-6 text-lg leading-8 text-graphite">
          Browse current and selected sold paintings by format, title, and availability. Available
          works begin with direct studio inquiry.
        </p>
      </div>
      <div className="reveal reveal-delay-1 mt-10 max-w-4xl">
        <CollectorNotes />
      </div>
      <WorksShop works={worksPageWorks} />
    </main>
  );
}
