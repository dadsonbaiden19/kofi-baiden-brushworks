import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" className="page-shell section-y">
      <div className="max-w-2xl">
        <p className="eyebrow">Catalogue note</p>
        <h1 className="mt-6 heading text-6xl sm:text-7xl">
          This page is not in the archive.
        </h1>
        <p className="mt-6 text-lg leading-8 text-graphite">
          The work or page you are looking for may have moved. Continue through the current
          catalogue or return to the studio homepage.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link href="/works" className="btn-primary">
            View works
          </Link>
          <Link href="/" className="btn-secondary">
            Return home
          </Link>
        </div>
      </div>
    </main>
  );
}
