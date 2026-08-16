"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";
import {
  Bell,
  ChevronDown,
  LogOut,
  Menu,
  Search,
  Settings,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";

interface AdminHeaderProps {
  onMenuToggle?: () => void;
}

export function AdminHeader({ onMenuToggle }: AdminHeaderProps) {
  const router = useRouter();
  const logout = useAuthStore((s) => s.logout);
  const currentUser = useAuthStore((s) => s.currentUser);
  const [profileOpen, setProfileOpen] = React.useState(false);
  const [notifOpen, setNotifOpen] = React.useState(false);
  const profileRef = React.useRef<HTMLDivElement>(null);
  const notifRef = React.useRef<HTMLDivElement>(null);

  const user = currentUser();
  const initials = user
    ? `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`.toUpperCase()
    : "AD";

  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleLogout() {
    logout();
    router.push("/admin/login");
  }

  return (
    <header className="border-border/60 sticky top-0 z-40 border-b bg-background/90 backdrop-blur-md">
      <div className="flex h-14 items-center justify-between gap-3 px-4 lg:px-6">
        {/* Left: hamburger + breadcrumb */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="size-8 lg:hidden"
            onClick={onMenuToggle}
            aria-label="Toggle menu"
          >
            <Menu className="size-4" />
          </Button>
          <Link href="/admin/dashboard" className="flex items-center gap-2 lg:hidden">
            <ShieldCheck className="text-primary size-5" />
            <span className="text-sm font-extrabold tracking-tight">Admin</span>
          </Link>
          <div className="hidden items-center gap-2 lg:flex">
            <ShieldCheck className="text-primary size-4" />
            <span className="text-sm font-semibold">Admin Panel</span>
          </div>
        </div>

        {/* Center: search */}
        <div className="mx-4 hidden max-w-sm flex-1 sm:block">
          <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/50 px-3 py-1.5">
            <Search className="size-3.5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search users, payments..."
              className="bg-transparent text-sm outline-none placeholder:text-muted-foreground/60"
            />
          </div>
        </div>

        {/* Right: actions */}
        <div className="flex items-center gap-1.5">
          {/* Notifications */}
          <div ref={notifRef} className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="size-8"
              onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); }}
            >
              <Bell className="size-4" />
              <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-red-500" />
            </Button>
            {notifOpen && (
              <div className="absolute right-0 top-full z-50 mt-2 w-80 rounded-xl border bg-card shadow-xl">
                <div className="flex items-center justify-between border-b px-4 py-3">
                  <h3 className="text-sm font-bold">Notifications</h3>
                  <button className="text-primary text-xs font-medium hover:underline">Mark all read</button>
                </div>
                <div className="max-h-64 overflow-y-auto p-4">
                  <p className="text-muted-foreground text-center text-sm">No new notifications</p>
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div ref={profileRef} className="relative">
            <button
              onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }}
              className="flex items-center gap-2 rounded-lg px-2 py-1 transition-colors hover:bg-muted"
            >
              <div className="flex size-7 items-center justify-center rounded-md bg-red-500/10 text-[11px] font-bold text-red-600">
                {initials}
              </div>
              <span className="hidden text-sm font-medium lg:block">{user?.firstName ?? "Admin"}</span>
              <ChevronDown className="text-muted-hidden size-3 lg:block" />
            </button>
            {profileOpen && (
              <div className="absolute right-0 top-full z-50 mt-2 w-52 rounded-xl border bg-card shadow-xl">
                <div className="border-b px-4 py-3">
                  <p className="text-sm font-bold">{user?.firstName} {user?.lastName}</p>
                  <p className="text-muted-foreground truncate text-xs">{user?.email}</p>
                  <p className="mt-1 text-[10px] font-medium uppercase text-red-600">Administrator</p>
                </div>
                <div className="p-1.5">
                  <Link
                    href="/admin/settings"
                    className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-primary/5 hover:text-foreground"
                    onClick={() => setProfileOpen(false)}
                  >
                    <Settings className="size-4" /> Settings
                  </Link>
                </div>
                <div className="border-t p-1.5">
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-red-500 transition-colors hover:bg-red-500/5"
                  >
                    <LogOut className="size-4" /> Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
