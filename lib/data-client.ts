// lib/data-client.ts
"use client";

import type { SiteContent, Locale } from "./types";

// Client-side fetcher used by the Dashboard to load initial content.
// Falls back gracefully if the API route is unavailable.
export async function getContentClient(
  locale: Locale = "en"
): Promise<SiteContent> {
  const qs = `?locale=${locale}`;
  try {
    const res = await fetch(`/api/content${qs}`, { cache: "no-store" });
    if (res.ok) {
      return (await res.json()) as SiteContent;
    }
  } catch {}
  // Hydration fallback: if API is not available, load server-rendered payload via a tiny endpoint
  const fallbackRes = await fetch(`/api/content${qs}&fallback=1`, {
    cache: "no-store",
  });
  try {
    return (await fallbackRes.json()) as SiteContent;
  } catch {
    // Extreme fallback (shouldn't happen): minimal object
    return {
      siteSettings: {
        companyName: "StreamLine",
        logoPath: "/images/path55-9.png",
        brandPrimaryLight: "#15803d",
        brandAccentLight: "#5c4426",
        brandPrimaryDark: "#15803d",
        brandAccentDark: "#5c4426",
        heroTitle: "Tech solutions that accelerate business growth.",
        heroSubtitle: "StreamLine unifies strategy, data, and execution.",
        heroCtaLabel: "Start Free",
        heroCtaHref: "#get-started",
        finalCtaTitle: "Ready to streamline your growth?",
        finalCtaSubtitle:
          "Join teams shipping faster with predictable outcomes.",
        finalCtaLabel: "Get Started",
        finalCtaHref: "#get-started",
        contactTitle: "Contact Us", // Added
        contactSubtitle: "We’d love to hear from you.", // Added
        feedbackTitle: "Your Feedback", // Added
        feedbackSubtitle: "Tell us how we can improve.", // Added
      },
      navLinks: [
        { label: "Features", href: "#features" },
        { label: "Testimonials", href: "#testimonials" },
        { label: "Pricing", href: "#pricing" },
        { label: "Dashboard", href: "/dashboard" },
      ],
      features: [],
      testimonials: [],
      footerLinks: [],
      socialLinks: {},
    };
  }
}
