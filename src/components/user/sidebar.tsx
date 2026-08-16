"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BookOpen,
  CreditCard,
  FileText,
  LayoutDashboard,
  LogOut,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";
import { useAuthStore } from "@/store/useAuthStore";

const nav = [
  { href: "/user/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/user/projects", label: "My Projects", icon: BookOpen },
  { href: "/user/projects/new", label: "New Project", icon: Plus },
  { href: "/user/templates", label: "Templates", icon: FileText },
  { href: "/user/journals", label: "Journal Search", icon: Search },
  { href: "/user/billing", label: "Billing", icon: CreditCard },
  { href: "/user/settings", label: "Settings", icon: Settings },
];

export function Sidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();
  const users = useAuthStore((s) => s.users);
  const currentUserId = useAuthStore((s) => s.currentUserId);
  const logout = useAuthStore((s) => s.logout);
  const user = users.find((u) => u.id === currentUserId) ?? null;

  function handleLogout() {
    logout();
    router.push("/");
  }

  return (
    <aside className="bg-sidebar text-sidebar-foreground flex h-svh w-64 shrink-0 flex-col border-r">
      <div className="flex h-16 items-center justify-between border-b px-4">
        <Link href="/user/dashboard" className="flex items-center gap-2">
          <Logo />
          <span className="font-bold tracking-tight">SteamWriterAi</span>
        </Link>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          {onClose && (
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="size-4" />
            </Button>
          )}
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {nav.map((item) => {
          const active =
            pathname === item.href ||
            (item.href !== "/user/dashboard" &&
              item.href !== "/user/projects/new" &&
              pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
              )}
            >
              <item.icon className="size-4" />
              {item.label}
            </Link>
          );
        })}
          {user?.role === "admin" && (
            <Link
              href="/admin/dashboard"
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                pathname.startsWith("/admin")
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
              )}
            >
              <ShieldCheck className="size-4" />
              Admin Panel
            </Link>
          )}
        </nav>

      <div className="border-t p-3">
        <Separator className="mb-3" />
        <div className="flex items-center gap-3">
          <Avatar className="size-9">
            <AvatarFallback className="bg-primary text-primary-foreground text-xs">
              {(user?.firstName?.[0] ?? "U").toUpperCase()}
              {(user?.lastName?.[0] ?? "").toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-muted-foreground truncate text-xs">
              {user?.email}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLogout}
            aria-label="Log out"
          >
            <LogOut className="size-4" />
          </Button>
        </div>
      </div>
    </aside>
  );
}
