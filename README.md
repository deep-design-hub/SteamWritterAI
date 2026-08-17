<div align="center">

<img src="public/logo.png" alt="SteamWriterAi Logo" width="100" />

# SteamWriterAi

### Your Academic Research Operating System

AI-powered research writing platform that generates complete, submission-ready chapters from topic to final defense.

[![Live Demo](https://img.shields.io/badge/LIVE-DEMO-1B8B2C?style=for-the-badge&logo=vercel&logoColor=white)](https://steamwriterai.com)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

</div>

---

<br/>

## About

SteamWriterAi is a full-stack AI research writing platform built for postgraduate students and researchers. It generates structured, academically-rigorous research chapters (1-5), proposals, questionnaires, and references -- complete with real citations, data analysis, and mathematical modelling.

Powered by **OpenAI GPT-4o** and **Anthropic Claude Sonnet** through an **Ensemble AI Gateway** that routes tasks to the best model automatically.

<br/>

## Features

<table>
<tr>
<td width="50%">

### AI Writing Engine
- 14 document types (Chapters 1-5, proposals, theses, questionnaires...)
- Real APA 7 citations from provided sources
- British English, formal academic register
- 1500-3000 word chapters with numbered headings
- Markdown tables with captions
- Ensemble AI fallback system

</td>
<td width="50%">

### Platform Modules
- Journal Discovery from academic databases
- Citation Engine (APA, MLA, Chicago, Harvard, IEEE, Vancouver)
- Data Analysis Lab with charts & statistics
- Math Modelling (SIR, SEIR, ODE, PDE, EOQ)
- AI Detection & Plagiarism Checking
- Corrections Engine for supervisor revisions

</td>
</tr>
<tr>
<td width="50%">

### Export & Templates
- Download as DOCX, PDF, TXT, LaTeX
- Pre-built templates for all document types
- Reference Manager with auto-formatting
- Humanisation mode to pass AI detection
- Custom headers, footers & institutional formatting

</td>
<td width="50%">

### Admin & CMS
- Visual Page Builder for 13 marketing pages
- User & Payment management dashboard
- AI Model enable/disable per provider
- Mail tester & SMTP configuration
- Platform analytics & conversion tracking
- 6-config Settings panel (General, Mail, Security, Config, Cache, SEO)

</td>
</tr>
</table>

<br/>

## Tech Stack

<div align="center">

| Layer | Technology |
|-------|-----------|
| **Framework** | [Next.js 16](https://nextjs.org) -- App Router, Turbopack |
| **Language** | [TypeScript 5](https://typescriptlang.org) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com) |
| **Animations** | [Framer Motion 13](https://motion.dev) |
| **State** | [Zustand 5](https://zustand-demo.pmnd.rs) with localStorage persistence |
| **AI SDK** | [Vercel AI SDK 7](https://sdk.vercel.ai) -- OpenAI + Anthropic adapters |
| **Email** | [Nodemailer 9](https://nodemailer.com) via Gmail SMTP |
| **Icons** | [Lucide React](https://lucide.dev) + Custom Icon System |
| **Payments** | Paystack, OPay, Moniepoint |
| **Deployment** | [Netlify](https://netlify.com) / [Vercel](https://vercel.com) |

</div>

<br/>

## Getting Started

### Prerequisites

- **Node.js 18+**
- **npm**, **yarn**, or **pnpm**
- At least one AI provider API key (OpenAI or Anthropic)

### Installation

```bash
git clone https://github.com/deep-design-hub/SteamWritterAI.git
cd SteamWritterAI
npm install
cp .env.example .env.local
```

### Environment Variables

Fill in your keys in `.env.local`:

```env
# ─── AI Providers ──────────────────────────────────────────────────────
AI_PROVIDER=ensemble              # "ensemble" | "openai" | "anthropic"

ANTHROPIC_API_KEY=sk-ant-...      # Anthropic Claude
ANTHROPIC_MODEL=claude-sonnet-4-5

OPENAI_API_KEY=sk-...             # OpenAI ChatGPT
OPENAI_MODEL=gpt-4o

# ─── SMTP / Email ──────────────────────────────────────────────────────
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password       # Gmail App Password (16 chars)
SMTP_FROM="SteamWriterAi <your-email@gmail.com>"

# ─── Payments ──────────────────────────────────────────────────────────
NEXT_PUBLIC_OPAY_ACCOUNT_NAME=Your Name
NEXT_PUBLIC_OPAY_ACCOUNT_NUMBER=1234567890
NEXT_PUBLIC_MONIEPOINT_ACCOUNT_NAME=Your Name
NEXT_PUBLIC_MONIEPOINT_ACCOUNT_NUMBER=1234567890
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_live_...

# ─── Site URLs ─────────────────────────────────────────────────────────
NEXT_PUBLIC_APP_URL=https://your-domain.com
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Production

```bash
npm run build     # Build + auto-generate sitemap
npm run start     # Start production server
```

<br/>

## Project Structure

```
src/
├── app/
│   ├── (public)/             # 13 marketing pages + auth pages
│   │   ├── page.tsx          # Homepage (CMS-driven)
│   │   ├── features/         # Feature showcase
│   │   ├── pricing/          # Pricing tiers
│   │   ├── blog/             # Blog listing + [slug] detail
│   │   ├── contact/          # Contact form
│   │   ├── auth/             # Login, register, forgot-password
│   │   └── ...               # FAQ, modules, how-it-works, terms, etc.
│   │
│   ├── admin/                # Admin panel (role-protected)
│   │   ├── dashboard/        # Metrics overview
│   │   ├── users/            # User management
│   │   ├── payments/         # Payment verification
│   │   ├── models/           # AI provider toggles
│   │   ├── page-builder/     # Visual CMS editor
│   │   ├── mail/             # Email tester
│   │   ├── analytics/        # Platform analytics
│   │   └── settings/         # General, Mail, Security, Config, Cache, SEO
│   │
│   ├── user/                 # User dashboard (session-protected)
│   │   ├── dashboard/        # Overview
│   │   ├── projects/         # List, create, workspace [id]
│   │   ├── journals/         # Journal discovery
│   │   ├── templates/        # Writing templates
│   │   ├── settings/         # Profile settings
│   │   └── billing/          # Payment history
│   │
│   └── api/
│       ├── agent/            # AI agent chat (streaming)
│       └── email/            # SMTP email sender
│
├── components/
│   ├── admin/                # Admin sidebar, header, page builder
│   ├── agent/                # AI chat workspace
│   ├── landing/              # Topbar, Footer
│   ├── support/              # Floating support chat widget
│   ├── ui/                   # 20+ shadcn/ui primitives
│   └── user/                 # User sidebar, header
│
├── lib/
│   ├── agent/                # AI core (prompts, tools, types, ensemble)
│   ├── email/                # Nodemailer + 4 email templates
│   ├── page-defaults.ts      # Default content for 13 pages + 6 blog posts
│   ├── payments.ts           # Plan config, gateway configs, Paystack loader
│   └── storage.ts            # localStorage + SHA-256 hashing
│
├── store/                    # 6 Zustand stores (persisted to localStorage)
│   ├── useAuthStore.ts       # Users, sessions, login/register/verify
│   ├── useProjectStore.ts    # Projects, chapters, references, chat
│   ├── usePaymentStore.ts    # Payment orders & verification
│   ├── useModelStore.ts      # AI model enable/disable
│   ├── useContentStore.ts    # CMS page content overrides
│   └── useAdminSettingsStore.ts  # Platform settings
│
└── types/                    # TypeScript type definitions
```

<br/>

## AI Agent Tools

The AI agent comes equipped with built-in tools:

| Tool | Description |
|------|-------------|
| **APA 7 Formatter** | Structures references in APA 7th edition format |
| **Citation Validator** | Checks in-text citations match the reference list |
| **Word Counter** | Enforces 1500-3000 words per chapter |
| **Document Formatter** | Applies numbered headings, tables, and academic structure |

### Supported Document Types

| # | Type | Description |
|---|------|-------------|
| 1 | Chapter 1 | Introduction |
| 2 | Chapter 2 | Literature Review |
| 3 | Chapter 3 | Research Methodology |
| 4 | Chapter 4 | Data Analysis & Findings |
| 5 | Chapter 5 | Summary, Conclusion & Recommendations |
| 6 | Research Proposal | Full proposal document |
| 7 | Seminar Report | Seminar presentation write-up |
| 8 | Research Synopsis | Condensed research overview |
| 9 | Thesis | Complete thesis document |
| 10 | Dissertation | Full dissertation |
| 11 | Questionnaire | Research instrument design |
| 12 | References | Citation list & bibliography |
| 13 | Outline | Full project outline |
| 14 | Presentation | Slides outline |

<br/>

## Default Credentials

> Change these before deploying to production.

| Role | Email | Password |
|:-----|-------|----------|
| Admin | `admin@steamwriterai.app` | `admin123` |
| User | `abubakarmusa09876@gmail.com` | `0000` |

<br/>

## Deployment

### Netlify

1. Push to GitHub
2. Connect repository in [Netlify](https://netlify.com)
3. Build command: `npm run build`
4. Publish directory: `.next`
5. Add `@netlify/plugin-nextjs` plugin
6. Configure environment variables
7. Deploy

### Vercel

1. Push to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Environment variables are auto-detected from `.env.example`
4. Deploy

<br/>

## License

Proprietary. All rights reserved.

<br/>

---

<div align="center">

Built with care by **[Deep Design Hub](https://github.com/deep-design-hub)**

</div>
