import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import JsonLd from "@/components/seo/json-ld";
import { ClientShell } from "@/components/client-shell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const SITE_NAME = "SteamWriterAi";
const SITE_DESC =
  "SteamWriterAi is an AI-powered research writing suite. Generate submission-ready chapters one to five, proposals, questionnaires and APA 7 references with a powerful writing agent.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — AI Research Writing Suite`,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESC,
  applicationName: SITE_NAME,
  authors: [{ name: "SteamWriterAi" }],
  creator: "SteamWriterAi",
  publisher: "SteamWriterAi",
  keywords: [
    "AI research writing",
    "thesis writing help",
    "research project writing",
    "chapters one to five",
    "APA 7 references",
    "Nigerian university project",
    "research proposal generator",
    "dissertation writer AI",
    "academic writing agent",
    "SteamWriterAi",
  ],
  category: "Education",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_NG",
    url: SITE_URL,
    title: `${SITE_NAME} — AI Research Writing Suite`,
    description: SITE_DESC,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — AI Research Writing Suite`,
    description: SITE_DESC,
  },
  alternates: {
    canonical: "/",
  },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  sameAs: [],
};

const webSiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESC,
  inLanguage: "en",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <JsonLd data={orgJsonLd} />
        <JsonLd data={webSiteJsonLd} />
        <ThemeProvider>
          <div className="flex min-h-svh flex-col">{children}</div>
          <ClientShell />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
