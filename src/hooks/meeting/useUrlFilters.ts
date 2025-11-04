import { useEffect, useState, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MeetingFilters } from "@/components/meeting/list/FilterBar";

const DEFAULT_FILTERS: MeetingFilters = {
  keyword: "",
  category: "DALLAEMFIT",
  location: "",
  date: "",
  sort: "latest",
};

/**
 * URL 쿼리 파라미터와 필터 상태를 동기화하는 훅
 *
 * @returns [filters, setFilters] - 현재 필터 상태와 업데이트 함수
 */
export function useUrlFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const scrollPositionRef = useRef<number>(0);

  // URL에서 초기 필터 상태 파싱
  const [filters, setFiltersInternal] = useState<MeetingFilters>(() => ({
    keyword: searchParams.get("q") ?? DEFAULT_FILTERS.keyword,
    category: (searchParams.get("category") as MeetingFilters["category"]) ?? DEFAULT_FILTERS.category,
    location: searchParams.get("location") ?? DEFAULT_FILTERS.location,
    date: searchParams.get("date") ?? DEFAULT_FILTERS.date,
    sort: (searchParams.get("sort") as MeetingFilters["sort"]) ?? DEFAULT_FILTERS.sort,
  }));

  // 필터 변경 시 스크롤 위치 저장 후 상태 업데이트
  // React Query의 isLoading 상태로 인한 컴포넌트 언마운트 전에 스크롤 저장
  const setFilters = (newFilters: MeetingFilters | ((prev: MeetingFilters) => MeetingFilters)) => {
    scrollPositionRef.current = window.scrollY;
    setFiltersInternal(newFilters);
  };

  // 필터 상태가 변경되면 URL에 반영하고 스크롤 복원
  useEffect(() => {
    const params = new URLSearchParams();

    if (filters.keyword) params.set("q", filters.keyword);
    if (filters.category !== "DALLAEMFIT") params.set("category", filters.category);
    if (filters.location) params.set("location", filters.location);
    if (filters.date) params.set("date", filters.date);
    if (filters.sort !== "latest") params.set("sort", filters.sort);

    const queryString = params.toString();
    const newUrl = queryString ? `${pathname}?${queryString}` : pathname;

    router.replace(newUrl, { scroll: false });

    const savedScroll = scrollPositionRef.current;

    // 스크롤 복원: 여러 타이밍에 시도하여 React Query 리렌더링 후에도 동작하도록 함
    if (savedScroll > 0) {
      window.scrollTo(0, savedScroll);
    }

    requestAnimationFrame(() => {
      if (savedScroll > 0) {
        window.scrollTo(0, savedScroll);
      }
    });

    const timer1 = setTimeout(() => {
      if (savedScroll > 0) {
        window.scrollTo(0, savedScroll);
      }
    }, 100);

    const timer2 = setTimeout(() => {
      if (savedScroll > 0) {
        window.scrollTo(0, savedScroll);
      }
    }, 200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [filters, pathname, router]);

  return [filters, setFilters] as const;
}
