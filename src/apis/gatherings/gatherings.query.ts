// /src/apis/gatherings/gatherings.query.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
    onSuccess: async () => await invalidateGatherings(queryClient),
  });
}

/** PUT /gatherings/{id}/cancel */
export function useCancelGathering() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => cancelGathering(id),
    onSuccess: async () => await invalidateGatherings(queryClient),
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
    onSuccess: async () => await invalidateGatherings(queryClient),
  });
}

/** DELETE /gatherings/{id}/leave */
export function useLeaveGathering() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => leaveGathering(id),
    onSuccess: async () => await invalidateGatherings(queryClient),
  });
}
