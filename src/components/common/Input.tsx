import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const inputVariants = cva(
  [
    "file:text-foreground placeholder:text-muted-foreground",
    "selection:bg-primary selection:text-primary-foreground",
    "dark:bg-input/30",
    "border-input bg-transparent",
    "flex w-full min-w-0 rounded-xl border",
    "shadow-xs transition-[color,box-shadow,border-color]",
    "outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
    " focus-visible:border-purple-500 focus-visible:ring-1.5 focus-visible:ring-purple-500 focus-visible:ring-offset-0",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-10 px-4 ",
        md: "h-12 px-4 ",
        lg: "h-14 px-4 ",
      },
      state: {
        default: "",
        invalid: "border-red-500",
        success: "border-purple-500",
      },

      withStartIcon: { true: "pl-[50px]", false: "" },
      withEndIcon: { true: "pr-[50px]", false: "" },
    },
    defaultVariants: {
      size: "md",
      state: "default",
      withStartIcon: false,
      withEndIcon: false,
    },
  },
);

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> &
  VariantProps<typeof inputVariants>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, size, state, withStartIcon, withEndIcon, ...props }, ref) => {
    return (
      <input
        ref={ref}
        data-slot="input"
        aria-invalid={state === "invalid" || undefined}
        className={cn(inputVariants({ size, state, withStartIcon, withEndIcon }), className)}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";
export { Input, inputVariants };
