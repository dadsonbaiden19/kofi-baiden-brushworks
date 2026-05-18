import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" className="page-shell section-y not-found-scene">
      <section className="grid min-h-[62dvh] gap-12 lg:grid-cols-[0.78fr_1fr] lg:items-center">
        <div className="reveal">
          <p className="eyebrow">Catalogue note / 404</p>
          <h1 className="mt-6 heading-display text-6xl sm:text-7xl lg:text-8xl">
            <span className="block">Not in</span>
            <span className="block heading-muted">the archive</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-8 text-graphite">
            The page you are looking for may have moved, been renamed, or left the current
            exhibition index. The studio remains open.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/" className="btn-primary">
              Return home
            </Link>
            <Link href="/works" className="btn-secondary">
              View works
            </Link>
            <Link href="/gallery" className="btn-secondary">
              View gallery
            </Link>
          </div>
        </div>
        <div className="not-found-composition reveal reveal-delay-1" aria-hidden="true">
          <div className="not-found-plate not-found-plate-primary" />
          <div className="not-found-plate not-found-plate-secondary" />
          <p>Uncatalogued surface</p>
        </div>
      </section>
    </main>
  );
}
