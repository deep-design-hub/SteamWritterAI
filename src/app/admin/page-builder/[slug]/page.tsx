"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { PageBuilder } from "@/components/admin/page-builder";
import { useBuilderStore } from "@/components/admin/page-builder/store";

export default function PageBuilderEditPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const pages = useBuilderStore((s) => s.pages);
  const setCurrentPage = useBuilderStore((s) => s.setCurrentPage);

  useEffect(() => {
    if (!pages[slug]) {
      router.replace("/admin/page-builder");
      return;
    }
    setCurrentPage(slug);
  }, [slug, pages, setCurrentPage, router]);

  if (!pages[slug]) return null;

  return <PageBuilder />;
}
