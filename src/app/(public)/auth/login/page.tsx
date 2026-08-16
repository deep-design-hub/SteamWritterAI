"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";
import { toast } from "sonner";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/logo";
import { useAuthStore } from "@/store/useAuthStore";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPass, setShowPass] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await useAuthStore.getState().login({ email, password });
    if (res.ok) {
      const { users, currentUserId } = useAuthStore.getState();
      const user = users.find((u) => u.id === currentUserId);
      toast.success(`Welcome back, ${user?.firstName ?? "researcher"}!`);
      router.push(user?.role === "admin" ? "/admin/dashboard" : "/user/dashboard");
      return;
    }
    setLoading(false);
    toast.error(res.error ?? "Login failed.");
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

        <h2 className="text-2xl font-extrabold">Welcome back</h2>
        <p className="mb-6 text-sm text-muted-foreground">Sign in to continue your research.</p>

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
                autoComplete="email"
                className="h-11 pl-10 text-sm"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Password</Label>
              <Link
                href="/forgot-password"
                className="text-primary text-xs font-medium hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="password"
                type={showPass ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="h-11 pl-10 pr-10 text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPass ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-muted-foreground">
              <input type="checkbox" className="size-3.5 accent-primary" />
              Remember me
            </label>
          </div>

          {/* Demo credentials banner */}
          <div className="rounded-lg bg-primary/5 px-3 py-2 text-center text-[11px] font-medium text-primary">
            Demo: <strong>abubakarmusa09876@gmail.com</strong> / <strong>0000</strong>
          </div>

          <Button type="submit" className="h-11 w-full text-sm font-semibold" disabled={loading}>
            {loading ? "Logging in…" : "Log in"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          No account?{" "}
          <Link href="/register" className="text-primary font-medium hover:underline">
            Create one
          </Link>
        </p>
        <p className="mt-2 text-center text-xs text-muted-foreground">
          Admin?{" "}
          <Link href="/admin/login" className="text-primary font-medium hover:underline">
            Admin login page
          </Link>
        </p>
      </div>
    </div>
  );
}
