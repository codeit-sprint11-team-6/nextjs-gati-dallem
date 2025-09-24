import { format } from "date-fns";

/**
 * 날짜, 시간 포맷터
 * @param datetime
 * @returns [date, time]
 */
export const formatDateTime = (datetime: string) => {
  const date = format(datetime, "MM월 dd일");
  const time = format(datetime, "HH:mm");
  return [date, time];
};
