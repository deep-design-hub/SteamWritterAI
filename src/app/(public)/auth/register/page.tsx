"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";
import { toast } from "sonner";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/logo";
import { useAuthStore } from "@/store/useAuthStore";
import { useAdminSettingsStore } from "@/store/useAdminSettingsStore";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPass, setShowPass] = React.useState(false);
  const [showPass2, setShowPass2] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    setLoading(true);
    const requireVerification = useAdminSettingsStore.getState().requireEmailVerification;
    const res = await useAuthStore.getState().register({
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      password: form.password,
      requireVerification,
    });
    setLoading(false);
    if (!res.ok) {
      toast.error(res.error ?? "Registration failed.");
      return;
    }
    if (res.needsVerification) {
      toast.success("Verification email sent! Please check your inbox to activate your account.");
      router.push("/login");
      return;
    }
    toast.success("Account created. Welcome to SteamWriterAi!");
    router.push("/user/dashboard");
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

        <h2 className="text-2xl font-extrabold">Create your account</h2>
        <p className="mb-6 text-sm text-muted-foreground">Join thousands of researchers using SteamWriterAi.</p>

        <form onSubmit={onSubmit} className="grid gap-3.5">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">First name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="John"
                  value={form.firstName}
                  onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                  required
                  className="h-10 pl-10 text-sm"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Last name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Doe"
                  value={form.lastName}
                  onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                  required
                  className="h-10 pl-10 text-sm"
                />
              </div>
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="email"
                placeholder="you@university.edu.ng"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                autoComplete="email"
                className="h-10 pl-10 text-sm"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type={showPass ? "text" : "password"}
                placeholder="Min 6 characters"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                minLength={6}
                autoComplete="new-password"
                className="h-10 pl-10 pr-10 text-sm"
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
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Confirm Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type={showPass2 ? "text" : "password"}
                placeholder="Repeat password"
                value={form.confirmPassword}
                onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                required
                minLength={6}
                autoComplete="new-password"
                className="h-10 pl-10 pr-10 text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPass2(!showPass2)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPass2 ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-start gap-2 text-xs text-muted-foreground">
            <input type="checkbox" required className="mt-0.5 size-3.5 accent-primary" />
            <span>
              I agree to the{" "}
              <Link href="/terms" className="text-primary font-medium hover:underline">
                Terms
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-primary font-medium hover:underline">
                Privacy Policy
              </Link>
            </span>
          </div>

          <Button type="submit" className="h-10 w-full text-sm font-semibold" disabled={loading}>
            {loading ? "Creating account…" : "Create account"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="text-primary font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
