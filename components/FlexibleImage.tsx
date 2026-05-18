/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { resolveImageUrl } from "@/lib/images";

type FlexibleImageProps = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
};

export function FlexibleImage({ src, alt, className, priority }: FlexibleImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <span className={`artwork-load-shell ${isLoaded ? "is-loaded" : ""}`}>
      <img
        src={resolveImageUrl(src)}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        className={`responsive-artwork-image ${className ?? ""}`}
      />
      <span aria-hidden="true" className="artwork-loading-veil" />
    </span>
  );
}
