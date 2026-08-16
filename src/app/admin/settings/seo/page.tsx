"use client";

import { toast } from "sonner";
import { ArrowLeft, Search, Save, FileText, Globe } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useAdminSettingsStore } from "@/store/useAdminSettingsStore";

export default function SeoSettingsPage() {
  const s = useAdminSettingsStore();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button asChild variant="ghost" size="icon" className="size-8">
          <Link href="/admin/settings"><ArrowLeft className="size-4" /></Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">SEO & Meta</h1>
          <p className="text-muted-foreground text-sm">Default meta tags, sitemap and robots.txt.</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Default meta */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Search className="text-primary size-4" />
              <CardTitle className="text-base">Default Meta Tags</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label>Default Title</Label>
              <Input
                value={s.defaultMetaTitle}
                onChange={(e) => s.update({ defaultMetaTitle: e.target.value })}
              />
              <p className="text-muted-foreground text-[11px]">
                {s.defaultMetaTitle.length}/60 characters recommended
              </p>
            </div>
            <div className="space-y-1.5">
              <Label>Default Description</Label>
              <Textarea
                value={s.defaultMetaDescription}
                onChange={(e) => s.update({ defaultMetaDescription: e.target.value })}
                rows={3}
              />
              <p className="text-muted-foreground text-[11px]">
                {s.defaultMetaDescription.length}/160 characters recommended
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Sitemap & robots */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <FileText className="text-primary size-4" />
              <CardTitle className="text-base">Sitemap & Robots</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <p className="text-sm font-medium">Auto-generate Sitemap</p>
                <p className="text-muted-foreground text-xs">Include all public pages in sitemap.xml.</p>
              </div>
              <Switch
                checked={s.enableSitemap}
                onCheckedChange={(v) => s.update({ enableSitemap: v })}
              />
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <p className="text-sm font-medium">Generate robots.txt</p>
                <p className="text-muted-foreground text-xs">Allow search engine crawlers to index the site.</p>
              </div>
              <Switch
                checked={s.enableRobotsTxt}
                onCheckedChange={(v) => s.update({ enableRobotsTxt: v })}
              />
            </div>
            <div className="rounded-lg bg-muted/50 p-4 font-mono text-xs space-y-1">
              <p className="text-muted-foreground">Preview robots.txt:</p>
              <p>User-agent: *</p>
              {s.enableRobotsTxt ? (
                <>
                  <p>Allow: /</p>
                  {s.enableSitemap && <p>Sitemap: {s.siteUrl}/sitemap.xml</p>}
                </>
              ) : (
                <p>Disallow: /</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button onClick={() => toast.success("SEO settings saved.")}>
          <Save className="mr-1.5 size-4" /> Save SEO Settings
        </Button>
      </div>
    </div>
  );
}
