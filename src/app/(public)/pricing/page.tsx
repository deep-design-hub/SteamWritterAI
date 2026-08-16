import type { Metadata } from "next";
import { PublicPage } from "@/components/public-page";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "SteamWriterAi one-time pricing: ₦2,000 Basic, ₦5,000 Standard, ₦10,000 Premium. Pay with OPay, Moniepoint or Paystack. Lifetime access, no subscriptions.",
  openGraph: {
    title: "SteamWriterAi Pricing — Pay Once, Use Forever",
    description:
      "Simple one-time plans from ₦2,000 with OPay, Moniepoint and Paystack payment options.",
  },
};

export default function PricingPage() {
  return <PublicPage slug="pricing" />;
}
