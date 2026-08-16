"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import {
  loadFromStorage,
  removeFromStorage,
  saveToStorage,
} from "@/lib/storage";

export interface ModelEntry {
  enabled: boolean;
  label: string;
  description: string;
}

interface ModelConfig {
  openai: ModelEntry;
  anthropic: ModelEntry;
  defaultMode: "ensemble" | "anthropic" | "openai";
}

const defaultConfig: ModelConfig = {
  openai: {
    enabled: true,
    label: "OpenAI ChatGPT",
    description: "GPT-4o — fast, versatile, strong at structured output.",
  },
  anthropic: {
    enabled: true,
    label: "Anthropic Claude",
    description: "Claude Sonnet 4.5 — deep reasoning, long context.",
  },
  defaultMode: "ensemble",
};

interface ModelState {
  config: ModelConfig;
  setConfig: (config: ModelConfig) => void;
  toggleModel: (provider: "openai" | "anthropic") => void;
  setDefaultMode: (mode: ModelConfig["defaultMode"]) => void;
}

export const useModelStore = create<ModelState>()(
  persist(
    (set, get) => ({
      config: defaultConfig,

      setConfig(config) {
        set({ config });
      },

      toggleModel(provider) {
        set({
          config: {
            ...get().config,
            [provider]: {
              ...get().config[provider],
              enabled: !get().config[provider].enabled,
            },
          },
        });
      },

      setDefaultMode(mode) {
        set({
          config: {
            ...get().config,
            defaultMode: mode,
          },
        });
      },
    }),
    {
      name: "steamwriterai-models",
      storage: {
        getItem: (name) => {
          const raw = loadFromStorage(name, null);
          if (!raw) return null;
          return { state: raw as ModelState } as never;
        },
        setItem: (name, value) => saveToStorage(name, value),
        removeItem: (name) => removeFromStorage(name),
      },
    }
  )
);

export function getModelConfig(): ModelConfig {
  try {
    const store = useModelStore.getState();
    return store.config ?? defaultConfig;
  } catch {
    return defaultConfig;
  }
}
