import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components/shad/button";

const meta: Meta<typeof Button> = {
  title: "UI/Button/Presets/XL (474×60)",
  component: Button,
  tags: ["autodocs"],
  parameters: { controls: { disable: true } }, // 프리셋은 보기/복붙 용도
};
export default meta;

type Story = StoryObj<typeof Button>;
const size = "xl_474x60" as const;

// 라벨 맵 (원하면 i18n으로 분리)
const labels = {
  purple500: "Join",
  indigo450: "Share",
  navy700: "Sign up",
  neutral: "More",
};

export const Purple: Story = {
  name: "Purple (#5865F2)",
  args: { tone: "purple500", size, children: labels.purple500 },
};
export const Indigo: Story = {
  name: "Indigo (#4D59D5)",
  args: { tone: "indigo450", size, children: labels.indigo450 },
};
export const Navy: Story = {
  name: "Navy (#38419B)",
  args: { tone: "navy700", size, children: labels.navy700 },
};
export const Neutral: Story = {
  name: "Neutral (#EEEEEE)",
  args: { tone: "neutral", size, children: labels.neutral },
};
