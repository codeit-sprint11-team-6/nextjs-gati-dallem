// src/hooks/auths/useAuthToken.ts
"use client";

import { useEffect, useState } from "react";
import { ACCESS_TOKEN_KEY, AUTH_TOKEN_CHANGED } from "@/utils/auth/token.store";

/**
 * useAuthToken
 * - 로컬스토리지의 액세스 토큰을 읽고, 변화에 따라 상태를 동기화합니다.
 * - 동일 탭: AUTH_TOKEN_CHANGED 커스텀 이벤트로 감지
 * - 다른 탭: storage 이벤트로 감지
 */

export function useAuthToken() {
  // 첫 렌더에서 즉시 현재 토큰을 읽음
  const [token, setToken] = useState<string | null>(
    typeof window !== "undefined" ? localStorage.getItem(ACCESS_TOKEN_KEY) : null,
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const read = () => {
      const next = localStorage.getItem(ACCESS_TOKEN_KEY);
      setToken((prev) => (prev === next ? prev : next));
    };

    const onChanged = () => read(); // 동일 탭 변경 감지
    const onStorage = (e: StorageEvent) => {
      if (e.key === ACCESS_TOKEN_KEY) read(); // 다른 탭 변경 감지
    };

    window.addEventListener(AUTH_TOKEN_CHANGED, onChanged as EventListener);
    window.addEventListener("storage", onStorage);

    // 마운트 직후 한 번 보정
    read();

    return () => {
      window.removeEventListener(AUTH_TOKEN_CHANGED, onChanged as EventListener);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  return token;
}
