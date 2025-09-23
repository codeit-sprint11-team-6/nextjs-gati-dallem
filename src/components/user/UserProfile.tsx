import { cn } from '@/lib/utils';
import Avatar, { type UserProfile } from '@/components/ui/Avatar';

interface UserProfileProps {
  userProfile?: UserProfile;
  isProfileOpen: boolean;
  setIsProfileOpen: (open: boolean) => void;
}

export default function UserProfile({ userProfile, isProfileOpen, setIsProfileOpen }: UserProfileProps) {
  return (
    <div className="relative">
      <button
        onClick={() => setIsProfileOpen(!isProfileOpen)}
        className={cn(
          "flex-center rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-transform hover:scale-105",
          "w-8 h-8 md:w-[54px] md:h-[54px] lg:w-14 lg:h-14"
        )}
        aria-label="프로필 메뉴 열기"
      >
        <Avatar
          userProfile={userProfile} 
          size="medium"
          className="w-8 h-8 md:w-[44px] md:h-[44px] lg:w-11 lg:h-11"
        />
      </button>

      {isProfileOpen && (
        <ProfileDropdown setIsProfileOpen={setIsProfileOpen} />
      )}
    </div>
  );
}

interface ProfileDropdownProps {
  setIsProfileOpen: (open: boolean) => void;
}

function ProfileDropdown({ setIsProfileOpen }: ProfileDropdownProps) {
  return (
    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
      <a
        href="/my/profile"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        onClick={() => setIsProfileOpen(false)}
      >
        프로필
      </a>
      <a
        href="/my/bookings"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        onClick={() => setIsProfileOpen(false)}
      >
        예약 내역
      </a>
      <a
        href="/my/hosted"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        onClick={() => setIsProfileOpen(false)}
      >
        내가 만든 모임
      </a>
      <hr className="my-1" />
      <a
        href="/signout"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        onClick={() => setIsProfileOpen(false)}
      >
        로그아웃
      </a>
    </div>
  );
}