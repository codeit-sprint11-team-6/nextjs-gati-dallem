// src/components/auth/ui/AuthButton.tsx
// 공통 스타일(로그인/회원가입 동일)
"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import * as React from "react";

type Props = React.ComponentProps<typeof Button> & {
  loading?: boolean;
  fullWidth?: boolean;
  label?: string;
};

export default function AuthButton({
  className,
  loading,
  disabled,
  fullWidth = true,
  children,
  label,
  ...props
}: Props) {
  // const isEnabled = !disabled && !loading;
  const isEnabled = !disabled && !loading && false;

  return (
    <Button
      {...props}
      aria-busy={loading || undefined}
      data-loading={loading ? "true" : undefined}
      //
      disabled={disabled || loading}
      className={cn(
        "h-12 rounded-2xl text-base font-semibold",
        fullWidth && "w-full",
        !isEnabled && [
          "cursor-not-allowed",
          "bg-[color:var(--color-gray-200)] text-[color:var(--color-gray-600)]",
          "disabled:bg-[color:var(--color-gray-200)] disabled:text-[color:var(--color-gray-600)]",
          "disabled:opacity-100", // Shadcn 기본 opacity-50 무효화
        ],
        isEnabled && [
          "bg-[color:var(--color-purple-500)] text-white",
          "hover:bg-[color:var(--color-purple-500)]",
          "active:bg-[color:var(--color-purple-600)]",
        ],
        className,
      )}
    >
      {loading ? "처리 중..." : (children ?? label)}
    </Button>
  );
}
