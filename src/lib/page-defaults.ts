import type { PageContent, PageItem, PageSection } from "@/lib/content-types";

let counter = 0;
const uid = () => `c${Date.now().toString(36)}-${(counter++).toString(36)}`;

export function makeItem(partial: Omit<PageItem, "id">): PageItem {
  return { id: uid(), ...partial };
}

export function makeSection(partial: Omit<PageSection, "id" | "items"> & { items?: PageItem[] }): PageSection {
  return { id: uid(), items: [], ...partial };
}

export const DEFAULT_PAGES: Record<string, PageContent> = {
  home: {
    slug: "home",
    title: "Your Academic Research Operating System",
    subtitle:
      "Generate complete, submission-ready chapters from topic to final defense. AI-powered research writing with real citations, data analysis and mathematical modelling — all in one workspace.",
    sections: [
      makeSection({
        type: "hero",
        badge: "ChatGPT 5.5 & Claude Sonnet 5",
        heading: "Your Academic Research Operating System",
        subheading:
          "Generate complete, submission-ready chapters from topic to final defense. AI-powered research writing with real citations, data analysis and mathematical modelling — all in one workspace.",
        primaryCta: { label: "See Plans", href: "/pricing" },
        secondaryCta: { label: "Create Free Account", href: "/register" },
        items: [
          { id: uid(), value: "5", title: "Chapter Types" },
          { id: uid(), value: "14", title: "Core Modules" },
          { id: uid(), value: "6", title: "Citation Styles" },
          { id: uid(), value: "8", title: "Export Formats" },
        ],
      }),
      makeSection({
        type: "steps",
        heading: "From Topic to Submission in Four Steps",
        subheading:
          "No more staring at blank pages. SteamWriterAi guides you through every stage of academic writing.",
        items: [
          {
            id: uid(),
            icon: "PenLine",
            title: "Enter Your Topic",
            description:
              "Tell us your research area. Our AI discovers relevant journals, papers and references from real academic databases.",
          },
          {
            id: uid(),
            icon: "BookOpen",
            title: "Generate Chapters",
            description:
              "Choose your chapter type and preferred AI model. SteamWriterAi generates structured, academically-rigorous content instantly.",
          },
          {
            id: uid(),
            icon: "BarChart3",
            title: "Analyse & Model",
            description:
              "Upload datasets or build mathematical models. Get professional tables, graphs and statistical interpretations.",
          },
          {
            id: uid(),
            icon: "FileCheck2",
            title: "Export & Submit",
            description:
              "Download formatted DOCX, PDF or TXT. Submission-ready with proper academic formatting and a complete bibliography.",
          },
        ],
      }),
      makeSection({
        type: "pipeline",
        heading: "What Happens When You Click Generate",
        subheading:
          "Every request passes through a 7-stage AI pipeline ensuring quality, originality and academic integrity.",
        items: [
          { id: uid(), icon: "PenLine", title: "Your Prompt" },
          { id: uid(), icon: "Globe", title: "AI Gateway" },
          { id: uid(), icon: "Brain", title: "ChatGPT / Claude" },
          { id: uid(), icon: "Wand2", title: "Humanise" },
          { id: uid(), icon: "Eye", title: "AI Detection" },
          { id: uid(), icon: "ShieldCheck", title: "Plagiarism Check" },
          { id: uid(), icon: "FileCheck2", title: "Formatted Result" },
        ],
      }),
      makeSection({
        type: "cards",
        heading: "Complete Research Toolkit",
        subheading: "Fourteen integrated modules. Click any for details.",
        items: [
          { id: uid(), icon: "BookOpen", title: "Chapter Generator", description: "Chapters 1–5, proposals, seminars, theses, dissertations.", badge: "Auto-format · Versioned" },
          { id: uid(), icon: "Search", title: "Journal Discovery", description: "Crossref, OpenAlex, Semantic Scholar. Real papers.", badge: "Real data · DOI links" },
          { id: uid(), icon: "BarChart3", title: "Data Analysis Lab", description: "CSV, Excel, SPSS, STATA. Auto analysis.", badge: "CSV · SPSS · Charts" },
          { id: uid(), icon: "FunctionSquare", title: "Math Modelling", description: "SIR, SEIR, ODE, PDE, EOQ, Regression.", badge: "Simulation · Sensitivity" },
          { id: uid(), icon: "Quote", title: "Citation Engine", description: "APA 7/6, MLA, Harvard, Chicago, IEEE.", badge: "6 styles · Validation" },
          { id: uid(), icon: "MessageSquare", title: "Supervisor Corrections", description: "Upload feedback. AI revisions. Version history.", badge: "PDF/DOCX · Versioning" },
          { id: uid(), icon: "FileText", title: "Template Library", description: "Save formats, styles, structures. Reuse.", badge: "Reusable · Shareable" },
          { id: uid(), icon: "Download", title: "Export Engine", description: "DOCX, PDF, TXT. Academic formatting.", badge: "Formatted · Ready" },
          { id: uid(), icon: "Palette", title: "Custom Branding", description: "Logo upload. Auto palette. Global apply.", badge: "Logo · Theme" },
          { id: uid(), icon: "Eye", title: "AI Detection", description: "Originality.ai. Score ≤20% = Pass.", badge: "Verified · Transparent" },
          { id: uid(), icon: "ShieldCheck", title: "Plagiarism Check", description: "QuillBot. Target originality >95%.", badge: "Integration · Authentic" },
          { id: uid(), icon: "CreditCard", title: "Payment System", description: "From ₦2,000. One-time. Lifetime access.", badge: "Secure · 3 gateways" },
          { id: uid(), icon: "Settings", title: "Admin Panel", description: "Users, payments, branding, settings.", badge: "Full control · Analytics" },
          { id: uid(), icon: "LayoutGrid", title: "Research Workspace", description: "Autosave. Chapters, refs, journals, history.", badge: "Autosave · Organized" },
        ],
      }),
      makeSection({
        type: "cta",
        heading: "Ready to write?",
        subheading:
          "Join SteamWriterAi and let the writing agent draft your next chapter — rigorously structured, correctly cited, humanly written.",
        primaryCta: { label: "Get started", href: "/register" },
        secondaryCta: { label: "Log in", href: "/login" },
      }),
    ],
  },

  features: {
    slug: "features",
    title: "Every Tool You Need to Finish Your Research",
    subtitle:
      "SteamWriterAi combines fourteen integrated modules into one workspace, so you never jump between apps to write, cite, analyse and export.",
    sections: [
      makeSection({
        type: "cards",
        heading: "Writing & Content",
        items: [
          { id: uid(), icon: "BookOpen", title: "Chapter Generator", description: "Chapters one to five, proposals, seminars, questionnaires, theses and dissertations. Auto-formatted and structured." },
          { id: uid(), icon: "MessageSquare", title: "Supervisor Corrections", description: "Upload your supervisor's feedback as PDF or DOCX. AI applies every correction while preserving your argument." },
          { id: uid(), icon: "Search", title: "Journal Discovery", description: "Find real, published papers from Crossref, OpenAlex and Semantic Scholar. Every reference is genuine." },
          { id: uid(), icon: "Quote", title: "Citation Engine", description: "Validated in-text citations and bibliographies in APA 7 & 6, MLA, Harvard, Chicago and IEEE." },
        ],
      }),
      makeSection({
        type: "cards",
        heading: "Analysis & Modelling",
        items: [
          { id: uid(), icon: "BarChart3", title: "Data Analysis Lab", description: "Upload CSV or Excel files. Get a complete analysis with tables, charts, interpretations and discussion-ready text." },
          { id: uid(), icon: "FunctionSquare", title: "Math Modelling", description: "Build and simulate models like SIR, SEIR, ODE, PDE, EOQ and regression. Includes sensitivity analysis." },
          { id: uid(), icon: "FileText", title: "Template Library", description: "Save your best formats, structures and writing styles, then reuse them across projects." },
          { id: uid(), icon: "Download", title: "Export Engine", description: "Download polished DOCX, PDF or TXT documents with proper academic formatting." },
        ],
      }),
      makeSection({
        type: "cards",
        heading: "Quality & Assurance",
        items: [
          { id: uid(), icon: "Wand2", title: "AI Humanisation", description: "A built-in humanisation stage rewrites AI output so it reads naturally — the way a real researcher would write." },
          { id: uid(), icon: "Eye", title: "AI Detection Check", description: "Verify your writing against Originality.ai. Target AI score of 20% or lower, visible before submission." },
          { id: uid(), icon: "ShieldCheck", title: "Plagiarism Check", description: "Integrated QuillBot originality scanning targeting 95%+ originality before your supervisor does." },
          { id: uid(), icon: "Brain", title: "AI Gateway", description: "Route each task to the best model — OpenAI ChatGPT 5.5 or Anthropic Claude Sonnet 5 — automatically." },
        ],
      }),
      makeSection({
        type: "cards",
        heading: "Platform & Admin",
        items: [
          { id: uid(), icon: "LayoutGrid", title: "Research Workspace", description: "One organised home for chapters, journals, references and history. Autosaves everything as you write." },
          { id: uid(), icon: "Palette", title: "Custom Branding", description: "Upload your institution's logo and colours. SteamWriterAi generates a theme applied consistently across documents." },
          { id: uid(), icon: "Settings", title: "Admin Panel", description: "Manage users, verify payments, configure branding and monitor usage from a single dashboard." },
          { id: uid(), icon: "Sparkles", title: "Real-time Streaming", description: "Watch your content generate live, word by word. No waiting on a loading spinner." },
        ],
      }),
      makeSection({
        type: "cta",
        heading: "Ready to try these tools?",
        subheading: "Create a free account and start your first chapter in minutes.",
        primaryCta: { label: "Create free account", href: "/register" },
        secondaryCta: { label: "View plans", href: "/pricing" },
      }),
    ],
  },

  modules: {
    slug: "modules",
    title: "The Complete Research Toolkit",
    subtitle:
      "Fourteen integrated modules working together — from the first prompt to the final formatted document.",
    sections: [
      makeSection({
        type: "cards",
        heading: "All Modules",
        items: [
          { id: uid(), icon: "BookOpen", title: "Chapter Generator", badge: "Writing", description: "Chapters one to five, proposals, seminars, questionnaires, theses and dissertations." },
          { id: uid(), icon: "Search", title: "Journal Discovery", badge: "Writing", description: "Real papers from Crossref, OpenAlex and Semantic Scholar with verified DOI links." },
          { id: uid(), icon: "BarChart3", title: "Data Analysis Lab", badge: "Analysis", description: "CSV, Excel, SPSS or STATA with tables, charts and interpretations." },
          { id: uid(), icon: "FunctionSquare", title: "Math Modelling", badge: "Analysis", description: "SIR, SEIR, ODE, PDE, EOQ and regression models with simulation." },
          { id: uid(), icon: "Quote", title: "Citation Engine", badge: "Writing", description: "In-text citations in APA 7 & 6, MLA, Harvard, Chicago and IEEE." },
          { id: uid(), icon: "MessageSquare", title: "Supervisor Corrections", badge: "Analysis", description: "Upload supervisor feedback, apply corrections, keep version history." },
          { id: uid(), icon: "FileText", title: "Template Library", badge: "Writing", description: "Save formats and styles to reuse, or share with your group." },
          { id: uid(), icon: "Download", title: "Export Engine", badge: "Writing", description: "Submission-ready DOCX, PDF and TXT with academic formatting." },
          { id: uid(), icon: "Palette", title: "Custom Branding", badge: "Platform", description: "Upload your institution logo and colours for an auto-generated theme." },
          { id: uid(), icon: "Eye", title: "AI Detection", badge: "Quality", description: "Originality.ai integration targeting an AI score of 20% or lower." },
          { id: uid(), icon: "ShieldCheck", title: "Plagiarism Check", badge: "Quality", description: "QuillBot-powered originality scanning targeting 95%+ originality." },
          { id: uid(), icon: "CreditCard", title: "Payment System", badge: "Platform", description: "Secure payments from ₦2,000 via OPay, Moniepoint and Paystack." },
          { id: uid(), icon: "Settings", title: "Admin Panel", badge: "Platform", description: "Manage users, verify payments, configure branding and monitor usage." },
          { id: uid(), icon: "LayoutGrid", title: "Research Workspace", badge: "Platform", description: "Organised home for chapters, journals, references and history." },
        ],
      }),
      makeSection({
        type: "cta",
        heading: "One workspace. All modules.",
        subheading: "Start free, upgrade when you are ready. Every module is available in the Standard plan.",
        primaryCta: { label: "See plans", href: "/pricing" },
        secondaryCta: { label: "Create account", href: "/register" },
      }),
    ],
  },

  pricing: {
    slug: "pricing",
    title: "Choose Your Plan",
    subtitle:
      "One-time payment. Lifetime access. No recurring subscriptions. Pay once, use forever.",
    sections: [
      makeSection({
        type: "plans",
        heading: "Pricing Plans",
        items: [
          { id: uid(), title: "Basic", badge: "For undergraduate projects", price: "₦2,000", cta: "Get Basic", list: ["Chapters 1-5", "Proposals & Seminars", "Journal Discovery", "Citation Engine", "Export Engine", "Research Workspace", "1 Active Project"] },
          { id: uid(), title: "Standard", badge: "For MSc & postgraduate", price: "₦5,000", featured: true, cta: "Get Standard", list: ["Everything in Basic", "Data Analysis Lab", "Math Modelling Studio", "AI Detection Check", "Plagiarism Check", "Supervisor Corrections", "3 Active Projects"] },
          { id: uid(), title: "Premium", badge: "For PhD & research fellows", price: "₦10,000", cta: "Get Premium", list: ["Everything in Standard", "Theses & Dissertations", "Custom Branding", "Template Library", "Priority Support", "Unlimited Projects", "All Export Formats"] },
          { id: uid(), title: "Institutional", badge: "For universities & departments", price: "Custom", cta: "Contact Us", href: "/contact", list: ["Everything in Premium", "Bulk Accounts", "Dedicated Account Manager", "Custom Integration", "On-premise Option", "SLA Guarantee", "Training & Onboarding"] },
        ],
      }),
      makeSection({
        type: "comparison",
        heading: "Detailed Feature Comparison",
        items: [
          { id: uid(), title: "AI Chapter Generation", list: ["basic", "standard", "premium", "institutional"] },
          { id: uid(), title: "Proposals & Seminars", list: ["basic", "standard", "premium", "institutional"] },
          { id: uid(), title: "Journal Discovery", list: ["basic", "standard", "premium", "institutional"] },
          { id: uid(), title: "Citation Engine (6 styles)", list: ["basic", "standard", "premium", "institutional"] },
          { id: uid(), title: "Export Engine", list: ["basic", "standard", "premium", "institutional"] },
          { id: uid(), title: "Research Workspace", list: ["basic", "standard", "premium", "institutional"] },
          { id: uid(), title: "Data Analysis Lab", list: ["standard", "premium", "institutional"] },
          { id: uid(), title: "Math Modelling Studio", list: ["standard", "premium", "institutional"] },
          { id: uid(), title: "AI Detection Check", list: ["standard", "premium", "institutional"] },
          { id: uid(), title: "Plagiarism Check", list: ["standard", "premium", "institutional"] },
          { id: uid(), title: "Supervisor Corrections", list: ["standard", "premium", "institutional"] },
          { id: uid(), title: "Theses & Dissertations", list: ["premium", "institutional"] },
          { id: uid(), title: "Custom Branding", list: ["premium", "institutional"] },
          { id: uid(), title: "Template Library", list: ["premium", "institutional"] },
          { id: uid(), title: "Priority Support", list: ["premium", "institutional"] },
          { id: uid(), title: "Dedicated Account Manager", list: ["institutional"] },
          { id: uid(), title: "On-premise Option", list: ["institutional"] },
        ],
      }),
      makeSection({
        type: "cards",
        heading: "Pay With Any of These Gateways",
        subheading:
          "Your access activates once payment is confirmed — instantly with Paystack, within minutes for transfers.",
        items: [
          { id: uid(), icon: "Wallet", title: "OPay", description: "Transfer to our OPay account. Fastest manual confirmation.", badge: "Account 9056444277 · KAYODE BENJAMIN MAYOWA" },
          { id: uid(), icon: "Landmark", title: "Moniepoint", description: "Send a transfer from your Moniepoint app with your reference.", badge: "Account details shared after signup" },
          { id: uid(), icon: "Sparkles", title: "Paystack", description: "Instant card, bank transfer or USSD payment in a secure popup.", badge: "Activates instantly" },
        ],
      }),
      makeSection({
        type: "faq",
        heading: "Pricing FAQ",
        items: [
          { id: uid(), title: "Is this a one-time payment or subscription?", description: "One-time payment. You pay once and get lifetime access. No monthly or annual subscriptions. No hidden fees." },
          { id: uid(), title: "Can I upgrade my plan later?", description: "Yes. Upgrade from Basic to Standard or Premium at any time by paying the difference. Your existing work is preserved." },
          { id: uid(), title: "What payment methods do you accept?", description: "OPay and Moniepoint bank transfers, plus instant card/bank/USSD payments through Paystack." },
          { id: uid(), title: "How long does verification take?", description: "OPay transfers are usually confirmed within minutes. Receipt verification typically takes up to 24 hours." },
          { id: uid(), title: "Do you offer student discounts?", description: "For bulk institutional purchases (10+ accounts), contact us for special pricing." },
        ],
      }),
      makeSection({
        type: "cta",
        heading: "7-Day Satisfaction Guarantee",
        subheading:
          "If you're not completely satisfied within 7 days of purchase (and fewer than 3 chapters generated), we'll issue a full refund. No questions asked.",
        primaryCta: { label: "Get started today", href: "/register" },
        secondaryCta: { label: "View refund policy", href: "/refund" },
      }),
    ],
  },

  "how-it-works": {
    slug: "how-it-works",
    title: "From Topic to Submission in Four Steps",
    subtitle:
      "SteamWriterAi removes the blank-page problem. Describe your research, and the agent handles structure, citation, analysis and formatting.",
    sections: [
      makeSection({
        type: "steps",
        heading: "How It Works",
        items: [
          { id: uid(), icon: "PenLine", title: "Step 1 — Enter Your Topic", description: "Create a free account and tell us your research area. You can also upload your project brief, proposal draft or supervisor's guideline." },
          { id: uid(), icon: "BookOpen", title: "Step 2 — Generate Chapters", description: "Choose a chapter type and your preferred AI model. SteamWriterAi drafts structured, referenced content instantly." },
          { id: uid(), icon: "BarChart3", title: "Step 3 — Analyse & Model", description: "Upload your dataset or describe your model. Get tables, charts, statistical interpretations and simulations." },
          { id: uid(), icon: "FileCheck2", title: "Step 4 — Export & Submit", description: "Review, revise with corrections, then download a formatted DOCX or PDF with a complete bibliography." },
        ],
      }),
      makeSection({
        type: "pipeline",
        heading: "Behind Every Generation: The 7-Stage Pipeline",
        subheading: "Every request flows through the same quality pipeline, so the result is always structured, original and correctly cited.",
        items: [
          { id: uid(), icon: "PenLine", title: "Your Prompt", description: "Your topic and requirements" },
          { id: uid(), icon: "Globe", title: "AI Gateway", description: "Route to the best model" },
          { id: uid(), icon: "Brain", title: "ChatGPT / Claude", description: "Structured generation" },
          { id: uid(), icon: "Wand2", title: "Humanise", description: "Natural, personal tone" },
          { id: uid(), icon: "Eye", title: "AI Detection", description: "Target score ≤ 20%" },
          { id: uid(), icon: "ShieldCheck", title: "Plagiarism Check", description: "Target originality 95%+" },
          { id: uid(), icon: "FileCheck2", title: "Formatted Result", description: "Submission-ready output" },
        ],
      }),
      makeSection({
        type: "cta",
        heading: "Start your first chapter",
        subheading: "It takes less than a minute to set up your workspace.",
        primaryCta: { label: "Create free account", href: "/register" },
        secondaryCta: { label: "See plans", href: "/pricing" },
      }),
    ],
  },

  "ai-gateway": {
    slug: "ai-gateway",
    title: "The AI Gateway Behind Every Chapter",
    subtitle:
      "SteamWriterAi routes each research task to the strongest model for the job, then humanises, checks and verifies the result — so you always submit work that is original and correctly cited.",
    sections: [
      makeSection({
        type: "cards",
        heading: "Two Flagship Models",
        items: [
          { id: uid(), icon: "Brain", title: "OpenAI ChatGPT 5.5", description: "Best for detailed structured chapters, deep analysis and complex prompts." },
          { id: uid(), icon: "Sparkles", title: "Anthropic Claude Sonnet 5", description: "Best for natural academic prose, long-form writing and careful citations." },
        ],
      }),
      makeSection({
        type: "pipeline",
        heading: "What Happens Per Request",
        subheading: "Every generation passes through the full quality pipeline below.",
        items: [
          { id: uid(), icon: "Globe", title: "Intelligent Routing", description: "Each task is sent to the model best suited to it, or your manual pick." },
          { id: uid(), icon: "Wand2", title: "Humanisation Layer", description: "Removes AI tells so your work reads like yours." },
          { id: uid(), icon: "Eye", title: "AI Detection Check", description: "Originality.ai scan targeting ≤20% before submission." },
          { id: uid(), icon: "ShieldCheck", title: "Plagiarism Check", description: "QuillBot scan targeting 95%+ originality." },
          { id: uid(), icon: "FileCheck2", title: "Verified Output", description: "Structured, correctly cited and formatted for your template." },
        ],
      }),
      makeSection({
        type: "cta",
        heading: "Write with the best models",
        subheading: "Your choice of model comes free on every paid plan.",
        primaryCta: { label: "Start writing", href: "/register" },
        secondaryCta: { label: "See plans", href: "/pricing" },
      }),
    ],
  },

  corrections: {
    slug: "corrections",
    title: "Never Fight With Red Pen Marks Again",
    subtitle:
      "Upload your supervisor's feedback and SteamWriterAi applies every correction automatically — with version history and unlimited revisions.",
    sections: [
      makeSection({
        type: "steps",
        heading: "How Corrections Work",
        items: [
          { id: uid(), icon: "Upload", title: "1. Upload Feedback", description: "Drop your supervisor's corrections into the workspace — PDF, DOCX or a typed list. We extract every comment, even margin notes." },
          { id: uid(), icon: "Wand2", title: "2. AI Applies Changes", description: "The agent edits each chapter, addressing every point while keeping your argument intact. Nothing is skipped." },
          { id: uid(), icon: "MessageSquare", title: "3. Review & Ask", description: "See a summary of what changed. Ask follow-up questions or request a rewrite of any section." },
          { id: uid(), icon: "History", title: "4. Track Versions", description: "Every revision is saved with version history, so you can compare or restore earlier drafts." },
        ],
      }),
      makeSection({
        type: "cards",
        heading: "Everything the Correction Module Handles",
        items: [
          { id: uid(), icon: "CheckCircle2", title: "Margin notes", description: "Handles margin notes, track changes and comment threads." },
          { id: uid(), icon: "ListChecks", title: "Correction summary", description: "Keeps a correction summary for your defense preparation." },
          { id: uid(), icon: "History", title: "Unlimited revisions", description: "Unlimited revisions on all plans with one-click restore." },
          { id: uid(), icon: "BookOpen", title: "All document types", description: "Works across chapters one to five and proposals." },
        ],
      }),
      makeSection({
        type: "cta",
        heading: "Focus on defending, not decoding",
        subheading: "Get the Corrections module today.",
        primaryCta: { label: "Get started", href: "/register" },
        secondaryCta: { label: "See plans", href: "/pricing" },
      }),
    ],
  },

  faq: {
    slug: "faq",
    title: "Frequently Asked Questions",
    subtitle:
      "Everything you need to know about SteamWriterAi, payments and the writing agent. Can't find an answer? Contact us.",
    sections: [
      makeSection({
        type: "faq",
        heading: "Getting Started",
        items: [
          { id: uid(), title: "What is SteamWriterAi?", description: "SteamWriterAi is an AI research writing platform that generates complete, structured research chapters, proposals, questionnaires and references, with data analysis, modelling and plagiarism checks." },
          { id: uid(), title: "Do I need technical skills to use it?", description: "No. If you can type a prompt or upload a file, you can use SteamWriterAi. The agent handles formatting, citations and structure automatically." },
          { id: uid(), title: "Is there a free plan?", description: "Yes. You can create a free account to explore the workspace. Generating full chapters requires a one-time Research Access plan." },
        ],
      }),
      makeSection({
        type: "faq",
        heading: "Payments & Plans",
        items: [
          { id: uid(), title: "Is payment a subscription?", description: "No. SteamWriterAi is a one-time payment per research project topic. You pay once and keep lifetime access." },
          { id: uid(), title: "Which payment methods do you accept?", description: "OPay and Moniepoint bank transfers, plus instant card, bank transfer and USSD payments through Paystack." },
          { id: uid(), title: "How long does payment verification take?", description: "Paystack payments activate instantly. OPay transfers are usually confirmed within minutes. Other transfers may take up to 24 hours." },
          { id: uid(), title: "Can I upgrade my plan later?", description: "Yes. Upgrade from Basic to Standard or Premium anytime by paying the difference. Your existing work is preserved." },
        ],
      }),
      makeSection({
        type: "faq",
        heading: "The AI Agent",
        items: [
          { id: uid(), title: "Will the AI invent my references?", description: "No. The agent only cites sources you provide or upload. Every in-text citation is validated against your bibliography." },
          { id: uid(), title: "Is the writing detected as AI?", description: "Every output passes through humanisation and an Originality.ai check targeting an AI score of 20% or lower." },
          { id: uid(), title: "Can I use my own sources and supervisor feedback?", description: "Yes. Upload your papers, PDFs and supervisor corrections. The agent writes strictly from your materials." },
          { id: uid(), title: "Which AI models power SteamWriterAi?", description: "OpenAI ChatGPT 5.5 and Anthropic Claude Sonnet 5 through our AI Gateway, which routes each task to the best model." },
        ],
      }),
      makeSection({
        type: "faq",
        heading: "Account & Support",
        items: [
          { id: uid(), title: "How do I reset my password?", description: "Use the 'Forgot password' link on the login page. A reset link is sent to your email." },
          { id: uid(), title: "Can I use SteamWriterAi on multiple devices?", description: "Yes. Your workspace syncs across any device wherever you sign in." },
          { id: uid(), title: "How do I contact support?", description: "Email hello@steamwriterai.com or call +234 905 644 4277, Monday to Saturday, 7AM–9PM WAT." },
          { id: uid(), title: "What is your refund policy?", description: "We offer a 7-day satisfaction guarantee. See our refund policy for details." },
        ],
      }),
      makeSection({
        type: "cta",
        heading: "Still have questions?",
        subheading: "Our support team replies within a few hours on business days.",
        primaryCta: { label: "Contact support", href: "/contact" },
        secondaryCta: { label: "Get started", href: "/register" },
      }),
    ],
  },

  contact: {
    slug: "contact",
    title: "We're Here to Help",
    subtitle:
      "Questions about a plan, a payment or your account? Reach out and our team will get back to you quickly.",
    sections: [
      makeSection({
        type: "channels",
        heading: "Contact Channels",
        items: [
          { id: uid(), icon: "Phone", title: "Phone", value: "+234 905 644 4277", hint: "Mon–Sat, 7AM–9PM WAT" },
          { id: uid(), icon: "Mail", title: "Email", value: "hello@steamwriterai.com", hint: "Replies within a few hours" },
          { id: uid(), icon: "MapPin", title: "Location", value: "Lagos, Nigeria", hint: "Serving researchers worldwide" },
          { id: uid(), icon: "Clock", title: "Hours", value: "Mon–Sat: 7AM–9PM WAT", hint: "Sunday: closed" },
        ],
      }),
      makeSection({
        type: "contact",
        heading: "Send us a message",
        subheading: "Use the form or email us directly — either way, we reply fast.",
      }),
      makeSection({
        type: "cta",
        heading: "Prefer to read first?",
        subheading: "Most questions are answered in our FAQ — or check the pricing page.",
        primaryCta: { label: "Read the FAQ", href: "/faq" },
        secondaryCta: { label: "See pricing", href: "/pricing" },
      }),
    ],
  },

  blog: {
    slug: "blog",
    title: "The SteamWriterAi Research Blog",
    subtitle:
      "Practical, no-fluff guides for researchers — writing, citations, data analysis, AI detection and preparing for your defence.",
    sections: [
      makeSection({
        type: "blogs",
        heading: "Latest Articles",
        items: [
          { id: uid(), slug: "chapters-one-to-five", icon: "BookOpen", title: "How to Write Chapters One to Five of a Research Project", description: "A step-by-step breakdown of every chapter with the exact structure supervisors expect.", category: "Writing Guide", date: "Jul 28, 2026", readTime: "8 min read" },
          { id: uid(), slug: "apa-7-citations", icon: "Quote", title: "APA 7 Citations Made Simple: A Complete Guide", description: "Never guess another reference again. Learn the rules and the common mistakes that cost marks.", category: "Citations", date: "Jul 21, 2026", readTime: "6 min read" },
          { id: uid(), slug: "data-analysis-beginners", icon: "BarChart3", title: "Data Analysis for Beginners: SPSS, Excel and Beyond", description: "Not a statistician? This guide walks you through descriptive statistics, charts and interpreting results.", category: "Data Analysis", date: "Jul 14, 2026", readTime: "9 min read" },
          { id: uid(), slug: "reduce-ai-detection-score", icon: "Eye", title: "How to Lower Your AI Detection Score Before Submitting", description: "What AI detectors actually measure, and practical ways to humanise AI-assisted writing.", category: "AI & Integrity", date: "Jul 7, 2026", readTime: "7 min read" },
          { id: uid(), slug: "thesis-defence-prep", icon: "GraduationCap", title: "Preparing for Your Thesis Defence: A Checklist", description: "From predicting questions to polishing your slides — walk into your defence room with confidence.", category: "Defence", date: "Jun 30, 2026", readTime: "5 min read" },
          { id: uid(), slug: "mathematical-models-research", icon: "FunctionSquare", title: "Mathematical Models in Research: SIR, SEIR and Beyond", description: "An accessible introduction to the models most used in postgraduate research.", category: "Modelling", date: "Jun 23, 2026", readTime: "10 min read" },
        ],
      }),
      makeSection({
        type: "cta",
        heading: "Want more guides like these?",
        subheading: "Subscribe to the newsletter in the footer and get fresh research tips every week.",
        primaryCta: { label: "Start writing with SteamWriterAi", href: "/register" },
      }),
    ],
  },

  privacy: {
    slug: "privacy",
    title: "Privacy Policy",
    subtitle: "Last updated: August 2026. How SteamWriterAi collects, uses and protects your information.",
    sections: [
      makeSection({
        type: "text",
        heading: "Privacy Policy",
        items: [
          { id: uid(), title: "1. Information We Collect", description: "We collect the information you provide when you create an account, payment records necessary to provide access, and content you upload or generate within the platform." },
          { id: uid(), title: "2. How We Use Your Information", description: "We use your information to operate your account, process payments, generate and save your research content, and provide customer support." },
          { id: uid(), title: "3. Your Research Content", description: "Your research content is yours. We do not sell, rent or publish your drafts, datasets or documents." },
          { id: uid(), title: "4. AI Processing", description: "Your prompts and uploaded materials are processed by the AI providers that power SteamWriterAi. We do not use your content to train models on your behalf." },
          { id: uid(), title: "5. Payments", description: "Payments are processed through OPay, Moniepoint and Paystack. We do not store your card details." },
          { id: uid(), title: "6. Cookies & Analytics", description: "We use essential cookies to keep you signed in and basic analytics. We do not sell your personal data." },
          { id: uid(), title: "7. Data Retention", description: "We keep your account and content while active. You may delete your account at any time." },
          { id: uid(), title: "8. Security", description: "We use industry-standard encryption and access controls to protect your data." },
          { id: uid(), title: "9. Children's Privacy", description: "SteamWriterAi is intended for users aged 16 and above." },
          { id: uid(), title: "10. Changes to This Policy", description: "We may update this policy from time to time. Material changes will be announced." },
          { id: uid(), title: "11. Contact Us", description: "For privacy questions, contact us at hello@steamwriterai.com or +234 905 644 4277." },
        ],
      }),
    ],
  },

  terms: {
    slug: "terms",
    title: "Terms of Service",
    subtitle: "Last updated: August 2026. The rules that govern your use of SteamWriterAi.",
    sections: [
      makeSection({
        type: "text",
        heading: "Terms of Service",
        items: [
          { id: uid(), title: "1. Acceptance of Terms", description: "By creating an account or using SteamWriterAi, you agree to these Terms of Service. If you do not agree, please do not use the platform." },
          { id: uid(), title: "2. Eligibility", description: "You must be at least 16 years old to use SteamWriterAi and confirm the information you provide is accurate." },
          { id: uid(), title: "3. Your Account", description: "You are responsible for keeping your login credentials secure and for all activity under your account." },
          { id: uid(), title: "4. Payments & Access", description: "Access requires a one-time payment per research project topic. Fees are non-refundable except as described in our Refund Policy." },
          { id: uid(), title: "5. Acceptable Use", description: "You agree not to use SteamWriterAi unlawfully, access others' accounts, scrape the platform, or misrepresent AI-generated work where disclosure is required." },
          { id: uid(), title: "6. Academic Integrity", description: "You are responsible for complying with your institution's academic integrity and AI-use policies." },
          { id: uid(), title: "7. Intellectual Property", description: "SteamWriterAi software and branding are owned by SteamWriterAi. Content you generate belongs to you." },
          { id: uid(), title: "8. Privacy", description: "Your use of SteamWriterAi is governed by our Privacy Policy." },
          { id: uid(), title: "9. Disclaimers", description: "The platform is provided 'as is'. We do not guarantee specific academic outcomes or grades." },
          { id: uid(), title: "10. Limitation of Liability", description: "SteamWriterAi is not liable for indirect, incidental or consequential damages from your use." },
          { id: uid(), title: "11. Termination", description: "We may suspend or terminate accounts that violate these terms. You may delete your account at any time." },
          { id: uid(), title: "12. Changes to Terms", description: "We may update these terms. Material changes will be announced." },
          { id: uid(), title: "13. Governing Law", description: "These terms are governed by the laws of the Federal Republic of Nigeria." },
          { id: uid(), title: "14. Contact", description: "Questions? Contact hello@steamwriterai.com or +234 905 644 4277." },
        ],
      }),
    ],
  },

  refund: {
    slug: "refund",
    title: "Refund Policy",
    subtitle:
      "We stand behind SteamWriterAi with a 7-day satisfaction guarantee. If it isn't right for you, ask for a full refund — no hard feelings.",
    sections: [
      makeSection({
        type: "faq",
        heading: "7-Day Satisfaction Guarantee",
        items: [
          { id: uid(), title: "Request within 7 days of purchase", description: "Refund requests are eligible within 7 days of the purchase date." },
          { id: uid(), title: "Fewer than 3 chapters generated", description: "Eligible if fewer than 3 chapters have been generated on the project." },
          { id: uid(), title: "No terms violation", description: "The account must not have violated our Terms of Service." },
          { id: uid(), title: "No chargeback initiated", description: "No chargeback may have been initiated with the payment provider." },
        ],
      }),
      makeSection({
        type: "cards",
        heading: "How to request a refund",
        items: [
          { id: uid(), icon: "Mail", title: "1. Email us", description: "Send your request to hello@steamwriterai.com with the email used for payment and your payment reference." },
          { id: uid(), icon: "CreditCard", title: "2. We verify", description: "Our team confirms the purchase and checks eligibility within 1–2 business days." },
          { id: uid(), icon: "CheckCircle2", title: "3. Refund issued", description: "Approved refunds are returned to the original payment method within 5–10 business days." },
        ],
      }),
      makeSection({
        type: "text",
        heading: "Payment finality",
        items: [
          { id: uid(), description: "After the 7-day window, or after 3+ chapters are generated, payments are final. This protects the work, infrastructure and AI processing costs behind your project." },
        ],
      }),
    ],
  },
};

export const BLOG_POSTS: { slug: string; icon: string; title: string; excerpt: string; category: string; date: string; readTime: string; gradient: string; body: { heading?: string; text: string }[] }[] = [
  {
    slug: "chapters-one-to-five",
    icon: "BookOpen",
    title: "How to Write Chapters One to Five of a Research Project",
    excerpt:
      "A step-by-step breakdown of every chapter — from background and objectives to analysis, findings and conclusions — with the exact structure supervisors expect.",
    category: "Writing Guide",
    date: "Jul 28, 2026",
    readTime: "8 min read",
    gradient: "from-blue-500 to-blue-700",
    body: [
      { heading: "Chapter One: Introduction", text: "Start with the background of the study, the problem statement and the research questions. Keep the objectives specific and measurable. End with the significance, scope and the operational definition of terms." },
      { heading: "Chapter Two: Literature Review", text: "Organise the review thematically, not alphabetically. Present the theoretical framework first, then conceptual and empirical reviews. Every claim must carry a citation that exists in your reference list." },
      { heading: "Chapter Three: Methodology", text: "Describe the research design, population, sample size and sampling technique. Explain your instruments and how you established validity and reliability. Detail the method of data analysis." },
      { heading: "Chapter Four: Data Analysis", text: "Present the results objectively — tables and figures first, then a brief narrative interpretation. Do not discuss or justify the results in this chapter; save that for Chapter Five." },
      { heading: "Chapter Five: Summary & Conclusion", text: "Summarise the key findings in relation to your research questions. Draw conclusions, state the contributions to knowledge, and list recommendations for policy and further research." },
    ],
  },
  {
    slug: "apa-7-citations",
    icon: "Quote",
    title: "APA 7 Citations Made Simple: A Complete Guide",
    excerpt:
      "Never guess another reference again. Learn the rules for in-text citations, reference lists, and the common mistakes that cost students marks.",
    category: "Citations",
    date: "Jul 21, 2026",
    readTime: "6 min read",
    gradient: "from-violet-500 to-violet-700",
    body: [
      { heading: "In-text citations", text: "APA 7 uses the author-date system. One author: (Obi, 2024). Two authors: (Obi & Ade, 2024). Three or more: (Obi et al., 2024). Direct quotes need a page number: (Obi, 2024, p. 12)." },
      { heading: "Reference list entries", text: "Author, A. A. (Year). Title of the work. Publisher. For a journal article: Author, A. A. (Year). Title of article. Journal Name, Volume(Issue), pages. https://doi.org/xxxx" },
      { heading: "Common mistakes", text: "Checklist: no hanging indent, missing DOI, author names not inverted, italics on the wrong part of the title, and sources in the reference list that were never cited in the text." },
      { heading: "Use a validator", text: "SteamWriterAi's Citation Engine validates every in-text citation against your bibliography, so the reference list always matches what appears in your chapters." },
    ],
  },
  {
    slug: "data-analysis-beginners",
    icon: "BarChart3",
    title: "Data Analysis for Beginners: SPSS, Excel and Beyond",
    excerpt:
      "Not a statistician? This guide walks you through descriptive statistics, charts, and interpreting results for your analysis chapter.",
    category: "Data Analysis",
    date: "Jul 14, 2026",
    readTime: "9 min read",
    gradient: "from-green-500 to-green-700",
    body: [
      { heading: "Clean your data first", text: "Remove duplicates, decide how to treat missing values, and check for outliers before running any analysis. Garbage in, garbage out is the first law of statistics." },
      { heading: "Descriptive statistics", text: "Report the mean, median, standard deviation and frequencies for each variable. These give readers a quick sense of your data before any inferential tests." },
      { heading: "Choosing the right test", text: "Correlations for relationships between continuous variables, t-tests for comparing two groups, ANOVA for three or more, chi-square for categorical data, regression to predict." },
      { heading: "Presenting results", text: "Lead with a table, then a figure, then one short paragraph interpreting the numbers. Avoid repeating the table in words — interpret, don't recite." },
    ],
  },
  {
    slug: "reduce-ai-detection-score",
    icon: "Eye",
    title: "How to Lower Your AI Detection Score Before Submitting",
    excerpt:
      "What AI detectors actually measure, and practical ways to humanise AI-assisted writing so your work stays honest and undetectable.",
    category: "AI & Integrity",
    date: "Jul 7, 2026",
    readTime: "7 min read",
    gradient: "from-amber-500 to-orange-700",
    body: [
      { heading: "What detectors measure", text: "AI detectors look for low-perplexity text — writing that is too predictable. They flag uniform sentence length, formulaic transitions and overpolished phrasing." },
      { heading: "Write like you talk", text: "Add your own voice: contractions, short punchy sentences next to long ones, and examples from your own experience. Varying sentence rhythm lowers detection scores dramatically." },
      { heading: "Restructure, don't just rephrase", text: "Moving words around is not enough. Change the paragraph order, split long paragraphs, and integrate your own analysis between AI-generated passages." },
      { heading: "Use the built-in check", text: "SteamWriterAi runs every generation through Originality.ai targeting a score of 20% or lower, so you always see where you stand before submitting." },
    ],
  },
  {
    slug: "thesis-defence-prep",
    icon: "GraduationCap",
    title: "Preparing for Your Thesis Defence: A Checklist",
    excerpt:
      "From predicting questions to polishing your slides — the complete checklist to walk into your defence room with confidence.",
    category: "Defence",
    date: "Jun 30, 2026",
    readTime: "5 min read",
    gradient: "from-sky-500 to-indigo-700",
    body: [
      { heading: "Know your work cold", text: "Be able to explain why you chose your topic, your methodology and your findings without looking at notes. The panel wants to see ownership, not memorisation." },
      { heading: "Predict the questions", text: "Panels almost always ask: Why this topic? Why this methodology? What would you do differently? What are the limitations? Prepare one-minute answers for each." },
      { heading: "Polish your slides", text: "Fewer than ten slides for a fifteen-minute presentation. One idea per slide, charts over text, and a visible roadmap at the start." },
      { heading: "Practice out loud", text: "Time yourself, record yourself, and present to a friend. Confidence in the room comes from repetition beforehand." },
    ],
  },
  {
    slug: "mathematical-models-research",
    icon: "FunctionSquare",
    title: "Mathematical Models in Research: SIR, SEIR and Beyond",
    excerpt:
      "An accessible introduction to the models most used in postgraduate research, with tips on presenting parameters and sensitivity analysis.",
    category: "Modelling",
    date: "Jun 23, 2026",
    readTime: "10 min read",
    gradient: "from-rose-500 to-pink-700",
    body: [
      { heading: "Why models matter", text: "Mathematical models turn assumptions into testable predictions. In epidemiology, SIR and SEIR models are the standard way to simulate disease spread and evaluate interventions." },
      { heading: "SIR and SEIR in plain terms", text: "SIR splits the population into Susceptible, Infected and Recovered. SEIR adds an Exposed compartment for diseases with an incubation period. The transmission rate β and recovery rate γ drive everything." },
      { heading: "Presenting parameters", text: "Show every parameter in a table — symbol, meaning, value, source. A parameter without a source is a red flag for any examiner." },
      { heading: "Sensitivity analysis", text: "Vary each parameter within a sensible range and show how the outcome changes. This proves your model's conclusions are robust, not accidental." },
    ],
  },
];
