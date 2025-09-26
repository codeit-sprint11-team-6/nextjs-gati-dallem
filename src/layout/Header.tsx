"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Logo from "@/components/header/Logo";
import Navigation, { NavigationItem } from "@/components/header/Navigation";
// import UserProfile from "@/components/user/UserProfile";
import { type UserProfile as UserProfileType } from "@/components/ui/Avatar";
import AuthAction from "@/components/header/AuthAction";

interface HeaderProps {
  favoriteCount?: number;
  userProfile?: UserProfileType;
  logoAltText?: string;
}

export default function Header({ favoriteCount = 0, userProfile, logoAltText }: HeaderProps) {
  const pathname = usePathname();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [devLoggedIn, setDevLoggedIn] = useState(true); // 토글

  // 최소 필드만 가진 더미 유저
  const mockUser: UserProfileType = {
    name: "Anna",
    email: "anna@example.com",
    image: "", // 없으면 예외처리
  } as UserProfileType;

  const navigationItems: NavigationItem[] = [
    { label: "모임 찾기", href: "/meetings", isActive: pathname === "/meetings" },
    { label: "찜한 모임", href: "/favorites", isActive: pathname === "/favorites" },
    { label: "모든 리뷰", href: "/reviews", isActive: pathname === "/reviews" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-gray-700 bg-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 3단계 반응형 디자인: Mobile(0-767px) | Tablet(768-1023px) | Desktop(1024px+) */}
        <div className="flex-between h-12 md:h-22 lg:h-22">
          <div className="flex-center h-12 md:h-22 lg:h-22">
            <Logo altText={logoAltText} />
            <Navigation items={navigationItems} favoriteCount={favoriteCount} />
          </div>
          {/* <UserProfile
            userProfile={userProfile}
            isProfileOpen={isProfileOpen}
            setIsProfileOpen={setIsProfileOpen}
          /> */}
          <AuthAction
            // userProfile={userProfile}
            userProfile={devLoggedIn ? mockUser : undefined}
            onLogoutUI={() => setDevLoggedIn(false)}
            isProfileOpen={isProfileOpen}
            setIsProfileOpen={setIsProfileOpen}
          />
          {/* 개발용 토글 버튼 (나중에 제거) */}
          {/* <button
            type="button"
            onClick={() => setDevLoggedIn((v) => !v)}
            className="fixed bottom-3 left-3 z-[9999] rounded bg-gray-800 px-3 py-1 text-xs text-white"
          >
            Mock {devLoggedIn ? "Logout" : "Login"}
          </button> */}
        </div>
      </div>
    </header>
  );
}
