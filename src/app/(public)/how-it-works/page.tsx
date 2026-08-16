import type { Metadata } from "next";
import { PublicPage } from "@/components/public-page";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "See how SteamWriterAi works in four steps: enter your topic, generate chapters, analyse your data, and export a submission-ready document.",
  openGraph: {
    title: "How SteamWriterAi Works",
    description:
      "From topic to submission in four steps — and a seven-stage AI pipeline behind every generation.",
  },
};

export default function HowItWorksPage() {
  return <PublicPage slug="how-it-works" />;
}
