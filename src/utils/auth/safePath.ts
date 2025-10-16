// src/utils/auth/safePath.ts

/** 루트 상대경로만 허용 (오픈 리다이렉트 방지) */
/** 문자열이 루트상대 경로(/...)인지 확인 */
export const toSafePath = (v?: string) => (v && v.startsWith("/") ? v : "/");
