"use client";

import { useGatherings } from "@/apis/gatherings/gatherings.query";
import { selectUser, useAuthStore } from "@/store/authStore";
import Image from "next/image";
import CreatedCardItem, { CreatedCardSkeleton } from "./CreatedCardItem";

export default function CreatedCardList() {
  const user = useAuthStore(selectUser);
  const { isLoading, data } = useGatherings({ createdBy: user?.id });

  return isLoading ? (
    <SkeletonList />
  ) : data?.length === 0 ? (
    <EmptyList />
  ) : (
    <div className="grid w-full justify-stretch gap-4 lg:mt-2 lg:gap-6">
      {data?.map((item) => (
        <CreatedCardItem key={item.id} {...item} />
      ))}
    </div>
  );
}

function EmptyList() {
  return (
    <div className="flex-center mt-18 flex-col lg:mt-24">
      <div className="flex-center relative mb-6 h-24 w-24 sm:h-32 sm:w-32">
        <Image src="/image/empty.svg" alt="빈 페이지 표시 이미지" fill className="object-contain" />
      </div>
      <h3 className="mb-2 text-sm font-semibold text-gray-400 md:text-lg">
        아직 만든 모임이 없어요
      </h3>
    </div>
  );
}

function SkeletonList() {
  return (
    <div className="grid w-full justify-stretch gap-4 lg:mt-2 lg:gap-6">
      {Array(5)
        .fill(undefined)
        .map((_, idx) => (
          <CreatedCardSkeleton key={idx} />
        ))}
    </div>
  );
}
