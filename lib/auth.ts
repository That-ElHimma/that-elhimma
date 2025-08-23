import { createHmac, timingSafeEqual } from "node:crypto"
import bcrypt from "bcryptjs"

const ONE_WEEK = 60 * 60 * 24 * 7

function getSecret() {
  const secret = process.env.AUTH_SECRET || "dev-insecure-secret"
  return secret
}

function b64url(input: string | Uint8Array): string {
  const data = typeof input === "string" ? Buffer.from(input) : Buffer.from(input)
  return data.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "")
}

function b64urlToBuffer(input: string): Buffer {
  const pad = 4 - (input.length % 4 || 4)
  const base64 = input.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat(pad)
  return Buffer.from(base64, "base64")
}

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  try {
    return await bcrypt.compare(password, hash)
  } catch {
    return false
  }
}

// Stateless HMAC session (payload.signature)
export type SessionPayload = { uid: number; email: string; exp: number }

export function signSession(payload: Omit<SessionPayload, "exp">, ttlSeconds = ONE_WEEK): string {
  const exp = Math.floor(Date.now() / 1000) + ttlSeconds
  const body = JSON.stringify({ ...payload, exp })
  const payloadB64 = b64url(body)
  const hmac = createHmac("sha256", getSecret()).update(payloadB64).digest()
  const sigB64 = b64url(hmac)
  return `${payloadB64}.${sigB64}`
}

export function verifySession(token: string | undefined | null): SessionPayload | null {
  if (!token || !token.includes(".")) return null
  const [payloadB64, sigB64] = token.split(".")
  try {
    const expected = createHmac("sha256", getSecret()).update(payloadB64).digest()
    const given = b64urlToBuffer(sigB64)
    if (expected.length !== given.length || !timingSafeEqual(expected, given)) return null
    const payload = JSON.parse(
      Buffer.from(payloadB64.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString(),
    ) as SessionPayload
    if (!payload.exp || payload.exp < Math.floor(Date.now() / 1000)) return null
    return payload
  } catch {
    return null
  }
}
