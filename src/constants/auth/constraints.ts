// src/constants/auth/constraints.ts
export const MIN_PASSWORD_LEN = 8;
export const MAX_PASSWORD_LEN = 20;
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// 선택 정책: 필요해지면 켬
export const USE_PASSWORD_COMPLEXITY = false;
export const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
