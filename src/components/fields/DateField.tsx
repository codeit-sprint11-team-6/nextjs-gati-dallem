"use client";

import * as React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/Calendar";
import { Input } from "@/components/common/Input";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

export type DateFieldProps = {
  value?: Date;
  onChange?: (d?: Date) => void;
  placeholder?: string;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
  state?: "default" | "invalid" | "success";
};

export const DateField = React.forwardRef<HTMLDivElement, DateFieldProps>(
  (
    {
      value,
      onChange,
      placeholder = "날짜를 선택해주세요",
      size,
      disabled,
      className,
      state = "default",
    },
    ref,
  ) => {
    const finalSize = size ?? "md";

    return (
      <div ref={ref} className="w-full">
        <Popover>
          <PopoverTrigger asChild>
            <div className="relative">
              <Input
                readOnly
                disabled={disabled}
                value={value ? format(value, "yyyy-MM-dd") : ""}
                placeholder={placeholder}
                size={finalSize}
                state={state}
                withEndIcon
                className={cn("pr-10 md:pr-12", className)}
              />
              <CalendarIcon className="absolute top-1/2 right-3 md:right-4 h-4 w-4 -translate-y-1/2 text-slate-500" />
            </div>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-auto rounded-md border bg-white p-0 shadow-md">
            <Calendar mode="single" selected={value} onSelect={onChange} initialFocus />
          </PopoverContent>
        </Popover>
      </div>
    );
  },
);

DateField.displayName = "DateField";
