import type { NextConfig } from "next";

function configuredImageHost() {
  const imageBaseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

  if (!imageBaseUrl) {
    return [];
  }

  try {
    const url = new URL(imageBaseUrl);
    return [
      {
        protocol: url.protocol.replace(":", "") as "http" | "https",
        hostname: url.hostname,
        pathname: "/**",
      },
    ];
  } catch {
    return [];
  }
}

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [88, 90, 92],
    remotePatterns: [
      // Add or replace this with the final Hostinger/CDN image hostname.
      { protocol: "https", hostname: "cdn.kofibaidenbrushworks.com", pathname: "/**" },
      { protocol: "https", hostname: "kofibaidenbrushworks.com", pathname: "/**" },
      // Common managed image hosts for future migration.
      { protocol: "https", hostname: "res.cloudinary.com", pathname: "/**" },
      { protocol: "https", hostname: "ucarecdn.com", pathname: "/**" },
      { protocol: "https", hostname: "ik.imagekit.io", pathname: "/**" },
      ...configuredImageHost(),
    ],
  },
};

export default nextConfig;
