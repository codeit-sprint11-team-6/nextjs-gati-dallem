import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components/shad/button";

const meta: Meta<typeof Button> = {
  title: "UI/Button/Presets/SM (102×48)",
  component: Button,
  tags: ["autodocs"],
  parameters: { controls: { disable: true } },
};
export default meta;

type Story = StoryObj<typeof Button>;
const size = "sm_102x48" as const;

export const White_Cancel: Story = {
  name: "White (#FFF) — text #4D59D5",
  args: { tone: "white", size, children: "Cancel" }, // 글자색은 컴포넌트 rule에서 고정
};

export const Purple_Small: Story = {
  name: "Purple (#5865F2) — text #C3C8FA",
  args: { tone: "purple500", size, children: "Join" },
};

// 필요 시 다른 톤도 추가
