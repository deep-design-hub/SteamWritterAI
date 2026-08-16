"use client";

import { toast } from "sonner";
import { ArrowLeft, Shield, Save, Key, Clock, UserCheck, UserX } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useAdminSettingsStore } from "@/store/useAdminSettingsStore";

export default function SecuritySettingsPage() {
  const s = useAdminSettingsStore();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button asChild variant="ghost" size="icon" className="size-8">
          <Link href="/admin/settings"><ArrowLeft className="size-4" /></Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Authentication & Security</h1>
          <p className="text-muted-foreground text-sm">Control registration, verification, passwords and sessions.</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Email verification */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <UserCheck className="text-primary size-4" />
              <CardTitle className="text-base">Email Verification</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <p className="text-sm font-medium">Require Email Verification</p>
                <p className="text-muted-foreground text-xs">New users must verify their email before accessing the dashboard.</p>
              </div>
              <Switch
                checked={s.requireEmailVerification}
                onCheckedChange={(v) => s.update({ requireEmailVerification: v })}
              />
            </div>
            {s.requireEmailVerification && (
              <div className="rounded-lg border border-green-200 bg-green-50 p-3 text-xs text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-200">
                <p className="font-medium">Email verification is ON</p>
                <p className="mt-1">New users will receive a verification email and must click the link before logging in.</p>
              </div>
            )}
            {!s.requireEmailVerification && (
              <div className="rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground">
                Email verification is OFF. New accounts are immediately active.
              </div>
            )}
          </CardContent>
        </Card>

        {/* Registration */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <UserX className="text-primary size-4" />
              <CardTitle className="text-base">Registration Control</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <p className="text-sm font-medium">Allow Public Registration</p>
                <p className="text-muted-foreground text-xs">Show the sign-up form on the login page.</p>
              </div>
              <Switch
                checked={s.allowRegistration}
                onCheckedChange={(v) => s.update({ allowRegistration: v })}
              />
            </div>
            {!s.allowRegistration && (
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-200">
                Registration is disabled. Only existing users can log in.
              </div>
            )}
          </CardContent>
        </Card>

        {/* Password policy */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Key className="text-primary size-4" />
              <CardTitle className="text-base">Password Policy</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label>Minimum Password Length</Label>
              <Input
                type="number"
                min={4}
                max={32}
                value={s.passwordMinLength}
                onChange={(e) => s.update({ passwordMinLength: Number(e.target.value) })}
              />
            </div>
            <div className="rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground">
              <p>Hashing algorithm: SHA-256</p>
              <p>Salt prefix: <code>steamwriterai:</code></p>
            </div>
          </CardContent>
        </Card>

        {/* Session */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Clock className="text-primary size-4" />
              <CardTitle className="text-base">Session Management</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label>Session Timeout (minutes)</Label>
              <Input
                type="number"
                min={30}
                max={10080}
                value={s.sessionTimeoutMinutes}
                onChange={(e) => s.update({ sessionTimeoutMinutes: Number(e.target.value) })}
              />
              <p className="text-muted-foreground text-[11px]">
                Current: {Math.round(s.sessionTimeoutMinutes / 60)} hours ({s.sessionTimeoutMinutes} min)
              </p>
            </div>
            <div className="rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground">
              Sessions are stored in localStorage with key <code>steamwriterai-auth</code>.
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button onClick={() => toast.success("Security settings saved.")}>
          <Save className="mr-1.5 size-4" /> Save Security Settings
        </Button>
      </div>
    </div>
  );
}
