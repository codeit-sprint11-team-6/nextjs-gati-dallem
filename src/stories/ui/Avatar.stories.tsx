import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Avatar, { type UserProfile } from "@/components/ui/Avatar";

const meta = {
  title: "Components/UI/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
# Avatar 컴포넌트

사용자 프로필을 표시하는 아바타 컴포넌트입니다.

## 특징
- **프로필 이미지 지원**: 사용자의 실제 프로필 이미지를 표시
- **기본 아바타**: 이미지가 없을 때 성별에 따른 기본 아바타 표시
- **다양한 크기**: small, medium, large, x-large 4가지 크기 지원
- **성별 구분**: female, male 타입으로 기본 아바타 스타일 구분
- **사용자 정보 표시**: 이름과 회사명을 함께 표시
- **반응형 디자인**: 다양한 화면 크기에 적응

## 사용법
\`\`\`tsx
// 기본 아바타
<Avatar 
  userProfile={{
    name: "홍길동",
    companyName: "테크회사",
    image: ""
  }}
  size="medium"
  type="male"
/>

// 프로필 이미지가 있는 아바타
<Avatar 
  userProfile={{
    name: "김영희",
    companyName: "디자인회사",
    image: "https://example.com/profile.jpg"
  }}
  size="large"
  type="female"
/>
\`\`\`

## 사용 사례
- 헤더의 사용자 프로필 표시
- 댓글이나 리뷰의 작성자 표시
- 팀원 목록의 프로필 표시
- 사용자 정보 카드의 프로필 표시
        `,
      },
    },
  },
  argTypes: {
    userProfile: {
      description: "사용자 프로필 정보 객체입니다. name, companyName, image 등의 정보를 포함합니다.",
      table: {
        type: { summary: "UserProfile" },
        defaultValue: { summary: "undefined" },
      },
    },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large", "x-large"],
      description: "아바타의 크기를 설정합니다. small(24px), medium(32px), large(40px), x-large(48px) 중 선택할 수 있습니다.",
      table: {
        type: { summary: "\"small\" | \"medium\" | \"large\" | \"x-large\"" },
        defaultValue: { summary: "\"medium\"" },
      },
    },
    type: {
      control: { type: "select" },
      options: ["female", "male"],
      description: "기본 아바타의 타입을 설정합니다. 프로필 이미지가 없을 때 사용되는 기본 아바타의 스타일을 결정합니다.",
      table: {
        type: { summary: "\"female\" | \"male\"" },
        defaultValue: { summary: "\"female\"" },
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
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 아바타 (중간 크기, 여성)
export const Default: Story = {
  args: {
    userProfile: {
      teamId: 1,
      id: 1,
      email: "user@example.com",
      name: "김영희",
      companyName: "테크회사",
      image: "",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    },
    size: "medium",
    type: "female",
  },
  parameters: {
    docs: {
      description: {
        story: "기본 아바타입니다. 중간 크기(32px)의 여성 타입 기본 아바타로, 프로필 이미지가 없을 때 표시됩니다.",
      },
    },
  },
};

// 작은 크기 아바타
export const Small: Story = {
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
    size: "small",
    type: "male",
  },
  parameters: {
    docs: {
      description: {
        story: "작은 크기(24px)의 남성 타입 아바타입니다. 댓글이나 작은 공간에서 사용자 프로필을 표시할 때 적합합니다.",
      },
    },
  },
};

// 큰 크기 아바타
export const Large: Story = {
  args: {
    userProfile: {
      teamId: 1,
      id: 1,
      email: "user@example.com",
      name: "이민수",
      companyName: "디자인회사",
      image: "",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    },
    size: "large",
    type: "female",
  },
  parameters: {
    docs: {
      description: {
        story: "큰 크기(40px)의 여성 타입 아바타입니다. 프로필 페이지나 중요한 사용자 정보를 표시할 때 사용합니다.",
      },
    },
  },
};

// 매우 큰 크기 아바타
export const XLarge: Story = {
  args: {
    userProfile: {
      teamId: 1,
      id: 1,
      email: "user@example.com",
      name: "박지영",
      companyName: "마케팅회사",
      image: "",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    },
    size: "x-large",
    type: "male",
  },
  parameters: {
    docs: {
      description: {
        story: "매우 큰 크기(48px)의 남성 타입 아바타입니다. 헤더나 메인 프로필 영역에서 사용자 프로필을 강조할 때 사용합니다.",
      },
    },
  },
};

// 남성 아바타
export const Male: Story = {
  args: {
    userProfile: {
      teamId: 1,
      id: 1,
      email: "user@example.com",
      name: "정민호",
      companyName: "교육회사",
      image: "",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    },
    size: "medium",
    type: "male",
  },
  parameters: {
    docs: {
      description: {
        story: "남성 타입의 기본 아바타입니다. 프로필 이미지가 없을 때 남성 사용자를 위한 기본 아바타가 표시됩니다.",
      },
    },
  },
};

// 여성 아바타
export const Female: Story = {
  args: {
    userProfile: {
      teamId: 1,
      id: 1,
      email: "user@example.com",
      name: "최수진",
      companyName: "스타트업",
      image: "",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    },
    size: "medium",
    type: "female",
  },
  parameters: {
    docs: {
      description: {
        story: "여성 타입의 기본 아바타입니다. 프로필 이미지가 없을 때 여성 사용자를 위한 기본 아바타가 표시됩니다.",
      },
    },
  },
};

// 사용자 프로필 정보 없음
export const NoUserProfile: Story = {
  args: {
    userProfile: undefined,
    size: "medium",
    type: "female",
  },
  parameters: {
    docs: {
      description: {
        story: "사용자 프로필 정보가 없을 때의 아바타입니다. 기본 아바타가 표시되며, 이름과 회사명은 표시되지 않습니다.",
      },
    },
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
    size: "medium",
    type: "female",
  },
  parameters: {
    docs: {
      description: {
        story: "긴 이름과 회사명을 가진 사용자의 아바타입니다. 긴 텍스트가 어떻게 표시되는지 확인할 수 있습니다.",
      },
    },
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
    size: "medium",
    type: "male",
  },
  parameters: {
    docs: {
      description: {
        story: "짧은 이름과 회사명을 가진 사용자의 아바타입니다. 짧은 텍스트가 어떻게 표시되는지 확인할 수 있습니다.",
      },
    },
  },
};

// 커스텀 스타일 적용
export const WithCustomStyle: Story = {
  args: {
    userProfile: {
      teamId: 1,
      id: 1,
      email: "user@example.com",
      name: "김영희",
      companyName: "테크회사",
      image: "",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    },
    size: "medium",
    type: "female",
    className: "border-4 border-blue-500",
  },
  parameters: {
    docs: {
      description: {
        story: "커스텀 스타일이 적용된 아바타입니다. className prop을 사용하여 테두리나 기타 스타일을 추가할 수 있습니다.",
      },
    },
  },
};

// 모든 크기 비교
export const SizeComparison: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <div className="text-center">
        <Avatar
          userProfile={{
            teamId: 1,
            id: 1,
            email: "user@example.com",
            name: "김영희",
            companyName: "테크회사",
            image: "",
            createdAt: "2024-01-01T00:00:00Z",
            updatedAt: "2024-01-01T00:00:00Z",
          }}
          size="small"
          type="female"
        />
        <p className="text-xs mt-2">Small</p>
      </div>
      <div className="text-center">
        <Avatar
          userProfile={{
            teamId: 1,
            id: 1,
            email: "user@example.com",
            name: "김영희",
            companyName: "테크회사",
            image: "",
            createdAt: "2024-01-01T00:00:00Z",
            updatedAt: "2024-01-01T00:00:00Z",
          }}
          size="medium"
          type="female"
        />
        <p className="text-xs mt-2">Medium</p>
      </div>
      <div className="text-center">
        <Avatar
          userProfile={{
            teamId: 1,
            id: 1,
            email: "user@example.com",
            name: "김영희",
            companyName: "테크회사",
            image: "",
            createdAt: "2024-01-01T00:00:00Z",
            updatedAt: "2024-01-01T00:00:00Z",
          }}
          size="large"
          type="female"
        />
        <p className="text-xs mt-2">Large</p>
      </div>
      <div className="text-center">
        <Avatar
          userProfile={{
            teamId: 1,
            id: 1,
            email: "user@example.com",
            name: "김영희",
            companyName: "테크회사",
            image: "",
            createdAt: "2024-01-01T00:00:00Z",
            updatedAt: "2024-01-01T00:00:00Z",
          }}
          size="x-large"
          type="female"
        />
        <p className="text-xs mt-2">X-Large</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "모든 크기의 아바타를 비교할 수 있습니다. Small(24px), Medium(32px), Large(40px), X-Large(48px) 크기별로 어떻게 표시되는지 확인할 수 있습니다.",
      },
    },
  },
};
