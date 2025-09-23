// /src/types/review.ts
import type { TeamId, UserId, ISODateTimeString, SortOrder, Paginated } from "./common";
import type { GatheringId } from "./gathering";

/** 리뷰 엔티티(리뷰 목록 item 구조 기반) */
export interface Review {
  teamId: TeamId;
  id: number;
  score: number; // 1~5
  comment: string;
  createdAt: ISODateTimeString;
  Gathering: {
    teamId: TeamId;
    id: GatheringId;
    type: "DALLAEMFIT" | "OFFICE_STRETCHING" | "MINDFULNESS" | "WORKATION";
    name: string;
    dateTime: ISODateTimeString;
    location: string;
    image?: string;
  };
  User: {
    teamId: TeamId;
    id: UserId;
    name: string;
    image?: string;
  };
}

/** 리뷰 목록(페이징 메타 포함) */
export type ReviewList = Paginated<Review>;

/** 리뷰 목록에서 사용하는 필터/정렬 옵션 */
export interface ReviewListFilter {
  gatheringId?: GatheringId;
  userId?: UserId;
  type?: "DALLAEMFIT" | "OFFICE_STRETCHING" | "MINDFULNESS" | "WORKATION";
  location?: "건대입구" | "을지로3가" | "신림" | "홍대입구";
  date?: string; // YYYY-MM-DD
  registrationEnd?: string; // YYYY-MM-DD
  sortBy?: "createdAt" | "score" | "participantCount";
  sortOrder?: SortOrder;
  limit?: number;
  offset?: number;
}

/** 리뷰 평점 집계 아이템 */
export interface ReviewScoreAggregate {
  teamId: TeamId;
  /** gatheringId 쿼리 사용 시 포함 */
  gatheringId?: GatheringId;
  /** type 쿼리 사용 시 포함 */
  type?: "DALLAEMFIT" | "OFFICE_STRETCHING" | "MINDFULNESS" | "WORKATION";
  averageScore: number;
  oneStar: number;
  twoStars: number;
  threeStars: number;
  fourStars: number;
  fiveStars: number;
}
