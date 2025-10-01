// src/hooks/auths/useSignin.ts
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signin } from "@/apis/auths/auths.service";
import { authKeys } from "@/utils/auth/auth.keys";
import { invalidateAuth } from "@/apis/_react_query/utils";
import type { SigninBody, SigninResponse } from "@/apis/auths/auths.schema";

export const useSignin = () => {
  const queryClient = useQueryClient();

  return useMutation<SigninResponse, Error, SigninBody>({
    mutationKey: authKeys.mutation.signin(),
    mutationFn: signin, // 가능한 한 함수 참조를 직접 전달
    onSuccess: async () => {
      // auth 관련 캐시 전체 무효화 (user=me, roles, sessions 등 확장 대비
      await invalidateAuth(queryClient);
      // 로그인 성공 시 내 정보 재조회 (특정 키만 무효화 시 아래 코드 사용)
      // await queryClient.invalidateQueries({ queryKey: authKeys.user() });
    },
  });
};
