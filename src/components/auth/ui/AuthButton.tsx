// src/components/auth/ui/AuthButton.tsx
"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/common/Button";
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
  const isEnabled = !disabled && !loading;

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
          "pointer-events-none cursor-not-allowed",
          "bg-[color:var(--color-gray-200,#E5E7EB)] text-[color:var(--color-gray-400,#9CA3AF)]", // 비활성 텍스트 연회색
          "disabled:bg-[color:var(--color-gray-200)] disabled:text-[#9CA3AF]", // disabled 시도 동일
          "disabled:opacity-40",
          "dark:text-gray-400, dark:bg-gray-700",
          "dark:disabled:opacity-60",
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
