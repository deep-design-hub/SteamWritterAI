"use client";

import Link from "next/link";
import * as React from "react";
import {
  ArrowRight,
  ChevronDown,
  GraduationCap,
  Mail,
  Menu,
  Phone,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { AuthModal } from "@/components/auth/auth-modal";

interface MegaLink {
  label: string;
  href: string;
}

interface MegaColumn {
  title: string;
  links: MegaLink[];
}

interface NavGroup {
  id: string;
  label: string;
  mega: {
    columns: MegaColumn[];
  };
}

const navGroups: NavGroup[] = [
  {
    id: "features",
    label: "Features",
    mega: {
      columns: [
        {
          title: "Core Platform",
          links: [
            { label: "Chapter Generator", href: "/features" },
            { label: "Citation Engine", href: "/features" },
            { label: "Export Engine", href: "/features" },
          ],
        },
        {
          title: "AI Pipeline",
          links: [
            { label: "AI Gateway", href: "/ai-gateway" },
            { label: "Humanisation", href: "/features" },
            { label: "Data Analysis", href: "/features" },
          ],
        },
        {
          title: "Quality Tools",
          links: [
            { label: "AI Detection", href: "/features" },
            { label: "Plagiarism Check", href: "/features" },
            { label: "Corrections", href: "/corrections" },
          ],
        },
        {
          title: "Quick Links",
          links: [
            { label: "How It Works", href: "/how-it-works" },
            { label: "View All Plans", href: "/pricing" },
            { label: "FAQ", href: "/faq" },
          ],
        },
      ],
    },
  },
  {
    id: "modules",
    label: "Modules",
    mega: {
      columns: [
        {
          title: "Writing",
          links: [
            { label: "Chapter Generator", href: "/features" },
            { label: "Journal Discovery", href: "/features" },
            { label: "Citation Engine", href: "/features" },
          ],
        },
        {
          title: "Analysis",
          links: [
            { label: "Data Analysis Lab", href: "/features" },
            { label: "Math Modelling", href: "/features" },
            { label: "Corrections", href: "/corrections" },
          ],
        },
        {
          title: "Quality & Admin",
          links: [
            { label: "AI Detection", href: "/features" },
            { label: "Export Engine", href: "/features" },
            { label: "Admin Panel", href: "/admin/dashboard" },
          ],
        },
        {
          title: "More",
          links: [
            { label: "Reference Manager", href: "/features" },
            { label: "Template Library", href: "/features" },
            { label: "Custom Branding", href: "/features" },
          ],
        },
      ],
    },
  },
];

const mobileLinks = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/features" },
  { label: "Modules", href: "/modules" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export function Topbar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [authOpen, setAuthOpen] = React.useState(false);
  const [authTab, setAuthTab] = React.useState<"login" | "register">("login");
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null);
  const dropdownTimeout = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  function openLogin() {
    setAuthTab("login");
    setAuthOpen(true);
    setMobileOpen(false);
  }
  function openRegister() {
    setAuthTab("register");
    setAuthOpen(true);
    setMobileOpen(false);
  }

  function handleDropdownEnter(id: string) {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setOpenDropdown(id);
  }

  function handleDropdownLeave() {
    dropdownTimeout.current = setTimeout(() => setOpenDropdown(null), 150);
  }

  return (
    <>
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} defaultTab={authTab} />

      {/* Utility bar */}
      <div className="bg-primary text-primary-foreground flex flex-wrap items-center justify-between gap-x-6 gap-y-1 px-4 py-1.5 text-xs font-medium sm:px-8">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
          <span className="flex items-center gap-1.5">
            <Phone className="size-3.5 opacity-80" /> +234 905 644 4277
          </span>
          <span className="flex items-center gap-1.5">
            <Mail className="size-3.5 opacity-80" /> hello@steamwriterai.com
          </span>
          <span className="hidden items-center gap-1.5 sm:flex">
            Mon–Sat: 7AM–9PM WAT
          </span>
        </div>
        <div className="hidden gap-4 sm:flex">
          <span className="opacity-90">Pay once, use forever</span>
        </div>
      </div>

      {/* Main header */}
      <header className="border-border/60 sticky top-0 z-50 border-b bg-background/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <img
              src="/logo.png"
              alt="SteamWriterAi"
              width={36}
              height={36}
              className="rounded-lg"
            />
            <span className="text-lg font-extrabold tracking-tight">
              SteamWriterAi
            </span>
          </Link>

          {/* Desktop nav — click-based mega dropdown */}
          <nav className="hidden items-center gap-1 lg:flex">
            <Button asChild variant="ghost" size="sm" className="h-9">
              <Link href="/">Home</Link>
            </Button>
            {navGroups.map((group) => (
              <div
                key={group.id}
                className="relative"
                onMouseEnter={() => handleDropdownEnter(group.id)}
                onMouseLeave={handleDropdownLeave}
              >
                <button
                  type="button"
                  onClick={() => setOpenDropdown(openDropdown === group.id ? null : group.id)}
                  className={`flex h-9 items-center gap-1 rounded-md px-3 text-sm font-medium transition-colors ${
                    openDropdown === group.id
                      ? "text-foreground bg-primary/5"
                      : "text-muted-foreground hover:text-foreground hover:bg-primary/5"
                  }`}
                >
                  {group.label}
                  <ChevronDown className={`size-3.5 transition-transform ${openDropdown === group.id ? "rotate-180" : ""}`} />
                </button>
                {/* Full-width mega dropdown */}
                {openDropdown === group.id && (
                  <div className="absolute left-1/2 top-full z-50 mt-2 w-[640px] -translate-x-1/2 rounded-xl border bg-card p-6 shadow-xl">
                    <div className="grid grid-cols-4 gap-6">
                      {group.mega.columns.map((col) => (
                        <div key={col.title}>
                          <h4 className="text-primary mb-3 border-b pb-2 text-[11px] font-bold uppercase tracking-widest">
                            {col.title}
                          </h4>
                          <ul className="space-y-0.5">
                            {col.links.map((link) => (
                              <li key={link.label}>
                                <Link
                                  href={link.href}
                                  onClick={() => setOpenDropdown(null)}
                                  className="hover:bg-primary/5 hover:text-foreground flex items-center gap-1.5 rounded-md px-2 py-1.5 text-[13px] text-muted-foreground transition-colors hover:pl-3"
                                >
                                  <ArrowRight className="text-primary size-3" />
                                  {link.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            <Button asChild variant="ghost" size="sm" className="h-9">
              <Link href="/pricing">Pricing</Link>
            </Button>
            <Button asChild variant="ghost" size="sm" className="h-9">
              <Link href="/blog">Blog</Link>
            </Button>
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <div className="hidden items-center gap-2 md:flex">
              <Button variant="outline" size="sm" onClick={openLogin}>
                <GraduationCap className="size-4" /> Sign In
              </Button>
              <Button size="sm" onClick={openRegister}>
                Get Started <ArrowRight className="size-3.5" />
              </Button>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </Button>
          </div>
        </div>

        {mobileOpen && (
          <div className="border-t bg-card px-4 py-4 lg:hidden">
            <div className="flex flex-col gap-1">
              {mobileLinks.map((link) => (
                <Button
                  key={link.href}
                  asChild
                  variant="ghost"
                  className="justify-start"
                  onClick={() => setMobileOpen(false)}
                >
                  <Link href={link.href}>{link.label}</Link>
                </Button>
              ))}
              <div className="mt-2 flex gap-2">
                <Button variant="outline" className="flex-1" onClick={openLogin}>
                  Sign In
                </Button>
                <Button className="flex-1" onClick={openRegister}>
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
