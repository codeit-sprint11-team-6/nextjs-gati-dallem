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
        "relative overflow-hidden rounded-3xl p-8 md:p-12",
        "bg-gradient-to-r from-purple-50 to-teal-50",
        className,
      )}
    >
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center md:text-left">
            <p className="mb-2 text-lg text-purple-600">함께할 사람을 찾고 계신가요?</p>
            <h2 className="text-3xl leading-tight font-bold text-gray-900 md:text-4xl">
              {subtitle}
            </h2>
          </div>
        </div>

        <div className="relative h-48 w-48 flex-shrink-0 md:h-56 md:w-56">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-contain"
            sizes="(min-width: 768px) 224px, 192px"
            priority
          />
        </div>
      </div>
    </section>
  );
}
