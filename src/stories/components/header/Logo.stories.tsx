import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Logo from "@/components/header/Logo";

const meta = {
  title: "Components/Header/Logo",
  component: Logo,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
# Logo 컴포넌트

헤더에 사용되는 브랜드 로고 컴포넌트입니다.

## 특징
- **Tenada 폰트** 사용으로 브랜드 아이덴티티 강화
- **반응형 디자인** 지원 (모바일/태블릿/데스크톱)
- **접근성** 고려 (altText 지원)
- **커스터마이징** 가능 (className prop)

## 사용법
\`\`\`tsx
<Logo altText="같이달램" />
<Logo altText="커스텀 로고" className="text-red-500" />
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    altText: {
      control: { type: "text" },
      description: "로고에 표시될 텍스트. 브랜드명이나 커스텀 텍스트를 입력할 수 있습니다.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "같이달램" },
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
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 로고
export const Default: Story = {
  args: {
    altText: "같이달램",
  },
  parameters: {
    docs: {
      description: {
        story: "기본 브랜드 로고입니다. Tenada 폰트를 사용하여 브랜드 아이덴티티를 표현합니다.",
      },
    },
  },
};

// 커스텀 로고 텍스트
export const CustomText: Story = {
  args: {
    altText: "커스텀 로고",
  },
  parameters: {
    docs: {
      description: {
        story: "브랜드명 외의 커스텀 텍스트를 사용한 로고 예시입니다.",
      },
    },
  },
};

// 긴 텍스트 로고
export const LongText: Story = {
  args: {
    altText: "매우 긴 로고 텍스트 예시",
  },
  parameters: {
    docs: {
      description: {
        story: "긴 텍스트가 로고에 어떻게 표시되는지 확인할 수 있습니다. 반응형 디자인에 따라 적절히 조정됩니다.",
      },
    },
  },
};

// 짧은 텍스트 로고
export const ShortText: Story = {
  args: {
    altText: "로고",
  },
  parameters: {
    docs: {
      description: {
        story: "짧은 텍스트를 사용한 로고 예시입니다. 간결한 브랜드명에 적합합니다.",
      },
    },
  },
};

// 추가 스타일이 적용된 로고
export const WithCustomStyle: Story = {
  args: {
    altText: "같이달램",
    className: "text-red-500",
  },
  parameters: {
    docs: {
      description: {
        story: "className prop을 사용하여 추가 스타일을 적용한 로고입니다. Tailwind CSS 클래스를 사용할 수 있습니다.",
      },
    },
  },
};

// 반응형 테스트
export const Mobile: Story = {
  args: {
    altText: "같이달램",
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
    docs: {
      description: {
        story: "모바일 화면에서의 로고 표시를 확인할 수 있습니다. 작은 화면에 맞게 폰트 크기가 조정됩니다.",
      },
    },
  },
};

export const Tablet: Story = {
  args: {
    altText: "같이달램",
  },
  parameters: {
    viewport: {
      defaultViewport: "tablet",
    },
    docs: {
      description: {
        story: "태블릿 화면에서의 로고 표시를 확인할 수 있습니다. 중간 크기 화면에 적합한 폰트 크기로 표시됩니다.",
      },
    },
  },
};

export const Desktop: Story = {
  args: {
    altText: "같이달램",
  },
  parameters: {
    viewport: {
      defaultViewport: "desktop",
    },
    docs: {
      description: {
        story: "데스크톱 화면에서의 로고 표시를 확인할 수 있습니다. 큰 화면에서 최적화된 폰트 크기로 표시됩니다.",
      },
    },
  },
};
