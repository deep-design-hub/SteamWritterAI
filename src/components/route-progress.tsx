"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

export function RouteProgress() {
  const pathname = usePathname();
  const [show, setShow] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const prev = React.useRef(pathname);

  React.useEffect(() => {
    if (prev.current !== pathname) {
      prev.current = pathname;
      setShow(true);
      setProgress(0);
      let p = 0;
      const id = setInterval(() => {
        p += Math.random() * 30 + 10;
        if (p >= 100) {
          p = 100;
          clearInterval(id);
          setTimeout(() => {
            setShow(false);
            setProgress(0);
          }, 200);
        }
        setProgress(p);
      }, 120);
      return () => clearInterval(id);
    }
  }, [pathname]);

  if (!show) return null;

  return (
    <div className="fixed inset-x-0 top-0 z-[200] h-0.5">
      <div
        className="bg-primary h-full transition-all duration-200 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
