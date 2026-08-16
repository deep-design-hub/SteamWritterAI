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
  const headerRef = React.useRef<HTMLElement>(null);
  const [headerBottom, setHeaderBottom] = React.useState(0);
  const closeTimeout = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  React.useEffect(() => {
    function update() {
      if (headerRef.current) {
        setHeaderBottom(headerRef.current.getBoundingClientRect().bottom);
      }
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  React.useEffect(() => {
    if (openDropdown) {
      const h = headerRef.current?.getBoundingClientRect().bottom ?? 64;
      setHeaderBottom(h);
    }
  }, [openDropdown]);

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

  function onTriggerEnter(id: string) {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setOpenDropdown(id);
  }

  function onTriggerLeave() {
    closeTimeout.current = setTimeout(() => setOpenDropdown(null), 120);
  }

  function onDropdownEnter() {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
  }

  function onDropdownLeave() {
    closeTimeout.current = setTimeout(() => setOpenDropdown(null), 120);
  }

  function closeDropdown() {
    setOpenDropdown(null);
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
  }

  const activeGroup = navGroups.find((g) => g.id === openDropdown);

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
      <header ref={headerRef} className="border-border/60 sticky top-0 z-50 border-b bg-background/85 backdrop-blur">
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

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            <Button asChild variant="ghost" size="sm" className="h-9">
              <Link href="/">Home</Link>
            </Button>
            {navGroups.map((group) => (
              <div
                key={group.id}
                onMouseEnter={() => onTriggerEnter(group.id)}
                onMouseLeave={onTriggerLeave}
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

        {/* Mobile menu */}
        <div
          className={`border-t bg-card overflow-hidden transition-all duration-300 ease-in-out lg:hidden ${
            mobileOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
          }`}
        >
          <div className="flex flex-col gap-0.5 px-4 py-3">
            {mobileLinks.map((link) => (
              <Button
                key={link.href}
                asChild
                variant="ghost"
                className="justify-start h-11 px-3 text-[15px]"
                onClick={() => setMobileOpen(false)}
              >
                <Link href={link.href}>{link.label}</Link>
              </Button>
            ))}
            <div className="mt-3 flex gap-2 border-t border-border pt-3">
              <Button variant="outline" className="flex-1 h-11" onClick={openLogin}>
                Sign In
              </Button>
              <Button className="flex-1 h-11" onClick={openRegister}>
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mega dropdown — fixed to viewport, full width, positioned below header (desktop only) */}
      {openDropdown && activeGroup && (
        <div
          className="fixed left-0 right-0 z-50 border-t-2 border-primary bg-card shadow-xl hidden lg:block"
          style={{ top: headerBottom }}
          onMouseEnter={onDropdownEnter}
          onMouseLeave={onDropdownLeave}
        >
          {/* Backdrop overlay */}
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm -z-10" />
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 sm:px-6 md:grid-cols-4 lg:px-8">
            {activeGroup.mega.columns.map((col) => (
              <div key={col.title}>
                <h4 className="text-primary mb-4 border-b border-primary/10 pb-2 text-[11px] font-bold uppercase tracking-widest">
                  {col.title}
                </h4>
                <ul className="space-y-1">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        onClick={closeDropdown}
                        className="hover:bg-primary/5 hover:text-foreground flex items-center gap-2 rounded-md px-3 py-2 text-[13px] text-muted-foreground transition-all hover:pl-4"
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
    </>
  );
}
