/**
 * commonConfig.ts
 * - 환경변수 기반의 전역 설정
 * - constants/와 구분: constants는 하드코딩 상수, configs는 환경별로 달라지는 값
 * - 클라이언트에서 필요한 값은 반드시 NEXT_PUBLIC_ 프리픽스 사용
 */

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3000";

/** 현재 환경에 맞는 Redirect URI (클라이언트에서 사용됨) */
export const AUTH_REDIRECT_URI =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_AUTH_REDIRECT_URI_PROD
    : process.env.NEXT_PUBLIC_AUTH_REDIRECT_URI_LOCAL;

/** 공통 페이지네이션 상수 (환경과 무관한 하드값은 여기 두어도 OK) */
