"use client"

import * as React from "react"
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react"
import { DayButton, DayPicker, getDefaultClassNames } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/common/button"

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
  buttonVariant?: React.ComponentProps<typeof Button>["variant"]
}) {
  const defaultClassNames = getDefaultClassNames()

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        // 배경 & 패딩
        "bg-background p-3",
        // 그룹 식별자
        "group/calendar",
        // CSS 변수 기반 셀 크기
        "[--cell-size:--spacing(8)]",
        // 컨텍스트 내 투명 배경 처리
        "[[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
        // RTL 회전 처리 
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className
      )}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString("default", { month: "short" }),
        ...formatters,
      }}
      classNames={{
        root: cn(
          // 전체 루트 크기
          "w-fit",
          defaultClassNames.root
        ),
        months: cn(
          // 월 컨테이너 플렉스
          "flex flex-col md:flex-row gap-4 relative",
          defaultClassNames.months
        ),
        month: cn(
          // 단일 월 레이아웃
          "flex flex-col w-full gap-4",
          defaultClassNames.month
        ),
        nav: cn(
          // 네비게이션 바 배치
          "flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between",
          defaultClassNames.nav
        ),
        button_previous: cn(
          // 이전 달 버튼
          buttonVariants({ variant: buttonVariant }),
          "size-(--cell-size) p-0 select-none aria-disabled:opacity-50",
          defaultClassNames.button_previous
        ),
        button_next: cn(
          // 다음 달 버튼
          buttonVariants({ variant: buttonVariant }),
          "size-(--cell-size) p-0 select-none aria-disabled:opacity-50",
          defaultClassNames.button_next
        ),
        month_caption: cn(
          // 캡션(월 표시)
          "flex items-center justify-center h-(--cell-size) w-full px-(--cell-size)",
          defaultClassNames.month_caption
        ),
        dropdowns: cn(
          // 월/년도 드롭다운 래퍼
          "w-full flex items-center justify-center h-(--cell-size) gap-1.5 text-sm font-medium",
          defaultClassNames.dropdowns
        ),
        dropdown_root: cn(
          // 드롭다운 루트 포커스 스타일
          "relative border border-input rounded-md shadow-xs has-focus:border-ring has-focus:ring-ring/50 has-focus:ring-[3px]",
          defaultClassNames.dropdown_root
        ),
        dropdown: cn(
          // 실제 select 엘리먼트 시각적 숨김
          "absolute inset-0 bg-popover opacity-0",
          defaultClassNames.dropdown
        ),
        caption_label: cn(
          // 캡션 라벨 텍스트
          "select-none font-medium",
          captionLayout === "label"
            ? "text-sm"
            : "h-8 pl-2 pr-1 flex items-center gap-1 text-sm rounded-md [&>svg]:size-3.5 [&>svg]:text-muted-foreground",
          defaultClassNames.caption_label
        ),
        table: "w-full border-collapse",
        weekdays: cn("flex", defaultClassNames.weekdays),
        weekday: cn(
          // 요일 헤더 셀
          "flex-1 rounded-md select-none text-[0.8rem] font-normal text-muted-foreground",
          defaultClassNames.weekday
        ),
        week: cn(
          // 주 행 컨테이너
          "flex w-full mt-2",
          defaultClassNames.week
        ),
        week_number_header: cn(
          // 주 번호 헤더
          "w-(--cell-size) select-none",
          defaultClassNames.week_number_header
        ),
        week_number: cn(
          // 주 번호 셀
          "select-none text-[0.8rem] text-muted-foreground",
          defaultClassNames.week_number
        ),
        day: cn(
          // 일자 셀 래퍼
          "relative aspect-square w-full h-full p-0 text-center select-none group/day [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md",
          defaultClassNames.day
        ),
        range_start: cn(
          // 범위 시작
          "rounded-l-md bg-accent",
          defaultClassNames.range_start
        ),
        range_middle: cn(
          // 범위 중간
          "rounded-none",
          defaultClassNames.range_middle
        ),
        range_end: cn(
          // 범위 끝
          "rounded-r-md bg-accent",
          defaultClassNames.range_end
        ),
        today: cn(
          // 오늘 날짜 스타일
          "rounded-md bg-accent text-accent-foreground data-[selected=true]:rounded-none",
          defaultClassNames.today
        ),
        outside: cn(
          // 달력 외부(이전/다음 달) 날짜
          "text-muted-foreground aria-selected:text-muted-foreground",
          defaultClassNames.outside
        ),
        disabled: cn(
          // 비활성 날짜
          "text-muted-foreground opacity-50",
          defaultClassNames.disabled
        ),
        hidden: cn(
          // 숨김 처리
          "invisible",
          defaultClassNames.hidden
        ),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return (
            <div
              data-slot="calendar"
              ref={rootRef}
              className={cn(className)}
              {...props}
            />
          )
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === "left") {
            return (
              <ChevronLeftIcon className={cn("size-4", className)} {...props} />
            )
          }

          if (orientation === "right") {
            return (
              <ChevronRightIcon
                className={cn("size-4", className)}
                {...props}
              />
            )
          }

          return (
            <ChevronDownIcon className={cn("size-4", className)} {...props} />
          )
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="flex size-(--cell-size) items-center justify-center text-center">
                {children}
              </div>
            </td>
          )
        },
        ...components,
      }}
      {...props}
    />
  )
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames()

  const ref = React.useRef<HTMLButtonElement>(null)
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        // 레이아웃 & 크기
        "flex flex-col aspect-square size-auto w-full min-w-(--cell-size) gap-1 leading-none font-normal",
        // 선택 상태 색상
        "data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground",
        // 범위 선택 상태
        "data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground",
        // 범위 border-radius
        "data-[range-start=true]:rounded-md data-[range-start=true]:rounded-l-md data-[range-end=true]:rounded-md data-[range-end=true]:rounded-r-md data-[range-middle=true]:rounded-none",
        // 포커스 링
        "group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 group-data-[focused=true]/day:ring-[3px]",
        // 다크모드 hover
        "dark:hover:text-accent-foreground",
        // 내부 텍스트 크기/투명도
        "[&>span]:text-xs [&>span]:opacity-70",
        defaultClassNames.day,
        className
      )}
      {...props}
    />
  )
}

export { Calendar, CalendarDayButton }
