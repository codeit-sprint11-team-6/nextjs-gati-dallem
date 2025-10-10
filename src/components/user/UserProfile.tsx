import { cn } from "@/lib/utils";
import Avatar, { type UserProfile } from "@/components/ui/Avatar";
import Link from "next/link";

interface UserProfileProps {
  userProfile?: UserProfile;
  isProfileOpen: boolean;
  setIsProfileOpen: (open: boolean) => void;
}

export default function UserProfile({
  userProfile,
  isProfileOpen,
  setIsProfileOpen,
}: UserProfileProps) {
  return (
    <div className="relative">
      <button
        onClick={() => setIsProfileOpen(!isProfileOpen)}
        className={cn(
          "flex-center rounded-full transition-transform hover:scale-105 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:outline-none",
          "h-8 w-8 md:h-[54px] md:w-[54px] lg:h-14 lg:w-14",
        )}
        aria-label="프로필 메뉴 열기"
      >
        <Avatar
          userProfile={userProfile}
          size="medium"
          className="h-8 w-8 md:h-[44px] md:w-[44px] lg:h-11 lg:w-11"
        />
      </button>

      {isProfileOpen && <ProfileDropdown setIsProfileOpen={setIsProfileOpen} />}
    </div>
  );
}

interface ProfileDropdownProps {
  setIsProfileOpen: (open: boolean) => void;
}

function ProfileDropdown({ setIsProfileOpen }: ProfileDropdownProps) {
  return (
    <div className="absolute right-0 z-50 mt-2 w-48 rounded-md border border-gray-200 bg-white py-1 shadow-lg">
      <Link
        href="/my/profile"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        onClick={() => setIsProfileOpen(false)}
      >
        프로필
      </Link>
      <Link
        href="/my/bookings"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        onClick={() => setIsProfileOpen(false)}
      >
        예약 내역
      </Link>
      <Link
        href="/my/hosted"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        onClick={() => setIsProfileOpen(false)}
      >
        내가 만든 모임
      </Link>
      <hr className="my-1" />
      <Link
        href="/signout"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        onClick={() => setIsProfileOpen(false)}
      >
        로그아웃
      </Link>
    </div>
  );
}
