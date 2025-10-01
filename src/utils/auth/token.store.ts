// src/utils/auth/token.store.ts
const AUTH_TOKEN_KEY = "auth_token";

export const tokenStore = {
  get() {
    if (typeof window === "undefined") return undefined;
    return localStorage.getItem(AUTH_TOKEN_KEY) ?? undefined;
  },
  set(token?: string) {
    if (typeof window === "undefined") return;
    if (!token) localStorage.removeItem(AUTH_TOKEN_KEY);
    else localStorage.setItem(AUTH_TOKEN_KEY, token);
  },
};
