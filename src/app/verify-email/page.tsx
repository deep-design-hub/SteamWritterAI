"use client";

import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import * as React from "react";
import { toast } from "sonner";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { useAuthStore } from "@/store/useAuthStore";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const [status, setStatus] = React.useState<"loading" | "success" | "error">("loading");
  const [errorMsg, setErrorMsg] = React.useState("");

  React.useEffect(() => {
    if (!token) {
      setStatus("error");
      setErrorMsg("No verification token provided.");
      return;
    }

    useAuthStore
      .getState()
      .verifyEmail(token)
      .then((res) => {
        if (res.ok) {
          setStatus("success");
          toast.success("Email verified! Welcome to SteamWriterAi.");
        } else {
          setStatus("error");
          setErrorMsg(res.error ?? "Verification failed.");
        }
      });
  }, [token]);

  return (
    <div className="relative flex min-h-svh items-center justify-center px-4">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(34,197,94,0.12),transparent)]" />
      </div>

      <div className="relative z-10 w-full max-w-md rounded-2xl border bg-card p-8 shadow-xl text-center">
        <Link href="/" className="mb-6 inline-flex items-center gap-2.5">
          <Logo className="size-7 text-sm" />
          <span className="text-base font-extrabold tracking-tight">SteamWriterAi</span>
        </Link>

        {status === "loading" && (
          <div className="mt-6 space-y-4">
            <Loader2 className="mx-auto size-10 animate-spin text-primary" />
            <h2 className="text-xl font-extrabold">Verifying your email…</h2>
            <p className="text-muted-foreground text-sm">Please wait a moment.</p>
          </div>
        )}

        {status === "success" && (
          <div className="mt-6 space-y-4">
            <CheckCircle className="mx-auto size-12 text-green-500" />
            <h2 className="text-xl font-extrabold">Email Verified!</h2>
            <p className="text-muted-foreground text-sm">
              Your account is now active. Welcome to SteamWriterAi.
            </p>
            <Button asChild className="mt-2 w-full">
              <Link href="/user/dashboard">Go to Dashboard</Link>
            </Button>
          </div>
        )}

        {status === "error" && (
          <div className="mt-6 space-y-4">
            <XCircle className="mx-auto size-12 text-red-500" />
            <h2 className="text-xl font-extrabold">Verification Failed</h2>
            <p className="text-muted-foreground text-sm">{errorMsg}</p>
            <Button asChild variant="outline" className="mt-2 w-full">
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
