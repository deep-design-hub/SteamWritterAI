import type { Metadata } from "next";

import { ProjectWorkspace } from "@/components/agent/project-workspace";

export const metadata: Metadata = {
  title: "Project Workspace",
};

export default function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return <ProjectWorkspacePage params={params} />;
}

async function ProjectWorkspacePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ProjectWorkspace projectId={id} />;
}
