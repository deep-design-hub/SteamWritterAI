import type { Metadata } from "next";
import { PublicPage } from "@/components/public-page";

export const metadata: Metadata = {
  title: "Supervisor Corrections",
  description:
    "Upload your supervisor's feedback and let SteamWriterAi apply every correction to your research — with full version history and unlimited revisions.",
  openGraph: {
    title: "Supervisor Corrections — Applied Automatically",
    description:
      "Upload feedback as PDF or DOCX. SteamWriterAi applies every correction and keeps version history.",
  },
};

export default function CorrectionsPage() {
  return <PublicPage slug="corrections" />;
}
