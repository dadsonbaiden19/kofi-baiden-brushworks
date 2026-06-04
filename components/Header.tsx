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
        <Link href="/" className="inline-flex min-h-11 items-center rounded-xl font-heading text-2xl leading-none tracking-[0.06em]">
          Kofi Baiden
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
