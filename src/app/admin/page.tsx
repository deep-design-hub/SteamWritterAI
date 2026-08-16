"use client";

import { useRouter } from "next/navigation";
import * as React from "react";

import { useAuthStore } from "@/store/useAuthStore";

export default function AdminIndexPage() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const users = useAuthStore((s) => s.users);
  const currentUserId = useAuthStore((s) => s.currentUserId);
  const isClient = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  React.useEffect(() => {
    if (!isClient) return;
    if (!isAuthenticated()) {
      router.replace("/admin/login");
      return;
    }
    const user = users.find((u) => u.id === currentUserId);
    if (user?.role !== "admin") {
      router.replace("/admin/login");
      return;
    }
    router.replace("/admin/dashboard");
  }, [isClient, router, isAuthenticated, users, currentUserId]);

  return null;
}
