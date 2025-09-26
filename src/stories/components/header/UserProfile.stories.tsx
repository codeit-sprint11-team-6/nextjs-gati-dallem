import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import UserProfile from "@/components/user/UserProfile";
import { type UserProfile as UserProfileType } from "@/components/ui/Avatar";

const meta = {
  title: "Components/Header/UserProfile",
  component: UserProfile,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    isProfileOpen: {
      control: { type: "boolean" },
      description: "프로필 드롭다운 열림 상태",
    },
    setIsProfileOpen: {
      action: "setIsProfileOpen",
      description: "프로필 드롭다운 상태 변경 함수",
    },
  },
} satisfies Meta<typeof UserProfile>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 사용자 프로필 (드롭다운 닫힘)
export const Default: Story = {
  args: {
    userProfile: {
      teamId: 1,
      id: 1,
      email: "user@example.com",
      name: "김철수",
      companyName: "테크회사",
      image: "",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    },
    isProfileOpen: false,
    setIsProfileOpen: fn(),
  },
};

// 프로필 드롭다운 열림 상태
export const DropdownOpen: Story = {
  args: {
    userProfile: {
      teamId: 1,
      id: 1,
      email: "user@example.com",
      name: "김철수",
      companyName: "테크회사",
      image: "",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    },
    isProfileOpen: true,
    setIsProfileOpen: fn(),
  },
};

// 사용자 프로필 정보 없음 (기본 아바타)
export const NoUserProfile: Story = {
  args: {
    userProfile: undefined,
    isProfileOpen: false,
    setIsProfileOpen: fn(),
  },
};

// 긴 이름의 사용자
export const LongName: Story = {
  args: {
    userProfile: {
      teamId: 1,
      id: 1,
      email: "verylongname@example.com",
      name: "매우긴이름을가진사용자",
      companyName: "매우긴회사이름을가진회사",
      image: "",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    },
    isProfileOpen: false,
    setIsProfileOpen: fn(),
  },
};

// 짧은 이름의 사용자
export const ShortName: Story = {
  args: {
    userProfile: {
      teamId: 1,
      id: 1,
      email: "a@b.com",
      name: "김",
      companyName: "회사",
      image: "",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    },
    isProfileOpen: false,
    setIsProfileOpen: fn(),
  },
};

// 드롭다운 열림 + 긴 이름
export const DropdownOpenWithLongName: Story = {
  args: {
    userProfile: {
      teamId: 1,
      id: 1,
      email: "verylongname@example.com",
      name: "매우긴이름을가진사용자",
      companyName: "매우긴회사이름을가진회사",
      image: "",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    },
    isProfileOpen: true,
    setIsProfileOpen: fn(),
  },
};

// 반응형 테스트
export const Mobile: Story = {
  args: {
    userProfile: {
      teamId: 1,
      id: 1,
      email: "user@example.com",
      name: "김철수",
      companyName: "테크회사",
      image: "",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    },
    isProfileOpen: false,
    setIsProfileOpen: fn(),
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};

export const Tablet: Story = {
  args: {
    userProfile: {
      teamId: 1,
      id: 1,
      email: "user@example.com",
      name: "김철수",
      companyName: "테크회사",
      image: "",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    },
    isProfileOpen: false,
    setIsProfileOpen: fn(),
  },
  parameters: {
    viewport: {
      defaultViewport: "tablet",
    },
  },
};

export const Desktop: Story = {
  args: {
    userProfile: {
      teamId: 1,
      id: 1,
      email: "user@example.com",
      name: "김철수",
      companyName: "테크회사",
      image: "",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    },
    isProfileOpen: false,
    setIsProfileOpen: fn(),
  },
  parameters: {
    viewport: {
      defaultViewport: "desktop",
    },
  },
};
