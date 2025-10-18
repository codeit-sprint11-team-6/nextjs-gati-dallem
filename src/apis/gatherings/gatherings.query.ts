// /src/apis/gatherings/gatherings.query.ts
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../_react_query/keys";
import { invalidateGatherings } from "../_react_query/utils";
import {
  CreateGatheringBody,
  CreateGatheringResponse,
  GetGatheringsQuery,
  GetGatheringsResponse,
  GetJoinedQuery,
  GetParticipantsQuery,
} from "./gatherings.schema";
import {
  cancelGathering,
  createGathering,
  getGatheringDetail,
  getGatherings,
  getJoinedGatherings,
  getParticipants,
  joinGathering,
  leaveGathering,
} from "./gatherings.service";

/** GET /gatherings */
export function useGatherings(
  query?: GetGatheringsQuery,
  options?: {
    enabled?: boolean;
    select?: (d: GetGatheringsResponse) => unknown;
  },
) {
  return useQuery({
    queryKey: queryKeys.gatherings.list(query),
    queryFn: () => getGatherings(query),
    enabled: options?.enabled ?? true,
    select: options?.select as any,
  });
}

/** GET /gatherings (무한스크롤) */
export function useInfiniteGatherings(
  query?: Omit<GetGatheringsQuery, "limit" | "offset">,
  options?: {
    enabled?: boolean;
  },
) {
  const LIMIT = 10;

  return useInfiniteQuery({
    queryKey: queryKeys.gatherings.list({ ...query, limit: LIMIT }),
    queryFn: ({ pageParam = 0 }) =>
      getGatherings({
        ...query,
        limit: LIMIT,
        offset: pageParam,
      }),
    enabled: options?.enabled ?? true,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      // 마지막 페이지의 데이터가 LIMIT보다 적으면 더 이상 데이터가 없음
      if (lastPage.length < LIMIT) return undefined;
      // 다음 페이지의 offset 반환
      return allPages.length * LIMIT;
    },
  });
}

/** GET /gatherings/{id} */
export function useGatheringDetail(
  id: number | undefined,
  options?: {
    enabled?: boolean;
  },
) {
  return useQuery({
    queryKey: id ? queryKeys.gatherings.detail(id) : ["__disabled__", "gatheringDetail"],
    queryFn: () => getGatheringDetail(id as number),
    enabled: Boolean(id) && (options?.enabled ?? true),
  });
}

/** POST /gatherings (multipart) */
export function useCreateGathering() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: CreateGatheringBody): Promise<CreateGatheringResponse> =>
      createGathering(body),
    onSuccess: async (created) => {
      // 목록/참석목록/상세 등 갱신
      await invalidateGatherings(queryClient);
      // 상세는 바로 프리페치해두면 UX 좋아짐
      await queryClient.invalidateQueries({ queryKey: queryKeys.gatherings.detail(created.id) });
    },
  });
}

/** PUT /gatherings/{id}/cancel */
export function useCancelGathering() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => cancelGathering(id),
    onSuccess: async (_, id) => {
      await invalidateGatherings(queryClient);
      await queryClient.invalidateQueries({ queryKey: queryKeys.gatherings.detail(id) });
    },
  });
}

/** GET /gatherings/joined */
export function useJoinedGatherings(query?: GetJoinedQuery, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: queryKeys.gatherings.joined(query),
    queryFn: () => getJoinedGatherings(query),
    enabled: options?.enabled ?? true,
  });
}

/** GET /gatherings/{id}/participants */
export function useParticipants(
  id: number | undefined,
  query?: GetParticipantsQuery,
  options?: { enabled?: boolean },
) {
  return useQuery({
    queryKey: id ? queryKeys.gatherings.participants(id, query) : ["__disabled__", "participants"],
    queryFn: () => getParticipants(id as number, query),
    enabled: Boolean(id) && (options?.enabled ?? true),
  });
}

/** POST /gatherings/{id}/join */
export function useJoinGathering() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => joinGathering(id),
    onSuccess: async (_, id) => {
      await invalidateGatherings(queryClient);
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: queryKeys.gatherings.detail(id) }),
        queryClient.invalidateQueries({ queryKey: queryKeys.gatherings.joined() }),
        queryClient.invalidateQueries({ queryKey: queryKeys.gatherings.list() }),
        queryClient.invalidateQueries({ queryKey: queryKeys.gatherings.participants(id) }),
      ]);
    },
  });
}

/** DELETE /gatherings/{id}/leave */
export function useLeaveGathering() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => leaveGathering(id),
    onSuccess: async (_, id) => {
      await invalidateGatherings(queryClient);
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: queryKeys.gatherings.detail(id) }),
        queryClient.invalidateQueries({ queryKey: queryKeys.gatherings.joined() }),
        queryClient.invalidateQueries({ queryKey: queryKeys.gatherings.list() }),
        queryClient.invalidateQueries({ queryKey: queryKeys.gatherings.participants(id) }),
      ]);
    },
  });
}
