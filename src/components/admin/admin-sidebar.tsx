"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import {
  BarChart3,
  ChevronDown,
  CreditCard,
  FileText,
  Globe,
  LayoutDashboard,
  LogOut,
  Mail,
  Settings,
  ShieldCheck,
  Users,
  X,
  Zap,
} from "lucide-react";

import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "@/components/ui/button";

interface AdminSidebarProps {
  onClose?: () => void;
}

interface NavItem {
  label: string;
  href?: string;
  icon: React.ReactNode;
  children?: { label: string; href: string }[];
}

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: <LayoutDashboard className="size-4" />,
  },
  {
    label: "Users",
    icon: <Users className="size-4" />,
    children: [
      { label: "All Users", href: "/admin/users" },
      { label: "Verified", href: "/admin/users?filter=verified" },
      { label: "Suspended", href: "/admin/users?filter=suspended" },
    ],
  },
  {
    label: "Payments",
    icon: <CreditCard className="size-4" />,
    children: [
      { label: "All Payments", href: "/admin/payments" },
      { label: "Pending", href: "/admin/payments?filter=pending" },
      { label: "Verified", href: "/admin/payments?filter=verified" },
      { label: "Rejected", href: "/admin/payments?filter=rejected" },
    ],
  },
  {
    label: "AI Models",
    href: "/admin/models",
    icon: <Zap className="size-4" />,
  },
  {
    label: "Page Builder",
    href: "/admin/page-builder",
    icon: <FileText className="size-4" />,
  },
  {
    label: "Mail",
    icon: <Mail className="size-4" />,
    children: [
      { label: "Mail Tester", href: "/admin/mail" },
    ],
  },
  {
    label: "Analytics",
    href: "/admin/analytics",
    icon: <BarChart3 className="size-4" />,
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: <Settings className="size-4" />,
  },
];

export function AdminSidebar({ onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const logout = useAuthStore((s) => s.logout);
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null);

  React.useEffect(() => {
    navItems.forEach((item) => {
      if (item.children?.some((c) => pathname?.startsWith(c.href.split("?")[0]))) {
        setOpenDropdown(item.label);
      }
    });
  }, [pathname]);

  function isActive(href: string) {
    return pathname === href || pathname?.startsWith(href.split("?")[0]);
  }

  return (
    <aside className="flex h-full w-64 flex-col border-r bg-card">
      {/* Header */}
      <div className="flex h-14 items-center justify-between border-b px-4">
        <Link href="/admin/dashboard" className="flex items-center gap-2">
          <ShieldCheck className="text-primary size-5" />
          <span className="text-sm font-extrabold tracking-tight">Admin Panel</span>
        </Link>
        {onClose && (
          <Button variant="ghost" size="icon" className="size-7 lg:hidden" onClick={onClose}>
            <X className="size-4" />
          </Button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-3">
        <div className="space-y-0.5">
          {navItems.map((item) => {
            if (item.href) {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    active
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              );
            }

            const isOpen = openDropdown === item.label;
            const hasActive = item.children?.some((c) => isActive(c.href));

            return (
              <div key={item.label}>
                <button
                  onClick={() => setOpenDropdown(isOpen ? null : item.label)}
                  className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    hasActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {item.icon}
                  <span className="flex-1 text-left">{item.label}</span>
                  <ChevronDown
                    className={`size-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isOpen && item.children && (
                  <div className="ml-4 mt-0.5 space-y-0.5 border-l pl-3">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={onClose}
                        className={`block rounded-md px-2.5 py-1.5 text-[13px] transition-colors ${
                          isActive(child.href)
                            ? "bg-primary/10 font-medium text-primary"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        }`}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="border-t p-3">
        <Link
          href="/"
          className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <Globe className="size-4" />
          View Site
        </Link>
        <button
          onClick={() => { logout(); window.location.href = "/admin/login"; }}
          className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-red-500 transition-colors hover:bg-red-500/5"
        >
          <LogOut className="size-4" />
          Sign out
        </button>
      </div>
    </aside>
  );
}
