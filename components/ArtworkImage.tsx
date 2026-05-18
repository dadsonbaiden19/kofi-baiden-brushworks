import Image from "next/image";
import { resolveImageUrl } from "@/lib/images";

type ArtworkImageProps = {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
};

export function ArtworkImage({ src, alt, priority, className, imageClassName }: ArtworkImageProps) {
  return (
    <div className={`artwork-frame ${className ?? ""}`}>
      <div className="artwork-core h-full w-full">
        <Image
          src={resolveImageUrl(src)}
          alt={alt}
          fill
          priority={priority}
          quality={90}
          sizes="(min-width: 1024px) 45vw, 100vw"
          className={`transition-transform duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            imageClassName ?? "object-cover"
          }`}
        />
      </div>
    </div>
  );
}
