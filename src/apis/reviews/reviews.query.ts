// /src/apis/reviews/reviews.query.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../_react_query/keys";
import { invalidateReviews } from "../_react_query/utils";
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
    onSuccess: async () => await invalidateReviews(queryClient),
  });
}
