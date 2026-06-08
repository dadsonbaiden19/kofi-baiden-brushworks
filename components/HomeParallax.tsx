"use client";

import { useEffect } from "react";

const desktopQuery = "(min-width: 768px)";
const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function px(value: number) {
  return `${Math.round(value * 100) / 100}px`;
}

export function HomeParallax() {
  useEffect(() => {
    const heroSection = document.querySelector<HTMLElement>(".home-hero-section");
    const latestMedia = Array.from(document.querySelectorAll<HTMLElement>(".home-latest-media"));

    if (!heroSection && latestMedia.length === 0) {
      return;
    }

    const desktopMedia = window.matchMedia(desktopQuery);
    const reducedMotionMedia = window.matchMedia(reducedMotionQuery);
    let frame = 0;

    function resetParallax() {
      heroSection?.style.setProperty("--hero-image-parallax-y", "0px");
      heroSection?.style.setProperty("--hero-content-parallax-y", "0px");
      latestMedia.forEach((element) => {
        element.style.setProperty("--latest-artwork-parallax-y", "0px");
      });
    }

    function updateParallax() {
      frame = 0;

      if (!desktopMedia.matches || reducedMotionMedia.matches) {
        resetParallax();
        return;
      }

      const viewportHeight = window.innerHeight || 1;
      const intensity = window.innerWidth < 980 ? 0.55 : 1;

      if (heroSection) {
        const heroRect = heroSection.getBoundingClientRect();
        const heroProgress = clamp(-heroRect.top / Math.max(heroRect.height, 1), 0, 1.15);
        heroSection.style.setProperty("--hero-image-parallax-y", px(heroProgress * 42 * intensity));
        heroSection.style.setProperty("--hero-content-parallax-y", px(heroProgress * 13 * intensity));
      }

      latestMedia.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const midpoint = rect.top + rect.height / 2;
        const distanceFromCenter = (midpoint - viewportHeight / 2) / viewportHeight;
        const offset = clamp(distanceFromCenter, -1, 1) * -14 * intensity;
        element.style.setProperty("--latest-artwork-parallax-y", px(offset));
      });
    }

    function scheduleUpdate() {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(updateParallax);
    }

    updateParallax();

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    desktopMedia.addEventListener("change", scheduleUpdate);
    reducedMotionMedia.addEventListener("change", scheduleUpdate);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      desktopMedia.removeEventListener("change", scheduleUpdate);
      reducedMotionMedia.removeEventListener("change", scheduleUpdate);
      resetParallax();
    };
  }, []);

  return null;
}
