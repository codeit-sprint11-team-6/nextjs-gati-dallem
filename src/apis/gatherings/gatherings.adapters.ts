// /src/apis/gatherings/gatherings.adapters.ts
import type { Gathering, GatheringParticipant, JoinedGathering } from "@/types/gathering";
import type {
  CreateGatheringResponse,
  GetGatheringDetailResponse,
  GetGatheringsResponse,
  GetJoinedResponse,
  GetParticipantsResponse,
} from "./gatherings.schema";

/** 단일 Gathering DTO → Domain */
export function toGathering(
  data: GetGatheringDetailResponse | GetGatheringsResponse[number] | CreateGatheringResponse,
): Gathering {
  const dto = { canceledAt: null, ...data };
  return {
    teamId: dto.teamId,
    id: dto.id,
    type: dto.type as Gathering["type"],
    name: dto.name,
    dateTime: dto.dateTime,
    registrationEnd: dto.registrationEnd,
    location: dto.location,
    participantCount: dto.participantCount,
    capacity: dto.capacity,
    image: dto.image,
    createdBy: dto.createdBy,
    canceledAt: dto.canceledAt,
  };
}

/** 배열 Gathering DTO[] → Domain[] */
export function toGatheringList(dtos: GetGatheringsResponse): Gathering[] {
  return dtos.map(toGathering);
}

/** JoinedGathering DTO → Domain */
export function toJoinedGathering(
  dto: GetJoinedResponse[number] /* JoinedGatheringItem */,
): JoinedGathering {
  return {
    ...toGathering(dto),
    joinedAt: dto.joinedAt,
    isCompleted: dto.isCompleted,
    isReviewed: dto.isReviewed,
  };
}

/** JoinedGathering 배열 */
export function toJoinedGatheringList(dtos: GetJoinedResponse): JoinedGathering[] {
  return dtos.map(toJoinedGathering);
}

/** Participant DTO → Domain */
export function toGatheringParticipant(
  dto: GetParticipantsResponse[number] /* ParticipantItem */,
): GatheringParticipant {
  return {
    teamId: dto.teamId,
    userId: dto.userId,
    gatheringId: dto.gatheringId,
    joinedAt: dto.joinedAt,
    User: {
      id: dto.User.id,
      email: dto.User.email,
      name: dto.User.name,
      companyName: dto.User.companyName,
      image: dto.User.image,
    },
  };
}

/** Participant 배열 */
export function toGatheringParticipantList(dtos: GetParticipantsResponse): GatheringParticipant[] {
  return dtos.map(toGatheringParticipant);
}
