// src/hooks/auths/useSignup.ts
/** POST /auths/signup */
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup } from "@/apis/auths/auths.service";
import { authQueryKeys } from "@/utils/auth/authQueryKeys";
import { invalidateAuth } from "@/apis/_react_query/utils";
import type { SignupBody, SignupResponse } from "@/apis/auths/auths.schema";
import { tokenStore } from "@/utils/auth/token.store";
import { useOverlay } from "../useOverlay";
import { useRouter } from "next/navigation";
import SignupModal from "@/components/common/SignupModal";

/**
 * useSignup
 * - 기본: 가입 완료 시 모달 표시 후 로그인 페이지로 이동
 * - (옵션): 추후 autoLogin=true 설정 시 → 서버가 토큰을 주면 → 토큰 저장 후 인증 캐시 무효화(invalidate)
 */

export const useSignup = (options?: { autoLogin?: boolean }) => {
  const { autoLogin = false } = options ?? {};
  const queryClient = useQueryClient();
  const { overlay } = useOverlay();
  const router = useRouter();

  return useMutation<SignupResponse, Error, SignupBody>({
    mutationKey: authQueryKeys.mutation.signup(),
    mutationFn: signup,
    onSuccess: async (res) => {
      overlay(
        <SignupModal
          message={"가입이 완료되었습니다!\n로그인 페이지로 이동합니다."}
          onConfirm={() => router.push("/signin")}
        />,
      );

      if (!autoLogin) return;

      // 자동 로그인 로직 (현재 미사용 — 추후 필요 시 활성화)
      // const r = res as any;
      // const maybeToken = r?.token ?? r?.accessToken ?? r?.access_token;

      // if (typeof maybeToken === "string" && maybeToken) {
      //   tokenStore.set(maybeToken);
      //   await invalidateAuth(queryClient); // me/roles 등 인증 캐시 무효화
      // }
    },
  });
};

// 사용 예시:
// 1) 일반 가입
// const { mutate: signupOnly } = useSignup();
// 2) 가입 직후 자동 로그인
// const { mutate: signupAndLogin } = useSignup({ autoLogin: true });
