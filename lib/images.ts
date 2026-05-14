import { siteConfig } from "@/data/site";

export function resolveImageUrl(pathOrUrl: string) {
  if (/^https?:\/\//i.test(pathOrUrl)) {
    return pathOrUrl;
  }

  if (!siteConfig.imageBaseUrl) {
    return pathOrUrl;
  }

  const base = siteConfig.imageBaseUrl.endsWith("/")
    ? siteConfig.imageBaseUrl.slice(0, -1)
    : siteConfig.imageBaseUrl;
  const path = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;

  return `${base}${path}`;
}
