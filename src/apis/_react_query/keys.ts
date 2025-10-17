// /src/apis/_rq/keys.ts

// 규칙: [도메인, 세부키..., params?]
export const queryKeys = {
  auth: {
    all: () => ["auth"] as const,
    me: () => [...queryKeys.auth.all(), "me"] as const,
  },
  gatherings: {
    all: () => ["gatherings"] as const,
    list: (params?: unknown) => [...queryKeys.gatherings.all(), "list", params ?? {}] as const,
    detail: (id: number) => [...queryKeys.gatherings.all(), "detail", id] as const,
    joined: (params?: unknown) => [...queryKeys.gatherings.all(), "joined", params ?? {}] as const,
    participants: (id: number, params?: unknown) =>
      [...queryKeys.gatherings.all(), "participants", id, params ?? {}] as const,
  },
  reviews: {
    all: () => ["reviews"] as const,
    list: (params?: unknown) => [...queryKeys.reviews.all(), "list", params ?? {}] as const,
    scores: (params?: unknown) => [...queryKeys.reviews.all(), "scores", params ?? {}] as const,
  },
} as const;

// invalidate에 쓸 target 키 모음(여기서 확장해서 사용)
export const targets = {
  gatheringsAll: [
    queryKeys.gatherings.all(),
    // 하위 키들: list/joined/detail/participants
  ],
  reviewsAll: [queryKeys.reviews.all()],
  authAll: [queryKeys.auth.all()],
};
