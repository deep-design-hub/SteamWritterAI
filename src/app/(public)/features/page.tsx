import type { Metadata } from "next";
import { PublicPage } from "@/components/public-page";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Explore SteamWriterAi features: AI chapter generation, journal discovery, APA 7 citation engine, data analysis, math modelling, AI detection, plagiarism check and export tools.",
  openGraph: {
    title: "SteamWriterAi Features — Everything You Need to Write",
    description:
      "From chapter generation to AI detection, see every tool in the SteamWriterAi research workspace.",
  },
};

export default function FeaturesPage() {
  return <PublicPage slug="features" />;
}
