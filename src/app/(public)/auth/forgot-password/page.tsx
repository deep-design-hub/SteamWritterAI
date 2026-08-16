"use client";

import Link from "next/link";
import * as React from "react";
import { toast } from "sonner";
import { Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/logo";
import { useAuthStore } from "@/store/useAuthStore";

export default function ForgotPasswordPage() {
  const users = useAuthStore((s) => s.users);
  const [email, setEmail] = React.useState("");
  const [sent, setSent] = React.useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const exists = users.some(
      (u) => u.email === email.trim().toLowerCase()
    );
    void exists;
    setSent(true);
    toast.success("If that email exists, a reset link has been sent.");
  }

  return (
    <div className="relative flex min-h-svh items-center justify-center px-4">
      {/* Background gradients */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(34,197,94,0.12),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_30%_at_80%_100%,rgba(139,92,246,0.08),transparent)]" />
      </div>

      <div className="relative z-10 w-full max-w-md rounded-2xl border bg-card p-8 shadow-xl">
        <Link href="/" className="mb-6 inline-flex items-center gap-2.5">
          <Logo className="size-7 text-sm" />
          <span className="text-base font-extrabold tracking-tight">SteamWriterAi</span>
        </Link>

        <h2 className="text-2xl font-extrabold">Reset your password</h2>
        <p className="mb-6 text-sm text-muted-foreground">Enter your email and we will send you a reset link.</p>

        {sent ? (
          <div className="grid gap-4 text-center text-sm text-muted-foreground">
            <p>
              If an account exists for <span className="font-medium">{email}</span>,
              a password reset link has been sent.
            </p>
            <p className="text-xs text-muted-foreground/70">
              (Email delivery is a placeholder while the app runs without a backend.)
            </p>
            <Button asChild variant="outline" className="mt-2">
              <Link href="/login">Back to login</Link>
            </Button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="grid gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@university.edu.ng"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-11 pl-10 text-sm"
                />
              </div>
            </div>
            <Button type="submit" className="h-11 w-full text-sm font-semibold">
              Send reset link
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Remembered it?{" "}
              <Link href="/login" className="text-primary font-medium hover:underline">
                Log in
              </Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
