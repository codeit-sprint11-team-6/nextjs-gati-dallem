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
            "bg-[color:var(--color-gray-50,#F9FAFB)]", // F9FAFB
            "text-[color:var(--color-gray-800,#333333)]", // #333
            "placeholder:text-[color:var(--color-gray-400,#A4A4A4)]", // #A4A4A4 비슷톤
            "border border-[color:var(--color-gray-200,#E5E7EB)]",
            "ring-0 transition-colors",
            // hover/focus/active = purple-500
            "hover:border-[color:var(--color-purple-500)]",
            "focus-visible:border-[color:var(--color-purple-500)]",
            "focus-visible:ring-2 focus-visible:ring-[color:var(--color-purple-500)]",
            "selection:bg-[color:var(--color-purple-200)] selection:text-white", // 드래그 색상 지정
            // error
            invalid && "border-[#FF2727] hover:border-[#FF2727] focus-visible:ring-[#FF2727]",
            rightAdornment && "pr-12",
            className,
          )}
        />

        {rightAdornment && (
          <div className="pointer-events-auto absolute top-1/2 right-3 -translate-y-1/2">
            {rightAdornment}
          </div>
        )}

        {errorMessage && <p className="absolute mt-2 text-xs text-[#FF2727]">{errorMessage}</p>}
      </div>
    );
  },
);
AuthInput.displayName = "AuthInput";
export default AuthInput;
