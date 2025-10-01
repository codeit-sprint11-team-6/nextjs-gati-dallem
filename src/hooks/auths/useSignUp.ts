// src/hooks/auths/useSignup.ts
/** POST /auths/signup */
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup } from "@/apis/auths/auths.service";
import { authKeys } from "@/utils/auth/auth.keys";
import { invalidateAuth } from "@/apis/_react_query/utils";
import type { SignupBody, SignupResponse } from "@/apis/auths/auths.schema";
import { apiClient } from "@/apis/_client";

/**
 * useSignup
 * - 기본: 가입만 (invalidate 없음)
 * - 옵션: autoLogin=true 이고 서버가 token 주면 → 토큰 저장 + auth 전체 invalidate
 */

export const useSignup = (options?: { autoLogin?: boolean }) => {
  const queryClient = useQueryClient();

  return useMutation<SignupResponse, Error, SignupBody>({
    mutationKey: authKeys.mutation.signup(),
    mutationFn: signup,
    onSuccess: async (res) => {
      // 서버가 토큰을 줄 수도/안 줄 수도 있는 계약을 가정
      if (options?.autoLogin && typeof res === "object" && res && "token" in res) {
        // 1) 토큰 저장
        apiClient.setAuthToken(res.token as string);
        // 2) 인증 도메인 전체 캐시 무효화(확장 대비: me, roles, sessions 등)
        await invalidateAuth(queryClient);
      }
      // autoLogin이 false면 아무것도 안 함(가입만 완료)
      // 필요하면 여기서 토스트/리다이렉트 추가 가능
      // toast.success("회원가입 성공"); router.push("/signin");
    },
  });
};

// // 1) 일반 가입(로그인 별도)
// const { mutate: signup } = useSignup();
// // signup({ email, password, name })

// // 2) 가입과 동시에 로그인 시도 (서버가 token을 주면 자동 로그인)
// const { mutate: signupAndLogin } = useSignup({ autoLogin: true });
