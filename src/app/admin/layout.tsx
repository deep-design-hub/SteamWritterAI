"use client";

import { usePathname, useRouter } from "next/navigation";
import * as React from "react";

import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminHeader } from "@/components/admin/admin-header";
import { useAuthStore } from "@/store/useAuthStore";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const users = useAuthStore((s) => s.users);
  const currentUserId = useAuthStore((s) => s.currentUserId);
  const isClient = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const isAdmin =
    isClient && isAuthenticated()
      ? users.find((u) => u.id === currentUserId)?.role === "admin"
      : false;

  const isLoginPage = pathname?.startsWith("/admin/login");
  const isPageBuilder = pathname?.startsWith("/admin/page-builder");
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    if (isClient && !isLoginPage && (!isAuthenticated() || !isAdmin)) {
      router.replace("/admin/login");
    }
  }, [isClient, router, isAuthenticated, isAdmin, isLoginPage]);

  if (!isClient || (!isAdmin && !isLoginPage)) return null;

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className={isPageBuilder ? "h-screen overflow-hidden" : "flex min-h-svh bg-muted/30"}>
      {isPageBuilder ? (
        <div className="h-full w-full">{children}</div>
      ) : (
        <>
      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <div className="sticky top-0 h-screen">
          <AdminSidebar />
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 z-50">
            <AdminSidebar onClose={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      {/* Main content area */}
      <div className="flex min-w-0 flex-1 flex-col">
        <AdminHeader onMenuToggle={() => setMobileOpen((v) => !v)} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl space-y-6">
            {children}
          </div>
        </main>
      </div>
        </>
      )}
    </div>
  );
}
