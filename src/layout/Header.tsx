// src/layout/Header.tsx
"use client";

import Logo from "@/components/header/Logo";
import Navigation, { type NavigationItem } from "@/components/header/Navigation";
import type { UserProfile } from "@/components/ui/Avatar";
import AuthAction from "@/components/header/AuthAction";
import { useAuthUser, useSignout } from "@/apis/auths/auths.query";
import { useAuthToken } from "@/hooks/auths/useAuthToken";
import { meKey } from "@/apis/_react_query/keys";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

interface HeaderProps {
  favoriteCount?: number;
  userProfile?: UserProfile;
  logoAltText?: string;
  className?: string;
}

/**
 * Header
 * - 토큰 기준으로 로그인 여부 판단
 * - /me를 즉시 재검증하여 프로필/401 상태 반영
 */

export default function Header({ logoAltText }: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const token = useAuthToken(); // 로그인 여부는 '토큰'으로 즉시 판단
  const isAuthed = !!token; // 토큰이 있을 때만 /me 조회

  const q = useAuthUser<UserProfile | null>({
    enabled: isAuthed,
    retry: 0,
    refetchOnWindowFocus: false, // 포커스 때 깜빡임 원인이면 꺼두기
    refetchOnMount: "always", // 재시작/첫 렌더에서 꼭 새로 가져오게
    staleTime: 0,
    queryKey: meKey(isAuthed), // 세션 상태(authed/guest)에 따라 key 구분
  });

  const { data: me, isLoading, isFetching, isSuccess, isError, isStale } = q;

  const loadingProfile = isAuthed && (isLoading || isFetching);
  const isUnauthorized = isAuthed && isSuccess && !loadingProfile && !isStale && me === null;
  const errorProfile = isAuthed && !loadingProfile && isError && me === undefined;
  const profile = me ?? undefined; // 렌더용

  const { mutateAsync: signout } = useSignout();
  const onLogout = async () => {
    await signout();
    router.replace("/");
    router.refresh();
  };

  const navigationItems: NavigationItem[] = [
    { label: "모임 찾기", href: "/meetings", isActive: pathname === "/meetings" },
    ...(isAuthed
      ? [{ label: "찜한 모임", href: "/favorites", isActive: pathname === "/favorites" }]
      : []),
    { label: "모든 리뷰", href: "/reviews", isActive: pathname === "/reviews" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-gray-700 bg-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 3단계 반응형 디자인: Mobile(0-767px) | Tablet(768-1023px) | Desktop(1024px+) */}
        <div className="flex-between h-12 md:h-22 lg:h-22">
          <div className="flex-center h-12 md:h-22 lg:h-22">
            <Logo altText={logoAltText} />
            <Navigation items={navigationItems} />
          </div>
          {isAuthed && loadingProfile ? (
            <div className="h-10 w-28 animate-pulse rounded-md bg-gray-700" />
          ) : (
            <AuthAction
              authed={isAuthed}
              loadingProfile={loadingProfile}
              userProfile={profile}
              isUnauthorized={isUnauthorized}
              errorProfile={errorProfile}
              isProfileOpen={isProfileOpen}
              setIsProfileOpen={setIsProfileOpen}
              onLogoutUI={onLogout}
              loginHref="/signin"
            />
          )}
        </div>
      </div>
    </header>
  );
}
