"use client";

import React from "react";
import { useBuilderStore } from "./store";
import { BLOCK_LABELS } from "./defaults";

export function LayerList() {
  const { pages, current, selected, selectBlock, moveById, delById } =
    useBuilderStore();
  const blocks = pages[current]?.blocks ?? [];

  if (blocks.length === 0) {
    return (
      <div className="p-4 text-center text-[11px] text-muted-foreground">
        No sections yet
      </div>
    );
  }

  return (
    <div className="space-y-0.5 p-2">
      {blocks.map((b, i) => (
        <div
          key={b.id}
          onClick={() => selectBlock(b.id)}
          className={`flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-[11px] transition-colors ${
            selected === b.id
              ? "bg-primary/10 text-primary font-medium"
              : "text-muted-foreground hover:bg-muted"
          }`}
        >
          <span className="w-4 text-center text-[9px] opacity-40">⣿</span>
          <span className="flex-1 truncate">{BLOCK_LABELS[b.type]}</span>
          <div className="flex items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100"
            style={{ opacity: selected === b.id ? 1 : undefined }}
          >
            <button
              onClick={(e) => { e.stopPropagation(); moveById(b.id, -1); }}
              disabled={i === 0}
              className="rounded p-0.5 text-[9px] hover:bg-muted disabled:opacity-20"
            >
              ↑
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); moveById(b.id, 1); }}
              disabled={i === blocks.length - 1}
              className="rounded p-0.5 text-[9px] hover:bg-muted disabled:opacity-20"
            >
              ↓
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); delById(b.id); }}
              className="rounded p-0.5 text-[9px] text-destructive hover:bg-destructive/10"
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
