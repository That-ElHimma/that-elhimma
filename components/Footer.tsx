// components/Footer.tsx
"use client";

import React from "react";
import Image from "next/image";
import { Twitter, Linkedin, Github } from "lucide-react";
import type { Locale, SiteContent } from "@/lib/types";

type Props = {
  locale: Locale;
  data: SiteContent;
};

export default function Footer({ locale, data }: Props) {
  const isArabic = locale === "ar";
  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Image
              src={data.siteSettings.logoPath || "/images/path55-9.png"}
              alt="logo"
              width={28}
              height={28}
            />
            <span className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} {data.siteSettings.companyName}.{" "}
              {isArabic ? "كل الحقوق محفوظة." : "All rights reserved."}
            </span>
          </div>

          <nav className="flex items-center gap-6">
            {data.footerLinks.map((f) => (
              <a
                key={f.label}
                href={f.href}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                {f.label}
              </a>
            ))}

            <div className="flex items-center gap-3">
              <a
                href={data.socialLinks.twitter || "#"}
                aria-label="Twitter"
                className="text-muted-foreground hover:text-foreground"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href={data.socialLinks.linkedin || "#"}
                aria-label="LinkedIn"
                className="text-muted-foreground hover:text-foreground"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={data.socialLinks.github || "#"}
                aria-label="GitHub"
                className="text-muted-foreground hover:text-foreground"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </nav>
        </div>
      </div>
    </footer>
  );
}
