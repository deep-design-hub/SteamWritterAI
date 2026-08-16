"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { PageContent } from "@/lib/content-types";
import { DEFAULT_PAGES } from "@/lib/page-defaults";

interface ContentState {
  pages: Record<string, PageContent>;
  setContent: (slug: string, content: PageContent) => void;
  updatePage: (slug: string, patch: Partial<PageContent>) => void;
  updateSection: (slug: string, sectionId: string, patch: Record<string, unknown>) => void;
  addSection: (slug: string, type: PageContent["sections"][number]["type"]) => void;
  removeSection: (slug: string, sectionId: string) => void;
  moveSection: (slug: string, sectionId: string, dir: -1 | 1) => void;
  addItem: (slug: string, sectionId: string, item?: Record<string, unknown>) => void;
  removeItem: (slug: string, sectionId: string, itemId: string) => void;
  resetPage: (slug: string) => void;
}

function uid() {
  return `i${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

export const useContentStore = create<ContentState>()(
  persist(
    (set) => ({
      pages: { ...DEFAULT_PAGES },

      setContent: (slug, content) =>
        set((s) => ({ pages: { ...s.pages, [slug]: content } })),

      updatePage: (slug, patch) =>
        set((s) => ({
          pages: {
            ...s.pages,
            [slug]: { ...(s.pages[slug] ?? DEFAULT_PAGES[slug]), ...patch },
          },
        })),

      updateSection: (slug, sectionId, patch) =>
        set((s) => {
          const page = s.pages[slug] ?? DEFAULT_PAGES[slug];
          return {
            pages: {
              ...s.pages,
              [slug]: {
                ...page,
                sections: page.sections.map((sec) =>
                  sec.id === sectionId ? { ...sec, ...patch } : sec
                ),
              },
            },
          };
        }),

      addSection: (slug, type) =>
        set((s) => {
          const page = s.pages[slug] ?? DEFAULT_PAGES[slug];
          const section = {
            id: uid(),
            type,
            items: [],
          };
          return {
            pages: {
              ...s.pages,
              [slug]: { ...page, sections: [...page.sections, section] },
            },
          };
        }),

      removeSection: (slug, sectionId) =>
        set((s) => {
          const page = s.pages[slug] ?? DEFAULT_PAGES[slug];
          return {
            pages: {
              ...s.pages,
              [slug]: {
                ...page,
                sections: page.sections.filter((sec) => sec.id !== sectionId),
              },
            },
          };
        }),

      moveSection: (slug, sectionId, dir) =>
        set((s) => {
          const page = s.pages[slug] ?? DEFAULT_PAGES[slug];
          const sections = [...page.sections];
          const i = sections.findIndex((sec) => sec.id === sectionId);
          const j = i + dir;
          if (i < 0 || j < 0 || j >= sections.length) return s;
          [sections[i], sections[j]] = [sections[j], sections[i]];
          return {
            pages: { ...s.pages, [slug]: { ...page, sections } },
          };
        }),

      addItem: (slug, sectionId, item) =>
        set((s) => {
          const page = s.pages[slug] ?? DEFAULT_PAGES[slug];
          return {
            pages: {
              ...s.pages,
              [slug]: {
                ...page,
                sections: page.sections.map((sec) =>
                  sec.id === sectionId
                    ? {
                        ...sec,
                        items: [
                          ...sec.items,
                          { id: uid(), title: "New item", ...item },
                        ],
                      }
                    : sec
                ),
              },
            },
          };
        }),

      removeItem: (slug, sectionId, itemId) =>
        set((s) => {
          const page = s.pages[slug] ?? DEFAULT_PAGES[slug];
          return {
            pages: {
              ...s.pages,
              [slug]: {
                ...page,
                sections: page.sections.map((sec) =>
                  sec.id === sectionId
                    ? { ...sec, items: sec.items.filter((it) => it.id !== itemId) }
                    : sec
                ),
              },
            },
          };
        }),

      resetPage: (slug) =>
        set((s) => ({
          pages: { ...s.pages, [slug]: { ...DEFAULT_PAGES[slug] } },
        })),
    }),
    {
      name: "steamwriterai-content",
      partialize: (state) => ({ pages: state.pages }),
    }
  )
);
