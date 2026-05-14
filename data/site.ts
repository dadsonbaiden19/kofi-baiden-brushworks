export const siteConfig = {
  name: "Kofi Baiden Brushworks",
  domain: "kofibaidenbrushworks.com",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://kofibaidenbrushworks.com",
  imageBaseUrl: process.env.NEXT_PUBLIC_IMAGE_BASE_URL || "",
  instagramUrl: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "",
  whatsappUrl: process.env.NEXT_PUBLIC_WHATSAPP_URL || "",
  whatsappMessage: "Hello, I'm interested in an artwork by Kofi Baiden.",
  ogImage: "/og-image.jpg",
  keywords: [
    "Kofi Baiden",
    "Kofi Baiden Brushworks",
    "contemporary artist Ghana",
    "Ghanaian contemporary artist",
    "African contemporary art",
    "fine art paintings Ghana",
    "mixed media artist Ghana",
    "original paintings for sale",
    "contemporary African art",
    "artwork commissions Ghana",
  ],
};

export function absoluteSiteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}
