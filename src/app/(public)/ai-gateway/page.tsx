import type { Metadata } from "next";
import { PublicPage } from "@/components/public-page";

export const metadata: Metadata = {
  title: "AI Gateway",
  description:
    "SteamWriterAi's AI gateway routes every research task to the best model — OpenAI ChatGPT 5.5 or Anthropic Claude Sonnet 5 — with humanisation, AI detection and plagiarism checks.",
  openGraph: {
    title: "SteamWriterAi AI Gateway — ChatGPT 5.5 & Claude Sonnet 5",
    description:
      "Intelligent model routing with humanisation, AI detection and plagiarism checks built in.",
  },
};

export default function AiGatewayPage() {
  return <PublicPage slug="ai-gateway" />;
}
