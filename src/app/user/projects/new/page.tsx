"use client";

import { useRouter } from "next/navigation";
import * as React from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useProjectStore } from "@/store/useProjectStore";
import { Badge } from "@/components/ui/badge";
import { Zap } from "lucide-react";

export default function NewProjectPage() {
  const router = useRouter();
  const createProject = useProjectStore((s) => s.createProject);

  const [form, setForm] = React.useState({
    title: "",
    topic: "",
    department: "",
    institution: "",
    supervisor: "",
    guidelines: "",
  });

  const [configured, setConfigured] = React.useState<string[]>([]);

  React.useEffect(() => {
    fetch("/api/agent")
      .then((r) => r.json())
      .then((d) => setConfigured(d.providers ?? []))
      .catch(() => setConfigured([]));
  }, []);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.topic.trim()) {
      toast.error("A research topic is required.");
      return;
    }
    const project = createProject({
      title: form.title.trim() || form.topic.trim(),
      topic: form.topic.trim(),
      department: form.department.trim(),
      institution: form.institution.trim(),
      supervisor: form.supervisor.trim(),
      guidelines: form.guidelines.trim(),
      model: "ensemble",
    });
    toast.success("Project created.");
    router.push(`/user/projects/${project.id}`);
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">New project</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Tell the agent about your research. You can refine everything later.
        </p>
      </div>

      {configured.length === 0 && (
        <Card className="border-destructive/40 bg-destructive/5 border py-4">
          <CardContent className="px-6 text-sm">
            <p className="font-medium text-destructive">
              No AI provider is configured yet.
            </p>
            <p className="text-muted-foreground mt-1">
              Add an <code>OPENAI_API_KEY</code> or <code>ANTHROPIC_API_KEY</code>{" "}
              to <code>.env.local</code> (see <code>.env.example</code>) and
              restart the dev server. Without it, the agent cannot generate
              chapters.
            </p>
          </CardContent>
        </Card>
      )}

      <form onSubmit={onSubmit} className="grid gap-4">
        <Card className="gap-4 py-6">
          <CardHeader>
            <CardTitle>Research details</CardTitle>
            <CardDescription>
              The more context you give, the better the writing.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="topic">Research topic *</Label>
              <Input
                id="topic"
                placeholder="e.g. The Effect of E-Banking on Customer Satisfaction in Nigerian Commercial Banks"
                value={form.topic}
                onChange={(e) => setForm({ ...form, topic: e.target.value })}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="title">Project title (optional)</Label>
              <Input
                id="title"
                placeholder="Defaults to the topic"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  placeholder="e.g. Business Administration"
                  value={form.department}
                  onChange={(e) =>
                    setForm({ ...form, department: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="institution">Institution</Label>
                <Input
                  id="institution"
                  placeholder="e.g. University of Lagos"
                  value={form.institution}
                  onChange={(e) =>
                    setForm({ ...form, institution: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="supervisor">Supervisor (optional)</Label>
              <Input
                id="supervisor"
                placeholder="e.g. Prof. A. B. Adeyemi"
                value={form.supervisor}
                onChange={(e) =>
                  setForm({ ...form, supervisor: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="guidelines">
                Supervisor / departmental guidelines (optional)
              </Label>
              <Textarea
                id="guidelines"
                rows={4}
                placeholder="Paste any format requirements, chapter preferences, citation style, word counts, or notes from your supervisor…"
                value={form.guidelines}
                onChange={(e) =>
                  setForm({ ...form, guidelines: e.target.value })
                }
              />
            </div>
            <div className="rounded-lg border bg-muted/50 px-4 py-3 flex items-center gap-3">
              <Zap className="text-primary size-5" />
              <div>
                <p className="text-sm font-medium">All AI models enabled</p>
                <p className="text-muted-foreground text-xs">All available models work together for the best result. You can manage models in Admin &gt; AI Models.</p>
              </div>
              <Badge variant="secondary" className="ml-auto">Ensemble</Badge>
            </div>
          </CardContent>
        </Card>

        <Button type="submit" size="lg" className="w-full">
          Create project & start writing
        </Button>
      </form>
    </div>
  );
}
