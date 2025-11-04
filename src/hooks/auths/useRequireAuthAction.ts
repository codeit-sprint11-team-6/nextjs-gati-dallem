// src/hooks/auths/useRequireAuthAction.ts
"use client";
import { useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useIsAuthenticated } from "./useIsAuthenticated";

type RequireAuthOptions = {
  onBlocked?: () => void; // 스낵바/모달
  redirectOnBlocked?: boolean; // 기본 true
  redirectTo?: string; // 기본 /signin?redirect=현재경로
};

export function useRequireAuthAction(opts?: RequireAuthOptions) {
  const isAuthed = useIsAuthenticated();
  const router = useRouter();
  const pathname = usePathname();
  const search = useSearchParams();

  const requireAuthAction = useCallback(
    <T extends any[]>(action: (...args: T) => Promise<void> | void) =>
      async (...args: T) => {
        if (isAuthed) {
          return await action(...args);
        }
        opts?.onBlocked?.();
        const shouldRedirect = opts?.redirectOnBlocked ?? true;
        if (shouldRedirect) {
          const current = `${pathname}${search?.toString() ? `?${search}` : ""}`;
          const redirectUrl = opts?.redirectTo ?? `/signin?redirect=${encodeURIComponent(current)}`;
          queueMicrotask(() => {
            router.push(redirectUrl);
          });
        }
      },
    [isAuthed, pathname, router, search],
  );

  return { isAuthed, requireAuthAction };
}
