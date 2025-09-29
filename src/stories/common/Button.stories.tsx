import { Button } from "@/components/common/Button";
import type { Meta, StoryObj } from "@storybook/react";
import { Save, ChevronRight, Plus } from "lucide-react";

const meta = {
  title: "Components/Common/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      description: "버튼의 다양한 스타일",
      control: "select",
      options: [
        "primary",
        "secondary",
        "outline",
        "outlineSoft",
        "outlineWhite",
        "ghost",
        "gray",
        "selected",
      ],
    },
    size: {
      description: "버튼의 크기 (xs, sm, md, lg, xl, icon)",
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl", "icon"],
    },
    radius: {
      description: "버튼의 테두리 둥글기",
      control: "select",
      options: ["md", "lg", "round"],
    },
    isLoading: {
      description: "로딩 상태 여부",
      control: "boolean",
    },
    leftIcon: {
      description: "버튼 왼쪽에 들어가는 아이콘",
      control: false,
    },
    rightIcon: {
      description: "버튼 오른쪽에 들어가는 아이콘",
      control: false,
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

/* ------------------------- Stories ------------------------- */

export const Default: Story = {
  args: { children: "Button", variant: "primary", size: "md" },
  parameters: {
    docs: {
      description: {
        story: "가장 기본적인 버튼입니다. Primary 변형과 Medium 크기를 적용한 예시입니다.",
      },
    },
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="outlineSoft">Outline Soft</Button>
      <Button variant="outlineWhite">Outline White</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="gray">Gray</Button>
      <Button variant="selected">Selected</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "버튼의 다양한 `variant` 스타일 변형을 보여줍니다.",
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 items-center">
      <Button size="xs">XS</Button>
      <Button size="sm">SM</Button>
      <Button size="md">MD</Button>
      <Button size="lg">LG</Button>
      <Button size="xl">XL</Button>
      <Button size="icon" aria-label="Icon Button">
        <Plus size={18} />
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "버튼의 `size` 옵션(xs~xl, icon)을 비교할 수 있는 예시입니다.",
      },
    },
  },
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button leftIcon={<Save size={16} />}>저장</Button>
      <Button rightIcon={<ChevronRight size={16} />}>다음</Button>
      <Button isLoading>로딩 중...</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "아이콘과 로딩 상태가 포함된 버튼 예시입니다. `leftIcon`, `rightIcon`, `isLoading`을 활용합니다.",
      },
    },
  },
};
