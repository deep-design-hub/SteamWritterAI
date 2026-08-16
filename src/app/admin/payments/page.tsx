"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import {
  CheckCircle2,
  Clock,
  CreditCard,
  XCircle,
  Banknote,
  Search,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePaymentStore } from "@/store/usePaymentStore";

function PaymentsContent() {
  const searchParams = useSearchParams();
  const filterParam = searchParams.get("filter") || "all";
  const orders = usePaymentStore((s) => s.orders);
  const markPaid = usePaymentStore((s) => s.markPaid);
  const rejectOrder = usePaymentStore((s) => s.rejectOrder);
  const [filter, setFilter] = React.useState(filterParam);

  React.useEffect(() => {
    setFilter(filterParam);
  }, [filterParam]);

  const filtered = orders.filter((o) => {
    if (filter === "pending") return o.status === "pending";
    if (filter === "verified") return o.status === "paid";
    if (filter === "rejected") return o.status === "rejected";
    return true;
  });

  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    verified: orders.filter((o) => o.status === "paid").length,
    rejected: orders.filter((o) => o.status === "rejected").length,
    revenue: orders
      .filter((o) => o.status === "paid")
      .reduce((sum, o) => sum + o.amount, 0),
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Payment Management</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Review and verify payment orders.
          </p>
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Payments</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="verified">Verified</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-3 py-4">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
              <CreditCard className="text-primary size-5" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.total}</p>
              <p className="text-muted-foreground text-xs">Total Orders</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 py-4">
            <div className="flex size-10 items-center justify-center rounded-lg bg-yellow-500/10">
              <Clock className="size-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.pending}</p>
              <p className="text-muted-foreground text-xs">Pending</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 py-4">
            <div className="flex size-10 items-center justify-center rounded-lg bg-green-500/10">
              <CheckCircle2 className="size-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.verified}</p>
              <p className="text-muted-foreground text-xs">Verified</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 py-4">
            <div className="flex size-10 items-center justify-center rounded-lg bg-green-500/10">
              <Banknote className="size-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">₦{stats.revenue.toLocaleString()}</p>
              <p className="text-muted-foreground text-xs">Revenue</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payments table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">
            {filter === "all" ? "All Payments" : `${filter.charAt(0).toUpperCase() + filter.slice(1)} Payments`}
            <Badge variant="secondary" className="ml-2">{filtered.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-muted-foreground">
                  <th className="pb-3 font-medium">User</th>
                  <th className="pb-3 font-medium">Plan</th>
                  <th className="pb-3 font-medium">Amount</th>
                  <th className="pb-3 font-medium">Gateway</th>
                  <th className="pb-3 font-medium">Reference</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((order) => (
                  <tr key={order.id} className="border-b last:border-0">
                    <td className="py-3">
                      <div>
                        <p className="font-medium">{order.name}</p>
                        <p className="text-muted-foreground text-xs">{order.email}</p>
                      </div>
                    </td>
                    <td className="text-muted-foreground py-3 capitalize">{order.plan}</td>
                    <td className="py-3 font-medium">₦{order.amount.toLocaleString()}</td>
                    <td className="text-muted-foreground py-3 capitalize">{order.gateway}</td>
                    <td className="text-muted-foreground py-3 font-mono text-xs">{order.reference}</td>
                    <td className="text-muted-foreground py-3 text-xs">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3">
                      <Badge
                        variant={
                          order.status === "paid"
                            ? "default"
                            : order.status === "rejected"
                            ? "destructive"
                            : "secondary"
                        }
                      >
                        {order.status === "paid" && <CheckCircle2 className="mr-1 size-3" />}
                        {order.status === "pending" && <Clock className="mr-1 size-3" />}
                        {order.status === "rejected" && <XCircle className="mr-1 size-3" />}
                        {order.status}
                      </Badge>
                    </td>
                    <td className="py-3">
                      {order.status === "pending" && (
                        <div className="flex gap-1">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              markPaid(order.id);
                              toast.success("Payment verified");
                            }}
                          >
                            <CheckCircle2 className="size-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              rejectOrder(order.id);
                              toast.success("Payment rejected");
                            }}
                          >
                            <XCircle className="size-3 text-red-500" />
                          </Button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={8} className="text-muted-foreground py-8 text-center">
                      No payments match this filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function AdminPaymentsPage() {
  return (
    <React.Suspense fallback={<div className="text-muted-foreground py-8 text-center text-sm">Loading...</div>}>
      <PaymentsContent />
    </React.Suspense>
  );
}
