import type { Metadata } from "next";
import { PublicPage } from "@/components/public-page";

export const metadata: Metadata = {
  title: "Refund Policy",
  description:
    "SteamWriterAi's 7-day satisfaction guarantee — request a full refund within 7 days of purchase if you've generated fewer than 3 chapters.",
  robots: { index: true, follow: true },
};

export default function RefundPage() {
  return <PublicPage slug="refund" />;
}
