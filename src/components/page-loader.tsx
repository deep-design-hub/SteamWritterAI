"use client";

import { usePathname } from "next/navigation";
import * as React from "react";

export function PageLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = React.useState(true);
  const prev = React.useRef(pathname);

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    if (prev.current !== pathname) {
      prev.current = pathname;
      setLoading(true);
      const timer = setTimeout(() => setLoading(false), 400);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center bg-background transition-opacity duration-300">
      <div className="flex flex-col items-center gap-4">
        <div className="relative size-12">
          <div className="absolute inset-0 rounded-full border-2 border-muted" />
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-primary" />
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-primary size-2 animate-pulse rounded-full" />
          <span className="text-sm font-semibold tracking-tight">SteamWriterAi</span>
        </div>
      </div>
    </div>
  );
}
