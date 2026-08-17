"use client";

import React from "react";
import { useBuilderStore } from "./store";
import { BLOCK_LABELS } from "./defaults";
import { renderBlock } from "./block-renderers";
import type { DragPayload } from "./types";

export function Canvas() {
  const {
    pages,
    current,
    selected,
    device,
    zoom,
    previewing,
    selectBlock,
    addBlockAt,
    moveBefore,
    moveToEnd,
    pushState,
  } = useBuilderStore();

  const blocks = pages[current]?.blocks ?? [];
  const canvasRef = React.useRef<HTMLDivElement>(null);
  const [, setDrag] = React.useState<DragPayload>(null);

  const deviceWidth = device === "tablet" ? 640 : device === "mobile" ? 360 : "100%";

  return (
    <div className="flex-1 overflow-auto bg-muted/40 p-4" ref={canvasRef}>
      <div
        className="mx-auto transition-all duration-200"
        style={{
          maxWidth: typeof deviceWidth === "number" ? deviceWidth : "100%",
          transform: `scale(${zoom})`,
          transformOrigin: "top center",
        }}
      >
        {/* Site nav bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "12px 16px",
            marginBottom: 8,
            borderRadius: 8,
            background: "#fff",
            border: "1px solid #e5e7eb",
          }}
        >
          <span style={{ fontWeight: 800, fontSize: 16, color: "#182033" }}>SteamWriterAi</span>
          <div style={{ display: "flex", gap: 16, fontSize: 12, color: "#64748b" }}>
            <span>Features</span>
            <span>Pricing</span>
            <span>Blog</span>
            <span>Contact</span>
          </div>
        </div>

        {/* Blocks */}
        <div
          className="canvas-zone"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            minHeight: 300,
          }}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            try {
              const raw = e.dataTransfer.getData("text/plain");
              const payload: DragPayload = JSON.parse(raw);
              if (payload?.kind === "new") addBlockAt(payload.type, null);
              else if (payload?.kind === "move") moveToEnd(payload.id);
            } catch {}
            setDrag(null);
          }}
        >
          {blocks.length === 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: 60,
                borderRadius: 10,
                border: "2px dashed #d1d5db",
                color: "#94a3b8",
                fontSize: 13,
                background: "rgba(255,255,255,0.5)",
              }}
            >
              <span style={{ fontSize: 32, marginBottom: 8 }}>🏗</span>
              Drop blocks here to build your page
            </div>
          ) : (
            blocks.map((b) => (
              <div
                key={b.id}
                className={`canvas-block group relative cursor-pointer rounded-lg border-2 transition-all ${
                  selected === b.id
                    ? "border-primary ring-2 ring-primary/20"
                    : "border-transparent hover:border-muted-foreground/30"
                }`}
                style={{ background: "#fff" }}
                onClick={() => {
                  selectBlock(b.id);
                  if (previewing) return;
                }}
                draggable={!previewing}
                onDragStart={(e) => {
                  e.stopPropagation();
                  const payload: DragPayload = { kind: "move", id: b.id };
                  e.dataTransfer.setData("text/plain", JSON.stringify(payload));
                  e.dataTransfer.effectAllowed = "move";
                  setDrag(payload);
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onDrop={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  try {
                    const raw = e.dataTransfer.getData("text/plain");
                    const payload: DragPayload = JSON.parse(raw);
                    if (payload?.kind === "new") addBlockAt(payload.type, b.id);
                    else if (payload?.kind === "move" && payload.id !== b.id)
                      moveBefore(payload.id, b.id);
                  } catch {}
                  setDrag(null);
                }}
              >
                {/* Block tag */}
                {!previewing && (
                  <span
                    className="absolute -top-3 left-2 z-10 rounded bg-primary px-1.5 py-0.5 text-[9px] font-bold text-primary-foreground opacity-0 transition-opacity group-hover:opacity-100"
                    style={{ opacity: selected === b.id ? 1 : undefined }}
                  >
                    {BLOCK_LABELS[b.type]}
                  </span>
                )}
                <div style={{ padding: 8 }}>{renderBlock(b)}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
