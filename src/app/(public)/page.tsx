import type { Metadata } from "next";
import { PublicPage } from "@/components/public-page";
import JsonLd from "@/components/seo/json-ld";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: "AI Research Writing Suite",
  description:
    "Generate complete, submission-ready research chapters one to five, proposals, questionnaires, data analysis and APA 7 references with an AI writing agent powered by ChatGPT 5.5 and Claude Sonnet 5.",
  keywords: [
    "AI research writing",
    "thesis writing help",
    "research project generator",
    "chapters one to five",
    "APA 7 references",
    "academic writing agent",
  ],
  openGraph: {
    title: "SteamWriterAi — Your Academic Research Operating System",
    description:
      "From topic to submission. AI-powered research writing with real citations, data analysis and mathematical modelling.",
  },
};

export default function LandingPage() {
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "SteamWriterAi Research Access",
    description:
      "One-time access to SteamWriterAi's AI research writing agent — chapters one to five, proposals, questionnaires, APA 7 references and revisions.",
    brand: { "@type": "Brand", name: "SteamWriterAi" },
    image: `${SITE_URL}/logo.png`,
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/pricing`,
      price: "2000",
      priceCurrency: "NGN",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <>
      <JsonLd data={productJsonLd} />
      <PublicPage slug="home" />
    </>
  );
}
