// src/components/auth/AuthIntro.tsx

import Image from "next/image";

type AuthIntroProps = {
  title: string;
  subtitle: string;
  description: string;
  imageSrc?: string;
};

export default function AuthIntro({
  title,
  subtitle,
  description,
  imageSrc = "/image/real-time-focus.svg",
}: AuthIntroProps) {
  return (
    <div className="pt-4 text-center select-none md:text-left">
      <div className="pt-0">
        <div className="mb-2 text-2xl font-semibold text-slate-600 dark:text-slate-400">
          {title}
        </div>
        <div className="text-4xl font-bold tracking-tight text-slate-800 dark:text-slate-100">
          {subtitle}
        </div>
        <p className="mt-2 text-base text-slate-500 dark:text-slate-400">{description}</p>
      </div>

      <div className="relative mx-auto mt-0 h-64 w-64 sm:h-80 sm:w-80 md:mx-0 md:h-96 md:w-96">
        {/* 라이트 모드 */}
        <div className="dark:hidden">
          <Image
            src="/image/real-time-focus.svg"
            alt="실시간 협업을 하는 개발자 이미지"
            fill
            className="object-contain"
            priority
            unoptimized
          />
        </div>
        {/* 다크 모드 */}
        <div className="hidden dark:block">
          <Image
            src="/image/dark-real-time-focus.svg"
            alt="실시간 협업을 하는 개발자 이미지 (다크모드)"
            fill
            className="object-contain"
            priority
            unoptimized
          />
        </div>
      </div>
    </div>
  );
}
