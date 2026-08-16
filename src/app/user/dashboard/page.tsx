"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  BookText,
  Clock,
  CreditCard,
  FileText,
  Plus,
  Quote,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useProjectStore } from "@/store/useProjectStore";
import { useAuthStore } from "@/store/useAuthStore";
import { usePaymentStore } from "@/store/usePaymentStore";

export default function DashboardPage() {
  const projects = useProjectStore((s) => s.projects);
  const users = useAuthStore((s) => s.users);
  const currentUserId = useAuthStore((s) => s.currentUserId);
  const user = users.find((u) => u.id === currentUserId) ?? null;

  const hasAccess = usePaymentStore((s) => s.hasActiveAccess(currentUserId ?? ""));
  const latestOrder = usePaymentStore((s) =>
    currentUserId
      ? [...s.orders]
          .filter((o) => o.userId === currentUserId)
          .sort((a, b) => b.createdAt.localeCompare(a.createdAt))[0] ?? null
      : null
  );

  const myProjects = user
    ? [...projects].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    : [];
  const chapters = myProjects.reduce((n, p) => n + p.chapters.length, 0);
  const references = myProjects.reduce((n, p) => n + p.references.length, 0);
  const today = new Date().toLocaleDateString("en-NG", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const stats = [
    { label: "Projects", value: myProjects.length, icon: BookOpen },
    { label: "Chapters written", value: chapters, icon: FileText },
    { label: "References saved", value: references, icon: Quote },
  ];

  const recentActivity = myProjects
    .flatMap((p) =>
      p.chapters.map((c) => ({ project: p, chapter: c }))
    )
    .sort((a, b) => b.chapter.updatedAt.localeCompare(a.chapter.updatedAt))
    .slice(0, 6);

  const greeting =
    new Date().getHours() < 12
      ? "Good morning"
      : new Date().getHours() < 18
        ? "Good afternoon"
        : "Good evening";

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-muted-foreground text-sm">{today}</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
            {greeting}, {user?.firstName ?? "researcher"} 👋
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            {myProjects.length === 0
              ? "Ready to turn your research idea into a complete project?"
              : `You have ${myProjects.length} ${
                  myProjects.length === 1 ? "project" : "projects"
                } in your workspace.`}
          </p>
        </div>
        <Button asChild size="lg">
          <Link href="/user/projects/new">
            <Plus className="size-4" /> New project
          </Link>
        </Button>
      </div>

      {!hasAccess && (
        <Card className="border-primary/30 bg-gradient-to-br from-primary/[0.08] to-accent/[0.06] py-5">
          <CardContent className="flex flex-col gap-4 px-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-lg">
                <Sparkles className="size-5" />
              </div>
              <div>
                <p className="font-semibold">Unlock full access</p>
                <p className="text-muted-foreground text-sm">
                  {latestOrder && latestOrder.status === "pending"
                    ? `Your ${latestOrder.gateway.toUpperCase()} payment is being verified.`
                    : "Pay once with OPay, Moniepoint or Paystack and write without limits."}
                </p>
              </div>
            </div>
            <Button asChild>
              <Link href="/user/billing">
                <CreditCard className="size-4" /> Billing
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <Card key={s.label} className="gap-2 py-5">
            <CardContent className="flex items-center gap-4 px-6">
              <div className="bg-primary/10 text-primary flex size-11 items-center justify-center rounded-lg">
                <s.icon className="size-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{s.value}</p>
                <p className="text-muted-foreground text-sm">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent projects</CardTitle>
              <CardDescription>Continue where you left off</CardDescription>
            </div>
            <Button asChild variant="ghost" size="sm">
              <Link href="/user/projects">
                View all <ArrowRight className="size-3" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {myProjects.length === 0 ? (
              <div className="border-border/60 flex flex-col items-center gap-3 rounded-lg border border-dashed py-12 text-center">
                <BookText className="text-muted-foreground size-10" />
                <p className="text-muted-foreground text-sm">
                  No projects yet. Create your first research project in
                  minutes.
                </p>
                <Button asChild size="sm">
                  <Link href="/user/projects/new">
                    <Plus className="size-4" /> New project
                  </Link>
                </Button>
              </div>
            ) : (
              <ul className="divide-y">
                {myProjects.slice(0, 4).map((p) => {
                  const progress = Math.min(
                    100,
                    Math.round((p.chapters.length / 5) * 100)
                  );
                  return (
                    <li
                      key={p.id}
                      className="flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="truncate font-medium">{p.title}</p>
                          <Badge variant="secondary" className="capitalize">
                            {p.status}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground mt-0.5 truncate text-sm">
                          {p.topic}
                        </p>
                        <div className="mt-2 flex items-center gap-3">
                          <Progress value={progress} className="h-1.5 w-40" />
                          <span className="text-muted-foreground text-xs">
                            {p.chapters.length} chapter
                            {p.chapters.length === 1 ? "" : "s"}
                          </span>
                        </div>
                      </div>
                      <Button asChild variant="outline" size="sm" className="shrink-0">
                        <Link href={`/user/projects/${p.id}`}>
                          Continue <ArrowRight className="size-3" />
                        </Link>
                      </Button>
                    </li>
                  );
                })}
              </ul>
            )}
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Quick actions</CardTitle>
              <CardDescription>Jump straight in</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-2">
              <Button asChild>
                <Link href="/user/projects/new">
                  <Plus className="size-4" /> New project
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/user/journals">
                  <Quote className="size-4" /> Journal search
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/user/templates">
                  <FileText className="size-4" /> Templates
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/user/billing">
                  <CreditCard className="size-4" /> Billing
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="size-4" /> Recent activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              {recentActivity.length === 0 ? (
                <p className="text-muted-foreground text-sm">
                  Nothing yet — your chapter edits will show up here.
                </p>
              ) : (
                <ul className="space-y-3">
                  {recentActivity.map(({ project, chapter }) => (
                    <li key={chapter.id} className="flex gap-3 text-sm">
                      <BookText className="text-primary mt-0.5 size-4 shrink-0" />
                      <div className="min-w-0">
                        <p className="truncate font-medium">
                          {chapter.title}
                        </p>
                        <p className="text-muted-foreground truncate text-xs">
                          {project.title} ·{" "}
                          {new Date(chapter.updatedAt).toLocaleDateString(
                            "en-NG",
                            { day: "numeric", month: "short" }
                          )}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>

          {user?.role === "admin" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShieldCheck className="size-4" /> Admin
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/admin/dashboard">Open Admin Panel</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
