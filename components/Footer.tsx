"use client"
// components/Footer.tsx
import React, { useState } from "react";
import Image from "next/image";
import { Locale } from "@/lib/types";
import { PhoneIcon, EnvelopeIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/24/solid";
import { Instagram, Twitter, Facebook, Linkedin, Send } from "lucide-react";

type Social = { name: string; href: string; Icon: React.ComponentType<any> };

type FooterProps = {
  locale?: Locale;
  logoSrc?: string;
  phone?: string;
  email?: string;
  address?: string;
  socials?: Social[];
  data?: any;
};

export default function Footer({
  locale = "en",
  logoSrc = "/images/path55-9.png",
  phone = "+964 771 545 4111",
  email = "info@thatelhimma.com",
  address = "Baghdad, Al-Karada",
  socials = [
    { name: "facebook", href: "https://www.facebook.com/", Icon: Facebook },
    { name: "instagram", href: "https://www.instagram.com//", Icon: Instagram },
    { name: "linkedin", href: "https://www.linkedin.com/company/", Icon: Linkedin },
  ],
}: FooterProps) {
  const isArabic = locale === "ar";
  const dir = isArabic ? "rtl" : "ltr";
  const textAlign = isArabic ? "text-right" : "text-left";
  const rowDirection = isArabic ? "lg:flex-row-reverse" : "lg:flex-row";

  const t = {
    en: {
      aboutTitle: "About",
      aboutText:
        "We build scalable web & mobile systems, cloud solutions, and data-driven services with reliable infrastructure.",
      servicesTitle: "Services",
      companyTitle: "Company",
      infoTitle: "Information",
      contactUs: "Contact us anytime",
      copyright: "© Copyright",
      brandName: "That El-Himma",
      services: [
        "Web Development",
        "Mobile Apps",
        "Cloud Solutions",
        "Networking",
        "Data Analytics",
        "Software Engineering",
      ],
      companyLinks: ["Home", "Our Major", "Our Process", "Projects", "Contact Us"],
      infoLinks: ["Support Zone", "Support Policy", "Terms & Conditions", "Privacy Policy", "Careers"],
    },
    ar: {
      aboutTitle: "عن الشركة",
      aboutText:
        "نبني أنظمة ويب وتطبيقات موبايل قابلة للتوسع، حلول سحابية، وخدمات مدفوعة بالبيانات مع بنية تحتية موثوقة.",
      servicesTitle: "خدماتنا",
      companyTitle: "الشركة",
      infoTitle: "المعلومات",
      copyright: "جميع الحقوق محفوظة",
      brandName: "That El-Himma",
      services: ["تطوير الويب", "تطوير التطبيقات", "الحلول السحابية", "الشبكات", "تحليل البيانات", "تطوير البرمجيات"],
      companyLinks: ["الرئيسية", "مجالنا", "كيف نعمل", "اعمالنا", "اتصل بنا"],
      infoLinks: ["منطقة الدعم", "سياسة الدعم", "الشروط والأحكام", "سياسة الخصوصية", "الفرص الوظيفية"],
    },
  }[isArabic ? "ar" : "en"];

  // newsletter state (demo only)

  return (
    <footer dir={dir} className="bg-primary/5 text-muted-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16 lg:py-20">
        {/* top: brand + contact */}
        <div className={`flex flex-col gap-8 ${rowDirection} items-start lg:items-center`}>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-4">
              <div className="relative h-8 w-8">
                <Image src={logoSrc} alt={`${t.brandName} logo`} fill className="object-contain" />
              </div>
              <p className="text-lg font-bold">{t.brandName}</p>
            </div>

            <p className={`mt-4 max-w-prose ${textAlign} text-sm md:text-base`}>{t.aboutText}</p>

            <div className={`mt-6 flex items-start flex-col gap-6 ${isArabic ? "justify-end" : ""}`}>
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-brand/10 p-2">
                  <PhoneIcon className="h-5 w-5 text-brand" />
                </div>
                <div className={`text-sm ${isArabic ? "text-right" : "text-left"}`}>
                  <div className="text-xs text-muted-foreground/80">{t.contactUs}</div>
                  <a href={`tel:${phone}`} className="mt-1 block font-semibold text-primary">
                    {phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="rounded-full bg-brand/10 p-2">
                  <EnvelopeIcon className="h-5 w-5 text-brand" />
                </div>
                <div className={`text-sm ${isArabic ? "text-right" : "text-left"}`}>
                  <div className="text-xs text-muted-foreground/80">Email</div>
                  <a href={`mailto:${email}`} className="mt-1 block font-semibold text-primary break-words">
                    {email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="rounded-full bg-brand/10 p-2">
                  <MapPinIcon className="h-5 w-5 text-brand" />
                </div>
                <div className={`text-sm ${isArabic ? "text-right" : "text-left"}`}>
                  <div className="text-xs text-muted-foreground/80">{isArabic ? "العنوان" : "Address"}</div>
                  <div className="mt-1 block font-semibold text-primary">{address}</div>
                </div>
              </div>
            </div>

            {/* socials */}
            <div className={`mt-6 flex items-center gap-3 ${isArabic ? "justify-end" : ""}`}>
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.name}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-muted-foreground/5 hover:bg-muted-foreground/10 transition"
                >
                  <s.Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* columns area */}
          <div className="w-full lg:w-2/3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {/* Services */}
              <div className={`space-y-4 ${isArabic ? "text-right" : "text-left"}`}>
                <h4 className="font-semibold text-primary">{t.servicesTitle}</h4>
                <ul className="space-y-2">
                  {t.services.map((s) => (
                    <li key={s}>
                      <a href="#services" className="flex items-center gap-2 text-sm hover:text-primary transition">
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand/10">
                          <CheckIcon className="h-4 w-4 text-brand" />
                        </span>
                        <span>{s}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company */}
              <div className={`space-y-4 ${isArabic ? "text-right" : "text-left"}`}>
                <h4 className="font-semibold text-primary">{t.companyTitle}</h4>
                <ul className="space-y-2 text-sm">
                  {t.companyLinks.map((link) => (
                    <li key={link}>
                      <a href="#" className="hover:text-primary transition">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Info + Newsletter */}
              <div className={`space-y-4 ${isArabic ? "text-right" : "text-left"}`}>
                <h4 className="font-semibold text-primary">{t.infoTitle}</h4>
                <ul className="space-y-2 text-sm">
                  {t.infoLinks.map((link) => (
                    <li key={link}>
                      <a href="#" className="hover:text-primary transition">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>

                
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* bottom bar */}
      <div className="border-t border-muted-foreground/10 bg-primary/2">
        <div className="mx-auto max-w-7xl px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className={`${textAlign} text-sm`}>
            <span className="opacity-80">
              {t.copyright} {new Date().getFullYear()}{" "}
            </span>
            {" "}
            <a href="#" className="font-semibold text-primary ml-1">
              {t.brandName}
            </a>
            <span className="mx-2 text-muted-foreground/60">•</span>
            <a href="#" className="text-sm hover:text-primary transition">
              {isArabic ? "حقوق النشر" : "Legal"}
            </a>
          </div>

          <div className="flex items-center gap-4">
            <nav aria-label="footer-social">
              <ul className="flex items-center gap-3">
                {socials.map((s) => (
                  <li key={s.name}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-md px-2 py-1 text-sm hover:text-primary transition"
                    >
                      <s.Icon className="h-4 w-4" />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
