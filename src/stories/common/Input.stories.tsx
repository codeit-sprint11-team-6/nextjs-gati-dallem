import { Input } from "@/components/common/Input";
import type { Meta, StoryObj } from "@storybook/react";
import { Search } from "lucide-react";

const meta = {
  title: "Components/Common/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      description: "Input의 크기 (sm, md, lg)",
      control: "select",
      options: ["sm", "md", "lg"],
    },
    state: {
      description: "Input의 상태 (default, invalid, success)",
      control: "select",
      options: ["default", "invalid", "success"],
    },
    withStartIcon: {
      description: "왼쪽에 아이콘이 들어갈 경우 true",
      control: "boolean",
    },
    withEndIcon: {
      description: "오른쪽에 아이콘이 들어갈 경우 true",
      control: "boolean",
    },
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

/* ------------------------- Stories ------------------------- */

export const Default: Story = {
  args: { placeholder: "입력해주세요!!", size: "md", state: "default" },
  parameters: {
    docs: {
      description: {
        story: "가장 기본적인 Input입니다. `size=md`, `state=default` 설정으로 표시됩니다.",
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <Input size="sm" placeholder="Small" />
      <Input size="md" placeholder="Medium" />
      <Input size="lg" placeholder="Large" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Input의 크기 변형(sm, md, lg)을 비교할 수 있는 예시입니다.",
      },
    },
  },
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <Input state="default" placeholder="기본 상태" />
      <Input state="invalid" placeholder="에러 상태" />
      <Input state="success" placeholder="성공 상태" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Input의 상태(default, invalid, success)를 비교할 수 있는 예시입니다.",
      },
    },
  },
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80 relative">
      {/* Start Icon */}
      <div className="relative">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={16}
        />
        <Input withStartIcon placeholder="검색어 입력" />
      </div>
      {/* End Icon */}
      <div className="relative">
        <Input withEndIcon placeholder="오른쪽 아이콘" />
        <Search
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={16}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Input 양옆에 아이콘을 배치한 예시입니다. `withStartIcon`, `withEndIcon`을 활용합니다.",
      },
    },
  },
};
