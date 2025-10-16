// src/configs/commonConfig.ts
/**
 * - 환경변수 기반 전역 설정
 * - 클라이언트에서 필요한 값은 반드시 NEXT_PUBLIC_ 프리픽스 사용
 * - constants/와 구분: constants는 하드코딩 상수, configs는 환경별로 달라지는 값
 */

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
export const TEAM_ID = process.env.NEXT_PUBLIC_TEAM_ID ?? "11-6";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "";
export const AUTH_REDIRECT_PATH = process.env.NEXT_PUBLIC_AUTH_REDIRECT_PATH ?? "/callback";

/** 실제 Redirect URI (자동 조합) */
export const AUTH_REDIRECT_URI = SITE_URL ? `${SITE_URL}${AUTH_REDIRECT_PATH}` : "";
