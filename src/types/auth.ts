// /src/types/auth.ts
import type { TeamId, UserId, ISODateTimeString } from "./common";

/** 로그인된 사용자 (회원 정보 조회 응답 기반) */
export interface AuthUser {
  teamId?: TeamId;
  id: UserId;
  email: string;
  name: string;
  companyName?: string;
  image?: string | null;
  createdAt: ISODateTimeString;
  updatedAt: ISODateTimeString;
}

/** 인증 관련 단순 메시지 응답을 화면에서 재사용할 수 있게 래핑 */
export interface AuthMessage {
  message: string; // 예: "로그인 성공", "로그아웃 성공", "사용자 생성 성공"
}
