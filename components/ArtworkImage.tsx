import { FlexibleImage } from "./FlexibleImage";

type ArtworkImageProps = {
  src: string;
  alt: string;
  hoverSrc?: string;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
};

export function ArtworkImage({
  src,
  alt,
  hoverSrc,
  priority,
  className,
  imageClassName,
}: ArtworkImageProps) {
  const lightboxImages = [
    { src, alt },
    ...(hoverSrc ? [{ src: hoverSrc, alt: `${alt}, alternate view 2` }] : []),
  ];

  return (
    <div className={`group artwork-frame ${className ?? ""}`}>
      <div className="artwork-core">
        <FlexibleImage
          src={src}
          alt={alt}
          priority={priority}
          lightboxImages={lightboxImages}
          className={`image-pad transition-transform duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${imageClassName ?? ""}`}
        />
        {hoverSrc ? (
          <FlexibleImage
            src={hoverSrc}
            alt={`${alt}, alternate view 2`}
            priority={priority}
            lightboxImages={lightboxImages}
            lightboxIndex={1}
            wrapperClassName="work-preview-image work-preview-image-2"
            className={`image-pad transition-transform duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${imageClassName ?? ""}`}
          />
        ) : null}
      </div>
    </div>
  );
}
