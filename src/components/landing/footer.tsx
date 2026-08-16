"use client";

import Link from "next/link";
import { toast } from "sonner";
import { ArrowRight, Mail, Phone, Send } from "lucide-react";

import { Logo } from "@/components/logo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const columns: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/features" },
      { label: "All Modules", href: "/modules" },
      { label: "Pricing Plans", href: "/pricing" },
      { label: "How It Works", href: "/how-it-works" },
      { label: "AI Pipeline", href: "/ai-gateway" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Documentation", href: "/features" },
      { label: "API Reference", href: "/features" },
      { label: "FAQ", href: "/faq" },
      { label: "Blog", href: "/blog" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Refund Policy", href: "/refund" },
      { label: "Acceptable Use", href: "/terms" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Academic Writing Guide", href: "/blog" },
      { label: "Citation Styles Guide", href: "/blog" },
      { label: "Research Tips", href: "/blog" },
      { label: "Module Tutorials", href: "/modules" },
      { label: "Create Free Account", href: "/register" },
    ],
  },
];

const socials = [
  { label: "X" },
  { label: "Facebook" },
  { label: "Instagram" },
  { label: "YouTube" },
  { label: "LinkedIn" },
  { label: "Email" },
];

export function Footer() {
  return (
    <footer className="flex-shrink-0">
      {/* Newsletter band */}
      <div className="bg-primary px-6 py-12 text-center">
        <h3 className="text-primary-foreground text-2xl font-extrabold">
          Stay Updated with SteamWriterAi
        </h3>
        <p className="text-primary-foreground/85 mx-auto mt-1 max-w-xl text-sm">
          Get academic writing tips, research news, and exclusive offers
          delivered to your inbox.
        </p>
        <form
          className="mx-auto mt-5 flex max-w-md gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            toast.success("Subscribed! Welcome to SteamWriterAi updates.");
          }}
        >
          <Input
            type="email"
            required
            placeholder="Enter your email address"
            className="h-11 flex-1 border-0 bg-white/95 text-foreground"
          />
          <Button
            type="submit"
            className="h-11 bg-foreground text-primary-foreground hover:bg-foreground/90"
          >
            <Send className="size-4" /> Subscribe
          </Button>
        </form>
      </div>

      <div className="border-border/60 border-t">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-12 sm:px-6 md:grid-cols-3 lg:grid-cols-6 lg:px-8">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <Logo className="size-8" />
              <span className="text-base font-extrabold tracking-tight">
                SteamWriterAi
              </span>
            </Link>
            <p className="text-muted-foreground mt-3 max-w-xs text-[13px] leading-relaxed">
              AI Research Writing Suite — the complete academic research
              operating system. From topic to submission, all in one place.
              Trusted by students across Nigerian universities.
            </p>
            <div className="mt-4 flex gap-2">
              {socials.map((s) => (
                <button
                  key={s.label}
                  type="button"
                  aria-label={s.label}
                  onClick={() =>
                    toast.info(`Follow us on ${s.label}`)
                  }
                  className="border-border text-muted-foreground hover:text-foreground flex size-9 items-center justify-center rounded-lg border bg-card text-[11px] font-bold transition-colors hover:border-primary"
                >
                  {s.label === "Email" ? "✉" : s.label.charAt(0)}
                </button>
              ))}
            </div>
            <div className="text-muted-foreground mt-5 space-y-1.5 text-xs">
              <p className="flex items-center gap-2">
                <Phone className="text-primary size-3.5" /> +234 905 644 4277
              </p>
              <p className="flex items-center gap-2">
                <Mail className="text-primary size-3.5" /> hello@steamwriterai.com
              </p>
              <p className="flex items-center gap-2">
                Mon–Sat: 7AM–9PM WAT
              </p>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-muted-foreground mb-3 text-[13px] font-bold uppercase tracking-wider">
                {col.title}
              </h4>
              {col.links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-muted-foreground hover:text-primary block py-1 text-[13px] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        <div className="border-border/60 border-t">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
            <span>© {new Date().getFullYear()} SteamWriterAi. All rights reserved.</span>
            <span className="flex items-center gap-1">
              Built with integrity for academic excellence <ArrowRight className="size-3" /> Nigeria
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
