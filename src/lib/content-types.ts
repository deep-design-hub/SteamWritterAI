export interface PageItem {
  id: string;
  icon?: string;
  title?: string;
  description?: string;
  price?: string;
  featured?: boolean;
  badge?: string;
  list?: string[];
  value?: string;
  hint?: string;
  href?: string;
  cta?: string;
  category?: string;
  date?: string;
  readTime?: string;
  slug?: string;
}

export type SectionType =
  | "hero"
  | "stats"
  | "steps"
  | "cards"
  | "pipeline"
  | "plans"
  | "comparison"
  | "faq"
  | "cta"
  | "text"
  | "blogs"
  | "contact"
  | "channels";

export interface CtaLink {
  label: string;
  href: string;
}

export interface PageSection {
  id: string;
  type: SectionType;
  badge?: string;
  heading?: string;
  subheading?: string;
  primaryCta?: CtaLink;
  secondaryCta?: CtaLink;
  items: PageItem[];
}

export interface PageContent {
  slug: string;
  title: string;
  subtitle: string;
  sections: PageSection[];
}

export const PAGE_SLUGS = [
  "home",
  "features",
  "modules",
  "pricing",
  "how-it-works",
  "ai-gateway",
  "corrections",
  "faq",
  "contact",
  "blog",
  "privacy",
  "terms",
  "refund",
] as const;

export const SECTION_TYPES: { value: SectionType; label: string }[] = [
  { value: "hero", label: "Hero" },
  { value: "stats", label: "Stats" },
  { value: "steps", label: "Steps" },
  { value: "cards", label: "Card Grid" },
  { value: "pipeline", label: "Pipeline" },
  { value: "plans", label: "Pricing Plans" },
  { value: "comparison", label: "Comparison Table" },
  { value: "faq", label: "FAQ" },
  { value: "cta", label: "Call to Action" },
  { value: "text", label: "Text Block" },
  { value: "blogs", label: "Blog List" },
  { value: "contact", label: "Contact Form" },
  { value: "channels", label: "Contact Channels" },
];
