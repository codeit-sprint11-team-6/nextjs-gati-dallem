import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Header from "@/layout/Header";
import { type UserProfile } from "@/components/ui/Avatar";

const meta = {
  title: "Layout/Header",
  component: Header,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
# Header 컴포넌트

전체 애플리케이션의 상단 헤더 레이아웃을 담당하는 컴포넌트입니다.

## 구성 요소
- **Logo**: 브랜드 로고 (클릭 시 홈으로 이동)
- **Navigation**: 메인 네비게이션 메뉴
- **UserProfile**: 사용자 프로필 (로그인 시에만 표시)

## 특징
- **반응형 디자인**: 모바일/태블릿/데스크톱 대응
- **Sticky 헤더**: 스크롤 시에도 상단에 고정
- **동적 상태 관리**: 현재 페이지에 따른 활성 메뉴 표시
- **사용자 인증 상태**: 로그인/비로그인 상태에 따른 UI 변경

## 사용법
\`\`\`tsx
// 기본 헤더 (비로그인 상태)
<Header favoriteCount={0} />

// 로그인 상태 헤더
<Header 
  favoriteCount={5} 
  userProfile={userProfile}
  logoAltText="같이달램"
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    favoriteCount: {
      control: { type: "number", min: 0, max: 99 },
      description: "찜한 모임 개수. 네비게이션의 '찜한 모임' 메뉴에 배지로 표시됩니다.",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "0" },
      },
    },
    logoAltText: {
      control: { type: "text" },
      description: "로고에 표시될 텍스트. 브랜드명을 설정할 수 있습니다.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "같이달램" },
      },
    },
    userProfile: {
      control: { type: "object" },
      description: "사용자 프로필 정보. 제공되면 UserProfile 컴포넌트가 표시됩니다.",
      table: {
        type: { summary: "UserProfile | undefined" },
        defaultValue: { summary: "undefined" },
      },
    },
    className: {
      control: { type: "text" },
      description: "추가 CSS 클래스. Tailwind CSS 클래스를 사용하여 스타일을 커스터마이징할 수 있습니다.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 헤더 (로그인하지 않은 상태)
export const Default: Story = {
  args: {
    favoriteCount: 0,
    logoAltText: "같이달램",
  },
  parameters: {
    docs: {
      description: {
        story: "기본 헤더 상태입니다. 로그인하지 않은 사용자를 위한 헤더로, UserProfile 컴포넌트가 표시되지 않습니다.",
      },
    },
  },
};

// 로그인한 상태 (프로필 있음)
export const WithUserProfile: Story = {
  args: {
    favoriteCount: 5,
    logoAltText: "같이달램",
    userProfile: {
      teamId: 1,
      id: 1,
      email: "user@example.com",
      name: "홍길동",
      companyName: "테크회사",
      image: "",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    },
  },
  parameters: {
    docs: {
      description: {
        story: "로그인한 사용자를 위한 헤더입니다. 우측에 UserProfile 컴포넌트가 표시되며, 찜한 모임 개수도 배지로 표시됩니다.",
      },
    },
  },
};

// 많은 찜한 모임이 있는 상태
export const WithManyFavorites: Story = {
  args: {
    favoriteCount: 25,
    logoAltText: "같이달램",
    userProfile: {
      teamId: 1,
      id: 1,
      email: "user@example.com",
      name: "김철수",
      companyName: "스타트업",
      image: "",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    },
  },
  parameters: {
    docs: {
      description: {
        story: "많은 찜한 모임이 있는 사용자의 헤더입니다. 찜한 모임 개수가 많을 때 배지가 어떻게 표시되는지 확인할 수 있습니다.",
      },
    },
  },
};

// 프로필 이미지가 있는 사용자
export const WithProfileImage: Story = {
  args: {
    favoriteCount: 3,
    logoAltText: "같이달램",
    userProfile: {
      teamId: 1,
      id: 1,
      email: "user@example.com",
      name: "이영희",
      companyName: "디자인회사",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    },
  },
  parameters: {
    docs: {
      description: {
        story: "프로필 이미지가 있는 사용자의 헤더입니다. Avatar 컴포넌트에 실제 이미지가 표시되는 모습을 확인할 수 있습니다.",
      },
    },
  },
};

// 커스텀 로고 텍스트
export const CustomLogo: Story = {
  args: {
    favoriteCount: 0,
    logoAltText: "커스텀 로고",
  },
  parameters: {
    docs: {
      description: {
        story: "커스텀 로고 텍스트를 사용한 헤더입니다. 브랜드명 외의 다른 텍스트를 로고로 사용할 때의 모습을 확인할 수 있습니다.",
      },
    },
  },
};

// 반응형 테스트 - 모바일
export const Mobile: Story = {
  args: {
    favoriteCount: 5,
    logoAltText: "같이달램",
    userProfile: {
      teamId: 1,
      id: 1,
      email: "user@example.com",
      name: "모바일사용자",
      companyName: "모바일회사",
      image: "",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    },
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
    docs: {
      description: {
        story: "모바일 화면에서의 헤더 표시를 확인할 수 있습니다. 작은 화면에 맞게 컴포넌트들이 조정되어 표시됩니다.",
      },
    },
  },
};

// 반응형 테스트 - 태블릿
export const Tablet: Story = {
  args: {
    favoriteCount: 5,
    logoAltText: "같이달램",
    userProfile: {
      teamId: 1,
      id: 1,
      email: "user@example.com",
      name: "태블릿사용자",
      companyName: "태블릿회사",
      image: "",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    },
  },
  parameters: {
    viewport: {
      defaultViewport: "tablet",
    },
    docs: {
      description: {
        story: "태블릿 화면에서의 헤더 표시를 확인할 수 있습니다. 중간 크기 화면에 적합한 레이아웃으로 표시됩니다.",
      },
    },
  },
};

// 반응형 테스트 - 데스크톱
export const Desktop: Story = {
  args: {
    favoriteCount: 5,
    logoAltText: "같이달램",
    userProfile: {
      teamId: 1,
      id: 1,
      email: "user@example.com",
      name: "데스크톱사용자",
      companyName: "데스크톱회사",
      image: "",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    },
  },
  parameters: {
    viewport: {
      defaultViewport: "desktop",
    },
    docs: {
      description: {
        story: "데스크톱 화면에서의 헤더 표시를 확인할 수 있습니다. 큰 화면에서 최적화된 레이아웃으로 표시됩니다.",
      },
    },
  },
};