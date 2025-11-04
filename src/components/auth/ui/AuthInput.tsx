// src/components/auth/ui/LoginInput.tsx
"use client";
import { cn } from "@/lib/utils";
import { Input as BaseInput, type InputProps } from "@/components/common/Input";
import React from "react";

type Props = InputProps & {
  invalid?: boolean;
  errorMessage?: string;
  rightAdornment?: React.ReactNode;
};

const AuthInput = React.forwardRef<HTMLInputElement, Props>(
  ({ className, invalid, errorMessage, rightAdornment, ...props }, ref) => {
    return (
      <div className={cn("relative w-full", errorMessage && "mb-4")}>
        <BaseInput
          ref={ref}
          {...props}
          aria-invalid={invalid || undefined}
          className={cn(
            // base
            "h-12 rounded-2xl px-4",
            "bg-white",
            "text-[color:var(--color-gray-800,#333333)]",
            "placeholder:text-[color:var(--color-gray-400,#A4A4A4)]",
            "border border-[color:var(--color-gray-200,#E5E7EB)]",
            "ring-1 ring-[color:var(--color-gray-200,#E5E7EB)]",
            "transition-colors",
            // Dark
            "dark:border-[color:var(--color-gray-700,#374151)] dark:bg-[color:var(--color-gray-800,#1F2937)] dark:text-[color:var(--color-gray-50,#F9FAFB)] dark:placeholder:text-[color:var(--color-gray-300,#6B7280)]",
            // hover/focus/active = purple-500
            "hover:border-[color:var(--color-purple-500)]",
            "hover:ring-2 hover:ring-[color:var(--color-purple-500)]",
            "focus-visible:border-[color:var(--color-purple-500)]",
            "focus-visible:ring-2 focus-visible:ring-[color:var(--color-purple-500)]",
            "selection:bg-[color:var(--color-purple-200)] selection:text-white", // 드래그 색상 지정
            // error
            invalid &&
              cn(
                "border-[color:var(--color-error-500)] focus-visible:ring-[color:var(--color-error-500)]",
                "dark:border-[color:var(--color-error-500)] dark:focus-visible:ring-[color:var(--color-error-500)]",
              ),
            rightAdornment && "pr-12",
            className,
          )}
        />

        {rightAdornment && (
          <div className="pointer-events-auto absolute top-1/2 right-3 -translate-y-1/2">
            {rightAdornment}
          </div>
        )}

        {errorMessage && (
          <p className="absolute mt-2 text-xs text-[#FF2727] dark:text-red-400">{errorMessage}</p>
        )}
      </div>
    );
  },
);
AuthInput.displayName = "AuthInput";
export default AuthInput;
