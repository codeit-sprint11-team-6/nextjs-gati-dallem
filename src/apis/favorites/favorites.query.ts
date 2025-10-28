// src/apis/favorites/favorites.query.ts
"use client";

import { Gathering, GatheringId, UserId } from "@/types";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { queryKeys } from "../_react_query/keys";
import { GetGatheringsQuery } from "../gatherings/gatherings.schema";
import { fetchFavoriteGatherings } from "./favorites.service";
import { useFavoriteStore } from "@/store/favoriteStore";

/** 로컬스토리지 → /api/favorites 프록시 → 모임 목록 */
export function useFavoriteGatheringsQuery(userId: UserId, query?: Partial<GetGatheringsQuery>) {
  return useQuery<Gathering[]>({
    queryKey: queryKeys.favorites.list(userId, query),
    queryFn: () => fetchFavoriteGatherings(userId, query),
    enabled: useFavoriteStore.getState().favorites[userId]?.count >= 1,
    staleTime: 5 * 60 * 1000,
  });
}

export function useFavoriteToggle(userId: number | undefined, gatheringId: GatheringId) {
  const queryClient = new QueryClient();
  return useMutation({
    mutationFn: () => {
      userId && useFavoriteStore.getState().toggle(userId, gatheringId);
      return new Promise(() => true);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.favorites.all() });
    },
  });
}
