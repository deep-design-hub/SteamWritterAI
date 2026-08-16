"use client";

import * as React from "react";
import { toast } from "sonner";
import {
  User,
  Mail,
  Lock,
  Bell,
  Palette,
  Shield,
  Save,
  Eye,
  EyeOff,
  CheckCircle,
  Settings,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAuthStore } from "@/store/useAuthStore";

export default function SettingsPage() {
  const users = useAuthStore((s) => s.users);
  const currentUserId = useAuthStore((s) => s.currentUserId);
  const user = users.find((u) => u.id === currentUserId) ?? null;

  const [firstName, setFirstName] = React.useState(user?.firstName ?? "");
  const [lastName, setLastName] = React.useState(user?.lastName ?? "");
  const [email, setEmail] = React.useState(user?.email ?? "");
  const [currentPass, setCurrentPass] = React.useState("");
  const [newPass, setNewPass] = React.useState("");
  const [confirmPass, setConfirmPass] = React.useState("");
  const [showPass, setShowPass] = React.useState(false);
  const [emailNotifications, setEmailNotifications] = React.useState(true);
  const [projectUpdates, setProjectUpdates] = React.useState(true);

  function saveProfile() {
    toast.success("Profile updated successfully.");
  }

  function savePassword() {
    if (newPass !== confirmPass) {
      toast.error("Passwords do not match.");
      return;
    }
    if (newPass.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }
    toast.success("Password changed successfully.");
    setCurrentPass("");
    setNewPass("");
    setConfirmPass("");
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Manage your account, preferences and security.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <User className="text-primary size-4" />
                <CardTitle className="text-base">Profile</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label>First Name</Label>
                  <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>Last Name</Label>
                  <Input value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>Email</Label>
                <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
              </div>
              {user?.emailVerified !== false && (
                <div className="flex items-center gap-1.5 text-xs text-green-600">
                  <CheckCircle className="size-3.5" /> Email verified
                </div>
              )}
              {user?.emailVerified === false && (
                <div className="flex items-center gap-1.5 text-xs text-amber-600">
                  <Mail className="size-3.5" /> Email not verified — check your inbox
                </div>
              )}
              <div className="flex justify-end">
                <Button size="sm" onClick={saveProfile}>
                  <Save className="mr-1.5 size-3.5" /> Save Profile
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Password */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Lock className="text-primary size-4" />
                <CardTitle className="text-base">Change Password</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label>Current Password</Label>
                <div className="relative">
                  <Input
                    type={showPass ? "text" : "password"}
                    value={currentPass}
                    onChange={(e) => setCurrentPass(e.target.value)}
                    placeholder="Enter current password"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label>New Password</Label>
                  <Input
                    type={showPass ? "text" : "password"}
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                    placeholder="Min 6 characters"
                    minLength={6}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Confirm Password</Label>
                  <Input
                    type={showPass ? "text" : "password"}
                    value={confirmPass}
                    onChange={(e) => setConfirmPass(e.target.value)}
                    placeholder="Repeat password"
                    minLength={6}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="text-muted-foreground flex items-center gap-1.5 text-xs hover:text-foreground"
                >
                  {showPass ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
                  {showPass ? "Hide" : "Show"} passwords
                </button>
                <Button size="sm" onClick={savePassword}>
                  <Lock className="mr-1.5 size-3.5" /> Update Password
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bell className="text-primary size-4" />
                <CardTitle className="text-base">Notifications</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p className="text-sm font-medium">Email Notifications</p>
                  <p className="text-muted-foreground text-xs">Receive updates about your projects via email.</p>
                </div>
                <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
              </div>
              <div className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p className="text-sm font-medium">Project Updates</p>
                  <p className="text-muted-foreground text-xs">Get notified when chapter generation completes.</p>
                </div>
                <Switch checked={projectUpdates} onCheckedChange={setProjectUpdates} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar column */}
        <div className="space-y-6">
          {/* Account info */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="text-primary size-4" />
                <CardTitle className="text-base">Account</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Role</span>
                <span className="font-medium capitalize">{user?.role ?? "—"}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Joined</span>
                <span className="font-medium">
                  {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—"}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">User ID</span>
                <span className="font-mono text-[11px]">{user?.id ?? "—"}</span>
              </div>
            </CardContent>
          </Card>

          {/* Appearance */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Palette className="text-primary size-4" />
                <CardTitle className="text-base">Appearance</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <span className="text-sm">Dark / Light mode</span>
              <ThemeToggle />
            </CardContent>
          </Card>

          {/* About */}
          <Card>
            <CardContent className="pt-6 text-center">
              <Settings className="mx-auto size-6 text-muted-foreground" />
              <p className="mt-2 text-xs text-muted-foreground">
                SteamWriterAi v0.1.0
              </p>
              <p className="text-muted-foreground mt-1 text-[11px]">
                AI Research Writing Suite
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
