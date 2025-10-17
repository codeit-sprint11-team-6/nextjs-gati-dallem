// src/hooks/auths/useSignup.ts
/** POST /auths/signup */
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup } from "@/apis/auths/auths.service";
import { authQueryKeys } from "@/utils/auth/authQueryKeys";
import { invalidateAuth } from "@/apis/_react_query/utils";
import type { SignupBody, SignupResponse } from "@/apis/auths/auths.schema";
import { tokenStore } from "@/utils/auth/token.store";

/**
 * useSignup
 * - 기본: 가입만 (invalidate 없음)
 * - 옵션: autoLogin=true 이고 서버가 토큰을 주면 → 토큰 저장 후 인증 캐시 무효화(invalidate)
 */

export const useSignup = (options?: { autoLogin?: boolean }) => {
  const { autoLogin = false } = options ?? {};
  const queryClient = useQueryClient();

  return useMutation<SignupResponse, Error, SignupBody>({
    mutationKey: authQueryKeys.mutation.signup(),
    mutationFn: signup,
    onSuccess: async (res) => {
      //  if (!options?.autoLogin) return;
      if (!autoLogin) return;

      // 서버 응답 내 토큰 키 대응 (token | accessToken | access_token)
      const r = res as any;
      const maybeToken = r?.token ?? r?.accessToken ?? r?.access_token;

      if (typeof maybeToken === "string" && maybeToken) {
        tokenStore.set(maybeToken);
        await invalidateAuth(queryClient); // me/roles 등 인증 캐시 무효화
      }
    },
  });
};

// 사용 예시:
// 1) 일반 가입
// const { mutate: signupOnly } = useSignup();
// 2) 가입 직후 자동 로그인
// const { mutate: signupAndLogin } = useSignup({ autoLogin: true });
