// src/apis/auths/auths.endpoints.ts

/**
 * Auth 관련 API 엔드포인트 정의
 * - ApiClient가 BASE_URL과 TEAM_ID를 이어 붙여 최종 요청 URL을 생성합니다.
 */

export const authEndpoints = {
  signup: () => "/auths/signup",
  signin: () => "/auths/signin",
  signout: () => "/auths/signout",
  me: () => "/auths/user",
};
