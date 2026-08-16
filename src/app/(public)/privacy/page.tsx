import type { Metadata } from "next";
import { PublicPage } from "@/components/public-page";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "SteamWriterAi's privacy policy — what data we collect, how we use and protect your research, and your rights.",
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return <PublicPage slug="privacy" />;
}
