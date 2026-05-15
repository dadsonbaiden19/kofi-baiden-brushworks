"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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

  return (
    <header className="reveal sticky top-0 z-40 border-b border-ink/10 bg-bone/78 shadow-[0_1px_0_rgb(var(--color-ink)/0.04)] backdrop-blur-xl">
      <nav className="page-shell flex min-h-20 flex-wrap items-center justify-between gap-3 py-4 sm:flex-nowrap sm:gap-8 sm:py-0">
        <Link href="/" className="rounded-xl font-heading text-2xl leading-none tracking-[0.06em]">
          Kofi Baiden
        </Link>
        <div className="flex w-full items-center justify-between gap-2 sm:w-auto sm:justify-end sm:gap-4">
          <div className="flex max-w-full items-center gap-1 overflow-x-auto rounded-full border border-ink/10 bg-chalk/45 p-1 text-sm text-graphite shadow-soft backdrop-blur-sm sm:gap-2">
            {navItems.map((item) => {
              const isActive =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`shrink-0 rounded-full px-3 py-2 hover:bg-gallery/60 hover:text-ink sm:px-4 ${
                    isActive ? "bg-chalk text-ink shadow-soft" : ""
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
