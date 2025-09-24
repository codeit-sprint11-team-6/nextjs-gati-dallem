"use client";

import * as React from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
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
              "w-full text-left",
              sizeMap[size],
              "bg-transparent border border-input rounded-xl",
              "shadow-xs",
              "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0",
              "transition-[box-shadow,border-color]",
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
