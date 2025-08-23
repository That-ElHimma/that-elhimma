import { PrismaClient } from "@prisma/client"

declare global {
  // eslint-disable-next-line no-var
  var prismaInstance: PrismaClient | undefined
}

const logLevels = (process.env.PRISMA_LOG_LEVEL || "").split(",").filter(Boolean) as any[]

export const prisma =
  global.prismaInstance ??
  new PrismaClient({
    log: logLevels.length ? (logLevels as any) : process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  })

if (process.env.NODE_ENV !== "production") {
  global.prismaInstance = prisma
}

// Lightweight health check to validate connectivity
export async function prismaHealthCheck(retries = 2, delayMs = 300): Promise<boolean> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      await prisma.$queryRaw`SELECT 1`
      return true
    } catch (err) {
      if (attempt === retries) {
        console.error("Prisma health check failed:", err)
        return false
      }
      await new Promise((r) => setTimeout(r, delayMs * (attempt + 1)))
    }
  }
  return false
}
