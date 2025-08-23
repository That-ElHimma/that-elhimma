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
        <section id="home" className="w-full min-h-screen flex items-center justify-center relative">
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
                {isArabic ? "أنجز أكثر بجهد أقل" : "Do more with less"}
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
              viewport={{ once: false, amount: 0.15 }}
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

        {/* TESTIMONIALS */}
        <section
          id="previous-work"
          className="bg-muted/5 py-16 overflow-hidden"
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

            {/* Projects Grid */}
            <div className="flex w-full flex-wrap justify-center gap-6">
              {data.previousWorks.map((work, index) => (
                <motion.div
                  key={work.id}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.15 }} // <--- replay on each enter
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="relative rounded-xl overflow-hidden shadow-lg border border-border bg-background 
                 w-full sm:w-[330px] md:w-[400px] lg:w-[357px] 
                 hover:shadow-2xl hover:scale-[102%] transition-transform duration-300"
                >
                  {/* Image */}
                  <div className="relative w-full aspect-[16/9]">
                    <Image
                      src={work.imageUrl ?? "/placeholder.jpg"}
                      alt={work.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Text */}
                  <div className="px-4 py-3">
                    <h3 className="text-lg font-semibold leading-snug">
                      {work.name}
                    </h3>
                    <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                      {work.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>


        {/* CONTACT */}
        <section id="contact" className="bg-muted/10 py-16">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                {data.siteSettings.contactTitle}
              </h2>
              <p className="text-muted-foreground mt-4">
                {data.siteSettings.contactSubtitle}
              </p>
            </div>

            <Card className="shadow-xl rounded-2xl">
              <CardContent>
                <form
                  action="/api/contact"
                  method="post"
                  className="grid gap-4"
                >
                  <input
                    type="text"
                    name="website"
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                  <Input
                    name="name"
                    required
                    placeholder={isArabic ? "الاسم" : "Name"}
                  />
                  <Input
                    name="email"
                    type="email"
                    required
                    placeholder="name@company.com"
                    autoComplete="email"
                  />
                  <Textarea
                    name="message"
                    required
                    rows={5}
                    placeholder={isArabic ? "رسالتك" : "Your Message"}
                  />
                  <div className="text-right">
                    <Button
                      type="submit"
                      className="bg-brand-primary hover:bg-brand-primary-dark transition-colors"
                    >
                      {isArabic ? "إرسال" : "Send"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}
