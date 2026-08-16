import { ImageResponse } from "next/og";

export const alt = "SteamWriterAi — AI Research Writing Suite";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#0a0f0b",
          backgroundImage:
            "radial-gradient(ellipse at top left, rgba(27,139,44,0.35), transparent 55%), radial-gradient(ellipse at bottom right, rgba(124,58,237,0.25), transparent 55%)",
          padding: 80,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              backgroundColor: "#1B8B2C",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: 40,
              fontWeight: 800,
            }}
          >
            K
          </div>
          <div style={{ color: "#ffffff", fontSize: 36, fontWeight: 700 }}>
            SteamWriterAi
          </div>
        </div>
        <div
          style={{
            color: "#ffffff",
            fontSize: 72,
            fontWeight: 800,
            lineHeight: 1.1,
            maxWidth: 900,
          }}
        >
          Write your research project with an AI writing agent
        </div>
        <div
          style={{
            color: "#9ca3af",
            fontSize: 30,
            marginTop: 24,
            maxWidth: 760,
          }}
        >
          Chapters one to five, proposals, questionnaires and APA 7 references —
          written in rigorous British academic English.
        </div>
      </div>
    ),
    size
  );
}
