// src/hooks/auths/useAuthUser.ts
/** GET /auths/user */
"use client";

import { useQuery } from "@tanstack/react-query";
import { getAuthUser } from "@/apis/auths/auths.service";
import { authKeys } from "@/utils/auth/auth.keys";
import type { AuthUser } from "@/types/auth";

type AuthUserQueryOptions<T = AuthUser> = {
  enabled?: boolean; // 기본 true
  retry?: number; // 기본 0 (인증 쿼리는 재시도 비권장)
  select?: (u: AuthUser) => T; //  원본 AuthUser → 원하는 형태 T로 매핑
};

/**
 * useAuthUser
 * - queryFn 반환(AuthUser)을 T로 가공할 수 있게 select 지원
 * - useQuery 제네릭 순서: <TQueryFnData, TError, TData>
 *   → <AuthUser, Error, T>
 */

export const useAuthUser = <T = AuthUser>(options?: AuthUserQueryOptions<T>) =>
  useQuery<AuthUser, Error, T>({
    queryKey: authKeys.user(), // 내부적으로 ["auth","me"]
    queryFn: getAuthUser, // () => Promise<AuthUser>
    enabled: options?.enabled ?? true,
    retry: options?.retry ?? 0,
    select: options?.select, // (u: AuthUser) => T
  });
