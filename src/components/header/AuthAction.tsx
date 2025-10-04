// components/header/AuthAction.tsx
"use client";

import Link from "next/link";
import { Button } from "../ui/Button";
import UserProfile from "@/components/user/UserProfile";
import { type UserProfile as UserProfileType } from "@/components/ui/Avatar";
import { LogIn, LogOut } from "lucide-react";

interface AuthActionProps {
  authed: boolean;
  userProfile?: UserProfileType;
  isUnauthorized?: boolean; // me === null
  errorProfile?: boolean; // 선택 (네트워크 등 기타 에러)
  isProfileOpen: boolean;
  setIsProfileOpen: (open: boolean) => void;
  onLogoutUI?: () => void;
  loginHref?: string;
  loadingProfile?: boolean;
}

/**
 * AuthAction
 * - 로그인 상태에 따라 로그인/로그아웃 버튼 및 프로필 노출
 * - 401(Unauthorized), 에러, 로딩 상태 구분 렌더링
 */

export default function AuthAction({
  authed,
  userProfile,
  isUnauthorized = false,
  errorProfile = false,
  isProfileOpen,
  setIsProfileOpen,
  onLogoutUI,
  loginHref = "/signin",
  loadingProfile = false,
}: AuthActionProps) {
  const onLogout = async () => {
    if (onLogoutUI) await onLogoutUI();
  };

  console.debug("[AuthAction]", {
    authed,
    loadingProfile,
    hasProfile: !!userProfile,
    isUnauthorized,
    errorProfile,
  });

  return (
    <div className="flex items-center gap-2">
      {/* 1) 비로그인 */}
      {/* {!authed && ( */}
      {!authed && !loadingProfile && (
        <Button
          asChild
          variant="destructive"
          size="sm"
          className="h-12 text-lg text-white md:h-22 lg:h-22"
        >
          <Link href={loginHref} className="flex items-center gap-2">
            <LogIn className="size-4" aria-hidden />
            <span className="leading-none">로그인</span>
          </Link>
        </Button>
      )}

      {/* 2) 프로필 로딩 중 */}
      {loadingProfile && <div className="h-10 w-28 animate-pulse rounded-md bg-gray-700" />}
      {/* 3) 로그인 + 프로필 준비 완료 */}
      {authed && !loadingProfile && userProfile && (
        <>
          <UserProfile
            userProfile={userProfile}
            isProfileOpen={isProfileOpen}
            setIsProfileOpen={setIsProfileOpen}
          />
          <Button
            type="button"
            onClick={onLogout}
            variant="destructive"
            size="sm"
            className="h-12 text-lg text-white md:h-22 lg:h-22"
          >
            <LogOut className="size-4" aria-hidden />
            로그아웃
          </Button>
        </>
      )}
      {/* 4) 로그인은 되었지만 토큰이 만료된 경우 (me === null) */}
      {authed && !loadingProfile && isUnauthorized && (
        <Button
          asChild
          variant="destructive"
          size="sm"
          className="h-12 text-lg text-white md:h-22 lg:h-22"
        >
          <Link href="/signin">다시 로그인</Link>
        </Button>
      )}
      {/* (선택) 5) 기타 에러 시 재시도 버튼/메시지 - 테스트 후 삭제하기 */}
      {authed && !loadingProfile && errorProfile && (
        <Button asChild variant="secondary" size="sm" className="h-12 text-lg">
          <Link href="#" onClick={() => location.reload()}>
            프로필 불러오기 실패 • 새로고침
          </Link>
        </Button>
      )}
    </div>
  );
}
