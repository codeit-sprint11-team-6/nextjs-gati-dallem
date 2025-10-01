"use client";
// /src/app/(auth)/signin/DebugOnce.tsx
// 임시: 아무 클라이언트 컴포넌트(use client)에서 한 번만 호출해 보기
import { useEffect } from "react";
import { getAuthUser } from "@/apis/auths/auths.service";

export default function DebugOnce() {
  useEffect(() => {
    getAuthUser()
      .then((me) => console.log("[auth] me", me))
      .catch((e) => console.error("[auth] me", e));
  }, []);
  return null;
}
