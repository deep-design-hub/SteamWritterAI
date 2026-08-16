"use client";

import React from "react";
import { useBuilderStore } from "./store";
import { BLOCK_CATEGORIES, BLOCK_LABELS } from "./defaults";
import type { BlockType, DragPayload } from "./types";

export function BlockPalette() {
  const addBlockAt = useBuilderStore((s) => s.addBlockAt);

  return (
    <div className="space-y-3 p-3">
      <h3 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
        Add blocks
      </h3>
      {BLOCK_CATEGORIES.map((cat) => (
        <div key={cat.label}>
          <div className="mb-1 text-[9px] font-semibold uppercase tracking-widest text-muted-foreground/60">
            {cat.label}
          </div>
          <div className="grid grid-cols-2 gap-1">
            {cat.types.map((type) => (
              <BlockBtn key={type} type={type} onAdd={() => addBlockAt(type, null)} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function BlockBtn({ type, onAdd }: { type: BlockType; onAdd: () => void }) {
  const [dragging, setDragging] = React.useState(false);

  return (
    <button
      className="rounded-md border border-dashed border-input bg-background/50 px-2 py-1.5 text-left text-[10px] font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-foreground"
      draggable
      onDragStart={(e) => {
        const payload: DragPayload = { kind: "new", type };
        e.dataTransfer.setData("text/plain", JSON.stringify(payload));
        e.dataTransfer.effectAllowed = "copy";
        setDragging(true);
      }}
      onDragEnd={() => setDragging(false)}
      onClick={onAdd}
      style={{ opacity: dragging ? 0.5 : 1 }}
    >
      {BLOCK_LABELS[type]}
    </button>
  );
}
