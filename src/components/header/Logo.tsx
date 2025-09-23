import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
  logoSrc?: string;
  altText?: string;
}

export default function Logo({ logoSrc, altText = "같이달램" }: LogoProps) {
  return (
    <div className="flex-shrink-0 mr-1 md:mr-4 lg:mr-4">
      <Link href="/" className="flex items-center">
        {logoSrc ? (
          // 이미지 로고 사용 시 (Next.js Image 최적화)
          <Image
            src={logoSrc}
            alt={altText}
            width={0}
            height={0}
            sizes="(max-width: 768px) 64px, (max-width: 1024px) 96px, 128px"
            className="h-4 md:h-6 lg:h-8 w-auto object-contain"
            priority
          />
        ) : (
          // 텍스트 로고 사용 시 (현재)
          <>
            <span className="text-gray-900 font-semibold font-['Pretendard'] md:hidden" style={{ fontSize: '12px', lineHeight: '16px', letterSpacing: '-0.72px' }}>
              {altText}
            </span>
            <span className="text-gray-900 md:text-lg lg:text-2xl font-semibold font-['Pretendard'] tracking-normal md:tracking-tight lg:tracking-tight hidden md:block">
              {altText}
            </span>
          </>
        )}
      </Link>
    </div>
  );
}
