// src/hooks/auths/useAuthUser.ts
/** GET /auths/user */
"use client";

import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { getAuthUser } from "@/apis/auths/auths.service";
import { authQueryKeys } from "@/utils/auth/authQueryKeys";
import type { AuthUser } from "@/types/auth";
import { tokenStore } from "@/utils/auth/token.store";

type GetTokenFn = () => string | undefined | null;

type AuthUserQueryOptions<T = AuthUser> = Omit<
  UseQueryOptions<AuthUser | null, Error, T | null>,
  "queryKey" | "queryFn"
> & {
  enabled?: boolean;
  retry?: number;
  select?: (u: AuthUser | null) => T | null;
  refetchOnWindowFocus?: boolean | "always";
  refetchOnReconnect?: boolean;
  initialData?: AuthUser | null | (() => AuthUser | null);
  getToken?: GetTokenFn;
  queryKey?: any[];
};

export const useAuthUser = <T = AuthUser>(opts?: AuthUserQueryOptions<T>) => {
  // 토큰 감지(기본: tokenStore.get)
  const rawToken = (opts?.getToken ?? tokenStore.get)?.();
  const authed = !!rawToken;

  return useQuery<AuthUser | null, Error, T | null>({
    // 토큰 유무를 키에 포함해 상태 전환 시 캐시를 재초기화
    queryKey: [...authQueryKeys.me(), authed ? "authed" : "guest"], // 상태 전환 시 캐시 초기화

    // 서버 요청: 401 응답 시 null 반환
    queryFn: async () => {
      try {
        return await getAuthUser(); // 서버가 401이면 서비스에서 null 반환
      } catch (e: any) {
        if (e?.response?.status === 401) return null;
        throw e;
      }
    },

    // 토큰 없을 경우 쿼리 비활성화(토큰 없을 땐 호출 X)
    enabled: opts?.enabled ?? authed,
    // 인증 쿼리는 재시도 비권장
    retry: opts?.retry ?? 0,
    // 초기 데이터 / select 매핑
    initialData: opts?.initialData ?? null,
    select: opts?.select,

    // 포커스 / 재연결 시 재검증(인증은 최신성이 중요)
    refetchOnWindowFocus: opts?.refetchOnWindowFocus ?? true,
    refetchOnReconnect: opts?.refetchOnReconnect ?? true,
    // 캐시 전략: 인증 정보는 자주 참조되므로 신선도 유지
    staleTime: opts?.staleTime ?? 30_000, // 30초
    gcTime: opts?.gcTime ?? 5 * 60_000, // 5분
    structuralSharing: true,
    meta: { scope: "auth" },
  });
};
