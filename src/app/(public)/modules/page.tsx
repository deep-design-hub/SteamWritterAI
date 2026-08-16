import type { Metadata } from "next";
import { PublicPage } from "@/components/public-page";

export const metadata: Metadata = {
  title: "Modules",
  description:
    "SteamWriterAi's 14 integrated research modules: Chapter Generator, Journal Discovery, Data Analysis Lab, Math Modelling, Citation Engine, Corrections, Template Library, Export Engine and more.",
  openGraph: {
    title: "SteamWriterAi Modules — The Complete Research Toolkit",
    description:
      "Fourteen integrated modules that cover every stage of academic research writing.",
  },
};

export default function ModulesPage() {
  return <PublicPage slug="modules" />;
}
