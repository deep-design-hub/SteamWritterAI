"use client";

import * as React from "react";
import { toast } from "sonner";
import { CheckCircle2, Copy, Landmark, Lock, Wallet } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useAuthStore } from "@/store/useAuthStore";
import { usePaymentStore } from "@/store/usePaymentStore";
import {
  GATEWAYS,
  formatNaira,
  gatewayById,
  loadPaystack,
  PLAN,
} from "@/lib/payments";
import type { PaymentGateway } from "@/types";

export default function BillingPage() {
  const users = useAuthStore((s) => s.users);
  const currentUserId = useAuthStore((s) => s.currentUserId);
  const user = users.find((u) => u.id === currentUserId) ?? null;

  const orders = usePaymentStore((s) => s.orders);
  const createOrder = usePaymentStore((s) => s.createOrder);
  const markPaid = usePaymentStore((s) => s.markPaid);
  const hasActiveAccess = usePaymentStore((s) => s.hasActiveAccess);

  const [pendingRef, setPendingRef] = React.useState<Record<string, string>>({});

  const myOrders = user
    ? orders
        .filter((o) => o.userId === user.id)
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    : [];

  const accessGranted = user ? hasActiveAccess(user.id) : false;

  if (!user) return null;

  const u = user;

  async function handlePaystack() {
    const gateway = gatewayById("paystack");
    if (!gateway.publicKey) {
      toast.error("Paystack is not configured yet. Please use OPay or Moniepoint.");
      return;
    }
    try {
      await loadPaystack();
    } catch {
      toast.error("Could not load Paystack. Please try OPay or Moniepoint.");
      return;
    }
    const order = createOrder({
      userId: u.id,
      email: u.email,
      name: `${u.firstName} ${u.lastName}`.trim(),
      gateway: "paystack",
      method: "card",
    });
    const popup = window.PaystackPop;
    if (!popup) {
      toast.error("Paystack is unavailable right now.");
      return;
    }
    popup
      .setup({
        key: gateway.publicKey,
        email: u.email,
        amount: PLAN.price * 100,
        currency: "NGN",
        ref: order.reference,
        metadata: { orderId: order.id, userId: u.id },
        onSuccess: () => {
          markPaid(order.id);
          toast.success("Payment confirmed — full access unlocked!");
          window.location.reload();
        },
        onCancel: () => {
          toast.info("Payment cancelled. You can retry anytime.");
        },
      })
      .openIframe();
  }

  function handleTransfer(gatewayId: PaymentGateway) {
    if (!u) return;
    const order = createOrder({
      userId: u.id,
      email: u.email,
      name: `${u.firstName} ${u.lastName}`.trim(),
      gateway: gatewayId,
      method: "bank-transfer",
    });
    setPendingRef((prev) => ({ ...prev, [gatewayId]: order.reference }));
    toast.success(
      "Reference generated. Make the transfer and our team will confirm your access."
    );
  }

  async function copyText(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard.");
    } catch {
      toast.error("Could not copy. Please copy manually.");
    }
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Billing
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Unlock full access with OPay, Moniepoint or Paystack.
          </p>
        </div>
        <Badge
          className={
            accessGranted
              ? "bg-emerald-600 text-white"
              : "bg-amber-500/15 text-amber-600"
          }
        >
          {accessGranted ? "Full access active" : "Access pending"}
        </Badge>
      </div>

      <Card className="border-primary/20 bg-primary/[0.03]">
        <CardContent className="flex flex-col gap-3 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 text-primary flex size-12 items-center justify-center rounded-xl">
              <Lock className="size-6" />
            </div>
            <div>
              <p className="font-semibold">{PLAN.name}</p>
              <p className="text-muted-foreground text-sm">
                One-time payment · all features, unlimited projects
              </p>
            </div>
          </div>
          <p className="text-3xl font-bold tracking-tight">
            {formatNaira(PLAN.price)}
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {GATEWAYS.map((gateway) => {
          const ref = pendingRef[gateway.id];
          return (
            <Card key={gateway.id} className="flex flex-col gap-3 py-5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wallet className="text-primary size-5" />
                  {gateway.name}
                </CardTitle>
                <CardDescription>{gateway.tagline}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col gap-4">
                <ul className="flex-1 space-y-2">
                  {gateway.steps.map((step, i) => (
                    <li key={i} className="flex gap-2 text-sm">
                      <span className="text-primary font-semibold">
                        {i + 1}.
                      </span>
                      <span className="text-muted-foreground">{step}</span>
                    </li>
                  ))}
                </ul>

                {gateway.method === "bank-transfer" && (
                  <div className="rounded-lg border bg-muted/40 p-3 text-sm">
                    <p className="text-muted-foreground flex items-center gap-1.5">
                      <Landmark className="size-4" /> {gateway.bankName}
                    </p>
                    <button
                      type="button"
                      onClick={() =>
                        copyText(gateway.accountNumber ?? "")
                      }
                      className="flex w-full items-center justify-between gap-2 rounded-md px-1 py-1.5 text-left hover:bg-muted"
                    >
                      <span className="text-muted-foreground">
                        Account no.
                      </span>
                      <span className="font-mono text-lg font-bold">
                        {gateway.accountNumber || "—"}
                      </span>
                    </button>
                    <p className="text-muted-foreground flex items-center justify-between gap-2">
                      <span>Account name</span>
                      <span className="text-foreground font-medium">
                        {gateway.accountName || "—"}
                      </span>
                    </p>
                  </div>
                )}

                {ref && (
                  <div className="flex items-center justify-between gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm">
                    <div className="min-w-0">
                      <p className="text-muted-foreground text-xs">
                        Your payment reference
                      </p>
                      <p className="truncate font-mono font-semibold">{ref}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8"
                      onClick={() => copyText(ref)}
                      aria-label="Copy reference"
                    >
                      <Copy className="size-4" />
                    </Button>
                  </div>
                )}

                {gateway.id === "paystack" ? (
                  <Button
                    className="w-full"
                    onClick={handlePaystack}
                    disabled={accessGranted}
                  >
                    Pay with Paystack
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => handleTransfer(gateway.id)}
                    disabled={accessGranted}
                  >
                    {ref ? "Regenerate reference" : "I've paid"}
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div>
        <h2 className="mb-3 text-lg font-semibold">Your payments</h2>
        {myOrders.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center gap-2 py-10 text-center">
              <CheckCircle2 className="text-muted-foreground size-8" />
              <p className="text-muted-foreground text-sm">
                No payments yet. Choose a gateway above to get started.
              </p>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="p-0">
              <ul className="divide-y">
                {myOrders.map((order) => (
                  <li
                    key={order.id}
                    className="flex items-center justify-between gap-3 px-4 py-3"
                  >
                    <div className="min-w-0">
                      <p className="flex items-center gap-2 text-sm font-medium">
                        {order.gateway.toUpperCase()}
                        <span className="text-muted-foreground font-mono text-xs">
                          {order.reference}
                        </span>
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {new Date(order.createdAt).toLocaleString()} ·{" "}
                        {formatNaira(order.amount)}
                      </p>
                    </div>
                    <Badge
                      variant={
                        order.status === "paid"
                          ? "default"
                          : order.status === "rejected"
                            ? "destructive"
                            : "secondary"
                      }
                      className="capitalize"
                    >
                      {order.status}
                    </Badge>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>

      <Separator />
      <p className="text-muted-foreground text-center text-xs">
        Payments are confirmed manually for OPay and Moniepoint transfers.
        Paystack payments activate instantly. Contact{" "}
        <span className="text-primary">admin@steamwriterai.app</span> if you need
        help.
      </p>
    </div>
  );
}
