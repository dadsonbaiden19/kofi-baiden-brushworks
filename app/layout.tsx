import type { Metadata } from "next";
import { Bebas_Neue, Cormorant_Garamond, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
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
              const stored = localStorage.getItem("theme");
              const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
              const theme = stored || (systemDark ? "dark" : "light");
              document.documentElement.classList.toggle("dark", theme === "dark");
              document.documentElement.dataset.theme = theme;
            } catch {
              document.documentElement.classList.remove("dark");
              document.documentElement.dataset.theme = "light";
            }
          })();`}
        </Script>
      </head>
      <body className="font-sans antialiased">
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
      </body>
    </html>
  );
}
