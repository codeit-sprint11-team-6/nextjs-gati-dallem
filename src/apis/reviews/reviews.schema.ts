// /src/apis/reviews/reviews.schema.ts
import { z } from "zod";
import { ApiErrorSchema, IsoDateTime, SortOrderSchema, Ymd } from "../_shared.schema";

/** ===== Reviews ===== */

/** POST /{teamId}/reviews — Body & Response */
export const CreateReviewBodySchema = z.object({
  gatheringId: z.number().int(),
  score: z.number().int().min(1).max(5),
  comment: z.string(),
});
export type CreateReviewBody = z.infer<typeof CreateReviewBodySchema>;

export const CreateReviewResponseSchema = z.object({
  teamId: z.string(),
  id: z.number(),
  userId: z.number(),
  gatheringId: z.number(),
  score: z.number().int(),
  comment: z.string(),
  createdAt: IsoDateTime,
});
export type CreateReviewResponse = z.infer<typeof CreateReviewResponseSchema>;

export const CreateReviewErrorSchema = ApiErrorSchema; // FORBIDDEN(미참석), NOT_FOUND(모임 없음) 등
export type CreateReviewError = z.infer<typeof CreateReviewErrorSchema>;

/** GET /{teamId}/reviews — Query */
export const GetReviewsQuerySchema = z.object({
  gatheringId: z.coerce.number().int().optional(),
  userId: z.coerce.number().int().optional(),
  type: z.enum(["DALLAEMFIT", "OFFICE_STRETCHING", "MINDFULNESS", "WORKATION"]).optional(),
  location: z.enum(["건대입구", "을지로3가", "신림", "홍대입구"]).optional(),
  date: Ymd.optional(),
  registrationEnd: Ymd.optional(),
  sortBy: z.enum(["createdAt", "score", "participantCount"]).optional(),
  sortOrder: SortOrderSchema.optional(),
  limit: z.coerce.number().int().optional(),
  offset: z.coerce.number().int().optional(),
});
export type GetReviewsQuery = z.infer<typeof GetReviewsQuerySchema>;

/** GET /{teamId}/reviews — Response (페이징 메타 포함) */
export const ReviewItemSchema = z.object({
  teamId: z.string(),
  id: z.number(),
  score: z.number().int(),
  comment: z.string(),
  createdAt: IsoDateTime,
  Gathering: z.object({
    teamId: z.string(),
    id: z.number(),
    type: z.enum(["DALLAEMFIT", "OFFICE_STRETCHING", "MINDFULNESS", "WORKATION"]),
    name: z.string(),
    dateTime: IsoDateTime,
    location: z.string(),
    image: z.string().optional(),
  }),
  User: z.object({
    teamId: z.string(),
    id: z.number(),
    name: z.string(),
    image: z.string().optional(),
  }),
});
export const GetReviewsResponseSchema = z.object({
  data: z.array(ReviewItemSchema),
  totalItemCount: z.number().int(),
  currentPage: z.number().int(),
  totalPages: z.number().int(),
});
export type GetReviewsResponse = z.infer<typeof GetReviewsResponseSchema>;

/** GET /{teamId}/reviews/scores — Query & Response */
export const GetReviewScoresQuerySchema = z.object({
  gatheringId: z
    .string()
    .regex(/^\d+(,\d+)*$/)
    .optional(), // CSV
  type: z.enum(["DALLAEMFIT", "OFFICE_STRETCHING", "MINDFULNESS", "WORKATION"]).optional(),
});
export type GetReviewScoresQuery = z.infer<typeof GetReviewScoresQuerySchema>;

export const ReviewScoreAggregateSchema = z.object({
  teamId: z.string(),
  gatheringId: z.number().optional(), // gatheringId 파라미터 사용 시에만 포함
  type: z.enum(["DALLAEMFIT", "OFFICE_STRETCHING", "MINDFULNESS", "WORKATION"]).optional(), // type 파라미터 사용 시에만 포함
  averageScore: z.number(),
  oneStar: z.number().int(),
  twoStars: z.number().int(),
  threeStars: z.number().int(),
  fourStars: z.number().int(),
  fiveStars: z.number().int(),
});
export const GetReviewScoresResponseSchema = z.array(ReviewScoreAggregateSchema);
export type GetReviewScoresResponse = z.infer<typeof GetReviewScoresResponseSchema>;

/** 공통 에러 */
export const ReviewErrorSchema = ApiErrorSchema;
export type ReviewError = z.infer<typeof ReviewErrorSchema>;
