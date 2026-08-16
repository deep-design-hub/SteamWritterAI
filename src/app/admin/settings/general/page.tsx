"use client";

import { toast } from "sonner";
import { ArrowLeft, Globe, Save } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useAdminSettingsStore } from "@/store/useAdminSettingsStore";
import * as React from "react";

export default function GeneralSettingsPage() {
  const s = useAdminSettingsStore();
  const [siteName, setSiteName] = React.useState(s.siteName);
  const [siteUrl, setSiteUrl] = React.useState(s.siteUrl);
  const [siteDesc, setSiteDesc] = React.useState(s.siteDescription);
  const [adminEmail, setAdminEmail] = React.useState(s.adminEmail);

  function handleSave() {
    s.update({
      siteName,
      siteUrl,
      siteDescription: siteDesc,
      adminEmail,
    });
    toast.success("General settings saved.");
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button asChild variant="ghost" size="icon" className="size-8">
          <Link href="/admin/settings"><ArrowLeft className="size-4" /></Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">General Settings</h1>
          <p className="text-muted-foreground text-sm">Configure basic platform identity and access.</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Site identity */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Globe className="text-primary size-4" />
              <CardTitle className="text-base">Site Identity</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label>Site Name</Label>
              <Input value={siteName} onChange={(e) => setSiteName(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Site URL</Label>
              <Input value={siteUrl} onChange={(e) => setSiteUrl(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Site Description</Label>
              <Input value={siteDesc} onChange={(e) => setSiteDesc(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Admin Email</Label>
              <Input value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} type="email" />
            </div>
          </CardContent>
        </Card>

        {/* Maintenance */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Maintenance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <p className="text-sm font-medium">Maintenance Mode</p>
                <p className="text-muted-foreground text-xs">Show a maintenance page to non-admin visitors.</p>
              </div>
              <Switch
                checked={s.maintenanceMode}
                onCheckedChange={(v) => s.update({ maintenanceMode: v })}
              />
            </div>
            {s.maintenanceMode && (
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-200">
                Maintenance mode is ON. Only admins can access the site.
              </div>
            )}
            <div className="rounded-lg bg-muted/50 p-4 text-xs text-muted-foreground">
              <p className="mb-1 font-medium">Environment Info</p>
              <p>Password hashing: SHA-256 with salt prefix <code>steamwriterai:</code></p>
              <p>Session storage: localStorage key <code>steamwriterai-auth</code></p>
              <p>CORS: Same-origin only</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave}>
          <Save className="mr-1.5 size-4" /> Save General Settings
        </Button>
      </div>
    </div>
  );
}
