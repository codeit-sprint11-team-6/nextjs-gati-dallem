// components/header/AuthAction.tsx
"use client";

import Link from "next/link";
import { Button } from "../common/Button";
import UserProfile from "@/components/user/UserProfile";
import { type UserProfile as UserProfileType } from "@/components/ui/Avatar";
import { LogIn, LogOut } from "lucide-react";

interface AuthActionProps {
  userProfile?: UserProfileType;
  isProfileOpen: boolean;
  setIsProfileOpen: (open: boolean) => void;
  onLogoutUI?: () => void;
  loginHref?: string;
}

export default function AuthAction({
  userProfile,
  isProfileOpen,
  setIsProfileOpen,
  onLogoutUI,
  loginHref = "/signin",
}: AuthActionProps) {
  const isAuthenticated = !!userProfile;

  const onLogout = async () => {
    if (onLogoutUI) {
      onLogoutUI(); // ← 상태 내려받아 토글
      return;
    }
    // (실구현 시)
    // await fetch("/api/auth/logout", { method: "POST" });
    // router.replace("/"); router.refresh();
  };

  return (
    <div className="flex items-center gap-2">
      {isAuthenticated ? (
        <>
          <UserProfile
            userProfile={userProfile}
            isProfileOpen={isProfileOpen}
            setIsProfileOpen={setIsProfileOpen}
            onLogout={onLogoutUI}
          />
          <Button
            type="button"
            onClick={onLogout}
            variant="bare"
            size="sm"
            className="h-12 text-lg text-white md:h-22 lg:h-22"
          >
            <LogOut className="size-4" aria-hidden />
            <span className="hidden md:inline">로그아웃</span>
          </Button>
        </>
      ) : (
        <Button
          asChild
          variant="bare"
          size="sm"
          className="h-12 text-lg text-white md:h-22 lg:h-22"
        >
          <Link href={loginHref} className="flex items-center gap-2">
            <LogIn className="size-4" aria-hidden />
            <span className="leading-none">로그인</span>
          </Link>
        </Button>
      )}
    </div>
  );
}
