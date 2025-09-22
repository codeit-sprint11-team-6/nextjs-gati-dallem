// /src/types/common.ts

/** 공통 식별자 */
export type TeamId = string;
export type UserId = number;

/** 정렬 방향 */
export type SortOrder = "asc" | "desc";

/** YYYY-MM-DD or ISO date-time 등 서버에서 내려오는 문자열 날짜 */
export type ISODateTimeString = string;

/** 서버 공통 에러 메시지 타입(컴포넌트 토스트/에러바인딩용) */
export interface ApiErrorLike {
  code?: string; // 예: VALIDATION_ERROR, UNAUTHORIZED ...
  message: string;
  parameter?: string;
}

/** 페이지네이션 헬퍼(리뷰 목록 응답 형태에 맞춤) */
export interface Paginated<T> {
  data: T[];
  totalItemCount: number;
  currentPage: number;
  totalPages: number;
}
