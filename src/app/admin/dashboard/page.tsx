"use client";

import * as React from "react";
import { toast } from "sonner";
import {
  Banknote,
  BookOpen,
  CheckCircle2,
  Clock,
  CreditCard,
  Users,
  XCircle,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuthStore } from "@/store/useAuthStore";
import { useProjectStore } from "@/store/useProjectStore";
import { usePaymentStore } from "@/store/usePaymentStore";
import { formatNaira } from "@/lib/payments";
import type { PaymentStatus } from "@/types";

export default function AdminDashboardPage() {
  const users = useAuthStore((s) => s.users);
  const projects = useProjectStore((s) => s.projects);
  const orders = usePaymentStore((s) => s.orders);
  const markPaid = usePaymentStore((s) => s.markPaid);
  const rejectOrder = usePaymentStore((s) => s.rejectOrder);

  const [filter, setFilter] = React.useState<"all" | PaymentStatus>("all");
  const [search, setSearch] = React.useState("");

  const paidOrders = orders.filter((o) => o.status === "paid");
  const pendingOrders = orders.filter((o) => o.status === "pending");
  const revenue = paidOrders.reduce((sum, o) => sum + o.amount, 0);

  const stats = [
    { label: "Registered users", value: users.length, icon: Users },
    { label: "Projects", value: projects.length, icon: BookOpen },
    {
      label: "Revenue (paid)",
      value: formatNaira(revenue),
      icon: Banknote,
    },
    {
      label: "Pending verifications",
      value: pendingOrders.length,
      icon: Clock,
    },
  ];

  const filtered = orders
    .filter((o) => (filter === "all" ? true : o.status === filter))
    .filter((o) =>
      search.trim()
        ? o.email.toLowerCase().includes(search.toLowerCase()) ||
          o.reference.toLowerCase().includes(search.toLowerCase())
        : true
    )
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Overview
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Platform health, revenue and payment verification.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="gap-2 py-5">
            <CardContent className="flex items-center gap-4 px-6">
              <div className="bg-primary/10 text-primary flex size-11 items-center justify-center rounded-lg">
                <s.icon className="size-5" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-2xl font-bold">{s.value}</p>
                <p className="text-muted-foreground text-sm">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Orders</CardTitle>
              <CardDescription>
                Verify bank transfers and review activity
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Input
                placeholder="Search email or reference…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-9 w-44"
              />
              <Select
                value={filter}
                onValueChange={(v) =>
                  setFilter(v as "all" | PaymentStatus)
                }
              >
                <SelectTrigger className="h-9 w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center gap-2 py-12 text-center">
                <CreditCard className="text-muted-foreground size-8" />
                <p className="text-muted-foreground text-sm">
                  No orders match your filters.
                </p>
              </div>
            ) : (
              <ul className="divide-y">
                {filtered.map((order) => (
                  <li
                    key={order.id}
                    className="flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="min-w-0">
                      <p className="flex flex-wrap items-center gap-2 text-sm font-medium">
                        {order.name}
                        <Badge
                          variant="secondary"
                          className="capitalize"
                        >
                          {order.gateway}
                        </Badge>
                        <Badge
                          variant={
                            order.status === "paid"
                              ? "default"
                              : order.status === "rejected"
                                ? "destructive"
                                : "outline"
                          }
                          className="capitalize"
                        >
                          {order.status}
                        </Badge>
                      </p>
                      <p className="text-muted-foreground truncate text-xs">
                        {order.email} ·{" "}
                        <span className="font-mono">{order.reference}</span> ·{" "}
                        {new Date(order.createdAt).toLocaleString()}
                      </p>
                      {order.note && (
                        <p className="text-muted-foreground mt-1 text-xs italic">
                          {order.note}
                        </p>
                      )}
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <span className="font-semibold">
                        {formatNaira(order.amount)}
                      </span>
                      {order.status === "pending" && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => {
                              markPaid(order.id);
                              toast.success(
                                `Payment ${order.reference} marked as paid.`
                              );
                            }}
                          >
                            <CheckCircle2 className="size-4" /> Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              rejectOrder(
                                order.id,
                                "Rejected by admin"
                              );
                              toast.info(
                                `Payment ${order.reference} rejected.`
                              );
                            }}
                          >
                            <XCircle className="size-4" /> Reject
                          </Button>
                        </>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gateway breakdown</CardTitle>
              <CardDescription>Share of confirmed payments</CardDescription>
            </CardHeader>
            <CardContent>
              {paidOrders.length === 0 ? (
                <p className="text-muted-foreground text-sm">
                  No confirmed payments yet.
                </p>
              ) : (
                <ul className="space-y-3">
                  {(["opay", "paystack", "moniepoint"] as const).map((g) => {
                    const total = paidOrders
                      .filter((o) => o.gateway === g)
                      .reduce((sum, o) => sum + o.amount, 0);
                    return (
                      <li
                        key={g}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="capitalize">{g}</span>
                        <span className="text-muted-foreground">
                          {formatNaira(total)}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent users</CardTitle>
              <CardDescription>Latest signups</CardDescription>
            </CardHeader>
            <CardContent>
              {users.filter((u) => u.role !== "admin").length === 0 ? (
                <p className="text-muted-foreground text-sm">
                  No registered users yet.
                </p>
              ) : (
                <ul className="space-y-3">
                  {[...users]
                    .filter((u) => u.role !== "admin")
                    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
                    .slice(0, 5)
                    .map((u) => (
                      <li key={u.id} className="flex items-center gap-3 text-sm">
                        <div className="bg-primary/10 text-primary flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-bold">
                          {u.firstName[0]?.toUpperCase()}
                          {u.lastName[0]?.toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate font-medium">
                            {u.firstName} {u.lastName}
                          </p>
                          <p className="text-muted-foreground truncate text-xs">
                            {u.email}
                          </p>
                        </div>
                      </li>
                    ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
