"use client";

import Link from "next/link";
import {
  Globe,
  Mail,
  Shield,
  Cpu,
  Database,
  Search,
  ArrowRight,
  Wrench,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { useAdminSettingsStore } from "@/store/useAdminSettingsStore";

const cards: {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  count?: string;
  color: string;
}[] = [
  {
    title: "General Settings",
    description: "Site name, URL, admin email, maintenance mode and basic platform configuration.",
    icon: <Globe className="size-5" />,
    href: "/admin/settings/general",
    color: "from-blue-500/10 to-blue-600/5",
  },
  {
    title: "Mail Settings",
    description: "SMTP configuration, from address, port, security and email delivery settings.",
    icon: <Mail className="size-5" />,
    href: "/admin/settings/mail",
    count: "SMTP",
    color: "from-green-500/10 to-green-600/5",
  },
  {
    title: "Authentication & Security",
    description: "Email verification, registration control, password policy and session management.",
    icon: <Shield className="size-5" />,
    href: "/admin/settings/security",
    color: "from-purple-500/10 to-purple-600/5",
  },
  {
    title: "AI Configurations",
    description: "AI provider selection, OpenAI/Anthropic toggles, token limits and rate limiting.",
    icon: <Cpu className="size-5" />,
    href: "/admin/settings/configurations",
    count: "Ensemble",
    color: "from-amber-500/10 to-amber-600/5",
  },
  {
    title: "Cache Management",
    description: "Enable/disable caching, TTL settings, static asset cache duration and cache purge.",
    icon: <Database className="size-5" />,
    href: "/admin/settings/cache",
    color: "from-cyan-500/10 to-cyan-600/5",
  },
  {
    title: "SEO & Meta",
    description: "Default meta title, description, sitemap generation and robots.txt control.",
    icon: <Search className="size-5" />,
    href: "/admin/settings/seo",
    color: "from-rose-500/10 to-rose-600/5",
  },
];

export default function AdminSettingsHubPage() {
  const settings = useAdminSettingsStore();
  const activeCount = [
    settings.requireEmailVerification,
    settings.cacheEnabled,
    settings.openaiEnabled,
    settings.anthropicEnabled,
    settings.allowRegistration,
    !settings.maintenanceMode,
    settings.enableSitemap,
  ].filter(Boolean).length;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Manage your platform configuration. Click a card to open its settings.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-lg border bg-card px-4 py-2 text-sm">
          <Wrench className="text-primary size-4" />
          <span className="font-medium">{activeCount} active</span>
        </div>
      </div>

      {/* Quick status bar */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Verification", on: settings.requireEmailVerification },
          { label: "Maintenance", on: settings.maintenanceMode },
          { label: "Cache", on: settings.cacheEnabled },
          { label: "Sitemap", on: settings.enableSitemap },
        ].map((s) => (
          <div key={s.label} className="flex items-center gap-2 rounded-lg border bg-card px-3 py-2 text-xs">
            <span className={`size-2 rounded-full ${s.on ? "bg-green-500" : "bg-muted-foreground/40"}`} />
            <span className="text-muted-foreground">{s.label}</span>
            <span className="ml-auto font-medium">{s.on ? "On" : "Off"}</span>
          </div>
        ))}
      </div>

      {/* Setting cards grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <Link key={card.href} href={card.href} className="group">
            <Card className="transition-all group-hover:border-primary/40 group-hover:shadow-md">
              <CardContent className="p-5">
                <div className={`mb-4 flex size-10 items-center justify-center rounded-xl bg-gradient-to-br ${card.color} text-primary`}>
                  {card.icon}
                </div>
                <h3 className="flex items-center gap-2 text-sm font-bold">
                  {card.title}
                  {card.count && (
                    <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary">
                      {card.count}
                    </span>
                  )}
                </h3>
                <p className="text-muted-foreground mt-1.5 text-xs leading-relaxed">
                  {card.description}
                </p>
                <div className="mt-4 flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  Open settings <ArrowRight className="size-3" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
