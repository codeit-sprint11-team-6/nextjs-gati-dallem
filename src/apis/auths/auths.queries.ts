// /src/apis/auths/auths.queries.ts
import { authActions } from "@/store/authStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../_react_query/keys";
import { invalidateAuth } from "../_react_query/utils";
import { GetAuthUserResponse } from "./auths.schema";
import { getAuthUser, signin, signout, signup, updateAuthUser } from "./auths.service";

/** GET /auths/user */
export function useAuthUser(options?: {
  enabled?: boolean;
  select?: (d: GetAuthUserResponse) => unknown;
}) {
  return useQuery({
    queryKey: queryKeys.auth.me(),
    queryFn: getAuthUser,
    enabled: options?.enabled ?? true,
    select: options?.select as any,
  });
}

/** POST /auths/signup */
export function useSignup() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: signup,
    onSuccess: async () => {
      await invalidateAuth(queryClient);
    },
  });
}

/** POST /auths/signin */
export function useSignin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: signin,
    onSuccess: async (res) => {
      if ("token" in res && res.token) {
        authActions.setToken(res.token);
        await authActions.hydrateUser(getAuthUser);
        await invalidateAuth(queryClient);
      }
    },
  });
}

/** POST /auths/signout */
export function useSignout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: signout,
    onSuccess: async () => {
      await invalidateAuth(queryClient);
    },
  });
}

/** PUT /auths/user (multipart) */
export function useUpdateAuthUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateAuthUser,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.auth.me() });
    },
  });
}
