// src/components/ui/button.tsx
import { Button as ShadButton } from "@/components/shad/button";

export function Button({
  label,
  ...props
}: { label?: string } & React.ComponentProps<typeof ShadButton>) {
  return <ShadButton {...props}>{props.children ?? label}</ShadButton>;
}
