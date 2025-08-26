"use client";

/**
 * @author: @dorian_baffier
 * @description: Card Flip
 * @version: 1.0.0
 * @date: 2025-06-26
 * @license: MIT
 * @website: https://kokonutui.com
 * @github: https://github.com/kokonut-labs/kokonutui
 */

import { cn } from "@/lib/utils";
import { ArrowRight, Repeat2 } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Locale } from "@/lib/types";

export interface CardFlipProps {
  title?: string;
  subtitle?: string;
  description?: string;
  features?: string[];
  image?: string;
  locale?: Locale;
}

export default function CardFlip({
  title = "Design Systems",
  subtitle = "Explore the fundamentals",
  description = "Dive deep into the world of modern UI/UX design.",
  features = ["UI/UX", "Modern Design", "Tailwind CSS", "Kokonut UI"],
  image = "/abstract-design-pattern.png",
  locale,
}: CardFlipProps) {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const href = "#contact";
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  function handleNavClick(
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) {
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
  const isArabic = locale === "ar";
  return (
    <div
      className="relative w-full max-w-[340px] h-[350px] group [perspective:2000px] "
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={handleFlip}
    >
      <div
        className={cn(
          "relative w-full h-full flex ",
          "[transform-style:preserve-3d]",
          "transition-all duration-700",
          isFlipped
            ? "[transform:rotateY(180deg)]"
            : "[transform:rotateY(0deg)]"
        )}
      >
        <div
          className={cn(
            "absolute inset-0 w-full h-full",
            "[backface-visibility:hidden] [transform:rotateY(0deg)]",
            "overflow-hidden rounded-2xl",
            "bg-zinc-50 dark:bg-zinc-900",
            "border border-zinc-200 dark:border-zinc-800/50",
            "shadow-xs dark:shadow-lg",
            "transition-all duration-700",
            "group-hover:shadow-lg dark:group-hover:shadow-xl",
            "cursor-pointer",
            isFlipped ? "opacity-0" : "opacity-100"
          )}
        >
          <div className="relative h-full overflow-hidden">
            <Image
              src={image || "/placeholder.svg"}
              alt={title}
              fill
              loading="lazy"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
            <div className="flex items-center justify-between gap-3">
              <div className="space-y-1.5">
                <h3 className="text-lg font-semibold text-white leading-snug tracking-tighter transition-all duration-500 ease-out-expo group-hover:translate-y-[-4px]">
                  {title}
                </h3>
                <p className="text-sm text-white/90 line-clamp-2 tracking-tight transition-all duration-500 ease-out-expo group-hover:translate-y-[-4px] delay-[50ms]">
                  {subtitle}
                </p>
              </div>
              <button
                className="relative group/icon p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
                onClick={(e) => {
                  e.stopPropagation();
                  handleFlip();
                }}
                aria-label="Flip card"
              >
                <div
                  className={cn(
                    "absolute inset-[-8px] rounded-lg transition-opacity duration-300",
                    "bg-gradient-to-br from-white/20 via-white/10 to-transparent"
                  )}
                />
                <Repeat2 className="relative z-10 w-4 h-4 text-white transition-transform duration-300 group-hover/icon:scale-110 group-hover/icon:rotate-180" />
              </button>
            </div>
          </div>
        </div>

        {/* Back of card */}
        <a
          onClick={(e) => handleNavClick(e, String(href))}
          href={href}
          className={cn(
            "absolute inset-0 w-full h-full font-semibold",
            "[backface-visibility:hidden] [transform:rotateY(180deg)]",
            "p-6 rounded-2xl",
            "bg-gradient-to-b from-zinc-100 to-white dark:from-zinc-900 dark:to-black",
            "border border-zinc-200 dark:border-zinc-800",
            "shadow-xs dark:shadow-lg",
            "flex flex-col",
            "transition-all duration-700",
            "group-hover:shadow-lg dark:group-hover:shadow-xl",
            "cursor-pointer",
            !isFlipped ? "opacity-0" : "opacity-100"
          )}
        >
          <div className="flex-1 space-y-6">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white leading-snug tracking-tight transition-all duration-500 ease-out-expo group-hover:translate-y-[-2px]">
                {title}
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 tracking-tight transition-all duration-500 ease-out-expo group-hover:translate-y-[-2px] line-clamp-2">
                {description}
              </p>
            </div>

            <div className="space-y-1">
              {features.map((feature, index) => (
                <div
                  key={feature}
                  className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300 transition-all duration-500"
                  style={{
                    transform: isFlipped
                      ? "translateX(0)"
                      : "translateX(-10px)",
                    opacity: isFlipped ? 1 : 0,
                    transitionDelay: `${index * 100 + 200}ms`,
                  }}
                >
                  <ArrowRight className="w-3 h-3 text-[#399e5d]" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-zinc-200 dark:border-zinc-800">
            <div
              className={cn(
                "group/start relative",
                "flex items-center justify-between",
                "p-3 -m-3 rounded-xl",
                "transition-all duration-300",
                "bg-gradient-to-r from-zinc-100 via-zinc-100 to-zinc-100",
                "dark:from-zinc-800 dark:via-zinc-800 dark:to-zinc-800",
                "hover:from-[#399e5d]/10 hover:from-0% hover:via-[#399e5d]/5 hover:via-100% hover:to-transparent hover:to-100%",
                "dark:hover:from-[#399e5d]/20 dark:hover:from-0% dark:hover:via-[#399e5d]/10 dark:hover:via-100% dark:hover:to-transparent dark:hover:to-100%",
                "hover:scale-[1.02] hover:cursor-pointer"
              )}
            >
              <span className="text-sm font-medium text-zinc-900 dark:text-white transition-colors duration-300 group-hover/start:text-[#00832e] dark:group-hover/start:text-[#399e5d]">
                {isArabic ? "تفاصيل اكثر ؟" : "More Details?"}
              </span>
              <div className="relative group/icon">
                <div
                  className={cn(
                    "absolute inset-[-6px] rounded-lg transition-all duration-300",
                    "bg-gradient-to-br from-[#399e5d]/20 via-[#399e5d]/10 to-transparent",
                    "opacity-0 group-hover/start:opacity-100 scale-90 group-hover/start:scale-100"
                  )}
                />
                <ArrowRight className="relative z-10 w-4 h-4 text-[#399e5d] transition-all duration-300 group-hover/start:translate-x-0.5 group-hover/start:scale-110" />
              </div>
            </div>
          </div>
        </a>
      </div>

      <style jsx>{`
        @keyframes scale {
          0% {
            transform: scale(2);
            opacity: 0;
            box-shadow: 0px 0px 50px rgba(255, 165, 0, 0.5);
          }
          50% {
            transform: translate(0px, -5px) scale(1);
            opacity: 1;
            box-shadow: 0px 8px 20px rgba(255, 165, 0, 0.5);
          }
          100% {
            transform: translate(0px, 5px) scale(0.1);
            opacity: 0;
            box-shadow: 0px 10px 20px rgba(255, 165, 0, 0);
          }
        }
      `}</style>
    </div>
  );
}
