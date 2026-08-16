"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { Chapter, ChapterType, ChatMessage, Project, Reference } from "@/types";
import {
  loadFromStorage,
  removeFromStorage,
  saveToStorage,
  uid,
} from "@/lib/storage";

interface NewProjectInput {
  title: string;
  topic: string;
  department: string;
  institution: string;
  supervisor: string;
  guidelines: string;
  model: Project["model"];
}

interface ProjectState {
  projects: Project[];
  createProject: (input: NewProjectInput) => Project;
  updateProject: (id: string, patch: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  saveChapter: (projectId: string, chapter: Chapter) => void;
  updateChapter: (projectId: string, chapterId: string, content: string) => void;
  appendMessages: (projectId: string, messages: ChatMessage[]) => void;
  saveReferences: (projectId: string, references: Reference[]) => void;
  getProject: (id: string) => Project | undefined;
}

export const useProjectStore = create<ProjectState>()(
  persist(
    (set, get) => ({
      projects: [],

      createProject(input) {
        const now = new Date().toISOString();
        const project: Project = {
          id: uid(),
          title: input.title || input.topic,
          topic: input.topic,
          department: input.department,
          institution: input.institution,
          supervisor: input.supervisor,
          guidelines: input.guidelines,
          model: input.model,
          status: "draft",
          chapters: [],
          references: [],
          messages: [],
          createdAt: now,
          updatedAt: now,
        };
        set({ projects: [project, ...get().projects] });
        return project;
      },

      updateProject(id, patch) {
        set({
          projects: get().projects.map((p) =>
            p.id === id
              ? { ...p, ...patch, updatedAt: new Date().toISOString() }
              : p
          ),
        });
      },

      deleteProject(id) {
        set({ projects: get().projects.filter((p) => p.id !== id) });
      },

      saveChapter(projectId, chapter) {
        set({
          projects: get().projects.map((p) =>
            p.id === projectId
              ? {
                  ...p,
                  chapters: [
                    ...p.chapters.filter((c) => c.id !== chapter.id),
                    chapter,
                  ],
                  status: "in-progress",
                  updatedAt: new Date().toISOString(),
                }
              : p
          ),
        });
      },

      updateChapter(projectId, chapterId, content) {
        set({
          projects: get().projects.map((p) =>
            p.id === projectId
              ? {
                  ...p,
                  chapters: p.chapters.map((c) =>
                    c.id === chapterId
                      ? {
                          ...c,
                          content,
                          version: c.version + 1,
                          updatedAt: new Date().toISOString(),
                        }
                      : c
                  ),
                  updatedAt: new Date().toISOString(),
                }
              : p
          ),
        });
      },

      appendMessages(projectId, messages) {
        set({
          projects: get().projects.map((p) =>
            p.id === projectId
              ? {
                  ...p,
                  messages: [...p.messages, ...messages],
                  updatedAt: new Date().toISOString(),
                }
              : p
          ),
        });
      },

      saveReferences(projectId, references) {
        set({
          projects: get().projects.map((p) =>
            p.id === projectId
              ? { ...p, references, updatedAt: new Date().toISOString() }
              : p
          ),
        });
      },

      getProject(id) {
        return get().projects.find((p) => p.id === id);
      },
    }),
    {
      name: "steamwriterai-projects",
      storage: {
        getItem: (name) => loadFromStorage(name, null),
        setItem: (name, value) => saveToStorage(name, value),
        removeItem: (name) => removeFromStorage(name),
      },
    }
  )
);

export type { ChapterType };
