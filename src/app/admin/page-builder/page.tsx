"use client";

export default function AdminPageBuilderPage() {
  return (
    <div className="h-full w-full">
      <iframe
        src="/builder.html"
        className="h-full w-full border-0"
        title="Page Builder"
        style={{ height: "100%", width: "100%" }}
      />
    </div>
  );
}
