"use client";

import Link from "next/link";
import * as React from "react";
import { useChat, type UIMessage } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { toast } from "sonner";
import {
  Bot,
  BookOpen,
  FileText,
  Languages,
  ListChecks,
  Plus,
  Quote,
  Send,
  Square,
  Trash2,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { uid } from "@/lib/storage";
import {
  CHAPTER_LABELS,
  CHAPTER_TYPES,
  type Chapter,
  type ChapterType,
  type ChatMessage,
  type Project,
  type Reference,
} from "@/types";
import type { AgentContext } from "@/lib/agent/types";
import { useProjectStore } from "@/store/useProjectStore";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Markdown } from "@/components/markdown";

function uiToText(m: UIMessage): string {
  return (m.parts ?? [])
    .filter((p) => p.type === "text")
    .map((p) => (p as { text: string }).text)
    .join("\n");
}

function toChatMessage(m: UIMessage): ChatMessage {
  return {
    id: m.id,
    role: m.role === "assistant" ? "assistant" : "user",
    content: uiToText(m),
    createdAt: new Date().toISOString(),
  };
}

function toUiMessage(m: ChatMessage): UIMessage {
  return {
    id: m.id,
    role: m.role,
    parts: [{ type: "text", text: m.content }],
  };
}

function referenceToSource(r: Reference): AgentContext["sources"][number] {
  return {
    title: r.title,
    authors: r.authors,
    year: r.year,
    journal: r.journal,
    doi: r.doi,
    url: r.url,
    publisher: r.publisher,
  };
}

export function ProjectWorkspace({ projectId }: { projectId: string }) {
  const projects = useProjectStore((s) => s.projects);
  const saveChapter = useProjectStore((s) => s.saveChapter);
  const updateProject = useProjectStore((s) => s.updateProject);
  const saveReferences = useProjectStore((s) => s.saveReferences);
  const deleteProject = useProjectStore((s) => s.deleteProject);

  const project = projects.find((p) => p.id === projectId);

  const [chapterType, setChapterType] = React.useState<ChapterType>("chapter-one");
  const [configured, setConfigured] = React.useState<string[]>([]);
  const [viewingChapter, setViewingChapter] = React.useState<Chapter | null>(null);
  const [sourceForm, setSourceForm] = React.useState({
    title: "",
    authors: "",
    year: "",
    journal: "",
    doi: "",
    url: "",
  });

  const chapterTypeRef = React.useRef(chapterType);
  const messagesRef = React.useRef<UIMessage[]>([]);

  React.useEffect(() => {
    chapterTypeRef.current = chapterType;
  }, [chapterType]);

  React.useEffect(() => {
    fetch("/api/agent")
      .then((r) => r.json())
      .then((d) => setConfigured(d.providers ?? []))
      .catch(() => setConfigured([]));
  }, []);

  if (!project) {
    return (
      <div className="mx-auto max-w-md py-20 text-center">
        <p className="text-muted-foreground">Project not found.</p>
        <Button asChild className="mt-4">
          <Link href="/user/projects">Back to projects</Link>
        </Button>
      </div>
    );
  }

  return (
    <ProjectWorkspaceInner
      project={project}
      chapterType={chapterType}
      setChapterType={setChapterType}
      configured={configured}
      viewingChapter={viewingChapter}
      setViewingChapter={setViewingChapter}
      sourceForm={sourceForm}
      setSourceForm={setSourceForm}
      saveChapter={saveChapter}
      updateProject={updateProject}
      saveReferences={saveReferences}
      deleteProject={deleteProject}
      messagesRef={messagesRef}
      chapterTypeRef={chapterTypeRef}
      key={project.id}
    />
  );
}

interface InnerProps {
  project: Project;
  chapterType: ChapterType;
  setChapterType: (t: ChapterType) => void;
  configured: string[];
  viewingChapter: Chapter | null;
  setViewingChapter: (c: Chapter | null) => void;
  sourceForm: {
    title: string;
    authors: string;
    year: string;
    journal: string;
    doi: string;
    url: string;
  };
  setSourceForm: React.Dispatch<
    React.SetStateAction<{
      title: string;
      authors: string;
      year: string;
      journal: string;
      doi: string;
      url: string;
    }>
  >;
  saveChapter: (projectId: string, chapter: Chapter) => void;
  updateProject: (id: string, patch: Partial<Project>) => void;
  saveReferences: (projectId: string, references: Reference[]) => void;
  deleteProject: (id: string) => void;
  messagesRef: React.MutableRefObject<UIMessage[]>;
  chapterTypeRef: React.MutableRefObject<ChapterType>;
}

function ProjectWorkspaceInner({
  project,
  chapterType,
  setChapterType,
  configured,
  viewingChapter,
  setViewingChapter,
  sourceForm,
  setSourceForm,
  saveChapter,
  updateProject,
  saveReferences,
  deleteProject,
  messagesRef,
  chapterTypeRef,
}: InnerProps) {
  const context = React.useMemo<AgentContext>(
    () => ({
      topic: project.topic,
      department: project.department,
      institution: project.institution,
      supervisor: project.supervisor,
      guidelines: project.guidelines,
      model: project.model,
      chapterType,
      sources: project.references.map(referenceToSource),
      existingChapters: project.chapters.map((c) => ({
        type: c.type,
        title: c.title,
        content: c.content.slice(0, 3000),
      })),
    }),
    [project, chapterType]
  );

  const [draft, setDraft] = React.useState("");

  const {
    messages,
    sendMessage,
    status,
    stop,
    error,
  } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/agent",
      body: { context },
    }),
    messages: project.messages.map(toUiMessage),
    onFinish: ({ message, isAbort, isError, isDisconnect }) => {
      if (isAbort || isError || isDisconnect) return;
      const text = uiToText(message);
      if (!text.trim()) return;
      const currentProject = useProjectStore.getState().projects.find(
        (p) => p.id === project.id
      );
      if (!currentProject) return;
      const type = chapterTypeRef.current;
      const existing = currentProject.chapters.find((c) => c.type === type);
      const chapter: Chapter = {
        id: existing?.id ?? uid(),
        type,
        title: CHAPTER_LABELS[type],
        content: text,
        version: existing ? existing.version + 1 : 1,
        aiGenerated: true,
        updatedAt: new Date().toISOString(),
      };
      saveChapter(project.id, chapter);
      updateProject(project.id, {
        messages: messagesRef.current.map(toChatMessage),
      });
      toast.success(`Saved to ${CHAPTER_LABELS[type]}`);
    },
  });

  const isLoading = status === "submitted" || status === "streaming";

  React.useEffect(() => {
    messagesRef.current = messages;
  }, [messages, messagesRef]);

  const scrollRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, isLoading]);

  function quickAction(prompt: string) {
    void sendMessage({ text: prompt });
  }

  function addSource(e: React.FormEvent) {
    e.preventDefault();
    const ref: Reference = {
      id: uid(),
      title: sourceForm.title.trim(),
      authors: sourceForm.authors
        .split(",")
        .map((a) => a.trim())
        .filter(Boolean),
      year: sourceForm.year ? Number(sourceForm.year) : new Date().getFullYear(),
      journal: sourceForm.journal.trim() || undefined,
      doi: sourceForm.doi.trim() || undefined,
      url: sourceForm.url.trim() || undefined,
    };
    if (!ref.title && ref.authors.length === 0) {
      toast.error("Add at least a title or authors.");
      return;
    }
    saveReferences(project.id, [...project.references, ref]);
    setSourceForm({
      title: "",
      authors: "",
      year: "",
      journal: "",
      doi: "",
      url: "",
    });
    toast.success("Source added to the reference list.");
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-2xl font-bold tracking-tight">{project.title}</h1>
          <p className="text-muted-foreground mt-1 text-sm">{project.topic}</p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="capitalize">
              {project.status}
            </Badge>
            <Badge variant="outline" className="capitalize">
              {project.model}
            </Badge>
            {project.department && (
              <span className="text-muted-foreground text-xs">
                {project.department}
                {project.institution ? ` · ${project.institution}` : ""}
              </span>
            )}
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-destructive hover:bg-destructive/10 hover:text-destructive"
          onClick={() => {
            if (window.confirm("Delete this project and all its content?")) {
              deleteProject(project.id);
              toast.success("Project deleted.");
            }
          }}
        >
          <Trash2 className="size-4" /> Delete
        </Button>
      </div>

      {configured.length === 0 && (
        <Card className="border-destructive/40 bg-destructive/5 border py-4">
          <CardContent className="px-6 text-sm">
            <p className="font-medium text-destructive">
              No AI provider configured.
            </p>
            <p className="text-muted-foreground mt-1">
              Add <code>OPENAI_API_KEY</code> or <code>ANTHROPIC_API_KEY</code>{" "}
              to <code>web/.env.local</code> (see <code>web/.env.example</code>)
              and restart <code>npm run dev</code>.
            </p>
          </CardContent>
        </Card>
      )}

      {error && (
        <Card className="border-destructive/40 bg-destructive/5 border py-4">
          <CardContent className="px-6 text-sm text-destructive">
            {error.message}
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* LEFT: project context */}
        <div className="space-y-4">
          <Card className="gap-4 py-5">
            <CardHeader>
              <CardTitle className="text-base">Research context</CardTitle>
              <CardDescription>
                What the agent knows about your project
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 text-sm">
              <div>
                <p className="text-muted-foreground text-xs font-medium uppercase">
                  Topic
                </p>
                <p className="mt-1">{project.topic}</p>
              </div>
              {project.supervisor && (
                <div>
                  <p className="text-muted-foreground text-xs font-medium uppercase">
                    Supervisor
                  </p>
                  <p className="mt-1">{project.supervisor}</p>
                </div>
              )}
              {project.guidelines && (
                <div>
                  <p className="text-muted-foreground text-xs font-medium uppercase">
                    Guidelines
                  </p>
                  <p className="text-muted-foreground mt-1 line-clamp-4">
                    {project.guidelines}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Sources */}
          <Card className="gap-4 py-5">
            <CardHeader>
              <CardTitle className="text-base">Sources</CardTitle>
              <CardDescription>
                The agent may only cite these (never invents references)
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3">
              <form onSubmit={addSource} className="grid gap-2">
                <Input
                  placeholder="Title"
                  value={sourceForm.title}
                  onChange={(e) =>
                    setSourceForm({ ...sourceForm, title: e.target.value })
                  }
                />
                <Input
                  placeholder="Authors (comma separated)"
                  value={sourceForm.authors}
                  onChange={(e) =>
                    setSourceForm({ ...sourceForm, authors: e.target.value })
                  }
                />
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    placeholder="Year"
                    type="number"
                    value={sourceForm.year}
                    onChange={(e) =>
                      setSourceForm({ ...sourceForm, year: e.target.value })
                    }
                  />
                  <Input
                    placeholder="Journal"
                    value={sourceForm.journal}
                    onChange={(e) =>
                      setSourceForm({ ...sourceForm, journal: e.target.value })
                    }
                  />
                </div>
                <Input
                  placeholder="DOI or URL (optional)"
                  value={sourceForm.doi}
                  onChange={(e) =>
                    setSourceForm({ ...sourceForm, doi: e.target.value })
                  }
                />
                <Button type="submit" size="sm" variant="outline">
                  <Plus className="size-3" /> Add source
                </Button>
              </form>

              {project.references.length > 0 && (
                <ScrollArea className="h-44">
                  <ul className="space-y-2 pr-2">
                    {project.references.map((r) => (
                      <li key={r.id} className="text-muted-foreground text-xs">
                        <span className="font-medium text-foreground">
                          {r.authors.join(", ")}
                        </span>{" "}
                        ({r.year}). {r.title}
                        {r.journal ? ` — ${r.journal}` : ""}
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              )}
            </CardContent>
          </Card>

          {/* Saved chapters */}
          <Card className="gap-4 py-5">
            <CardHeader>
              <CardTitle className="text-base">Saved chapters</CardTitle>
              <CardDescription>
                Click a chapter to view the full draft
              </CardDescription>
            </CardHeader>
            <CardContent>
              {project.chapters.length === 0 ? (
                <p className="text-muted-foreground text-sm">
                  Nothing saved yet. Generate a chapter in the agent panel and
                  it will appear here automatically.
                </p>
              ) : (
                <ul className="space-y-2">
                  {project.chapters
                    .slice()
                    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
                    .map((c) => (
                      <li key={c.id}>
                        <Button
                          variant="ghost"
                          className="h-auto w-full justify-between px-3 py-2"
                          onClick={() => setViewingChapter(c)}
                        >
                          <span className="flex items-center gap-2 text-left">
                            <FileText className="text-primary size-4" />
                            <span className="text-sm">{c.title}</span>
                          </span>
                          <span className="text-muted-foreground text-xs">
                            v{c.version} · {c.content.split(/\s+/).length}w
                          </span>
                        </Button>
                      </li>
                    ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>

        {/* RIGHT: agent chat */}
        <Card className="flex min-h-[70vh] flex-col gap-0 py-0 lg:col-span-2">
          <CardHeader className="border-b px-5 py-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-lg">
                  <Bot className="size-4" />
                </div>
                <div>
                  <CardTitle className="text-base">Writing Agent</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <span>Streaming</span>
                    <Badge variant="outline" className="capitalize">
                      {project.model}
                    </Badge>
                  </CardDescription>
                </div>
              </div>
              <Select
                value={chapterType}
                onValueChange={(v) => setChapterType(v as ChapterType)}
              >
                <SelectTrigger className="w-[240px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CHAPTER_TYPES.map((t) => (
                    <SelectItem key={t} value={t}>
                      {CHAPTER_LABELS[t]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardHeader>

          <CardContent className="flex flex-1 flex-col gap-3 overflow-hidden px-0">
            <div className="flex flex-wrap gap-2 px-5 pt-3">
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  quickAction(
                    `Generate ${CHAPTER_LABELS[chapterTypeRef.current]} following the required structure for this topic. Write it in full.`
                  )
                }
              >
                <BookOpen className="size-3" /> Generate
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  quickAction(
                    "Generate a complete outline of this research project (all chapters and numbered sub-sections)."
                  )
                }
              >
                <ListChecks className="size-3" /> Outline
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  quickAction(
                    "Humanise and polish the most recent generated draft: make it read more naturally and humanly, remove AI-typical phrasing, keep every citation, structure and meaning identical. Output the polished full text."
                  )
                }
              >
                <Languages className="size-3" /> Humanise
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  quickAction(
                    "Generate the APA 7 reference list using only the provided sources."
                  )
                }
              >
                <Quote className="size-3" /> References
              </Button>
            </div>

            <Separator />

            <ScrollArea className="flex-1 px-5">
              <div
                ref={scrollRef}
                className="flex h-full flex-col gap-4 py-4"
              >
                {messages.length === 0 && !isLoading && (
                  <div className="text-muted-foreground flex h-full flex-col items-center justify-center gap-2 py-16 text-center">
                    <Bot className="size-8" />
                    <p className="text-sm">
                      Select a document type above and press{" "}
                      <span className="font-medium">Generate</span>, or just ask
                      in your own words.
                    </p>
                  </div>
                )}

                {messages.map((m) => {
                  const text = uiToText(m);
                  if (!text.trim()) return null;
                  const isUser = m.role === "user";
                  return (
                    <div
                      key={m.id}
                      className={cn(
                        "flex",
                        isUser ? "justify-end" : "justify-start"
                      )}
                    >
                      <div
                        className={cn(
                          "max-w-[85%] rounded-2xl px-4 py-3",
                          isUser
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        )}
                      >
                        {isUser ? (
                          <p className="text-sm whitespace-pre-wrap">{text}</p>
                        ) : (
                          <Markdown className="prose-sm">{text}</Markdown>
                        )}
                      </div>
                    </div>
                  );
                })}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-2xl px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <Skeleton className="size-2 rounded-full" />
                        <Skeleton className="size-2 rounded-full" />
                        <Skeleton className="size-2 rounded-full" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!draft.trim() || isLoading) return;
                void sendMessage({ text: draft });
                setDraft("");
              }}
              className="flex items-end gap-2 border-t px-5 py-3"
            >
              <Textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder={
                  "Ask the agent to write, revise, expand or restructure…"
                }
                className="min-h-11 flex-1 resize-none"
                rows={2}
              />
              {isLoading ? (
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => stop()}
                  aria-label="Stop generating"
                >
                  <Square className="size-4" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  size="icon"
                  disabled={!draft.trim()}
                  aria-label="Send message"
                >
                  <Send className="size-4" />
                </Button>
              )}
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Chapter viewer */}
      <Dialog
        open={!!viewingChapter}
        onOpenChange={(o) => !o && setViewingChapter(null)}
      >
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{viewingChapter?.title}</DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[60vh] pr-4">
            {viewingChapter && (
              <Markdown className="prose-sm">{viewingChapter.content}</Markdown>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export { CHAPTER_TYPES };
