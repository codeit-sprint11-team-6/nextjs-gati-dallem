// src/guards/AuthGuard.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { tokenStore, AUTH_TOKEN_CHANGED, ACCESS_TOKEN_KEY } from "@/utils/auth/token.store";
import { authActions } from "@/store/authStore";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const qs = useSearchParams();
  const search = qs?.toString() ?? "";
  const [ready, setReady] = useState(false);
  const redirecting = useRef(false);

  const goSignin = () => {
    if (redirecting.current) return;
    redirecting.current = true;

    try {
      authActions.clear?.();
    } catch {}

    const hash = typeof window !== "undefined" ? window.location.hash : "";
    const redirect = encodeURIComponent(pathname + (search ? `?${search}` : "") + hash);
    router.replace(`/signin?redirect=${redirect}`);
  };

  useEffect(() => {
    // 1) 최초 진입 토큰 체크
    if (!tokenStore.get()) {
      goSignin();
      return;
    }
    setReady(true);

    // 2) 같은 탭에서 토큰 변경(삭제 포함) 감지
    const onTokenChanged = () => {
      if (!tokenStore.get()) goSignin();
    };
    window.addEventListener(AUTH_TOKEN_CHANGED, onTokenChanged);

    // 3) 다른 탭에서 변경 감지
    const onStorage = (e: StorageEvent) => {
      if (e.key === ACCESS_TOKEN_KEY && !e.newValue) {
        goSignin();
      }
    };
    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener(AUTH_TOKEN_CHANGED, onTokenChanged);
      window.removeEventListener("storage", onStorage);
    };
  }, []); // ← 한 번만 등록

  if (!ready) return null; // 깜빡임 방지
  return <>{children}</>;
}
