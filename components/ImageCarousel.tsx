"use client";

import { useState } from "react";
import { FlexibleImage } from "./FlexibleImage";

type ImageCarouselProps = {
  images: string[];
  title: string;
  alt: string;
};

export function ImageCarousel({ images, title, alt }: ImageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex] ?? images[0];
  const hasMultipleImages = images.length > 1;

  function showPrevious() {
    setActiveIndex((current) => (current === 0 ? images.length - 1 : current - 1));
  }

  function showNext() {
    setActiveIndex((current) => (current === images.length - 1 ? 0 : current + 1));
  }

  return (
    <section className="reveal lg:sticky lg:top-28">
      <div className="artwork-frame">
        <div className="artwork-core">
          <FlexibleImage
            key={activeImage}
            src={activeImage}
            alt={activeIndex === 0 ? alt : `${alt}, alternate view ${activeIndex + 1}`}
            priority={activeIndex === 0}
            className="image-pad mx-auto"
          />
        </div>
      </div>

      {hasMultipleImages ? (
        <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-ink/10 pt-5">
          <div className="flex items-center gap-4">
            <span className="metadata-label">
              {String(activeIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
            </span>
            <div className="flex gap-2">
              {images.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  aria-label={`Show image ${index + 1} of ${title}`}
                  aria-current={activeIndex === index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-2.5 rounded-full border border-ink/20 ${
                    activeIndex === index ? "w-9 bg-ink" : "w-2.5 bg-transparent"
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={showPrevious} className="btn-secondary min-h-10 px-4 py-2">
              Previous
            </button>
            <button type="button" onClick={showNext} className="btn-secondary min-h-10 px-4 py-2">
              Next
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
