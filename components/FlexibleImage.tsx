/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useMemo, useRef, useState, type KeyboardEvent, type MouseEvent } from "react";
import { resolveImageUrl } from "@/lib/images";
import { type LightboxImage, useImageLightbox } from "./ImageLightbox";

type FlexibleImageProps = {
  src: string;
  alt: string;
  className?: string;
  wrapperClassName?: string;
  priority?: boolean;
  zoomable?: boolean;
  lightboxImages?: LightboxImage[];
  lightboxIndex?: number;
};

export function FlexibleImage({
  src,
  alt,
  className,
  wrapperClassName,
  priority,
  zoomable = true,
  lightboxImages,
  lightboxIndex = 0,
}: FlexibleImageProps) {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { openLightbox } = useImageLightbox();
  const resolvedSrc = resolveImageUrl(src);
  const viewerImages = useMemo<LightboxImage[]>(
    () => lightboxImages ?? [{ src, alt }],
    [alt, lightboxImages, src],
  );

  useEffect(() => {
    const image = imageRef.current;
    setIsLoaded(false);

    if (!image) {
      return;
    }

    if (image.complete) {
      setIsLoaded(true);
      return;
    }

    function handleLoadState() {
      setIsLoaded(true);
    }

    image.addEventListener("load", handleLoadState);
    image.addEventListener("error", handleLoadState);

    return () => {
      image.removeEventListener("load", handleLoadState);
      image.removeEventListener("error", handleLoadState);
    };
  }, [resolvedSrc]);

  function openViewer(event: MouseEvent<HTMLSpanElement> | KeyboardEvent<HTMLSpanElement>) {
    if (!zoomable) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    openLightbox(viewerImages, lightboxIndex);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLSpanElement>) {
    if (event.key === "Enter" || event.key === " ") {
      openViewer(event);
    }
  }

  return (
    <span
      role={zoomable ? "button" : undefined}
      tabIndex={zoomable ? 0 : undefined}
      className={`artwork-load-shell ${zoomable ? "artwork-image-trigger" : ""} ${
        isLoaded ? "is-loaded" : ""
      } ${wrapperClassName ?? ""}`}
      onClick={openViewer}
      onKeyDown={handleKeyDown}
      onContextMenu={(event) => event.preventDefault()}
    >
      <img
        ref={imageRef}
        src={resolvedSrc}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        draggable={false}
        onLoad={() => setIsLoaded(true)}
        onError={() => setIsLoaded(true)}
        onContextMenu={(event) => event.preventDefault()}
        className={`responsive-artwork-image ${className ?? ""}`}
      />
      <span aria-hidden="true" className="artwork-loading-veil" />
    </span>
  );
}
