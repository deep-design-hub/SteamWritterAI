import type { Metadata } from "next";
import { PublicPage } from "@/components/public-page";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "SteamWriterAi terms of service — account rules, acceptable use, payment terms, intellectual property and disclaimers.",
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return <PublicPage slug="terms" />;
}
