"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import FilterBar, { MeetingFilters } from "./FilterBar";
import ListGrid, { MeetingListItem } from "./ListGrid";

const DEFAULT: MeetingFilters = {
  keyword: "",
  category: "all",
  region: "all",
  date: "",
  sort: "latest",
};

// 데모 데이터(실서비스에선 React Query + API 연동)
const MOCK: MeetingListItem[] = [
  {
    id: 1,
    name: "달램핏 오피스 스트레칭",
    type: "OFFICE_STRETCHING",
    location: "건대입구",
    dateTime: "2025-01-07T17:30:00Z",
    participantCount: 4,
    capacity: 20,
    image: "/img/sample/room-1.jpg",
    host: "달램핏",
  },
  {
    id: 2,
    name: "노구뇨 오후 스트레칭",
    type: "OFFICE_STRETCHING",
    location: "홍대입구",
    dateTime: "2025-01-07T17:30:00Z",
    participantCount: 10,
    capacity: 20,
    image: "/img/sample/cafe-1.jpg",
    host: "달램핏",
  },
  {
    id: 3,
    name: "나를 돌아보는 30분",
    type: "MINDFULNESS",
    location: "신림",
    dateTime: "2025-01-07T17:30:00Z",
    participantCount: 20,
    capacity: 20,
    image: "/img/sample/room-2.jpg",
    host: "달램핏",
  },
  {
    id: 4,
    name: "힐링 마인드 클래스",
    type: "MINDFULNESS",
    location: "건대입구",
    dateTime: "2025-01-07T17:30:00Z",
    participantCount: 4,
    capacity: 20,
    image: "/img/sample/room-1.jpg",
    host: "달램핏",
  },
];

export default function MeetingsPageClient() {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  // URL → 초기 상태
  const [filters, setFilters] = useState<MeetingFilters>(() => ({
    keyword: sp.get("q") ?? DEFAULT.keyword,
    category: (sp.get("category") as MeetingFilters["category"]) ?? DEFAULT.category,
    region: (sp.get("region") as MeetingFilters["region"]) ?? DEFAULT.region,
    date: sp.get("date") ?? DEFAULT.date,
    sort: (sp.get("sort") as MeetingFilters["sort"]) ?? DEFAULT.sort,
  }));

  // 상태 → URL 동기화
  useEffect(() => {
    const q = new URLSearchParams();
    if (filters.keyword) q.set("q", filters.keyword);
    if (filters.category !== "all") q.set("category", filters.category);
    if (filters.region !== "all") q.set("region", filters.region);
    if (filters.date) q.set("date", filters.date);
    if (filters.sort !== "latest") q.set("sort", filters.sort);

    const next = q.toString();
    router.replace(next ? `${pathname}?${next}` : pathname, { scroll: false });
  }, [filters, pathname, router]);

  // 실제 필터링
  const filtered = useMemo(() => {
    let arr = [...MOCK];

    if (filters.keyword) {
      const q = filters.keyword.toLowerCase();
      arr = arr.filter((m) => m.name.toLowerCase().includes(q) || (m.host ?? "").toLowerCase().includes(q));
    }
    if (filters.category !== "all") {
      arr = arr.filter((m) => m.type === filters.category);
    }
    if (filters.region !== "all") {
      arr = arr.filter((m) => m.location === filters.region);
    }
    if (filters.date) {
      const d = filters.date;
      arr = arr.filter((m) => m.dateTime.slice(0, 10) === d);
    }

    if (filters.sort === "latest") {
      arr.sort((a, b) => (a.dateTime < b.dateTime ? 1 : -1));
    } else if (filters.sort === "popular") {
      arr.sort((a, b) => b.participantCount / b.capacity - a.participantCount / a.capacity);
    } else if (filters.sort === "closing") {
      arr.sort((a, b) => (a.dateTime > b.dateTime ? 1 : -1));
    }
    return arr;
  }, [filters]);

  return (
    <>
      <FilterBar value={filters} onChange={setFilters} />
      <div className="mt-8">
        <ListGrid items={filtered} />
      </div>
    </>
  );
}
