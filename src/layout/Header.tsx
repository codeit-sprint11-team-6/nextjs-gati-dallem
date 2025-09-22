'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

interface HeaderProps {
  favoriteCount?: number;
  userProfile?: {
    name: string;
    image?: string;
  };
}

export default function Header({ favoriteCount = 0, userProfile }: HeaderProps) {
  const pathname = usePathname();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navigationItems = [
    { label: '모임 찾기', href: '/meetings', isActive: pathname === '/meetings' },
    { label: '찜한 모임', href: '/favorites', isActive: pathname === '/favorites' },
    { label: '모든 리뷰', href: '/reviews', isActive: pathname === '/reviews' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Figma 디자인: 전체 높이 88px, 내부 프레임 56px */}
        <div className="flex items-center justify-between h-[88px]">
          <div className="flex items-center h-14">
            {/* 로고 - Figma: 112px × 39px */}
            <div className="flex-shrink-0 mr-8">
              <Link href="/" className="flex items-center">
              {/* 임시로 인라인 스타일 사용 */}
                <span 
                  className="tenada text-gray-900"
                  style={{ 
                    fontSize: '24px', 
                    lineHeight: '30px',
                    letterSpacing: '-1.44px'
                  }}
                >
                  같이달램
                </span>
              </Link>
            </div>

            {/* 네비게이션 메뉴 - Figma: 56px 높이, 16px 폰트 */}
            <nav className="hidden md:flex items-center h-14">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-center h-14 px-4 text-base transition-colors duration-200 ${
                    item.isActive
                      ? 'text-[#009973]'
                      : 'text-[#737373] hover:text-gray-700'
                  }`}
                  style={{ 
                    fontSize: '16px', 
                    lineHeight: '24px', 
                    letterSpacing: '-0.48px',
                    fontWeight: item.isActive ? '700' : '500'
                  }}
                >
                  {/* 찜한 모임의 경우 텍스트와 배지를 수평으로 정렬 */}
                  {item.label === '찜한 모임' ? (
                    <div className="flex items-center gap-2">
                      <span>{item.label}</span>
                      {favoriteCount > 0 && (
                        <span 
                          className="bg-[#00bb86] text-white font-semibold flex items-center justify-center"
                          style={{ 
                            width: '20px', 
                            height: '18px', 
                            borderRadius: '8.5px',
                            fontSize: '12px',
                            lineHeight: '16px'
                          }}
                        >
                          {favoriteCount > 99 ? '99+' : favoriteCount}
                        </span>
                      )}
                    </div>
                  ) : (
                    <span>{item.label}</span>
                  )}
                </Link>
              ))}
            </nav>
          </div>

          {/* 프로필 - Figma: 54px × 54px */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center justify-center w-[54px] h-[54px] rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <div className="w-[44px] h-[44px] bg-gray-200 rounded-full flex items-center justify-center overflow-hidden border border-gray-300">
                {userProfile?.image ? (
                  <img
                    src={userProfile.image}
                    alt={userProfile.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {userProfile?.name?.charAt(0) || 'U'}
                    </span>
                  </div>
                )}
              </div>
            </button>

            {/* 프로필 드롭다운 */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                <Link
                  href="/my"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsProfileOpen(false)}
                >
                  마이페이지
                </Link>
                <button
                  onClick={() => {
                    // 로그아웃 로직
                    setIsProfileOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  로그아웃
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
