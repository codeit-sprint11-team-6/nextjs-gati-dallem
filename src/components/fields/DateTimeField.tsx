"use client";

import * as React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/Calendar";
import { Input } from "@/components/common/Input";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

export type DateTimeFieldProps = {
  value?: Date;
  onChange?: (d?: Date) => void;
  placeholder?: string;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
  state?: "default" | "invalid" | "success";
};

export const DateTimeField = React.forwardRef<HTMLDivElement, DateTimeFieldProps>(
  (
    {
      value,
      onChange,
      placeholder = "날짜와 시간을 선택해주세요",
      size,
      disabled,
      className,
      state = "default",
    },
    ref,
  ) => {
    const finalSize = size ?? "md";
    const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(value);
    const [hours, setHours] = React.useState(value ? String(value.getHours()).padStart(2, "0") : "12");
    const [minutes, setMinutes] = React.useState(value ? String(value.getMinutes()).padStart(2, "0") : "00");
    const [period, setPeriod] = React.useState<"AM" | "PM">(
      value && value.getHours() >= 12 ? "PM" : "AM",
    );

    // 시간 선택 옵션 생성
    const hourOptions = Array.from({ length: 12 }, (_, i) =>
      String(i === 0 ? 12 : i).padStart(2, "0"),
    );
    const minuteOptions = ["00", "05", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55"];

    // 날짜/시간 변경 시 상위로 전달
    React.useEffect(() => {
      if (!selectedDate) return;

      const hour24 = period === "PM" && hours !== "12"
        ? parseInt(hours) + 12
        : period === "AM" && hours === "12"
        ? 0
        : parseInt(hours);

      const newDate = new Date(selectedDate);
      newDate.setHours(hour24, parseInt(minutes), 0, 0);
      onChange?.(newDate);
    }, [selectedDate, hours, minutes, period]);

    return (
      <div ref={ref} className="w-full">
        <Popover>
          <PopoverTrigger asChild>
            <div className="relative">
              <Input
                readOnly
                disabled={disabled}
                value={value ? format(value, "yyyy-MM-dd HH:mm") : ""}
                placeholder={placeholder}
                size={finalSize}
                state={state}
                withEndIcon
                className={cn("pr-10 md:pr-12", className)}
              />
              <CalendarIcon className="absolute top-1/2 right-3 md:right-4 h-4 w-4 -translate-y-1/2 text-slate-500 dark:text-slate-400" />
            </div>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-auto rounded-xl border bg-white dark:bg-gray-900 dark:border-gray-700 p-0 shadow-md">
            <div className="flex flex-col md:flex-row">
              {/* 캘린더 */}
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                initialFocus
                locale={ko}
                formatters={{
                  formatWeekdayName: (date) => format(date, "EEEEE", { locale: ko }),
                }}
              />

              {/* 구분선 (캘린더 | 시간) */}
              <div className="relative py-0 md:py-8">
                <div className="h-px w-full md:h-full md:w-px bg-gray-200 dark:bg-gray-700"></div>
              </div>

              {/* 시간 선택 - 세로 3개 컬럼 */}
              <div className="flex justify-center pt-1 pb-2 md:justify-start md:pt-4 md:pb-0">
                {/* 시 */}
                <div className="flex flex-col w-20">
                  <div className="h-[118px] md:h-[280px] overflow-y-auto thin-scrollbar px-2 py-2 md:py-4">
                    {hourOptions.map((hour) => (
                      <button
                        key={hour}
                        type="button"
                        onClick={() => setHours(hour)}
                        className={cn(
                          "w-full py-2 my-0.5 text-sm transition-colors rounded-md",
                          hours === hour
                            ? "bg-purple-500 text-white font-semibold"
                            : "hover:bg-purple-500/10 hover:text-purple-500 dark:text-gray-300 dark:hover:bg-purple-500/20 dark:hover:text-purple-400",
                        )}
                      >
                        {hour}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 구분선 (시 | 분) */}
                <div className="relative py-8">
                  <div className="h-full w-px bg-gray-200 dark:bg-gray-700"></div>
                </div>

                {/* 분 */}
                <div className="flex flex-col w-20">
                  <div className="h-[118px] md:h-[280px] overflow-y-auto thin-scrollbar px-2 py-2 md:py-4">
                    {minuteOptions.map((minute) => (
                      <button
                        key={minute}
                        type="button"
                        onClick={() => setMinutes(minute)}
                        className={cn(
                          "w-full py-2 my-0.5 text-sm transition-colors rounded-md",
                          minutes === minute
                            ? "bg-purple-500 text-white font-semibold"
                            : "hover:bg-purple-500/10 hover:text-purple-500 dark:text-gray-300 dark:hover:bg-purple-500/20 dark:hover:text-purple-400",
                        )}
                      >
                        {minute}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 구분선 (분 | 오전/오후) */}
                <div className="relative py-8">
                  <div className="h-full w-px bg-gray-200 dark:bg-gray-700"></div>
                </div>

                {/* 오전/오후 */}
                <div className="flex flex-col w-20">
                  <div className="h-[118px] md:h-[280px] overflow-y-auto thin-scrollbar px-2 py-2 md:py-4">
                    <button
                      type="button"
                      onClick={() => setPeriod("AM")}
                      className={cn(
                        "w-full py-2 my-0.5 text-sm transition-colors rounded-md",
                        period === "AM"
                          ? "bg-purple-500 text-white font-semibold"
                          : "hover:bg-purple-500/10 hover:text-purple-500 dark:text-gray-300 dark:hover:bg-purple-500/20 dark:hover:text-purple-400",
                      )}
                    >
                      오전
                    </button>
                    <button
                      type="button"
                      onClick={() => setPeriod("PM")}
                      className={cn(
                        "w-full py-2 my-0.5 text-sm transition-colors rounded-md",
                        period === "PM"
                          ? "bg-purple-500 text-white font-semibold"
                          : "hover:bg-purple-500/10 hover:text-purple-500 dark:text-gray-300 dark:hover:bg-purple-500/20 dark:hover:text-purple-400",
                      )}
                    >
                      오후
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    );
  },
);

DateTimeField.displayName = "DateTimeField";
