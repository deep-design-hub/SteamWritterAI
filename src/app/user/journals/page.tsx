"use client";

import { Search } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

export default function JournalsPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Journal Search</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Coming soon — discover real 2020+ journal articles from Crossref,
          OpenAlex and Semantic Scholar. No invented papers, ever.
        </p>
      </div>
      <Card className="border-border/60 border-dashed py-16">
        <CardContent className="flex flex-col items-center gap-3 text-center">
          <Search className="text-muted-foreground size-8" />
          <CardTitle className="text-base">Journal discovery engine</CardTitle>
          <CardDescription>
            This module will be built in the next phase.
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
}
