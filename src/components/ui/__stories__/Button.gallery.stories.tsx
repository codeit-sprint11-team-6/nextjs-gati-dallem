import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components/shad/button";

const meta: Meta<typeof Button> = {
  title: "UI/Button/Gallery",
  component: Button,
  tags: ["autodocs"],
  parameters: { controls: { disable: true } },
};
export default meta;
type Story = StoryObj<typeof Button>;

const tones = ["purple500", "indigo450", "navy700", "neutral"] as const;
const sizes = ["xl_474x60", "md_232x60", "lg_311x48", "sm_102x48"] as const;

export const GroupBySize: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-8">
      {sizes.map((s) => (
        <div key={s} className="flex flex-col gap-3">
          <div className="text-sm font-semibold">size: {s}</div>
          {tones.map((t) => (
            <Button key={`${s}-${t}`} size={s as any} tone={t as any}>
              {t}
            </Button>
          ))}
          {s === "md_232x60" && (
            <Button size="md_232x60" tone="cancel">
              Cancel
            </Button>
          )}
          {s === "sm_102x48" && (
            <Button size="sm_102x48" tone="cancel">
              Cancel
            </Button>
          )}
        </div>
      ))}
    </div>
  ),
};
