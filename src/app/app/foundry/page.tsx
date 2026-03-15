"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function FoundryRedirect() {
  const router = useRouter();
  useEffect(() => { router.replace("/app/sources"); }, [router]);
  return null;
}
