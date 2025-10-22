import { formatInTimeZone } from "date-fns-tz";

/**
 * 날짜, 시간 포맷터 (한국 시간 기준)
 * @param datetime ISO 문자열 혹은 Date 객체
 * @returns [date, time]
 */
export const formatDateAndTime = (datetime: string | Date) => {
  const timeZone = "Asia/Seoul";
  const date = formatInTimeZone(datetime, timeZone, "MM월 dd일");
  const time = formatInTimeZone(datetime, timeZone, "HH:mm");
  return [date, time];
};

/**
 * 날짜 포맷터 (한국 시간 기준)
 * @param datetime ISO 문자열 혹은 Date 객체
 * @returns yyyy.MM.dd
 */
export const formatDate = (datetime: string | Date) => {
  const timeZone = "Asia/Seoul";
  return formatInTimeZone(datetime, timeZone, "yyyy.MM.dd");
};

/**
 * registrationEnd까지 남은 시간을 계산하여 텍스트 반환
 * 마감 7일 이내인 경우만 표시
 * @param registrationEnd ISO 문자열 (optional)
 */
export const getDeadlineText = (registrationEnd?: string): string | null => {
  if (!registrationEnd) return null;

  const naive = registrationEnd.replace(/Z$/, "");
  const timeZone = "Asia/Seoul";
  const now = new Date();
  const deadline = new Date(naive);

  if (deadline < now) return null;

  const todayStr = formatInTimeZone(now, timeZone, "yyyy-MM-dd");
  const deadlineStr = formatInTimeZone(naive, timeZone, "yyyy-MM-dd");

  // 당일인 경우 시간까지 표시
  if (todayStr === deadlineStr) {
    const hour = formatInTimeZone(naive, timeZone, "HH");
    return `오늘 ${hour}시 마감`;
  }

  const diffMs = deadline.getTime() - now.getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  // 마감 7일 이내인 경우만 표시
  if (diffDays > 7) return null;

  return `마감 ${diffDays}일 전`;
};
