"use client";

import * as React from "react";
import { BarChart3, Users, CreditCard, FileText, TrendingUp } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "@/store/useAuthStore";
import { useProjectStore } from "@/store/useProjectStore";
import { usePaymentStore } from "@/store/usePaymentStore";

export default function AdminAnalyticsPage() {
  const users = useAuthStore((s) => s.users);
  const projects = useProjectStore((s) => s.projects);
  const orders = usePaymentStore((s) => s.orders);

  const totalRevenue = orders
    .filter((o) => o.status === "paid")
    .reduce((sum, o) => sum + o.amount, 0);

  const stats = [
    {
      label: "Total Users",
      value: users.length,
      icon: <Users className="size-5" />,
      color: "bg-primary/10 text-primary",
      change: "+2 this week",
    },
    {
      label: "Total Projects",
      value: projects.length,
      icon: <FileText className="size-5" />,
      color: "bg-blue-500/10 text-blue-600",
      change: `${projects.filter((p) => p.status === "completed").length} completed`,
    },
    {
      label: "Revenue",
      value: `₦${totalRevenue.toLocaleString()}`,
      icon: <CreditCard className="size-5" />,
      color: "bg-green-500/10 text-green-600",
      change: `${orders.filter((o) => o.status === "paid").length} payments`,
    },
    {
      label: "Conversion",
      value: users.length > 0 ? `${Math.round((orders.filter((o) => o.status === "paid").length / Math.max(users.filter((u) => u.role === "user").length, 1)) * 100)}%` : "0%",
      icon: <TrendingUp className="size-5" />,
      color: "bg-purple-500/10 text-purple-600",
      change: "of users paid",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Platform overview and key metrics.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="flex items-center gap-4 py-4">
              <div className={`flex size-12 items-center justify-center rounded-xl ${stat.color}`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-muted-foreground text-xs">{stat.label}</p>
                <p className="text-muted-foreground mt-0.5 text-[10px]">{stat.change}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent projects */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Recent Projects</CardTitle>
          </CardHeader>
          <CardContent>
            {projects.length === 0 ? (
              <p className="text-muted-foreground py-4 text-center text-sm">No projects yet</p>
            ) : (
              <div className="space-y-3">
                {projects.slice(0, 5).map((p) => (
                  <div key={p.id} className="flex items-center justify-between rounded-lg border px-3 py-2">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{p.title}</p>
                      <p className="text-muted-foreground text-xs">{p.topic}</p>
                    </div>
                    <span className="text-muted-foreground ml-2 text-xs capitalize">{p.status}</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent payments */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Recent Payments</CardTitle>
          </CardHeader>
          <CardContent>
            {orders.length === 0 ? (
              <p className="text-muted-foreground py-4 text-center text-sm">No payments yet</p>
            ) : (
              <div className="space-y-3">
                {orders.slice(0, 5).map((o) => (
                  <div key={o.id} className="flex items-center justify-between rounded-lg border px-3 py-2">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">{o.name}</p>
                      <p className="text-muted-foreground text-xs">{o.email}</p>
                    </div>
                    <div className="ml-2 text-right">
                      <p className="text-sm font-medium">₦{o.amount.toLocaleString()}</p>
                      <p className={`text-xs capitalize ${o.status === "paid" ? "text-green-600" : o.status === "rejected" ? "text-red-500" : "text-yellow-600"}`}>
                        {o.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
