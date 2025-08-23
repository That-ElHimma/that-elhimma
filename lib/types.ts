// lib/types.ts
export type Locale = "en" | "ar";

export type NavLink = { label: string; href: string; order?: number };
export type Feature = {
  id?: number | string;
  title: string;
  description: string;
  icon?: string;
  order?: number;
};
export type Testimonial = {
  id?: number | string;
  author: string;
  role: string;
  quote: string;
  avatarUrl?: string;
};

export type PreviousWork = {
  id?: number | string;
  name: string;
  description: string;
  imageUrl?: string;
};

export type Feedback = {
  id?: number;
  name?: string;
  rating: number;
  comment: string;
  createdAt?: string;
  locale?: Locale;
};
export type SocialLinks = {
  twitter?: string;
  linkedin?: string;
  github?: string;
};

export type SiteSettings = {
  companyName: string;
  logoPath?: string;
  // Light theme brand
  brandPrimaryLight: string;
  brandAccentLight: string;
  // Dark theme brand
  brandPrimaryDark: string;
  brandAccentDark: string;
  // Hero and CTAs
  heroTitle: string;
  heroSubtitle: string;
  heroCtaLabel: string;
  heroCtaHref: string;
  finalCtaTitle: string;
  finalCtaSubtitle: string;
  finalCtaLabel: string;
  finalCtaHref: string;
  // Contact and Feedback section titles
  contactTitle: string;
  contactSubtitle: string;
  feedbackTitle: string;
  feedbackSubtitle: string;
};

export type SiteContent = {
  siteSettings: SiteSettings;
  navLinks: NavLink[];
  features: Feature[];
  previousWorks: PreviousWork[];
  footerLinks: { label: string; href: string }[];
  socialLinks: SocialLinks;
};
