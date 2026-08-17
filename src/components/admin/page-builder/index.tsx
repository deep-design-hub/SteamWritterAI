"use client";

import React from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  Copy,
  Eye,
  EyeOff,
  Monitor,
  Redo,
  RotateCcw,
  Save,
  Smartphone,
  Tablet,
  Trash2,
  Undo,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBuilderStore } from "./store";
import { TEMPLATES } from "./defaults";
import { Canvas } from "./canvas";
import { BlockPalette } from "./block-palette";
import { LayerList } from "./layer-list";
import { PropertiesPanel } from "./properties-panel";

export function PageBuilder() {
  const {
    current,
    pages,
    device,
    zoom,
    previewing,
    selected,
    setCurrentPage,
    setDevice,
    setZoom,
    togglePreview,
    undo,
    redo,
    history,
    hIdx,
    dupById,
    delById,
    moveById,
    applyTemplate,
    resetPage,
    saveToLocal,
    setPageName,
  } = useBuilderStore();

  const [tab, setTab] = React.useState<"blocks" | "layers">("blocks");
  const pageName = pages[current]?.name ?? current;

  return (
    <div className="flex h-[calc(100vh-3.5rem)] flex-col overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center gap-2 border-b bg-background/80 px-3 py-1.5 backdrop-blur">
        {/* Back to list */}
        <Link
          href="/admin/page-builder"
          className="flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-3" />
          Pages
        </Link>

        <div className="mx-1 h-4 w-px bg-border" />

        {/* Page selector */}
        <div className="flex items-center gap-1">
          {Object.keys(pages).map((key) => (
            <button
              key={key}
              onClick={() => setCurrentPage(key)}
              className={`rounded-md px-2.5 py-1 text-[11px] font-medium transition-colors ${
                current === key
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              {pages[key].name}
            </button>
          ))}
        </div>

        <div className="mx-1 h-4 w-px bg-border" />

        {/* Page name */}
        <input
          value={pageName}
          onChange={(e) => setPageName(current, e.target.value)}
          className="w-28 rounded border border-input bg-background px-2 py-1 text-[11px] font-medium"
        />

        <div className="mx-1 h-4 w-px bg-border" />

        {/* Block actions */}
        {selected && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="size-6"
              title="Move up"
              onClick={() => moveById(selected, -1)}
            >
              <ArrowUp className="size-3" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="size-6"
              title="Move down"
              onClick={() => moveById(selected, 1)}
            >
              <ArrowDown className="size-3" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="size-6"
              title="Duplicate"
              onClick={() => dupById(selected)}
            >
              <Copy className="size-3" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="size-6"
              title="Delete"
              onClick={() => delById(selected)}
            >
              <Trash2 className="size-3 text-destructive" />
            </Button>
            <div className="mx-1 h-4 w-px bg-border" />
          </>
        )}

        {/* Undo / Redo */}
        <Button
          variant="ghost"
          size="icon"
          className="size-6"
          title="Undo"
          disabled={hIdx <= 0}
          onClick={undo}
        >
          <Undo className="size-3" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="size-6"
          title="Redo"
          disabled={hIdx >= history.length - 1}
          onClick={redo}
        >
          <Redo className="size-3" />
        </Button>

        <div className="mx-1 h-4 w-px bg-border" />

        {/* Device */}
        {(["desktop", "tablet", "mobile"] as const).map((d) => (
          <Button
            key={d}
            variant="ghost"
            size="icon"
            className="size-6"
            title={d}
            onClick={() => setDevice(d)}
          >
            {d === "desktop" ? (
              <Monitor className={`size-3 ${device === d ? "text-primary" : ""}`} />
            ) : d === "tablet" ? (
              <Tablet className={`size-3 ${device === d ? "text-primary" : ""}`} />
            ) : (
              <Smartphone className={`size-3 ${device === d ? "text-primary" : ""}`} />
            )}
          </Button>
        ))}

        <div className="mx-1 h-4 w-px bg-border" />

        {/* Zoom */}
        <Button
          variant="ghost"
          size="icon"
          className="size-6"
          onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
        >
          <ZoomOut className="size-3" />
        </Button>
        <span className="min-w-[36px] text-center text-[10px] text-muted-foreground">
          {Math.round(zoom * 100)}%
        </span>
        <Button
          variant="ghost"
          size="icon"
          className="size-6"
          onClick={() => setZoom(Math.min(1.5, zoom + 0.1))}
        >
          <ZoomIn className="size-3" />
        </Button>

        <div className="flex-1" />

        {/* Preview / Save / Reset */}
        <Button
          variant="ghost"
          size="icon"
          className="size-6"
          title="Preview"
          onClick={togglePreview}
        >
          {previewing ? <EyeOff className="size-3" /> : <Eye className="size-3" />}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="size-6"
          title="Save"
          onClick={() => {
            saveToLocal();
            toast.success("Saved!");
          }}
        >
          <Save className="size-3" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="size-6"
          title="Reset page"
          onClick={() => {
            if (confirm("Reset this page to defaults?")) {
              resetPage();
              toast.success("Page reset.");
            }
          }}
        >
          <RotateCcw className="size-3" />
        </Button>
      </div>

      {/* Templates bar */}
      <div className="flex items-center gap-2 border-b bg-muted/30 px-3 py-1.5">
        <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
          Templates:
        </span>
        {Object.entries(TEMPLATES).map(([key, tpl]) => (
          <button
            key={key}
            onClick={() => {
              if (confirm(`Apply "${tpl.name}" template?`)) {
                applyTemplate(tpl.blocks);
                toast.success("Template applied.");
              }
            }}
            className="rounded bg-background px-2 py-0.5 text-[10px] font-medium text-muted-foreground border border-border hover:border-primary/40 hover:text-foreground transition-colors"
          >
            {key === "academic" ? "Academic" : key === "minimal" ? "Minimal" : "Promotional"}
          </button>
        ))}
      </div>

      {/* Main area: sidebar + canvas + props */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar */}
        {!previewing && (
          <div className="flex w-56 flex-col border-r bg-background">
            <div className="flex border-b">
              <button
                onClick={() => setTab("blocks")}
                className={`flex-1 py-1.5 text-[10px] font-bold uppercase tracking-wide transition-colors ${
                  tab === "blocks"
                    ? "border-b-2 border-primary text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Blocks
              </button>
              <button
                onClick={() => setTab("layers")}
                className={`flex-1 py-1.5 text-[10px] font-bold uppercase tracking-wide transition-colors ${
                  tab === "layers"
                    ? "border-b-2 border-primary text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Layers
              </button>
            </div>
            <div className="flex-1 overflow-auto">
              {tab === "blocks" ? <BlockPalette /> : <LayerList />}
            </div>
          </div>
        )}

        {/* Canvas */}
        <Canvas />

        {/* Right: Properties */}
        {!previewing && selected && (
          <div className="w-64 overflow-auto border-l bg-background">
            <PropertiesPanel />
          </div>
        )}
      </div>
    </div>
  );
}
