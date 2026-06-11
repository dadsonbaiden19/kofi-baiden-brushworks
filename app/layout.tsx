import type { Metadata } from "next";
import { Bebas_Neue, Cormorant_Garamond, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { BrandIntro } from "@/components/BrandIntro";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ImageLightboxProvider } from "@/components/ImageLightbox";
import { JsonLd } from "@/components/JsonLd";
import { absoluteSiteUrl, siteConfig } from "@/data/site";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Kofi Baiden Brushworks | Contemporary Artist",
    template: "%s | Kofi Baiden Brushworks",
  },
  description:
    "A refined contemporary artist portfolio for Ghana-based Kofi Baiden Brushworks, featuring available works, artist biography, commissions, exhibitions, and acquisitions.",
  keywords: siteConfig.keywords,
  icons: {
    icon: "/brand/kb-icon.svg",
  },
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: "Kofi Baiden Brushworks",
    description:
      "Contemporary fine-art portfolio and online exhibition catalogue for Ghana-based artist Kofi Baiden.",
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: absoluteSiteUrl(siteConfig.ogImage),
        width: 1200,
        height: 630,
        alt: "Kofi Baiden Brushworks",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kofi Baiden Brushworks | Contemporary Artist",
    description:
      "Contemporary artist based in Ghana creating fine art paintings and mixed-media works.",
    images: [absoluteSiteUrl(siteConfig.ogImage)],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bebas.variable} ${cormorant.variable} ${inter.variable}`}
    >
      <head>
        <Script id="theme-init" strategy="beforeInteractive">
          {`(() => {
            try {
              const root = document.documentElement;
              const stored = localStorage.getItem("theme");
              const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
              const theme = stored || (systemDark ? "dark" : "light");
              const ua = window.navigator.userAgent;
              const lowerUA = ua.toLowerCase();
              const isIOS =
                /ipad|iphone|ipod/.test(lowerUA) ||
                (window.navigator.platform === "MacIntel" && window.navigator.maxTouchPoints > 1);
              const isSafari = /safari/.test(lowerUA) && !/chrome|crios|android|fxios|edgios/.test(lowerUA);
              root.classList.toggle("dark", theme === "dark");
              root.classList.toggle("is-ios", isIOS);
              root.classList.toggle("is-safari", isSafari);
              root.dataset.theme = theme;
            } catch {
              document.documentElement.classList.remove("dark", "is-ios", "is-safari");
              document.documentElement.dataset.theme = "light";
            }
          })();`}
        </Script>
      </head>
      <body className="font-sans antialiased">
        <ImageLightboxProvider>
          <BrandIntro />
          <a href="#main-content" className="skip-link">
            Skip to content
          </a>
          <JsonLd
            data={{
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: siteConfig.name,
              url: siteConfig.url,
              description:
                "Contemporary artist portfolio for Kofi Baiden Brushworks, based in Ghana.",
              publisher: {
                "@type": "Person",
                name: "Kofi Baiden",
              },
            }}
          />
          <JsonLd
            data={{
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Kofi Baiden",
              url: siteConfig.url,
              jobTitle: "Contemporary Artist",
              nationality: "Ghanaian",
              address: {
                "@type": "PostalAddress",
                addressCountry: "GH",
                addressLocality: "Accra",
              },
              sameAs: siteConfig.instagramUrl ? [siteConfig.instagramUrl] : undefined,
            }}
          />
          <Header />
          {children}
          <Footer />
        </ImageLightboxProvider>
      </body>
    </html>
  );
}
