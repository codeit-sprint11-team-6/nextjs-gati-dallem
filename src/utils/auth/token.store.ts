// src/utils/auth/token.store.ts
export const ACCESS_TOKEN_KEY = "access_token" as const;
export const AUTH_TOKEN_CHANGED = "auth:token_changed" as const;

const notify = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(AUTH_TOKEN_CHANGED));
  }
};
export const tokenStore = {
  get: () => (typeof window === "undefined" ? null : localStorage.getItem(ACCESS_TOKEN_KEY)),
  set(token?: string | null) {
    if (typeof window === "undefined") return;
    const prev = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (!token) localStorage.removeItem(ACCESS_TOKEN_KEY);
    else localStorage.setItem(ACCESS_TOKEN_KEY, token);
    if ((prev ?? null) !== (token ?? null)) notify();
  },
  clear() {
    if (typeof window === "undefined") return;
    const had = localStorage.getItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    if (had !== null) notify();
  },
};
