"use client";

import { toast } from "sonner";
import { ArrowLeft, Mail, Send, Save, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useAdminSettingsStore } from "@/store/useAdminSettingsStore";

export default function MailSettingsPage() {
  const s = useAdminSettingsStore();
  const [host, setHost] = React.useState(s.smtpHost);
  const [port, setPort] = React.useState(String(s.smtpPort));
  const [user, setUser] = React.useState(s.smtpUser);
  const [fromName, setFromName] = React.useState(s.mailFromName);
  const [fromEmail, setFromEmail] = React.useState(s.mailFromEmail);
  const [testEmail, setTestEmail] = React.useState("");
  const [sending, setSending] = React.useState(false);
  const [testResult, setTestResult] = React.useState<"success" | "fail" | null>(null);

  function handleSave() {
    s.update({
      smtpHost: host,
      smtpPort: Number(port),
      smtpUser: user,
      smtpSecure: Number(port) === 465,
      mailFromName: fromName,
      mailFromEmail: fromEmail,
    });
    toast.success("Mail settings saved.");
  }

  async function sendTestEmail() {
    if (!testEmail) return;
    setSending(true);
    setTestResult(null);
    try {
      const res = await fetch("/api/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "welcome",
          to: testEmail,
          firstName: "Test",
        }),
      });
      setTestResult(res.ok ? "success" : "fail");
    } catch {
      setTestResult("fail");
    }
    setSending(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button asChild variant="ghost" size="icon" className="size-8">
          <Link href="/admin/settings"><ArrowLeft className="size-4" /></Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Mail Settings</h1>
          <p className="text-muted-foreground text-sm">Configure SMTP and email delivery.</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* SMTP config */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Mail className="text-primary size-4" />
              <CardTitle className="text-base">SMTP Configuration</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label>SMTP Host</Label>
              <Input value={host} onChange={(e) => setHost(e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Port</Label>
                <Input value={port} onChange={(e) => setPort(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>Security</Label>
                <Input value={Number(port) === 465 ? "SSL/TLS" : "STARTTLS"} readOnly className="bg-muted" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>SMTP Username</Label>
              <Input value={user} onChange={(e) => setUser(e.target.value)} />
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <p className="text-sm font-medium">TLS Certificate Check</p>
                <p className="text-muted-foreground text-xs">Reject unauthorized certificates.</p>
              </div>
              <Switch checked={false} />
            </div>
          </CardContent>
        </Card>

        {/* From + test */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Sender Identity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label>From Name</Label>
              <Input value={fromName} onChange={(e) => setFromName(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>From Email</Label>
              <Input value={fromEmail} onChange={(e) => setFromEmail(e.target.value)} type="email" />
            </div>

            <div className="border-t pt-4">
              <p className="mb-2 text-sm font-medium">Send Test Email</p>
              <div className="flex gap-2">
                <Input
                  placeholder="test@email.com"
                  value={testEmail}
                  onChange={(e) => setTestEmail(e.target.value)}
                  type="email"
                  className="flex-1"
                />
                <Button onClick={sendTestEmail} disabled={sending} variant="outline">
                  {sending ? "Sending…" : <><Send className="size-3.5" /> Test</>}
                </Button>
              </div>
              {testResult === "success" && (
                <p className="mt-2 flex items-center gap-1.5 text-xs text-green-600">
                  <CheckCircle className="size-3.5" /> Test email sent successfully.
                </p>
              )}
              {testResult === "fail" && (
                <p className="mt-2 flex items-center gap-1.5 text-xs text-red-600">
                  <XCircle className="size-3.5" /> Failed to send. Check SMTP credentials.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave}>
          <Save className="mr-1.5 size-4" /> Save Mail Settings
        </Button>
      </div>
    </div>
  );
}
