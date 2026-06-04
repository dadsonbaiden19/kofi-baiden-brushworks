/* eslint-disable @next/next/no-img-element */
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
  type WheelEvent,
} from "react";
import { resolveImageUrl } from "@/lib/images";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
  ZoomInIcon,
  ZoomOutIcon,
} from "./Icons";

export type LightboxImage = {
  src: string;
  alt: string;
};

type LightboxState = {
  images: LightboxImage[];
  index: number;
};

type ImageLightboxContextValue = {
  openLightbox: (images: LightboxImage[], startIndex?: number) => void;
};

const ImageLightboxContext = createContext<ImageLightboxContextValue>({
  openLightbox: () => undefined,
});

export function useImageLightbox() {
  return useContext(ImageLightboxContext);
}

export function ImageLightboxProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<LightboxState | null>(null);
  const [zoom, setZoom] = useState(1);

  const activeImage = state?.images[state.index];
  const hasMultipleImages = Boolean(state && state.images.length > 1);

  const contextValue = useMemo<ImageLightboxContextValue>(
    () => ({
      openLightbox(images, startIndex = 0) {
        const safeImages = images.filter((image) => image.src);

        if (safeImages.length === 0) {
          return;
        }

        const safeIndex = Math.min(Math.max(startIndex, 0), safeImages.length - 1);
        setState({ images: safeImages, index: safeIndex });
        setZoom(1);
      },
    }),
    [],
  );

  useEffect(() => {
    if (!state) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setState(null);
      }

      if (event.key === "ArrowLeft") {
        setState((current) => {
          if (!current) return current;
          return {
            ...current,
            index: current.index === 0 ? current.images.length - 1 : current.index - 1,
          };
        });
        setZoom(1);
      }

      if (event.key === "ArrowRight") {
        setState((current) => {
          if (!current) return current;
          return {
            ...current,
            index: current.index === current.images.length - 1 ? 0 : current.index + 1,
          };
        });
        setZoom(1);
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [state]);

  function closeLightbox() {
    setState(null);
  }

  function showPrevious() {
    setState((current) => {
      if (!current) return current;
      return {
        ...current,
        index: current.index === 0 ? current.images.length - 1 : current.index - 1,
      };
    });
    setZoom(1);
  }

  function showNext() {
    setState((current) => {
      if (!current) return current;
      return {
        ...current,
        index: current.index === current.images.length - 1 ? 0 : current.index + 1,
      };
    });
    setZoom(1);
  }

  function zoomIn() {
    setZoom((current) => Math.min(current + 0.5, 3));
  }

  function zoomOut() {
    setZoom((current) => Math.max(current - 0.5, 1));
  }

  function handleWheel(event: WheelEvent<HTMLDivElement>) {
    event.preventDefault();
    setZoom((current) => {
      const next = current + (event.deltaY > 0 ? -0.25 : 0.25);
      return Math.min(Math.max(next, 1), 3);
    });
  }

  return (
    <ImageLightboxContext.Provider value={contextValue}>
      {children}
      {activeImage ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Artwork image viewer"
          className="lightbox-backdrop"
          onClick={closeLightbox}
          onContextMenu={(event) => event.preventDefault()}
        >
          <div className="lightbox-panel" onClick={(event) => event.stopPropagation()}>
            <div className="lightbox-toolbar">
              <span className="metadata-label text-chalk/75">
                {String((state?.index ?? 0) + 1).padStart(2, "0")} /{" "}
                {String(state?.images.length ?? 1).padStart(2, "0")}
              </span>
              <div className="flex items-center gap-2">
                <button type="button" className="icon-button lightbox-control" onClick={zoomOut} aria-label="Zoom out">
                  <ZoomOutIcon />
                </button>
                <button type="button" className="icon-button lightbox-control" onClick={zoomIn} aria-label="Zoom in">
                  <ZoomInIcon />
                </button>
                <button type="button" className="icon-button lightbox-control" onClick={closeLightbox} aria-label="Close image viewer">
                  <CloseIcon />
                </button>
              </div>
            </div>

            {hasMultipleImages ? (
              <>
                <button
                  type="button"
                  className="icon-button lightbox-arrow lightbox-arrow-left"
                  onClick={showPrevious}
                  aria-label="Show previous image"
                >
                  <ChevronLeftIcon />
                </button>
                <button
                  type="button"
                  className="icon-button lightbox-arrow lightbox-arrow-right"
                  onClick={showNext}
                  aria-label="Show next image"
                >
                  <ChevronRightIcon />
                </button>
              </>
            ) : null}

            <div
              className="lightbox-stage"
              onWheel={handleWheel}
              onContextMenu={(event) => event.preventDefault()}
            >
              <img
                src={resolveImageUrl(activeImage.src)}
                alt={activeImage.alt}
                draggable={false}
                onContextMenu={(event) => event.preventDefault()}
                className={`lightbox-image ${zoom > 1 ? "is-zoomed" : ""}`}
                style={{
                  width: zoom > 1 ? `${zoom * 100}%` : "auto",
                }}
              />
            </div>
          </div>
        </div>
      ) : null}
    </ImageLightboxContext.Provider>
  );
}
