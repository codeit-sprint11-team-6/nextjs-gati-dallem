"use client";

import { useMemo, useEffect, useRef } from "react";
import { formatInTimeZone } from "date-fns-tz";
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

    // 날짜 필터는 클라이언트에서 한국 시간대 기준으로 처리

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

  const filteredMeetings = useMemo(() => {
    const now = new Date();
    let result = meetings;

    // 종료된 모임 제외
    result = result.filter((m) => {
      const isCompleted = new Date(m.dateTime) < now;
      return !isCompleted;
    });

    // 날짜 필터링 (한국 시간 기준)
    if (filters.date) {
      result = result.filter((m) => {
        const koreaDateStr = formatInTimeZone(m.dateTime, 'Asia/Seoul', 'yyyy-MM-dd');
        return koreaDateStr === filters.date;
      });
    }

    // 키워드 필터링
    if (filters.keyword) {
      const keyword = filters.keyword.toLowerCase();
      result = result.filter((m) => m.name.toLowerCase().includes(keyword));
    }

    // 클라이언트 정렬 제거 - 서버 정렬 순서 유지
    // 서버에서 이미 sortBy, sortOrder로 정렬되어 옴

    return result;
  }, [meetings, filters.keyword, filters.date]);

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
      <div className="mt-6 md:mt-7 lg:mt-8">
        {isLoading ? (
          <div className="py-8 md:py-10 lg:py-12 text-center text-sm md:text-base text-gray-500">로딩 중...</div>
        ) : error ? (
          <div className="py-8 md:py-10 lg:py-12 text-center text-sm md:text-base text-red-500">모임 목록을 불러오는데 실패했습니다.</div>
        ) : (
          <>
            <ListGrid items={filteredMeetings} />

            {/* 무한스크롤 */}
            <div ref={observerTarget} className="mt-4 h-10">
              {isFetchingNextPage && (
                <div className="py-4 text-center text-sm md:text-base text-gray-500">더 불러오는 중...</div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}
