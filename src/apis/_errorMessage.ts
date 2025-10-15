// src/apis/_errorMessage.ts

import { AUTH_ERROR_MESSAGES } from "@/constants/auth/errorMessages";

/**
 * 서버 응답(status/code/message)을 사용자용 메시지로 변환
 * - 특정 코드의 서버 메시지를 그대로 보여줄지 여부는 ALLOW_SERVER_MSG로 제어
 * - 그렇지 않다면 코드/상태에 맞는 안전한 폴백 문구를 반환
 */

const ALLOW_SERVER_MSG = new Set([
  "VALIDATION_ERROR", // 400: 유효성 검증 실패 (parameter: 필드명 포함)
  "INVALID_CREDENTIALS", // 401: 비밀번호/아이디 불일치
  "USER_NOT_FOUND", // 404: 없는 계정
  // "EMAIL_ALREADY_TAKEN", // 필요 시 서버 문구 그대로 노출 가능
  // "SERVER_ERROR" // 500: 서버 오류 (필요 시 활성화)
]);

export const getErrorMessage = (status?: number, code?: string, serverMsg?: string) => {
  // 허용된 코드는 서버 메시지 우선 노출
  if (code && ALLOW_SERVER_MSG.has(code) && serverMsg) return serverMsg;

  // 2) 코드별 클라이언트 폴백 문구
  if (code && AUTH_ERROR_MESSAGES.codes[code as keyof typeof AUTH_ERROR_MESSAGES.codes]) {
    return AUTH_ERROR_MESSAGES.codes[code as keyof typeof AUTH_ERROR_MESSAGES.codes];
  }

  // 코드별 클라이언트 폴백 문구 - 폴백(네트워크/HTML/미정의 코드 등) : 그 외는 안전 문구
  switch (status) {
    case 400:
      return "요청을 처리할 수 없어요. 입력값을 확인해주세요.";
    case 401:
      return "로그인이 필요합니다.";
    case 403:
      return "접근 권한이 없어요.";
    case 404:
      return "요청한 정보를 찾을 수 없어요.";
    default:
      if (status && status >= 500) return "서버 오류가 발생했어요. 잠시 후 다시 시도해주세요.";
      return "요청을 처리할 수 없어요. 잠시 후 다시 시도해주세요.";
  }
};

// unknown 에러에서 status/code/message/parameter를 안전하게 추출하여
// 최종 사용자용 메시지와 함께 반환
export const toUserErrorDetails = (err: unknown, fallback: string) => {
  const e: any = err as any;
  const status = e?.response?.status ?? e?.status ?? e?.response?.data?.status;
  const code = e?.response?.data?.code ?? e?.data?.code ?? e?.code;
  const parameter = e?.response?.data?.parameter ?? e?.data?.parameter ?? e?.parameter;
  const serverMsg = e?.response?.data?.message ?? e?.data?.message ?? e?.message;

  return {
    message: getErrorMessage(status, code, serverMsg) ?? fallback,
    status,
    code,
    parameter,
  };
};

// 서버가 단일/복수 필드 에러를 내려줄 수 있으므로,
// 아래 함수로 [{code, parameter, message}] 형태의 배열로 정규화
export const extractValidationItems = (err: unknown) => {
  const e: any = err as any;
  const data = e?.response?.data ?? e?.data ?? {};
  if (Array.isArray(data?.errors)) return data.errors;
  if (data?.parameter || data?.message || data?.code) return [data];
  return [];
};

// 단순 배너 메시지가 필요할 때 사용하는 헬퍼
export const toUserErrorMessage = (err: unknown, fallback: string) => {
  const e: any = err as any;
  const status = e?.response?.status ?? e?.status ?? e?.response?.data?.status;
  const code = e?.response?.data?.code ?? e?.data?.code ?? e?.code;
  const serverMsg = e?.response?.data?.message ?? e?.data?.message ?? e?.message;

  return getErrorMessage(status, code, serverMsg) ?? fallback;
};
