// app/page.tsx (server component)
import React from "react";
import { cookies } from "next/headers";
import type { Locale } from "@/lib/types";
import { getContent } from "@/lib/data";
import type { Metadata } from "next";

import Header from "@/components/Header";
import ClientHomePage from "@/components/ClientHomePage";
import Footer from "@/components/Footer";
import PerformanceMonitor from "@/components/PerformanceMonitor";

export async function generateMetadata({ params }: { params: {} }): Promise<Metadata> {
  return {
    title: "Home",
    description: "That El-Himma unifies strategy, data, and execution to accelerate business growth. Expert tech solutions, digital transformation, and business development services.",
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
    openGraph: {
      title: "That El-Himma - Tech Solutions & Business Development",
      description: "That El-Himma unifies strategy, data, and execution to accelerate business growth. Expert tech solutions, digital transformation, and business development services.",
      url: "https://thatelhimma.com",
      siteName: "That El-Himma",
      images: [
        {
          url: "/images/layer1006.png",
          width: 1200,
          height: 630,
          alt: "That El-Himma - Tech Solutions & Business Development",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "That El-Himma - Tech Solutions & Business Development",
      description: "That El-Himma unifies strategy, data, and execution to accelerate business growth.",
      images: ["/images/layer1006.png"],
    },
    alternates: {
      canonical: "/",
    },
  };
}

export default async function Page() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("lang")?.value as Locale | undefined) ?? "en";
  const initialTheme =
    (cookieStore.get("theme")?.value as
      | "light"
      | "dark"
      | undefined) ?? "light";

  const data = await getContent(locale);

  return (
    <div>
      {/* Performance monitoring */}
      <PerformanceMonitor pageName="home" />
      
      {/* Header is a client component; pass locale, data and initialTheme */}
      <Header locale={locale} data={data} initialTheme={initialTheme} />

      {/* Main content (client) */}
      <ClientHomePage
        locale={locale}
        data={data}
        
      />

      {/* Footer is a client component; pass locale + data */}
      <Footer locale={locale} data={data} />
    </div>
  );
}
