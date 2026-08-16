"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";
import { toast } from "sonner";
import { Mail, Lock, Eye, EyeOff, ShieldCheck, ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/logo";
import { useAuthStore } from "@/store/useAuthStore";

export default function AdminLoginPage() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);
  const users = useAuthStore((s) => s.users);
  const currentUserId = useAuthStore((s) => s.currentUserId);
  const [email, setEmail] = React.useState("admin@steamwriterai.app");
  const [password, setPassword] = React.useState("");
  const [showPass, setShowPass] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await login({ email, password });
    if (res.ok) {
      const user = users.find((u) => u.id === currentUserId);
      if (user?.role !== "admin") {
        toast.error("This is the admin login. Please use the student login instead.");
        setLoading(false);
        return;
      }
      toast.success(`Welcome back, ${user?.firstName ?? "admin"}!`);
      router.push("/admin/dashboard");
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
        <div className="mb-6 flex items-center gap-2.5">
          <Logo className="size-7 text-sm" />
          <span className="text-base font-extrabold tracking-tight">SteamWriterAi</span>
        </div>

        <div className="mb-1 flex items-center gap-2">
          <div className="bg-primary/10 text-primary flex size-9 items-center justify-center rounded-lg">
            <ShieldCheck className="size-5" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold">Admin Login</h2>
            <p className="text-xs text-muted-foreground">Authorised administrators only</p>
          </div>
        </div>

        <p className="mb-6 text-sm text-muted-foreground">
          This is separate from the student login.
        </p>

        <form onSubmit={onSubmit} className="grid gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="admin-email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Admin email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="admin-email"
                type="email"
                placeholder="admin@steamwriterai.app"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="h-11 pl-10 text-sm"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="admin-password" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="admin-password"
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
          <Button type="submit" className="h-11 w-full text-sm font-semibold" disabled={loading}>
            {loading ? "Signing in…" : "Sign in to admin"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Not an admin?{" "}
          <Link href="/login" className="text-primary font-medium hover:underline">
            Student login
          </Link>
        </p>

        <div className="mt-4 text-center">
          <Link href="/" className="text-muted-foreground inline-flex items-center gap-1.5 text-xs hover:text-foreground">
            <ArrowLeft className="size-3" /> Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
