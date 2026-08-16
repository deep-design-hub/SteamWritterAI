"use client";

import { useRouter } from "next/navigation";
import * as React from "react";

export default function UserIndexPage() {
  const router = useRouter();
  React.useEffect(() => {
    router.replace("/user/dashboard");
  }, [router]);
  return null;
}
