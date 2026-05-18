/* eslint-disable @next/next/no-img-element */
import { resolveImageUrl } from "@/lib/images";

type FlexibleImageProps = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
};

export function FlexibleImage({ src, alt, className, priority }: FlexibleImageProps) {
  return (
    <img
      src={resolveImageUrl(src)}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      className={`responsive-artwork-image ${className ?? ""}`}
    />
  );
}
