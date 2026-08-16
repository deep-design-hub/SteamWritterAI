"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface AdminSettings {
  // General
  siteName: string;
  siteUrl: string;
  siteDescription: string;
  adminEmail: string;
  maintenanceMode: boolean;

  // Mail
  smtpHost: string;
  smtpPort: number;
  smtpUser: string;
  smtpSecure: boolean;
  mailFromName: string;
  mailFromEmail: string;

  // Security / Auth
  requireEmailVerification: boolean;
  allowRegistration: boolean;
  passwordMinLength: number;
  sessionTimeoutMinutes: number;

  // Configurations
  aiProvider: "ensemble" | "openai" | "anthropic";
  openaiEnabled: boolean;
  anthropicEnabled: boolean;
  maxTokensPerRequest: number;
  rateLimitPerMinute: number;

  // Cache
  cacheEnabled: boolean;
  cacheTtlMinutes: number;
  staticCacheDays: number;
  clearCacheOnDeploy: boolean;

  // SEO
  defaultMetaTitle: string;
  defaultMetaDescription: string;
  enableSitemap: boolean;
  enableRobotsTxt: boolean;

  update: (patch: Partial<AdminSettings>) => void;
}

const defaults: Omit<AdminSettings, "update"> = {
  siteName: "SteamWriterAi",
  siteUrl: "https://steamwriterai.com",
  siteDescription: "AI Research Writing Suite — From Topic to Submission.",
  adminEmail: "admin@steamwriterai.app",
  maintenanceMode: false,

  smtpHost: "smtp.gmail.com",
  smtpPort: 587,
  smtpUser: "steamwriterai@gmail.com",
  smtpSecure: false,
  mailFromName: "SteamWriterAi",
  mailFromEmail: "steamwriterai@gmail.com",

  requireEmailVerification: false,
  allowRegistration: true,
  passwordMinLength: 6,
  sessionTimeoutMinutes: 1440,

  aiProvider: "ensemble",
  openaiEnabled: true,
  anthropicEnabled: true,
  maxTokensPerRequest: 4096,
  rateLimitPerMinute: 30,

  cacheEnabled: true,
  cacheTtlMinutes: 60,
  staticCacheDays: 30,
  clearCacheOnDeploy: true,

  defaultMetaTitle: "SteamWriterAi — AI Research Writing Suite",
  defaultMetaDescription:
    "AI-powered research writing suite. Generate submission-ready chapters, proposals, questionnaires and APA 7 references.",
  enableSitemap: true,
  enableRobotsTxt: true,
};

export const useAdminSettingsStore = create<AdminSettings>()(
  persist(
    (set) => ({
      ...defaults,
      update: (patch) => set((s) => ({ ...s, ...patch })),
    }),
    {
      name: "steamwriterai-admin-settings",
    }
  )
);
