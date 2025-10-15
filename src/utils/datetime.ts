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
