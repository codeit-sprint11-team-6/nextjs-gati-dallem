// src/app/AppInitializer.tsx
"use client";
import { useEffect } from "react";
import { setupAuthTokenSync } from "@/utils/auth/setupAuthTokenSync";

/**
 * AppInitializer
 * - apiClient Authorization 헤더를 tokenStore와 동기화합니다.
 * - 토큰 변경(AUTH_TOKEN_CHANGED / storage 이벤트) 시 즉시 반영됩니다.
 */

export default function AppInitializer() {
  useEffect(() => {
    const dispose = setupAuthTokenSync();

    // StrictMode 중복 마운트 대비: 리스너 정리
    return dispose;
  }, []);

  return null;
}
