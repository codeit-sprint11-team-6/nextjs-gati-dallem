import Image from "next/image";

export default function ReviewsEmptyState() {
  return (
    <div className="flex min-h-[190px] items-center justify-center rounded-3xl bg-white px-6 py-6 md:min-h-[240px] md:rounded-[32px] md:px-22 md:py-[41px] lg:min-h-[299px] lg:px-[531px] lg:py-[41px]">
      <div className="flex w-[217px] flex-col items-center gap-6 md:gap-0">
        <div className="relative h-[115px] w-[171px]">
          <Image
            src="/image/empty.svg"
            alt="리뷰 없음"
            width={171}
            height={136}
            className="h-auto w-full object-contain"
          />
        </div>
        <p className="text-center text-sm font-semibold leading-7 text-slate-400 md:text-lg">
          아직 리뷰가 없어요
        </p>
      </div>
    </div>
  );
}
