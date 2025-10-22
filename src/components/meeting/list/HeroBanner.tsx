import Image from "next/image";
import { cn } from "@/lib/utils";

interface HeroBannerProps {
  title?: string;
  subtitle?: string;
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
}

export default function HeroBanner({
  title = "함께할 사람을 찾고 계신가요?",
  subtitle = "지금 모임에 참여해보세요",
  imageSrc = "/image/Banner-Icon.svg",
  imageAlt = "모임 배너 일러스트",
  className,
}: HeroBannerProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden h-48 px-5 md:h-auto md:rounded-2xl md:p-8 lg:rounded-3xl lg:p-12",
        "bg-gradient-to-r from-purple-50 to-teal-50",
        "-mx-4 md:mx-0",
        className,
      )}
    >
      <div className="relative z-10 flex h-full items-center justify-center gap-6 py-5 md:justify-between md:py-0">
        <div className="flex flex-1 items-center justify-start md:items-start md:justify-start">
          <div className="text-left">
            <p className="mb-1 text-sm text-purple-600 md:mb-2 md:text-base lg:text-lg">함께할 사람을 찾고 계신가요?</p>
            <h2 className="text-lg leading-tight font-bold text-gray-900 md:text-2xl lg:text-4xl">
              {subtitle}
            </h2>
          </div>
        </div>

        <div className="relative h-32 w-32 flex-shrink-0 md:h-48 md:w-48 lg:h-64 lg:w-64">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-contain"
            sizes="(min-width: 1024px) 256px, (min-width: 768px) 192px, 128px"
            priority
          />
        </div>
      </div>
    </section>
  );
}
