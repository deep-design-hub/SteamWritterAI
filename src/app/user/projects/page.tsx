"use client";

import Link from "next/link";
import { ArrowRight, Plus, Trash2 } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useProjectStore } from "@/store/useProjectStore";

export default function ProjectsPage() {
  const projects = useProjectStore((s) => s.projects);
  const deleteProject = useProjectStore((s) => s.deleteProject);

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My projects</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            All your research projects, saved locally on this device.
          </p>
        </div>
        <Button asChild>
          <Link href="/user/projects/new">
            <Plus className="size-4" /> New project
          </Link>
        </Button>
      </div>

      {projects.length === 0 ? (
        <Card className="border-border/60 border-dashed py-16">
          <CardContent className="flex flex-col items-center gap-3 text-center">
            <p className="text-muted-foreground">No projects yet.</p>
            <Button asChild size="sm">
              <Link href="/user/projects/new">
                <Plus className="size-4" /> Create your first project
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-3">
          {projects.map((p) => (
            <Card key={p.id} className="gap-3 py-4">
              <CardContent className="flex flex-wrap items-center justify-between gap-3 px-6">
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold">{p.title}</p>
                  <p className="text-muted-foreground truncate text-sm">
                    {p.topic}
                  </p>
                  <p className="text-muted-foreground mt-1 text-xs">
                    {p.chapters.length} chapters · {p.references.length}{" "}
                    references ·{" "}
                    {new Date(p.updatedAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <Badge variant="secondary" className="capitalize">
                    {p.status}
                  </Badge>
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/user/projects/${p.id}`}>
                      Open <ArrowRight className="size-3" />
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Delete project"
                    onClick={() => {
                      if (
                        window.confirm(
                          `Delete "${p.title}"? This cannot be undone.`
                        )
                      ) {
                        deleteProject(p.id);
                      }
                    }}
                  >
                    <Trash2 className="text-destructive size-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
