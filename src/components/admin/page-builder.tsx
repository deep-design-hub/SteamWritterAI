"use client";

import Link from "next/link";
import * as React from "react";
import { toast } from "sonner";
import {
  ArrowDown,
  ArrowUp,
  Eye,
  LayoutGrid,
  Plus,
  RotateCcw,
  Settings,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useContentStore } from "@/store/useContentStore";
import { DEFAULT_PAGES } from "@/lib/page-defaults";
import {
  PAGE_SLUGS,
  SECTION_TYPES,
  type PageContent,
  type PageItem,
  type PageSection,
  type SectionType,
} from "@/lib/content-types";

const PLAIN_FIELDS: { key: string; label: string; type?: "text" | "textarea" }[] = [
  { key: "icon", label: "Icon name" },
  { key: "title", label: "Title" },
  { key: "description", label: "Description", type: "textarea" },
  { key: "price", label: "Price" },
  { key: "badge", label: "Badge" },
  { key: "href", label: "Link URL" },
  { key: "cta", label: "CTA label" },
  { key: "value", label: "Value (stats)" },
  { key: "hint", label: "Hint" },
  { key: "category", label: "Category (blog)" },
  { key: "date", label: "Date (blog)" },
  { key: "readTime", label: "Read time (blog)" },
  { key: "slug", label: "Slug (blog)" },
];

function ItemEditor({
  item,
  onUpdate,
  onRemove,
}: {
  item: PageItem;
  onUpdate: (patch: Record<string, unknown>) => void;
  onRemove: () => void;
}) {
  const [listText, setListText] = React.useState(item.list?.join("\n") ?? "");
  const [listOpen, setListOpen] = React.useState(false);

  const patch = (key: string, val: unknown) => onUpdate({ [key]: val });

  return (
    <div className="rounded-lg border bg-muted/30 p-3 space-y-2">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-bold text-muted-foreground">
          {item.id.slice(0, 8)}
        </span>
        <Button size="icon" variant="ghost" onClick={onRemove} className="size-6">
          <Trash2 className="size-3 text-destructive" />
        </Button>
      </div>
      {PLAIN_FIELDS.map((f) => (
        <div key={f.key}>
          <Label className="text-xs">{f.label}</Label>
          {f.type === "textarea" ? (
            <textarea
              value={String((item as unknown as Record<string, unknown>)[f.key] ?? "")}
              onChange={(e) => patch(f.key, e.target.value)}
              className="border-input bg-background mt-0.5 w-full rounded border px-2 py-1 text-xs"
              rows={3}
            />
          ) : (
            <Input
              value={String((item as unknown as Record<string, unknown>)[f.key] ?? "")}
              onChange={(e) => patch(f.key, e.target.value)}
              className="h-7 mt-0.5 text-xs"
            />
          )}
        </div>
      ))}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={item.featured ?? false}
          onChange={(e) => patch("featured", e.target.checked)}
          className="size-3.5 accent-primary"
        />
        <Label className="text-xs">Featured</Label>
      </div>
      <Button
        size="sm"
        variant="ghost"
        className="h-6 text-xs"
        onClick={() => setListOpen(!listOpen)}
      >
        {listOpen ? "Collapse" : "Edit"} list ({(item.list ?? []).length} items)
      </Button>
      {listOpen && (
        <div>
          <textarea
            value={listText}
            onChange={(e) => setListText(e.target.value)}
            onBlur={() =>
              patch(
                "list",
                listText
                  .split("\n")
                  .map((l) => l.trim())
                  .filter(Boolean)
              )
            }
            className="border-input bg-background mt-0.5 w-full rounded border px-2 py-1 text-xs"
            rows={5}
            placeholder="one item per line"
          />
        </div>
      )}
    </div>
  );
}

function SectionEditor({
  section,
  slug,
}: {
  section: PageSection;
  slug: string;
}) {
  const { updateSection, removeSection, moveSection, addItem, removeItem } =
    useContentStore();
  const [expanded, setExpanded] = React.useState(false);

  const patch = (key: string, val: unknown) =>
    updateSection(slug, section.id, { [key]: val });

  return (
    <div className="rounded-xl border bg-card">
      <div className="flex items-center justify-between gap-2 px-3 py-2">
        <div className="flex items-center gap-2">
          <span className="bg-primary/10 text-primary rounded px-1.5 py-0.5 text-[10px] font-bold">
            {section.type.toUpperCase()}
          </span>
          <span className="text-xs font-medium">
            {section.heading || "No heading"}
          </span>
          <span className="text-muted-foreground text-xs">
            ({section.items.length} items)
          </span>
        </div>
        <div className="flex items-center gap-0.5">
          <Button size="icon" variant="ghost" className="size-6" onClick={() => moveSection(slug, section.id, -1)}>
            <ArrowUp className="size-3" />
          </Button>
          <Button size="icon" variant="ghost" className="size-6" onClick={() => moveSection(slug, section.id, 1)}>
            <ArrowDown className="size-3" />
          </Button>
          <Button size="icon" variant="ghost" className="size-6" onClick={() => setExpanded(!expanded)}>
            <Settings className="size-3" />
          </Button>
          <Button size="icon" variant="ghost" className="size-6" onClick={() => removeSection(slug, section.id)}>
            <Trash2 className="size-3 text-destructive" />
          </Button>
        </div>
      </div>
      {expanded && (
        <div className="space-y-3 border-t px-3 py-3">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-xs">Badge</Label>
              <Input
                value={section.badge ?? ""}
                onChange={(e) => patch("badge", e.target.value)}
                className="h-7 text-xs"
              />
            </div>
            <div>
              <Label className="text-xs">Heading</Label>
              <Input
                value={section.heading ?? ""}
                onChange={(e) => patch("heading", e.target.value)}
                className="h-7 text-xs"
              />
            </div>
          </div>
          <div>
            <Label className="text-xs">Subheading</Label>
            <textarea
              value={section.subheading ?? ""}
              onChange={(e) => patch("subheading", e.target.value)}
              className="border-input bg-background w-full rounded border px-2 py-1 text-xs"
              rows={2}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-xs">Primary CTA label</Label>
              <Input
                value={section.primaryCta?.label ?? ""}
                onChange={(e) =>
                  patch("primaryCta", {
                    ...(section.primaryCta ?? { href: "/register" }),
                    label: e.target.value,
                  })
                }
                className="h-7 text-xs"
              />
            </div>
            <div>
              <Label className="text-xs">Primary CTA href</Label>
              <Input
                value={section.primaryCta?.href ?? "/register"}
                onChange={(e) =>
                  patch("primaryCta", {
                    ...(section.primaryCta ?? { label: "" }),
                    href: e.target.value,
                  })
                }
                className="h-7 text-xs"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-xs">Secondary CTA label</Label>
              <Input
                value={section.secondaryCta?.label ?? ""}
                onChange={(e) =>
                  patch("secondaryCta", {
                    ...(section.secondaryCta ?? { href: "/pricing" }),
                    label: e.target.value,
                  })
                }
                className="h-7 text-xs"
              />
            </div>
            <div>
              <Label className="text-xs">Secondary CTA href</Label>
              <Input
                value={section.secondaryCta?.href ?? "/pricing"}
                onChange={(e) =>
                  patch("secondaryCta", {
                    ...(section.secondaryCta ?? { label: "" }),
                    href: e.target.value,
                  })
                }
                className="h-7 text-xs"
              />
            </div>
          </div>
          <div className="space-y-2 pt-2">
            <Label className="text-xs font-bold">
              Items ({section.items.length})
            </Label>
            {section.items.map((item) => (
              <ItemEditor
                key={item.id}
                item={item}
                onUpdate={(patch) => {
                  const items = section.items.map((i) =>
                    i.id === item.id ? { ...i, ...patch } : i
                  );
                  updateSection(slug, section.id, { items });
                }}
                onRemove={() => removeItem(slug, section.id, item.id)}
              />
            ))}
            <Button
              size="sm"
              variant="outline"
              onClick={() => addItem(slug, section.id)}
            >
              <Plus className="size-3" /> Add item
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export function PageBuilder() {
  const pages = useContentStore((s) => s.pages);
  const { updatePage, addSection, resetPage, setContent } = useContentStore();
  const [slug, setSlug] = React.useState<string>("home");
  const [newSectionType, setNewSectionType] =
    React.useState<SectionType>("cards");

  const content = pages[slug] ?? DEFAULT_PAGES[slug];

  if (!content) return null;

  const patch = (key: string, val: unknown) =>
    updatePage(slug, { [key]: val } as Partial<PageContent>);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <Select value={slug} onValueChange={(v) => setSlug(v)}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select page" />
          </SelectTrigger>
          <SelectContent>
            {PAGE_SLUGS.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button asChild size="sm" variant="outline">
          <Link href={`/${slug === "home" ? "" : slug}`} target="_blank">
            <Eye className="size-3.5" /> Preview
          </Link>
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            resetPage(slug);
            toast.success(`Reset "${slug}" to defaults.`);
          }}
        >
          <RotateCcw className="size-3.5" /> Reset
        </Button>
      </div>

      <Card className="gap-4 py-5">
        <CardHeader className="px-5 py-0">
          <CardTitle className="flex items-center gap-2 text-sm">
            <LayoutGrid className="size-4" /> Page Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 px-5 py-0">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <Label className="text-xs">Page title</Label>
              <Input
                value={content.title}
                onChange={(e) => patch("title", e.target.value)}
                className="h-8 text-sm"
              />
            </div>
            <div>
              <Label className="text-xs">Page subtitle</Label>
              <textarea
                value={content.subtitle}
                onChange={(e) => patch("subtitle", e.target.value)}
                className="border-input bg-background w-full rounded border px-2 py-1.5 text-sm"
                rows={3}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-wrap items-end gap-2">
        <div className="flex-1">
          <Label className="text-xs">Add section type</Label>
          <Select
            value={newSectionType}
            onValueChange={(v) => setNewSectionType(v as SectionType)}
          >
            <SelectTrigger className="h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SECTION_TYPES.map((st) => (
                <SelectItem key={st.value} value={st.value}>
                  {st.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button
          size="sm"
          onClick={() => addSection(slug, newSectionType)}
        >
          <Plus className="size-3.5" /> Add section
        </Button>
      </div>

      <div className="space-y-3">
        {content.sections.map((section) => (
          <SectionEditor key={section.id} section={section} slug={slug} />
        ))}
      </div>
    </div>
  );
}
