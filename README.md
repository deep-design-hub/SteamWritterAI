<p align="center">
  <img src="public/logo.png" alt="SteamWriterAi" width="80" />
</p>

<h1 align="center">SteamWriterAi</h1>

<p align="center">
  <strong>Your Academic Research Operating System</strong><br/>
  AI-powered research writing platform that generates complete, submission-ready chapters from topic to final defense.
</p>

<p align="center">
  <a href="https://steamwriterai.com">Live Demo</a> ·
  <a href="https://steamwriterai.com/pricing">Pricing</a> ·
  <a href="https://steamwriterai.com/contact">Contact</a>
</p>

---

## About

SteamWriterAi is a full-stack AI research writing platform built for postgraduate students and researchers. It generates structured, academically-rigorous research chapters (1–5), proposals, questionnaires, and references — complete with real citations, data analysis, and mathematical modelling.

**Powered by OpenAI ChatGPT 5.5 and Anthropic Claude Sonnet 5** through an ensemble AI Gateway that routes tasks to the best model automatically.

## Features

| Module | Description |
|--------|-------------|
| **Chapter Generator** | Generate chapters 1–5, proposals, seminars, questionnaires, theses and dissertations |
| **Journal Discovery** | Find relevant journals and papers from real academic databases |
| **Citation Engine** | APA 7, MLA, Chicago, Harvard, IEEE, Vancouver citation formatting |
| **Data Analysis Lab** | Upload datasets, generate tables, charts and statistical interpretations |
| **Math Modelling Studio** | SIR, SEIR, ODE, PDE, EOQ, Regression with sensitivity analysis |
| **AI Detection** | Check content against AI detectors before submission |
| **Plagiarism Check** | Scan for originality and proper attribution |
| **Corrections Engine** | Handle supervisor corrections and revisions |
| **Template Library** | Pre-built templates for chapters, proposals and questionnaires |
| **Export Engine** | Download as DOCX, PDF, TXT, LaTeX and more |
| **Reference Manager** | Organize and format citations automatically |
| **AI Gateway** | Ensemble mode — all enabled models work together for the best result |
| **Humanisation** | Rewrite AI content to pass detection tools |
| **Custom Branding** | Custom headers, footers and institutional formatting |

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- **Language:** TypeScript
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com)
- **State:** [Zustand](https://zustand-demo.pmnd.rs) with localStorage persistence
- **AI SDK:** [Vercel AI SDK](https://sdk.vercel.ai) — OpenAI + Anthropic adapters
- **Email:** [Nodemailer](https://nodemailer.com) (Gmail SMTP)
- **Deployment:** [Netlify](https://netlify.com) with `@netlify/plugin-nextjs`

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm
- At least one AI provider API key (OpenAI or Anthropic)

### Installation

```bash
git clone https://github.com/deep-design-hub/SteamWritterAI.git
cd SteamWritterAI
npm install
```

### Environment Variables

Copy `.env.example` to `.env.local` and fill in your keys:

```bash
cp .env.example .env.local
```

```env
# AI — Ensemble mode uses all enabled providers together
AI_PROVIDER=ensemble

# Anthropic (Claude)
ANTHROPIC_API_KEY=sk-ant-...
ANTHROPIC_MODEL=claude-sonnet-4-5

# OpenAI (ChatGPT)
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4o

# SMTP — Gmail App Password required
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM="SteamWriterAi <your-email@gmail.com>"

# Site
NEXT_PUBLIC_APP_URL=https://your-domain.com
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
npm run build
npm run start
```

## Project Structure

```
src/
├── app/
│   ├── (public)/          # Public marketing pages (layout with Topbar + Footer)
│   │   ├── page.tsx       # Homepage (builder-driven)
│   │   ├── features/      # Feature pages
│   │   ├── pricing/
│   │   ├── blog/          # Blog listing + [slug] detail
│   │   ├── contact/
│   │   ├── faq/
│   │   ├── modules/
│   │   ├── how-it-works/
│   │   ├── corrections/
│   │   ├── ai-gateway/
│   │   ├── terms/
│   │   ├── refund/
│   │   ├── privacy/
│   │   └── auth/          # Login, register, forgot-password
│   ├── admin/             # Admin panel (sidebar + header layout)
│   │   ├── dashboard/     # Admin dashboard with metrics
│   │   ├── users/         # User management (all, verified, suspended)
│   │   ├── payments/      # Payment management (verify/reject)
│   │   ├── models/        # AI model enable/disable
│   │   ├── mail/          # Mail tester
│   │   ├── page-builder/  # Visual page builder
│   │   ├── analytics/     # Platform analytics
│   │   └── settings/      # Platform settings
│   ├── user/              # User dashboard (sidebar + header layout)
│   │   ├── dashboard/
│   │   ├── projects/      # Project list, new, [id]
│   │   ├── journals/
│   │   ├── templates/
│   │   ├── settings/
│   │   └── billing/
│   └── api/
│       ├── agent/         # AI agent chat endpoint
│       └── email/         # SMTP email endpoint
├── components/
│   ├── admin/             # AdminSidebar, AdminHeader, PageBuilder
│   ├── agent/             # ProjectWorkspace, chat UI
│   ├── auth/              # AuthModal (login/register)
│   ├── landing/           # Topbar, Footer
│   ├── support/           # ChatWidget (floating support bot)
│   ├── ui/                # shadcn/ui components + Icon system
│   └── user/              # UserHeader, Sidebar
├── lib/
│   ├── agent/             # AI agent (prompts, tools, types, ensemble)
│   ├── email/             # Nodemailer SMTP transport
│   ├── page-defaults.ts   # Default page content (13 pages + 6 blog posts)
│   └── storage.ts         # localStorage + SHA-256 hashing
├── store/
│   ├── useAuthStore.ts    # Authentication (users, sessions)
│   ├── useProjectStore.ts # Projects & chapters
│   ├── usePaymentStore.ts # Payment orders
│   ├── useModelStore.ts   # AI model configuration
│   └── useContentStore.ts # CMS content overrides
└── types/                 # TypeScript type definitions
```

## Default Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | `admin@steamwriterai.app` | `admin123` |
| User | `abubakarmusa09876@gmail.com` | `0000` |

> Change these before deploying to production.

## Admin Panel

The admin panel (`/admin`) provides:

- **Dashboard** — User count, project count, revenue overview
- **User Management** — View all users, filter by status
- **Payment Management** — Verify or reject pending payments
- **AI Models** — Enable/disable OpenAI and Anthropic providers
- **Page Builder** — Visual editor for all marketing pages
- **Mail Tester** — Send test emails to verify SMTP configuration
- **Analytics** — Platform metrics and conversion rates
- **Settings** — SMTP, site config, security info

## AI Ensemble Mode

When multiple AI providers are enabled, SteamWriterAi runs in **ensemble mode**:

1. Every generation request is sent to all enabled models simultaneously
2. Each model produces its own complete response
3. The system selects the best output based on completeness, accuracy, and structure
4. If one model fails, the system falls back to whichever succeeded

Enable/disable models from **Admin → AI Models**.

## Deployment (Netlify)

1. Push to GitHub
2. Connect repository in Netlify
3. Set build command: `npm run build`
4. Set publish directory: `.next`
5. Add `@netlify/plugin-nextjs` plugin
6. Configure environment variables in Netlify dashboard
7. Deploy

## SMTP Configuration

SteamWriterAi uses Gmail SMTP for transactional emails:

- **Welcome emails** — sent automatically on user registration
- **Password reset** — via `/api/email` with type `password-reset`
- **Payment confirmation** — via `/api/email` with type `payment-confirmation`
- **Test emails** — via Admin → Mail Tester

Generate a Gmail App Password at [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords).

## License

Proprietary. All rights reserved.

---

<p align="center">
  Built with care by <a href="https://github.com/deep-design-hub">Deep Design Hub</a>
</p>
