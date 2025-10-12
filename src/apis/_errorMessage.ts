// src/apis/_errorMessage.ts

// 서버 응답(status/code/message)을 사용자용 메시지로 변환
export const getErrorMessage = (status: number, code?: string, serverMsg?: string) => {
  const ALLOW_SERVER_MSG = new Set([
    "VALIDATION_ERROR", // 400: 유효성 검증 실패 (parameter: 필드명 포함)
    "INVALID_CREDENTIALS", // 401: 비밀번호/아이디 불일치
    "USER_NOT_FOUND", // 404: 없는 계정
    // "SERVER_ERROR" // 500: 서버 오류 (필요 시 활성화)
  ]);

  // 허용된 코드는 서버 메시지를 그대로 노출
  if (code && ALLOW_SERVER_MSG.has(code) && serverMsg) return serverMsg;

  // 폴백(네트워크/HTML/미정의 코드 등) : 그 외는 안전 문구
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
      if (status >= 500) return "서버 오류가 발생했어요. 잠시 후 다시 시도해주세요.";
      return "요청을 처리할 수 없어요. 잠시 후 다시 시도해주세요.";
  }
};
