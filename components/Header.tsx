"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { siteConfig } from "@/data/site";
import { CloseIcon, InstagramIcon, MenuIcon } from "./Icons";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/works", label: "Works" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

function KbLogoMark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1362 965"
      role="presentation"
      aria-hidden="true"
      focusable="false"
      fillRule="evenodd"
      clipRule="evenodd"
    >
      <path
        className="site-brand-draw site-brand-draw-k"
        d="M87.317,862.609l71.975,0l0,-251.846l281.717,251.846l101.304,0l-325.438,-292.533l307.446,-266.829l-105.692,0l-259.337,225.75l0,-441.679l-71.975,0l0,775.292Z"
        fill="none"
        stroke="currentColor"
        strokeWidth={18}
        strokeLinecap="square"
        strokeLinejoin="round"
        strokeMiterlimit={11.339}
        pathLength={1}
      />
      <path
        className="site-brand-draw site-brand-draw-b"
        d="M590.821,862.609l0,-102.825c28.417,39.075 61.117,68.379 98.1,87.917c36.975,19.533 78.233,29.304 123.775,29.304c79.429,0 147.396,-28.613 203.896,-85.858c56.496,-57.237 84.746,-126.296 84.746,-207.192c0,-81.913 -27.992,-151.575 -83.975,-208.988c-55.983,-57.408 -123.517,-86.112 -202.612,-86.112c-44.517,0 -85.433,9.171 -122.754,27.5c-37.321,18.342 -71.054,46.017 -101.175,83.033l0,-312.071l-71.975,-0l0,775.292l71.975,0Zm58.712,-120.304c-42.575,-43.521 -63.854,-97.679 -63.854,-162.458c0,-42.5 9.487,-80.717 28.471,-114.65c18.971,-33.933 46.158,-60.925 81.55,-80.975c35.392,-20.05 72.75,-30.075 112.075,-30.075c38.642,0 74.971,10.025 109,30.075c34.025,20.05 61.117,48.071 81.3,84.058c20.171,35.988 30.258,73.867 30.258,113.621c0,39.762 -10.004,77.462 -30.008,113.104c-20.004,35.654 -46.933,63.329 -80.783,83.029c-33.85,19.717 -70.788,29.567 -110.792,29.567c-62.242,0 -114.637,-21.767 -157.217,-65.296Z"
        fill="none"
        stroke="currentColor"
        strokeWidth={18}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={11.339}
        pathLength={1}
      />
      <path
        className="site-brand-letter site-brand-letter-k"
        d="M87.317,862.609l71.975,0l0,-251.846l281.717,251.846l101.304,0l-325.438,-292.533l307.446,-266.829l-105.692,0l-259.337,225.75l0,-441.679l-71.975,0l0,775.292Z"
        fill="currentColor"
      />
      <path
        className="site-brand-letter site-brand-letter-b"
        d="M590.821,862.609l0,-102.825c28.417,39.075 61.117,68.379 98.1,87.917c36.975,19.533 78.233,29.304 123.775,29.304c79.429,0 147.396,-28.613 203.896,-85.858c56.496,-57.237 84.746,-126.296 84.746,-207.192c0,-81.913 -27.992,-151.575 -83.975,-208.988c-55.983,-57.408 -123.517,-86.112 -202.612,-86.112c-44.517,0 -85.433,9.171 -122.754,27.5c-37.321,18.342 -71.054,46.017 -101.175,83.033l0,-312.071l-71.975,-0l0,775.292l71.975,0Zm58.712,-120.304c-42.575,-43.521 -63.854,-97.679 -63.854,-162.458c0,-42.5 9.487,-80.717 28.471,-114.65c18.971,-33.933 46.158,-60.925 81.55,-80.975c35.392,-20.05 72.75,-30.075 112.075,-30.075c38.642,0 74.971,10.025 109,30.075c34.025,20.05 61.117,48.071 81.3,84.058c20.171,35.988 30.258,73.867 30.258,113.621c0,39.762 -10.004,77.462 -30.008,113.104c-20.004,35.654 -46.933,63.329 -80.783,83.029c-33.85,19.717 -70.788,29.567 -110.792,29.567c-62.242,0 -114.637,-21.767 -157.217,-65.296Z"
        fill="currentColor"
      />
      <path
        className="site-brand-dot-halo"
        d="M1253.257,690.221c-61.092,-0.471 -115.087,60.625 -103.833,121.438c7.517,56.546 65.438,100.408 121.967,90.471c57.562,-8.108 100.996,-68.879 88.392,-125.979c-8.792,-50.417 -55.675,-87.288 -106.525,-85.929Z"
        fill="#fdba12"
      />
      <path
        className="site-brand-dot"
        d="M1253.257,690.221c-61.092,-0.471 -115.087,60.625 -103.833,121.438c7.517,56.546 65.438,100.408 121.967,90.471c57.562,-8.108 100.996,-68.879 88.392,-125.979c-8.792,-50.417 -55.675,-87.288 -106.525,-85.929Z"
        fill="#fdba12"
      />
    </svg>
  );
}

export function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  function renderNavLink(item: { href: string; label: string }) {
    const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

    return (
      <Link
        key={item.href}
        href={item.href}
        aria-current={isActive ? "page" : undefined}
        className={`header-nav-link ${isActive ? "is-active" : ""}`}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <header className="reveal sticky top-0 z-40 border-b border-ink/10 bg-bone/78 shadow-[0_1px_0_rgb(var(--color-ink)/0.04)] backdrop-blur-xl">
      <nav className="page-shell flex min-h-20 items-center justify-between gap-3 py-3 sm:gap-8 md:py-0">
        <Link href="/" className="site-brand" aria-label="Kofi Baiden Brushworks home">
          <span className="site-brand-mark" aria-hidden="true">
            <KbLogoMark className="site-brand-logo" />
          </span>
        </Link>
        <div className="flex items-center justify-end gap-2 sm:gap-3">
          <div className="hidden items-center gap-1 rounded-full border border-ink/10 bg-chalk/45 p-1 text-sm text-graphite shadow-soft backdrop-blur-sm md:flex">
            {navItems.map(renderNavLink)}
          </div>
          {siteConfig.instagramUrl ? (
            <a
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="icon-button header-icon-link"
              aria-label="Visit Kofi Baiden Brushworks on Instagram"
            >
              <InstagramIcon />
            </a>
          ) : null}
          <ThemeToggle />
          <button
            type="button"
            className="icon-button md:hidden"
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((current) => !current)}
          >
            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>
      <div className={`mobile-nav-panel md:hidden ${isMenuOpen ? "is-open" : ""}`}>
        <div className="page-shell pb-4">
          <div className="grid gap-2 rounded-soft border border-ink/10 bg-chalk/90 p-2 text-sm text-graphite shadow-soft backdrop-blur-xl">
            {navItems.map(renderNavLink)}
          </div>
        </div>
      </div>
    </header>
  );
}
