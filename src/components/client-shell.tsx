"use client";

import { RouteProgress } from "@/components/route-progress";
import { ChatWidget } from "@/components/support/chat-widget";
import { PageLoader } from "@/components/page-loader";

export function ClientShell() {
  return (
    <>
      <PageLoader />
      <RouteProgress />
      <ChatWidget />
    </>
  );
}
