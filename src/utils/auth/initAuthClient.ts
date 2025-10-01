// src/utils/auth/initAuthClient.ts
import { apiClient } from "@/apis/_client";
import { tokenStore } from "@/utils/auth/token.store";

export function initAuthClient() {
  const token = tokenStore.get();
  if (token) apiClient.setAuthToken(token);
}
