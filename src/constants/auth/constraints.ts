// src/constants/auth/constraints.ts

// 이름, 회사명 제약 조건 상수
export const NAME_MIN_LEN = 2;
export const NAME_MAX_LEN = 30;
export const COMPANY_MIN_LEN = 2;
export const COMPANY_MAX_LEN = 40;

export const NAME_REGEX =
  /^[A-Za-z\uAC00-\uD7A3][A-Za-z\uAC00-\uD7A3\s.'-]{0,28}[A-Za-z\uAC00-\uD7A3]$/;
export const COMPANY_REGEX = /^[A-Za-z0-9\uAC00-\uD7A3\s&.,()/-]{2,40}$/;

// 이메일 유효성 검사
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// 인증(로그인 / 회원가입) 제약 조건 상수
export const MIN_PASSWORD_LEN = 8;
export const MAX_PASSWORD_LEN = 20;
export const PASSWORD_DISALLOW_WHITESPACE = true;
export const USE_PASSWORD_COMPLEXITY = true;
export const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
