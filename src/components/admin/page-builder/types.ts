"use client";

export type BlockType =
  | "hero"
  | "heading"
  | "text"
  | "image"
  | "button"
  | "divider"
  | "spacer"
  | "products"
  | "reviews"
  | "collection"
  | "countdown"
  | "testimonials"
  | "stats"
  | "banner"
  | "video"
  | "faq"
  | "newsletter"
  | "gallery"
  | "social"
  | "marquee"
  | "contact"
  | "footer"
  | "custom";

export type FieldType =
  | "text"
  | "textarea"
  | "color"
  | "range"
  | "align"
  | "seg"
  | "toggle"
  | "image"
  | "list"
  | "listq"
  | "listt"
  | "listimg";

export interface FieldDef {
  key: string;
  label: string;
  type: FieldType;
  min?: number;
  max?: number;
  unit?: string;
  opts?: string[];
}

export interface Block {
  id: string;
  type: BlockType;
  props: Record<string, unknown>;
}

export interface Page {
  name: string;
  blocks: Block[];
}

export type Pages = Record<string, Page>;

export type Device = "desktop" | "tablet" | "mobile";

export type DragPayload = null | { kind: "new"; type: BlockType } | { kind: "move"; id: string };

export interface MediaItem {
  id: string;
  name: string;
  type: "image" | "video" | "file";
  emoji: string;
  gradient: string;
  size: string;
  date: string;
  used: number;
  url?: string;
}

export interface BuilderState {
  pages: Pages;
  current: string;
  selected: string | null;
  device: Device;
  previewing: boolean;
  zoom: number;
  history: Block[][];
  hIdx: number;
  dragPayload: DragPayload;
  media: MediaItem[];

  addBlockAt: (type: BlockType, beforeId: string | null) => void;
  moveBefore: (id: string, beforeId: string) => void;
  moveToEnd: (id: string) => void;
  moveById: (id: string, delta: number) => void;
  dupById: (id: string) => void;
  delById: (id: string) => void;
  selectBlock: (id: string | null) => void;
  updateBlockProps: (id: string, patch: Record<string, unknown>) => void;
  setCurrentPage: (key: string) => void;
  setPageName: (key: string, name: string) => void;
  setDevice: (d: Device) => void;
  setZoom: (z: number) => void;
  togglePreview: () => void;
  undo: () => void;
  redo: () => void;
  pushState: () => void;
  applyTemplate: (blocks: Block[]) => void;
  resetPage: () => void;
  saveToLocal: () => void;
  loadFromLocal: () => void;
  addMedia: (item: MediaItem) => void;
  removeMedia: (id: string) => void;
}
