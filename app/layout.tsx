// app/layout.tsx (or your RootLayout file)
import type React from "react";
import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { cookies } from "next/headers";
import { Geist, Geist_Mono, Cairo, IBM_Plex_Sans_Arabic } from "next/font/google";
import StructuredData from "@/components/StructuredData";

export const dynamic = "force-dynamic";


export const metadata: Metadata = {
  title: {
    default: "That El-Himma - Tech Solutions & Business Development",
    template: "%s | That El-Himma"
  },
  description: "That elhimma unifies strategy, data, and execution to accelerate business growth. Expert tech solutions, digital transformation, and business development services.",
  keywords: [
    "tech solutions",
    "business development",
    "digital transformation",
    "software development",
    "consulting",
    "strategy",
    "technology consulting",
    "business growth",
    "digital innovation",
    "tech consulting"
  ],
  authors: [{ name: "That El-Himma Team" }],
  creator: "That El-Himma",
  publisher: "That El-Himma",
  formatDetection: { email: false, address: false, telephone: false },
  metadataBase: new URL('https://thatelhimma.com'),
  alternates: {
    canonical: '/',
    languages: { en: '/en', ar: '/ar' }
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://thatelhimma.com',
    siteName: 'That El-Himma',
    title: 'That El-Himma - Tech Solutions & Business Development',
    description: 'That El-Himma unifies strategy, data, and execution to accelerate business growth. Expert tech solutions, digital transformation, and business development services.',
    images: [{
      url: '/images/layer1006.png',
      width: 1200,
      height: 630,
      alt: 'That El-Himma - Tech Solutions & Business Development',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'That El-Himma - Tech Solutions & Business Development',
    description: 'That El-Himma unifies strategy, data, and execution to accelerate business growth.',
    images: ['/images/layer1006.png'],
    creator: '@thatelhimma',
    site: '@thatelhimma',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // <-- Verification codes: replace the strings below with the codes given to you
  verification: {
    // Google Search Console meta: <meta name="google-site-verification" content="..." />
    google: 'PASTE_YOUR_GOOGLE_VERIFICATION_CODE_HERE',

    // Yandex.Webmaster meta: <meta name="yandex-verification" content="..." />
    yandex: 'PASTE_YOUR_YANDEX_VERIFICATION_CODE_HERE',

    // Yahoo Site Explorer meta: Next.js maps this to <meta name="y_key" content="..." />
    yahoo: 'PASTE_YOUR_YAHOO_VERIFICATION_CODE_HERE',
  },

  category: 'technology',
  classification: 'business',
  generator: "Next.js",
  applicationName: "Thatelhimma",
  referrer: 'origin-when-cross-origin',
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
  viewport: { width: 'device-width', initialScale: 1, maximumScale: 1 },
  other: {
    'msapplication-TileColor': '#000000',
    'msapplication-config': '/browserconfig.xml',
  },
};


const geistSans = Geist({
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

const IBM = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "600", "700"],
  display: "swap",
  variable: "--font-ar",
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const lang = cookieStore.get("lang")?.value === "ar" ? "ar" : "en";
  const dir = lang === "ar" ? "rtl" : "ltr";

  // choose class based on language
  const baseClass = lang === "ar" ? IBM.className : geistSans.className;

  return (
    <html lang={lang} dir={dir} className={`${baseClass} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <StructuredData type="organization" data={{}} />
        <StructuredData type="website" data={{}} />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
