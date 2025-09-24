import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Navigation, { type NavigationItem } from "@/components/header/Navigation";

const meta = {
  title: "Components/Header/Navigation",
  component: Navigation,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
# Navigation 컴포넌트

헤더의 메인 네비게이션 메뉴를 담당하는 컴포넌트입니다.

## 특징
- **동적 메뉴 아이템** 지원 (items prop)
- **활성 상태 표시** (isActive 속성)
- **찜한 모임 배지** 표시 (favoriteCount)
- **반응형 디자인** 지원
- **접근성** 고려 (키보드 네비게이션)

## 사용법
\`\`\`tsx
const items = [
  { label: "모임 찾기", href: "/meetings", isActive: true },
  { label: "찜한 모임", href: "/favorites", isActive: false },
  { label: "모든 리뷰", href: "/reviews", isActive: false },
];

<Navigation items={items} favoriteCount={5} />
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    favoriteCount: {
      control: { type: "number", min: 0, max: 99 },
      description: "찜한 모임 개수. 99개를 초과하면 '99+'로 표시됩니다.",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "0" },
      },
    },
  },
} satisfies Meta<typeof Navigation>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 네비게이션 (모든 메뉴 비활성)
export const Default: Story = {
  args: {
    items: [
      { label: "모임 찾기", href: "/meetings", isActive: false },
      { label: "찜한 모임", href: "/favorites", isActive: false },
      { label: "모든 리뷰", href: "/reviews", isActive: false },
    ],
    favoriteCount: 0,
  },
  parameters: {
    docs: {
      description: {
        story: "기본 네비게이션 상태입니다. 모든 메뉴가 비활성 상태이며 찜한 모임이 없는 상태를 보여줍니다.",
      },
    },
  },
};

// 모임 찾기 활성 상태
export const MeetingsActive: Story = {
  args: {
    items: [
      { label: "모임 찾기", href: "/meetings", isActive: true },
      { label: "찜한 모임", href: "/favorites", isActive: false },
      { label: "모든 리뷰", href: "/reviews", isActive: false },
    ],
    favoriteCount: 3,
  },
  parameters: {
    docs: {
      description: {
        story: "'모임 찾기' 메뉴가 활성 상태인 네비게이션입니다. 활성 메뉴는 시각적으로 강조 표시됩니다.",
      },
    },
  },
};

// 찜한 모임 활성 상태 (배지 표시)
export const FavoritesActive: Story = {
  args: {
    items: [
      { label: "모임 찾기", href: "/meetings", isActive: false },
      { label: "찜한 모임", href: "/favorites", isActive: true },
      { label: "모든 리뷰", href: "/reviews", isActive: false },
    ],
    favoriteCount: 7,
  },
  parameters: {
    docs: {
      description: {
        story: "'찜한 모임' 메뉴가 활성 상태이며, 찜한 모임 개수가 배지로 표시됩니다.",
      },
    },
  },
};

// 리뷰 활성 상태
export const ReviewsActive: Story = {
  args: {
    items: [
      { label: "모임 찾기", href: "/meetings", isActive: false },
      { label: "찜한 모임", href: "/favorites", isActive: false },
      { label: "모든 리뷰", href: "/reviews", isActive: true },
    ],
    favoriteCount: 12,
  },
  parameters: {
    docs: {
      description: {
        story: "'모든 리뷰' 메뉴가 활성 상태인 네비게이션입니다. 활성 메뉴는 시각적으로 강조 표시됩니다.",
      },
    },
  },
};

// 많은 찜한 모임 (99+ 표시)
export const ManyFavorites: Story = {
  args: {
    items: [
      { label: "모임 찾기", href: "/meetings", isActive: false },
      { label: "찜한 모임", href: "/favorites", isActive: false },
      { label: "모든 리뷰", href: "/reviews", isActive: false },
    ],
    favoriteCount: 150,
  },
  parameters: {
    docs: {
      description: {
        story: "찜한 모임이 99개를 초과할 때 '99+'로 표시되는 배지의 모습을 확인할 수 있습니다.",
      },
    },
  },
};

// 찜한 모임이 없는 상태
export const NoFavorites: Story = {
  args: {
    items: [
      { label: "모임 찾기", href: "/meetings", isActive: false },
      { label: "찜한 모임", href: "/favorites", isActive: false },
      { label: "모든 리뷰", href: "/reviews", isActive: false },
    ],
    favoriteCount: 0,
  },
  parameters: {
    docs: {
      description: {
        story: "찜한 모임이 없는 상태의 네비게이션입니다. 배지가 표시되지 않는 깔끔한 모습을 확인할 수 있습니다.",
      },
    },
  },
};

// 반응형 테스트
export const Mobile: Story = {
  args: {
    items: [
      { label: "모임 찾기", href: "/meetings", isActive: true },
      { label: "찜한 모임", href: "/favorites", isActive: false },
      { label: "모든 리뷰", href: "/reviews", isActive: false },
    ],
    favoriteCount: 5,
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
    docs: {
      description: {
        story: "모바일 화면에서의 네비게이션 표시를 확인할 수 있습니다. 작은 화면에 맞게 메뉴 간격과 폰트 크기가 조정됩니다.",
      },
    },
  },
};

export const Tablet: Story = {
  args: {
    items: [
      { label: "모임 찾기", href: "/meetings", isActive: true },
      { label: "찜한 모임", href: "/favorites", isActive: false },
      { label: "모든 리뷰", href: "/reviews", isActive: false },
    ],
    favoriteCount: 5,
  },
  parameters: {
    viewport: {
      defaultViewport: "tablet",
    },
    docs: {
      description: {
        story: "태블릿 화면에서의 네비게이션 표시를 확인할 수 있습니다. 중간 크기 화면에 적합한 레이아웃으로 표시됩니다.",
      },
    },
  },
};

export const Desktop: Story = {
  args: {
    items: [
      { label: "모임 찾기", href: "/meetings", isActive: true },
      { label: "찜한 모임", href: "/favorites", isActive: false },
      { label: "모든 리뷰", href: "/reviews", isActive: false },
    ],
    favoriteCount: 5,
  },
  parameters: {
    viewport: {
      defaultViewport: "desktop",
    },
    docs: {
      description: {
        story: "데스크톱 화면에서의 네비게이션 표시를 확인할 수 있습니다. 큰 화면에서 최적화된 레이아웃으로 표시됩니다.",
      },
    },
  },
};
