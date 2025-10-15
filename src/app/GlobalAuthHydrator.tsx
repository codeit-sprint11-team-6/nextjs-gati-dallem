// src/app/GlobalAuthHydrator.tsx
"use client";

import { useEffect } from "react";
import { authActions } from "@/store/authStore";
import { getAuthUser } from "@/apis/auths/auths.service";
import { tokenStore, AUTH_TOKEN_CHANGED, ACCESS_TOKEN_KEY } from "@/utils/auth/token.store";

export default function GlobalAuthHydrator() {
  useEffect(() => {
    const hydrate = async () => {
      const token = tokenStore.get();
      if (token) {
        await authActions.hydrateUser(getAuthUser); // user 채우기
      } else {
        await authActions.clear(); // 로그아웃/토큰없음 → 비움
      }
    };

    // ① 앱 최초 로드 시 1회
    hydrate();

    // ② 토큰 변경(동일 탭)
    const onChanged = hydrate as EventListener;
    // ③ 다른 탭에서 토큰 변경
    const onStorage = (e: StorageEvent) => {
      if (e.key === ACCESS_TOKEN_KEY) hydrate();
    };

    window.addEventListener(AUTH_TOKEN_CHANGED, onChanged);
    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener(AUTH_TOKEN_CHANGED, onChanged);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  return null;
}
