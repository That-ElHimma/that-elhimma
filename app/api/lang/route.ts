import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { locale } = (await req.json()) as { locale?: string }
    const lang = locale === "ar" ? "ar" : "en"
    const res = NextResponse.json({ ok: true })
    res.cookies.set("lang", lang, { path: "/", maxAge: 60 * 60 * 24 * 365, sameSite: "lax" })
    return res
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 })
  }
}
