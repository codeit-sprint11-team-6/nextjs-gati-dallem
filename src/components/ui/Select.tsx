"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";

import { cn } from "@/lib/utils";

function Select({ ...props }: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />;
}

function SelectGroup({ ...props }: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}

function SelectValue({ ...props }: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}

function SelectTrigger({
  className,
  size = "md",
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: "sm" | "md" | "lg";
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        // 레이아웃 & 배치
        "flex w-fit items-center justify-between gap-2 whitespace-nowrap",
        // 크기 (height는 data-size로 제어)
        "px-3 py-2 data-[size=default]:h-9 data-[size=sm]:h-8 data-[size=lg]:h-12",
        // 배경 & 테두리 & 라운드
        "bg-transparent border border-input rounded-lg shadow-xs",
        // 타이포 & 색상
        "text-sm data-[placeholder]:text-muted-foreground",
        // 아이콘 기본 색상
        "[&_svg:not([class*='text-'])]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        // 아이콘 회전 상태
        "[&_svg]:transition-transform data-[state=open]:[&_svg]:rotate-180",
        // 상태 (aria-invalid 등)
        "aria-invalid:border-red-500 aria-invalid:ring-red-500/20 dark:aria-invalid:ring-red-500/40",
        // 다크 모드
        "dark:bg-input/30 dark:hover:bg-input/50",
        // 포커스 링
        "outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        // 비활성화
        "disabled:cursor-not-allowed disabled:opacity-50",
        // 값 컨테이너 보정
        "*:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2",
        // 트랜지션
        "transition-[color,box-shadow]",
        className,
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="size-4 opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

function SelectContent({
  className,
  children,
  position = "popper",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(
          // 색상 & 타이포
          "bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100",
          // 애니메이션 상태
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          // 방향 전환
          "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          // 레이아웃 & 크기
          "relative max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin)",
          // 스크롤 & 모양
          "overflow-x-hidden overflow-y-auto rounded-lg",
          // 테두리 & 그림자
          "border border-slate-200 dark:border-slate-700 shadow-lg",
          // Popper 위치 보정
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          // Z-index (Modal보다 높게)
          "z-[150]",
          className,
        )}
        position={position}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            "p-1",
            position === "popper" &&
              "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1",
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

function SelectLabel({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn("text-muted-foreground px-2 py-1.5 text-xs", className)}
      {...props}
    />
  );
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        // 레이아웃 & 배치
        "relative flex w-full items-center gap-2",
        // 상호작용 & 선택 불가 상태
        "cursor-pointer select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        // 패딩 & 크기 & 타이포
        "py-2.5 pr-8 pl-3 text-sm",
        // 모양
        "rounded-lg",
        // 포커스 / 활성 스타일 (보라색 계열)
        "focus:bg-purple-50 focus:text-purple-900 hover:bg-purple-50",
        // 아이콘 표준화
        "[&_svg:not([class*='text-'])]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        // 내부 span 정렬
        "*:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        // 아웃라인 제거
        "outline-hidden",
        // 트랜지션
        "transition-colors",
        className,
      )}
      {...props}
    >
      <span className="absolute right-2 flex size-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn(
        // 레이아웃 & 여백
        "-mx-1 my-1",
        // 크기
        "h-px",
        // 색상
        "bg-border",
        // 상호작용 방지
        "pointer-events-none",
        className,
      )}
      {...props}
    />
  );
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn(
        // 레이아웃
        "flex items-center justify-center",
        // 상호작용 상태
        "cursor-default",
        // 패딩
        "py-1",
        className,
      )}
      {...props}
    >
      <ChevronUpIcon className="size-4" />
    </SelectPrimitive.ScrollUpButton>
  );
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn(
        // 레이아웃
        "flex items-center justify-center",
        // 상호작용 상태
        "cursor-default",
        // 패딩
        "py-1",
        className,
      )}
      {...props}
    >
      <ChevronDownIcon className="size-4" />
    </SelectPrimitive.ScrollDownButton>
  );
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
