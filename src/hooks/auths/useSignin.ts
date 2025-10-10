// src/hooks/auths/useSignin.ts
/** POST /auths/signin */
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signin, getAuthUser } from "@/apis/auths/auths.service";
import { authQueryKeys } from "@/utils/auth/authQueryKeys";
import type { SigninBody, SigninResponse } from "@/apis/auths/auths.schema";
import { tokenStore } from "@/utils/auth/token.store";

/**
 * useSignin
 * - 로그인 성공 시 토큰 저장 및 /me 정보 즉시 갱신
 */

export const useSignin = () => {
  const queryClient = useQueryClient();

  return useMutation<SigninResponse, Error, SigninBody>({
    mutationKey: authQueryKeys.mutation.signin(),
    mutationFn: signin,

    /** 로그인 성공 시: 토큰 저장 + 인증 캐시 갱신 */
    onSuccess: async (res) => {
      // 서버 응답 토큰 (token | accessToken 모두 대응)
      const t = (res as any)?.token ?? (res as any)?.accessToken;
      if (typeof t === "string" && t) {
        tokenStore.set(t); // // 로컬 스토리지에 토큰 저장
      }

      // 진행 중인 /me 요청 취소 + 캐시 무효화
      await queryClient.cancelQueries({ queryKey: authQueryKeys.me() });
      await queryClient.invalidateQueries({ queryKey: authQueryKeys.me() });

      //  새 토큰으로 /me 강제 조회 → 헤더 즉시 갱신
      const me = await queryClient.fetchQuery({
        queryKey: authQueryKeys.me(),
        queryFn: getAuthUser,
      });

      // 캐시에 최신 사용자 정보 저장
      queryClient.setQueryData(authQueryKeys.me(), me);
    },
  });
};
