"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center font-medium transition-colors select-none gap-2 " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 " +
    "disabled:cursor-not-allowed disabled:opacity-60",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--color-purple-500)] text-[var(--color-white)] hover:bg-[var(--color-purple-600)] focus-visible:ring-[var(--color-purple-500)]",
        secondary:
          "bg-[var(--color-purple-800)] text-[var(--color-white)] hover:bg-[var(--color-purple-600)] focus-visible:ring-[var(--color-purple-800)]",
        bare: "bg-transparent text-white shadow-xs ",
        outline:
          "bg-transparent border border-[var(--color-purple-500)] text-[var(--color-purple-500)] hover:bg-[var(--color-purple-500)] hover:text-[var(--color-white)] focus-visible:ring-[var(--color-purple-500)]",
        outlineSoft:
          "bg-[var(--color-gray-50)] text-[var(--color-gray-500)] hover:bg-[var(--color-gray-100)] focus-visible:ring-[var(--color-gray-500)] dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600",
        outlineWhite:
          "bg-[var(--color-white,#fff)] text-[var(--color-gray-500)] border border-[var(--color-gray-100)] hover:bg-[var(--color-gray-50)] focus-visible:ring-[var(--color-gray-500)]",
        ghost:
          "bg-transparent text-[var(--color-gray-500)] hover:bg-[var(--color-gray-50)] focus-visible:ring-[var(--color-gray-500)]",
        gray: "bg-[var(--color-gray-50)] text-[var(--color-gray-500)] hover:bg-[var(--color-gray-50)] focus-visible:ring-[var(--color-gray-500)]",
        selected:
          "bg-[var(--color-purple-100,theme(colors.purple.100))] text-[var(--color-purple-600,theme(colors.purple.600))] border border-[var(--color-purple-500)] hover:bg-[var(--color-purple-200,theme(colors.purple.200))] focus-visible:ring-[var(--color-purple-500)]",
      },
      size: {
        xs: "text-xs px-2 py-1",
        sm: "text-sm px-3 py-1.5",
        md: "text-sm px-4 py-2",
        lg: "text-lg px-6 py-3",
        xl: "text-xl px-8 py-4",
        icon: "w-10 h-10 p-0",
      },
      radius: {
        round: "rounded-full",
        lg: "rounded-xl",
        md: "rounded-md",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      radius: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      radius,
      asChild = false,
      leftIcon,
      rightIcon,
      isLoading,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    const isIconOnly = size === "icon";
    const isTextChild = typeof children === "string" || typeof children === "number";

    if (asChild) {
      return (
        <Slot
          ref={ref as any}
          className={cn(buttonVariants({ variant, size, radius }), className)}
          {...props}
        >
          {children}
        </Slot>
      );
    }

    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, radius }), className)}
        aria-busy={isLoading || undefined}
        {...props}
      >
        {isLoading && (
          <span
            aria-hidden="true"
            className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent"
          />
        )}

        {!isLoading && leftIcon && (
          <span aria-hidden="true" className="shrink-0 leading-none">
            {leftIcon}
          </span>
        )}

        {children && <span className={cn(isIconOnly && isTextChild && "sr-only")}>{children}</span>}

        {!isLoading && rightIcon && (
          <span aria-hidden="true" className="shrink-0 leading-none">
            {rightIcon}
          </span>
        )}
      </Comp>
    );
  },
);

Button.displayName = "Button";

export { buttonVariants };
