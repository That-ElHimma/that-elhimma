"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Save, Plus, Trash2, LogOut } from "lucide-react"
import type { SiteContent, Locale } from "@/lib/types"
import { getContentClient } from "@/lib/data-client"
import { saveAll } from "./server-actions"

export default function DashboardPage() {
  const [locale, setLocale] = useState<Locale>("en")
  const [data, setData] = useState<SiteContent | null>(null)
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const [contacts, setContacts] = useState<any[]>([])
  const [feedback, setFeedback] = useState<any[]>([])

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      const initial = await getContentClient(locale)
      setData(initial)
      setLoading(false)
      try {
        const [cRes, fRes] = await Promise.all([
          fetch("/api/contact?list=1", { cache: "no-store" }),
          fetch(`/api/feedback?locale=${locale}&limit=20`, { cache: "no-store" }),
        ])
        setContacts(cRes.ok ? await cRes.json() : [])
        setFeedback(fRes.ok ? await fRes.json() : [])
      } catch {
        setContacts([])
        setFeedback([])
      }
    }
    void load()
  }, [locale])

  if (loading || !data) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div>Loading content...</div>
      </div>
    )
  }

  const update = <K extends keyof SiteContent>(key: K, value: SiteContent[K]) => {
    setData((prev) => (prev ? { ...prev, [key]: value } : prev))
  }

  async function onSave() {
    if (!data) return
    setSaving(true)
    try {
      await saveAll(data, locale)
    } finally {
      setSaving(false)
    }
  }

  async function onLogout() {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      window.location.href = "/login"
    } catch {}
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold">StreamLine Dashboard</h1>
          <select
            aria-label="Editing locale"
            className="h-9 rounded-md border bg-background px-2 text-sm"
            value={locale}
            onChange={(e) => setLocale(e.target.value as Locale)}
          >
            <option value="en">English</option>
            <option value="ar">العربية</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={onSave} disabled={saving} className="gap-2">
            <Save className="w-4 h-4" />
            {saving ? "Saving..." : "Save Changes"}
          </Button>
          <Button variant="outline" onClick={onLogout} className="gap-2 bg-transparent">
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </div>

      <Tabs defaultValue="branding" className="w-full">
        <TabsList className="flex flex-wrap gap-2">
          <TabsTrigger value="branding">Branding</TabsTrigger>
          <TabsTrigger value="navigation">Navigation</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
          <TabsTrigger value="footer">Footer</TabsTrigger>
          <TabsTrigger value="inbox">Contact & Feedback</TabsTrigger>
        </TabsList>

        <TabsContent value="branding" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Brand, Theme & Hero</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  value={data.siteSettings.companyName}
                  onChange={(e) => update("siteSettings", { ...data.siteSettings, companyName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="logoPath">Logo Path</Label>
                <Input
                  id="logoPath"
                  placeholder="/images/path55-9.png"
                  value={data.siteSettings.logoPath || ""}
                  onChange={(e) => update("siteSettings", { ...data.siteSettings, logoPath: e.target.value })}
                />
              </div>

              <Separator className="md:col-span-2" />
              <div className="space-y-2">
                <Label>Brand Colors (Light)</Label>
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    type="text"
                    placeholder="#15803d"
                    value={data.siteSettings.brandPrimaryLight}
                    onChange={(e) =>
                      update("siteSettings", { ...data.siteSettings, brandPrimaryLight: e.target.value })
                    }
                  />
                  <Input
                    type="text"
                    placeholder="#5c4426"
                    value={data.siteSettings.brandAccentLight}
                    onChange={(e) => update("siteSettings", { ...data.siteSettings, brandAccentLight: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Brand Colors (Dark)</Label>
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    type="text"
                    placeholder="#22c55e"
                    value={data.siteSettings.brandPrimaryDark}
                    onChange={(e) => update("siteSettings", { ...data.siteSettings, brandPrimaryDark: e.target.value })}
                  />
                  <Input
                    type="text"
                    placeholder="#a07b4a"
                    value={data.siteSettings.brandAccentDark}
                    onChange={(e) => update("siteSettings", { ...data.siteSettings, brandAccentDark: e.target.value })}
                  />
                </div>
              </div>

              <Separator className="md:col-span-2" />
              <div className="space-y-2">
                <Label htmlFor="heroTitle">Hero Title</Label>
                <Input
                  id="heroTitle"
                  value={data.siteSettings.heroTitle}
                  onChange={(e) => update("siteSettings", { ...data.siteSettings, heroTitle: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="heroSubtitle">Hero Subtitle</Label>
                <Textarea
                  id="heroSubtitle"
                  value={data.siteSettings.heroSubtitle}
                  onChange={(e) => update("siteSettings", { ...data.siteSettings, heroSubtitle: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="heroCtaLabel">Hero CTA Label</Label>
                <Input
                  id="heroCtaLabel"
                  value={data.siteSettings.heroCtaLabel}
                  onChange={(e) => update("siteSettings", { ...data.siteSettings, heroCtaLabel: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="heroCtaHref">Hero CTA Link</Label>
                <Input
                  id="heroCtaHref"
                  value={data.siteSettings.heroCtaHref}
                  onChange={(e) => update("siteSettings", { ...data.siteSettings, heroCtaHref: e.target.value })}
                />
              </div>

              <Separator className="md:col-span-2" />
              <div className="space-y-2">
                <Label htmlFor="finalTitle">Final CTA Title</Label>
                <Input
                  id="finalTitle"
                  value={data.siteSettings.finalCtaTitle}
                  onChange={(e) => update("siteSettings", { ...data.siteSettings, finalCtaTitle: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="finalSubtitle">Final CTA Subtitle</Label>
                <Textarea
                  id="finalSubtitle"
                  value={data.siteSettings.finalCtaSubtitle}
                  onChange={(e) => update("siteSettings", { ...data.siteSettings, finalCtaSubtitle: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="finalLabel">Final CTA Label</Label>
                <Input
                  id="finalLabel"
                  value={data.siteSettings.finalCtaLabel}
                  onChange={(e) => update("siteSettings", { ...data.siteSettings, finalCtaLabel: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="finalHref">Final CTA Link</Label>
                <Input
                  id="finalHref"
                  value={data.siteSettings.finalCtaHref}
                  onChange={(e) => update("siteSettings", { ...data.siteSettings, finalCtaHref: e.target.value })}
                />
              </div>

              <Separator className="md:col-span-2" />
              <div className="space-y-2">
                <Label>Contact Section</Label>
                <Input
                  placeholder="Contact title"
                  value={data.siteSettings.contactTitle}
                  onChange={(e) => update("siteSettings", { ...data.siteSettings, contactTitle: e.target.value })}
                />
                <Textarea
                  placeholder="Contact subtitle"
                  value={data.siteSettings.contactSubtitle}
                  onChange={(e) => update("siteSettings", { ...data.siteSettings, contactSubtitle: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Feedback Section</Label>
                <Input
                  placeholder="Feedback title"
                  value={data.siteSettings.feedbackTitle}
                  onChange={(e) => update("siteSettings", { ...data.siteSettings, feedbackTitle: e.target.value })}
                />
                <Textarea
                  placeholder="Feedback subtitle"
                  value={data.siteSettings.feedbackSubtitle}
                  onChange={(e) => update("siteSettings", { ...data.siteSettings, feedbackSubtitle: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="navigation" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Navigation Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {data.navLinks.map((n, idx) => (
                <div key={idx} className="grid md:grid-cols-[1fr_1fr_auto] gap-3">
                  <Input
                    placeholder="Label"
                    value={n.label}
                    onChange={(e) => {
                      const next = [...data.navLinks]
                      next[idx] = { ...next[idx], label: e.target.value }
                      update("navLinks", next)
                    }}
                  />
                  <Input
                    placeholder="/#features"
                    value={n.href}
                    onChange={(e) => {
                      const next = [...data.navLinks]
                      next[idx] = { ...next[idx], href: e.target.value }
                      update("navLinks", next)
                    }}
                  />
                  <Button
                    variant="destructive"
                    onClick={() =>
                      update(
                        "navLinks",
                        data.navLinks.filter((_, i) => i !== idx),
                      )
                    }
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                className="gap-2 bg-transparent"
                onClick={() =>
                  update("navLinks", [...data.navLinks, { label: "New", href: "#", order: data.navLinks.length }])
                }
              >
                <Plus className="w-4 h-4" /> Add Link
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {data.features.map((f, idx) => (
                <div key={f.id ?? idx} className="grid md:grid-cols-[1fr_2fr_auto] gap-3">
                  <Input
                    placeholder="Title"
                    value={f.title}
                    onChange={(e) => {
                      const next = [...data.features]
                      next[idx] = { ...next[idx], title: e.target.value }
                      update("features", next)
                    }}
                  />
                  <Input
                    placeholder="Short description"
                    value={f.description}
                    onChange={(e) => {
                      const next = [...data.features]
                      next[idx] = { ...next[idx], description: e.target.value }
                      update("features", next)
                    }}
                  />
                  <Button
                    variant="destructive"
                    onClick={() =>
                      update(
                        "features",
                        data.features.filter((_, i) => i !== idx),
                      )
                    }
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                className="gap-2 bg-transparent"
                onClick={() =>
                  update("features", [
                    ...data.features,
                    {
                      id: Math.random(),
                      title: "New Feature",
                      description: "Describe the value",
                      icon: "check",
                      order: data.features.length,
                    },
                  ])
                }
              >
                <Plus className="w-4 h-4" /> Add Feature
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="testimonials" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Testimonials</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {data.testimonials.map((t, idx) => (
                <div key={t.id ?? idx} className="grid md:grid-cols-[1fr_1fr_2fr_auto] gap-3">
                  <Input
                    placeholder="Author"
                    value={t.author}
                    onChange={(e) => {
                      const next = [...data.testimonials]
                      next[idx] = { ...next[idx], author: e.target.value }
                      update("testimonials", next)
                    }}
                  />
                  <Input
                    placeholder="Role"
                    value={t.role}
                    onChange={(e) => {
                      const next = [...data.testimonials]
                      next[idx] = { ...next[idx], role: e.target.value }
                      update("testimonials", next)
                    }}
                  />
                  <Input
                    placeholder="Quote"
                    value={t.quote}
                    onChange={(e) => {
                      const next = [...data.testimonials]
                      next[idx] = { ...next[idx], quote: e.target.value }
                      update("testimonials", next)
                    }}
                  />
                  <Button
                    variant="destructive"
                    onClick={() =>
                      update(
                        "testimonials",
                        data.testimonials.filter((_, i) => i !== idx),
                      )
                    }
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                className="gap-2 bg-transparent"
                onClick={() =>
                  update("testimonials", [
                    ...data.testimonials,
                    {
                      id: Math.random(),
                      author: "New Person",
                      role: "Title, Company",
                      quote: "Add a compelling quote here.",
                      avatarUrl: "",
                    },
                  ])
                }
              >
                <Plus className="w-4 h-4" /> Add Testimonial
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="footer" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Footer & Social</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>Footer Links</Label>
                {data.footerLinks.map((f, idx) => (
                  <div key={idx} className="grid md:grid-cols-[1fr_1fr_auto] gap-3">
                    <Input
                      placeholder="Label"
                      value={f.label}
                      onChange={(e) => {
                        const next = [...data.footerLinks]
                        next[idx] = { ...next[idx], label: e.target.value }
                        update("footerLinks", next)
                      }}
                    />
                    <Input
                      placeholder="/terms"
                      value={f.href}
                      onChange={(e) => {
                        const next = [...data.footerLinks]
                        next[idx] = { ...next[idx], href: e.target.value }
                        update("footerLinks", next)
                      }}
                    />
                    <Button
                      variant="destructive"
                      onClick={() =>
                        update(
                          "footerLinks",
                          data.footerLinks.filter((_, i) => i !== idx),
                        )
                      }
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  className="gap-2 bg-transparent"
                  onClick={() => update("footerLinks", [...data.footerLinks, { label: "New", href: "#" }])}
                >
                  <Plus className="w-4 h-4" /> Add Footer Link
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inbox" className="mt-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Contact Messages</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {contacts.map((c) => (
                  <div key={c.id} className="rounded border p-3">
                    <div className="text-sm font-medium">{c.name || "Anonymous"}</div>
                    <div className="text-xs text-muted-foreground">{c.email}</div>
                    <div className="mt-2 text-sm">{c.message}</div>
                  </div>
                ))}
                {!contacts.length && <div className="text-sm text-muted-foreground">No messages yet.</div>}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Recent Feedback</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {feedback.map((f) => (
                  <div key={f.id} className="rounded border p-3">
                    <div className="text-sm font-medium">{f.name || "Anonymous"}</div>
                    <div className="text-xs text-muted-foreground">Rating: {f.rating}/5</div>
                    <div className="mt-2 text-sm">{f.comment}</div>
                  </div>
                ))}
                {!feedback.length && <div className="text-sm text-muted-foreground">No feedback yet.</div>}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
