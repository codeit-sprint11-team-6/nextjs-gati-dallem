// src/utils/auth/auth.keys.ts
import { queryKeys } from "@/apis/_react_query/keys";

export const authKeys = {
  // Query
  all: () => queryKeys.auth.all(),
  user: () => queryKeys.auth.me(),

  // Mutation
  mutation: {
    signin: () => [...authKeys.all(), "signin"] as const,
    signout: () => [...authKeys.all(), "signout"] as const,
    signup: () => [...authKeys.all(), "signup"] as const,
  },
} as const;
