// app/api/contact/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

export const runtime = "nodejs"; // keep Node (not edge) for SDKs

// ---- Basic in-memory rate limit (per IP). For serverless it’s "best effort".
const BUCKET = new Map<string, { count: number; resetAt: number }>();
const LIMIT = 5; // max 5 requests
const WINDOW_MS = 60_000; // per 60s

function rateLimit(ip: string) {
  const now = Date.now();
  const item = BUCKET.get(ip);
  if (!item || now > item.resetAt) {
    BUCKET.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (item.count >= LIMIT) return false;
  item.count += 1;
  return true;
}

// ---- Validation
const ContactSchema = z.object({
  firstName: z.string().trim().min(1),
  lastName: z.string().trim().min(1),
  email: z.string().trim().email(),
  phone: z.string().trim().optional(),
  message: z.string().trim().min(5),
  // honeypot
  website: z.string().optional(),
});

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown-ip";
    if (!rateLimit(ip)) {
      return NextResponse.json(
        { ok: false, error: "Too many requests, please try again shortly." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const parsed = ContactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Invalid input", issues: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { firstName, lastName, email, phone, message, website } = parsed.data;

    // Honeypot: if filled, silently "ok" but do nothing
    if (website && website.length > 0) {
      return NextResponse.json({ ok: true });
    }

    const TO = process.env.CONTACT_TO_EMAIL;
    const FROM = process.env.CONTACT_FROM_EMAIL;
    if (!TO || !FROM || !process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { ok: false, error: "Email service not configured." },
        { status: 500 }
      );
    }

    const html = `
      <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;line-height:1.5;">
        <h2>New contact message</h2>
        <h3>From the landing page</h3>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
        <p><strong>IP:</strong> ${ip}</p>
        <hr />
        <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
      </div>
    `;

    const { error } = await resend.emails.send({
      to: TO,
      from: FROM,
      replyTo: email,
      subject: `New contact from ${firstName} ${lastName}`,
      html,
    });

    if (error) {
      return NextResponse.json(
        { ok: false, error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: "Unexpected error" },
      { status: 500 }
    );
  }
}

// minimal HTML escaper
function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
