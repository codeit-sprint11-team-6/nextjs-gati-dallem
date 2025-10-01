// src/hooks/auths/useSignout.ts
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signout } from "@/apis/auths/auths.service";
import { authKeys } from "@/utils/auth/auth.keys";
import type { SignoutResponse } from "@/apis/auths/auths.schema";
import { invalidateAuth } from "@/apis/_react_query/utils";

export const useSignout = () => {
  const queryClient = useQueryClient();

  return useMutation<SignoutResponse, Error, void>({
    mutationKey: authKeys.mutation.signout(),
    mutationFn: signout,
    onSuccess: async () => {
      // 확장성: auth 전체 캐시 무효화
      await invalidateAuth(queryClient);
      // 로그아웃 후 내 정보 캐시 비움
      // await queryClient.invalidateQueries({ queryKey: authKeys.user() });
    },
  });
};
