// components/language-theme-controls.tsx
"use client";

import { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Laptop2 } from "lucide-react";

type ThemeName = "light" | "dark" | "system";
type Props = { currentLocale?: "en" | "ar"; initialTheme?: ThemeName };

export function LanguageThemeControls({
  currentLocale = "en",
  initialTheme = "system",
}: Props) {
  // locale seeded from server prop (keeps SSR/CSR deterministic)
  const [locale, setLocale] = useState<"en" | "ar">(currentLocale);

  // uiTheme determines button variants, seeded from server
  const [uiTheme, setUiTheme] = useState<ThemeName>(initialTheme);

  const { theme: activeTheme, setTheme } = useTheme();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // sync next-themes with our deterministic uiTheme on mount (avoid instant flip)
  useEffect(() => {
    if (uiTheme && activeTheme !== uiTheme) {
      setTheme(uiTheme);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once on mount

  // toggle language EN <-> AR
  async function toggleLocale() {
    const next = locale === "en" ? "ar" : "en";

    // optimistic UI
    setLocale(next);

    startTransition(async () => {
      await fetch("/api/lang", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ locale: next }),
      });
      // refresh server data (e.g. translations, nav)
      router.refresh();
    });
  }

  function changeTheme(next: ThemeName) {
    setUiTheme(next);
    setTheme(next);
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        {/* SINGLE LANGUAGE TOGGLE BUTTON */}
        <Button
          className="cursor-pointer"
          size="icon"
          variant="ghost"
          aria-pressed={locale === "ar"}
          aria-label={
            locale === "en"
              ? "Switch language to Arabic"
              : "Switch language to English"
          }
          title={locale === "en" ? "العربية" : "English"}
          onClick={toggleLocale}
          disabled={isPending}
        >
          {/* simple, compact label — replace with flag/icon if you prefer */}
          <span className="text-xs font-medium select-none">
            {locale.toUpperCase()}
          </span>
        </Button>
      </div>
      <div className="hidden md:flex items-center -pl-2 mr-2 border-r">
        <span className="sr-only">Theme and language</span>
        <div className="h-2.5 w-2.5 rounded-full animate-pulse bg-[color:var(--brand-primary-light)] dark:bg-[color:var(--brand-primary-dark)]" />
      </div>
      <Button
        className="cursor-pointer"
        variant={uiTheme === "light" ? "default" : "outline"}
        size="icon"
        onClick={() => changeTheme("light")}
        aria-label="Light theme"
        title="Light"
      >
        <Sun className="h-4 w-4" />
      </Button>

      <Button
        className="cursor-pointer"
        variant={uiTheme === "dark" ? "default" : "outline"}
        size="icon"
        onClick={() => changeTheme("dark")}
        aria-label="Dark theme"
        title="Dark"
      >
        <Moon className="h-4 w-4" />
      </Button>
    </div>
  );
}
