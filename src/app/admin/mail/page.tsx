"use client";

import * as React from "react";
import { toast } from "sonner";
import { CheckCircle2, Mail, Send, XCircle, Loader2 } from "lucide-react";

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
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

interface TestResult {
  to: string;
  subject: string;
  status: "success" | "error" | "sending";
  timestamp: string;
}

export default function MailTesterPage() {
  const [to, setTo] = React.useState("steamwriterai@gmail.com");
  const [subject, setSubject] = React.useState("SteamWriterAi — Mail Test");
  const [body, setBody] = React.useState(
    "<h2>Test Email</h2><p>This is a test email from <strong>SteamWriterAi</strong> admin panel.</p><p>If you received this, your SMTP configuration is working correctly.</p>"
  );
  const [loading, setLoading] = React.useState(false);
  const [history, setHistory] = React.useState<TestResult[]>([]);

  async function sendTest(e: React.FormEvent) {
    e.preventDefault();
    if (!to.trim()) {
      toast.error("Enter a recipient email.");
      return;
    }
    setLoading(true);
    const entry: TestResult = {
      to,
      subject,
      status: "sending",
      timestamp: new Date().toLocaleTimeString(),
    };
    setHistory((h) => [entry, ...h]);

    try {
      const res = await fetch("/api/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "welcome", to: to.trim(), firstName: "Test" }),
      });
      const data = await res.json();
      if (res.ok) {
        setHistory((h) =>
          h.map((r) => (r.timestamp === entry.timestamp ? { ...r, status: "success" as const } : r))
        );
        toast.success("Test email sent!");
      } else {
        setHistory((h) =>
          h.map((r) => (r.timestamp === entry.timestamp ? { ...r, status: "error" as const } : r))
        );
        toast.error(data.error || "Failed to send");
      }
    } catch {
      setHistory((h) =>
        h.map((r) => (r.timestamp === entry.timestamp ? { ...r, status: "error" as const } : r))
      );
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Mail Tester</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Send test emails to verify your SMTP configuration is working.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Form */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Mail className="text-primary size-5" />
                <CardTitle>Compose Test Email</CardTitle>
              </div>
              <CardDescription>
                SMTP: smtp.gmail.com:587 | From: steamwriterai@gmail.com
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={sendTest} className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="to">Recipient</Label>
                  <Input
                    id="to"
                    type="email"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    placeholder="recipient@example.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>HTML Body (preview)</Label>
                  <div
                    className="rounded-lg border bg-muted/50 p-4 text-sm"
                    dangerouslySetInnerHTML={{ __html: body }}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Quick Templates</Label>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setBody("<h2>Welcome!</h2><p>Your account is ready. Start writing!</p>")}
                    >
                      Welcome Email
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setBody("<h2>Password Reset</h2><p>Click <a href='#'>here</a> to reset your password.</p>")}
                    >
                      Password Reset
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setBody("<h2>Payment Confirmed</h2><p>Your payment has been verified. Plan: Standard.</p>")}
                    >
                      Payment Confirm
                    </Button>
                  </div>
                </div>
                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? (
                    <><Loader2 className="mr-2 size-4 animate-spin" /> Sending...</>
                  ) : (
                    <><Send className="mr-2 size-4" /> Send Test Email</>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* History */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Send History</CardTitle>
            </CardHeader>
            <CardContent>
              {history.length === 0 ? (
                <p className="text-muted-foreground text-center text-sm">No emails sent yet</p>
              ) : (
                <div className="space-y-2">
                  {history.map((h, i) => (
                    <div key={i} className="flex items-center gap-3 rounded-lg border px-3 py-2 text-sm">
                      {h.status === "success" && <CheckCircle2 className="size-4 text-green-500" />}
                      {h.status === "error" && <XCircle className="size-4 text-red-500" />}
                      {h.status === "sending" && <Loader2 className="size-4 animate-spin text-blue-500" />}
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-medium">{h.subject}</p>
                        <p className="text-muted-foreground truncate text-xs">{h.to}</p>
                      </div>
                      <span className="text-muted-foreground text-xs">{h.timestamp}</span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
