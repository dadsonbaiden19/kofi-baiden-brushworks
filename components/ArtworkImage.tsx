import { FlexibleImage } from "./FlexibleImage";

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
      <div className="artwork-core">
        <FlexibleImage
          src={src}
          alt={alt}
          priority={priority}
          className={`image-pad transition-transform duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${imageClassName ?? ""}`}
        />
      </div>
    </div>
  );
}
