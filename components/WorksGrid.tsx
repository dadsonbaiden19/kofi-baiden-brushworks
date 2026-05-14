import type { Work } from "@/data/works";
import { ArtworkCard } from "./ArtworkCard";

export function WorksGrid({ works }: { works: Work[] }) {
  return (
    <div className="mt-16 grid gap-x-10 gap-y-16 md:grid-cols-2 xl:grid-cols-3">
      {works.map((work) => (
        <ArtworkCard key={work.slug} artwork={work} />
      ))}
    </div>
  );
}
