// /src/apis/gatherings/gatherings.service.ts
import type { Gathering, GatheringParticipant, JoinedGathering } from "@/types/gathering";
import { apiClient } from "../_client";
import {
  toGathering,
  toGatheringList,
  toGatheringParticipantList,
  toJoinedGatheringList,
} from "./gatherings.adapters";
import {
  CancelGatheringResponse,
  CancelGatheringResponseSchema,
  CreateGatheringBody,
  CreateGatheringBodySchema,
  CreateGatheringResponse,
  CreateGatheringResponseSchema,
  GetGatheringDetailResponse,
  GetGatheringDetailResponseSchema,
  GetGatheringsQuery,
  GetGatheringsQuerySchema,
  GetGatheringsResponse,
  GetGatheringsResponseSchema,
  GetJoinedQuery,
  GetJoinedQuerySchema,
  GetJoinedResponse,
  GetJoinedResponseSchema,
  GetParticipantsQuery,
  GetParticipantsQuerySchema,
  GetParticipantsResponse,
  GetParticipantsResponseSchema,
  JoinGatheringResponse,
  JoinGatheringResponseSchema,
  LeaveGatheringResponse,
  LeaveGatheringResponseSchema,
} from "./gatherings.schema";

/** 모임 목록 → 도메인 리스트 */
export async function getGatherings(query?: GetGatheringsQuery) {
  const q = GetGatheringsQuerySchema.parse(query ?? {});
  const dto = await apiClient.get<GetGatheringsResponse>(
    `/gatherings`,
    q,
    GetGatheringsResponseSchema,
  );
  const domain: Gathering[] = toGatheringList(dto);
  return domain;
}

/** 모임 상세 → 도메인 */
export async function getGatheringDetail(id: number) {
  const dto = await apiClient.get<GetGatheringDetailResponse>(
    `/gatherings/${id}`,
    undefined,
    GetGatheringDetailResponseSchema,
  );
  const domain: Gathering = toGathering(dto);
  return domain;
}

/** 모임 생성(multipart) → 도메인 */
export async function createGathering(body: CreateGatheringBody) {
  const parsed = CreateGatheringBodySchema.parse(body);
  const fd = new FormData();
  fd.append("location", parsed.location);
  fd.append("type", parsed.type);
  fd.append("name", parsed.name);
  fd.append("dateTime", parsed.dateTime);
  fd.append("capacity", String(parsed.capacity));
  if (parsed.image instanceof Blob) fd.append("image", parsed.image);
  if (parsed.registrationEnd) fd.append("registrationEnd", parsed.registrationEnd);

  const dto = await apiClient.post<CreateGatheringResponse>(
    `/gatherings`,
    fd,
    CreateGatheringResponseSchema,
  );
  const domain: Gathering = toGathering(dto);
  return domain;
}

/** 모임 취소 → 도메인(취소시간 포함) */
export async function cancelGathering(id: number) {
  const dto = await apiClient.put<CancelGatheringResponse>(
    `/gatherings/${id}/cancel`,
    undefined,
    CancelGatheringResponseSchema,
  );
  const domain: Gathering = toGathering(dto);
  return domain;
}

/** 내가 참석한 모임 → 도메인 리스트 */
export async function getJoinedGatherings(query?: GetJoinedQuery) {
  const q = GetJoinedQuerySchema.parse(query ?? {});
  const dto = await apiClient.get<GetJoinedResponse>(
    `/gatherings/joined`,
    q,
    GetJoinedResponseSchema,
  );
  const domain: JoinedGathering[] = toJoinedGatheringList(dto);
  return domain;
}

/** 특정 모임 참가자 → 도메인 리스트 */
export async function getParticipants(id: number, query?: GetParticipantsQuery) {
  const q = GetParticipantsQuerySchema.parse(query ?? {});
  const dto = await apiClient.get<GetParticipantsResponse>(
    `/gatherings/${id}/participants`,
    q,
    GetParticipantsResponseSchema,
  );
  const domain: GatheringParticipant[] = toGatheringParticipantList(dto);
  return domain;
}

/** 모임 참여(메시지 DTO) */
export async function joinGathering(id: number) {
  const res = await apiClient.post<JoinGatheringResponse>(
    `/gatherings/${id}/join`,
    undefined,
    JoinGatheringResponseSchema,
  );
  return res;
}

/** 모임 참여 취소(메시지 DTO) */
export async function leaveGathering(id: number) {
  const res = await apiClient.delete<LeaveGatheringResponse>(
    `/gatherings/${id}/leave`,
    LeaveGatheringResponseSchema,
  );
  return res;
}
