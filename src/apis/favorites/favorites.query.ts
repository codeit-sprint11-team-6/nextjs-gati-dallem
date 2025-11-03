"use client";

import { useFavoriteStore } from "@/store/favoriteStore";
import { Gathering, GatheringId, UserId } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../_react_query/keys";
import { GetGatheringsQuery } from "../gatherings/gatherings.schema";
import { fetchFavoriteGatherings } from "./favorites.service";

export function useFavoriteGatheringsQuery(userId: UserId, query?: Partial<GetGatheringsQuery>) {
  const enabled = userId > 0;

  return useQuery<Gathering[]>({
    queryKey: queryKeys.favorites.list(userId, query),
    queryFn: () => fetchFavoriteGatherings(userId, query),
    enabled,
    staleTime: 5 * 60 * 1000,
  });
}

export function useFavoriteToggle(userId: number | undefined, gatheringId: GatheringId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (userId) useFavoriteStore.getState().toggle(userId, gatheringId);
      return true;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.favorites.all() });
    },
  });
}
