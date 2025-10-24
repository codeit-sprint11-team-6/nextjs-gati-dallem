"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Chip from "@/components/ui/Chip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import ReviewsRatingSummary from "@/components/reviews/ReviewsRatingSummary";
import ReviewsEmptyState from "@/components/reviews/ReviewsEmptyState";
import ReviewListItem from "@/components/reviews/ReviewListItem";
import { mockAllReviews, mockRatingSummary } from "@/mocks/reviews/mockAllReviews";

type CategoryTab = "DALLAEMFIT" | "WORKATION";
type SubCategory = "all" | "OFFICE_STRETCHING" | "MINDFULNESS";

export default function AllReviewsPageClient() {
  const [activeCategory, setActiveCategory] = useState<CategoryTab>("DALLAEMFIT");
  const [activeSubCategory, setActiveSubCategory] = useState<SubCategory>("all");
  const [location, setLocation] = useState<string>("all");
  const [date, setDate] = useState<string>("all");
  const [sort, setSort] = useState<string>("deadline");

  const locationOptions = ["전체", "건대입구", "을지로3가", "신림", "홍대입구"];

  // Filter reviews based on selected filters
  const filteredReviews = useMemo(() => {
    return mockAllReviews.filter((review) => {
      if (review.category !== activeCategory) return false;
      if (activeSubCategory !== "all" && review.subCategory !== activeSubCategory) return false;
      return true;
    });
  }, [activeCategory, activeSubCategory]);

  const hasReviews = filteredReviews.length > 0;

  return (
    <div className="mx-auto max-w-7xl">
      {/* Header Section */}
      <div className="mb-6 flex items-end gap-3 md:gap-7 lg:mb-8 lg:gap-[33px]">
        <div className="relative h-14 w-[70px] flex-shrink-0 md:h-[57px] md:w-[70px] lg:h-[91px] lg:w-[97px]">
          <Image src="/image/empty.svg" alt="리뷰 헤더 일러스트" fill className="object-contain" />
        </div>
        <div className="flex flex-col gap-1 md:gap-4">
          <h1 className="text-lg font-semibold leading-7 text-gray-900 md:text-2xl lg:text-[32px] lg:leading-9">
            모든 리뷰
          </h1>
          <p className="text-base font-medium leading-6 text-slate-400 md:text-lg md:leading-7 lg:text-xl lg:leading-7">
            같이달램을 이용자들은 이렇게 느꼈어요 🫶
          </p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="mb-0 border-b border-slate-200">
        <div className="flex">
          <button
            onClick={() => {
              setActiveCategory("DALLAEMFIT");
              setActiveSubCategory("all");
            }}
            className={cn(
              "relative flex items-center gap-1.5 px-4 py-1 text-base font-medium transition-colors md:px-8 md:py-2 lg:text-xl",
              activeCategory === "DALLAEMFIT"
                ? "font-semibold text-slate-800"
                : "font-medium text-slate-500",
            )}
          >
            <div className="relative h-8 w-8 flex-shrink-0 md:h-11 md:w-11">
              <Image src="/image/empty.svg" alt="달램핏 아이콘" fill className="object-contain" />
            </div>
            <span className="text-base font-semibold md:text-lg lg:text-xl">달램핏</span>
            {activeCategory === "DALLAEMFIT" && (
              <div className="absolute inset-x-0 bottom-0 h-0.5 bg-green-500" />
            )}
          </button>

          <button
            onClick={() => {
              setActiveCategory("WORKATION");
              setActiveSubCategory("all");
            }}
            className={cn(
              "relative flex items-center gap-1.5 px-4 py-1 text-base font-medium transition-colors md:px-8 md:py-2 lg:text-xl",
              activeCategory === "WORKATION"
                ? "font-semibold text-slate-800"
                : "font-medium text-slate-500",
            )}
          >
            <div className="relative h-8 w-8 flex-shrink-0 md:h-11 md:w-11">
              <Image src="/image/empty.svg" alt="워케이션 아이콘" fill className="object-contain" />
            </div>
            <span className="text-base font-semibold md:text-lg lg:text-xl">워케이션</span>
            {activeCategory === "WORKATION" && (
              <div className="absolute inset-x-0 bottom-0 h-0.5 bg-green-500" />
            )}
          </button>
        </div>
      </div>

      {/* Filters Section */}
      <div className="mt-4 mb-6 flex flex-col gap-3 md:mt-6 md:flex-row md:items-center md:justify-between lg:mt-6 lg:mb-7">
        {/* Sub Category Chips */}
        <div className="scrollbar-hide flex items-center gap-2 overflow-x-auto md:gap-2.5">
          <Chip
            variant={activeSubCategory === "all" ? "active" : "default"}
            onClick={() => setActiveSubCategory("all")}
            className="cursor-pointer whitespace-nowrap text-sm font-semibold md:text-base"
          >
            전체
          </Chip>
          {activeCategory === "DALLAEMFIT" && (
            <>
              <Chip
                variant={activeSubCategory === "OFFICE_STRETCHING" ? "active" : "default"}
                onClick={() => setActiveSubCategory("OFFICE_STRETCHING")}
                className="cursor-pointer whitespace-nowrap text-sm font-medium md:text-base"
              >
                오피스 스트레칭
              </Chip>
              <Chip
                variant={activeSubCategory === "MINDFULNESS" ? "active" : "default"}
                onClick={() => setActiveSubCategory("MINDFULNESS")}
                className="cursor-pointer whitespace-nowrap text-sm font-medium md:text-base"
              >
                마인드풀니스
              </Chip>
            </>
          )}
        </div>

        {/* Filter Dropdowns */}
        <div className="flex items-center justify-end gap-0 text-sm font-medium text-slate-500 md:text-base">
          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger aria-label="지역" className="w-auto border-none px-2">
              <SelectValue placeholder="지역 전체" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">지역 전체</SelectItem>
              {locationOptions.slice(1).map((loc) => (
                <SelectItem key={loc} value={loc}>
                  {loc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={date} onValueChange={setDate}>
            <SelectTrigger aria-label="날짜" className="w-auto border-none px-2">
              <SelectValue placeholder="날짜 전체" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">날짜 전체</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger aria-label="정렬" className="w-auto gap-0.5 border-none px-2">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M8.25 13.5C8.0375 13.5 7.85938 13.4281 7.71563 13.2844C7.57188 13.1406 7.5 12.9625 7.5 12.75C7.5 12.5375 7.57188 12.3594 7.71563 12.2156C7.85938 12.0719 8.0375 12 8.25 12H9.75C9.9625 12 10.1406 12.0719 10.2844 12.2156C10.4281 12.3594 10.5 12.5375 10.5 12.75C10.5 12.9625 10.4281 13.1406 10.2844 13.2844C10.1406 13.4281 9.9625 13.5 9.75 13.5H8.25ZM5.25 9.75C5.0375 9.75 4.85938 9.67813 4.71563 9.53438C4.57188 9.39062 4.5 9.2125 4.5 9C4.5 8.7875 4.57188 8.60938 4.71563 8.46563C4.85938 8.32188 5.0375 8.25 5.25 8.25H12.75C12.9625 8.25 13.1406 8.32188 13.2844 8.46563C13.4281 8.60938 13.5 8.7875 13.5 9C13.5 9.2125 13.4281 9.39062 13.2844 9.53438C13.1406 9.67813 12.9625 9.75 12.75 9.75H5.25ZM3 6C2.7875 6 2.60938 5.92813 2.46563 5.78438C2.32188 5.64062 2.25 5.4625 2.25 5.25C2.25 5.0375 2.32188 4.85938 2.46563 4.71563C2.60938 4.57188 2.7875 4.5 3 4.5H15C15.2125 4.5 15.3906 4.57188 15.5344 4.71563C15.6781 4.85938 15.75 5.0375 15.75 5.25C15.75 5.4625 15.6781 5.64062 15.5344 5.78438C15.3906 5.92813 15.2125 6 15 6H3Z"
                  fill="#4A4A4A"
                />
              </svg>
              <SelectValue placeholder="마감임박" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="deadline">마감임박</SelectItem>
              <SelectItem value="popular">인기순</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Rating Summary */}
      <ReviewsRatingSummary
        averageScore={mockRatingSummary.averageScore}
        totalReviews={mockRatingSummary.totalReviews}
        scoreBreakdown={mockRatingSummary.scoreBreakdown}
      />

      {/* Reviews List / Empty State */}
      <div className="mt-6 lg:mt-8">
        {hasReviews ? (
          <div className="divide-y divide-slate-200 rounded-3xl bg-white p-6 md:rounded-[32px] md:p-8 lg:p-8">
            {filteredReviews.map((review) => (
              <div key={review.id} className="py-6 first:pt-0 last:pb-0">
                <ReviewListItem {...review} />
              </div>
            ))}
          </div>
        ) : (
          <ReviewsEmptyState />
        )}
      </div>
    </div>
  );
}
