import type { Metadata } from "next";
import { PublicPage } from "@/components/public-page";
import JsonLd from "@/components/seo/json-ld";
import { DEFAULT_PAGES } from "@/lib/page-defaults";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about SteamWriterAi — pricing, payment methods, the AI agent, plagiarism, AI detection, refunds and account access.",
  openGraph: {
    title: "SteamWriterAi FAQ",
    description:
      "Answers to the questions we hear most about SteamWriterAi, payments and the writing agent.",
  },
};

export default function FaqPage() {
  const defaults = DEFAULT_PAGES.faq;
  const items = defaults.sections.flatMap((s) =>
    s.type === "faq" ? s.items : []
  );
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.title,
      acceptedAnswer: { "@type": "Answer", text: f.description },
    })),
  };

  return (
    <>
      <JsonLd data={faqJsonLd} />
      <PublicPage slug="faq" />
    </>
  );
}
