"use client";

import { useJoinedGatherings } from "@/apis/gatherings/gatherings.query";
import Image from "next/image";
import ReservedCardItem from "./ReservedCardItem";
import ReservedCardSkeleton from "./ReservedCardSkeleton";

export default function ReservedCardList() {
  const { isLoading, data } = useJoinedGatherings();
  return isLoading ? (
    <SkeletonList />
  ) : data?.length === 0 ? (
    <EmptyList />
  ) : (
    <div className="grid w-full justify-stretch gap-4 lg:gap-6">
      {data?.map((item) => (
        <ReservedCardItem key={item.id} {...item} />
      ))}
    </div>
  );
}

function EmptyList() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="relative mb-6 flex h-24 w-24 items-center justify-center sm:h-32 sm:w-32">
        <Image
          src="/image/empty.svg"
          alt="리뷰가 없음"
          fill
          className="object-contain opacity-30"
        />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-gray-400">아직 리뷰가 없어요</h3>
    </div>
  );
}

function SkeletonList() {
  return (
    <div className="grid w-full justify-stretch gap-4 lg:gap-6">
      {Array(10)
        .fill(undefined)
        .map((_, idx) => (
          <ReservedCardSkeleton key={idx} />
        ))}
    </div>
  );
}
