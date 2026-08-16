"use client";

import React from "react";
import { useBuilderStore } from "./store";
import { BLOCK_FIELDS, BLOCK_LABELS } from "./defaults";

export function PropertiesPanel() {
  const { pages, current, selected, updateBlockProps, pushState, selectBlock } =
    useBuilderStore();

  const blocks = pages[current]?.blocks ?? [];
  const block = blocks.find((b) => b.id === selected);
  const fields = block ? BLOCK_FIELDS[block.type] : [];

  if (!block) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-center text-muted-foreground">
        <span className="mb-2 text-3xl">🎨</span>
        <p className="text-xs">Select a block to edit its properties</p>
      </div>
    );
  }

  const handleChange = (key: string, val: unknown) => {
    updateBlockProps(block.id, { [key]: val });
  };

  const handleBlur = () => {
    pushState();
  };

  return (
    <div className="p-3">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
          {BLOCK_LABELS[block.type]}
        </h3>
        <button
          onClick={() => selectBlock(null)}
          className="text-xs text-muted-foreground hover:text-foreground"
        >
          ✕
        </button>
      </div>

      <div className="space-y-3">
        {fields.map((f) => (
          <FieldControl
            key={f.key}
            field={f}
            value={block.props[f.key]}
            onChange={(val) => handleChange(f.key, val)}
            onBlur={handleBlur}
            blockId={block.id}
          />
        ))}
      </div>
    </div>
  );
}

function FieldControl({
  field,
  value,
  onChange,
  onBlur,
  blockId,
}: {
  field: { key: string; label: string; type: string; min?: number; max?: number; unit?: string; opts?: string[] };
  value: unknown;
  onChange: (val: unknown) => void;
  onBlur: () => void;
  blockId: string;
}) {
  switch (field.type) {
    case "text":
      return (
        <div>
          <label className="mb-1 block text-[10px] font-medium text-muted-foreground">
            {field.label}
          </label>
          <input
            type="text"
            value={String(value ?? "")}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
            className="w-full rounded border border-input bg-background px-2 py-1.5 text-xs"
          />
        </div>
      );

    case "textarea":
      return (
        <div>
          <label className="mb-1 block text-[10px] font-medium text-muted-foreground">
            {field.label}
          </label>
          <textarea
            value={String(value ?? "")}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
            rows={3}
            className="w-full rounded border border-input bg-background px-2 py-1.5 text-xs"
          />
        </div>
      );

    case "color":
      return (
        <div>
          <label className="mb-1 block text-[10px] font-medium text-muted-foreground">
            {field.label}
          </label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={String(value ?? "#000000")}
              onChange={(e) => onChange(e.target.value)}
              onBlur={onBlur}
              className="h-7 w-7 cursor-pointer rounded border-0 p-0"
            />
            <input
              type="text"
              value={String(value ?? "")}
              onChange={(e) => onChange(e.target.value)}
              onBlur={onBlur}
              className="flex-1 rounded border border-input bg-background px-2 py-1.5 text-xs"
            />
          </div>
        </div>
      );

    case "range":
      return (
        <div>
          <label className="mb-1 flex items-center justify-between text-[10px] font-medium text-muted-foreground">
            <span>{field.label}</span>
            <span className="text-foreground">
              {String(value ?? field.min ?? 0)}
              {field.unit}
            </span>
          </label>
          <input
            type="range"
            min={field.min ?? 0}
            max={field.max ?? 100}
            value={Number(value ?? field.min ?? 0)}
            onChange={(e) => onChange(Number(e.target.value))}
            onMouseUp={onBlur}
            onTouchEnd={onBlur}
            className="w-full accent-primary"
          />
        </div>
      );

    case "align":
      return (
        <div>
          <label className="mb-1 block text-[10px] font-medium text-muted-foreground">
            {field.label}
          </label>
          <div className="flex gap-1">
            {(["left", "center", "right"] as const).map((a) => (
              <button
                key={a}
                onClick={() => {
                  onChange(a);
                  onBlur();
                }}
                className={`flex-1 rounded px-2 py-1 text-[10px] font-medium transition-colors ${
                  value === a
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {a === "left" ? "⫷" : a === "center" ? "☰" : "⫸"}
              </button>
            ))}
          </div>
        </div>
      );

    case "seg":
      return (
        <div>
          <label className="mb-1 block text-[10px] font-medium text-muted-foreground">
            {field.label}
          </label>
          <div className="flex gap-1">
            {(field.opts ?? []).map((opt) => (
              <button
                key={opt}
                onClick={() => {
                  onChange(opt);
                  onBlur();
                }}
                className={`flex-1 rounded px-2 py-1 text-[10px] font-medium capitalize transition-colors ${
                  String(value) === opt
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {opt || "Default"}
              </button>
            ))}
          </div>
        </div>
      );

    case "toggle":
      return (
        <div className="flex items-center justify-between">
          <label className="text-[10px] font-medium text-muted-foreground">
            {field.label}
          </label>
          <button
            onClick={() => {
              onChange(!value);
              onBlur();
            }}
            className={`relative h-5 w-9 rounded-full transition-colors ${
              value ? "bg-primary" : "bg-muted"
            }`}
          >
            <span
              className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${
                value ? "translate-x-4" : "translate-x-0.5"
              }`}
            />
          </button>
        </div>
      );

    case "image":
      return (
        <div>
          <label className="mb-1 block text-[10px] font-medium text-muted-foreground">
            {field.label}
          </label>
          {value ? (
            <div className="relative">
              <div
                className="h-20 w-full rounded border bg-cover bg-center"
                style={{ backgroundImage: `url(${value})` }}
              />
              <button
                onClick={() => {
                  onChange("");
                  onBlur();
                }}
                className="absolute right-1 top-1 rounded bg-black/50 px-1.5 py-0.5 text-[9px] text-white"
              >
                Remove
              </button>
            </div>
          ) : (
            <label className="flex h-20 cursor-pointer flex-col items-center justify-center rounded border border-dashed text-[10px] text-muted-foreground hover:bg-muted/50">
              📷 Choose image…
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const url = URL.createObjectURL(file);
                    onChange(url);
                    onBlur();
                  }
                }}
              />
            </label>
          )}
        </div>
      );

    case "list": {
      const arr = (value as string[]) ?? [];
      return (
        <div>
          <label className="mb-1 block text-[10px] font-medium text-muted-foreground">
            {field.label}
          </label>
          <div className="space-y-1">
            {arr.map((item, i) => (
              <div key={i} className="flex items-center gap-1">
                <input
                  value={item}
                  onChange={(e) => {
                    const next = [...arr];
                    next[i] = e.target.value;
                    onChange(next);
                  }}
                  onBlur={onBlur}
                  className="flex-1 rounded border border-input bg-background px-2 py-1 text-[10px]"
                />
                <button
                  onClick={() => {
                    const next = arr.filter((_, j) => j !== i);
                    onChange(next);
                    onBlur();
                  }}
                  className="text-[10px] text-destructive hover:text-destructive/80"
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              onClick={() => {
                onChange([...arr, "New item"]);
                onBlur();
              }}
              className="w-full rounded border border-dashed border-input py-1 text-[10px] text-muted-foreground hover:bg-muted/50"
            >
              ＋ Add
            </button>
          </div>
        </div>
      );
    }

    case "listq": {
      const arr = (value as Array<{ q: string; a: string }>) ?? [];
      return (
        <div>
          <label className="mb-1 block text-[10px] font-medium text-muted-foreground">
            {field.label}
          </label>
          <div className="space-y-2">
            {arr.map((item, i) => (
              <div key={i} className="rounded border p-2 space-y-1">
                <div className="flex items-center gap-1">
                  <input
                    value={item.q}
                    onChange={(e) => {
                      const next = [...arr];
                      next[i] = { ...next[i], q: e.target.value };
                      onChange(next);
                    }}
                    onBlur={onBlur}
                    placeholder="Question"
                    className="flex-1 rounded border border-input bg-background px-2 py-1 text-[10px]"
                  />
                  <button
                    onClick={() => {
                      onChange(arr.filter((_, j) => j !== i));
                      onBlur();
                    }}
                    className="text-[10px] text-destructive"
                  >
                    ✕
                  </button>
                </div>
                <input
                  value={item.a}
                  onChange={(e) => {
                    const next = [...arr];
                    next[i] = { ...next[i], a: e.target.value };
                    onChange(next);
                  }}
                  onBlur={onBlur}
                  placeholder="Answer"
                  className="w-full rounded border border-input bg-background px-2 py-1 text-[10px]"
                />
              </div>
            ))}
            <button
              onClick={() => {
                onChange([...arr, { q: "", a: "" }]);
                onBlur();
              }}
              className="w-full rounded border border-dashed border-input py-1 text-[10px] text-muted-foreground hover:bg-muted/50"
            >
              ＋ Add question
            </button>
          </div>
        </div>
      );
    }

    case "listt": {
      const arr = (value as Array<{ quote: string; name: string; role: string; initials: string; color: string }>) ?? [];
      return (
        <div>
          <label className="mb-1 block text-[10px] font-medium text-muted-foreground">
            {field.label}
          </label>
          <div className="space-y-2">
            {arr.map((item, i) => (
              <div key={i} className="rounded border p-2 space-y-1">
                <div className="flex items-center gap-1">
                  <textarea
                    value={item.quote}
                    onChange={(e) => {
                      const next = [...arr];
                      next[i] = { ...next[i], quote: e.target.value };
                      onChange(next);
                    }}
                    onBlur={onBlur}
                    placeholder="Quote"
                    rows={2}
                    className="flex-1 rounded border border-input bg-background px-2 py-1 text-[10px]"
                  />
                  <button
                    onClick={() => {
                      onChange(arr.filter((_, j) => j !== i));
                      onBlur();
                    }}
                    className="text-[10px] text-destructive"
                  >
                    ✕
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <input
                    value={item.name}
                    onChange={(e) => {
                      const next = [...arr];
                      next[i] = { ...next[i], name: e.target.value };
                      onChange(next);
                    }}
                    onBlur={onBlur}
                    placeholder="Name"
                    className="rounded border border-input bg-background px-2 py-1 text-[10px]"
                  />
                  <input
                    value={item.role}
                    onChange={(e) => {
                      const next = [...arr];
                      next[i] = { ...next[i], role: e.target.value };
                      onChange(next);
                    }}
                    onBlur={onBlur}
                    placeholder="Role"
                    className="rounded border border-input bg-background px-2 py-1 text-[10px]"
                  />
                </div>
              </div>
            ))}
            <button
              onClick={() => {
                onChange([
                  ...arr,
                  { quote: "", name: "", role: "", initials: "?", color: "#94a3b8" },
                ]);
                onBlur();
              }}
              className="w-full rounded border border-dashed border-input py-1 text-[10px] text-muted-foreground hover:bg-muted/50"
            >
              ＋ Add testimonial
            </button>
          </div>
        </div>
      );
    }

    case "listimg": {
      const arr = (value as string[]) ?? [];
      return (
        <div>
          <label className="mb-1 block text-[10px] font-medium text-muted-foreground">
            {field.label}
          </label>
          <div className="space-y-1">
            {arr.map((url, i) => (
              <div key={i} className="flex items-center gap-2">
                <div
                  className="h-10 w-10 flex-shrink-0 rounded border bg-cover bg-center"
                  style={{ backgroundImage: `url(${url})` }}
                />
                <input
                  value={url}
                  onChange={(e) => {
                    const next = [...arr];
                    next[i] = e.target.value;
                    onChange(next);
                  }}
                  onBlur={onBlur}
                  className="flex-1 rounded border border-input bg-background px-2 py-1 text-[10px]"
                />
                <button
                  onClick={() => {
                    onChange(arr.filter((_, j) => j !== i));
                    onBlur();
                  }}
                  className="text-[10px] text-destructive"
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              onClick={() => {
                onChange([...arr, ""]);
                onBlur();
              }}
              className="w-full rounded border border-dashed border-input py-1 text-[10px] text-muted-foreground hover:bg-muted/50"
            >
              ＋ Add image
            </button>
          </div>
        </div>
      );
    }

    default:
      return null;
  }
}
