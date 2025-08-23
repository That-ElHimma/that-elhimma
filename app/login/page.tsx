import Link from "next/link"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default async function LoginPage({ searchParams }: { searchParams: { error?: string } }) {
  // If already authenticated, go to dashboard
  const cookieStore = await cookies()
  const hasSession = Boolean(cookieStore.get("session")?.value)
  if (hasSession) redirect("/dashboard")
  const params = await searchParams
  const error = params?.error

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Sign in</CardTitle>
        </CardHeader>
        <CardContent>
          <form action="/api/auth/login" method="post" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" autoComplete="email" required placeholder="you@company.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" autoComplete="current-password" required />
            </div>
            {error ? <div className="text-sm text-destructive">{error}</div> : null}
            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </form>
          <p className="text-xs text-muted-foreground mt-4">
            First run default admin is created automatically: admin@streamline.dev / changeme123. Change it after
            signing in.
          </p>
          <div className="mt-4 text-xs">
            <Link href="/" className="text-muted-foreground hover:underline">
              Back to site
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
