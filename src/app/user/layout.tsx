"use client";

import { useRouter } from "next/navigation";
import * as React from "react";

import { Sidebar } from "@/components/user/sidebar";
import { UserHeader } from "@/components/user/user-header";
import { useAuthStore } from "@/store/useAuthStore";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isClient = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  React.useEffect(() => {
    if (isClient && !isAuthenticated()) {
      router.replace("/login");
    }
  }, [isClient, router, isAuthenticated]);

  if (!isClient || !isAuthenticated()) {
    return null;
  }

  return (
    <div className="flex min-h-svh">
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute inset-y-0 left-0">
            <Sidebar onClose={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <UserHeader onMenuToggle={() => setMobileOpen((v) => !v)} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
