import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SteamWriterAi — AI Research Writing Suite",
    short_name: "SteamWriterAi",
    description:
      "Generate submission-ready research chapters, proposals, questionnaires and references with an AI writing agent.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#1B8B2C",
    icons: [
      { src: "/icon.png", sizes: "any", type: "image/png" },
      { src: "/apple-icon.png", sizes: "any", type: "image/png" },
    ],
  };
}
