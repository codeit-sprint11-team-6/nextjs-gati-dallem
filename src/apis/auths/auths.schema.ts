// /src/apis/auths/auths.schema.ts
import { z } from "zod";
import { ApiErrorSchema, IsoDateTime, MessageSchema } from "../_shared.schema";
import {
  MAX_PASSWORD_LEN,
  MIN_PASSWORD_LEN,
  PASSWORD_DISALLOW_WHITESPACE,
  PASSWORD_REGEX,
  USE_PASSWORD_COMPLEXITY,
} from "@/constants/auth/constraints";

/** ===== Auths ===== */

/**
 * - Input (요청): normalize (정규화) → trim, lowercase 등
 * - Output (응답): validate only (no transform - 변형 없이 검증)
 * - Endpoints:
 *   - POST /{teamId}/auths/signup
 *   - POST /{teamId}/auths/signin
 *   - POST /{teamId}/auths/signout
 *   - GET  /{teamId}/auths/user
 *   - PUT  /{teamId}/auths/user (multipart/form-data)
 * - Notes:
 *   - 본 프로젝트는 JWT 기반 인증만 사용 (세션 방식 미지원)
 *   - 계약(Contract): 서버와 합의된 응답/요청 데이터 구조
 */

/** ===== Primitives (Atoms) ===== */

// 입력용: 소문자/트림 등 정규화 + 이메일 형식 검증
export const EmailInputSchema = z
  .string()
  .trim()
  .toLowerCase()
  .pipe(z.email({ message: "유효한 이메일 형식이 아닙니다." }));

// 응답용: 서버 값은 변형하지 않고 형식만 검증
export const EmailResponseSchema = z.email({
  message: "유효한 이메일 형식이 아닙니다.",
});

export const PasswordSchema = z
  .string()
  .min(MIN_PASSWORD_LEN, { message: `비밀번호는 최소 ${MIN_PASSWORD_LEN}자 이상이어야 합니다.` })
  .max(MAX_PASSWORD_LEN, { message: `비밀번호는 최대 ${MAX_PASSWORD_LEN}자 이내여야 합니다.` })
  .refine((v) => !USE_PASSWORD_COMPLEXITY || PASSWORD_REGEX.test(v), {
    message: "영문/숫자/특수문자를 포함해 주세요.",
  })
  .refine((v) => !PASSWORD_DISALLOW_WHITESPACE || !/\s/.test(v), {
    message: "비밀번호에 공백을 포함할 수 없습니다.",
  });

/** 로그인용(공란만 금지 + 길이 상한, 복잡도 X) */
export const SigninPasswordSchema = z
  .string()
  .min(1, { message: "비밀번호를 입력해 주세요." })
  .max(MAX_PASSWORD_LEN, { message: `비밀번호는 최대 ${MAX_PASSWORD_LEN}자 이내여야 합니다.` })
  .refine((v) => !PASSWORD_DISALLOW_WHITESPACE || !/\s/.test(v), {
    message: "비밀번호에 공백을 포함할 수 없습니다.",
  });

export const NameSchema = z
  .string()
  .trim()
  .min(1, { message: "이름은 필수입니다." })
  .max(50, { message: "이름은 50자 이내로 입력해주세요." });

export const CompanyNameSchema = z.string().trim().optional();

/** ===== Request DTOs (요청) ===== */

/** POST /{teamId}/auths/signup */
export const SignupBodySchema = z
  .object({
    email: EmailInputSchema,
    password: PasswordSchema,
    name: NameSchema,
    companyName: CompanyNameSchema,
  })
  .strict();
export type SignupBody = z.infer<typeof SignupBodySchema>;

/** POST /{teamId}/auths/signin */
export const SigninBodySchema = z
  .object({
    email: EmailInputSchema,
    password: SigninPasswordSchema,
  })
  .strict();
export type SigninBody = z.infer<typeof SigninBodySchema>;

/** PUT /{teamId}/auths/user (multipart/form-data) */
export const UpdateAuthUserBodySchema = z
  .object({
    companyName: CompanyNameSchema,
    image: z.any().optional(), // binary
  })
  .strict();
export type UpdateAuthUserBody = z.infer<typeof UpdateAuthUserBodySchema>;

/** ===== Response Schemas (응답) ===== */

// 1) 공통 유저 코어
const UserCoreSchema = z
  .object({
    teamId: z.string().optional(),
    id: z.number(),
    email: EmailResponseSchema,
    name: z.string(),
    companyName: z.string().optional(),
    image: z.string().nullable().optional(),
    createdAt: IsoDateTime,
    updatedAt: IsoDateTime,
  })
  .strict();
export type UserCore = z.infer<typeof UserCoreSchema>;

/** GET /{teamId}/auths/user */
export const GetAuthUserResponseSchema = UserCoreSchema.extend({
  teamId: z.string(),
}).strict();
export type GetAuthUserResponse = z.infer<typeof GetAuthUserResponseSchema>;

/** PUT /{teamId}/auths/user */
export const UpdateAuthUserResponseSchema = UserCoreSchema;
export type UpdateAuthUserResponse = z.infer<typeof UpdateAuthUserResponseSchema>;

/** POST /{teamId}/auths/signin */
// 현재는 JWT 기반만 사용
export const SigninResponseSchema = z.object({ token: z.string() }).strict();
export type SigninResponse = z.infer<typeof SigninResponseSchema>;

/** POST /{teamId}/auths/signout */
export const SignoutResponseSchema = MessageSchema; // { message: "로그아웃 성공" }
export type SignoutResponse = z.infer<typeof SignoutResponseSchema>;

/** POST /{teamId}/auths/signup */
export const SignupResponseSchema = MessageSchema; // { message: "사용자 생성 성공" }
export type SignupResponse = z.infer<typeof SignupResponseSchema>;

export const SignupErrorSchema = ApiErrorSchema; // VALIDATION_ERROR | EMAIL_EXISTS ...
export type SignupError = z.infer<typeof SignupErrorSchema>;

/** 에러: INVALID_CREDENTIALS | USER_NOT_FOUND | SERVER_ERROR */
export const SigninErrorSchema = ApiErrorSchema;
export type SigninError = z.infer<typeof SigninErrorSchema>;
