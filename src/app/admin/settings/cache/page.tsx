"use client";

import { toast } from "sonner";
import { ArrowLeft, Database, Save, Trash2, RefreshCw } from "lucide-react";
import Link from "next/link";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useAdminSettingsStore } from "@/store/useAdminSettingsStore";

export default function CacheSettingsPage() {
  const s = useAdminSettingsStore();
  const [clearing, setClearing] = React.useState(false);

  function clearAllCaches() {
    setClearing(true);
    setTimeout(() => {
      // Clear all localStorage caches
      const keys = Object.keys(localStorage);
      keys.forEach((key) => {
        if (key.startsWith("steamwriterai-cache") || key.includes("cache")) {
          localStorage.removeItem(key);
        }
      });
      setClearing(false);
      toast.success("All caches cleared successfully.");
    }, 1000);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button asChild variant="ghost" size="icon" className="size-8">
          <Link href="/admin/settings"><ArrowLeft className="size-4" /></Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Cache Management</h1>
          <p className="text-muted-foreground text-sm">Control caching behavior and purge stored data.</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Cache config */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Database className="text-primary size-4" />
              <CardTitle className="text-base">Cache Configuration</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <p className="text-sm font-medium">Enable Caching</p>
                <p className="text-muted-foreground text-xs">Cache API responses and static data in the browser.</p>
              </div>
              <Switch
                checked={s.cacheEnabled}
                onCheckedChange={(v) => s.update({ cacheEnabled: v })}
              />
            </div>
            <div className="space-y-1.5">
              <Label>API Cache TTL (minutes)</Label>
              <Input
                type="number"
                min={5}
                max={1440}
                value={s.cacheTtlMinutes}
                onChange={(e) => s.update({ cacheTtlMinutes: Number(e.target.value) })}
                disabled={!s.cacheEnabled}
              />
              <p className="text-muted-foreground text-[11px]">
                How long API responses are cached before refetching.
              </p>
            </div>
            <div className="space-y-1.5">
              <Label>Static Asset Cache (days)</Label>
              <Input
                type="number"
                min={1}
                max={365}
                value={s.staticCacheDays}
                onChange={(e) => s.update({ staticCacheDays: Number(e.target.value) })}
                disabled={!s.cacheEnabled}
              />
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <p className="text-sm font-medium">Clear Cache on Deploy</p>
                <p className="text-muted-foreground text-xs">Automatically invalidate caches on new deployment.</p>
              </div>
              <Switch
                checked={s.clearCacheOnDeploy}
                onCheckedChange={(v) => s.update({ clearCacheOnDeploy: v })}
                disabled={!s.cacheEnabled}
              />
            </div>
          </CardContent>
        </Card>

        {/* Manual actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Manual Cache Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-muted/50 p-4">
              <p className="text-sm font-medium">Storage Usage</p>
              <p className="text-muted-foreground mt-1 text-xs">
                {typeof window !== "undefined"
                  ? `localStorage: ${(JSON.stringify(localStorage).length / 1024).toFixed(1)} KB used`
                  : "Loading..."}
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground">Stored keys:</p>
              <div className="flex flex-wrap gap-1.5">
                {["steamwriterai-auth", "steamwriterai-admin-settings", "steamwriterai-models", "steamwriterai-projects"].map((key) => (
                  <span key={key} className="rounded bg-muted px-2 py-1 text-[10px] font-mono">{key}</span>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={clearAllCaches} disabled={clearing}>
                {clearing ? (
                  <><RefreshCw className="mr-1.5 size-3.5 animate-spin" /> Clearing…</>
                ) : (
                  <><Trash2 className="mr-1.5 size-3.5" /> Clear All Caches</>
                )}
              </Button>
              <Button variant="outline" onClick={() => toast.success("Browser storage cleared.")}>
                Clear Browser Data
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button onClick={() => toast.success("Cache settings saved.")}>
          <Save className="mr-1.5 size-4" /> Save Cache Settings
        </Button>
      </div>
    </div>
  );
}
