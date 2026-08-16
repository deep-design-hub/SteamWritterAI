import type { Metadata } from "next";

import { PublicPage } from "@/components/public-page";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with SteamWriterAi support — email hello@steamwriterai.com or call +234 905 644 4277. Monday to Saturday, 7AM–9PM WAT.",
  openGraph: {
    title: "Contact SteamWriterAi",
    description:
      "Email, phone and WhatsApp support for SteamWriterAi. We respond within one business day.",
  },
};

export default function ContactPage() {
  return <PublicPage slug="contact" />;
}
