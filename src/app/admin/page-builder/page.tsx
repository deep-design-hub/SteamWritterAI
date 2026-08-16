"use client";

import Link from "next/link";
import {
  ArrowRight,
  Eye,
  Pencil,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBuilderStore } from "@/components/admin/page-builder/store";
import { PAGE_LIST } from "@/components/admin/page-builder/defaults";

export default function PageBuilderListPage() {
  const pages = useBuilderStore((s) => s.pages);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-extrabold tracking-tight">Page Builder</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage every page on your site. Select a page to edit its layout and content.
        </p>
      </div>

      <div className="rounded-lg border">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/40 text-left">
              <th className="px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Page
              </th>
              <th className="px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Route
              </th>
              <th className="px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Sections
              </th>
              <th className="px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Description
              </th>
              <th className="px-4 py-2.5 text-right text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {PAGE_LIST.map((page) => {
              const blockCount = pages[page.slug]?.blocks?.length ?? page.sectionCount;
              return (
                <tr
                  key={page.slug}
                  className="group border-b last:border-b-0 transition-colors hover:bg-muted/20"
                >
                  <td className="px-4 py-3">
                    <span className="text-sm font-semibold text-foreground">
                      {page.name}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <code className="rounded bg-muted px-1.5 py-0.5 text-[11px] text-muted-foreground">
                      {page.route}
                    </code>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                      {blockCount} blocks
                    </span>
                  </td>
                  <td className="max-w-xs px-4 py-3 text-xs text-muted-foreground">
                    {page.description}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1.5">
                      <Button
                        asChild
                        size="sm"
                        variant="ghost"
                        className="h-7 px-2 text-xs"
                      >
                        <Link href={page.route} target="_blank">
                          <Eye className="mr-1 size-3" />
                          View
                        </Link>
                      </Button>
                      <Button
                        asChild
                        size="sm"
                        className="h-7 px-2 text-xs"
                      >
                        <Link href={`/admin/page-builder/${page.slug}`}>
                          <Pencil className="mr-1 size-3" />
                          Edit
                          <ArrowRight className="ml-1 size-3" />
                        </Link>
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
