// src/utils/auth/authQueryKeys.ts
import { queryKeys } from "@/apis/_react_query/keys";

/**
 * authQueryKeys
 * - 인증 도메인 전용 React Query 키 유틸
 * - Query / Mutation 키 관리
 */

export const authQueryKeys = {
  // Query
  all: () => queryKeys.auth.all(),
  me: () => queryKeys.auth.me(),

  /** @deprecated use authQueryKeys.me() instead */
  /** @deprecated use "@/utils/auth/authQueryKeys" (authQueryKeys) */
  user: () => authQueryKeys.me(),

  // user: () => queryKeys.auth.me(),

  // Mutation
  mutation: {
    signin: () => [...authQueryKeys.all(), "mutation", "signin"] as const,
    signout: () => [...authQueryKeys.all(), "mutation", "signout"] as const,
    signup: () => [...authQueryKeys.all(), "mutation", "signup"] as const,
  },
} as const;
