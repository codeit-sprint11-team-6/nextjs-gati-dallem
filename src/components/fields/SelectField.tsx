"use client";

import * as React from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/Select";
import { cn } from "@/lib/utils";

export type SelectFieldProps = {
  value?: string;
  onChange?: (v: string) => void;
  placeholder?: string;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
  items: { label: string; value: string }[];
  state?: "default" | "invalid" | "success";
};

const sizeMap = {
  sm: "h-10 px-4 ",
  md: "h-12 px-4",
  lg: "h-14 px-4 ",
};

export const SelectField = React.forwardRef<HTMLDivElement, SelectFieldProps>(
  (
    {
      value,
      onChange,
      placeholder = "장소를 선택해주세요",
      size = "md",
      disabled,
      className,
      items,
      state = "default",
    },
    ref,
  ) => {
    return (
      <div ref={ref} className="w-full">
        <Select value={value} onValueChange={onChange} disabled={disabled}>
          <SelectTrigger
            aria-invalid={state === "invalid" || undefined}
            className={cn(
              // 레이아웃 & 폭
              "w-full text-left",
              // 패딩 & 사이즈 매핑
              sizeMap[size],
              // 배경 & 테두리 & 라운드
              "border-input rounded-xl border bg-transparent",
              // 그림자
              "shadow-xs",
              // 포커스
              "focus-visible:ring-ring outline-none focus-visible:ring-2 focus-visible:ring-offset-0",
              // 전환 효과
              "transition-[box-shadow,border-color]",
              // 상태 경계선
              state === "invalid" && "border-red-500",
              state === "success" && "border-purple-500",
              className,
            )}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {items.map((it) => (
              <SelectItem key={it.value} value={it.value}>
                {it.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  },
);

SelectField.displayName = "SelectField";
