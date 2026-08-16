"use client";

import * as React from "react";
import { toast } from "sonner";
import { Save, Mail, Globe, Shield } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminSettingsPage() {
  const [smtpHost, setSmtpHost] = React.useState("smtp.gmail.com");
  const [smtpPort, setSmtpPort] = React.useState("587");
  const [smtpUser, setSmtpUser] = React.useState("steamwriterai@gmail.com");
  const [smtpPass, setSmtpPass] = React.useState("");
  const [siteName, setSiteName] = React.useState("SteamWriterAi");
  const [siteUrl, setSiteUrl] = React.useState("https://steamwriterai.com");
  const [adminEmail, setAdminEmail] = React.useState("admin@steamwriterai.app");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Admin Settings</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Configure platform settings. Changes here affect the entire application.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* SMTP Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Mail className="text-primary size-4" />
              <CardTitle className="text-base">SMTP / Email</CardTitle>
            </div>
            <CardDescription>
              Configure outgoing email. Set these in <code>.env.local</code> for production.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label>SMTP Host</Label>
              <Input value={smtpHost} onChange={(e) => setSmtpHost(e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="grid gap-2">
                <Label>Port</Label>
                <Input value={smtpPort} onChange={(e) => setSmtpPort(e.target.value)} />
              </div>
              <div className="grid gap-2">
                <Label>Security</Label>
                <Input value={smtpPort === "465" ? "SSL/TLS" : "STARTTLS"} readOnly />
              </div>
            </div>
            <div className="grid gap-2">
              <Label>From Email</Label>
              <Input value={smtpUser} onChange={(e) => setSmtpUser(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label>App Password</Label>
              <Input
                type="password"
                value={smtpPass}
                onChange={(e) => setSmtpPass(e.target.value)}
                placeholder="Enter Gmail App Password"
              />
            </div>
            <p className="text-muted-foreground text-xs">
              SMTP credentials should be stored in <code>.env.local</code>, not here. This page shows the current configuration only.
            </p>
          </CardContent>
        </Card>

        {/* Site Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Globe className="text-primary size-4" />
              <CardTitle className="text-base">Site Settings</CardTitle>
            </div>
            <CardDescription>General platform configuration.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label>Site Name</Label>
              <Input value={siteName} onChange={(e) => setSiteName(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label>Site URL</Label>
              <Input value={siteUrl} onChange={(e) => setSiteUrl(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label>Admin Email</Label>
              <Input value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} />
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="text-primary size-4" />
              <CardTitle className="text-base">Security</CardTitle>
            </div>
            <CardDescription>Authentication and security settings.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border bg-muted/50 p-4">
              <p className="text-sm font-medium">Password Hashing</p>
              <p className="text-muted-foreground text-xs">SHA-256 with salt prefix: <code>steamwriterai:</code></p>
            </div>
            <div className="rounded-lg border bg-muted/50 p-4">
              <p className="text-sm font-medium">Session Storage</p>
              <p className="text-muted-foreground text-xs">localStorage with key: <code>steamwriterai-auth</code></p>
            </div>
            <div className="rounded-lg border bg-muted/50 p-4">
              <p className="text-sm font-medium">CORS</p>
              <p className="text-muted-foreground text-xs">Same-origin only. API routes require no external access.</p>
            </div>
          </CardContent>
        </Card>

        {/* Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Environment Variables</CardTitle>
            <CardDescription>
              Key server-side variables for production deployment.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg bg-muted p-4 font-mono text-xs space-y-1">
              <p><span className="text-muted-foreground"># AI</span></p>
              <p>AI_PROVIDER=ensemble</p>
              <p>OPENAI_API_KEY=sk-...</p>
              <p>ANTHROPIC_API_KEY=sk-ant-...</p>
              <p className="mt-2"><span className="text-muted-foreground"># SMTP</span></p>
              <p>SMTP_HOST=smtp.gmail.com</p>
              <p>SMTP_PORT=587</p>
              <p>SMTP_USER=steamwriterai@gmail.com</p>
              <p>SMTP_PASS=your-app-password</p>
              <p className="mt-2"><span className="text-muted-foreground"># Site</span></p>
              <p>NEXT_PUBLIC_SITE_URL=https://steamwriterai.com</p>
              <p>NEXT_PUBLIC_APP_URL=https://steamwriterai.com</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
