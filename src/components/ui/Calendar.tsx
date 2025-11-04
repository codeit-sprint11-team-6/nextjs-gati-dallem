"use client";

import * as React from "react";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import { DayButton, DayPicker, getDefaultClassNames, useDayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/common/Button";

/** Calendar (Day 셀은 커스텀 렌더) */
function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"];
}) {
  const defaultClassNames = getDefaultClassNames();

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "bg-background p-3 md:p-4",
        "group/calendar",
        "[--cell-size:--spacing(8)] md:[--cell-size:--spacing(9)]",
        "[[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className,
      )}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString("default", { month: "short" }),
        ...formatters,
      }}
      classNames={{
        root: cn("w-fit", defaultClassNames.root),
        months: cn("flex flex-col md:flex-row gap-2 md:gap-4 relative", defaultClassNames.months),
        month: cn("flex flex-col w-full gap-2 md:gap-4", defaultClassNames.month),
        nav: cn("flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between", defaultClassNames.nav),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-(--cell-size) p-0 select-none aria-disabled:opacity-50",
          defaultClassNames.button_previous,
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-(--cell-size) p-0 select-none aria-disabled:opacity-50",
          defaultClassNames.button_next,
        ),
        month_caption: cn("flex items-center justify-center h-(--cell-size) w-full px-(--cell-size)", defaultClassNames.month_caption),
        dropdowns: cn("w-full flex items-center justify-center h-(--cell-size) gap-1.5 text-sm font-medium", defaultClassNames.dropdowns),
        dropdown_root: cn("relative border border-input rounded-md shadow-xs has-focus:border-ring has-focus:ring-ring/50 has-focus:ring-[3px]", defaultClassNames.dropdown_root),
        dropdown: cn("absolute inset-0 bg-popover opacity-0", defaultClassNames.dropdown),
        caption_label: cn(
          "select-none font-medium",
          captionLayout === "label"
            ? "text-sm"
            : "h-8 pl-2 pr-1 flex items-center gap-1 text-sm rounded-md [&>svg]:size-3.5 [&>svg]:text-muted-foreground",
          defaultClassNames.caption_label,
        ),
        table: "w-full border-collapse",
        weekdays: cn("flex", defaultClassNames.weekdays),
        weekday: cn("flex-1 rounded-md select-none text-[0.8rem] font-normal text-muted-foreground", defaultClassNames.weekday),
        week: cn("flex w-full mt-2", defaultClassNames.week),
        week_number_header: cn("w-(--cell-size) select-none", defaultClassNames.week_number_header),
        week_number: cn("select-none text-[0.8rem] text-muted-foreground", defaultClassNames.week_number),
        day: cn(
          "relative aspect-square w-full h-full p-0 text-center select-none group/day [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md",
          defaultClassNames.day,
        ),
        range_start: cn("rounded-l-md bg-accent", defaultClassNames.range_start),
        range_middle: cn("rounded-none", defaultClassNames.range_middle),
        range_end: cn("rounded-r-md bg-accent", defaultClassNames.range_end),
        /** ⛔ 오늘날짜 배경 제거 (dot는 DayButton에서 처리) */
        today: cn("data-[selected=true]:rounded-none", defaultClassNames.today),
        outside: cn("text-muted-foreground/70 aria-selected:text-muted-foreground/70", defaultClassNames.outside),
        disabled: cn("text-muted-foreground opacity-50", defaultClassNames.disabled),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => (
          <div data-slot="calendar" ref={rootRef} className={cn(className)} {...props} />
        ),
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === "left") return <ChevronLeftIcon className={cn("size-4", className)} {...props} />;
          if (orientation === "right") return <ChevronRightIcon className={cn("size-4", className)} {...props} />;
          return <ChevronDownIcon className={cn("size-4", className)} {...props} />;
        },
        DayButton: CalendarDayButton, // 👈 사용자 친화 스타일 적용
        WeekNumber: ({ children, ...props }) => (
          <td {...props}>
            <div className="flex size-(--cell-size) items-center justify-center text-center">
              {children}
            </div>
          </td>
        ),
        ...components,
      }}
      {...props}
    />
  );
}

/** 날짜 셀 버튼 — hover는 연한 색, 선택 시에만 꽉 채움, today는 선택되지 않았을 때만 표시 */
function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames();
  const ref = React.useRef<HTMLButtonElement>(null);
  const dayPicker = useDayPicker();

  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  const isSelectedSingle =
    modifiers.selected &&
    !modifiers.range_start &&
    !modifiers.range_end &&
    !modifiers.range_middle;

  // useDayPicker에서 선택된 날짜를 가져와서 확인
  const hasSelectedDate = dayPicker.selected !== undefined;

  // 선택된 날짜가 있으면 오늘 스타일을 표시하지 않음
  const shouldShowTodayStyle = modifiers.today && !hasSelectedDate;

  return (
    <button
      ref={ref}
      type="button"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={isSelectedSingle}
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      data-today={shouldShowTodayStyle}
      className={cn(
        // 레이아웃/크기
        "relative flex aspect-square w-full min-w-(--cell-size) items-center justify-center rounded-md text-sm font-medium transition-colors",
        // 기본 텍스트
        "text-slate-900 dark:text-gray-200",
        // ✅ 호버: 연한 프라이머리 배경 + 글자색만 살짝 강조
        "hover:bg-purple-500/10 hover:text-purple-500 dark:hover:bg-purple-500/20 dark:hover:text-purple-400",
        // 포커스
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2",
        // ✅ 선택 상태: 꽉 채움 (선택 상태가 오늘보다 우선)
        "data-[selected-single=true]:bg-purple-500 data-[selected-single=true]:text-white",
        "data-[range-start=true]:bg-purple-500 data-[range-start=true]:text-white",
        "data-[range-end=true]:bg-purple-500 data-[range-end=true]:text-white",
        // ✅ 범위 중간: 옅은 배경
        "data-[range-middle=true]:bg-purple-500/15 dark:data-[range-middle=true]:bg-purple-500/25",
        // ✅ 오늘 = 선택된 날짜가 없을 때만 텍스트 색깔만 변경
        "data-[today=true]:text-purple-600 dark:data-[today=true]:text-purple-400 data-[today=true]:font-semibold",
        // 비활성/외부
        "aria-disabled:opacity-40 aria-disabled:cursor-not-allowed",
        defaultClassNames.day,
        className,
      )}
      {...props}
    />
  );
}

export { Calendar, CalendarDayButton };
