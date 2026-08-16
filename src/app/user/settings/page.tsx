"use client";

import { Settings } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAuthStore } from "@/store/useAuthStore";

export default function SettingsPage() {
  const users = useAuthStore((s) => s.users);
  const currentUserId = useAuthStore((s) => s.currentUserId);
  const user = users.find((u) => u.id === currentUserId) ?? null;

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Account and application preferences.
        </p>
      </div>

      <Card className="gap-4 py-6">
        <CardHeader>
          <CardTitle className="text-base">Profile</CardTitle>
          <CardDescription>Your account details</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-2 text-sm">
          <p>
            <span className="text-muted-foreground">Name: </span>
            {user ? `${user.firstName} ${user.lastName}` : "—"}
          </p>
          <p>
            <span className="text-muted-foreground">Email: </span>
            {user?.email ?? "—"}
          </p>
          <p>
            <span className="text-muted-foreground">Role: </span>
            {user?.role ?? "—"}
          </p>
        </CardContent>
      </Card>

      <Card className="gap-4 py-6">
        <CardHeader>
          <CardTitle className="text-base">Appearance</CardTitle>
          <CardDescription>Theme preference</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <span className="text-sm">Dark / light mode</span>
          <ThemeToggle />
        </CardContent>
      </Card>

      <Card className="gap-4 py-6">
        <CardHeader>
          <CardTitle className="text-base">About</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground text-sm">
          <p>
            SteamWriterAi — AI Research Writing Suite. Currently running in
            localStorage mode: projects and accounts are stored only in this
            browser. A database (PostgreSQL) will replace this when Docker is
            available.
          </p>
          <Separator className="my-4" />
          <p className="flex items-center gap-2">
            <Settings className="size-4" />
            Version 0.1.0 — Foundation build
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
