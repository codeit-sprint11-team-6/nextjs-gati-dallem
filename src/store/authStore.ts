// /src/store/useAuthStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { apiClient } from "@/apis/_client";
import type { AuthUser } from "@/types/auth";
import { deleteCookie, setCookie } from "@/utils/next-cookie";

type AuthSnapshot = {
  token?: string | null;
  user?: AuthUser | null;
};

type AuthState = AuthSnapshot & {
  isAuthenticated: boolean;
  actions: {
    setToken: (token?: string | null) => void;
    setUser: (user: AuthUser | null) => void;
    clear: () => void;
    hydrateUser: (fetcher: () => Promise<AuthUser>) => Promise<void>;
  };
};

const STORAGE_KEY = "auth-store";
function syncClientToken(token?: string | null) {
  apiClient.setAuthToken(token ?? undefined);
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      actions: {
        setToken: (token) => {
          syncClientToken(token);
          set((s) => ({ token, isAuthenticated: Boolean(token && s.user) }));
        },
        setUser: (user) => {
          set((s) => ({ ...s, user, isAuthenticated: Boolean(s.token && user) }));
        },
        clear: async () => {
          await deleteCookie("loggedIn");
          syncClientToken(undefined);
          set({ token: null, user: null, isAuthenticated: false });
        },
        hydrateUser: async (fetcher) => {
          const { token } = get();
          if (!token) return;
          try {
            const me = await fetcher();
            set((s) => ({ ...s, user: me, isAuthenticated: true }));
            await setCookie("loggedIn", new Date().getTime().toString());
          } catch (e) {
            console.log(e);

            get().actions.clear();
          }
        },
      },
    }),
    {
      name: STORAGE_KEY,
      version: 1,
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state, error) => {
        if (error) return;
        const token = state?.token;
        syncClientToken(token);
      },
      partialize: (s) => ({ token: s.token, user: s.user }) as AuthSnapshot,
    },
  ),
);

export const selectToken = (s: AuthState) => s.token ?? null;
export const selectUser = (s: AuthState) => s.user ?? null;
export const selectIsAuthenticated = (s: AuthState) => s.isAuthenticated;

export const authActions = {
  setToken: (token?: string | null) => useAuthStore.getState().actions.setToken(token),
  setUser: (user: AuthUser | null) => useAuthStore.getState().actions.setUser(user),
  clear: () => useAuthStore.getState().actions.clear(),
  hydrateUser: (fetcher: () => Promise<AuthUser>) =>
    useAuthStore.getState().actions.hydrateUser(fetcher),
};
