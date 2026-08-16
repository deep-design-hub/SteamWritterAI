import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact SteamWriterAi support — email hello@steamwriterai.com or call +234 905 644 4277, Monday to Saturday 7AM–9PM WAT.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
