// src/utils/auth/setupAuthTokenSync.ts
"use client";
import { tokenStore, AUTH_TOKEN_CHANGED, ACCESS_TOKEN_KEY } from "@/utils/auth/token.store";
import { apiClient } from "@/apis/_client";

/**
 * setupAuthTokenSync
 * - apiClient와 tokenStore를 동기화합니다.
 * - 토큰 변경이나 storage 이벤트 발생 시 Authorization 헤더를 즉시 반영합니다.
 * - 한 번만 호출하면 앱 전역에 적용됩니다.
 */

export function setupAuthTokenSync() {
  if (typeof window === "undefined") return () => {};

  // 토큰 동기화 함수
  const sync = () => apiClient.setAuthToken(tokenStore.get() ?? undefined);

  // 초기 1회 동기화
  sync();

  // 이벤트 리스너 등록
  const onChanged = sync as EventListener;
  const onStorage = (e: StorageEvent) => {
    if (e.key === ACCESS_TOKEN_KEY) sync();
  };
  window.addEventListener(AUTH_TOKEN_CHANGED, onChanged);
  window.addEventListener("storage", onStorage);

  // 정리 함수 반환 (StrictMode 중복 마운트/언마운트 대비)
  return () => {
    window.removeEventListener(AUTH_TOKEN_CHANGED, onChanged);
    window.removeEventListener("storage", onStorage);
  };
}
