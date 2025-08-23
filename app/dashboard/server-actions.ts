"use server"

import type { SiteContent, Locale } from "@/lib/types"
import { saveContent } from "@/lib/data"

export async function saveAll(payload: SiteContent, locale: Locale = "en") {
  await saveContent(payload, locale)
}
