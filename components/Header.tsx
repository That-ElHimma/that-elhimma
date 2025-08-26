// components/Header.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LanguageThemeControls } from "@/components/language-theme-controls";
import type { Locale, SiteContent } from "@/lib/types";

type Props = {
  locale: Locale;
  data: SiteContent;
  initialTheme?: "light" | "dark" | "system";
};

export default function Header({
  locale,
  data,
  initialTheme = "system",
}: Props) {
  const isArabic = locale === "ar";
  // activeSection contains the id (without '#'), e.g. "features"
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Build list of section elements using navLinks (assumes href like "#features")
    const sectionIds = data.navLinks
      .map((l) => (typeof l.href === "string" ? l.href.replace("#", "") : null))
      .filter(Boolean) as string[];

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!sections.length) return;

    // IntersectionObserver to set the active section when a section is in the middle of viewport
    const opts: IntersectionObserverInit = {
      root: null,
      rootMargin: "-40% 0px -40% 0px", // focus on middle of viewport
      threshold: 0.1,
    };

    observerRef.current = new IntersectionObserver((entries) => {
      // pick the entry that isIntersecting and has the largest intersectionRatio
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0));

      if (visible.length > 0) {
        const id = visible[0].target.id;
        setActiveSection(id);
        // Update the hash without scrolling
        if (window.history && window.location.hash !== `#${id}`) {
          window.history.replaceState(null, "", `#${id}`);
        }
      }
    }, opts);

    sections.forEach((s) => observerRef.current?.observe(s));

    // On load, if there's a hash, mark that section active
    const hash = window.location.hash?.replace("#", "");
    if (hash && sectionIds.includes(hash)) setActiveSection(hash);

    return () => {
      observerRef.current?.disconnect();
      observerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.navLinks]);

  // click handler to perform smooth scrolling (prevents default jump)
  function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    if (!href.startsWith("#")) return; // allow external
    e.preventDefault();
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      // update active state immediately for snappy UI
      setActiveSection(id);
      if (window.history) window.history.pushState(null, "", `#${id}`);
    }
  }

  return (
    <header className="sticky top-0 z-30 bg-background border-b">
      <div className="max-w-[72rem] mx-auto px-4 py-2 md:py-6 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src={data.siteSettings.logoPath || "/images/path55-9.png"}
            alt="logo"
            width={45}
            height={45}
            priority
          />
          <span className="font-semibold text-lg capitalize">{data.siteSettings.companyName}</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-5" aria-label="Main navigation">
          {data.navLinks.map((l) => {
            const href = l.href ?? "";
            const id = typeof href === "string" ? href.replace("#", "") : "";
            const isActive = id && activeSection === id;

            return (
              <a
                key={l.label}
                href={href}
                onClick={(e) => handleNavClick(e, String(href))}
                aria-current={isActive ? "page" : undefined}
                className={
                  "relative text-[0.8rem] font-semibold transition-all px-3.5 py-1 rounded-full " +
                  (isActive
                    ? "font-medium text-foreground bg-[color:var(--brand-accent)]/12 ring-1 ring-[color:var(--brand-accent)]/20 shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/30")
                }
              >
                <span className="inline-flex items-center gap-2">
                  <span>{l.label}</span>
                </span>
                {/* subtle active underline/marker */}
                {isActive ? (
                  <span
                    aria-hidden
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-10 h-0.5 rounded-full bg-[color:var(--brand-accent)]/90"
                  />
                ) : null}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3 transition-opacity duration-300" aria-live="polite">
          

          {/* Language + Theme (client-only control) */}
          <LanguageThemeControls currentLocale={locale} initialTheme={initialTheme} />
        </div>
      </div>
    </header>
  );
}
