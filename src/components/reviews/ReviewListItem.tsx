import Image from "next/image";
import Avatar from "@/components/ui/Avatar";
import { formatDate } from "@/utils/datetime";
import type { Review } from "@/types/review";

const DISPLAY_DATE_FALLBACK = "날짜 없음";

const formatCreatedAt = (value?: string) => {
  if (!value) return DISPLAY_DATE_FALLBACK;

  try {
    return formatDate(value);
  } catch {
    return DISPLAY_DATE_FALLBACK;
  }
};

export default function ReviewListItem({
  User,
  Gathering,
  score,
  createdAt,
  comment,
}: Review) {
  const formattedCreatedAt = formatCreatedAt(createdAt);

  return (
    <div className="flex flex-col justify-center bg-white md:h-[200px] md:flex-row md:items-center md:gap-8">
      {/* Image Section - Desktop & Tablet */}
      {Gathering.image && (
        <div className="relative hidden aspect-square w-20 shrink-0 overflow-hidden rounded-xl md:block md:h-[200px] md:w-[200px] md:rounded-3xl lg:h-[200px] lg:w-[296px]">
          <Image
            src={Gathering.image}
            alt="모임 이미지"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 80px, (max-width: 1024px) 200px, 296px"
          />
        </div>
      )}

      {/* Content Section */}
      <div className="flex flex-1 flex-col gap-8 md:justify-center md:py-2 lg:gap-8">
        {/* User Info & Rating */}
        <div className="flex flex-col gap-4">
          {/* User Profile */}
          <div className="flex items-center gap-3">
            <Avatar
              userProfile={
                User.image
                  ? {
                      teamId: User.teamId,
                      id: User.id,
                      email: "",
                      name: User.name,
                      companyName: "",
                      image: User.image,
                      createdAt: "",
                      updatedAt: "",
                    }
                  : undefined
              }
              size="small"
              type="female"
            />
            <div className="flex flex-col gap-1">
              <p className="text-sm leading-5 font-medium text-slate-500">{User.name}</p>
              <div className="flex items-center gap-2">
                {/* Heart Score */}
                <div className="flex items-center gap-[1px]">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <div key={idx} className="relative h-5 w-5 md:h-6 md:w-6">
                      <Image
                        src={`/icon/heart_${score >= idx + 1 ? "active" : "inactive"}.svg`}
                        alt={`${idx + 1}번째 하트`}
                        fill
                        className="object-contain"
                      />
                    </div>
                  ))}
                </div>
                <span className="text-sm leading-5 font-normal text-slate-400">
                  {formattedCreatedAt}
                </span>
              </div>
            </div>
          </div>

          {/* Gathering Info */}
          <div className="flex items-center gap-2 pl-1">
            <div className="h-4 w-[3px] bg-slate-200" />
            <p className="text-base leading-6 font-medium text-slate-400">
              {Gathering.name} · {Gathering.location}
            </p>
          </div>
        </div>

        {/* Mobile Image */}
        {Gathering.image && (
          <div className="flex items-center gap-3 md:hidden">
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl">
              <Image
                src={Gathering.image}
                alt="모임 이미지"
                fill
                className="object-cover"
                sizes="80px"
              />
            </div>
            <div className="flex-1">
              <p className="line-clamp-4 text-sm leading-5 font-medium text-gray-700 md:text-base md:leading-6">
                {comment}
              </p>
            </div>
          </div>
        )}

        {/* Comment - Desktop & Tablet */}
        <div className="hidden md:block">
          <p className="line-clamp-2 text-base leading-6 font-medium text-gray-700 lg:text-base lg:leading-6">
            {comment}
          </p>
        </div>
      </div>
    </div>
  );
}
