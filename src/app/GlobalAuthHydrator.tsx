// src/app/GlobalAuthHydrator.tsx
"use client";

import { useEffect } from "react";
import { authActions } from "@/store/authStore";
import { getAuthUser } from "@/apis/auths/auths.service";
import { tokenStore } from "@/utils/auth/token.store";
import { onTokenChange } from "@/utils/auth/onTokenChange";

/**
 * GlobalAuthHydrator
 * - 앱 전역에서 로그인 토큰을 감지하고 사용자 정보를 동기화합니다.
 * - 첫 렌더링 시 1회 hydrateUser(getAuthUser) 실행
 * - 이후 토큰 변경(AUTH_TOKEN_CHANGED / storage 이벤트) 시 자동 동기화
 */

export default function GlobalAuthHydrator() {
  useEffect(() => {
    const hydrate = async () => {
      const token = tokenStore.get();
      if (token) {
        await authActions.hydrateUser(getAuthUser); // user 상태 채우기
      } else {
        await authActions.clear(); // 로그아웃 or 토큰 없음 → 스토어 비움
      }
    };

    // 앱 최초 렌더링 시 1회 실행
    hydrate();
    // 토큰 변경(동일 탭 or 다른 탭) 감지
    const dispose = onTokenChange(hydrate);
    // StrictMode 환경 중복 마운트 대비: 리스너 정리
    return dispose;
  }, []);

  return null;
}
