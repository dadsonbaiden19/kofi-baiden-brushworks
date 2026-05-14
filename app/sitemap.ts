import type { MetadataRoute } from "next";
import { absoluteSiteUrl } from "@/data/site";
import { works } from "@/data/works";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = ["/", "/works", "/gallery", "/about", "/contact"];
  const artworkRoutes = works.map((work) => `/works/${work.slug}`);

  return [...staticRoutes, ...artworkRoutes].map((path) => ({
    url: absoluteSiteUrl(path),
    lastModified: now,
    changeFrequency: path.startsWith("/works/") ? "monthly" : "weekly",
    priority: path === "/" ? 1 : path.startsWith("/works") ? 0.8 : 0.7,
  }));
}
