// /src/apis/auths/auths.schema.ts
import { z } from "zod";
import { ApiErrorSchema, IsoDateTime, MessageSchema } from "../_shared.schema";

/** ===== Auths ===== */

/** POST /{teamId}/auths/signup */
export const SignupBodySchema = z.object({
  email: z.string(),
  password: z.string(),
  name: z.string(),
  companyName: z.string().optional(),
});
export type SignupBody = z.infer<typeof SignupBodySchema>;

export const SignupResponseSchema = MessageSchema; // { message: "사용자 생성 성공" }
export type SignupResponse = z.infer<typeof SignupResponseSchema>;

export const SignupErrorSchema = ApiErrorSchema; // VALIDATION_ERROR | EMAIL_EXISTS ...
export type SignupError = z.infer<typeof SignupErrorSchema>;

/** POST /{teamId}/auths/signin */
export const SigninBodySchema = z.object({
  email: z.string(),
  password: z.string(),
});
export type SigninBody = z.infer<typeof SigninBodySchema>;

export const SigninResponseSchema = z.union([
  z.object({ token: z.string() }), // JWT
  MessageSchema, // { message: "로그인 성공" } (세션 기반)
]);
export type SigninResponse = z.infer<typeof SigninResponseSchema>;

/** 에러: INVALID_CREDENTIALS | USER_NOT_FOUND | SERVER_ERROR */
export const SigninErrorSchema = ApiErrorSchema;
export type SigninError = z.infer<typeof SigninErrorSchema>;

/** POST /{teamId}/auths/signout */
export const SignoutResponseSchema = MessageSchema; // { message: "로그아웃 성공" }
export type SignoutResponse = z.infer<typeof SignoutResponseSchema>;

/** GET /{teamId}/auths/user */
export const GetAuthUserResponseSchema = z.object({
  teamId: z.string(),
  id: z.number(),
  email: z.string(),
  name: z.string(),
  companyName: z.string().optional(),
  image: z.string().nullable(),
  createdAt: IsoDateTime,
  updatedAt: IsoDateTime,
});
export type GetAuthUserResponse = z.infer<typeof GetAuthUserResponseSchema>;

/** PUT /{teamId}/auths/user (multipart/form-data) */
export const UpdateAuthUserBodySchema = z.object({
  companyName: z.string().optional(),
  image: z.any().optional(), // binary
});
export type UpdateAuthUserBody = z.infer<typeof UpdateAuthUserBodySchema>;

export const UpdateAuthUserResponseSchema = z.object({
  id: z.number(),
  email: z.string(),
  name: z.string(),
  companyName: z.string().optional(),
  image: z.string().optional(),
  createdAt: IsoDateTime,
  updatedAt: IsoDateTime,
});
export type UpdateAuthUserResponse = z.infer<typeof UpdateAuthUserResponseSchema>;
