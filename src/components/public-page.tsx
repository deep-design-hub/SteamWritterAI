"use client";

import Link from "next/link";
import * as React from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Send,
  Sparkles,
  X,
} from "lucide-react";

import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { PageContent, PageItem, PageSection } from "@/lib/content-types";
import { useContentStore } from "@/store/useContentStore";
import { DEFAULT_PAGES } from "@/lib/page-defaults";

const COMPARISON_COLUMNS = ["Basic", "Standard", "Premium", "Institutional"];

function SectionHeader({ section }: { section: PageSection }) {
  if (!section.heading) return null;
  return (
    <div className="mb-10 text-center">
      {section.badge && (
        <Badge variant="secondary" className="mb-3">
          {section.badge}
        </Badge>
      )}
      {section.heading && (
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          {section.heading}
        </h2>
      )}
      {section.subheading && (
        <p className="text-muted-foreground mx-auto mt-3 max-w-2xl">
          {section.subheading}
        </p>
      )}
    </div>
  );
}

function CtaButtons({
  primary,
  secondary,
  align = "center",
}: {
  primary?: PageSection["primaryCta"];
  secondary?: PageSection["secondaryCta"];
  align?: "center" | "start";
}) {
  const wrap = align === "center" ? "justify-center" : "justify-start";
  return (
    <div className={`mt-7 flex flex-wrap gap-3 ${wrap}`}>
      {primary && (
        <Button asChild size="lg">
          <Link href={primary.href}>
            {primary.label} <ArrowRight className="size-4" />
          </Link>
        </Button>
      )}
      {secondary && (
        <Button asChild size="lg" variant="outline">
          <Link href={secondary.href}>{secondary.label}</Link>
        </Button>
      )}
    </div>
  );
}

function HeroSection({ section }: { section: PageSection }) {
  return (
    <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
      {/* Background gradients */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(27,139,44,0.12),transparent),radial-gradient(ellipse_50%_40%_at_80%_80%,rgba(124,58,237,0.08),transparent),radial-gradient(ellipse_40%_30%_at_20%_70%,rgba(27,139,44,0.06),transparent)]" />
      {/* Grid pattern */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)] bg-[size:64px_64px] opacity-[0.08] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black,transparent_70%)]" />

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        {/* Left: Text */}
        <div>
          {section.badge && (
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary">
              <span className="bg-primary size-1.5 animate-pulse rounded-full" />
              {section.badge}
            </div>
          )}
          <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            {section.heading?.includes("Research Operating System") ? (
              <>Your Academic<br /><span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">Research Operating System</span></>
            ) : (
              section.heading
            )}
          </h1>
          {section.subheading && (
            <p className="text-muted-foreground mt-5 max-w-xl text-lg leading-relaxed">
              {section.subheading}
            </p>
          )}
          <CtaButtons primary={section.primaryCta} secondary={section.secondaryCta} align="start" />
          {section.items.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t pt-7">
              {section.items.map((item) => (
                <div key={item.id}>
                  <div className="text-3xl font-extrabold">
                    <span className="text-primary">{item.value}</span>
                  </div>
                  <p className="text-muted-foreground text-[13px]">{item.title}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Hero Visual Card */}
        <div className="relative hidden items-center justify-center lg:flex">
          <div className="w-full max-w-md rounded-2xl border bg-card p-6 shadow-xl">
            {/* Card header */}
            <div className="mb-4 flex items-center gap-2">
              <div className="size-3 rounded-full bg-red-500" />
              <div className="size-3 rounded-full bg-yellow-500" />
              <div className="size-3 rounded-full bg-green-500" />
              <span className="ml-2 text-xs text-muted-foreground">workspace.steamwriterai</span>
            </div>
            {/* Fake content lines */}
            <div className="mb-2 h-3 w-full rounded bg-gradient-to-r from-primary/20 to-purple-500/20" />
            <div className="mb-2 h-3 w-[85%] rounded bg-muted" />
            <div className="mb-2 h-3 w-[70%] rounded bg-muted" />
            <div className="mb-3 h-3 w-[90%] rounded bg-muted" />
            {/* Tags */}
            <div className="mb-3 flex gap-2">
              <span className="rounded bg-primary/10 px-2.5 py-1 text-[10px] font-semibold text-primary">CHAPTER 1</span>
              <span className="rounded bg-primary/10 px-2.5 py-1 text-[10px] font-semibold text-primary">INTRODUCTION</span>
              <span className="rounded bg-primary/10 px-2.5 py-1 text-[10px] font-semibold text-primary">IN PROGRESS</span>
            </div>
            <div className="mb-2 h-3 w-[45%] rounded bg-muted" />
            <div className="mb-3 h-3 w-[60%] rounded bg-muted" />
            {/* Progress */}
            <div className="mt-4 flex items-center gap-3">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-4 text-green-500"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>
              <div className="h-1 flex-1 overflow-hidden rounded-full bg-muted">
                <div className="h-full w-[76%] rounded-full bg-green-500" />
              </div>
              <span className="text-xs text-muted-foreground">76% complete</span>
            </div>
          </div>
          {/* Floating icons */}
          <div className="absolute -right-4 top-0 flex size-12 items-center justify-center rounded-xl border bg-card shadow-lg">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-5 text-primary"><path d="M12 2l2 7h7l-5 5 2 8-6-4-6 4 2-8-5-5h7z"/></svg>
          </div>
          <div className="absolute -left-4 bottom-8 flex size-12 items-center justify-center rounded-xl border bg-card shadow-lg">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-5 text-primary"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsSection({ section }: { section: PageSection }) {
  return (
    <section className="border-border/60 border-y bg-muted/30 py-12">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-14 gap-y-6 px-4 sm:px-6">
        {section.items.map((item) => (
          <div key={item.id} className="text-center">
            <div className="text-4xl font-extrabold">
              <span className="text-primary">{item.value}</span>
            </div>
            <p className="text-muted-foreground text-sm">{item.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function StepsSection({ section }: { section: PageSection }) {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader section={section} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {section.items.map((item) => (
            <Card key={item.id} className="gap-3 py-6">
              <CardContent className="px-6 py-0">
                {item.icon && (
                  <div className="bg-primary/10 text-primary flex size-11 items-center justify-center rounded-xl">
                    <Icon name={item.icon} className="size-5" />
                  </div>
                )}
                <h3 className="mt-4 font-semibold">{item.title}</h3>
                {item.description && (
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                    {item.description}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function CardsSection({ section }: { section: PageSection }) {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader section={section} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {section.items.map((item) => (
            <Card key={item.id} className="gap-3 py-6 transition-transform hover:-translate-y-1">
              <CardHeader className="px-5 py-0">
                {item.icon && (
                  <div className="bg-primary/10 text-primary flex size-11 items-center justify-center rounded-xl">
                    <Icon name={item.icon} className="size-5" />
                  </div>
                )}
                <div className="mt-3 flex items-center justify-between gap-2">
                  <CardTitle className="text-[15px] font-bold">
                    {item.title}
                  </CardTitle>
                  {item.badge && !item.badge.includes("·") && (
                    <span className="bg-muted text-muted-foreground rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                      {item.badge}
                    </span>
                  )}
                </div>
              </CardHeader>
              <CardContent className="px-5 py-0">
                {item.description && (
                  <p className="text-muted-foreground text-[13px] leading-relaxed">
                    {item.description}
                  </p>
                )}
                {item.badge && item.badge.includes("·") && (
                  <p className="text-primary mt-3 text-xs font-semibold">
                    {item.badge}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function PipelineSection({ section }: { section: PageSection }) {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Card className="gap-8 py-12">
          <CardHeader className="items-center text-center">
            <CardTitle className="text-2xl sm:text-3xl">
              {section.heading}
            </CardTitle>
            {section.subheading && (
              <CardDescription>{section.subheading}</CardDescription>
            )}
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4 px-6 sm:grid-cols-3 lg:grid-cols-7">
            {section.items.map((item, i) => (
              <div key={item.id} className="flex flex-col items-center gap-2 rounded-xl border bg-muted/30 p-4 text-center">
                <span className="text-muted-foreground absolute -mt-3 -ml-3 flex size-6 items-center justify-center rounded-full bg-foreground text-xs font-bold text-background">
                  {i + 1}
                </span>
                {item.icon && <Icon name={item.icon} className="text-primary size-6" />}
                <span className="text-[13px] font-bold">{item.title}</span>
                {item.description && (
                  <span className="text-muted-foreground text-[11px] leading-snug">
                    {item.description}
                  </span>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function PlansSection({ section }: { section: PageSection }) {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader section={section} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {section.items.map((plan) => (
            <Card
              key={plan.id}
              className={
                plan.featured
                  ? "gap-5 border-primary py-8 shadow-xl"
                  : "gap-5 py-8"
              }
            >
              <CardHeader className="items-center px-6 py-0 text-center">
                {plan.featured && <Badge className="mb-1">Most Popular</Badge>}
                <CardTitle>{plan.title}</CardTitle>
                {plan.badge && (
                  <CardDescription>{plan.badge}</CardDescription>
                )}
                <div className="text-4xl font-extrabold tracking-tight">
                  {plan.price}
                  <span className="text-muted-foreground text-sm font-medium">
                    {" "}
                    {plan.price !== "Custom" ? "one-time" : ""}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="px-6 py-0">
                <ul className="space-y-2 text-sm">
                  {(plan.list ?? []).map((f) => (
                    <li key={f} className="flex items-center gap-2 border-b pb-2 last:border-0">
                      <Check className="text-emerald-500 size-4 shrink-0" />
                      <span className="text-muted-foreground">{f}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardContent className="px-6 py-0">
                <Button
                  asChild
                  className="w-full"
                  variant={plan.featured ? "default" : "outline"}
                >
                  <Link href={plan.href ?? "/register"}>{plan.cta ?? "Get started"}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function ComparisonSection({ section }: { section: PageSection }) {
  const plans = section.items.filter((i) => i.title === "plan-columns");
  const columns = plans[0]?.list ?? COMPARISON_COLUMNS;
  const rows = section.items.filter((i) => i.title !== "plan-columns");
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader section={section} />
        <div className="overflow-x-auto rounded-xl border">
          <table className="w-full min-w-[640px] border-collapse text-[13px]">
            <thead>
              <tr className="bg-muted">
                <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  Feature
                </th>
                {columns.map((col) => (
                  <th
                    key={col}
                    className="px-4 py-3 text-center text-[11px] font-bold uppercase tracking-wider text-muted-foreground"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-t hover:bg-primary/5">
                  <td className="px-4 py-2.5 font-medium">{row.title}</td>
                  {columns.map((col, i) => (
                    <td key={col} className="px-4 py-2.5 text-center">
                      {row.list?.includes(col.toLowerCase()) ? (
                        <Check className="text-emerald-500 mx-auto size-4" />
                      ) : (
                        <span className="text-muted-foreground/40">—</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function FaqSection({ section }: { section: PageSection }) {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeader section={section} />
        <div className="space-y-3">
          {section.items.map((item) => (
            <details key={item.id} className="group rounded-xl border bg-card px-5 py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                {item.title}
                <ChevronDown className="text-muted-foreground size-4 shrink-0 transition-transform group-open:rotate-180" />
              </summary>
              {item.description && (
                <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                  {item.description}
                </p>
              )}
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaSection({ section }: { section: PageSection }) {
  const center = section.primaryCta?.label !== undefined || section.secondaryCta?.label !== undefined;
  return (
    <section className="pb-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Card className="bg-primary gap-6 border-0 py-16 text-primary-foreground">
          <CardContent className="flex flex-col items-center gap-6 text-center">
            {section.badge && <Sparkles className="size-6" />}
            <h2 className="text-2xl font-extrabold">{section.heading}</h2>
            {section.subheading && (
              <p className="max-w-xl text-primary-foreground/85">
                {section.subheading}
              </p>
            )}
            {(center || section.items.length > 0) && (
              <div className="flex flex-wrap justify-center gap-3">
                {section.primaryCta && (
                  <Button
                    asChild
                    size="lg"
                    className="bg-foreground text-background hover:bg-foreground/90"
                  >
                    <Link href={section.primaryCta.href}>
                      {section.primaryCta.label}
                    </Link>
                  </Button>
                )}
                {section.secondaryCta && (
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                  >
                    <Link href={section.secondaryCta.href}>
                      <ArrowRight className="size-4" /> {section.secondaryCta.label}
                    </Link>
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function TextSection({ section }: { section: PageSection }) {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeader section={section} />
        <div className="space-y-6">
          {section.items.map((item) => (
            <div key={item.id}>
              {item.title && (
                <h2 className="text-lg font-extrabold">{item.title}</h2>
              )}
              {item.description && (
                <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">
                  {item.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BlogsSection({ section }: { section: PageSection }) {
  return (
    <section className="py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader section={section} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {section.items.map((item) => (
            <Link key={item.id} href={`/blog/${item.slug}`}>
              <Card className="gap-0 overflow-hidden py-0 transition-transform hover:-translate-y-1">
                <div
                  className={`relative flex h-40 items-center justify-center bg-gradient-to-br ${item.icon ? "from-primary/15 to-accent/15" : "from-primary to-accent"}`}
                >
                  {item.icon ? (
                    <Icon name={item.icon} className="text-primary size-12" />
                  ) : (
                    <Icon name="BookOpen" className="text-white size-12" />
                  )}
                </div>
                <CardContent className="gap-2 px-5 py-4">
                  {item.category && (
                    <Badge variant="secondary">{item.category}</Badge>
                  )}
                  <CardTitle className="mt-2 text-base leading-snug">
                    {item.title}
                  </CardTitle>
                  <CardDescription className="mt-1 leading-relaxed">
                    {item.description}
                  </CardDescription>
                  <div className="text-muted-foreground flex items-center gap-4 pt-3 text-xs">
                    {item.date && <span>{item.date}</span>}
                    {item.readTime && (
                      <span className="flex items-center gap-1">
                        <Icon name="Clock" className="size-3.5" /> {item.readTime}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function ChannelsSection({ section }: { section: PageSection }) {
  return (
    <section className="pt-12">
      <div className="mx-auto grid max-w-6xl gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        {section.items.map((item) => (
          <Card key={item.id} className="gap-3 py-5">
            <CardHeader className="px-5 py-0">
              {item.icon && (
                <div className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-lg">
                  <Icon name={item.icon} className="size-5" />
                </div>
              )}
              <CardTitle className="mt-3 text-base">{item.title}</CardTitle>
            </CardHeader>
            <CardContent className="px-5 py-0">
              <p className="font-semibold">{item.value}</p>
              {item.hint && (
                <CardDescription className="mt-1 text-xs">{item.hint}</CardDescription>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

function ContactSection({ section }: { section: PageSection }) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [sent, setSent] = React.useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:hello@steamwriterai.com?subject=${encodeURIComponent(
      subject || "SteamWriterAi enquiry"
    )}&body=${body}`;
    setSent(true);
  }

  return (
    <section className="pt-6">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <Card className="gap-6 py-8">
          <CardHeader>
            <CardTitle className="text-xl">{section.heading}</CardTitle>
            {section.subheading && (
              <CardDescription>{section.subheading}</CardDescription>
            )}
          </CardHeader>
          <CardContent className="px-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label htmlFor="pname" className="text-sm font-medium">Your name</label>
                  <input
                    id="pname"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border-input bg-background focus:ring-ring h-10 w-full rounded-md border px-3 text-sm focus:ring-2 focus:outline-none"
                    placeholder="e.g. Chinedu Obi"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="pemail" className="text-sm font-medium">Email address</label>
                  <input
                    id="pemail"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-input bg-background focus:ring-ring h-10 w-full rounded-md border px-3 text-sm focus:ring-2 focus:outline-none"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label htmlFor="psubject" className="text-sm font-medium">Subject</label>
                <input
                  id="psubject"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="border-input bg-background focus:ring-ring h-10 w-full rounded-md border px-3 text-sm focus:ring-2 focus:outline-none"
                  placeholder="How can we help?"
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="pmessage" className="text-sm font-medium">Message</label>
                <textarea
                  id="pmessage"
                  required
                  rows={6}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="border-input bg-background focus:ring-ring w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:outline-none"
                  placeholder="Write your message here…"
                />
              </div>
              {sent && (
                <p className="bg-primary/10 text-primary rounded-md px-3 py-2 text-sm font-medium">
                  Your email app should open — if it didn&apos;t, email us directly at
                  hello@steamwriterai.com.
                </p>
              )}
              <Button type="submit" size="lg" className="w-full sm:w-auto">
                <Send className="size-4" /> Send message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

const RENDERERS: Record<string, React.FC<{ section: PageSection }>> = {
  hero: HeroSection,
  stats: StatsSection,
  steps: StepsSection,
  cards: CardsSection,
  pipeline: PipelineSection,
  plans: PlansSection,
  comparison: ComparisonSection,
  faq: FaqSection,
  cta: CtaSection,
  text: TextSection,
  blogs: BlogsSection,
  contact: ContactSection,
  channels: ChannelsSection,
};

export function PublicPage({ slug }: { slug: string }) {
  const pages = useContentStore((s) => s.pages);
  const content = pages[slug] ?? DEFAULT_PAGES[slug];

  if (!content) return null;

  const hasHeroSection = content.sections.some((s) => s.type === "hero");

  return (
    <div>
      {/* Only show the title/subtitle block if there's no hero section (hero already has heading + subheading) */}
      {!hasHeroSection && (
        <section className="pt-16 sm:pt-20">
          <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
            {content.title && (
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                {content.title}
              </h1>
            )}
            {content.subtitle && (
              <p className="text-muted-foreground mx-auto mt-4 max-w-2xl">
                {content.subtitle}
              </p>
            )}
          </div>
        </section>
      )}
      {content.sections.map((section) => {
        const Renderer = RENDERERS[section.type];
        if (!Renderer) return null;
        return <Renderer key={section.id} section={section} />;
      })}
    </div>
  );
}
