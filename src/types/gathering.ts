// /src/types/gathering.ts
import type { TeamId, UserId, ISODateTimeString, SortOrder } from "./common";

/** 모임 종류 & 위치 */
export enum DefaultGatheringType {
  DALLAEMFIT = "DALLAEMFIT",
  OFFICE_STRETCHING = "OFFICE_STRETCHING",
  MINDFULNESS = "MINDFULNESS",
  WORKATION = "WORKATION",
}
export enum GatheringLocation {
  GUNDAE = "건대입구",
  EULJIRO3 = "을지로3가",
  SINLIM = "신림",
  HONGDAE = "홍대입구",
}
/**
 * 소주제 변경(개발자 네트워킹/세미나)에 따른 모임 종류 매핑
 * - NETWORKING: 네트워킹
 * - DEVELOPER: 네트워킹 - 개발자 커뮤니티
 * - EVERYONE: 네트워킹 - 비개발자도 함께 하는 커뮤니티
 * - SEMINAR: 세미나
 *
 * ex. 사용 예시
 * `const GatheringMapper = GatheringType["NETWORKING"]`
 */
export enum GatheringMapper {
  DALLAEMFIT = "네트워킹",
  OFFICE_STRETCHING = "개발자 커뮤니티",
  MINDFULNESS = "비개발자도 함께 하는 커뮤니티",
  WORKATION = "세미나",
}

/** 식별자 */
export type GatheringId = number;

/** 목록 정렬 키 */
export type GatheringListSortBy = "dateTime" | "registrationEnd" | "participantCount";
export type JoinedSortBy = "dateTime" | "registrationEnd" | "joinedAt";

/** 모임 엔티티(리스트/상세 공통) */
export interface Gathering {
  teamId: TeamId;
  id: GatheringId;
  type: string;
  name: string;
  dateTime: ISODateTimeString;
  registrationEnd?: ISODateTimeString;
  location: string;
  participantCount: number;
  capacity: number;
  image?: string | null;
  createdBy: UserId;
  canceledAt?: ISODateTimeString | null;
}

/** 내가 참석한 모임(추가 필드) */
export interface JoinedGathering extends Gathering {
  joinedAt: ISODateTimeString;
  isCompleted: boolean;
  isReviewed: boolean;
}

/** 특정 모임 참가자 목록 아이템 */
export interface GatheringParticipant {
  teamId: TeamId;
  userId: UserId;
  gatheringId: GatheringId;
  joinedAt: ISODateTimeString;
  User: {
    id: UserId;
    email: string;
    name: string;
    companyName?: string;
    image?: string;
  };
}

/** UI에서 사용할 필터/정렬 옵션(컴포넌트 props 등에서 재사용) */
export interface GatheringListFilter {
  idCsv?: string; // "1,2,3"
  type?: DefaultGatheringType;
  location?: GatheringLocation;
  date?: string; // YYYY-MM-DD
  createdBy?: UserId;
  sortBy?: GatheringListSortBy;
  sortOrder?: SortOrder;
  limit?: number;
  offset?: number;
}

export interface JoinedListFilter {
  completed?: boolean;
  reviewed?: boolean;
  limit?: number;
  offset?: number;
  sortBy?: JoinedSortBy;
  sortOrder?: SortOrder;
}

export interface ParticipantListFilter {
  limit?: number;
  offset?: number;
  sortBy?: "joinedAt";
  sortOrder?: SortOrder;
}
