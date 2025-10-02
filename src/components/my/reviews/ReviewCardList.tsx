"use client";

import { useJoinedGatherings } from "@/apis/gatherings/gatherings.query";
import Chip from "@/components/ui/Chip";
import Image from "next/image";
import { createContext, useContext, useState } from "react";
import UnreviewedCardItem, { UnreviewedCardSkeleton } from "./UnreviewedCardItem";

interface ReviewCardListContextType {
  writable: boolean;
}
const ReviewCardListContext = createContext<ReviewCardListContextType | null>(null);

function useReviewCardList() {
  const context = useContext(ReviewCardListContext);
  if (!context) throw new Error("It must be used within <ReviewCardList />");
  return context;
}

export default function ReviewCardList() {
  const [writable, setWritable] = useState(true);
  return (
    <div className="mt-1 flex w-full flex-col items-start justify-start gap-4">
      <div className="flex-start gap-2.5 lg:ml-2">
        <Chip
          variant={writable ? "active" : "default"}
          onClick={() => !writable && setWritable(true)}
          className="cursor-pointer"
        >
          작성 가능한 리뷰
        </Chip>
        <Chip
          variant={writable ? "default" : "active"}
          onClick={() => writable && setWritable(false)}
          className="cursor-pointer"
        >
          작성한 리뷰
        </Chip>
      </div>
      <ReviewCardListContext.Provider value={{ writable }}>
        <div className="grid w-full justify-stretch gap-4 lg:gap-6">
          {writable && <UnreviewedCardList />}
        </div>
      </ReviewCardListContext.Provider>
    </div>
  );
}

function UnreviewedCardList() {
  const { isLoading, data } = useJoinedGatherings({ completed: true, reviewed: false });
  return isLoading ? (
    <SkeletonList />
  ) : data?.length === 0 ? (
    <EmptyList />
  ) : (
    <>
      {data?.map((card) => (
        <UnreviewedCardItem key={card.id} {...card} />
      ))}
    </>
  );
}

function EmptyList() {
  const { writable } = useReviewCardList();
  return (
    <div className="flex-center flex-col">
      <div className="flex-center relative mb-6 h-24 w-24 sm:h-32 sm:w-32">
        <Image src="/image/empty.svg" alt="빈 페이지 표시 이미지" fill className="object-contain" />
      </div>
      <h3 className="mb-2 text-sm font-semibold text-gray-400 md:text-lg">
        {writable ? "작성할 수 있는 리뷰가 없어요" : "작성한 리뷰가 없어요"}
      </h3>
    </div>
  );
}

function SkeletonList() {
  const { writable } = useReviewCardList();
  return (
    <div className="grid w-full justify-stretch gap-4 lg:mt-2 lg:gap-6">
      {Array(5)
        .fill(undefined)
        .map((_, idx) => writable && <UnreviewedCardSkeleton key={idx} />)}
    </div>
  );
}
