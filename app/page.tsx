// app/page.tsx (server component)
import React from "react";
import { cookies } from "next/headers";
import type { Locale } from "@/lib/types";
import { getContent } from "@/lib/data";

import Header from "@/components/Header";
import ClientHomePage from "@/components/ClientHomePage";
import Footer from "@/components/Footer";

export default async function Page() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("lang")?.value as Locale | undefined) ?? "en";
  const initialTheme =
    (cookieStore.get("theme")?.value as
      | "light"
      | "dark"
      | "system"
      | undefined) ?? "system";

  const data = await getContent(locale);

  return (
    <div>
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
