"use client";

import { useMemo } from "react";
import FilterBar from "./FilterBar";
import ListGrid from "./ListGrid";
import { useUrlFilters } from "@/hooks/meeting/useUrlFilters";
import { useGatherings } from "@/apis/gatherings/gatherings.query";
import { GetGatheringsQuery } from "@/apis/gatherings/gatherings.schema";

export default function MeetingsPageClient() {
  const [filters, setFilters] = useUrlFilters();

  const queryParams = useMemo<GetGatheringsQuery | undefined>(() => {
    const params: GetGatheringsQuery = {};

    // 카테고리 필터
    if (filters.category !== "all") {
      params.type = filters.category;
    }

    // 날짜 필터 (YYYY-MM-DD 형식)
    if (filters.date) {
      params.date = filters.date;
    }

    // 정렬
    if (filters.sort === "latest") {
      params.sortBy = "registrationEnd";
      params.sortOrder = "asc";
    } else if (filters.sort === "popular") {
      params.sortBy = "participantCount";
      params.sortOrder = "desc";
    } else if (filters.sort === "closing") {
      params.sortBy = "dateTime";
      params.sortOrder = "desc";
    }

    return Object.keys(params).length > 0 ? params : undefined;
  }, [filters]);

  const { data: meetings = [], isLoading, error } = useGatherings(queryParams);

  // 키워드 필터링
  const filteredMeetings = useMemo(() => {
    if (!filters.keyword) return meetings;
    const keyword = filters.keyword.toLowerCase();
    return meetings.filter((m) => m.name.toLowerCase().includes(keyword));
  }, [meetings, filters.keyword]);

  return (
    <>
      <FilterBar value={filters} onChange={setFilters} />
      <div className="mt-8">
        {isLoading ? (
          <div className="py-12 text-center text-gray-500">로딩 중...</div>
        ) : error ? (
          <div className="py-12 text-center text-red-500">모임 목록을 불러오는데 실패했습니다.</div>
        ) : (
          <ListGrid items={filteredMeetings} />
        )}
      </div>
    </>
  );
}
