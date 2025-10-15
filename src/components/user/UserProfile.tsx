import Avatar, { type UserProfile } from "@/components/ui/Avatar";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface UserProfileProps {
  userProfile?: UserProfile;
  isProfileOpen: boolean;
  setIsProfileOpen: (open: boolean) => void;
  onLogout?: () => void;
}

export default function UserProfile({
  userProfile,
  isProfileOpen,
  setIsProfileOpen,
  onLogout,
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

      {isProfileOpen && <ProfileDropdown setIsProfileOpen={setIsProfileOpen} onLogout={onLogout} />}
    </div>
  );
}

interface ProfileDropdownProps {
  setIsProfileOpen: (open: boolean) => void;
  onLogout?: () => void;
}

function ProfileDropdown({ setIsProfileOpen, onLogout }: ProfileDropdownProps) {
  const handleLogout = () => {
    setIsProfileOpen(false);
    onLogout?.();
  };

  return (
    <div className="absolute right-0 z-50 mt-2 w-48 overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg">
      <Link
        href="/my/bookings?profileEdit=true"
        className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
        onClick={() => setIsProfileOpen(false)}
      >
        내 정보 수정
      </Link>
      <hr className="border-slate-200" />
      <Link
        href="/my/bookings"
        className="block px-4 pt-3 pb-2 text-sm text-gray-700 hover:bg-gray-100"
        onClick={() => setIsProfileOpen(false)}
      >
        참여 내역
      </Link>
      <Link
        href="/my/reviews?writable=true"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        onClick={() => setIsProfileOpen(false)}
      >
        리뷰 작성
      </Link>
      <Link
        href="/my/hosted"
        className="block px-4 pt-2 pb-3 text-sm text-gray-700 hover:bg-gray-100"
        onClick={() => setIsProfileOpen(false)}
      >
        내가 만든 모임
      </Link>
      <hr className="h-2 border-y-1 border-slate-200 bg-slate-100" />
      <button
        type="button"
        className="block w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-100"
        onClick={handleLogout}
      >
        로그아웃
      </button>
    </div>
  );
}
