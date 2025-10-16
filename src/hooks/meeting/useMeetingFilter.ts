import { useMemo } from "react";
import { MeetingFilters } from "@/components/meeting/list/FilterBar";
import { MeetingListItem } from "@/components/meeting/list/ListGrid";

type SortType = MeetingFilters["sort"];

/**
 * 모임 목록을 필터링하고 정렬하는 로직
 */
export function useMeetingFilter(meetings: MeetingListItem[], filters: MeetingFilters) {
  return useMemo(() => {
    let result = [...meetings];

    // 키워드 필터
    if (filters.keyword) {
      const keyword = filters.keyword.toLowerCase();
      result = result.filter(
        (meeting) =>
          meeting.name.toLowerCase().includes(keyword) ||
          (meeting.host ?? "").toLowerCase().includes(keyword),
      );
    }

    // 카테고리 필터
    if (filters.category !== "all") {
      result = result.filter((meeting) => meeting.type === filters.category);
    }

    // 지역 필터
    if (filters.region !== "all") {
      result = result.filter((meeting) => meeting.location === filters.region);
    }

    // 날짜 필터
    if (filters.date) {
      const targetDate = filters.date;
      result = result.filter((meeting) => meeting.dateTime.slice(0, 10) === targetDate);
    }

    // 정렬
    result = sortMeetings(result, filters.sort);

    return result;
  }, [meetings, filters]);
}

/**
 * 모임 목록 정렬
 */
function sortMeetings(meetings: MeetingListItem[], sortType: SortType): MeetingListItem[] {
  const sorted = [...meetings];

  switch (sortType) {
    case "latest":
      // 마감임박순 (날짜가 가까운 순)
      return sorted.sort((a, b) => (a.dateTime < b.dateTime ? -1 : 1));

    case "popular":
      // 인기순 (참여율 높은 순)
      return sorted.sort((a, b) => {
        const rateA = a.participantCount / a.capacity;
        const rateB = b.participantCount / b.capacity;
        return rateB - rateA;
      });

    case "closing":
      // 최신순 (생성일 기준, 현재는 날짜 역순으로 대체)
      return sorted.sort((a, b) => (a.dateTime > b.dateTime ? -1 : 1));

    default:
      return sorted;
  }
}
