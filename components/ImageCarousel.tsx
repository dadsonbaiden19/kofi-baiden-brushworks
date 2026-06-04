"use client";

import { useState, type CSSProperties, type MouseEvent } from "react";
import { FlexibleImage } from "./FlexibleImage";
import { ChevronLeftIcon, ChevronRightIcon } from "./Icons";

type ImageCarouselProps = {
  images: string[];
  title: string;
  alt: string;
};

export function ImageCarousel({ images, title, alt }: ImageCarouselProps) {
  const displayImages = images.slice(0, 2);
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoomOrigin, setZoomOrigin] = useState({ x: 50, y: 50 });
  const activeImage = displayImages[activeIndex] ?? displayImages[0];
  const hasMultipleImages = displayImages.length > 1;
  const hasThumbnails = displayImages.length > 0;
  const lightboxImages = displayImages.map((image, index) => ({
    src: image,
    alt: index === 0 ? alt : `${alt}, alternate view ${index + 1}`,
  }));

  if (!activeImage) {
    return null;
  }

  function showPrevious() {
    setActiveIndex((current) => (current === 0 ? displayImages.length - 1 : current - 1));
  }

  function showNext() {
    setActiveIndex((current) => (current === displayImages.length - 1 ? 0 : current + 1));
  }

  function handleZoomMove(event: MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    setZoomOrigin({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    });
  }

  return (
    <section className="reveal lg:sticky lg:top-28">
      <div className="artwork-viewer">
        {hasThumbnails ? (
          <div className="thumbnail-strip" aria-label={`${title} image thumbnails`}>
            {displayImages.map((image, index) => (
              <button
                key={image}
                type="button"
                aria-label={`Show image ${index + 1} of ${title}`}
                aria-current={activeIndex === index}
                onClick={() => setActiveIndex(index)}
                onContextMenu={(event) => event.preventDefault()}
                className={`thumbnail-button ${activeIndex === index ? "is-active" : ""}`}
              >
                <FlexibleImage
                  src={image}
                  alt={index === 0 ? alt : `${alt}, alternate view ${index + 1}`}
                  zoomable={false}
                  className="p-1"
                />
              </button>
            ))}
          </div>
        ) : null}

        <div className="artwork-frame artwork-main-frame">
          <div
            className="artwork-core artwork-zoom-pane"
            onMouseMove={handleZoomMove}
            onMouseLeave={() => setZoomOrigin({ x: 50, y: 50 })}
            style={
              {
                "--zoom-x": `${zoomOrigin.x}%`,
                "--zoom-y": `${zoomOrigin.y}%`,
              } as CSSProperties
            }
          >
            <FlexibleImage
              key={activeImage}
              src={activeImage}
              alt={activeIndex === 0 ? alt : `${alt}, alternate view ${activeIndex + 1}`}
              priority={activeIndex === 0}
              lightboxImages={lightboxImages}
              lightboxIndex={activeIndex}
              className="image-pad mx-auto"
            />
            {hasMultipleImages ? (
              <>
                <button
                  type="button"
                  onClick={showPrevious}
                  className="icon-button carousel-arrow carousel-arrow-left"
                  aria-label={`Show previous image of ${title}`}
                >
                  <ChevronLeftIcon />
                </button>
                <button
                  type="button"
                  onClick={showNext}
                  className="icon-button carousel-arrow carousel-arrow-right"
                  aria-label={`Show next image of ${title}`}
                >
                  <ChevronRightIcon />
                </button>
              </>
            ) : null}
          </div>
        </div>
      </div>

      {hasMultipleImages ? (
        <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-ink/10 pt-5">
          <div className="flex items-center gap-4">
            <span className="metadata-label">
              {String(activeIndex + 1).padStart(2, "0")} / {String(displayImages.length).padStart(2, "0")}
            </span>
            <span className="text-sm text-graphite">Hover to inspect texture</span>
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={showPrevious} className="btn-secondary min-h-11 px-4 py-2">
              <ChevronLeftIcon className="h-4 w-4" />
              <span className="sr-only">Previous</span>
            </button>
            <button type="button" onClick={showNext} className="btn-secondary min-h-11 px-4 py-2">
              <ChevronRightIcon className="h-4 w-4" />
              <span className="sr-only">Next</span>
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
