export interface KbIntent {
  keywords: string[];
  answer: string;
  followUp?: string;
}

export const KB_INTENTS: KbIntent[] = [
  {
    keywords: ["price", "pricing", "plan", "cost", "how much", "₦"],
    answer:
      "SteamWriterAi has three one-time plans: Basic (₦2,000), Standard (₦5,000, most popular) and Premium (₦10,000). All include lifetime access — no subscriptions. You can also request Institutional pricing for 10+ accounts.",
    followUp: "Want to see the full comparison? Visit /pricing",
  },
  {
    keywords: ["pay", "payment", "opay", "moniepoint", "paystack", "transfer", "card"],
    answer:
      "We accept three payment methods: OPay transfer (account 9056444277, KAYODE BENJAMIN MAYOWA — fastest confirmation), Moniepoint transfer, and Paystack (instant card/bank/USSD popup). Paystack activates instantly; other transfers confirm within minutes.",
    followUp: "Ready to pay? Create an account at /register first.",
  },
  {
    keywords: ["register", "signup", "sign up", "create account", "new account"],
    answer:
      "Click 'Get Started' in the top-right corner or visit /register. It takes less than a minute — just your name, email and password. You'll be taken straight to your dashboard.",
  },
  {
    keywords: ["login", "sign in", "log in", "password", "forgot"],
    answer:
      "Visit /login to sign in. If you forgot your password, click 'Forgot password?' on the login page — a reset link will be sent to your email.",
  },
  {
    keywords: ["feature", "what can", "what does", "do you", "help me"],
    answer:
      "SteamWriterAi is an AI research writing platform that generates chapters 1–5, proposals, questionnaires, questionnaires, references and more. It includes 14 modules: Chapter Generator, Journal Discovery, Data Analysis, Math Modelling, Citation Engine, Corrections, AI Detection, Plagiarism Check and more.",
    followUp: "Want to see all features? Visit /features or /modules",
  },
  {
    keywords: ["ai", "chatgpt", "claude", "model", "gpt"],
    answer:
      "SteamWriterAi is powered by OpenAI ChatGPT 5.5 and Anthropic Claude Sonnet 5 through our AI Gateway. You can choose your preferred model or let the system pick the best one for your task automatically.",
    followUp: "Learn more at /ai-gateway",
  },
  {
    keywords: ["chapter", "thesis", "proposal", "write", "research", "paper"],
    answer:
      "You can generate chapters 1–5, proposals, seminars, questionnaires, theses and dissertations. Just enter your topic, choose a chapter type and model, and SteamWriterAi generates structured, referenced content instantly.",
    followUp: "See how it works: /how-it-works",
  },
  {
    keywords: ["citation", "reference", "apa", "bibliography"],
    answer:
      "The Citation Engine supports APA 7 & 6, MLA, Harvard, Chicago and IEEE. Every in-text citation is validated against your bibliography — SteamWriterAi can never invent a reference.",
  },
  {
    keywords: ["analysis", "data", "statistic", "excel", "csv", "spss"],
    answer:
      "The Data Analysis Lab accepts CSV, Excel, SPSS and STATA files. You'll get tables, charts, statistical interpretations and discussion-ready text.",
  },
  {
    keywords: ["correction", "supervisor", "feedback", "revision", "red pen"],
    answer:
      "Upload your supervisor's corrections as PDF, DOCX or a typed list. The AI applies every revision, keeps a version history and you can restore any previous draft.",
    followUp: "Learn more: /corrections",
  },
  {
    keywords: ["ai detect", "plagiarism", "original", "turnitin"],
    answer:
      "Every generation passes through an AI Detection check (Originality.ai, targeting ≤20% score) and a Plagiarism Check (QuillBot, targeting 95%+ originality). You can see both scores before submitting.",
  },
  {
    keywords: ["refund", "money back", "cancel"],
    answer:
      "We offer a 7-day satisfaction guarantee. If you request a refund within 7 days of purchase and have generated fewer than 3 chapters, you'll get a full refund to your original payment method.",
    followUp: "Full policy: /refund",
  },
  {
    keywords: ["export", "download", "docx", "pdf"],
    answer:
      "You can export your work as a formatted DOCX, PDF or TXT with proper academic margins, fonts, headings and page numbers — submission-ready.",
  },
  {
    keywords: ["admin", "dashboard", "panel"],
    answer:
      "Admins can access /admin/dashboard to manage users, verify payments and configure branding. The Page Builder at /admin/page-builder lets you edit every public page.",
  },
  {
    keywords: ["page builder", "edit page", "edit site", "cms", "content"],
    answer:
      "The Page Builder at /admin/page-builder lets admins edit the title, subtitle, sections, items and CTAs of every public page. Changes save instantly and appear live.",
  },
  {
    keywords: ["navigate", "where", "page", "link"],
    answer:
      "Use the navigation menu at the top: Home, Features, Modules, Pricing, Blog. You can also visit: /features, /modules, /pricing, /ai-gateway, /corrections, /how-it-works, /blog, /faq, /contact",
  },
  {
    keywords: ["hello", "hi", "hey", "good morning", "good afternoon", "good evening"],
    answer:
      "Hello! I'm the SteamWriterAi assistant. I can help you with pricing, payments, features, navigation or getting started. What would you like to know?",
  },
  {
    keywords: ["live agent", "human", "person", "support", "talk to", "help"],
    answer:
      "I'll connect you with a human support agent. You can also reach us directly: hello@steamwriterai.com or +234 905 644 4277 (Mon–Sat, 7AM–9PM WAT). Would you like to send a message now?",
    followUp: "LIVE_AGENT",
  },
  {
    keywords: ["thank", "thanks", "great", "perfect", "awesome"],
    answer:
      "You're welcome! Is there anything else I can help you with about SteamWriterAi?",
  },
  {
    keywords: ["account", "profile", "settings"],
    answer:
      "You can manage your account at /user/settings. From there you can update your profile, change your password and manage notifications.",
  },
];

export function matchIntent(query: string): { answer: string; followUp?: string } {
  const q = query.toLowerCase();
  let bestScore = 0;
  let best: KbIntent | null = null;
  for (const intent of KB_INTENTS) {
    const score = intent.keywords.filter((kw) => q.includes(kw)).length;
    if (score > bestScore) {
      bestScore = score;
      best = intent;
    }
  }
  if (best && bestScore > 0) {
    return { answer: best.answer, followUp: best.followUp };
  }
  return {
    answer:
      "I'm not sure about that. I can help with pricing, payments, features, navigation, or connecting you with a human agent. Could you rephrase your question?",
    followUp: "Try asking about pricing, features, or how to get started.",
  };
}
