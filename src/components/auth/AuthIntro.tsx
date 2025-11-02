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
        <div className="mb-2 text-2xl font-semibold text-slate-600">{title}</div>
        <div className="text-4xl font-bold tracking-tight text-slate-800">{subtitle}</div>
        <p className="mt-2 text-base text-slate-500">{description}</p>
      </div>

      <div className="relative mx-auto mt-0 h-64 w-64 sm:h-80 sm:w-80 md:mx-0 md:h-96 md:w-96">
        <Image
          src={imageSrc}
          alt="실시간 협업을 하는 개발자 이미지"
          fill
          className="object-contain"
          priority
          unoptimized
        />
      </div>
    </div>
  );
}
