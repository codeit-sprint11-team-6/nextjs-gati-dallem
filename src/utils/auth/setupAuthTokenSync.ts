// src/utils/auth/setupAuthTokenSync.ts
"use client";
import { tokenStore } from "@/utils/auth/token.store";
import { apiClient } from "@/apis/_client";
import { onTokenChange } from "./onTokenChange";

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
  return onTokenChange(sync); // 토큰 변할 때마다 헤더 갱신
}
