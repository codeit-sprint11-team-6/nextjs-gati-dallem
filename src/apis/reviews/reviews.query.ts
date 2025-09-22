// /src/apis/reviews/reviews.queries.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../_react_query/keys";
import { invalidateGatherings, invalidateReviews } from "../_react_query/utils";
import { CreateReviewBody, GetReviewScoresQuery, GetReviewsQuery } from "./reviews.schema";
import { createReview, getReviews, getReviewScores } from "./reviews.service";

/** GET /reviews (페이징 응답) */
export function useReviews(query?: GetReviewsQuery, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: queryKeys.reviews.list(query),
    queryFn: () => getReviews(query),
    enabled: options?.enabled ?? true,
  });
}

/** GET /reviews/scores */
export function useReviewScores(query?: GetReviewScoresQuery, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: queryKeys.reviews.scores(query),
    queryFn: () => getReviewScores(query),
    enabled: options?.enabled ?? true,
  });
}

/** POST /reviews */
export function useCreateReview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: CreateReviewBody) => createReview(body),
    onSuccess: async (_, vars) => {
      // 리뷰 관련, 그리고 모임 관련 집계/참석목록도 갱신하는 게 UX상 유리
      await Promise.all([invalidateReviews(queryClient), invalidateGatherings(queryClient)]);
      // 특정 모임과 연관된 데이터가 있다면 더 타이트하게 갱신
      if (vars.gatheringId) {
        await Promise.all([
          queryClient.invalidateQueries({ queryKey: queryKeys.reviews.list() }),
          queryClient.invalidateQueries({ queryKey: queryKeys.reviews.scores() }),
          queryClient.invalidateQueries({
            queryKey: queryKeys.gatherings.detail(vars.gatheringId),
          }),
          queryClient.invalidateQueries({ queryKey: queryKeys.gatherings.joined() }),
        ]);
      }
    },
  });
}
