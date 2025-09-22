// components/ClientHomePage.tsx
"use client";
import React from "react";
import Image from "next/image";
import { Check, HeartHandshake, Quote, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { iconMap } from "@/lib/icons"; // adjust path if needed
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import SpotlightCard from "@/components/SpotlightCard/SpotlightCard";
import type {
  Locale,
  SiteContent,
  Feature,
  Testimonial,
  Feedback,
} from "@/lib/types";
import { Button } from "./ui/button";
import AnimatedLines from "./AnimatedLines";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import CompanyMap from "./CompanyMap";
import LogoLoop from "./LogoLoop/LogoLoop";
import { ContactSimpleForm } from "./marketing/contact/contact-simple-form";
import CardFlip from "./kokonutui/card-flip";
import HowWeWorkSection from "./HowWeWorkSection";

type Props = {
  locale: Locale;
  data: SiteContent;
};

export default function ClientHomePage({ locale, data }: Props) {
  const isArabic = locale === "ar";
  const dir = isArabic ? ("rtl" as const) : ("ltr" as const);

  const themeVars = {
    "--brand-primary-light": data.siteSettings.brandPrimaryLight,
    "--brand-accent-light": data.siteSettings.brandAccentLight,
    "--brand-primary-dark": data.siteSettings.brandPrimaryDark,
    "--brand-accent-dark": data.siteSettings.brandAccentDark,
    "--brand-accent": data.siteSettings.brandAccentLight || "#7c3aed",
  } as React.CSSProperties;
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.08,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.7 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1], // smooth ease-out
      },
    },
  };
  return (
    <div dir={dir} style={themeVars} className="text-foreground">
      <main>
        {/* HERO */}
        <section
          id="home"
          className="w-full min-h-screen flex items-center justify-center relative"
        >
          <AnimatedLines />

          <div className="max-w-[72rem] mx-auto md:py-16 lg:py-20 z-10 px-4">
            <div className="flex flex-col items-center gap-6">
              {/* logo + micro-branding */}
              <div className="flex flex-col items-center">
                <div className="w-80 aspect-[1.12] relative">
                  <Image
                    src="/hero.svg"
                    alt="hero section"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="w-full flex-col flex items-center lg:mx-0 text-center">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-4">
                  {data.siteSettings.heroTitle}
                </h1>

                <p className="text-lg text-muted-foreground max-w-prose mb-4">
                  {data.siteSettings.heroSubtitle}
                </p>

                <div className="mt-6 flex items-center flex-col gap-6 text-xs text-muted-foreground">
                  <div className="text-center">
                    {isArabic ? "موثوق به من قبل:" : "Trusted by:"}
                  </div>
                  <div className="flex items-center gap-3 opacity-80">
                    <Image
                      src="/trusted-1.png"
                      alt="Client logo"
                      width={80}
                      height={20}
                    />
                    <Image
                      src="/trusted-2.png"
                      alt="Client logo"
                      width={80}
                      height={20}
                    />
                    <Image
                      src="/trusted-3.svg"
                      alt="Client logo"
                      width={80}
                      height={20}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="py-12 min-h-screen flex items-center">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-2xl md:text-3xl font-bold">
                {isArabic ? "ماذا نقدم؟" : "What We Offer"}
              </h2>
              <p className="text-muted-foreground mt-3">
                {isArabic
                  ? "تجمع ذات الهمة..."
                  : "StreamLine aligns technology..."}
              </p>
            </div>

            {/* Grid container: equal-height rows via auto-rows-[1fr] */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[1fr] justify-items-center"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {data.features.map((f: Feature) => {
                const Icon =
                  typeof f.icon === "string"
                    ? (iconMap as Record<string, React.ComponentType<any>>)[
                        f.icon
                      ]
                    : undefined;

                return (
                  <motion.div
                    key={String(f.id)}
                    variants={itemVariants}
                    className="w-full max-w-[22rem] h-full"
                  >
                    {/* make SpotlightCard stretch to full height */}
                    <SpotlightCard
                      className="border-[1px] border-[#775a25] h-full w-full flex"
                      spotlightColor="rgba(119, 90, 37, 0.4)"
                    >
                      {/* Card is a column, content grows */}
                      <Card className="h-full w-full border-none p-0 !bg-transparent shadow-none flex flex-col">
                        <CardHeader className="px-4 pt-4 flex items-start gap-3">
                          {Icon ? (
                            <Icon
                              strokeWidth={2}
                              className="w-6 h-6 text-[#775a25]"
                            />
                          ) : f.icon ? (
                            <>{f.icon}</>
                          ) : (
                            <HeartHandshake
                              strokeWidth={2}
                              className="w-5 h-5 text-[#775a25]"
                            />
                          )}

                          <CardTitle className="mt-0 text-base">
                            {f.title}
                          </CardTitle>
                        </CardHeader>

                        {/* This content area grows to fill available space */}
                        <CardContent className="p-4 flex-1">
                          <p className="text-sm text-muted-foreground">
                            {f.description}
                          </p>
                        </CardContent>
                      </Card>
                    </SpotlightCard>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        <section id="howwework" className="bg-muted/10 w-full">
          <HowWeWorkSection locale={locale} />
        </section>

        <section
          id="previous-work"
          className="bg-muted/5 py-18 mt-4 overflow-hidden"
        >
          <div className="max-w-6xl mx-auto px-4">
            {/* Section Header */}
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                {isArabic ? "أعمالنا السابقة" : "Our Previous Work"}
              </h2>
              <p className="text-muted-foreground mt-4 text-center">
                {isArabic ? "مشاريع نفخر بها" : "Projects we are proud of."}
              </p>
            </div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {data.previousWorks.map((f) => (
                <motion.div
                  key={String(f.id)}
                  variants={itemVariants}
                  className="w-full"
                >
                  <div className="w-full h-full min-h-[340px] flex items-stretch">
                    <div className="w-full flex-1 flex items-center justify-center min-h-0">
                      <CardFlip
                        image={f.imageUrl}
                        title={f.name}
                        description={f.description}
                        subtitle={f.description}
                        features={f.features}
                        locale={locale}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="bg-muted/10 py-18">
          <div className="max-w-6xl mx-auto px-4">
            {/* Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold leading-tight text-foreground">
                {data.siteSettings.contactTitle}
              </h2>
              <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                {data.siteSettings.contactSubtitle}
              </p>
            </div>

            {/* Card container that holds image + form */}
            <div className="border border-border/10 rounded-xl overflow-hidden shadow-lg bg-muted/5 ring-1 ring-inset ring-border/6">
              <div className="flex flex-col md:flex-row items-stretch">
                {/* Image column - will stretch to match form height */}
                <div className="relative md:w-1/2 flex-1 min-h-[280px] md:min-h-[420px] overflow-hidden">
                  <Image
                    src="/contact.jpg"
                    alt="Contact Us"
                    fill
                    className="object-cover w-full h-full transition-transform duration-500 ease-out hover:scale-105"
                  />
                  {/* subtle overlay so the image plays nice with any theme */}
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/10 to-transparent dark:from-black/30" />
                </div>

                {/* Form column - will stretch to match image height */}
                <div className="flex-1 bg-card text-card-foreground px-4 py-2 md:px-6 md:py-4 min-h-0">
                  {/* If ContactSimpleForm sets its own margins/padding, fine — otherwise it's inside a padded card */}
                  <ContactSimpleForm locale={locale} />
                </div>
              </div>
            </div>
          </div>
        </section>
        <CompanyMap
          lat={33.302721}
          lng={44.423348}
          addressAr="ذات الهمة للوكالات التجارية و التطوير التكنولوجي العراق, بغداد, كرادة داخل"
          addressEn="That Al-Himma Trading Agencies & Technology Development — Karrada Dakhel, Baghdad, Iraq"
          locale={locale}
        />
      </main>
    </div>
  );
}
