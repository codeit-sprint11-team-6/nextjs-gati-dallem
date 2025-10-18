// src/app/GlobalAuthHydrator.tsx
"use client";

import { useEffect } from "react";
import { authActions, selectUser, useAuthStore } from "@/store/authStore";
import { getAuthUser } from "@/apis/auths/auths.service";
import { tokenStore } from "@/utils/auth/token.store";
import { onTokenChange } from "@/utils/auth/onTokenChange";

/**
 * - 최초 진입: 토큰 있되 user 없으면 1회만 /auths/user 호출
 * - 토큰 제거/변경: 자동으로 clear 또는 재-hydrate
 * - 이미 user가 있으면 API 호출 생략 (persist 이점 살림)
 */

export default function GlobalAuthHydrator() {
  const user = useAuthStore(selectUser);

  useEffect(() => {
    const hydrateOnce = async () => {
      const token = tokenStore.get();

      // 토큰이 없으면 스토어 정리
      if (!token) {
        await authActions.clear();
        return;
      }

      // 토큰 O + user 이미 O → 불필요 호출 스킵
      if (user) return;

      // 토큰 O + user 없음 → 1회만 서버에서 적재
      await authActions.hydrateUser(getAuthUser);
    };

    // 앱 최초 렌더링 시 1회 실행
    hydrateOnce();
    // 토큰 변경(동일 탭 or 다른 탭) 감지
    const dispose = onTokenChange(hydrateOnce);
    // StrictMode 환경 중복 마운트 대비: 리스너 정리
    return dispose;
  }, [user]);

  return null;
}
