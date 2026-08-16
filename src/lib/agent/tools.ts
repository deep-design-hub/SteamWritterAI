import { tool } from "ai";
import { z } from "zod";

import type { AgentSource } from "./types";

function surnameOf(author: string): string {
  return author.trim().split(/\s+/).pop() ?? author.trim();
}

export function formatApa7Reference(source: AgentSource): string {
  const authors = (source.authors ?? []).map((a) => a.trim()).filter(Boolean);
  let authorPart = "Unknown Author";
  if (authors.length === 1) {
    authorPart = authors[0];
  } else if (authors.length === 2) {
    authorPart = `${authors[0]}, & ${authors[1]}`;
  } else if (authors.length > 2) {
    authorPart = `${authors[0]}, ${authors[1]}, & ${authors[2]}`;
  }
  const year = source.year ? `(${source.year}). ` : "(n.d.). ";
  const title = source.title ? `${source.title}. ` : "";
  const journal = source.journal ? `${source.journal}. ` : "";
  const publisher = source.publisher ? `${source.publisher}. ` : "";
  const doi = source.doi ? `https://doi.org/${source.doi}` : source.url ?? "";
  return `${authorPart} ${year}${title}${journal}${publisher}${doi}`.trim();
}

const citationPatterns = [
  /([A-Z][a-zA-Z'-]+(?: et al\.| & [A-Z][a-zA-Z'-]+)*)\s*\((\d{4})[a-z]?\)/g,
  /\(([A-Z][^()]*?(?:19|20)\d{2}[a-z]?[^()]*?)\)/g,
];

function extractCitedSurnames(text: string): string[] {
  const surnames = new Set<string>();
  for (const re of citationPatterns) {
    let m: RegExpExecArray | null;
    while ((m = re.exec(text)) !== null) {
      const group = re.lastIndex === 0 ? m[1] : m[1];
      const authorsPart = re === citationPatterns[0] ? group : group;
      const tokens = authorsPart.split(/[&;,]/).map((t) => t.trim());
      for (const t of tokens) {
        const clean = t.replace(/et al\./g, "").trim();
        if (clean) surnames.add(surnameOf(clean));
      }
    }
  }
  return [...surnames];
}

export const agentTools = {
  count_words: tool({
    description:
      "Count the number of words in the provided text (e.g. a generated chapter or section). Use this to confirm the draft meets the expected length before finalising.",
    inputSchema: z.object({
      text: z.string().describe("The text whose word count is needed."),
    }),
    execute: async ({ text }) => {
      const words = text.trim().split(/\s+/).filter(Boolean).length;
      return { wordCount: words };
    },
  }),

  validate_citations: tool({
    description:
      "Validate that every in-text citation in a draft corresponds to a source in the provided reference list, and that every provided source is cited at least once. Reports mismatches so nothing is fabricated.",
    inputSchema: z.object({
      text: z.string().describe("The draft text to check."),
      sources: z
        .array(
          z.object({
            title: z.string().optional(),
            authors: z.array(z.string()).optional(),
            year: z.number().optional(),
            journal: z.string().optional(),
          })
        )
        .describe("The reference sources the author is allowed to cite."),
    }),
    execute: async ({ text, sources }) => {
      const allowedSurnames = new Set(
        (sources ?? []).flatMap((s) => (s.authors ?? []).map(surnameOf))
      );
      const cited = extractCitedSurnames(text);
      const uncitedButInText = cited.filter((s) => !allowedSurnames.has(s));
      const providedNeverCited = (sources ?? [])
        .flatMap((s) => (s.authors ?? []).map(surnameOf))
        .filter((s) => !cited.includes(s));
      return {
        citedInText: cited,
        notInProvidedSources: uncitedButInText,
        providedSourcesNeverCited: providedNeverCited,
        message:
          uncitedButInText.length || providedNeverCited.length
            ? "Mismatches found — fix before finalising."
            : "All citations are consistent with the provided sources.",
      };
    },
  }),

  build_reference_list: tool({
    description:
      "Generate a complete APA 7 reference list from the provided sources. Use this whenever the user asks for references or a bibliography.",
    inputSchema: z.object({
      sources: z.array(z.any()).describe("The source metadata to format."),
    }),
    execute: async ({ sources }) => {
      const refs = (sources as AgentSource[]).map((s, i) => ({
        index: i + 1,
        reference: formatApa7Reference(s),
      }));
      return { referenceList: refs };
    },
  }),

  check_heading_numbering: tool({
    description:
      "Verify that Markdown headings in a draft follow a consistent numbered academic scheme (e.g. 1.1, 1.2, 2.1...). Reports headings that break the sequence.",
    inputSchema: z.object({
      text: z.string().describe("The Markdown document to check."),
    }),
    execute: async ({ text }) => {
      const headings = text
        .split("\n")
        .map((l) => l.trim())
        .filter((l) => /^#{1,6}\s+/.test(l))
        .map((l) => l.replace(/^#{1,6}\s+/, ""));
      const numbered = headings.filter((h) => /^\d+\.\d+/.test(h));
      const unnumbered = headings.filter((h) => !/^\d+\.\d+/.test(h));
      return {
        numberedHeadings: numbered,
        headingsMissingNumbers: unnumbered,
        totalHeadings: headings.length,
      };
    },
  }),
};

export type AgentToolName = keyof typeof agentTools;
