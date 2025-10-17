import ScoreInput from "@/components/my/reviews/modal/ScoreInput";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

const meta = {
  title: "Components/My/Reviews/ScoreInput",
  component: ScoreInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ScoreInput>;
export default meta;

type Story = StoryObj<typeof meta>;

export const ScoreInputExample: Story = {
  args: { score: 3, setScore: () => {} },
  render: (args) => {
    const [score, setScore] = useState<number>(args.score);
    return <ScoreInput score={score} setScore={setScore} />;
  },
};
