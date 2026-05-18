type LoadingExperienceProps = {
  variant?: "page" | "gallery" | "detail";
  label?: string;
};

export function LoadingExperience({ variant = "page", label = "Preparing the room" }: LoadingExperienceProps) {
  const plateCount = variant === "detail" ? 1 : variant === "gallery" ? 8 : 5;

  return (
    <main id="main-content" className="page-shell section-y loading-scene" aria-busy="true">
      <section className="grid gap-12 lg:grid-cols-[0.72fr_1fr] lg:items-end">
        <div>
          <p className="eyebrow">{label}</p>
          <h1 className="mt-6 heading text-6xl sm:text-7xl">
            Kofi Baiden Brushworks
          </h1>
          <p className="mt-6 max-w-md text-lg leading-8 text-graphite">
            The catalogue is being arranged with care. Artwork and text will appear shortly.
          </p>
        </div>
        <div className="loading-ledger" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </section>

      <section
        className={`mt-16 grid gap-x-8 gap-y-12 ${
          variant === "detail" ? "lg:grid-cols-[1.15fr_0.65fr]" : "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        }`}
        aria-label="Loading artwork previews"
      >
        {Array.from({ length: plateCount }, (_, index) => (
          <article key={index} className={variant === "detail" && index === 0 ? "lg:col-span-1" : ""}>
            <div className="artwork-frame">
              <div className={`loading-artwork-plate ${index % 3 === 1 ? "is-wide" : ""} ${index % 3 === 2 ? "is-square" : ""}`} />
            </div>
            {variant !== "detail" ? (
              <div className="mt-5 border-t border-ink/10 pt-5">
                <div className="loading-line w-16" />
                <div className="loading-line mt-4 h-6 w-3/4" />
                <div className="loading-line mt-3 w-1/2" />
              </div>
            ) : (
              <div className="surface-quiet grid gap-4 py-8">
                <div className="loading-line h-8 w-2/3" />
                <div className="loading-line w-full" />
                <div className="loading-line w-5/6" />
                <div className="loading-line w-1/2" />
              </div>
            )}
          </article>
        ))}
      </section>
    </main>
  );
}
