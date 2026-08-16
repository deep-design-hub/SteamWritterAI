"use client";

import { RouteProgress } from "@/components/route-progress";
import { ChatWidget } from "@/components/support/chat-widget";

export function ClientShell() {
  return (
    <>
      <RouteProgress />
      <ChatWidget />
    </>
  );
}
