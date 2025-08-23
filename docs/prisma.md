# Prisma ORM: Connection, Migrations, and Best Practices

This project uses Prisma to manage the PostgreSQL schema and database access for critical paths like authentication. Other data paths can be migrated to Prisma incrementally.

## Environments

- Development
  - Use `prisma migrate dev` for iterative schema changes.
  - Prisma Client logs `error,warn` by default; customize via `PRISMA_LOG_LEVEL=error,warn,query`.
- Production
  - Use `prisma migrate deploy` during build or release.
  - Keep `PRISMA_LOG_LEVEL=error` to reduce noise.

Both environments share `DATABASE_URL`.

## Setup

1. Install and generate the Prisma Client
   - npm i
   - npm run prisma:generate

2. Create and apply migrations
   - Development:
     - npm run prisma:migrate:dev
   - Production:
     - npm run prisma:migrate:deploy

3. Optional: Seed
   - npm run db:seed

4. Health check
   - npm run dev
   - npm run db:health  # Calls /api/health/db

## Connection & Error Handling

- Singleton Client
  - `lib/prisma.ts` uses a process-wide singleton to avoid exhausting connections in hot-reload environments.
- Health Checks
  - `prismaHealthCheck()` runs a `SELECT 1` with small retry/backoff to detect transient issues and recover.
- Timeouts/Backoff
  - Keep long-lived pooling on the server. If using serverless Postgres, prefer a pooled connection string.

## Migrations Strategy

- All schema is defined in `prisma/schema.prisma`. Models map 1:1 to existing tables via `@@map` and `@map` so Prisma can adopt the current structure without destructive changes.
- For new changes:
  1. Update `schema.prisma`.
  2. Run `prisma migrate dev --name <change>`.
  3. Commit the generated migration directory.
  4. In production, run `prisma migrate deploy`.

## Best Practices

- Do not run `migrate dev` in CI/CD or production; only use `migrate deploy`.
- Keep `DATABASE_URL` secret and rotate periodically.
- Use HTTP-only, same-site cookies for sessions (already implemented).
- Monitor DB connections and slow queries; consider enabling query logs only when debugging.
- Consider using `prisma.$transaction` for multi-step operations to ensure atomicity.

## Troubleshooting

- Prisma Client not found:
  - Run `npm run prisma:generate`.
- Schema drift:
  - Ensure all schema changes run through migrations. Avoid ad-hoc SQL in production for schema changes.
- Connection issues:
  - Verify `DATABASE_URL` and reachability.
  - Use `/api/health/db` to test connectivity from the running app.
  - Logs are controlled via `PRISMA_LOG_LEVEL`.

References:
- Next.js error handling guidance for routes and components helps structure recovery and error UI where needed [^1][^3].
