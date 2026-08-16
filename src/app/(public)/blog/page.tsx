import type { Metadata } from "next";
import { PublicPage } from "@/components/public-page";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Academic writing guides and research tips from SteamWriterAi — citation styles, chapter structure, data analysis, AI detection and more.",
  openGraph: {
    title: "SteamWriterAi Blog — Academic Writing Guides",
    description:
      "Practical guides to help you write, cite and submit your research faster.",
  },
};

export default function BlogPage() {
  return <PublicPage slug="blog" />;
}
