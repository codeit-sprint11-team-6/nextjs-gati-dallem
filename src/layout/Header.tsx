'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface UserProfile {
  teamId: number;
  id: number;
  email: string;
  name: string;
  companyName: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

interface HeaderProps {
  favoriteCount?: number;
  userProfile?: UserProfile;
  logoSrc?: string;
  logoAltText?: string;
}

interface NavigationItem {
  label: string;
  href: string;
  isActive: boolean;
}

export default function Header({ favoriteCount = 0, userProfile, logoSrc, logoAltText }: HeaderProps) {
  const pathname = usePathname();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navigationItems: NavigationItem[] = [
    { label: '모임 찾기', href: '/meetings', isActive: pathname === '/meetings' },
    { label: '찜한 모임', href: '/favorites', isActive: pathname === '/favorites' },
    { label: '모든 리뷰', href: '/reviews', isActive: pathname === '/reviews' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 3단계 반응형 디자인: Mobile(0-767px) | Tablet(768-1023px) | Desktop(1024px+) */}
        <div className="flex items-center justify-between h-12 md:h-22 lg:h-22">
          <div className="flex items-center h-8 md:h-14 lg:h-14">
            <Logo logoSrc={logoSrc} altText={logoAltText} />
            <Navigation 
              items={navigationItems} 
              favoriteCount={favoriteCount} 
            />
          </div>
          <UserProfile 
            userProfile={userProfile}
            isProfileOpen={isProfileOpen}
            setIsProfileOpen={setIsProfileOpen}
          />
        </div>
      </div>
    </header>
  );
}

// Logo Component - 3단계 반응형 (이미지/텍스트 지원)
interface LogoProps {
  logoSrc?: string;
  altText?: string;
}

function Logo({ logoSrc, altText = "같이달램" }: LogoProps) {
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

// Navigation Component - 반응형으로 통합
interface NavigationProps {
  items: NavigationItem[];
  favoriteCount: number;
}

function Navigation({ items, favoriteCount }: NavigationProps) {
  return (
    <nav className="flex items-center h-8 md:h-12 lg:h-14 space-x-1">
      {items.map((item) => (
        <NavigationLink 
          key={item.href}
          item={item}
          favoriteCount={favoriteCount}
        />
      ))}
    </nav>
  );
}

// Navigation Link - 반응형 스타일 통합
interface NavigationLinkProps {
  item: NavigationItem;
  favoriteCount: number;
}

function NavigationLink({ item, favoriteCount }: NavigationLinkProps) {
  const linkClasses = cn(
    // Base styles
    "flex items-center justify-center transition-colors duration-200 font-['Pretendard']",
    // Responsive sizing
    "h-8 md:h-14 lg:h-14 px-2 md:px-3 lg:px-4 text-xs md:text-base lg:text-base",
    // Active/Inactive states
    item.isActive 
      ? "text-[#4d59d5] font-semibold md:font-semibold lg:font-bold"
      : "text-[#737373] hover:text-gray-700 font-medium"
  );

  return (
    <Link href={item.href} className={linkClasses}>
      {item.label === '찜한 모임' ? (
        <FavoriteItem 
          label={item.label} 
          count={favoriteCount} 
        />
      ) : (
        <span>{item.label}</span>
      )}
    </Link>
  );
}

// Favorite Item - 반응형 배지 통합
interface FavoriteItemProps {
  label: string;
  count: number;
}

function FavoriteItem({ label, count }: FavoriteItemProps) {
  return (
    <div className="flex items-center gap-1 md:gap-1.5 lg:gap-2">
      <span>{label}</span>
      {count > 0 && (
        <span className={cn(
          "bg-[#5865f2] text-white font-semibold flex items-center justify-center rounded-full",
          "w-3 h-3 md:w-5 md:h-[18px] lg:w-5 lg:h-[18px]",
          "text-[10px] md:text-xs lg:text-xs leading-[11px] md:leading-4 lg:leading-4"
        )}>
          {count > 99 ? '99+' : count}
        </span>
      )}
    </div>
  );
}

// User Profile Component
interface UserProfileProps {
  userProfile?: UserProfile;
  isProfileOpen: boolean;
  setIsProfileOpen: (open: boolean) => void;
}

function UserProfile({ userProfile, isProfileOpen, setIsProfileOpen }: UserProfileProps) {
  return (
    <div className="relative">
      <button
        onClick={() => setIsProfileOpen(!isProfileOpen)}
        className={cn(
          "flex items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform hover:scale-105",
          "w-8 h-8 md:w-[54px] md:h-[54px] lg:w-14 lg:h-14"
        )}
        aria-label="프로필 메뉴 열기"
      >
        <ProfileAvatar userProfile={userProfile} />
      </button>

      {isProfileOpen && (
        <ProfileDropdown setIsProfileOpen={setIsProfileOpen} />
      )}
    </div>
  );
}

// Profile Avatar Component
interface ProfileAvatarProps {
  userProfile?: UserProfile;
}

function ProfileAvatar({ userProfile }: ProfileAvatarProps) {
  return (
    <div className={cn(
      "bg-gray-200 rounded-full flex items-center justify-center overflow-hidden border border-gray-300",
      "w-8 h-8 md:w-[44px] md:h-[44px] lg:w-11 lg:h-11"
    )}>
      {userProfile?.image && userProfile.image.trim() !== '' ? (
        <Image
          src={userProfile.image}
          alt={userProfile.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 32px, (max-width: 1024px) 44px, 44px"
        />
      ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
          <span className="text-white font-semibold text-xs md:text-xs lg:text-sm">
            {userProfile?.name?.charAt(0) || 'U'}
          </span>
        </div>
      )}
    </div>
  );
}

// Profile Dropdown Component
interface ProfileDropdownProps {
  setIsProfileOpen: (open: boolean) => void;
}

function ProfileDropdown({ setIsProfileOpen }: ProfileDropdownProps) {
  return (
    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200 animate-in fade-in-0 zoom-in-95 duration-200">
      <Link
        href="/my"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
        onClick={() => setIsProfileOpen(false)}
      >
        마이페이지
      </Link>
      <button
        onClick={() => {
          // 로그아웃 로직
          setIsProfileOpen(false);
        }}
        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
      >
        로그아웃
      </button>
    </div>
  );
}
