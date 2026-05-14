import { siteConfig } from "./site";

export const studioContact = {
  email: "studio@kofibaidenbrushworks.com",
  location: "Accra, Ghana",
  responseTime: "2-3 business days",
  instagramUrl: siteConfig.instagramUrl,
  whatsappUrl: siteConfig.whatsappUrl
    ? `${siteConfig.whatsappUrl}${
        siteConfig.whatsappUrl.includes("?") ? "&" : "?"
      }text=${encodeURIComponent(siteConfig.whatsappMessage)}`
    : "",
};

export const collectorNotes = [
  {
    title: "Authenticity",
    copy: "All artworks come with an authenticity certificate.",
  },
  {
    title: "Worldwide shipping",
    copy: "Worldwide shipping available. Reach out for a custom shipping quote to your region.",
  },
];
