// /src/apis/reviews/reviews.adapters.ts
import type { Review, ReviewList, ReviewScoreAggregate } from "@/types/review";
import type {
  CreateReviewResponse,
  GetReviewScoresResponse,
  GetReviewsResponse,
} from "./reviews.schema";

/** 단일 ReviewItem DTO → Domain Review */
export function toReview(dto: GetReviewsResponse["data"][number] | CreateReviewResponse): Review {
  return {
    teamId: dto.teamId,
    id: dto.id,
    score: dto.score,
    comment: dto.comment,
    createdAt: dto.createdAt,
    Gathering: {
      teamId: "Gathering" in dto ? dto.Gathering.teamId : (undefined as any), // CreateReviewResponse엔 Gathering 없음
      // ↑ CreateReviewResponse에는 중첩 Gathering이 없으므로, 리스트 아이템만 안전.
      // CreateReviewResponse를 화면에서 바로 쓰지 않거나, 필요 시 별도 fetch로 보강하세요.
      // 만약 강제 타입 안정성을 원하면 overload로 분리하세요.
      id: ("Gathering" in dto ? dto.Gathering.id : undefined) as any,
      type: ("Gathering" in dto ? dto.Gathering.type : undefined) as any,
      name: ("Gathering" in dto ? dto.Gathering.name : undefined) as any,
      dateTime: ("Gathering" in dto ? dto.Gathering.dateTime : undefined) as any,
      location: ("Gathering" in dto ? dto.Gathering.location : undefined) as any,
      image: ("Gathering" in dto ? dto.Gathering.image : undefined) as any,
    },
    User: {
      teamId: ("User" in dto ? dto.User.teamId : undefined) as any,
      id: ("User" in dto ? dto.User.id : undefined) as any,
      name: ("User" in dto ? dto.User.name : undefined) as any,
      image: ("User" in dto ? dto.User.image : undefined) as any,
    },
  };
}

/**
 * 주의:
 * - GetReviewsResponse.data의 아이템에는 Gathering, User가 포함되어 있어 완전한 Review를 구성할 수 있음.
 * - 반면 CreateReviewResponse는 중첩 Gathering/User가 없으므로,
 *   toReview에 혼합 입력을 넣는 대신 overload로 분리하는 것이 타입 안전.
 *   아래처럼 명확히 분리하는 버전을 권장합니다.
 */

/** Overload 버전 (권장) */
// export function toReviewFromListItem(dto: GetReviewsResponse["data"][number]): Review { ... }
// export function toReviewFromCreate(dto: CreateReviewResponse, enrich: { gathering?: Review["Gathering"]; user?: Review["User"] }): Review { ... }

/** Review 목록(페이징 메타 포함) DTO → Domain */
export function toReviewList(dto: GetReviewsResponse): ReviewList {
  return {
    data: dto.data.map(toReview),
    totalItemCount: dto.totalItemCount,
    currentPage: dto.currentPage,
    totalPages: dto.totalPages,
  };
}

/** 리뷰 평점 집계 DTO → Domain */
export function toReviewScores(dtos: GetReviewScoresResponse): ReviewScoreAggregate[] {
  return dtos.map((s) => ({
    teamId: s.teamId,
    gatheringId: s.gatheringId,
    type: s.type as ReviewScoreAggregate["type"],
    averageScore: s.averageScore,
    oneStar: s.oneStar,
    twoStars: s.twoStars,
    threeStars: s.threeStars,
    fourStars: s.fourStars,
    fiveStars: s.fiveStars,
  }));
}
