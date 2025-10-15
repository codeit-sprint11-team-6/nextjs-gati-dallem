import { formatInTimeZone } from "date-fns-tz";

/**
 * 날짜, 시간 포맷터
 * @param datetime ISO 문자열
 * @returns [date, time]
 */
export const formatDateAndTime = (datetime: string) => {
  const naive = datetime.replace(/Z$/, "");
  const timeZone = "Asia/Seoul";
  const date = formatInTimeZone(naive, timeZone, "MM월 dd일");
  const time = formatInTimeZone(naive, timeZone, "HH:mm");
  return [date, time];
};

/**
 * 날짜 포맷터
 * @param datetime ISO 문자열
 * @returns yyyy.MM.dd
 */
export const formatDate = (datetime: string) => {
  const naive = datetime.replace(/Z$/, "");
  const timeZone = "Asia/Seoul";
  return formatInTimeZone(naive, timeZone, "yyyy.MM.dd");
};
