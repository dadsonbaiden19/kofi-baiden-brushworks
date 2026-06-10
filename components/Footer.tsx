import { readFileSync } from "node:fs";
import path from "node:path";
import Link from "next/link";
import { SocialLinks } from "./SocialLinks";
import { studioContact } from "@/data/contact";

const footerLogoSvg = readFileSync(
  path.join(process.cwd(), "public", "brand", "footer-logo-light.svg"),
  "utf8",
)
  .replace(
    "<svg ",
    '<svg class="footer-logo-svg" aria-hidden="true" focusable="false" ',
  )
  .replaceAll("fill:#171512", "fill:currentColor")
  .replaceAll("stroke:#171512", "stroke:currentColor")
  .replace(/<text\s/g, '<text class="footer-logo-fill" ')
  .replace(/<path\s(?=[^>]*fill:currentColor)/g, '<path class="footer-logo-fill" ')
  .replace(/<path\s(?=[^>]*stroke:currentColor)/g, '<path class="footer-logo-draw" pathLength="1" ')
  .replace(/<path\s(?=[^>]*#fdba12)/g, '<path class="footer-logo-dot" ');

function FooterLogo() {
  return (
    <span
      className="footer-logo"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: footerLogoSvg }}
    />
  );
}

export function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-chalk/80">
      <div className="page-shell grid gap-8 py-8 sm:py-10 md:grid-cols-[1fr_1.2fr] md:gap-12 md:py-12">
        <div>
          <Link href="/" className="footer-logo-link" aria-label="Kofi Baiden Brushworks home">
            <FooterLogo />
          </Link>
          <p className="mt-4 max-w-sm text-xs leading-6 text-graphite sm:mt-5 sm:text-sm sm:leading-7">
            Ghana-based contemporary artist practice composed through pigment, layered surfaces,
            drawing, and a quiet attention to memory, land, and interior light.
          </p>
          <SocialLinks className="mt-4 sm:mt-6" />
        </div>
        <div className="grid gap-5 text-xs sm:grid-cols-3 sm:gap-8 sm:text-sm">
          <div>
            <h2 className="eyebrow">Studio</h2>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-graphite sm:mt-5 sm:grid sm:gap-3">
              <Link href="/works" className="inline-flex min-h-11 items-center hover:text-ink">Works</Link>
              <Link href="/gallery" className="inline-flex min-h-11 items-center hover:text-ink">Gallery</Link>
              <Link href="/about" className="inline-flex min-h-11 items-center hover:text-ink">Biography</Link>
              <Link href="/contact" className="inline-flex min-h-11 items-center hover:text-ink">Inquiries</Link>
            </div>
          </div>
          <div>
            <h2 className="eyebrow">Contact</h2>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-graphite sm:mt-5 sm:grid sm:gap-3">
              <a href={`mailto:${studioContact.email}`} className="inline-flex min-h-11 items-center break-all hover:text-ink">
                {studioContact.email}
              </a>
              <span className="inline-flex min-h-11 items-center">{studioContact.location}</span>
            </div>
          </div>
          <div>
            <h2 className="eyebrow">Focus</h2>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-graphite sm:mt-5 sm:grid sm:gap-3">
              <span className="inline-flex min-h-11 items-center">Commissions</span>
              <span className="inline-flex min-h-11 items-center">Exhibitions</span>
              <span className="inline-flex min-h-11 items-center">Acquisitions</span>
            </div>
          </div>
        </div>
      </div>
      <div className="page-shell border-t border-ink/10 py-4 text-[0.7rem] text-umber sm:py-5 sm:text-xs">
        &copy; 2026 Kofi Baiden Brushworks. All rights reserved.
      </div>
    </footer>
  );
}
