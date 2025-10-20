"use client";

import { useMemo, useEffect, useRef } from "react";
import FilterBar from "./FilterBar";
import ListGrid from "./ListGrid";
import { useUrlFilters } from "@/hooks/meeting/useUrlFilters";
import { useInfiniteGatherings } from "@/apis/gatherings/gatherings.query";
import { GetGatheringsQuery } from "@/apis/gatherings/gatherings.schema";

export default function MeetingsPageClient() {
  const [filters, setFilters] = useUrlFilters();
  const observerTarget = useRef<HTMLDivElement>(null);

  const queryParams = useMemo<Omit<GetGatheringsQuery, "limit" | "offset"> | undefined>(() => {
    const params: Omit<GetGatheringsQuery, "limit" | "offset"> = {};

    // 카테고리 필터
    if (filters.category !== "all") {
      params.type = filters.category;
    }

    // 장소 필터
    if (filters.location) {
      params.location = filters.location as GetGatheringsQuery["location"];
    }

    // 날짜 필터
    if (filters.date) {
      params.date = filters.date;
    }

    if (filters.sort === "latest") {
      params.sortBy = "registrationEnd";
      params.sortOrder = "asc";
    } else if (filters.sort === "popular") {
      params.sortBy = "participantCount";
      params.sortOrder = "desc";
    }

    return Object.keys(params).length > 0 ? params : undefined;
  }, [filters]);

  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteGatherings(queryParams);

  const meetings = useMemo(() => {
    return data?.pages.flat() ?? [];
  }, [data]);

  // 키워드 필터링
  const filteredMeetings = useMemo(() => {
    if (!filters.keyword) return meetings;
    const keyword = filters.keyword.toLowerCase();
    return meetings.filter((m) => m.name.toLowerCase().includes(keyword));
  }, [meetings, filters.keyword]);

  // 무한스크롤
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <>
      <FilterBar value={filters} onChange={setFilters} />
      <div className="mt-8">
        {isLoading ? (
          <div className="py-12 text-center text-gray-500">로딩 중...</div>
        ) : error ? (
          <div className="py-12 text-center text-red-500">모임 목록을 불러오는데 실패했습니다.</div>
        ) : (
          <>
            <ListGrid items={filteredMeetings} />

            {/* 무한스크롤 */}
            <div ref={observerTarget} className="mt-4 h-10">
              {isFetchingNextPage && (
                <div className="py-4 text-center text-gray-500">더 불러오는 중...</div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}
