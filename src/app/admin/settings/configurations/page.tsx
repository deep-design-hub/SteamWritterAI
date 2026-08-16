"use client";

import { toast } from "sonner";
import { ArrowLeft, Cpu, Zap, Save, Activity } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useAdminSettingsStore } from "@/store/useAdminSettingsStore";

export default function ConfigurationsPage() {
  const s = useAdminSettingsStore();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button asChild variant="ghost" size="icon" className="size-8">
          <Link href="/admin/settings"><ArrowLeft className="size-4" /></Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">AI Configurations</h1>
          <p className="text-muted-foreground text-sm">Manage AI providers, token limits and rate limiting.</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Provider selection */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Cpu className="text-primary size-4" />
              <CardTitle className="text-base">AI Providers</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <p className="text-sm font-medium">OpenAI</p>
                <p className="text-muted-foreground text-xs">GPT-4o, GPT-4o-mini for chapter generation.</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`size-2 rounded-full ${s.openaiEnabled ? "bg-green-500" : "bg-muted-foreground/40"}`} />
                <Switch
                  checked={s.openaiEnabled}
                  onCheckedChange={(v) => s.update({ openaiEnabled: v })}
                />
              </div>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <p className="text-sm font-medium">Anthropic</p>
                <p className="text-muted-foreground text-xs">Claude for analysis, methodology and references.</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`size-2 rounded-full ${s.anthropicEnabled ? "bg-green-500" : "bg-muted-foreground/40"}`} />
                <Switch
                  checked={s.anthropicEnabled}
                  onCheckedChange={(v) => s.update({ anthropicEnabled: v })}
                />
              </div>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-primary/30 bg-primary/5 p-4">
              <div>
                <p className="text-sm font-semibold text-primary">Ensemble Mode</p>
                <p className="text-muted-foreground text-xs">Route to the best model per task automatically.</p>
              </div>
              <span className="rounded bg-primary/10 px-2 py-1 text-xs font-bold text-primary">
                {s.openaiEnabled && s.anthropicEnabled ? "ACTIVE" : "DISABLED"}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Limits */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Activity className="text-primary size-4" />
              <CardTitle className="text-base">Limits & Quotas</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label>Max Tokens Per Request</Label>
              <Input
                type="number"
                min={256}
                max={32768}
                value={s.maxTokensPerRequest}
                onChange={(e) => s.update({ maxTokensPerRequest: Number(e.target.value) })}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Rate Limit (requests per minute)</Label>
              <Input
                type="number"
                min={1}
                max={200}
                value={s.rateLimitPerMinute}
                onChange={(e) => s.update({ rateLimitPerMinute: Number(e.target.value) })}
              />
            </div>
            <div className="rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground">
              <p>Provider routing is configured in <code>lib/agent/agent.ts</code> and <code>store/useModelStore.ts</code>.</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button onClick={() => toast.success("AI configurations saved.")}>
          <Save className="mr-1.5 size-4" /> Save AI Settings
        </Button>
      </div>
    </div>
  );
}
