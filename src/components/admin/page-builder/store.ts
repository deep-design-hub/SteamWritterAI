"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import type {
  BuilderState,
  Block,
  BlockType,
  Device,
  DragPayload,
  MediaItem,
  Pages,
} from "./types";
import { DEFAULT_PAGES, createBlock, cloneDefaults } from "./defaults";

function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

export const useBuilderStore = create<BuilderState>()(
  persist(
    (set, get) => ({
      pages: deepClone(DEFAULT_PAGES),
      current: "home",
      selected: null,
      device: "desktop" as Device,
      previewing: false,
      zoom: 1,
      history: [],
      hIdx: -1,
      dragPayload: null,
      media: [
        {
          id: "m1",
          name: "Product shot",
          type: "image" as const,
          emoji: "📸",
          gradient: "linear-gradient(135deg,#c9d8e8,#8fb2cf)",
          size: "1.4 MB",
          date: "2026-08-10",
          used: 3,
        },
        {
          id: "m2",
          name: "Hero banner",
          type: "image" as const,
          emoji: "🖼️",
          gradient: "linear-gradient(135deg,#f3d9b8,#e0b078)",
          size: "2.1 MB",
          date: "2026-08-12",
          used: 1,
        },
        {
          id: "m3",
          name: "Lifestyle photo",
          type: "image" as const,
          emoji: "🌿",
          gradient: "linear-gradient(135deg,#d9e8e0,#9fc0ae)",
          size: "890 KB",
          date: "2026-08-14",
          used: 0,
        },
        {
          id: "m4",
          name: "Logo variant",
          type: "image" as const,
          emoji: "✨",
          gradient: "linear-gradient(135deg,#f5d9e2,#e79fbb)",
          size: "420 KB",
          date: "2026-08-15",
          used: 2,
        },
        {
          id: "m5",
          name: "Promo clip",
          type: "video" as const,
          emoji: "🎬",
          gradient: "linear-gradient(135deg,#b6acff,#6d5dfc)",
          size: "12.3 MB",
          date: "2026-08-15",
          used: 0,
        },
        {
          id: "m6",
          name: "Catalog PDF",
          type: "file" as const,
          emoji: "📄",
          gradient: "linear-gradient(135deg,#f8dd73,#eebf4a)",
          size: "3.7 MB",
          date: "2026-08-16",
          used: 1,
        },
        {
          id: "m7",
          name: "Texture overlay",
          type: "image" as const,
          emoji: "🎨",
          gradient: "linear-gradient(135deg,#f3efff,#d4c5f9)",
          size: "560 KB",
          date: "2026-08-16",
          used: 0,
        },
      ] as MediaItem[],

      addBlockAt(type: BlockType, beforeId: string | null) {
        const s = get();
        const blocks = [...s.pages[s.current].blocks];
        const block = createBlock(type);
        if (beforeId) {
          const idx = blocks.findIndex((b) => b.id === beforeId);
          if (idx >= 0) blocks.splice(idx, 0, block);
          else blocks.push(block);
        } else {
          blocks.push(block);
        }
        const pages = { ...s.pages, [s.current]: { ...s.pages[s.current], blocks } };
        set({ pages, selected: block.id });
        get().pushState();
      },

      moveBefore(id: string, beforeId: string) {
        const s = get();
        const blocks = [...s.pages[s.current].blocks];
        const fromIdx = blocks.findIndex((b) => b.id === id);
        const toIdx = blocks.findIndex((b) => b.id === beforeId);
        if (fromIdx < 0 || toIdx < 0 || fromIdx === toIdx) return;
        const [moved] = blocks.splice(fromIdx, 1);
        const insertAt = fromIdx < toIdx ? toIdx - 1 : toIdx;
        blocks.splice(insertAt, 0, moved);
        const pages = { ...s.pages, [s.current]: { ...s.pages[s.current], blocks } };
        set({ pages });
        get().pushState();
      },

      moveToEnd(id: string) {
        const s = get();
        const blocks = [...s.pages[s.current].blocks];
        const idx = blocks.findIndex((b) => b.id === id);
        if (idx < 0) return;
        const [moved] = blocks.splice(idx, 1);
        blocks.push(moved);
        const pages = { ...s.pages, [s.current]: { ...s.pages[s.current], blocks } };
        set({ pages });
        get().pushState();
      },

      moveById(id: string, delta: number) {
        const s = get();
        const blocks = [...s.pages[s.current].blocks];
        const idx = blocks.findIndex((b) => b.id === id);
        if (idx < 0) return;
        const newIdx = idx + delta;
        if (newIdx < 0 || newIdx >= blocks.length) return;
        const [moved] = blocks.splice(idx, 1);
        blocks.splice(newIdx, 0, moved);
        const pages = { ...s.pages, [s.current]: { ...s.pages[s.current], blocks } };
        set({ pages });
        get().pushState();
      },

      dupById(id: string) {
        const s = get();
        const blocks = [...s.pages[s.current].blocks];
        const idx = blocks.findIndex((b) => b.id === id);
        if (idx < 0) return;
        const clone = { ...deepClone(blocks[idx]), id: "b" + Date.now().toString(36) };
        blocks.splice(idx + 1, 0, clone);
        const pages = { ...s.pages, [s.current]: { ...s.pages[s.current], blocks } };
        set({ pages, selected: clone.id });
        get().pushState();
      },

      delById(id: string) {
        const s = get();
        const blocks = s.pages[s.current].blocks.filter((b) => b.id !== id);
        const pages = { ...s.pages, [s.current]: { ...s.pages[s.current], blocks } };
        set({ pages, selected: s.selected === id ? null : s.selected });
        get().pushState();
      },

      selectBlock(id: string | null) {
        set({ selected: id });
      },

      updateBlockProps(id: string, patch: Record<string, unknown>) {
        const s = get();
        const blocks = s.pages[s.current].blocks.map((b) =>
          b.id === id ? { ...b, props: { ...b.props, ...patch } } : b
        );
        const pages = { ...s.pages, [s.current]: { ...s.pages[s.current], blocks } };
        set({ pages });
      },

      setCurrentPage(key: string) {
        set({ current: key, selected: null });
      },

      setPageName(key: string, name: string) {
        const s = get();
        const pages = { ...s.pages, [key]: { ...s.pages[key], name } };
        set({ pages });
      },

      setDevice(d: Device) {
        set({ device: d });
      },

      setZoom(z: number) {
        set({ zoom: z });
      },

      togglePreview() {
        set((s) => ({ previewing: !s.previewing, selected: null }));
      },

      pushState() {
        const s = get();
        const snapshot = deepClone(s.pages[s.current].blocks);
        const history = s.history.slice(0, s.hIdx + 1);
        history.push(snapshot);
        if (history.length > 60) history.shift();
        set({ history, hIdx: history.length - 1 });
      },

      undo() {
        const s = get();
        if (s.hIdx <= 0) return;
        const newIdx = s.hIdx - 1;
        const blocks = deepClone(s.history[newIdx]);
        const pages = { ...s.pages, [s.current]: { ...s.pages[s.current], blocks } };
        set({ pages, hIdx: newIdx, selected: null });
      },

      redo() {
        const s = get();
        if (s.hIdx >= s.history.length - 1) return;
        const newIdx = s.hIdx + 1;
        const blocks = deepClone(s.history[newIdx]);
        const pages = { ...s.pages, [s.current]: { ...s.pages[s.current], blocks } };
        set({ pages, hIdx: newIdx, selected: null });
      },

      applyTemplate(blocks: Block[]) {
        const s = get();
        const cloned = deepClone(blocks);
        const pages = {
          ...s.pages,
          home: { ...s.pages.home, blocks: cloned },
        };
        set({ pages, current: "home", selected: null });
        get().pushState();
      },

      resetPage() {
        const s = get();
        const defaultBlocks = DEFAULT_PAGES[s.current]?.blocks ?? [];
        const blocks = deepClone(defaultBlocks);
        const pages = { ...s.pages, [s.current]: { ...s.pages[s.current], blocks } };
        set({ pages, selected: null });
        get().pushState();
      },

      saveToLocal() {
        const s = get();
        if (typeof window !== "undefined") {
          localStorage.setItem("dd-builder", JSON.stringify(s.pages));
        }
      },

      loadFromLocal() {
        if (typeof window !== "undefined") {
          const raw = localStorage.getItem("dd-builder");
          if (raw) {
            try {
              const data = JSON.parse(raw) as Partial<BuilderState>;
              if (data.pages) set({ pages: data.pages });
              if (data.current) set({ current: data.current });
            } catch {}
          }
        }
      },

      addMedia(item: MediaItem) {
        set((s) => ({ media: [item, ...s.media] }));
      },

      removeMedia(id: string) {
        set((s) => ({ media: s.media.filter((m) => m.id !== id) }));
      },
    }),
    {
      name: "dd-builder",
      partialize: (state) => ({
        pages: state.pages,
        current: state.current,
      }),
      merge: (persisted: unknown, initial) => {
        const saved = persisted as { pages?: Pages; current?: string } | null;
        const defaults = deepClone(DEFAULT_PAGES);
        const merged = { ...defaults };
        if (saved?.pages) {
          for (const [key, val] of Object.entries(saved.pages)) {
            if (merged[key]) {
              merged[key] = val;
            }
          }
        }
        return {
          ...initial,
          pages: merged,
          current: saved?.current ?? (initial as BuilderState).current,
        };
      },
    }
  )
);
