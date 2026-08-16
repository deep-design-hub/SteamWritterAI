import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const publicPages: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/features", priority: 0.9 },
  { path: "/modules", priority: 0.9 },
  { path: "/pricing", priority: 0.9 },
  { path: "/how-it-works", priority: 0.8 },
  { path: "/ai-gateway", priority: 0.8 },
  { path: "/corrections", priority: 0.8 },
  { path: "/blog", priority: 0.7 },
  { path: "/faq", priority: 0.7 },
  { path: "/contact", priority: 0.6 },
  { path: "/register", priority: 0.9 },
  { path: "/login", priority: 0.5 },
  { path: "/privacy", priority: 0.3 },
  { path: "/terms", priority: 0.3 },
  { path: "/refund", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return publicPages.map(({ path, priority }) => ({
    url: `${SITE_URL}${path === "/" ? "/" : path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority,
  }));
}
