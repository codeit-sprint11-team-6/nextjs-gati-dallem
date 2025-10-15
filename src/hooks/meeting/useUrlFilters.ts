import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MeetingFilters } from "@/components/meeting/list/FilterBar";

const DEFAULT_FILTERS: MeetingFilters = {
  keyword: "",
  category: "all",
  region: "all",
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

  // URL에서 초기 필터 상태 파싱
  const [filters, setFilters] = useState<MeetingFilters>(() => ({
    keyword: searchParams.get("q") ?? DEFAULT_FILTERS.keyword,
    category: (searchParams.get("category") as MeetingFilters["category"]) ?? DEFAULT_FILTERS.category,
    region: (searchParams.get("region") as MeetingFilters["region"]) ?? DEFAULT_FILTERS.region,
    date: searchParams.get("date") ?? DEFAULT_FILTERS.date,
    sort: (searchParams.get("sort") as MeetingFilters["sort"]) ?? DEFAULT_FILTERS.sort,
  }));

  // 필터 상태가 변경되면 URL에 반영
  useEffect(() => {
    const params = new URLSearchParams();

    if (filters.keyword) params.set("q", filters.keyword);
    if (filters.category !== "all") params.set("category", filters.category);
    if (filters.region !== "all") params.set("region", filters.region);
    if (filters.date) params.set("date", filters.date);
    if (filters.sort !== "latest") params.set("sort", filters.sort);

    const queryString = params.toString();
    const newUrl = queryString ? `${pathname}?${queryString}` : pathname;

    router.replace(newUrl, { scroll: false });
  }, [filters, pathname, router]);

  return [filters, setFilters] as const;
}
