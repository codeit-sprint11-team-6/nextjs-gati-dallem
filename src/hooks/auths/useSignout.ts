// src/hooks/auths/useSignout.ts
// /** POST /auths/signout */
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signout } from "@/apis/auths/auths.service";
import { authQueryKeys } from "@/utils/auth/authQueryKeys";
import type { SignoutResponse } from "@/apis/auths/auths.schema";
import { invalidateAuth } from "@/apis/_react_query/utils";
import { tokenStore } from "@/utils/auth/token.store";

/**
 * useSignout
 * - 로그아웃 시 토큰 제거 및 인증 캐시 무효화
 * - 클릭 즉시 UI에서 로그인 상태 해제 (업데이트)
 */

export const useSignout = () => {
  const queryClient = useQueryClient();

  return useMutation<SignoutResponse, Error, void>({
    mutationKey: authQueryKeys.mutation.signout(),
    mutationFn: signout,

    // 요청 직전: 즉시 로그아웃 UI 반영 (업데이트)
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: authQueryKeys.all() });

      tokenStore.clear?.(); // 로컬스토리지 토큰 제거

      const prevMe = queryClient.getQueryData(authQueryKeys.me());
      queryClient.setQueryData(authQueryKeys.me(), null); // me 캐시 → null (UI 즉시 반영)

      return { prevMe };
    },

    // 요청 완료 후: me/roles 등 인증 캐시 전체 무효화
    onSettled: async () => {
      await invalidateAuth(queryClient);
    },
  });
};
