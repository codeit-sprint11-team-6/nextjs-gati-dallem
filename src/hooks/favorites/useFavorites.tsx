"use client";
import { useFavoriteStore } from "@/store/favoriteStore";
import { useMemo } from "react";

/** 모임별 즐겨찾기 상태/토글 훅 */
export function useFavorite(userId?: number) {
  if (!userId) return { favoriteCount: 0, favoriteIds: [], isLiked: () => {} };

  const has = (gatheringId: number) => useFavoriteStore((s) => s.has(userId, gatheringId));
  const getIds = useFavoriteStore((s) => s.getIds);

  const count = useFavoriteStore((s) => s.favorites[userId])?.count ?? 0;
  const ids = useMemo(() => getIds(userId), [getIds, userId]);

  return { favoriteCount: count, favoriteIds: ids, isLiked: has };
}
