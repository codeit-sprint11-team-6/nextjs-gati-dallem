// /src/apis/gatherings/gatherings.schema.ts
import { z } from "zod";
import {
  ApiErrorSchema,
  IsoDateTime,
  MessageSchema,
  SortOrderSchema,
  Ymd,
} from "../_shared.schema";

/** ===== Gatherings ===== */

/** GET /{teamId}/gatherings — Query */
export const GetGatheringsQuerySchema = z.object({
  id: z
    .string()
    .regex(/^\d+(,\d+)*$/)
    .optional(),
  type: z.enum(["DALLAEMFIT", "OFFICE_STRETCHING", "MINDFULNESS", "WORKATION"]).optional(),
  location: z.enum(["건대입구", "을지로3가", "신림", "홍대입구"]).optional(),
  date: Ymd.optional(),
  createdBy: z.coerce.number().int().optional(),
  sortBy: z.enum(["dateTime", "registrationEnd", "participantCount"]).optional(),
  sortOrder: SortOrderSchema.optional(),
  limit: z.coerce.number().int().optional(),
  offset: z.coerce.number().int().optional(),
});
export type GetGatheringsQuery = z.infer<typeof GetGatheringsQuerySchema>;

/** GET /{teamId}/gatherings — Response */
export const GatheringItemSchema = z.object({
  teamId: z.string(),
  id: z.number(),
  type: z.enum(["DALLAEMFIT", "OFFICE_STRETCHING", "MINDFULNESS", "WORKATION"]),
  name: z.string(),
  dateTime: IsoDateTime,
  registrationEnd: IsoDateTime.optional(),
  location: z.string(),
  participantCount: z.number(),
  capacity: z.number(),
  image: z.string().optional(),
  createdBy: z.number(),
  canceledAt: IsoDateTime.nullish(),
});
export const GetGatheringsResponseSchema = z.array(GatheringItemSchema);
export type GetGatheringsResponse = z.infer<typeof GetGatheringsResponseSchema>;

/** GET /{teamId}/gatherings/{id} — Response */
export const GetGatheringDetailResponseSchema = GatheringItemSchema;
export type GetGatheringDetailResponse = z.infer<typeof GetGatheringDetailResponseSchema>;

/** POST /{teamId}/gatherings — Body (multipart/form-data) */
export const CreateGatheringBodySchema = z.object({
  location: z.enum(["건대입구", "을지로3가", "신림", "홍대입구"]),
  type: z.enum(["OFFICE_STRETCHING", "MINDFULNESS", "WORKATION"]),
  name: z.string(),
  // 스펙 설명은 "YYYY-MM-DDTHH:MM:SS" → 서버는 date-time으로 응답. 문자열로 전송/검증.
  dateTime: z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/),
  capacity: z.coerce.number().int().min(5),
  image: z.any().optional(), // multipart file
  registrationEnd: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/)
    .optional(),
});
export type CreateGatheringBody = z.infer<typeof CreateGatheringBodySchema>;

/** POST /{teamId}/gatherings — Response */
export const CreateGatheringResponseSchema = z.object({
  teamId: z.string(),
  id: z.number(),
  type: z.string(),
  name: z.string(),
  dateTime: IsoDateTime,
  registrationEnd: IsoDateTime.optional(),
  location: z.string(),
  participantCount: z.number(),
  capacity: z.number(),
  image: z.string().optional(),
  createdBy: z.number(),
});
export type CreateGatheringResponse = z.infer<typeof CreateGatheringResponseSchema>;

/** PUT /{teamId}/gatherings/{id}/cancel — Response */
export const CancelGatheringResponseSchema = GatheringItemSchema.required({
  canceledAt: true,
});
export type CancelGatheringResponse = z.infer<typeof CancelGatheringResponseSchema>;

/** GET /{teamId}/gatherings/joined — Query & Response */
export const GetJoinedQuerySchema = z.object({
  completed: z.coerce.boolean().optional(),
  reviewed: z.coerce.boolean().optional(),
  limit: z.coerce.number().int().optional(),
  offset: z.coerce.number().int().optional(),
  sortBy: z.enum(["dateTime", "registrationEnd", "joinedAt"]).optional(),
  sortOrder: SortOrderSchema.optional(),
});
export type GetJoinedQuery = z.infer<typeof GetJoinedQuerySchema>;

export const JoinedGatheringItemSchema = GatheringItemSchema.extend({
  joinedAt: IsoDateTime,
  isCompleted: z.boolean(),
  isReviewed: z.boolean(),
});
export const GetJoinedResponseSchema = z.array(JoinedGatheringItemSchema);
export type GetJoinedResponse = z.infer<typeof GetJoinedResponseSchema>;

/** GET /{teamId}/gatherings/{id}/participants — Query & Response */
export const GetParticipantsQuerySchema = z.object({
  limit: z.coerce.number().int().optional(),
  offset: z.coerce.number().int().optional(),
  sortBy: z.enum(["joinedAt"]).optional(),
  sortOrder: SortOrderSchema.optional(),
});
export type GetParticipantsQuery = z.infer<typeof GetParticipantsQuerySchema>;

export const ParticipantItemSchema = z.object({
  teamId: z.string(),
  userId: z.number(),
  gatheringId: z.number(),
  joinedAt: IsoDateTime,
  User: z.object({
    id: z.number(),
    email: z.string(),
    name: z.string(),
    companyName: z.string().optional(),
    image: z.string().optional(),
  }),
});
export const GetParticipantsResponseSchema = z.array(ParticipantItemSchema);
export type GetParticipantsResponse = z.infer<typeof GetParticipantsResponseSchema>;

/** POST /{teamId}/gatherings/{id}/join — Response */
export const JoinGatheringResponseSchema = MessageSchema; // "모임에 참여했습니다"
export type JoinGatheringResponse = z.infer<typeof JoinGatheringResponseSchema>;

/** DELETE /{teamId}/gatherings/{id}/leave — Response */
export const LeaveGatheringResponseSchema = MessageSchema; // "모임을 참여 취소했습니다"
export type LeaveGatheringResponse = z.infer<typeof LeaveGatheringResponseSchema>;

/** 공통 에러 스키마 (요청 오류/인증/권한/찾을 수 없음 등) */
export const GatheringErrorSchema = ApiErrorSchema;
export type GatheringError = z.infer<typeof GatheringErrorSchema>;
