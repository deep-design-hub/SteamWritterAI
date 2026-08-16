"use client";

import { FileText } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

export default function TemplatesPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Templates</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Coming soon — save departmental formats, supervisor styles and
          approved chapter structures to reuse across projects.
        </p>
      </div>
      <Card className="border-border/60 border-dashed py-16">
        <CardContent className="flex flex-col items-center gap-3 text-center">
          <FileText className="text-muted-foreground size-8" />
          <CardTitle className="text-base">Template library</CardTitle>
          <CardDescription>
            This module will be built in the next phase.
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
}
