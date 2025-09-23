// /src/apis/reviews/reviews.service.ts
import type { ReviewList, ReviewScoreAggregate } from "@/types/review";
import { apiClient } from "../_client";
import { toReviewList, toReviewScores } from "./reviews.adapters";
import {
  CreateReviewBody,
  CreateReviewBodySchema,
  CreateReviewResponse,
  CreateReviewResponseSchema,
  GetReviewScoresQuery,
  GetReviewScoresQuerySchema,
  GetReviewScoresResponse,
  GetReviewScoresResponseSchema,
  GetReviewsQuery,
  GetReviewsQuerySchema,
  GetReviewsResponse,
  GetReviewsResponseSchema,
} from "./reviews.schema";

/**
 * 리뷰 생성
 * - 서버 응답(CreateReviewResponse)은 중첩 Gathering/User가 없으므로
 *   보통은 이 값을 UI에 직접 쓰지 않고, 목록/점수 쿼리를 무효화하여 갱신합니다.
 * - 필요 시, 별도의 어댑터로 enrich하여 Review 도메인으로 만들 수 있습니다.
 */
export async function createReview(body: CreateReviewBody) {
  const parsed = CreateReviewBodySchema.parse(body);
  const dto = await apiClient.post<CreateReviewResponse>(
    `/reviews`,
    parsed,
    CreateReviewResponseSchema,
  );
  return dto; // 주로 id/score 등 확인용. UI는 보통 재조회 사용.
}

/** 리뷰 목록(페이징) → 도메인 ReviewList */
export async function getReviews(query?: GetReviewsQuery) {
  const q = GetReviewsQuerySchema.parse(query ?? {});
  const dto = await apiClient.get<GetReviewsResponse>(`/reviews`, q, GetReviewsResponseSchema);
  const domain: ReviewList = toReviewList(dto);
  return domain;
}

/** 리뷰 평점 집계 → 도메인 배열 */
export async function getReviewScores(query?: GetReviewScoresQuery) {
  const q = GetReviewScoresQuerySchema.parse(query ?? {});
  const dto = await apiClient.get<GetReviewScoresResponse>(
    `/reviews/scores`,
    q,
    GetReviewScoresResponseSchema,
  );
  const domain: ReviewScoreAggregate[] = toReviewScores(dto);
  return domain;
}
