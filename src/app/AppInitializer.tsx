// src/app/AppInitializer.tsx
"use client";
import { useEffect } from "react";
import { setupAuthTokenSync } from "@/utils/auth/setupAuthTokenSync";
// import { tokenStore } from "@/utils/auth/token.store";
// import { getAuthUser } from "@/apis/auths/auths.service";

/**
 * AppInitializer
 * - apiClient Authorization 헤더를 tokenStore와 동기화합니다.
 * - 토큰 변경(AUTH_TOKEN_CHANGED / storage 이벤트) 시 즉시 반영됩니다.
 */

export default function AppInitializer() {
  useEffect(() => {
    const dispose = setupAuthTokenSync();

    // 개발 중 토큰 동기화 테스트용 (console에서 실행 가능)
    // 예시:
    //   __authTest.bad()   → 잘못된 토큰 테스트 (로그인 페이지로 이동해야 정상)
    //   __authTest.clear() → 토큰 제거 테스트 (로그인 페이지로 이동해야 정상)
    //   __authTest.ok("정상_토큰값") → 정상 토큰 유지 테스트

    // 개발 중 테스트용 코드 (현재는 주석 처리) - 필요 시 해제
    // if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
    //   (window as any).__authTest = {
    //     bad: async () => {
    //       tokenStore.set("bad.token.value");
    //       console.log("[authTest] bad token set → getAuthUser() 실행");
    //       return await getAuthUser(); // ApiClient 통해 호출 → 401이면 리다이렉트
    //     },
    //     clear: async () => {
    //       tokenStore.clear();
    //       console.log("[authTest] token cleared → getAuthUser() 실행");
    //       return await getAuthUser();
    //     },
    //     ok: async (token: string) => {
    //       tokenStore.set(token);
    //       console.log("[authTest] 정상 토큰 적용 → getAuthUser() 실행");
    //       return await getAuthUser();
    //     },
    //   };
    // }

    // StrictMode 중복 마운트 대비: 리스너 정리
    return dispose;
  }, []);

  return null;
}
