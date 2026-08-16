export type AIProvider = "anthropic" | "openai" | "ensemble";

export const CHAPTER_TYPES = [
  "chapter-one",
  "chapter-two",
  "chapter-three",
  "chapter-four",
  "chapter-five",
  "proposal",
  "seminar",
  "synopsis",
  "thesis",
  "dissertation",
  "questionnaire",
  "references",
  "outline",
  "presentation",
] as const;

export type ChapterType = (typeof CHAPTER_TYPES)[number];

export const CHAPTER_LABELS: Record<ChapterType, string> = {
  "chapter-one": "Chapter One — Introduction",
  "chapter-two": "Chapter Two — Literature Review",
  "chapter-three": "Chapter Three — Research Methodology",
  "chapter-four": "Chapter Four — Data Analysis & Findings",
  "chapter-five": "Chapter Five — Summary, Conclusion & Recommendations",
  proposal: "Research Proposal",
  seminar: "Seminar Report",
  synopsis: "Research Synopsis",
  thesis: "Thesis",
  dissertation: "Dissertation",
  questionnaire: "Questionnaire",
  references: "References & Citation List",
  outline: "Full Project Outline",
  presentation: "Presentation Slides (Outline)",
};

export interface Chapter {
  id: string;
  type: ChapterType;
  title: string;
  content: string;
  version: number;
  aiGenerated: boolean;
  updatedAt: string;
}

export interface Reference {
  id: string;
  authors: string[];
  title: string;
  year: number;
  journal?: string;
  doi?: string;
  url?: string;
  publisher?: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
}

export interface Project {
  id: string;
  title: string;
  topic: string;
  department: string;
  institution: string;
  supervisor: string;
  guidelines: string;
  model: AIProvider;
  status: "draft" | "in-progress" | "completed";
  chapters: Chapter[];
  references: Reference[];
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
  role: "user" | "admin";
  createdAt: string;
}

export type PaymentGateway = "opay" | "paystack" | "moniepoint";
export type PaymentMethod = "bank-transfer" | "card";
export type PaymentStatus = "pending" | "paid" | "rejected";
export type PaymentPlan = "standard";

export interface PaymentOrder {
  id: string;
  userId: string;
  email: string;
  name: string;
  plan: PaymentPlan;
  amount: number;
  currency: "NGN";
  gateway: PaymentGateway;
  method: PaymentMethod;
  reference: string;
  status: PaymentStatus;
  note?: string;
  createdAt: string;
  updatedAt: string;
  verifiedAt?: string;
}
