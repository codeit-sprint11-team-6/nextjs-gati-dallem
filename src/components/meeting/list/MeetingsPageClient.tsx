"use client";

import FilterBar from "./FilterBar";
import ListGrid from "./ListGrid";
import { MOCK_MEETINGS } from "@/mocks/meeting/mockMeetings";
import { useUrlFilters } from "@/hooks/meeting/useUrlFilters";
import { useMeetingFilter } from "@/hooks/meeting/useMeetingFilter";

/**
 * 모임 목록 페이지의 클라이언트 컴포넌트
 *
 * - URL 쿼리 파라미터와 필터 상태를 동기화
 * - 필터에 따라 모임 목록을 필터링 및 정렬
 * - 실제 서비스에서는 MOCK_MEETINGS 대신 React Query로 API 데이터 페칭
 */
export default function MeetingsPageClient() {
  const [filters, setFilters] = useUrlFilters();
  const filteredMeetings = useMeetingFilter(MOCK_MEETINGS, filters);

  return (
    <>
      <FilterBar value={filters} onChange={setFilters} />
      <div className="mt-8">
        <ListGrid items={filteredMeetings} />
      </div>
    </>
  );
}
