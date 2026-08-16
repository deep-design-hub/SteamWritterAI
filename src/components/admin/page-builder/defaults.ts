import type { Block, BlockType, FieldDef, Pages } from "./types";

export const BLOCK_LABELS: Record<BlockType, string> = {
  hero: "Hero",
  heading: "Heading",
  text: "Text",
  image: "Image",
  button: "Button",
  divider: "Divider",
  spacer: "Spacer",
  products: "Product grid",
  reviews: "Reviews",
  collection: "Collection",
  countdown: "Countdown",
  testimonials: "Testimonials",
  stats: "Stats bar",
  banner: "Banner",
  video: "Video",
  faq: "FAQ",
  newsletter: "Newsletter",
  gallery: "Gallery",
  social: "Social feed",
  marquee: "Marquee",
  contact: "Contact form",
  footer: "Footer",
  custom: "Custom code",
};

export const BLOCK_CATEGORIES: { label: string; types: BlockType[] }[] = [
  {
    label: "BASIC",
    types: ["heading", "text", "image", "button", "divider", "spacer"],
  },
  {
    label: "COMMERCE",
    types: [
      "hero",
      "products",
      "reviews",
      "collection",
      "countdown",
      "testimonials",
      "stats",
    ],
  },
  {
    label: "ADVANCED",
    types: [
      "banner",
      "video",
      "faq",
      "newsletter",
      "gallery",
      "social",
      "marquee",
      "contact",
      "footer",
      "custom",
    ],
  },
];

export const DEFAULTS: Record<BlockType, Record<string, unknown>> = {
  hero: {
    eyebrow: "STEAMWRITERAI",
    title: "Your Academic Research<br>Operating System",
    text: "Generate complete, submission-ready chapters from topic to final defense. Powered by ChatGPT 5.5 and Claude Sonnet 5.",
    btn: "Create Free Account",
    btnStyle: "solid",
    btnBg: "#182033",
    align: "center",
    bg: "#f3efff",
    fg: "#182033",
    pad: 66,
    radius: 8,
  },
  heading: {
    text: "Add a heading",
    align: "left",
    color: "#182033",
    font: 26,
    size: "2",
  },
  text: {
    text: "Add a paragraph of supporting copy to tell your story.",
    align: "left",
    color: "#5f687b",
    font: 11,
  },
  image: { url: "", alt: "Image", caption: "" },
  button: {
    text: "Button",
    style: "solid",
    size: "",
    bg: "#6d5dfc",
    align: "left",
  },
  divider: { color: "#e6e9f1", width: 100, space: 24 },
  spacer: { height: 40 },
  products: {
    title: "Curated for today",
    align: "left",
    cols: "3",
    count: 6,
    showPrice: true,
    showStock: true,
    background: "#ffffff",
  },
  reviews: {
    eyebrow: "TESTIMONIALS",
    title: "Loved by researchers",
    count: "2,100+",
    quote:
      "SteamWriterAi saved me months of work. The chapter generation is incredibly accurate and properly referenced.",
    name: "Amara",
    role: "PhD Candidate",
    initials: "AM",
    background: "#182033",
    fg: "#ffffff",
  },
  collection: {
    title: "What you can build",
    items: ["Chapter Generator", "Journal Discovery", "Citation Engine"],
    colors: [
      "linear-gradient(135deg,#f3d9b8,#e0b078)",
      "linear-gradient(135deg,#c9d8e8,#8fb2cf)",
      "linear-gradient(135deg,#d9e8e0,#9fc0ae)",
    ],
    background: "#ffffff",
  },
  countdown: {
    eyebrow: "LIMITED OFFER",
    title: "Get started today",
    background: "#6d5dfc",
    fg: "#ffffff",
  },
  testimonials: {
    items: [
      {
        quote:
          "SteamWriterAi saved me months of work. The chapter generation is incredibly accurate and properly referenced.",
        name: "Maya Edwards",
        role: "PhD Candidate",
        initials: "ME",
        color: "#c58f7a",
      },
      {
        quote:
          "The citation engine alone is worth it. APA 7, Harvard, IEEE — all handled perfectly.",
        name: "Jordan Osei",
        role: "MSc Student",
        initials: "JO",
        color: "#9184cf",
      },
    ],
    background: "#ffffff",
  },
  stats: {
    items: [
      { value: "5", label: "Chapter Types" },
      { value: "14", label: "Core Modules" },
      { value: "6", label: "Citation Styles" },
      { value: "8", label: "Export Formats" },
    ],
    background: "#f7f8fc",
  },
  banner: {
    text: "New — ChatGPT 5.5 and Claude Sonnet 5 now available for all plans.",
    bg: "#beefc6",
    fg: "#19322a",
  },
  video: { url: "", caption: "Watch how it works" },
  faq: {
    title: "Frequently Asked Questions",
    items: [
      { q: "What is SteamWriterAi?", a: "SteamWriterAi is an AI-powered academic research platform that generates complete, submission-ready chapters from your topic. It uses ChatGPT 5.5 and Claude Sonnet 5 behind the scenes." },
      { q: "Do I need technical skills?", a: "No. Just enter your topic and click generate. The platform handles formatting, citations, and structure automatically." },
      { q: "How does pricing work?", a: "One-time payment, lifetime access. No recurring subscriptions. Plans start from ₦2,000." },
    ],
    background: "#ffffff",
  },
  newsletter: {
    title: "Ready to write?",
    text: "Create a free account and generate your first chapter in minutes. No credit card required.",
    btn: "Get Started Free",
    background: "#6d5dfc",
  },
  gallery: {
    items: [],
    cols: "3",
    colors: [
      "linear-gradient(135deg,#f3d9b8,#e0b078)",
      "linear-gradient(135deg,#c9d8e8,#8fb2cf)",
      "linear-gradient(135deg,#d9e8e0,#9fc0ae)",
      "linear-gradient(135deg,#f5d9e2,#e79fbb)",
      "linear-gradient(135deg,#f8dd73,#eebf4a)",
      "linear-gradient(135deg,#b6acff,#6d5dfc)",
    ],
  },
  social: {
    title: "Follow us",
    items: [
      "@steamwriterai",
      "@steamwriterai",
      "@steamwriterai",
      "@steamwriterai",
      "@steamwriterai",
      "@steamwriterai",
    ],
    background: "#ffffff",
  },
  marquee: {
    items: ["CHAPTER GENERATOR", "CITATION ENGINE", "AI DETECTION", "PLAGIARISM CHECK"],
    bg: "#f8dd73",
    fg: "#182033",
  },
  contact: {
    title: "Get in touch",
    text: "Questions about a plan, a payment or your account? We usually reply within a day.",
    btn: "Send message",
    background: "#ffffff",
  },
  footer: {
    title: "SteamWriterAi",
    desc: "Your Academic Research Operating System.",
    links: ["Features", "Pricing", "Blog", "Contact"],
    socials: ["Twitter", "LinkedIn", "GitHub"],
    bg: "#182033",
  },
  custom: {
    html: '<!-- Custom code block -->\n<div class="b-custom">Paste HTML, embeds or a widget code here.</div>',
  },
};

export const BLOCK_FIELDS: Record<BlockType, FieldDef[]> = {
  hero: [
    { key: "eyebrow", label: "Eyebrow", type: "text" },
    { key: "title", label: "Heading", type: "textarea" },
    { key: "text", label: "Body text", type: "textarea" },
    { key: "btn", label: "Button label", type: "text" },
    { key: "btnStyle", label: "Button style", type: "seg", opts: ["solid", "outline", "ghost"] },
    { key: "btnBg", label: "Button color", type: "color" },
    { key: "align", label: "Align", type: "align" },
    { key: "bg", label: "Background", type: "color" },
    { key: "fg", label: "Text color", type: "color" },
    { key: "pad", label: "Padding", type: "range", min: 30, max: 110, unit: "px" },
    { key: "radius", label: "Corner radius", type: "range", min: 0, max: 32, unit: "px" },
  ],
  heading: [
    { key: "text", label: "Text", type: "textarea" },
    { key: "align", label: "Align", type: "align" },
    { key: "font", label: "Font size", type: "range", min: 16, max: 48, unit: "px" },
    { key: "color", label: "Color", type: "color" },
    { key: "size", label: "Tag", type: "seg", opts: ["1", "2", "3"] },
  ],
  text: [
    { key: "text", label: "Text", type: "textarea" },
    { key: "align", label: "Align", type: "align" },
    { key: "font", label: "Font size", type: "range", min: 10, max: 20, unit: "px" },
    { key: "color", label: "Color", type: "color" },
  ],
  image: [
    { key: "url", label: "Image", type: "image" },
    { key: "alt", label: "Alt text", type: "text" },
    { key: "caption", label: "Caption", type: "text" },
  ],
  button: [
    { key: "text", label: "Label", type: "text" },
    { key: "style", label: "Style", type: "seg", opts: ["solid", "outline", "ghost"] },
    { key: "size", label: "Size", type: "seg", opts: ["", "sm", "lg"] },
    { key: "bg", label: "Color", type: "color" },
    { key: "align", label: "Align", type: "align" },
  ],
  divider: [
    { key: "color", label: "Color", type: "color" },
    { key: "width", label: "Width", type: "range", min: 10, max: 100, unit: "%" },
    { key: "space", label: "Spacing", type: "range", min: 10, max: 60, unit: "px" },
  ],
  spacer: [{ key: "height", label: "Height", type: "range", min: 10, max: 120, unit: "px" }],
  products: [
    { key: "title", label: "Title", type: "text" },
    { key: "align", label: "Align", type: "align" },
    { key: "cols", label: "Columns", type: "seg", opts: ["2", "3", "4"] },
    { key: "count", label: "Products", type: "range", min: 3, max: 12, unit: "" },
    { key: "showPrice", label: "Show price", type: "toggle" },
    { key: "showStock", label: "Show stock", type: "toggle" },
    { key: "background", label: "Background", type: "color" },
  ],
  reviews: [
    { key: "eyebrow", label: "Eyebrow", type: "text" },
    { key: "title", label: "Title", type: "text" },
    { key: "count", label: "Review count", type: "text" },
    { key: "quote", label: "Quote", type: "textarea" },
    { key: "name", label: "Name", type: "text" },
    { key: "role", label: "Role", type: "text" },
    { key: "background", label: "Background", type: "color" },
    { key: "fg", label: "Text color", type: "color" },
  ],
  collection: [
    { key: "title", label: "Title", type: "text" },
    { key: "items", label: "Categories", type: "list" },
    { key: "colors", label: "Tint", type: "color" },
    { key: "background", label: "Background", type: "color" },
  ],
  countdown: [
    { key: "eyebrow", label: "Eyebrow", type: "text" },
    { key: "title", label: "Title", type: "text" },
    { key: "background", label: "Background", type: "color" },
    { key: "fg", label: "Text color", type: "color" },
  ],
  testimonials: [
    { key: "items", label: "Testimonials", type: "listt" },
    { key: "background", label: "Background", type: "color" },
  ],
  stats: [
    { key: "items", label: "Stats", type: "list" },
    { key: "background", label: "Background", type: "color" },
  ],
  banner: [
    { key: "text", label: "Text", type: "text" },
    { key: "bg", label: "Background", type: "color" },
    { key: "fg", label: "Text color", type: "color" },
  ],
  video: [
    { key: "url", label: "Poster image", type: "image" },
    { key: "caption", label: "Caption", type: "text" },
  ],
  faq: [
    { key: "title", label: "Title", type: "text" },
    { key: "items", label: "Questions", type: "listq" },
    { key: "background", label: "Background", type: "color" },
  ],
  newsletter: [
    { key: "title", label: "Title", type: "text" },
    { key: "text", label: "Body text", type: "textarea" },
    { key: "btn", label: "Button label", type: "text" },
    { key: "background", label: "Background", type: "color" },
  ],
  gallery: [
    { key: "items", label: "Images", type: "listimg" },
    { key: "cols", label: "Columns", type: "seg", opts: ["2", "3", "4"] },
    { key: "colors", label: "Tint", type: "color" },
  ],
  social: [
    { key: "title", label: "Title", type: "text" },
    { key: "items", label: "Handles", type: "list" },
    { key: "background", label: "Background", type: "color" },
  ],
  marquee: [
    { key: "items", label: "Words", type: "list" },
    { key: "bg", label: "Background", type: "color" },
    { key: "fg", label: "Text color", type: "color" },
  ],
  contact: [
    { key: "title", label: "Title", type: "text" },
    { key: "text", label: "Subtitle", type: "textarea" },
    { key: "btn", label: "Button label", type: "text" },
    { key: "background", label: "Background", type: "color" },
  ],
  footer: [
    { key: "title", label: "Brand", type: "text" },
    { key: "desc", label: "Description", type: "textarea" },
    { key: "links", label: "Links", type: "list" },
    { key: "socials", label: "Socials", type: "list" },
    { key: "bg", label: "Background", type: "color" },
  ],
  custom: [{ key: "html", label: "Code", type: "textarea" }],
};

export function cloneDefaults(type: BlockType): Record<string, unknown> {
  const d = DEFAULTS[type];
  const out: Record<string, unknown> = {};
  for (const k of Object.keys(d)) {
    const v = d[k];
    out[k] = Array.isArray(v) ? v.map((i) => (typeof i === "object" ? { ...i } : i)) : v;
  }
  return out;
}

let idCounter = 0;
function makeId(): string {
  idCounter++;
  return "b" + Date.now().toString(36) + idCounter;
}

export function createBlock(type: BlockType, overrides?: Record<string, unknown>): Block {
  return { id: makeId(), type, props: { ...cloneDefaults(type), ...overrides } };
}

export const DEFAULT_PAGES: Pages = {
  home: {
    name: "Home",
    blocks: [
      { id: "h1", type: "hero", props: { ...cloneDefaults("hero"), eyebrow: "STEAMWRITERAI / 2026", title: "Your Academic Research<br>Operating System", text: "Generate complete, submission-ready chapters from topic to final defense. Powered by ChatGPT 5.5 and Claude Sonnet 5.", btn: "Create Free Account", btnStyle: "solid", btnBg: "#182033", align: "center", bg: "#f3efff", fg: "#182033" } },
      { id: "h2", type: "stats", props: { items: [{ value: "5", label: "Chapter Types" }, { value: "14", label: "Core Modules" }, { value: "6", label: "Citation Styles" }, { value: "8", label: "Export Formats" }], background: "#f7f8fc" } },
      { id: "h3", type: "collection", props: { title: "From Topic to Submission in Four Steps", items: ["Enter Topic", "Generate Chapters", "Analyse & Model", "Export & Submit"], colors: ["linear-gradient(135deg,#f3d9b8,#e0b078)", "linear-gradient(135deg,#c9d8e8,#8fb2cf)", "linear-gradient(135deg,#d9e8e0,#9fc0ae)", "linear-gradient(135deg,#f5d9e2,#e79fbb)"], background: "#ffffff" } },
      { id: "h4", type: "newsletter", props: { title: "Ready to write?", text: "Create a free account and generate your first chapter in minutes. No credit card required.", btn: "Get Started Free", background: "#6d5dfc" } },
      { id: "h5", type: "footer", props: { title: "SteamWriterAi", desc: "Your Academic Research Operating System.", links: ["Features", "Pricing", "Blog", "Contact"], socials: ["Twitter", "LinkedIn", "GitHub"], bg: "#182033" } },
    ],
  },
  features: {
    name: "Features",
    blocks: [
      { id: "f1", type: "hero", props: { ...cloneDefaults("hero"), eyebrow: "FEATURES", title: "Every Tool You Need<br>to Finish Your Research", text: "SteamWriterAi combines fourteen integrated modules into one powerful workspace. From chapter generation to final export.", align: "center", bg: "#f3efff", fg: "#182033" } },
      { id: "f2", type: "collection", props: { title: "Writing & Content", items: ["Chapter Generator", "Supervisor Corrections", "Journal Discovery", "Citation Engine"], colors: ["linear-gradient(135deg,#f3d9b8,#e0b078)", "linear-gradient(135deg,#c9d8e8,#8fb2cf)", "linear-gradient(135deg,#d9e8e0,#9fc0ae)", "linear-gradient(135deg,#f5d9e2,#e79fbb)"], background: "#ffffff" } },
      { id: "f3", type: "collection", props: { title: "Analysis & Modelling", items: ["Data Analysis Lab", "Math Modelling", "Template Library", "Export Engine"], colors: ["linear-gradient(135deg,#b6acff,#6d5dfc)", "linear-gradient(135deg,#f8dd73,#eebf4a)", "linear-gradient(135deg,#c9d8e8,#8fb2cf)", "linear-gradient(135deg,#d9e8e0,#9fc0ae)"], background: "#f7f8fc" } },
      { id: "f4", type: "collection", props: { title: "Quality & Assurance", items: ["AI Humanisation", "AI Detection Check", "Plagiarism Check", "AI Gateway"], colors: ["linear-gradient(135deg,#beefc6,#6bc49a)", "linear-gradient(135deg,#f3d9b8,#e0b078)", "linear-gradient(135deg,#f5d9e2,#e79fbb)", "linear-gradient(135deg,#b6acff,#6d5dfc)"], background: "#ffffff" } },
      { id: "f5", type: "newsletter", props: { title: "Ready to try these tools?", text: "Create a free account and explore all fourteen modules.", btn: "Create free account", background: "#6d5dfc" } },
    ],
  },
  modules: {
    name: "Modules",
    blocks: [
      { id: "m1", type: "hero", props: { ...cloneDefaults("hero"), eyebrow: "MODULES", title: "The Complete<br>Research Toolkit", text: "Fourteen integrated modules working together to take your research from idea to submission.", align: "center", bg: "#f3efff", fg: "#182033" } },
      { id: "m2", type: "products", props: { title: "All 14 Modules", align: "left", cols: "3", count: 14, showPrice: false, showStock: false, background: "#ffffff" } },
      { id: "m3", type: "newsletter", props: { title: "One workspace. All modules.", text: "Start with a free account and upgrade when you're ready.", btn: "See plans", background: "#6d5dfc" } },
    ],
  },
  pricing: {
    name: "Pricing",
    blocks: [
      { id: "pr1", type: "hero", props: { ...cloneDefaults("hero"), eyebrow: "PRICING", title: "Choose Your Plan", text: "One-time payment. Lifetime access. No recurring subscriptions.", align: "center", bg: "#f3efff", fg: "#182033" } },
      { id: "pr2", type: "stats", props: { items: [{ value: "₦2k", label: "Basic" }, { value: "₦5k", label: "Standard" }, { value: "₦10k", label: "Premium" }, { value: "Custom", label: "Institutional" }], background: "#ffffff" } },
      { id: "pr3", type: "faq", props: { title: "Pricing FAQ", items: [{ q: "Is it a subscription?", a: "No. One-time payment, lifetime access." }, { q: "What payment methods?", a: "OPay, Moniepoint, Paystack and bank transfer." }, { q: "Can I upgrade later?", a: "Yes. Pay the difference between plans." }], background: "#f7f8fc" } },
      { id: "pr4", type: "banner", props: { text: "7-Day Satisfaction Guarantee — full refund if you're not happy.", bg: "#beefc6", fg: "#19322a" } },
    ],
  },
  "how-it-works": {
    name: "How It Works",
    blocks: [
      { id: "hw1", type: "hero", props: { ...cloneDefaults("hero"), eyebrow: "HOW IT WORKS", title: "From Topic to Submission<br>in Four Steps", text: "SteamWriterAi removes the blank-page problem. Enter your topic and let the AI handle the rest.", align: "center", bg: "#f3efff", fg: "#182033" } },
      { id: "hw2", type: "collection", props: { title: "The Four Steps", items: ["Enter Topic", "Generate Chapters", "Analyse & Model", "Export & Submit"], colors: ["linear-gradient(135deg,#f3d9b8,#e0b078)", "linear-gradient(135deg,#c9d8e8,#8fb2cf)", "linear-gradient(135deg,#d9e8e0,#9fc0ae)", "linear-gradient(135deg,#f5d9e2,#e79fbb)"], background: "#ffffff" } },
      { id: "hw3", type: "newsletter", props: { title: "Start your first chapter", text: "Create a free account and see how it works.", btn: "Create free account", background: "#6d5dfc" } },
    ],
  },
  "ai-gateway": {
    name: "AI Gateway",
    blocks: [
      { id: "ag1", type: "hero", props: { ...cloneDefaults("hero"), eyebrow: "AI GATEWAY", title: "The AI Gateway Behind<br>Every Chapter", text: "SteamWriterAi routes each research task to the strongest model available. OpenAI ChatGPT 5.5 and Anthropic Claude Sonnet 5.", align: "center", bg: "#f3efff", fg: "#182033" } },
      { id: "ag2", type: "collection", props: { title: "Two Flagship Models", items: ["ChatGPT 5.5", "Claude Sonnet 5"], colors: ["linear-gradient(135deg,#b6acff,#6d5dfc)", "linear-gradient(135deg,#f3d9b8,#e0b078)"], background: "#ffffff" } },
      { id: "ag3", type: "newsletter", props: { title: "Write with the best models", text: "Start writing today with the most advanced AI models.", btn: "Start writing", background: "#6d5dfc" } },
    ],
  },
  corrections: {
    name: "Corrections",
    blocks: [
      { id: "cr1", type: "hero", props: { ...cloneDefaults("hero"), eyebrow: "CORRECTIONS", title: "Never Fight With<br>Red Pen Marks Again", text: "Upload your supervisor's feedback and SteamWriterAi applies every correction automatically.", align: "center", bg: "#f3efff", fg: "#182033" } },
      { id: "cr2", type: "collection", props: { title: "How It Works", items: ["Upload Feedback", "AI Applies Changes", "Review & Ask", "Track Versions"], colors: ["linear-gradient(135deg,#f3d9b8,#e0b078)", "linear-gradient(135deg,#c9d8e8,#8fb2cf)", "linear-gradient(135deg,#d9e8e0,#9fc0ae)", "linear-gradient(135deg,#f5d9e2,#e79fbb)"], background: "#ffffff" } },
      { id: "cr3", type: "newsletter", props: { title: "Focus on defending, not decoding", text: "Get started with a free account.", btn: "Get started", background: "#6d5dfc" } },
    ],
  },
  faq: {
    name: "FAQ",
    blocks: [
      { id: "fq1", type: "hero", props: { ...cloneDefaults("hero"), eyebrow: "FAQ", title: "Frequently Asked<br>Questions", text: "Everything you need to know about SteamWriterAi.", align: "center", bg: "#f3efff", fg: "#182033" } },
      { id: "fq2", type: "faq", props: { title: "Getting Started", items: [{ q: "What is SteamWriterAi?", a: "An AI-powered academic research platform that generates complete, submission-ready chapters from your topic." }, { q: "Do I need technical skills?", a: "No. Just enter your topic and click generate." }, { q: "Is there a free plan?", a: "Yes. Create a free account to try the platform." }], background: "#ffffff" } },
      { id: "fq3", type: "faq", props: { title: "Payments & Plans", items: [{ q: "Is it a subscription?", a: "No. One-time payment, lifetime access." }, { q: "What payment methods?", a: "OPay, Moniepoint, Paystack and bank transfer." }, { q: "Can I upgrade later?", a: "Yes. Pay the difference between plans." }], background: "#f7f8fc" } },
      { id: "fq4", type: "faq", props: { title: "The AI Agent", items: [{ q: "Does it generate fake references?", a: "No. The citation engine uses real, verifiable sources." }, { q: "Will it pass AI detection?", a: "Yes. The humanisation layer reduces AI detection scores." }, { q: "Which models do you use?", a: "OpenAI ChatGPT 5.5 and Anthropic Claude Sonnet 5." }], background: "#ffffff" } },
      { id: "fq5", type: "newsletter", props: { title: "Still have questions?", text: "Contact our support team or get started right away.", btn: "Contact support", background: "#6d5dfc" } },
    ],
  },
  contact: {
    name: "Contact",
    blocks: [
      { id: "ct1", type: "hero", props: { ...cloneDefaults("hero"), eyebrow: "CONTACT", title: "We're Here to Help", text: "Questions about a plan, a payment or your account? We usually reply within a day.", align: "center", bg: "#f3efff", fg: "#182033" } },
      { id: "ct2", type: "contact", props: { title: "Send us a message", text: "Fill out the form and we'll get back to you within 24 hours.", btn: "Send message", background: "#ffffff" } },
      { id: "ct3", type: "banner", props: { text: "Phone: +234 905 644 4277 | Email: hello@steamwriterai.com | Lagos, Nigeria", bg: "#f7f8fc", fg: "#182033" } },
    ],
  },
  blog: {
    name: "Blog",
    blocks: [
      { id: "bl1", type: "hero", props: { ...cloneDefaults("hero"), eyebrow: "BLOG", title: "The SteamWriterAi<br>Research Blog", text: "Practical, no-fluff guides for researchers. Learn how to write better chapters, cite properly, and defend confidently.", align: "center", bg: "#f3efff", fg: "#182033" } },
      { id: "bl2", type: "gallery", props: { items: [], cols: "3", colors: ["linear-gradient(135deg,#f3d9b8,#e0b078)", "linear-gradient(135deg,#c9d8e8,#8fb2cf)", "linear-gradient(135deg,#d9e8e0,#9fc0ae)", "linear-gradient(135deg,#f5d9e2,#e79fbb)", "linear-gradient(135deg,#f8dd73,#eebf4a)", "linear-gradient(135deg,#b6acff,#6d5dfc)"] } },
      { id: "bl3", type: "newsletter", props: { title: "Want more guides like these?", text: "Create a free account and start writing with SteamWriterAi.", btn: "Start writing", background: "#6d5dfc" } },
    ],
  },
  privacy: {
    name: "Privacy Policy",
    blocks: [
      { id: "pv1", type: "heading", props: { ...cloneDefaults("heading"), text: "Privacy Policy", align: "center", font: 32 } },
      { id: "pv2", type: "text", props: { ...cloneDefaults("text"), text: "Last updated: August 2026. This Privacy Policy describes how SteamWriterAi collects, uses, and protects your personal information.", align: "center" } },
      { id: "pv3", type: "text", props: { text: "We collect your name, email address, and payment information when you create an account. Your research content is processed by AI models and is never shared with third parties. We use cookies to improve your experience.", align: "left", color: "#5f687b", font: 11 } },
      { id: "pv4", type: "text", props: { text: "For questions about this policy, contact hello@steamwriterai.com.", align: "left", color: "#5f687b", font: 11 } },
    ],
  },
  terms: {
    name: "Terms of Service",
    blocks: [
      { id: "ts1", type: "heading", props: { ...cloneDefaults("heading"), text: "Terms of Service", align: "center", font: 32 } },
      { id: "ts2", type: "text", props: { ...cloneDefaults("text"), text: "Last updated: August 2026. By using SteamWriterAi, you agree to these terms.", align: "center" } },
      { id: "ts3", type: "text", props: { text: "You must be 18+ to use SteamWriterAi. Payments are non-refundable after the 7-day window. You agree not to use the platform for academic dishonesty. All content generated is your responsibility to review and verify.", align: "left", color: "#5f687b", font: 11 } },
      { id: "ts4", type: "text", props: { text: "For questions about these terms, contact hello@steamwriterai.com.", align: "left", color: "#5f687b", font: 11 } },
    ],
  },
  refund: {
    name: "Refund Policy",
    blocks: [
      { id: "rf1", type: "heading", props: { ...cloneDefaults("heading"), text: "Refund Policy", align: "center", font: 32 } },
      { id: "rf2", type: "text", props: { ...cloneDefaults("text"), text: "We stand behind SteamWriterAi with a 7-day satisfaction guarantee.", align: "center" } },
      { id: "rf3", type: "faq", props: { title: "7-Day Satisfaction Guarantee", items: [{ q: "Within 7 days of purchase", a: "Contact us within 7 days of your purchase for a full refund." }, { q: "Fewer than 3 chapters generated", a: "Refund applies if you've generated fewer than 3 chapters." }, { q: "No policy violation", a: "You haven't violated our terms of service." }, { q: "No chargeback filed", a: "No chargeback or dispute has been filed with your payment provider." }], background: "#ffffff" } },
      { id: "rf4", type: "text", props: { text: "To request a refund, email hello@steamwriterai.com with your account details. We'll verify and process your refund within 3-5 business days.", align: "center", color: "#5f687b", font: 11 } },
    ],
  },
};

export const TEMPLATES: Record<string, { name: string; blocks: Block[] }> = {
  academic: {
    name: "Academic",
    blocks: [
      { id: "t1", type: "hero", props: { ...cloneDefaults("hero"), eyebrow: "STEAMWRITERAI", title: "Your Academic Research<br>Operating System", text: "Generate complete, submission-ready chapters from topic to final defense.", btn: "Create Free Account", align: "center", bg: "#f3efff", fg: "#182033" } },
      { id: "t2", type: "stats", props: { items: [{ value: "5", label: "Chapter Types" }, { value: "14", label: "Core Modules" }, { value: "6", label: "Citation Styles" }, { value: "8", label: "Export Formats" }], background: "#f7f8fc" } },
      { id: "t3", type: "newsletter", props: { title: "Ready to write?", text: "Create a free account and generate your first chapter.", btn: "Get Started Free", background: "#6d5dfc" } },
      { id: "t4", type: "footer", props: { title: "SteamWriterAi", desc: "Your Academic Research Operating System.", links: ["Features", "Pricing", "Blog", "Contact"], socials: ["Twitter", "LinkedIn", "GitHub"], bg: "#182033" } },
    ],
  },
  minimal: {
    name: "Minimal",
    blocks: [
      { id: "t1", type: "heading", props: { ...cloneDefaults("heading"), text: "Less, but better.", align: "center", font: 36 } },
      { id: "t2", type: "text", props: { ...cloneDefaults("text"), text: "A clean, focused page with just the essentials.", align: "center" } },
      { id: "t3", type: "newsletter", props: { title: "Get started", text: "Create a free account today.", btn: "Sign up", background: "#6d5dfc" } },
    ],
  },
  sale: {
    name: "Promotional",
    blocks: [
      { id: "t1", type: "banner", props: { text: "Limited time — get started with SteamWriterAi today.", bg: "#6d5dfc", fg: "#ffffff" } },
      { id: "t2", type: "countdown", props: { eyebrow: "SPECIAL OFFER", title: "Offer ends soon", background: "#182033", fg: "#ffffff" } },
      { id: "t3", type: "stats", props: { items: [{ value: "₦2k", label: "Starting at" }, { value: "14", label: "Modules" }, { value: "7-day", label: "Guarantee" }, { value: "∞", label: "Lifetime" }], background: "#ffffff" } },
      { id: "t4", type: "newsletter", props: { title: "Don't miss out", text: "Create a free account and upgrade when you're ready.", btn: "Get started", background: "#6d5dfc" } },
    ],
  },
};

export const PAGE_LIST: Array<{ slug: string; name: string; route: string; description: string; sectionCount: number }> = [
  { slug: "home", name: "Home", route: "/", description: "Landing page with hero, stats, steps, CTA and footer.", sectionCount: 5 },
  { slug: "features", name: "Features", route: "/features", description: "Module categories, writing tools, analysis tools and quality assurance.", sectionCount: 5 },
  { slug: "modules", name: "Modules", route: "/modules", description: "Complete toolkit listing all 14 integrated modules.", sectionCount: 3 },
  { slug: "pricing", name: "Pricing", route: "/pricing", description: "Plans (₦2k–₦10k), comparison table, FAQ and guarantee banner.", sectionCount: 4 },
  { slug: "how-it-works", name: "How It Works", route: "/how-it-works", description: "Four-step process from topic to submission with pipeline overview.", sectionCount: 3 },
  { slug: "ai-gateway", name: "AI Gateway", route: "/ai-gateway", description: "ChatGPT 5.5 and Claude Sonnet 5 routing and quality pipeline.", sectionCount: 3 },
  { slug: "corrections", name: "Corrections", route: "/corrections", description: "Supervisor feedback upload and automatic AI correction module.", sectionCount: 3 },
  { slug: "faq", name: "FAQ", route: "/faq", description: "15 frequently asked questions across 3 categories.", sectionCount: 5 },
  { slug: "contact", name: "Contact", route: "/contact", description: "Contact form, phone, email and office location details.", sectionCount: 3 },
  { slug: "blog", name: "Blog", route: "/blog", description: "Research guides and articles — 6 published posts.", sectionCount: 3 },
  { slug: "privacy", name: "Privacy Policy", route: "/privacy", description: "Data collection, AI processing, payments and retention policies.", sectionCount: 4 },
  { slug: "terms", name: "Terms of Service", route: "/terms", description: "Acceptable use, academic integrity, IP and liability terms.", sectionCount: 4 },
  { slug: "refund", name: "Refund Policy", route: "/refund", description: "7-day satisfaction guarantee conditions and refund process.", sectionCount: 4 },
];
