import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components/shad/button";

const meta: Meta<typeof Button> = {
  title: "UI/Button/Presets/MD (232×60)",
  component: Button,
  tags: ["autodocs"],
  parameters: { controls: { disable: true } },
};
export default meta;

type Story = StoryObj<typeof Button>;
const size = "md_232x60" as const;

export const Purple: Story = {
  name: "Purple (#5865F2)",
  args: { tone: "purple500", size, children: "Join" },
};
export const Indigo: Story = {
  name: "Indigo (#4D59D5)",
  args: { tone: "indigo450", size, children: "Share" },
};
export const Navy: Story = {
  name: "Navy (#38419B)",
  args: { tone: "navy700", size, children: "Sign up" },
};
export const Neutral: Story = {
  name: "Neutral (#EEEEEE)",
  args: { tone: "neutral", size, children: "More" },
};
// 필요 시 Cancel 프리셋도 여기에
export const Cancel: Story = {
  name: "Cancel (white tone, no border)",
  args: { tone: "white", size, children: "Cancel" },
};
