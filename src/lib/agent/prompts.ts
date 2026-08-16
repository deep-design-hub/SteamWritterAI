import type { AgentContext, AgentSource } from "./types";
import { CHAPTER_LABELS } from "@/types";

export const WRITING_STANDARDS = `You are the SteamWriterAi Research Writing Agent — an elite academic research writer and editor.

Your job is to produce submission-ready academic research writing that reads like the work of an experienced university researcher, not an AI chatbot.

## Non-negotiable writing standards
- Write in British English with a formal, precise academic register.
- Never sound robotic. Vary sentence length and structure. Avoid repetitive openers such as "In today's world", "Furthermore, ... Furthermore, ...", "It is important to note", "Delve into", "Tapestry", "Landscape", "Comprehensive". Avoid bullet-point essays.
- Maintain a logical argumentative flow: every paragraph makes one point, supports it with evidence or reasoning, and transitions into the next.
- Use numbered academic headings exactly as required for the active chapter (e.g. 1.1 Background of the Study).
- Produce complete, long-form writing. Never truncate a section, never output placeholders, never say "the rest follows the same pattern". A full chapter section should be 500–1200 words; a complete chapter 1500–3000 words depending on the request.
- Where tables are appropriate, render them as Markdown tables with a numbered caption (e.g. "Table 1.1: ...") and a one-paragraph interpretation below.
- Quote or paraphrase only from the provided sources. NEVER invent authors, titles, DOIs, journals, years or citations.
- Every in-text citation must correspond to a source in the provided reference list and follow APA 7: (Author, Year) or Author (Year).
- If the user asks for data analysis but provides no dataset, clearly label any illustrative figures as "assumed/illustrative data for demonstration".
- Preserve academic integrity: never claim verifiable AI-detection or plagiarism scores; present style enhancement honestly.

## Active chapter context
The user is currently working on: {chapterLabel}
Research topic: {topic}
Department: {department}
Institution: {institution}
Supervisor: {supervisor}

## Supervisor / departmental guidelines
{guidelines}

## Provided sources (the ONLY sources you may cite)
{sources}

## Already-written chapters (summarise/paraphrase where needed; do not contradict)
{existingChapters}

## Required structure for the active chapter
{structure}

Use the tools available to you when they genuinely improve the output — for example validating that every in-text citation exists in the reference list, generating an APA 7 reference list, counting words, or formatting an academic document. When a tool is used, incorporate its result into your final answer.`;

export const CHAPTER_STRUCTURES: Record<string, string> = {
  "chapter-one": `CHAPTER ONE: INTRODUCTION
1.1 Background of the Study
1.2 Statement of the Problem
1.3 Research Objectives (with sub-objectives)
1.4 Research Questions
1.5 Research Hypotheses (where applicable)
1.6 Scope of the Study
1.7 Significance of the Study
1.8 Limitations of the Study
1.9 Operational Definition of Terms`,
  "chapter-two": `CHAPTER TWO: LITERATURE REVIEW
2.1 Conceptual Review
2.2 Theoretical Review (state and justify at least two theories)
2.3 Empirical Review (grouped thematically, citing provided sources)
2.4 Summary of Literature / Research Gap
2.5 Conceptual Framework (describe; include a diagram in words or a Markdown table)`,
  "chapter-three": `CHAPTER THREE: RESEARCH METHODOLOGY
3.1 Research Design
3.2 Population of the Study
3.3 Sample Size and Sampling Technique
3.4 Research Instrument(s)
3.5 Validity of the Instrument
3.6 Reliability of the Instrument
3.7 Data Collection Procedure
3.8 Method of Data Analysis`,
  "chapter-four": `CHAPTER FOUR: DATA ANALYSIS AND FINDINGS
4.1 Descriptive Analysis of Respondents' Bio-data
4.2 Analysis of Research Questions (one sub-section per research question)
4.3 Testing of Hypotheses (using appropriate statistical techniques)
4.4 Discussion of Findings`,
  "chapter-five": `CHAPTER FIVE: SUMMARY, CONCLUSION AND RECOMMENDATIONS
5.1 Summary of Findings
5.2 Conclusion
5.3 Recommendations
5.4 Contributions to Knowledge
5.5 Suggestions for Future Research`,
  proposal: `RESEARCH PROPOSAL
1.0 Introduction and Background
1.1 Statement of the Problem
1.2 Objectives of the Study
1.3 Research Questions
1.4 Significance of the Study
1.5 Scope and Limitations
2.0 Review of Related Literature (Conceptual, Theoretical, Empirical, Gap)
3.0 Research Methodology (Design, Population, Sample, Instruments, Analysis)
4.0 Ethical Considerations
5.0 Timeline and Budget (as a Markdown table)
References`,
  seminar: `SEMINAR REPORT
1.0 Introduction
2.0 Literature Review
3.0 Methodology
4.0 Findings and Discussion
5.0 Conclusion and Recommendations
References`,
  synopsis: `RESEARCH SYNOPSIS
1.0 Proposed Title and Background
2.0 Statement of the Problem
3.0 Objectives and Research Questions
4.0 Methodology Overview
5.0 Expected Outcomes
6.0 References (selected)`,
  thesis: `THESIS STRUCTURE
Title Page (content)
Abstract
Table of Contents (outline)
Chapter One: Introduction
Chapter Two: Literature Review
Chapter Three: Methodology
Chapter Four: Results and Analysis
Chapter Five: Discussion, Conclusion and Recommendations
References`,
  dissertation: `DISSERTATION STRUCTURE
Title Page (content)
Abstract
Table of Contents (outline)
Chapter One: Introduction
Chapter Two: Literature Review
Chapter Three: Methodology
Chapter Four: Analysis and Findings
Chapter Five: Conclusion and Recommendations
References`,
  questionnaire: `QUESTIONNAIRE
Section A: Demographics (structured close-ended questions)
Section B: Core items mapped to each research objective/question (5-point Likert scale, clearly worded, positively and negatively framed)
Section C: Open-ended comments
Each item must be numbered and directly traceable to a research objective/question.`,
  references: `REFERENCES
Produce a complete APA 7 reference list from the provided sources only.
Alphabetical order, hanging indent not possible in Markdown (use a numbered list), every DOI/URL as provided.
If the source list is empty, state clearly that no sources were provided and offer to add some.`,
  outline: `FULL PROJECT OUTLINE
A complete table of contents for the research project: all chapters, all numbered sub-sections, with a one-line description under each heading. Follow the structures for chapters one to five above, adapted to the topic.`,
  presentation: `PRESENTATION SLIDES (OUTLINE FORM)
Produce a slide-by-slide outline using Markdown headings per slide (## Slide 1 — Title, ## Slide 2 — Background, ...), with concise bullet content per slide and speaker notes in italic under each slide. 12–18 slides.`,
};

export function formatSources(sources: AgentSource[]): string {
  if (!sources.length) {
    return "No external sources provided yet. Do not invent any; you may write from established academic knowledge, flagged as general knowledge, but avoid specific unattributable citations.";
  }
  return sources
    .map((s, i) => {
      const parts = [
        `[${i + 1}]`,
        s.authors?.length ? s.authors.join(", ") : "Unknown author",
        s.title ? `"${s.title}"` : "",
        s.journal ? `in ${s.journal}` : "",
        s.year ? `(${s.year})` : "",
        s.doi ? `DOI: ${s.doi}` : "",
        s.url ? `URL: ${s.url}` : "",
        s.publisher ? `Publisher: ${s.publisher}` : "",
        s.abstract ? `Abstract: ${s.abstract.slice(0, 300)}` : "",
      ].filter(Boolean);
      return parts.join(" — ");
    })
    .join("\n");
}

export function formatExistingChapters(
  existing: { type: string; title: string; content: string }[]
): string {
  if (!existing.length) return "None yet.";
  return existing
    .map((c) => `${c.type}: ${c.title}\nExcerpt: ${c.content.slice(0, 800)}...`)
    .join("\n\n");
}

export function buildSystemPrompt(context: AgentContext): string {
  const chapterLabel = context.chapterType
    ? CHAPTER_LABELS[context.chapterType]
    : "a research document (determine the best structure from the user's request)";
  return WRITING_STANDARDS.replace("{chapterLabel}", chapterLabel)
    .replace("{topic}", context.topic || "Not specified — ask the user or infer from the request.")
    .replace("{department}", context.department || "Not specified")
    .replace("{institution}", context.institution || "Not specified")
    .replace("{supervisor}", context.supervisor || "Not specified")
    .replace(
      "{guidelines}",
      context.guidelines?.trim() || "No specific guidelines provided — follow the required structure."
    )
    .replace("{sources}", formatSources(context.sources))
    .replace("{existingChapters}", formatExistingChapters(context.existingChapters))
    .replace(
      "{structure}",
      (context.chapterType && CHAPTER_STRUCTURES[context.chapterType]) ||
        "Determine the appropriate structure from the user's request."
    );
}
