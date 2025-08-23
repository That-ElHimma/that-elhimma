// app/layout.tsx (or your RootLayout file)
import type React from "react";
import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { cookies } from "next/headers";
import { Geist, Geist_Mono, Cairo, IBM_Plex_Sans_Arabic } from "next/font/google";

export const metadata: Metadata = {
  title: "StreamLine",
  description: "Tech solutions and business development",
  generator: "v0.dev",
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
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
