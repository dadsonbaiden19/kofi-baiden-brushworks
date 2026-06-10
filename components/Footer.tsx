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
      <div className="page-shell grid gap-12 py-12 md:grid-cols-[1fr_1.2fr]">
        <div>
          <Link href="/" className="footer-logo-link" aria-label="Kofi Baiden Brushworks home">
            <FooterLogo />
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-7 text-graphite">
            Ghana-based contemporary artist practice composed through pigment, layered surfaces,
            drawing, and a quiet attention to memory, land, and interior light.
          </p>
          <SocialLinks className="mt-6" />
        </div>
        <div className="grid gap-8 text-sm sm:grid-cols-3">
          <div>
            <h2 className="eyebrow">Studio</h2>
            <div className="mt-5 grid gap-3 text-graphite">
              <Link href="/works" className="inline-flex min-h-11 items-center hover:text-ink">Works</Link>
              <Link href="/gallery" className="inline-flex min-h-11 items-center hover:text-ink">Gallery</Link>
              <Link href="/about" className="inline-flex min-h-11 items-center hover:text-ink">Biography</Link>
              <Link href="/contact" className="inline-flex min-h-11 items-center hover:text-ink">Inquiries</Link>
            </div>
          </div>
          <div>
            <h2 className="eyebrow">Contact</h2>
            <div className="mt-5 grid gap-3 text-graphite">
              <a href={`mailto:${studioContact.email}`} className="inline-flex min-h-11 items-center break-all hover:text-ink">
                {studioContact.email}
              </a>
              <span>{studioContact.location}</span>
            </div>
          </div>
          <div>
            <h2 className="eyebrow">Focus</h2>
            <div className="mt-5 grid gap-3 text-graphite">
              <span>Commissions</span>
              <span>Exhibitions</span>
              <span>Acquisitions</span>
            </div>
          </div>
        </div>
      </div>
      <div className="page-shell border-t border-ink/10 py-5 text-xs text-umber">
        &copy; 2026 Kofi Baiden Brushworks. All rights reserved.
      </div>
    </footer>
  );
}
