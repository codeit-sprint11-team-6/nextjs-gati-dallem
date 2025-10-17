// /src/apis/_shared.schema.ts
import { z } from "zod";

/** 공통 스칼라 */
export const IsoDateTime = z
  .string()
  .regex(
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/,
    "유효한 ISO DateTime 형식이어야 합니다",
  );
export const Ymd = z.string().regex(/^\d{4}-\d{2}-\d{2}$/); // YYYY-MM-DD
export const SortOrderSchema = z.enum(["asc", "desc"]);

/** 공통 메시지 응답 (예: "로그아웃 성공") */
export const MessageSchema = z.object({
  message: z.string(),
});

/** 공통 에러 포맷(스웨거 전반에 반복되는 code/message/parameter 형태) */
export const ApiErrorSchema = z.object({
  code: z.string().optional(),
  message: z.string(),
  parameter: z.string().optional(),
  errors: z
    .array(
      z.object({
        parameter: z.string(),
        message: z.string(),
      }),
    )
    .optional(),
});
export type ApiError = z.infer<typeof ApiErrorSchema>;
