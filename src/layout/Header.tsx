'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Logo from '@/components/header/Logo';
import Navigation, { NavigationItem } from '@/components/header/Navigation';
import UserProfile from '@/components/user/UserProfile';
import { type UserProfile as UserProfileType } from '@/components/ui/Avatar';

interface HeaderProps {
  favoriteCount?: number;
  userProfile?: UserProfileType;
  logoSrc?: string;
  logoAltText?: string;
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