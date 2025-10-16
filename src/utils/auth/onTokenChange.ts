// src/utils/auth/onTokenChange.ts
"use client";
import { AUTH_TOKEN_CHANGED, ACCESS_TOKEN_KEY } from "@/utils/auth/token.store";

/**
 * onTokenChange
 * - 토큰 변경(AUTH_TOKEN_CHANGED, storage 이벤트)을 감지하여 handler 실행
 * - setupAuthTokenSync, GlobalAuthHydrator 등에서 공통적으로 사용
 * - 정리 함수를 반환하여 StrictMode 중복 마운트 시 리스너 누수 방지
 */

export function onTokenChange(handler: () => void) {
  if (typeof window === "undefined") return () => {};

  // 이벤트 리스너 등록
  const onChanged = handler as EventListener;
  const onStorage = (e: StorageEvent) => {
    if (e.key === ACCESS_TOKEN_KEY) handler();
  };
  window.addEventListener(AUTH_TOKEN_CHANGED, onChanged);
  window.addEventListener("storage", onStorage);
  // 정리 함수 반환 (StrictMode 중복 마운트/언마운트 대비)
  return () => {
    window.removeEventListener(AUTH_TOKEN_CHANGED, onChanged);
    window.removeEventListener("storage", onStorage);
  };
}
