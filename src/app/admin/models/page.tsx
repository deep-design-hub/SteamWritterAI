"use client";

import * as React from "react";
import { toast } from "sonner";
import {
  Bot,
  Brain,
  CheckCircle2,
  Info,
  Power,
  PowerOff,
  RefreshCw,
  Settings2,
  Zap,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useModelStore } from "@/store/useModelStore";

export default function AdminModelsPage() {
  const { config, toggleModel, setDefaultMode } = useModelStore();
  const [refreshKey, setRefreshKey] = React.useState(0);
  const [configured, setConfigured] = React.useState<string[]>([]);

  React.useEffect(() => {
    fetch("/api/agent")
      .then((r) => r.json())
      .then((d) => setConfigured(d.providers ?? []))
      .catch(() => setConfigured([]));
  }, [refreshKey]);

  function handleToggle(provider: "openai" | "anthropic") {
    toggleModel(provider);
    toast.success(`${config[provider].label} ${config[provider].enabled ? "disabled" : "enabled"}`);
  }

  function isConfigured(provider: string) {
    return configured.includes(provider);
  }

  const enabledCount = [config.openai, config.anthropic].filter((m) => m.enabled && isConfigured(m.label === "OpenAI ChatGPT" ? "openai" : "anthropic")).length;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">AI Model Management</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Enable or disable AI providers. When multiple models are enabled, the system uses ensemble mode — all models work together for the best result.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={() => setRefreshKey((k) => k + 1)}>
          <RefreshCw className="mr-1.5 size-3.5" /> Refresh
        </Button>
      </div>

      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="flex items-center gap-3 py-4">
          <Zap className="text-primary size-5" />
          <div className="flex-1">
            <p className="text-sm font-medium">
              Ensemble Mode:{" "}
              {enabledCount >= 2 ? (
                <span className="text-primary">Active</span>
              ) : (
                <span className="text-muted-foreground">
                  {enabledCount === 0 ? "No models enabled" : "Only 1 model — enable another for ensemble"}
                </span>
              )}
            </p>
            <p className="text-muted-foreground text-xs">
              When 2+ models are enabled, every generation request is sent to all enabled models simultaneously. The system combines and selects the best output.
            </p>
          </div>
          {enabledCount >= 2 && <Badge variant="secondary" className="text-primary"><Zap className="mr-1 size-3" /> Ensemble</Badge>}
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* OpenAI Card */}
        <Card className={config.openai.enabled && isConfigured("openai") ? "border-green-500/30" : "opacity-70"}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="text-primary size-5" />
                <CardTitle className="text-base">{config.openai.label}</CardTitle>
              </div>
              <div className="flex items-center gap-2">
                {isConfigured("openai") ? (
                  <Badge variant="secondary" className="text-green-600"><CheckCircle2 className="mr-1 size-3" /> API Key Found</Badge>
                ) : (
                  <Badge variant="destructive">No API Key</Badge>
                )}
              </div>
            </div>
            <CardDescription>{config.openai.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p><strong>Model:</strong> {process.env.NEXT_PUBLIC_OPENAI_MODEL || "gpt-4o"}</p>
              <p><strong>Use case:</strong> Fast structured output, data analysis, formatting</p>
            </div>
          </CardContent>
          <CardFooter className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-sm">
              {config.openai.enabled ? (
                <><Power className="text-green-500 size-4" /> Enabled</>
              ) : (
                <><PowerOff className="text-muted-foreground size-4" /> Disabled</>
              )}
            </span>
            <Button
              variant={config.openai.enabled ? "outline" : "default"}
              size="sm"
              onClick={() => handleToggle("openai")}
              disabled={!isConfigured("openai")}
            >
              {config.openai.enabled ? "Disable" : "Enable"}
            </Button>
          </CardFooter>
        </Card>

        {/* Anthropic Card */}
        <Card className={config.anthropic.enabled && isConfigured("anthropic") ? "border-green-500/30" : "opacity-70"}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Brain className="text-primary size-5" />
                <CardTitle className="text-base">{config.anthropic.label}</CardTitle>
              </div>
              <div className="flex items-center gap-2">
                {isConfigured("anthropic") ? (
                  <Badge variant="secondary" className="text-green-600"><CheckCircle2 className="mr-1 size-3" /> API Key Found</Badge>
                ) : (
                  <Badge variant="destructive">No API Key</Badge>
                )}
              </div>
            </div>
            <CardDescription>{config.anthropic.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p><strong>Model:</strong> {process.env.NEXT_PUBLIC_ANTHROPIC_MODEL || "claude-sonnet-4-5"}</p>
              <p><strong>Use case:</strong> Deep reasoning, long context, nuanced writing</p>
            </div>
          </CardContent>
          <CardFooter className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-sm">
              {config.anthropic.enabled ? (
                <><Power className="text-green-500 size-4" /> Enabled</>
              ) : (
                <><PowerOff className="text-muted-foreground size-4" /> Disabled</>
              )}
            </span>
            <Button
              variant={config.anthropic.enabled ? "outline" : "default"}
              size="sm"
              onClick={() => handleToggle("anthropic")}
              disabled={!isConfigured("anthropic")}
            >
              {config.anthropic.enabled ? "Disable" : "Enable"}
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Info className="text-primary size-4" />
            <CardTitle className="text-sm">How ensemble mode works</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="text-muted-foreground text-sm space-y-2">
          <p>1. When a user generates a chapter or any content, the request is sent to <strong>all enabled models simultaneously</strong>.</p>
          <p>2. Each model produces its own complete response.</p>
          <p>3. The system compares outputs and selects the most comprehensive, accurate, and well-structured result.</p>
          <p>4. If one model fails, the system falls back to whichever model succeeded.</p>
          <p>5. Disable a model here to remove it from the ensemble. The remaining models continue working.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Settings2 className="text-primary size-4" />
            <CardTitle className="text-sm">Environment Variables</CardTitle>
          </div>
          <CardDescription>
            API keys must be set in <code>.env.local</code> for models to appear here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg bg-muted p-4 font-mono text-xs space-y-1">
            <p><span className="text-muted-foreground"># .env.local</span></p>
            <p>OPENAI_API_KEY=sk-...</p>
            <p>OPENAI_MODEL=gpt-4o</p>
            <p>ANTHROPIC_API_KEY=sk-ant-...</p>
            <p>ANTHROPIC_MODEL=claude-sonnet-4-5</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
