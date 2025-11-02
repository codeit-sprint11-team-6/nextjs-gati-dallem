// src/constants/auth/errorMessages.ts

export const AUTH_ERROR_MESSAGES = {
  fields: {
    email: {
      REQUIRED: "아이디(이메일)를 입력해 주세요.",
      INVALID: "유효한 이메일 주소를 입력해 주세요.",
      DUPLICATE: "중복된 이메일입니다.",
    },
    name: {
      REQUIRED: "이름을 입력해 주세요.",
      TOO_SHORT: "이름은 2자 이상이어야 합니다.",
      TOO_LONG: "이름은 30자 이하여야 합니다.",
      INVALID: "이름에는 한글/영문, 공백, -, ·, ' 만 사용할 수 있습니다.",
    },
    companyName: {
      REQUIRED: "회사명을 입력해 주세요.",
      TOO_SHORT: "회사명은 2자 이상이어야 합니다.",
      TOO_LONG: "회사명은 40자 이하여야 합니다.",
      INVALID: "회사명에는 한글/영문/숫자 및 공백, & . , - ( ) / 만 사용할 수 있습니다.",
    },
    password: {
      REQUIRED: "비밀번호를 입력해 주세요.",
      WEAK: "비밀번호는 8자 이상이어야 합니다.",
      WHITESPACE: "비밀번호에는 공백을 포함할 수 없습니다.",
      COMPLEXITY: "영문, 숫자, 특수문자를 모두 포함해 주세요.",
    },
    confirmPassword: {
      REQUIRED: "비밀번호 확인을 입력해 주세요.",
      NOT_MATCH: "비밀번호가 일치하지 않습니다.",
    },
  },

  // 서버 에러 코드 → UI 문구(서버 메시지를 숨기거나 없을 때 폴백)
  codes: {
    INVALID_CREDENTIALS: "아이디 또는 비밀번호가 올바르지 않아요.",
    USER_NOT_FOUND: "가입되지 않은 계정이에요.",
    EMAIL_EXISTS: "이미 사용 중인 이메일이에요.", // 서버 중복 응답 폴백
    VALIDATION_ERROR: "입력값을 다시 확인해 주세요.",
    TOKEN_EXPIRED: "세션이 만료되었어요. 다시 로그인해 주세요.",
  },

  // 공통 배너/토스트/성공 문구 등
  generic: {
    LOGIN_FAILED: "로그인에 실패했습니다. 다시 시도해 주세요.",
    SIGNUP_FAILED: "회원가입에 실패했습니다. 잠시 후 다시 시도해 주세요.",
    SIGNUP_SUCCESS: "회원가입이 완료되었습니다.",
    UNKNOWN: "요청을 처리할 수 없습니다. 잠시 후 다시 시도해 주세요.",
  },
} as const;
