import type { AIProvider, ChapterType } from "@/types";

export interface AgentSource {
  title?: string;
  authors?: string[];
  year?: number;
  journal?: string;
  doi?: string;
  url?: string;
  publisher?: string;
  abstract?: string;
}

export interface AgentChapterContext {
  type: ChapterType;
  title: string;
  content: string;
}

export interface AgentContext {
  topic: string;
  department: string;
  institution: string;
  supervisor: string;
  guidelines: string;
  model: AIProvider;
  chapterType?: ChapterType;
  sources: AgentSource[];
  existingChapters: AgentChapterContext[];
}

export interface AgentRequestBody {
  messages: unknown[];
  context: AgentContext;
}
