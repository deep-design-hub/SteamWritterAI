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

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  defaultTab?: "login" | "register";
}

export function AuthModal({ open, onClose, defaultTab = "login" }: AuthModalProps) {
  const router = useRouter();

  const [tab, setTab] = React.useState(defaultTab);
  const [loginEmail, setLoginEmail] = React.useState("");
  const [loginPassword, setLoginPassword] = React.useState("");
  const [showLoginPass, setShowLoginPass] = React.useState(false);
  const [regForm, setRegForm] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showRegPass, setShowRegPass] = React.useState(false);
  const [showRegPass2, setShowRegPass2] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setTab(defaultTab);
  }, [defaultTab, open]);

  if (!open) return null;

  function reset() {
    setLoginEmail("");
    setLoginPassword("");
    setRegForm({ firstName: "", lastName: "", email: "", password: "", confirmPassword: "" });
  }

  function handleClose() {
    reset();
    onClose();
  }

  async function onLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await useAuthStore.getState().login({ email: loginEmail, password: loginPassword });
    if (res.ok) {
      const { users, currentUserId } = useAuthStore.getState();
      const user = users.find((u) => u.id === currentUserId);
      toast.success(`Welcome back, ${user?.firstName ?? "researcher"}!`);
      handleClose();
      router.push(user?.role === "admin" ? "/admin/dashboard" : "/user/dashboard");
      return;
    }
    setLoading(false);
    toast.error(res.error ?? "Login failed.");
  }

  async function onRegister(e: React.FormEvent) {
    e.preventDefault();
    if (regForm.password !== regForm.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    setLoading(true);
    const res = await useAuthStore.getState().register({
      firstName: regForm.firstName,
      lastName: regForm.lastName,
      email: regForm.email,
      password: regForm.password,
    });
    setLoading(false);
    if (!res.ok) {
      toast.error(res.error ?? "Registration failed.");
      return;
    }
    toast.success("Account created. Welcome to SteamWriterAi!");
    handleClose();
    router.push("/user/dashboard");
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      {/* Background gradients */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(34,197,94,0.12),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_30%_at_80%_100%,rgba(139,92,246,0.08),transparent)]" />
      </div>

      <div
        className="relative w-full max-w-md rounded-2xl border bg-card p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-lg p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
        </button>

        {/* Logo */}
        <div className="mb-6 flex items-center gap-2.5">
          <Logo className="size-7 text-sm" />
          <span className="text-base font-extrabold tracking-tight">SteamWriterAi</span>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex gap-1 rounded-lg bg-muted p-1">
          <button
            onClick={() => setTab("login")}
            className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              tab === "login" ? "bg-card shadow-sm" : "text-muted-foreground"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setTab("register")}
            className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              tab === "register" ? "bg-card shadow-sm" : "text-muted-foreground"
            }`}
          >
            Create Account
          </button>
        </div>

        {tab === "login" ? (
          <>
            <h2 className="text-2xl font-extrabold">Welcome back</h2>
            <p className="mb-6 text-sm text-muted-foreground">Sign in to continue your research.</p>

            <form onSubmit={onLogin} className="grid gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="you@university.edu.ng"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                    autoComplete="email"
                    className="h-11 pl-10 text-sm"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type={showLoginPass ? "text" : "password"}
                    placeholder="Enter password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    className="h-11 pl-10 pr-10 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPass(!showLoginPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showLoginPass ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-muted-foreground">
                  <input type="checkbox" className="size-3.5 accent-primary" />
                  Remember me
                </label>
                <Link
                  href="/forgot-password"
                  className="text-primary font-medium hover:underline"
                  onClick={handleClose}
                >
                  Forgot password?
                </Link>
              </div>

              {/* Demo credentials banner */}
              <div className="rounded-lg bg-primary/5 px-3 py-2 text-center text-[11px] font-medium text-primary">
                Demo: <strong>abubakarmusa09876@gmail.com</strong> / <strong>0000</strong>
              </div>

              <Button type="submit" className="h-11 w-full text-sm font-semibold" disabled={loading}>
                {loading ? "Logging in…" : "Log in"}
              </Button>
            </form>

            <p className="mt-4 text-center text-xs text-muted-foreground">
              No account?{" "}
              <button onClick={() => setTab("register")} className="text-primary font-medium hover:underline">
                Create one
              </button>
            </p>
            <p className="mt-2 text-center text-xs text-muted-foreground">
              Admin?{" "}
              <Link href="/admin/login" onClick={handleClose} className="text-primary font-medium hover:underline">
                Admin login page
              </Link>
            </p>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-extrabold">Create your account</h2>
            <p className="mb-6 text-sm text-muted-foreground">Join thousands of researchers using SteamWriterAi.</p>

            <form onSubmit={onRegister} className="grid gap-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">First name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="John"
                      value={regForm.firstName}
                      onChange={(e) => setRegForm({ ...regForm, firstName: e.target.value })}
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
                      value={regForm.lastName}
                      onChange={(e) => setRegForm({ ...regForm, lastName: e.target.value })}
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
                    value={regForm.email}
                    onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
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
                    type={showRegPass ? "text" : "password"}
                    placeholder="Min 6 characters"
                    value={regForm.password}
                    onChange={(e) => setRegForm({ ...regForm, password: e.target.value })}
                    required
                    minLength={6}
                    autoComplete="new-password"
                    className="h-10 pl-10 pr-10 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowRegPass(!showRegPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showRegPass ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type={showRegPass2 ? "text" : "password"}
                    placeholder="Repeat password"
                    value={regForm.confirmPassword}
                    onChange={(e) => setRegForm({ ...regForm, confirmPassword: e.target.value })}
                    required
                    minLength={6}
                    autoComplete="new-password"
                    className="h-10 pl-10 pr-10 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowRegPass2(!showRegPass2)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showRegPass2 ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-2 text-xs text-muted-foreground">
                <input type="checkbox" required className="mt-0.5 size-3.5 accent-primary" />
                <span>
                  I agree to the{" "}
                  <Link href="/terms" className="text-primary font-medium hover:underline" onClick={handleClose}>
                    Terms
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-primary font-medium hover:underline" onClick={handleClose}>
                    Privacy Policy
                  </Link>
                </span>
              </div>

              <Button type="submit" className="h-10 w-full text-sm font-semibold" disabled={loading}>
                {loading ? "Creating…" : "Create account"}
              </Button>
            </form>

            <p className="mt-4 text-center text-xs text-muted-foreground">
              Already have an account?{" "}
              <button onClick={() => setTab("login")} className="text-primary font-medium hover:underline">
                Sign in
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
